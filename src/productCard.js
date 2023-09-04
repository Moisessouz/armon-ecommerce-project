import { catalog } from "./utills";
import { addProduct } from "./cartMenu";

export function catalogRender() {
  for (const catalogProduct of catalog) {
    const productCard = `<div id="card-product-${
      catalogProduct.id
    }" class="border-solid w-60 m-2 flex flex-col p-2 justify-between group text-center shadow-xl shadow-slate-900 rounded-lg">
  <img src="./assets/img/${catalogProduct.productImg}" alt="${
      catalogProduct.name
    }" class="group-hover:scale-110 duration-300 my-3 rounded-lg">
  <div class="bg-slate-200">
    <p class="text-sm"><b>${catalogProduct.name}</b></p>
    <p class="text-sm">${catalogProduct.publisher}</p>
    <p class="text-sm text-blue-700"><b>R$${parseFloat(catalogProduct.price)
      .toFixed(2)
      .replace(".", ",")}</b></p>
  </div>
  <button id="add-${
    catalogProduct.id
  }"class="bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"><i class="fa-solid fa-cart-plus"></i></button>
  </div>`;

    document.getElementById("product-container").innerHTML += productCard;
  }

  for (const catalogProduct of catalog) {
    document
      .getElementById(`add-${catalogProduct.id}`)
      .addEventListener("click", () => addProduct(catalogProduct.id));
  }
}
