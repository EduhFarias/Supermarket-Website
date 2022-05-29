class Product {
  constructor(name, price, unit, isNatural, provider, imgSrc, discount = 0.0) {
    this.name = name;
    this.price = price;
    this.unit = unit;
    this.isNatural = isNatural;
    this.provider = provider;
    this.imgSrc = imgSrc;
    this.discount = discount;
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
      return docs;
    });
}

function setProduct() {
  const docRef = document.getElementById('product-form');
  const id = docRef['name'].value.toLowerCase().replace(' ', '-');
  db.collection('products')
    .doc(id)
    .set({
      name: docRef['name'].value,
      price: docRef['price'].value,
      imgSrc: docRef['image'].files.length > 0 ? docRef['image'].files[0].name : '',
      isNatural: docRef['is-natural'].checked,
      provider: docRef['provider'].value,
      discount: docRef['discount'].value,
    })
    .then(() => {
      alert('Produto cadastrado com sucesso!');
      manageProducts();
    })
    .catch((error) => alert('Erro ao cadastrar produto'));
}
