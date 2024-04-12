const fetchProduct = (URL) => {
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTY1NzdmMzA0NjAwMWFlNTlmNWUiLCJpYXQiOjE3MTI5MDc4NjMsImV4cCI6MTcxNDExNzQ2M30.MQwAGW4OwOKbVuXMfUAqhEzXOXcTW6b_h-fzQ_3HcIk",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Fetch error");
      }
    })
    .then((product) => {
      if (document.querySelector(".spinner-border")) {
        isLoading(true);
      }

      const row = document.getElementById("product-container");
      row.innerHTML = "";
      const { _id, name, description, brand, imageUrl, price } = product;
      const col = document.createElement("div");
      col.classList.add("col");
      col.innerHTML = `
        <img src="${imageUrl}" class=" img-fluid mt-5"/>
        `;
      const col2 = document.createElement("div");
      col2.classList.add("col");
      col2.innerHTML = `
        <div class="mt-5 mb-4">
        <h1 class="fs-4"> ${name} </h1>
        <p class="fs-5 text-danger fw-semibold "> ${price}€</p>
      
        <p class="lead mb-5"> ${description} </p>

        <button class="btn btn-outline-danger fs-">Aggiungi al carrello</button>
        </div>
        `;
      row.appendChild(col);

      row.appendChild(col2);
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchRecommended = (URL) => {
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTY1NzdmMzA0NjAwMWFlNTlmNWUiLCJpYXQiOjE3MTI5MDc4NjMsImV4cCI6MTcxNDExNzQ2M30.MQwAGW4OwOKbVuXMfUAqhEzXOXcTW6b_h-fzQ_3HcIk",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Fetch error");
      }
    })
    .then((product) => {
      for (let i = 0; i < 4; i++) {
        isLoading(false);
        const row = document.getElementById("recommended-container");
        const { _id, name, imageUrl, price } = product[i];
        const col = document.createElement("div");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add(
          "card",
          "mb-4",
          "shadow",
          "border-end-0",
          "border-bottom-0",
          "border-start-0",
          "border-2",
          "border-danger",
          "rounded-4"
        );
        card.innerHTML = `
        <img src="${imageUrl}" class="card-img-top mt-2 p-2" style=" width: 100px; height:80px; object-fit:cover; ">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text fs-3 font-monospace">${price}€</p>
          <a href="${"./details.html?id=" + _id}" class="btn btn-outline-danger ">Vai al prodotto</a>
        </div> 
        `;

        row.appendChild(col);
        col.appendChild(card);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const isLoading = (bool) => {
  const loader = document.querySelector(".spinner-border");
  if (bool) {
    loader.classList.remove("d-none");
  } else if ((bool = false)) {
    loader.classList.add("d-none");
  }
};
const URLbasic = "https://striveschool-api.herokuapp.com/api/product/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
window.addEventListener("DOMContentLoaded", () => {
  isLoading(true);
  fetchProduct(URLbasic + id);
  fetchRecommended(URLbasic);
});
