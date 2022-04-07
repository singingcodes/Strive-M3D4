fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => response.json())
  .then((books) => {
    console.log(books);
    booksCollection = [...books];
    books.forEach((book) => {
      let bookRow = document.querySelector(".book-section");
      let col = document.createElement("div");
      col.classList.add("col-sm-3");
      col.classList.add("mb-3");
      col.innerHTML = `<div class="card">
      <img src="${book.img}" class="card-img-top" alt="${book.title}" class="img-fluid" height="200" width="200">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">Price:€${book.price}</p>
        <p class="card-text d-flex justify-content-between">Category: ${book.category} <span>Id: ${book.asin}<Span></p>
        <button type="button" class="btn btn-info" onclick="removeItem(event)">Skip</button> 
        <button type="button" class="btn btn-primary" onclick="addToCart(event)"><i class="bi bi-cart4 text-white"></i>Add To Cart </button>
      </div>
    </div>`;
      bookRow.appendChild(col);
    });
  });
//   Add an add to cart button into each item
// When this button is pressed: 1) add the item to another list (the cart), and 2) change the card styling to show that the element is in the cart (eg. red border, a badge, an icon… you choose)
const addToCart = (event) => {
  let ItemAdded = document.createElement("div");
  ItemAdded.innerHTML = `<span class="badge badge-danger">Added</span>`;
  ItemAdded.classList.add("added");
  let cartItems = [];
  let selectedItem = event.target.closest(".col-sm-3");
  //selectedItem.style.border = "1px solid red";
  cartItems.push(selectedItem);
  cartItems.forEach((Item) => {
    Item.appendChild(ItemAdded);
  });
};

//This function removes the selected Item
const removeItem = (event) => {
  let selectedItem = event.target.closest(".col-sm-3");
  selectedItem.remove();
};

// Add a search bar. When the user types more than 3 characters, filter the content of the API response to only display the books with a matching (or partially matching) title (hint: use .filter())
const searchBooks = (event) => {
  let searchQuery = event.target.value;
  console.log(event.target.value);
  const bookRow = document.querySelector(".book-section");

  bookRow.innerHTML = "";

  booksCollection
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .forEach((book) => {
      let bookRow = document.querySelector(".book-section");
      let col = document.createElement("div");
      col.classList.add("col-sm-3");
      col.classList.add("mb-3");
      col.innerHTML = `<div class="card">
    <img src="${book.img}" class="card-img-top" alt="${book.title}" class="img-fluid" height="200" width="200">
    <div class="card-body">
      <h5 class="card-title">${book.title}</h5>
      <p class="card-text">Price:€${book.price}</p>
      <p class="card-text d-flex justify-content-between">Category: ${book.category} <span>Id: ${book.asin}<Span></p>
      <button type="button" class="btn btn-info" onclick="removeItem(event)">Skip</button> 
      <button type="button" class="btn btn-primary" onclick="addToCart(event)"><i class="bi bi-cart4 text-white"></i>Add To Cart </button>
    </div>
  </div>`;
      bookRow.appendChild(col);
    });
};
