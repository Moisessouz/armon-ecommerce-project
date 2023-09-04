import { readLocalStorage, createPurchaseList } from "./src/utills";

function createOrderHistoric(orderList) {
  const orderElement = `
  <p class="text-xl text-bold text-slate-200 bg-green-700 rounded-md my-4 px-2 py-2 shadow shadow-slate-900">Pedido realizado em ${new Date(
    orderList.orderDate
  ).toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}</p>
    <section id="order-container-${
      orderList.orderDate
    }" class="bg-slate-700 p-3 rounded-md m-4 shadow shadow-slate-900"></section>
    `;

  const main = document.getElementsByTagName("main")[0];
  main.innerHTML += orderElement;

  for (const productId in orderList.order) {
    createPurchaseList(
      productId,
      `order-container-${orderList.orderDate}`,
      orderList.order[productId]
    );
  }
}

function renderOrderHistoric() {
  const historic = readLocalStorage("historic");

  for (const orderList of historic) {
    createOrderHistoric(orderList);
  }
}

renderOrderHistoric();
