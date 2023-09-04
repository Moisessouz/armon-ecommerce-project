import {
  createPurchaseList,
  readLocalStorage,
  cleanLocalStorage,
  saveLocalStorage,
} from "./src/utills";

import { updatePurchasePrice } from "./src/cartMenu";

function creatCheckoutList() {
  const productAmount = readLocalStorage("cart") ?? {};

  for (const productId in productAmount) {
    createPurchaseList(
      productId,
      "container-purchase-list",
      productAmount[productId]
    );
  }
}

function finishPurchase(purchaseEvent) {
  purchaseEvent.preventDefault();
  const productAmount = readLocalStorage("cart") ?? {};
  if (Object.keys(productAmount).length === 0) {
    return;
  }

  const currentDate = new Date();
  const orderCreated = {
    orderDate: currentDate,
    order: productAmount,
  };

  const orderHistoric = readLocalStorage("historic") ?? [];
  const updateOrderHistoric = [orderCreated, ...orderHistoric];

  saveLocalStorage("historic", updateOrderHistoric);
  cleanLocalStorage("cart");

  window.location.href = "./purchase-historic.html";
}

creatCheckoutList();
updatePurchasePrice();

document.addEventListener("submit", (purchaseEvent) =>
  finishPurchase(purchaseEvent)
);
