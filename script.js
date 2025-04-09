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

showForm();

// ######### Function Declarations #########

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
  console.log(library);
  const tbody = document.querySelector("tbody");
  tbody.textContent = "";

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
  }
}

// This function open a dialog with a form to fill new book info
function showForm() {
  const newBookBtn = document.querySelector("#new-book-btn");
  const dialog = document.querySelector("dialog");
  newBookBtn.addEventListener("click", function () {
    dialog.showModal();
    dialog.textContent = "";

    // Create form
    const form = document.createElement("form");
    dialog.appendChild(form);

    // title label
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel);

    // title input
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.required = true;
    titleLabel.appendChild(titleInput);

    // author label
    const authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "author");
    authorLabel.textContent = "Author";
    form.appendChild(authorLabel);

    // author input
    const authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("id", "author");
    authorInput.required = true;
    authorLabel.appendChild(authorInput);

    // pages label
    const pagesLabel = document.createElement("label");
    pagesLabel.setAttribute("for", "pages");
    pagesLabel.textContent = "Pages";
    form.appendChild(pagesLabel);

    // pages input
    const pagesInput = document.createElement("input");
    pagesInput.setAttribute("type", "number");
    pagesInput.setAttribute("id", "pages");
    pagesInput.required = true;
    pagesLabel.appendChild(pagesInput);

    // read label
    const readLabel = document.createElement("label");
    readLabel.setAttribute("for", "read");
    readLabel.textContent = "Read ";
    form.appendChild(readLabel);

    // read input
    const select = document.createElement("select");
    select.setAttribute("id", "read");
    readLabel.appendChild(select);
    const yes = document.createElement("option");
    yes.value = "Yes";
    yes.textContent = "Yes";
    select.appendChild(yes);
    const no = document.createElement("option");
    no.value = "No";
    no.textContent = "No";
    select.appendChild(no);

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "book-submit-btn");
    submitBtn.textContent = "Submit";
    form.appendChild(submitBtn);

    // Add filled book to library
    submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      dialog.close();
      addBookToLibrary(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        select.value
      );
      renderBooks();
    });
  });
}

// #########################################

// Testing
// const testBook1 = addBookToLibrary("test", "test", "23", "Yes");
// const testBook2 = addBookToLibrary("test", "test", "23", "Yes");
// const testBook3 = addBookToLibrary("test", "test", "23", "Yes");
