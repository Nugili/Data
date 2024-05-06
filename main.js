function searchBooks() {
  var searchTerm = document.getElementById("searchInput").value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      displayBooks(data.items);
    });
}

function displayBooks(books) {
  var bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  books.forEach((book) => {
    var title = book.volumeInfo.title;
    var authors = book.volumeInfo.authors.join(", ");
    var buyButton = `<button onclick="showForm('${title}', '${authors}')">Купить</button>`;
    bookList.innerHTML += `<div><strong>${title}</strong> - ${authors} ${buyButton}</div>`;
  });
}

function showForm(title, authors) {
  var form = `
    <form onsubmit="submitForm(event, '${title}', '${authors}')">
        <input type="text" id="nameInput" placeholder="Имя" required><br>
        <input type="email" id="emailInput" placeholder="Почта" required><br>
        <input type="tel" id="phoneInput" placeholder="Телефон" required><br>
        <input type="text" id="addressInput" placeholder="Адрес" required><br>
        <button type="submit">Отправить</button>
    </form>
    `;
  document.getElementById("bookList").innerHTML += form;
}

function submitForm(event, title, authors) {
  event.preventDefault();
  var name = document.getElementById("nameInput").value;
  var email = document.getElementById("emailInput").value;
  var phone = document.getElementById("phoneInput").value;
  var address = document.getElementById("addressInput").value;

  var data = {
    name: name,
    email: email,
    phone: phone,
    address: address,
    bookTitle: title,
    bookAuthors: authors,
  };

  // Отправка данных в Google Sheets API
  fetch("YOUR_GOOGLE_SHEETS_API_ENDPOINT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      alert("Данные успешно отправлены!");
    } else {
      alert("Произошла ошибка при отправке данных.");
    }
  });
}
