import { catalog, saveLocalStorage, readLocalStorage } from "./utills";

const productAmount = readLocalStorage("cart") ?? {};

function openCart() {
  document.getElementById("cart-shopping").classList.remove("right-[-320px]");
  document.getElementById("cart-shopping").classList.add("right-[0px]");
}

function closeCart() {
  document.getElementById("cart-shopping").classList.remove("right-[0px]");
  document.getElementById("cart-shopping").classList.add("right-[-320px]");
}

function checkoutPage() {
  if (Object.keys(productAmount).length === 0) {
    return
  }
  window.location.href = "./checkout.html"
}

export function cartInit() {
  const closeCartBtn = document.getElementById("close-cart");
  const openCartBtn = document.getElementById("open-cart");
  const checkoutBtn = document.getElementById("checkout");


  closeCartBtn.addEventListener("click", closeCart);
  openCartBtn.addEventListener("click", openCart);
  checkoutBtn.addEventListener("click", checkoutPage)
}

function removeProductCart(productId) {
  delete productAmount[productId];
  saveLocalStorage("cart", productAmount);
  updatePurchasePrice();
  productCartRender();
}

function increaseAmountProduct(productId) {
  productAmount[productId]++;
  saveLocalStorage("cart", productAmount);
  updatePurchasePrice();
  updateAmoutProduct(productId);
}

function decreaseAmountProduct(productId) {
  if (productAmount[productId] === 1) {
    removeProductCart(productId);
    return;
  }
  productAmount[productId]--;
  saveLocalStorage("cart", productAmount);
  updatePurchasePrice();
  updateAmoutProduct(productId);
}

function updateAmoutProduct(productId) {
  document.getElementById(`amount-${productId}`).innerText =
    productAmount[productId];
}

function createProductCart(productId) {
  const product = catalog.find((p) => p.id === productId);
  const intoCart = document.getElementById("cart-products");

  const articleTag = document.createElement("article"); //<article></article>
  const articleClasses = [
    "flex",
    "bg-slate-200",
    "rounded-lg",
    "p-1",
    "relative",
  ];

  for (const articleClass of articleClasses) {
    articleTag.classList.add(articleClass);
  }

  const productInCart = `<button id="remove-product-${
    product.id
  }" class="absolute top-0 right-2"><i class="fa-solid fa-trash-can text-indigo-800/75 hover:text-red-700"></i></button>
  <img src="./assets/img/${product.productImg}" alt="${
    product.name
  }" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-around">
      <p class="text-slate-950 text-sm">${product.name}</p>
      <p class="text-green-500 text-lg">R$${parseFloat(product.price)
        .toFixed(2)
        .replace(".", ",")}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
      <button id="decrease-product-${
        product.id
      }"><i class="fa-solid fa-square-minus text-indigo-800 hover:text-indigo-600"></i></button>
      <p id="amount-${product.id}" class="ml-2">${productAmount[product.id]}</p>
      <button id="increase-product-${
        product.id
      }" class="ml-2"><i class="fa-solid fa-square-plus text-indigo-800 hover:text-indigo-600"></i></button>
    </div>`;

  articleTag.innerHTML += productInCart;
  intoCart.appendChild(articleTag);

  document
    .getElementById(`decrease-product-${product.id}`)
    .addEventListener("click", () => decreaseAmountProduct(product.id));

  document
    .getElementById(`increase-product-${product.id}`)
    .addEventListener("click", () => increaseAmountProduct(product.id));

  document
    .getElementById(`remove-product-${product.id}`)
    .addEventListener("click", () => removeProductCart(product.id));
}

export function productCartRender() {
  const intoCart = document.getElementById("cart-products");
  intoCart.innerHTML = "";

  for (const productId in productAmount) {
    createProductCart(productId);
  }
}

export function addProduct(productId) {
  if (productId in productAmount) {
    increaseAmountProduct(productId);
    return;
  }
  productAmount[productId] = 1;
  saveLocalStorage("cart", productAmount);
  createProductCart(productId);
  updatePurchasePrice();
}

export function updatePurchasePrice() {
  const purchasePrice = document.getElementById("total-price");
  let totalPrice = 0;
  for (const productIdPrice in productAmount) {
    totalPrice +=
      catalog.find((p) => p.id === productIdPrice).price *
      productAmount[productIdPrice];
  }
  purchasePrice.innerText = `Total: R$${parseFloat(totalPrice)
    .toFixed(2)
    .replace(".", ",")}`;
}
