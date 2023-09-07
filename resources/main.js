const url = "https://fakestoreapi.com/"

const cartTab = document.getElementById("cartTab");
const electronicTab = document.getElementById("electronicTab");
const jeweleryTab = document.getElementById("jeweleryTab");
const mensClothingTab = document.getElementById("mensClothingTab");
const womensClothingTab = document.getElementById("womensClothingTab");
const display = document.getElementById("display");

const fakeStore = async (endPoint) => {
  let result = await fetch(url + endPoint);
  let data = await result.json();
  return data
};

// Stuck on the having the event listener run the fakeStore function while utilizing the argument to get different results for each tab
 electronicTab.addEventListener("click", function () {
  fakeStore('products/category/electronics')
  
});

jeweleryTab.addEventListener("click", (e) => {
  console.log(fakeStore('products/category/jewelery'))
});

mensClothingTab.addEventListener("click", (e) => {
  console.log(fakeStore('products/category/mensclothing'))
});

womensClothingTab.addEventListener("click", (e) => {
  console.log(fakeStore('products/category/womensclothing'))
});

  window.onload = (e) => {
  fakeStore('products?sort=asc');
}; 

console.log(fakeStore('products?sort=asc'))