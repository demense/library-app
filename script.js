// Book objects are stored in this array
const library = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleReadStatus() {
    if (this.read === "Yes") {
      this.read = "No";
    } else if (this.read === "No") {
      this.read = "Yes";
    }
  }
}

showNewBookForm();

// ######### Function Declarations #########

// This function add books to the library
function addBookToLibrary(title, author, pages, read) {
  // Create a book and add it to library
  const book = new Book(title, author, pages, read);
  library.push(book);
}

// This function renders books
function renderBooks() {
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

    const remove = document.createElement("td");
    remove.setAttribute("class", "invisible-border");
    const removeIcon = document.createElement("img");
    removeIcon.src = "./delete.svg";
    removeIcon.alt = "delete icon";
    removeIcon.setAttribute("data-id", library[i].id);
    remove.appendChild(removeIcon);
    tr.appendChild(remove);

    removeIcon.addEventListener("click", function () {
      removeBookFromLibrary(removeIcon);
    });

    const toggleReadStatus = document.createElement("td");
    toggleReadStatus.setAttribute("class", "invisible-border");
    const toggleReadStatusIcon = document.createElement("img");
    toggleReadStatusIcon.src = "./toggle_read_status.svg";
    toggleReadStatusIcon.alt = "toggle read status icon";
    toggleReadStatusIcon.setAttribute("data-id", library[i].id);
    toggleReadStatus.appendChild(toggleReadStatusIcon);
    tr.appendChild(toggleReadStatus);

    toggleReadStatusIcon.addEventListener("click", function () {
      const toggleReadStatusIconId = this.dataset.id;
      const bookIndex = library.findIndex(
        (obj) => obj.id === toggleReadStatusIconId
      );

      library[bookIndex].toggleReadStatus();
      // console.log(library);

      renderBooks();
    });
  }
}

// This function open a form modal to fill new book info
function showNewBookForm() {
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

// This function removes a book from the library
function removeBookFromLibrary(icon) {
  const removeIconId = icon.dataset.id;
  const bookIndex = library.findIndex((obj) => obj.id === removeIconId);

  library.splice(bookIndex, 1);

  renderBooks();
}

// #########################################

// Testing
// const testBook1 = addBookToLibrary("test", "test", "23", "Yes");
// const testBook2 = addBookToLibrary("test", "test", "23", "Yes");
// const testBook3 = addBookToLibrary("test", "test", "23", "Yes");
