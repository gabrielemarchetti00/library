let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(){
    let title = prompt('Title: ');
    let author = prompt('Author: ');
    let pages = prompt('Pages: ');
    let read = prompt('Read: ');
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

myLibrary.push(new Book('t1', 'a1', 100, 'no'));
myLibrary.push(new Book('t2', 'a2', 200, 'yes'));
myLibrary.push(new Book('t3', 'a3', 700, 'yes'));

function showBooks(library){
    let table = document.querySelector('table');
    for (let i in library){
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (const property in library[i]){
            let td = document.createElement('td');
            td.textContent = library[i][property];
            tr.appendChild(td);
        }  
    }
}

showBooks(myLibrary);

