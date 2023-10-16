import { addToFavorites } from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
  const bookContainer = document.getElementById("book-container");
  const allButton = document.getElementById("btn-all");
  const fictionButton = document.getElementById("btn_fiction");
  const nonfictionButton = document.getElementById("btn-nonfiction");
  const classicButton = document.getElementById("btn-classic");
  const scifiButton = document.getElementById("btn-scifi");
  const FantasyButton = document.getElementById("btn-Fantasy");
  const booksSection = document.getElementById("Books");

  let allBooksData = []; // Store all books data here
  let currentPage = 1;
  const booksPerPage = 10;
  let currentType = ""; // Default to display all books

  // Function to display books based on the selected type and page
  function displayBooksByTypeAndPage(type, page) {
    const startIndex = (page - 1) * booksPerPage; // 0
    const endIndex = startIndex + booksPerPage; // 10
    const filteredBooks = allBooksData
      .filter(book => type === "" || book.type === type) // Display all books if type is empty
      .slice(startIndex, endIndex);
    renderBooks(filteredBooks);
    updatePaginationButtons();
  }

  // Function to render books in the bookContainer
  function renderBooks(books) {
    booksSection.innerHTML = ''; // Clear the existing books
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('Books_card');
      bookCard.innerHTML = `
        <a href="#" class="book__link">
          <img src="${book.image}" alt="cover" width="280rem" height="280rem">
          <div class="book__overlay">
            <p>Read More</p>
          </div>
        </a>
        <p class="newBooks-card_text">${book.author}</p>
        <h1 class="newBooks-card_title">${book.title}</h1>
        <a href="${book.download}" style="font-size: 24px; color: black;">download</a>
        <button class="add-to-fav" data-id="${book.id}"><i class="fa-solid fa-heart"></i></button>
      `;
      booksSection.appendChild(bookCard);
    });

    // Get all the buttons in the type-buttons container
    const buttons = document.querySelectorAll('#type-buttons button');

    // Add the "active" class to the "All" button by default
    const allButton = document.getElementById('btn-all');
    allButton.classList.add('active');

    // Add click event listeners to the buttons
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        // Remove the active class from all buttons
        buttons.forEach((btn) => btn.classList.remove('active'));

        // Add the active class to the clicked button
        button.classList.add('active');

        // You can also perform other actions associated with the button click here
        // For example, update the content based on the button clicked
      });
    });

    const userFavorites = []; // Or import it from elsewhere if you are using it from another file

    // Add a click event listener to each "add-to-fav" button
    const addToFavButtons = document.querySelectorAll('.add-to-fav');
    addToFavButtons.forEach(button => {
      button.addEventListener('click', () => {
        const bookId = button.dataset.id;
        const userId = localStorage.getItem("userId");
        addToFavorites(userFavorites, userId, bookId);
      });
    });
  }

  // Function to update pagination buttons based on the current page
  function updatePaginationButtons() {
    const totalPages = Math.ceil(
      allBooksData.filter(book => currentType === "" || book.type === currentType).length / booksPerPage
    );

    // Show/hide the "Previous" button
    document.getElementById("prev-button").style.display = currentPage > 1 ? "block" : "none";

    // Show/hide the "Next" button
    document.getElementById("next-button").style.display = currentPage < totalPages ? "block" : "none";
  }

  // Fetch all books data and store it
  fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => {
      allBooksData = data;
      displayBooksByTypeAndPage(currentType, currentPage); // Display all books initially
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

  // Add event listeners to the type buttons (including "All")
  allButton.addEventListener("click", () => {
    currentType = "";
    currentPage = 1;
    displayBooksByTypeAndPage(currentType, currentPage);
  });
  fictionButton.addEventListener("click", () => {
    currentType = "Fiction";
    currentPage = 1;
    displayBooksByTypeAndPage(currentType, currentPage);
  });
  nonfictionButton.addEventListener("click", () => {
    currentType = "Non-Fiction";
    currentPage = 1;
    displayBooksByTypeAndPage(currentType, currentPage);
  });
  classicButton.addEventListener("click", () => {
    currentType = "Classic";
    currentPage = 1;
    displayBooksByTypeAndPage(currentType, currentPage);
  });
  scifiButton.addEventListener("click", () => {
    currentType = "Science Fiction";
    currentPage = 1;
    displayBooksByTypeAndPage(currentType, currentPage);
  });
  FantasyButton.addEventListener("click", () => {
    currentType = "Fantasy";
    currentPage = 1;
    displayBooksByTypeAndPage(currentType, currentPage);
  });

  // Add event listeners to pagination buttons
  document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayBooksByTypeAndPage(currentType, currentPage);
    }
  });

  document.getElementById("next-button").addEventListener("click", () => {
    const totalPages = Math.ceil(
      allBooksData.filter(book => currentType === "" || book.type === currentType).length / booksPerPage
    );
    if (currentPage < totalPages) {
      currentPage++;
      displayBooksByTypeAndPage(currentType, currentPage);
    }
  });
});
