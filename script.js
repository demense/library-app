// Book objects are stored in this array
const library = [];

// Constructor for book objects
function Book(title, author, pages, read, id) {
  if (!new.target) {
    throw Error("You should call the constructor with 'new'");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

// This function add books to the library
function addBookToLibrary(title, author, pages, read) {
  // Generate random ID for the book
  const bookId = crypto.randomUUID();

  // Create a book and add it to library
  const book = new Book(title, author, pages, read, bookId);
  library.push(book);
}

// This function renders books
function renderBooks() {
  const tbody = document.querySelector("tbody");

  for (let i = 0; i < library.length; i++) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const title = document.createElement("td");
    title.textContent = library[i].title;
    tr.appendChild(title);

    const author = document.createElement("td");
    author.textContent = library[i].author;
    tr.appendChild(author);

    const pages = document.createElement("td");
    pages.textContent = library[i].pages;
    tr.appendChild(pages);

    const read = document.createElement("td");
    read.textContent = library[i].read;
    tr.appendChild(read);

    console.log(library[i]);
  }
}

const testBook1 = addBookToLibrary("test", "test", "23", "Yes");
const testBook2 = addBookToLibrary("test", "test", "23", "Yes");
const testBook3 = addBookToLibrary("test", "test", "23", "Yes");

renderBooks();
