const url = "https://fakestoreapi.com/";
const mensClothingURL =
  "products/category/" + encodeURIComponent("men's clothing");
const womensClothingURL =
  "products/category/" + encodeURIComponent("women's clothing");
const cart = [];
//c;ears display before rendering new cards
const clearDisplay = () => {
  display.innerHTML = "";
};

const fakeStore = async (endPoint) => {
  try {
    let result = await fetch(url + endPoint);
    let data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};
//! Submit to Cart
const submitToCart = (product) => {
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    // If the product is already in the cart, increment the count
    cart[existingProductIndex].count += 1;
  } else {
    // If the product is not in the cart, add it with count 1
    const newProduct = { ...product, count: 1 };
    cart.push(newProduct);
  }

  console.log("Product added to cart:", cart);
  console.log(cart)
};

const submitToCartButtonClickHandler = (event) => {
  const productId = event.target.dataset.id;
  const productTitle = event.target.dataset.title;
  const productPrice = event.target.dataset.price;
  const productCount = event.target.dataset.count;
  // Retrieve other product information attributes as needed

  const product = {
    id: productId,
    title: productTitle,
    price: productPrice,
    count: productCount
    // Include other product information as needed
  };

  submitToCart(product);
};
//! Display Cart

const displayCart = () => {
  const myModal = new bootstrap.Modal(document.getElementById('cartModal'));
  const cartModalBody = document.getElementById("cartModalBody");
  const taxRate = 0.1; // 
  const shippingCost = 5; 
  // Clear existing content
  cartModalBody.innerHTML = "";

  // Check if the cart is empty
  if (cart.length === 0) {
    cartModalBody.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let subtotal = 0;

  // Generate HTML for each cart item
  cart.forEach((item) => {
    const itemElement = document.createElement("p");
const boldText = document.createElement("b");
boldText.textContent = `${item.title} (Quantity: ${item.count}):`;
itemElement.appendChild(boldText);
itemElement.innerHTML += ` $${item.price * item.count}`;
cartModalBody.appendChild(itemElement);

    

    // Calculate subtotal
    subtotal += item.price * item.count;
  });

  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  // Display subtotal, tax, shipping, and total
  const subtotalElement = document.createElement("p");
const boldText = document.createElement("b");
boldText.textContent = "Subtotal:";
subtotalElement.appendChild(boldText);
subtotalElement.innerHTML += ` $${subtotal.toFixed(2)}`;
cartModalBody.appendChild(subtotalElement);

// Tax
const taxElement = document.createElement("p");
const boldTaxText = document.createElement("b");
boldTaxText.textContent = "Tax:";
taxElement.appendChild(boldTaxText);
taxElement.innerHTML += ` $${tax.toFixed(2)}`;
cartModalBody.appendChild(taxElement);

// Shipping
const shippingElement = document.createElement("p");
const boldShippingText = document.createElement("b");
boldShippingText.textContent = "Shipping:";
shippingElement.appendChild(boldShippingText);
shippingElement.innerHTML += ` $${shippingCost.toFixed(2)}`;
cartModalBody.appendChild(shippingElement);

// Total
const totalElement = document.createElement("p");
const boldTotalText = document.createElement("b");
boldTotalText.textContent = "Total:";
totalElement.appendChild(boldTotalText);
totalElement.innerHTML += ` $${total.toFixed(2)}`;
cartModalBody.appendChild(totalElement);



  // Show the modal
  myModal.show();
};






const createCard = (product) => {
  // 1) create elements
  const cardContainer = document.createElement("div");
  cardContainer.className = "card";

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const h5 = document.createElement("h5");
  h5.className = "mb-0";

  const button = document.createElement("button");
  button.className = "btn btn-link addToCart";
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", `#collapse${product.id}`);  
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-controls", `collapse${product.id}`);
  button.setAttribute("data-product-id", product.id); 


  //appending html children

  button.innerHTML = product.title;
  h5.appendChild(button);
  cardHeader.appendChild(h5);
  cardContainer.appendChild(cardHeader);
  //creete
  const collapseDiv = document.createElement("div");
  collapseDiv.id = `collapse${product.id}`;
  collapseDiv.className = "collapse";
  collapseDiv.setAttribute("aria-labelledby", `heading${product.id}`);
  collapseDiv.setAttribute("data-parent", "#accordion");

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  cardBody.innerHTML = `<p class="card-text"><b>ID:</b> ${product.id}</p>
  <img src="${product.image}" class="img-thumbnail" alt="${product.title}">
                        <p class="card-text"><b>Description:</b> ${product.description}</p>
                        <br>
                        <p class="card-text"> 
                        <b>Rating</b>: ${product.rating.rate} 
                        <br>
                        <b>Count:</b> ${product.rating.count}</p>
                        <br>
                        <p class="card-text"><b>Price:</b> $${product.price}</p>`;

  const addToCartButton = document.createElement("button");
  addToCartButton.className = "addToCart btn btn-outline-primary";
  addToCartButton.setAttribute("data-id", product.id);
  addToCartButton.setAttribute("data-title", product.title);
  addToCartButton.setAttribute("data-price", product.price);
  addToCartButton.setAttribute("data-count", product.count);
  addToCartButton.addEventListener("click", submitToCartButtonClickHandler);
  addToCartButton.textContent = "Add to Cart";

  // Appending to html file
  cardBody.appendChild(addToCartButton);
  collapseDiv.appendChild(cardBody);
  cardContainer.appendChild(collapseDiv);

  return cardContainer;
};

const displayCards = (products) => {
  // create elements
  const accordion = document.createElement("div");
  accordion.id = "accordion";
  // mapping products
  const productCards = products.map((product) => createCard(product));

  productCards.forEach((productCard) => {
    accordion.appendChild(productCard);
  });

  //clear current cards
  clearDisplay();
  //append new cards
  display.appendChild(accordion);
};

document.addEventListener("DOMContentLoaded", function() {
document.getElementById('cartTab').addEventListener("click", async (e) => {
  e.stopPropagation();

  displayCart();
});

document.addEventListener("click", async (event) => {
  
  const clickedElement = event.target;
  
  if (clickedElement.tagName === "button" && clickedElement.classList.contains("addToCart")) {
    // Stop the event from propagating to parent elements
    event.stopPropagation();

    const productId = clickedElement.id;

    try {
      const productDetails = await fakeStore(`products/${productId}`);
      submitToCart(productDetails);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }
});

document.getElementById("electronicTab").addEventListener("click", async () => {
  try {
    const data = await fakeStore("products/category/electronics");
    clearDisplay();
    displayCards(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

document.getElementById("jeweleryTab").addEventListener("click", async () => {
  try {
    const data = await fakeStore("products/category/jewelery");
    clearDisplay();
    displayCards(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

document
  .getElementById("mensClothingTab")
  .addEventListener("click", async () => {
    try {
      const data = await fakeStore(mensClothingURL);
      clearDisplay();
      displayCards(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

document
  .getElementById("womensClothingTab")
  .addEventListener("click", async () => {
    try {
      const data = await fakeStore(womensClothingURL);
      clearDisplay();
      displayCards(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    // Perform checkout 
    cart.length = 0;
    displayCart();
  });

window.onload = async () => {
  try {
    const data = await fakeStore("products");
    displayCards(data);
  } catch (error) {
    // Error handling
    console.error("Error fetching data:", error);
  }
};
});