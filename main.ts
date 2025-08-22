interface ProductType {
    id:number;
    title:string;
    price:number;
    description: string;
    category:string;
    images: Array<string>;
}
interface CategoryType {
    name:string;
    slug:string;
}
async function getAll(api: string){
    const res = await fetch(api);
    const data = await res.json();
    return data;
}
let elProductList: Element | null = document.querySelector(".list");
let elCategoryList: Element | null = document.querySelector(".category-list");

if(elProductList && elCategoryList) {
    elProductList.innerHTML = "Loading...";
    elCategoryList.innerHTML = "Loading...";
}
getAll("https://dummyjson.com/products").then((res) => getProducts(res));
getAll("https://dummyjson.com/products/categories").then((res) => getCategoryProduct(res));

function getProducts(list: {products: ProductType[]}){
    if (elProductList) elProductList.innerHTML = "";
    list.products.map((item: ProductType) =>{
        let elItem: HTMLLIElement = document.createElement("li");
        elItem.innerHTML = `
        <div class="w-[350px] bg-purple-200 rounded-md overflow-hidden>
        <img class="mb-2 src="${item.images[0]}" alt="product img" width="350" height="200"/>
        <div class="p-2">
        <h2 class="font-bold mb-[5px] text-[22px]">${item.title}</h2>
        <p class="font-medium line-clamp-2 mb-[5px]">${item.description}</p>
        <div class="flex items-center justify-between">
        <strong>${item.category}</strong>
        <strong>${item.price}</strong>
        </div>
        </div>
        </div>
        `;
        elProductList?.appendChild(elItem);
    });
}

function getCategoryProduct(list: CategoryType[]){
    if (elCategoryList) elCategoryList.innerHTML = "";
    list.splice(0, 10).map((item: CategoryType) => {
        let elButton: HTMLButtonElement = document.createElement("button");
        elButton.textContent = item.name;
        elButton.classList = "p-2 rounded-md cursor-pointer duration-300 hover:scale-[1.1] bg-slate-500 text-white font-semibold";
        elCategoryList?.appendChild(elButton);

        elButton.addEventListener("click", () =>{
            if (elProductList) elProductList.innerHTML = "Loading...";
            getAll(`https://dummyjson.com/products/category/${item.slug}`).then(
                (res) => getProducts(res)
            );
        });
    });
}


