const myLibrary = [];

function Book(title, author, pages, read, pos) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.pos = pos;
}

function addBookToLibrary(t, a, p, r, pos) {
  const book = new Book(t, a, p, r, pos);
  myLibrary.push(book);
  return book;
}

myLibrary.push(new Book("The Hobbit", "Jrr Tolkien", 459, "no", 1));
myLibrary.push(new Book("Harry Potter", "Jk Rowling", 789, "yes", 2));
myLibrary.push(new Book("1986", "Orwell", 340, "yes", 3));

function showBooks(library) {
  const tbody = document.querySelector("tbody");
  for (const i in library) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    //loop through book property except the last one
    const keys = Object.keys(library[i]);
    for (let j = 0; j < keys.length - 1; j++) {
      const td = document.createElement("td");
      td.textContent = library[i][keys[j]];
      tr.appendChild(td);
    }

    //add button change read status
    const td1 = document.createElement("td");
    const readBtn = document.createElement("button");
    readBtn.setAttribute("class", "readButton");
    //removeBtn and readBtn cant have same id
    readBtn.setAttribute("id", `${library[i].pos}*`);
    readBtn.textContent = "click";
    td1.appendChild(readBtn);
    tr.appendChild(td1);

    //associate dom elem with book
    const td2 = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "removeButton");
    removeBtn.setAttribute("id", library[i].pos);
    removeBtn.textContent = "X";
    td2.appendChild(removeBtn);
    tr.appendChild(td2);
  }

  prepareRemove();
  prepareChangeReadStatus();
}

function prepareRemove() {
  let removeBtns = document.querySelectorAll(".removeButton");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      for (const i in myLibrary) {
        if (myLibrary[i].pos == removeBtn.id) {
          myLibrary.splice(i, 1);
        }
      }
      //clear table then reload updated
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = "";
      showBooks(myLibrary);
    });
  });
}

function prepareChangeReadStatus() {
  let readBtns = document.querySelectorAll(".readButton");
  readBtns.forEach((readBtn) => {
    readBtn.addEventListener("click", () => {
      for (const i in myLibrary) {
        if (readBtn.id == `${myLibrary[i].pos}*`) {
          //change book read status
          if (myLibrary[i].read == "yes") {
            myLibrary[i].read = "no";
          } else if (myLibrary[i].read == "no") {
            myLibrary[i].read = "yes";
          }
        }
      }
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = "";
      showBooks(myLibrary);
    });
  });
}

showBooks(myLibrary);

const form = document.querySelector("form");
const btn = document.querySelector("#newBookButton");
btn.addEventListener("click", () => {
  form.style.display = "block";
});

const submitBtn = document.querySelector("#submitButton");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");

  let readY = document.querySelector("#read-yes");
  let readN = document.querySelector("#read-no");
  let answer = "no answer";
  if (readY.checked) {
    answer = "yes";
  } else if (readN.checked) {
    answer = "no";
  }

  let posInLibrary = myLibrary.length + 1;
  addBookToLibrary(
    title.value,
    author.value,
    pages.value,
    answer,
    posInLibrary
  );

  //clear table then reload updated
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  showBooks(myLibrary);

  form.style.display = "none";
  form.reset();
});
