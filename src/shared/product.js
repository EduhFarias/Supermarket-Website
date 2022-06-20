class Product {
  constructor(name, price, unit, type, isNatural, provider, imgSrc, discount = 0.0, id) {
    this.name = name;
    this.price = price;
    this.unit = unit;
    this.type = type;
    this.isNatural = isNatural;
    this.provider = provider;
    this.imgSrc = imgSrc;
    this.discount = discount;
    this.id = id;
  }
  setDiscount(discount) {
    this.discount = discount;
  }
  getDiscountPrice() {
    const BRLocale = Intl.NumberFormat('en-BR');
    return BRLocale.format(
      (parseFloat(this.price) - parseFloat(this.price) * (parseFloat(this.discount) / 100)).toFixed(2)
    );
  }
}

async function allProducts() {
  return await db
    .collection('products')
    .get()
    .then((querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      savedProducts = docs;
      allProductsToDisplay = docs;
      return docs;
    });
}

function setProduct(defaultImg = '', id) {
  const docRef = document.getElementById('product-form');
  const uid = docRef['name'].value.toLowerCase().replace(' ', '-');
  db.collection('products')
    .doc(uid)
    .set({
      name: docRef['name'].value,
      price: docRef['price'].value,
      imgSrc: docRef['image'].files.length > 0 ? docRef['image'].files[0].name : defaultImg,
      isNatural: docRef['is-natural'].checked,
      provider: docRef['provider'].value,
      discount: docRef['discount'].value,
      type: docRef['type'].value,
      unit: docRef['unit'].value,
      id: id,
    })
    .then(() => {
      alert('Produto cadastrado com sucesso!');
      manageProducts();
    })
    .catch((error) => alert('Erro ao cadastrar produto'));
}

function savePurchase(obj) {
  obj.created = new Date();
  db.collection('purchases')
    .doc(window.localStorage.getItem('user'))
    .collection('purchase')
    .doc(obj.created.toString().replace(' GMT-0300 (Brasilia Standard Time)', ''))
    .set({
      obj: obj,
    })
    .then(() => {
      window.sessionStorage.removeItem('productsInCart');
      window.sessionStorage.removeItem('count');
      document.getElementById('modal-body').innerHTML = '<h3>COMPRA CONFIRMADA!</h3>';
      setTimeout(() => window.location.replace('index.html'), 5000);
    })
    .catch((error) => console.log(error));
}

let hasCC = false;
db.collection('cards')
  .doc(window.sessionStorage.getItem('user'))
  .get()
  .then((doc) => {
    if (doc.exists) hasCC = true;
  });

function removeAllProducts() {
  window.sessionStorage.removeItem('productsInCart');
  window.sessionStorage.removeItem('count');
  window.location.replace('index.html');
}

function removeProduct(index) {
  const productsInCart = JSON.parse(window.sessionStorage.getItem('productsInCart'));
  let count = window.sessionStorage.getItem('count');
  productsInCart.splice(productsInCart.indexOf(productsInCart[index]), 1);

  count--;
  window.sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  window.sessionStorage.setItem('count', count);
  document.getElementsByClassName('badge')[0].setAttribute('value', count);
  loadCartInfo();
}

function displayAllProducts() {
  let filteredProducts = JSON.parse(window.sessionStorage.getItem('productsToFilter'));
  filteredProducts = filteredProducts === null ? [] : filteredProducts;

  allProducts().then((products) => {
    listedProducts = products;
    let html = '';
    products.forEach((p, index) => {
      if (Object.keys(filteredProducts).length != 0) {
        const condition = filteredProducts.find((prod) => prod.id === p.id);
        if (!condition) return;
      }
      let product = new Product(p.name, p.price, p.unit, p.type, p.isNatural, p.provider, p.imgSrc, p.discount, p.id);
      html +=
        '<div class="col-1 product-item" id="' +
        product.name +
        '" onclick="addToCart(' +
        index +
        ')">' +
        '<img src="./fonts/products/' +
        product.imgSrc +
        '"><hr />' +
        '<p class="description">' +
        product.name +
        ', ' +
        product.unit +
        ', ' +
        product.provider +
        (product.isNatural ? '<p>, Produto natural</p>' : '') +
        '</p>' +
        (product.discount == '0.0'
          ? '<p class="value">R$ ' + product.price + '</p>'
          : '<p class="dashed-value">R$ ' +
            product.price +
            '</p>' +
            '<p class="value">R$ ' +
            product.getDiscountPrice() +
            '</p>') +
        '</div>';
    });
    document.getElementById('products-list').innerHTML = html;
    preLoadCart();
    window.sessionStorage.removeItem('productsToFilter');
  });
}

