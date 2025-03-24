const books = [
    { title: "Абрикоси Донбасу", author: "Любов Якимчук", image: "../assets/book1.jpg", description: "Поетична збірка про війну та рідний край." },
    { title: "Оповідь", author: "Роберт Маккі", image: "../assets/book2.jpg", description: "Мистецтво написання сценаріїв." },
    { title: "Я перетворююсь", author: "Володимир Вакуленко-К", image: "../assets/book3.jpg", description: "Вірші та роздуми про життя." },
    { title: "Всі системи: Небезпека", author: "Марта Веллс", image: "../assets/book4.jpg", description: "Науково-фантастичний роман про андроїда." },
    { title: "Під скляним ковпаком", author: "Сильвія Плат", image: "../assets/book5.jpg", description: "Культовий роман про внутрішню боротьбу." },
    { title: "Далекі Близькі", author: "Володимир Єрмоленко", image: "../assets/book6.jpg", description: "Есе про мандри та самопізнання." },
    { title: "Тіні Забутих Предків", author: "Михайло Коцюбинський", image: "../assets/book7.jpg", description: "Класичний твір про гуцульську культуру." },
    { title: "Вересова міль", author: "Оксана Була", image: "../assets/book8.jpg", description: "Дитяча казка з екологічним підтекстом." },
    { title: "Череп, що шепоче", author: "Джонатан Страуд", image: "../assets/book9.jpg", description: "Детективна історія у стилі фентезі." }
];

const products = document.getElementById("product-list");
if (!products) {
    console.error("Element with ID 'product-list' not found.");
}
else{
    products.innerHTML = ""; // Очищення контейнера

    books.forEach((book, index) => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("product");

        bookCard.innerHTML = `
            <a href="#">
                <img src="${book.image}" alt="${book.title}">
            </a>
            <h3>${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <p>${book.description}</p>
            <div class="buttons">
                <a href="#" class="btn details-btn">Детальніше</a>
                <button class="btn add-to-cart" data-index="${index}">Додати в 🛒</button>
            </div>
        `;

        products.appendChild(bookCard);
    }); 
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const bookIndex = event.target.getAttribute("data-index");
            const selectedBook = books[bookIndex];
            addToCart(selectedBook, event.target);
        });
    });
}

function addToCart(book, button) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    button.textContent = "✅ У кошику";
    button.style.backgroundColor = "#28a745"; // Green color
    button.style.color = "white";
    button.disabled = true; // Disable button after adding
}