const URLbasic = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const URLAndId = URLbasic + id;

const method = id ? "PUT" : "POST";
const URLToUse = id ? URLAndId : URLbasic;

const form = document.querySelector("form");

const handleDelete = () => {
  fetch(URLAndId, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTY1NzdmMzA0NjAwMWFlNTlmNWUiLCJpYXQiOjE3MTI5MDc4NjMsImV4cCI6MTcxNDExNzQ2M30.MQwAGW4OwOKbVuXMfUAqhEzXOXcTW6b_h-fzQ_3HcIk",
    },
  })
    .then((response) => {
      if (response.ok) {
        const alert = document.getElementById("alert");
        alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show mt-5" role="alert">
      Il contenuto <strong>${data.name}</strong> è stato eliminato corretamente.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
if (id) {
  const h1 = document.querySelector("h1");
  h1.innerText = "Modifica un prodotto";
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.innerText = "Modifica";
  const btnDelete = document.getElementById("btnDelete");
  btnDelete.classList.remove("d-none");
  btnDelete.addEventListener("click", handleDelete);
  fetch(URLAndId, {
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
      const { _id, name, description, brand, imageUrl, price } = product;
      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("brand").value = brand;
      document.getElementById("imageUrl").value = imageUrl;
      document.getElementById("price").value = price;
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleSubmit = (event) => {
  event.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch(URLToUse, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTY1NzdmMzA0NjAwMWFlNTlmNWUiLCJpYXQiOjE3MTI5MDc4NjMsImV4cCI6MTcxNDExNzQ2M30.MQwAGW4OwOKbVuXMfUAqhEzXOXcTW6b_h-fzQ_3HcIk",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        const alert = document.getElementById("alert");
        alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show mt-5" role="alert">
        Il contenuto <strong>${data.name}</strong> è stato creato corretamente.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (!id) {
    form.reset();
  }
};

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", () => {
  form.reset();
});

form.addEventListener("submit", handleSubmit);
