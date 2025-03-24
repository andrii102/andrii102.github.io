document.addEventListener("DOMContentLoaded", function () {
    // Масив книжок як об'єкти
    const bestsellers = [
        { title: "Абрикоси Донбасу", author: "Любов Якимчук", image: "assets/book1.jpg", description: "Поетична збірка про війну та рідний край." },
        { title: "Оповідь", author: "Роберт Маккі", image: "assets/book2.jpg", description: "Мистецтво написання сценаріїв." },
        { title: "Я перетворююсь", author: "Володимир Вакуленко-К", image: "assets/book3.jpg", description: "Вірші та роздуми про життя." },
        { title: "Всі системи: Небезпека", author: "Марта Веллс", image: "assets/book4.jpg", description: "Науково-фантастичний роман про андроїда." },
        { title: "Під скляним ковпаком", author: "Сильвія Плат", image: "assets/book5.jpg", description: "Культовий роман про внутрішню боротьбу." },
        { title: "Далекі Близькі", author: "Володимир Єрмоленко", image: "assets/book6.jpg", description: "Есе про мандри та самопізнання." },
        { title: "Тіні Забутих Предків", author: "Михайло Коцюбинський", image: "assets/book7.jpg", description: "Класичний твір про гуцульську культуру." },
        { title: "Вересова міль", author: "Оксана Була", image: "assets/book8.jpg", description: "Дитяча казка з екологічним підтекстом." },
        { title: "Череп, що шепоче", author: "Джонатан Страуд", image: "assets/book9.jpg", description: "Детективна історія у стилі фентезі." }
    ];

    // Перемішуємо масив книг
    function shuffleBooks(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function generateBooks() {
        const booksContainer = document.getElementById("bestsellers-list");
        booksContainer.innerHTML = ""; // Очищення контейнера

        const selectedBooks = shuffleBooks([...bestsellers]).slice(0, 5); // Беремо перші 5 книг

        selectedBooks.forEach(book => {
            let bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            bookCard.innerHTML = `
                <a href="#">
                    <img src="${book.image}" alt="${book.title}">
                </a>
                <h3>${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p>${book.description}</p>
                <a href="#" class="btn">Детальніше</a>
            `;

            booksContainer.appendChild(bookCard);
        });
    }

    generateBooks();
});
