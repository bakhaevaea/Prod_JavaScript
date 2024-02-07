function addReview(){
    // считываем введенные значения
    const nameProd = document.getElementById("name_prod").value;
    const textReview = document.getElementById("text_review").value;
    if (nameProd && textReview ){  // если что-то не заполнено, просим заполнить
        // записываем в localStorage с общим ключом reviews. Для этого сначала считываем все с этим ключом
        // затем добавляем новый отзыв в массив. Обновленные данные записываем в localStorage
        const oldReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        oldReviews.push({ nameProd , textReview });
        localStorage.setItem("reviews", JSON.stringify(oldReviews));
        // опустошаем поля ввода
        document.getElementById("name_prod").value = "";
        document.getElementById("text_review").value = "";
    }
    else 
    alert("Введите название продукта и отзыв")
}

function viewAllReview(){
    // Нужно вывести список продуктов с отзывами
    // для этого считываем все из localStorage, и записываем в set назвния продуктов, 
    //чтобы не было повторений
    const oldReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let productsWithReview = new Set();
    oldReviews.forEach(element => {
        productsWithReview.add(element.nameProd)
    });

    const listProd = document.getElementById("products");
    listProd.innerHTML = "";
    for (const product of productsWithReview) {
        const newList = document.createElement("li");
        newList.innerHTML = `<a href="#" class="link_prod">${product}</a>`;
        listProd.appendChild(newList);

        // обработчик событий клика на продукт
        newList.querySelector(".link_prod").addEventListener("click", () => {
        reviewsForProduct(product);
      });
    }
}

function reviewsForProduct(product){
    // считываем все отзывы из localStorage
    const oldReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    document.getElementById("reviews_for_product").textContent = 'Отзывы продукта '+ product;
    const listReviews = document.getElementById("products");
    listReviews.innerHTML = "";

    for (const review of oldReviews){
        if (review.nameProd === product){
            const newList = document.createElement("li");
            newList.innerHTML = `${review.textReview} 
            <p></p> 
            <button class = "btn del_btn">Удалить отзыв</button>`;
            listReviews.appendChild(newList);

            // Кнопка удаления отзыва
            newList.querySelector(".del_btn").addEventListener("click", () => {
                deleteReview(product, review.textReview);
            });
        }
    }
}

function deleteReview(curNameProd, curTextReview){
    // берем все отзывы из localStorage, 
    // из полученного массива удаляем нужный элемент,
    // записываем получившийся массив обратно в localStorage
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const newReviews = allReviews.filter((rev) => !(rev.nameProd === curNameProd && rev.textReview === curTextReview));
    localStorage.setItem("reviews", JSON.stringify(newReviews));
    document.getElementById("products").innerHTML = "";
}



document.getElementById("add_review_btn").addEventListener("click", addReview);
document.getElementById("view_review_btn").addEventListener("click", viewAllReview);