function loadCartInfo() {
  const productsInCart = JSON.parse(window.sessionStorage.getItem('productsInCart'));
  const auxProduct = new Product('', '', '', '', '', '', '', '');
  const totalValue = productsInCart
    .map((product) => {
      if (product.discount != '0.0') {
        auxProduct.discount = product.discount;
        auxProduct.price = product.price;
        return parseFloat(auxProduct.getDiscountPrice()) * product.amount;
      }
      return parseFloat(product.price) * product.amount;
    })
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  const pixValue = totalValue - totalValue * 0.05;

  let cartDescription = '<div class="row">';

  productsInCart.forEach((product, index) => {
    auxProduct.discount = product.discount;
    auxProduct.price = product.price;

    cartDescription +=
      '<div class="cart-product row">' +
      '<div class="col-2"><img src="./fonts/products/' +
      product.imgSrc +
      '"></div>' +
      '<div class="col-6"><span class="span-cart-provider">' +
      product.provider +
      '</span><br />' +
      '<span>' +
      product.name +
      ', ' +
      product.unit +
      ', ' +
      product.provider +
      (product.isNatural ? ', Produto natural' : '') +
      '</span></div>' +
      '<div class="col-2">' +
      '<span>Quantidade:</span>' +
      '<input type="text" name="amount" id="amount-' +
      index +
      '" value="' +
      product.amount +
      '" style="width: 40px">' +
      '<br /><a style="color: red; text-decoration: none; cursor:pointer" onclick="removeProduct(' +
      index +
      ')">Remover</a>' +
      '</div>' +
      '<div class="col-2"><span>Preço:' +
      (product.discount == '0.0'
        ? '<p class="value" style="font-size: 20px">R$ ' + (auxProduct.price * product.amount).toFixed(2) + '</p>'
        : '<p class="dashed-value" style="font-size: 16px; margin-bottom: -5px">R$ ' +
          (auxProduct.price * product.amount).toFixed(2) +
          '</p>' +
          '<p class="value" style="font-size: 20px">R$ ' +
          (auxProduct.getDiscountPrice() * product.amount).toFixed(2) +
          '</p>') +
      '</span></div>' +
      '</div>';
  });

  cartDescription += '</div>';
  let summary =
    '<div class="col-12">' +
    '<p>Valor total dos produtos: <span style="font-weight: bolder" id="total">R$ ' +
    totalValue.toFixed(2) +
    '</span></p><hr />' +
    '<div class="col-12 pix"><h5>Valor no <b>PIX</b>: <span style="font-weight: bolder" id="pix">R$ ' +
    pixValue.toFixed(2) +
    '</span></h5><p style="text-align:left; left:10%">(Economize: <b>R$ ' +
    (totalValue - pixValue).toFixed(2) +
    '</b>)</p></div>' +
    '<button class="btn btn-primary btn-full" id="load-payment">IR PARA O PAGAMENTO</button>' +
    '<button class="btn btn-outline-primary btn-outline" id="redirect">CONTINUAR COMPRANDO</button>';

  document.getElementById('description').innerHTML = cartDescription;
  document.getElementById('summary').innerHTML = summary;

  document.getElementsByName('amount').forEach((input) => {
    input.addEventListener('focusout', () => {
      productsInCart.forEach((product, index) => {
        product.amount = parseFloat(document.getElementById('amount-' + index).value);
      });
      window.sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart));
      loadCartInfo();
    });
  });

  document.getElementById('load-payment').addEventListener('click', () => {
    if (window.sessionStorage.getItem('user') === 'undefined' || window.sessionStorage.getItem('user') === null)
      window.location.replace('signin.html');
    let html = '<h3><i class="fa-solid fa-money-check-dollar"></i> PAGAMENTO</h3>';

    html +=
      '<div class="col-12">' +
      '<p>Valor total dos produtos: <span style="font-weight: bolder" id="total">R$ ' +
      totalValue.toFixed(2) +
      '</span></p><hr />' +
      '<span>Frete:</span>' +
      '<form class="form-shipping">' +
      '<input type="radio" id="radio-local" name="shipping" value="local">' +
      '<label for="radio-local"> Buscar no local</label><br>' +
      '<input type="radio" id="radio-shipping" name="shipping" value="shipping">' +
      '<label for="radio-shipping"> Entregar em casa</label><br>' +
      '</form>' +
      '</div>' +
      '<div class="col-12 pix"><h5>Valor no <b>PIX</b>: <span style="font-weight: bolder" id="pix">R$ ' +
      pixValue.toFixed(2) +
      '</span></h5><p style="text-align:left; left:10%">(Economize: <b>R$ ' +
      (totalValue - pixValue).toFixed(2) +
      '</b>)</p></div>' +
      '<div class="row"><h5 style="color: var(--main-color)">MÉTODO</h5><hr>' +
      '<div class="col-12"><form class="form-payment">' +
      '<input type="radio" id="radio-pix" name="payment" value="pix">' +
      '<label for="radio-pix"> PIX</label><br>' +
      '<input type="radio" id="radio-cc" name="payment" value="cc">' +
      '<label for="radio-cc"> Cartão de crédito</label><br>' +
      '</form></div>' +
      '<div class="col-12"><button class="btn btn-primary btn-full" id="confirm-payment" data-bs-toggle="modal" data-bs-target="#paymentModal">CONFIRMAR PAGAMENTO</button></div>' +
      '</div>';
    document.getElementById('s-p').innerHTML = html;

    const purchaseObj = {
      discount: (totalValue - pixValue).toFixed(2),
      totalValue: totalValue,
      pixValue: pixValue,
      products: productsInCart,
      shipping: 'local',
      payment: 'pix',
      stages: 1,
    };

    document.getElementsByName('shipping').forEach((input) => {
      input.addEventListener('click', () => {
        if (document.querySelector('input[name="shipping"]:checked').value == 'local') {
          document.getElementById('total').innerHTML = 'R$ ' + totalValue.toFixed(2);
          document.getElementById('pix').innerHTML = 'R$ ' + pixValue.toFixed(2);
          purchaseObj.pixValue = pixValue.toFixed(2);
          purchaseObj.totalValue = totalValue.toFixed(2);
          purchaseObj.shipping = 'local';
        } else {
          document.getElementById('total').innerHTML = 'R$ ' + (totalValue + 5.0).toFixed(2);
          document.getElementById('pix').innerHTML = 'R$ ' + (pixValue + 5.0).toFixed(2);
          purchaseObj.pixValue = (pixValue + 5.0).toFixed(2);
          purchaseObj.totalValue = (totalValue + 5.0).toFixed(2);
          purchaseObj.shipping = 'shipping';
        }
      });
    });

    document.getElementById('confirm-payment').addEventListener('click', () => {
      const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
      purchaseObj.payment = paymentMethod;
      if (paymentMethod === 'pix') {
        document.getElementById('modal-body').innerHTML =
          '<h4>ESCANEEI O QR-CODE PARA CONFIRMAR O PAGAMENTO PELO PIX!</h4>' +
          '<img style="height:100%" src="./fonts/qrcode.png" alt="" />';
        savePurchase(purchaseObj);
      } else {
        if (!hasCC) {
          window.sessionStorage.setItem('registerCard', 'true');
          window.location.replace('profile.html');
        } else {
          document.getElementById('modal-body').innerHTML =
            '<label for="stages" style="font-size: 30px; color: var(--main-color)">Quantas vezes deseja parcelar a compra? </label>' +
            '<select id="stages" name="stages" >' +
            '<option value="1">1x</option>' +
            '<option value="2">2x</option>' +
            '<option value="3">3x</option>' +
            '<option value="4">4x</option>' +
            '<option value="5">5x</option>' +
            '</select><br />' +
            '<span class="stages">Valor de cada parcela: <span id="cc-value">R$ ' +
            (purchaseObj.shipping === 'local' ? totalValue : totalValue + 5.0).toFixed(2) +
            '</span></span><br />' +
            '<button class="btn btn-primary btn-full" id="confirm">CONFIRMAR PARCELAMENTO</button>';

          document.getElementById('stages').addEventListener('change', () => {
            purchaseObj.stages = parseInt(document.getElementById('stages').value);
            document.getElementById('cc-value').innerHTML =
              'R$ ' +
              ((purchaseObj.shipping === 'local' ? totalValue : totalValue + 5.0) / purchaseObj.stages).toFixed(2);
          });

          document.getElementById('confirm').addEventListener('click', () => savePurchase(purchaseObj));
        }
      }
    });
  });

  document.getElementById('redirect').addEventListener('click', () => window.location.replace('products.html'));
}
