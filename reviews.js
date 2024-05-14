document.addEventListener('DOMContentLoaded', function () {
    loadReviews();
    const addButton = document.getElementById('add-review');
    addButton.addEventListener('click', addReview);
});

function loadReviews() {
    const reviewContainer = document.getElementById('reviews-list');
    reviewContainer.innerHTML = '';

    const reviews = JSON.parse(localStorage.getItem('productReviews')) || {};
    for (let productName in reviews) {
        let productDiv = document.createElement('div');
        let productNameDiv = document.createElement('div');
        productNameDiv.textContent = productName;
        productNameDiv.style.fontWeight = 'bold';
        productDiv.appendChild(productNameDiv);

        reviews[productName].forEach((review, index) => {
            let reviewDiv = document.createElement('div');
            reviewDiv.textContent = review;
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = function () {
                deleteReview(productName, index);
            }
            reviewDiv.appendChild(deleteButton);
            productDiv.appendChild(reviewDiv);
        });
        reviewContainer.appendChild(productDiv);
    }

}

function addReview() {
    const productName = document.getElementById('product-name').value;
    const productReview = document.getElementById('product-review').value;

    if(!productName || !productReview) {
        alert('Пожалуйста, заполните название продукта и отзыв');
        return;
    }
    const reviews = JSON.parse(localStorage.getItem('productReviews')) || {};
    if (!reviews[productName]) {
        reviews[productName] = [];
    }
    reviews[productName].push(productReview);

    localStorage.setItem('productReviews', JSON.stringify(reviews));
    document.getElementById('product-name').value = '';
    document.getElementById('product-review').value = '';
    loadReviews();
}

function deleteReview(productName, reviewIndex) {
    const reviews = JSON.parse(localStorage.getItem('productReviews')) || {};
    reviews[productName].splice(reviewIndex, 1);

    if(reviews[productName].length === 0) {
        delete reviews[productName];
    }

    localStorage.setItem('productReviews', JSON.stringify(reviews));
    loadReviews();
}


