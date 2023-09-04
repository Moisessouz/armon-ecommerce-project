export const catalog = [
  {
    id: "1",
    name: "Camu-Camu",
    publisher: "Estúdio Armon",
    price: 32.9,
    productImg: "camu-camu.jpg",
    amount: 1,
  },
  {
    id: "2",
    name: "Fada Mortífera T01",
    publisher: "Estúdio Armon",
    price: 29.9,
    productImg: "combo-fada-mortifera-01.jpg",
    amount: 1,
  },
  {
    id: "3",
    name: "Fada Mortífera T02",
    publisher: "Estúdio Armon",
    price: 29.9,
    productImg: "combo-fada-mortifera-02.jpg",
    amount: 1,
  },
  {
    id: "4",
    name: "Combo Tobias Salazar",
    publisher: "Estúdio Armon",
    price: 56.9,
    productImg: "combo-tobias-salazar.jpg",
    amount: 1,
  },
  {
    id: "5",
    name: "Cotoco e o Ovo de Codorna",
    publisher: "Estúdio Armon",
    price: 18.9,
    productImg: "cotoco.jpg",
    amount: 1,
  },
  {
    id: "6",
    name: "Era uma Vez na Lua Azul",
    publisher: "Estúdio Armon",
    price: 14.9,
    productImg: "era-uma-vez-na-lua-azul.jpg",
    amount: 1,
  },
  {
    id: "7",
    name: "Escarra Brasa - Emboscadas",
    publisher: "Estúdio Armon",
    price: 31.9,
    productImg: "escarra-brasa.jpg",
    amount: 1,
  },
  {
    id: "8",
    name: "Oxente vol. 01",
    publisher: "Estúdio Armon",
    price: 23.9,
    productImg: "oxente-vol-1.jpg",
    amount: 1,
  },
  {
    id: "9",
    name: "Oxente vol. 02",
    publisher: "Estúdio Armon",
    price: 26.9,
    productImg: "oxente-vol-2.jpg",
    amount: 1,
  },
  {
    id: "10",
    name: "Penumbra - Contos Sombrios",
    publisher: "Estúdio Armon",
    price: 19.9,
    productImg: "penumbra.jpg",
    amount: 1,
  },
  {
    id: "11",
    name: "Sideral vol. 01",
    publisher: "Estúdio Armon",
    price: 23.9,
    productImg: "sideral-vol-1.jpg",
    amount: 1,
  },
  {
    id: "12",
    name: "Sideral vol. 02",
    publisher: "Estúdio Armon",
    price: 29.9,
    productImg: "sideral-vol-2.jpg",
    amount: 1,
  },
];

export function saveLocalStorage(key, information) {
  localStorage.setItem(key, JSON.stringify(information));
}

export function readLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function cleanLocalStorage(key) {
  localStorage.removeItem(key);
}

export function createPurchaseList(productId, containerHtmlId, purchaseAmount) {
  const product = catalog.find((p) => p.id === productId);
  const intoCart = document.getElementById(containerHtmlId);

  const articleTag = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-200",
    "rounded-lg",
    "p-2",
    "relative",
    "mb-2",
    "w-96",
  ];

  for (const articleClass of articleClasses) {
    articleTag.classList.add(articleClass);
  }

  const productInCart = `<img src="./assets/img/${product.productImg}" alt="${
    product.name
  }" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-around">
      <p class="text-slate-950 text-sm">${product.name}</p>
      <p class="text-blue-900 text-lg font-bold">R$${parseFloat(product.price)
        .toFixed(2)
        .replace(".", ",")}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
    <p>Qtd:</p>
      <p id="amount-${product.id}" class="mr-10 px-2">${purchaseAmount}</p>
    </div>`;

  articleTag.innerHTML += productInCart;
  intoCart.appendChild(articleTag);
}
