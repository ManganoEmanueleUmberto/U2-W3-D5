const isLoading = (bool) => {
  const loader = document.querySelector(".spinner-border");
  if (bool) {
    loader.classList.remove("d-none");
  } else if ((bool = false)) {
    loader.classList.add("d-none");
  }
};
const fetchGeneral = (URL) => {
  fetch(URL, {
    headers: {
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
      isLoading(false);
      const row = document.getElementById("product-container");
      row.innerHTML = "";
      product.forEach((product) => {
        const { _id, name, description, brand, imageUrl, price } = product;
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
        <img src="${imageUrl}" class="card-img-top mt-3 p-2">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text lead">${description}</p>
          <p class="card-text fs-3 font-monospace">${price}€</p>
          <a href="${"./details.html?id=" + _id}" class="btn btn-outline-danger me-auto">Scopri di più</a>
          <a href="${"./backoffice.html?id=" + _id}" class="btn btn-outline-danger ">Modifica</a>
        </div> `;
        row.appendChild(col);
        col.appendChild(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const URLbasic = "https://striveschool-api.herokuapp.com/api/product/";

window.addEventListener("DOMContentLoaded", () => {
  isLoading(true);
  fetchGeneral(URLbasic);
});
