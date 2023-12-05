//API fakeStore URL
const url = "https://fakestoreapi.com/";
const mensClothingURL = "products/category/" + encodeURIComponent("men's clothing");
const womensClothingURL = "products/category/" + encodeURIComponent("women's clothing");

//Nav Tab variables
const cartTab = document.getElementById("cartTab");
const electronicTab = document.getElementById("electronicTab");
const jeweleryTab = document.getElementById("jeweleryTab");
const mensClothingTab = document.getElementById("mensClothingTab");
const womensClothingTab = document.getElementById("womensClothingTab");
const display = document.getElementById("display");

// fakeStore fetch endpoints
const fakeStore = async (endPoint) => {
  let result = await fetch(url + endPoint);
  let data = await result.json();
  return data;
};

//! Event Listeners

electronicTab.addEventListener("click", async function () {
  try {
    const data = await fakeStore('products/category/electronics');
    // Handle the data and update the display
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

jeweleryTab.addEventListener("click", async function () {
  try {
    const data = await fakeStore('products/category/jewelery');
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

mensClothingTab.addEventListener("click", async function () {
  try {
    const data = await fakeStore(mensClothingURL);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

womensClothingTab.addEventListener("click", async function () {
  try {
    const data = await fakeStore(womensClothingURL);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// Window onload
window.onload = async function () {
  try {
    const data = await fakeStore('products?sort=asc');
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



