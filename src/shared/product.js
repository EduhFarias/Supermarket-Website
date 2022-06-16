class Product {
  constructor(name, price, unit, isNatural, provider, imgSrc, discount = 0.0, id) {
    this.name = name;
    this.price = price;
    this.unit = unit;
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
    return BRLocale.format(parseFloat(this.price) - parseFloat(this.price) * (parseFloat(this.discount) / 100));
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
      unit: docRef['unit'].value,
      id: id,
    })
    .then(() => {
      alert('Produto cadastrado com sucesso!');
      manageProducts();
    })
    .catch((error) => alert('Erro ao cadastrar produto'));
}

function removeProduct(index) {
  console.log(index);
}

function displayAllProducts() {
  allProducts().then((products) => {
    listedProducts = products;
    let html = '';
    products.forEach((p, index) => {
      let product = new Product(p.name, p.price, p.unit, p.isNatural, p.provider, p.imgSrc, p.discount, p.id);
      html +=
        '<div class="col-1 product-item" id="' +
        product.name +
        '" onclick="addToCart(' +
        index +
        ')">' +
        '<img src="./fonts/products/' +
        product.imgSrc +
        '">' +
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
      '<span>Quantidade(' +
      product.unit +
      '):</span>' +
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
    '<p>Frete: <span style="font-weight: bolder" id="shipping">R$ 0,00</span></p>' +
    '</div>';
  summary +=
    '<div class="col-12 pix"><h5>Valor no <b>PIX</b>: <span style="font-weight: bolder" id="pix">R$ ' +
    pixValue.toFixed(2) +
    '</span></h5><p style="text-align:left; left:10%">(Economize: <b>R$ ' +
    (totalValue - pixValue).toFixed(2) +
    '</b>)</p></div>';
  summary +=
    '<button class="btn btn-primary btn-full" onclick="console.log(\'pagamento\')">IR PARA O PAGAMENTO</button>' +
    '<button class="btn btn-outline-primary btn-outline" onclick="">CONTINUAR COMPRANDO</button>';

  document.getElementById('description').innerHTML = cartDescription;
  document.getElementById('summary').innerHTML = summary;

  document.getElementsByName('amount').forEach((input) => {
    input.addEventListener('focusout', () => {
      productsInCart.forEach((product, index) => {
        product.amount = parseFloat(document.getElementById('amount-' + index).value);
      });
      console.log(productsInCart);
      window.sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart));
      loadCartInfo();
    });
  });
}
