/**
 * Gère l'affichage et les interactions de la page des favoris
 */
loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/article",
        {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            "body": JSON.stringify({ favorites: getFavoritesId() })
        }).then(data => data.json())
        .then(jsonListArticle => {
            for (let jsonArticle of jsonListArticle) {
                let article = new Article(jsonArticle);
                document.querySelector(".container").innerHTML += `<div class="col-12 mt-5">
                                                                        <div class="card article">
                                                                            <div class="card-header">
                                                                                <h5 class="card-title d-flex justify-content-between">${article.title}<span class="publication-date">${article.getFormatedDate()}</span></h5>
                                                                            </div>
                                                                            <img src="${config.host}/${article.image}" class="card-img-top">
                                                                            <span class="fa-stack fa-2x addFavorite" data-id=${article.id}>
                                                                                <i class="fas fa-star fa-stack-1x"></i>
                                                                                <i class="far fa-star fa-stack-1x"></i>
                                                                            </span>
                                                                            <div class="card-body">
                                                                                <p class="card-text">${article.content}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    `;
            }

            document.querySelectorAll(".addFavorite").forEach(star => {
                star.addEventListener("click", function () {
                    if (this.className.indexOf("activated") != -1) {
                        this.setAttribute("class", "fa-stack fa-2x addFavorite");
                        removeFavorites(this.dataset.id);
                    } else {
                        this.setAttribute("class", "fa-stack fa-2x addFavorite activated");
                        addFavorites(this.dataset.id);
                    }
                });
            });
        });
});