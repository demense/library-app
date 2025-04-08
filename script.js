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

// This function adds books to the "library" array
function addBookToLibrary(title, author, pages, read) {
  const newBookId = crypto.randomUUID();
  const newBook = new Book(title, author, pages, read, newBookId);
  library.push(newBook);
}

const testBook = addBookToLibrary("test","test","23","Yes");

console.log(library)