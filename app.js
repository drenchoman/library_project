let myLibrary = [];


function Book(title, author, pages, readBook) {
  this.title = title,
    this.author = author,
    this.pages = pages + " pages",
    this.readBook = readBook

}

function validateForm() {
  let a = aI.value
  let b = tI.value;
  let c = pI.value;
  if (a === "" || b === "" || c === "") {
    alert("All fields must be filled out");
    return false;
  }
  return true;
};

// Add event listeners
let addBox = document.querySelector("#addBox")
addBox.addEventListener("click", getBook);

function getBook() {
  if (validateForm() === true) {
    closePop();
    saveBook();
    render();
    clearCard();
  } else {}

}

function saveBook() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = readInput.checked;
  myLibrary.push(new Book(title, author, pages, read));
  savaDataToLocalStorage();
}


function clearCard() {
  rI.value = "";
  tI.value = "";
  aI.value = "";
  pI.value = "";
}

function render() {
  let cardDiv = document.querySelectorAll(".cardDiv")
  cardDiv.forEach(book => wrapper.removeChild(book));

  for (i = 0; i < myLibrary.length; i++) {
    createCard(myLibrary[i]);
  };
};

function createCard(item) {

  let newCard = document.createElement("div")
  newCard.classList.add("cardDiv")

  let titleEl = document.createElement("p");
  titleEl.textContent = item.title
  newCard.appendChild(titleEl);

  let authorEl = document.createElement("p");
  authorEl.textContent = item.author;
  newCard.appendChild(authorEl);

  let pagesEl = document.createElement("p");
  pagesEl.textContent = item.pages;
  newCard.appendChild(pagesEl);

  let readEl = document.createElement("button")

  let bookStatus = item.readBook;
  if (bookStatus === true) {
    readEl.textContent = "Read"
    readEl.classList.add("green")
  } else if (bookStatus === false) {
    readEl.textContent = "Not Read"
    readEl.classList.add("red")
  }

  readEl.addEventListener("click", changeStatus);

  readEl.addEventListener("click", () => {
    item.readBook = !item.readBook;
    savaDataToLocalStorage();
    render();
  });

  newCard.appendChild(readEl);

  let del = document.createElement("button");
  del.textContent = "Remove Book"

  del.addEventListener("click", () => {

    myLibrary.splice(myLibrary.indexOf(item), 1);
    savaDataToLocalStorage();
    render();
  })
  newCard.appendChild(del)

  wrapper.appendChild(newCard);

}



function changeStatus(e) {
  let status = e.target.className;
  console.log(e.target)
  if (status === "red") {
    e.target.classList.remove("red")
    e.target.classList.add("green")
    e.target.textContent = "Read";
  } else if (status === "green") {
    e.target.classList.remove("green")
    e.target.classList.add("red")
    e.target.textContent = "Not Read"
  }
};


//create a card

let wrapper = document.querySelector(".wrapper")
let aI = document.querySelector("#authorInput")
let pI = document.querySelector("#pagesInput")
let tI = document.querySelector("#titleInput")
let rI = document.querySelector("#readInput")


// Pop up FORM
let popUp = document.querySelector(".modal")
let addBook = document.querySelector(".bookButton")
addBook.addEventListener("click", popInput);

function popInput() {
  popUp.style.display = "block"
};

let closeIt = document.querySelector(".close");
closeIt.addEventListener("click", closePop);

function closePop() {
  popUp.style.display = "none";
};


// setting Library to be stored in local storage
function savaDataToLocalStorage() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
};

function returnBooks() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let savedData = localStorage.getItem('myLibrary')
    data = JSON.parse(savedData);
    myLibrary = data;
    render();
  }
}

returnBooks();
