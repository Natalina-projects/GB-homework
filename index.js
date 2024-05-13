// Задание 1
class Library {
    #books;
    constructor(initialBooks = []) {
        if (new Set(initialBooks).size !== initialBooks.length) {
            throw new Error('Исходный список книг содержит дубликаты');
        }
        this.#books = initialBooks;
    }

    get allBooks() {
        return [...this.#books];
    }

    addBook(title) {
        if (this.#books.includes(title)) {
            throw new Error(`Книга с названием ${title} уже есть в библиотеке`);
        }
        this.#books.push(title);
    }

    removeBook(title) {
        const bookIndex = this.#books.indexOf(title);
        if (bookIndex === -1) {
            throw new Error (`Книги с названием ${title} нет в библиотеке`);
        }
        this.#books.splice(bookIndex, 1);
    }

    hasBook(title) {
        return this.#books.includes(title);
    }

}

try {
    const myLibrary = new Library(['Сто лет одиночества', 'Алхимик', 'Краткая история времени', 'Зов предков']);
    console.log(myLibrary.allBooks);
    myLibrary.addBook('Мастер и Маргарита');
    console.log(myLibrary.allBooks);
    myLibrary.removeBook('Алхимик');
    console.log(myLibrary.allBooks);
    console.log(myLibrary.hasBook('Зов предков'));
} catch (error) {
    console.log(error);
}

// Задание 2

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

function displayReviews() {
    const container = document.getElementById('product-reviews');
    container.innerHTML = '';

    initialData.forEach(item => {
        const productHeader = document.createElement('h3');
        productHeader.textContent = item.product;
        container.appendChild(productHeader);

        item.reviews.forEach(review => {
            const reviewParagraph = document.createElement('p');
            reviewParagraph.textContent = review.text;
            container.appendChild(reviewParagraph);
        });
    });
}

function addReview(text) {
    if (text.length < 50 || text.length > 500) {
        throw new Error('Отзыв должен содержать от 50 до 500 символов.');
    }
    const reviewParagraph = document.createElement('p');
    reviewParagraph.textContent = text;
    document.getElementById('product-reviews').appendChild(reviewParagraph);
}

document.addEventListener('DOMContentLoaded', () => {
    displayReviews();
    const submitButton = document.getElementById('submit-review');
    submitButton.addEventListener('click', () => {
        try {
            const reviewText = document.getElementById('review-text').value;
            addReview(reviewText);
        } catch (error) {
            alert(error.message);
        }
    });
});


