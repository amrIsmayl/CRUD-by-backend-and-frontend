
let ProductName = document.getElementById('ProductName');
let ProductPrice = document.getElementById('ProductPrice');
let ProductDescription = document.getElementById('ProductDescription');
let searchInput = document.getElementById("search");
let productsList = [];


function gitDataFromApi() {
  fetch('http://localhost:3030/allproduct')
    .then(response => response.json())
    .then(json => {
      productsList = json.product
      display(productsList);
    });
}

gitDataFromApi();


function showMessage() {
  let name = ProductName.value;
  const val = name.slice(1, name.length);
  const space = (string) => / {1,}/.test(string);
  const Alphanumeric = (string) => /[=\-)(*&^%$#@!~*\/+\\\|_.]/.test(string);
  const alpha = /[=\-)(*&^%$#@!~*\/+\\\|_.]/;
  const AlphanumericMatch = name.match(alpha);
  if (name == '') {
    validit.classList.replace('d-none', 'd-inline-block');
  }
  else if (Alphanumeric(name)) {
    validit.classList.replace('d-none', 'd-inline-block');
  }
  else if (space(name)) {
    validit.classList.replace('d-none', 'd-inline-block');
  }
  else {

    let data = {
      name: ProductName.value,
      price: ProductPrice.value,
      description: ProductDescription.value,
    };
    crudProduct('addProduct', 'POST', data);
    clearForm();
    validit.classList.replace('d-inline-block', 'd-none');
  }
}

function display(data) {
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    box += `<tr>
      <td>${data[i].name}</td>
      <td>${data[i].price}</td>
      <td>${data[i].description}</td>
      <td>
          <button onclick="deleteProduct(${data[i].id})" kkk class=" btn btn-success me-2" >Delete</button>
          <button onclick="updateProduct(${i} , ${data[i].id})" class=" btn btn-primary" >Update</button>
      </td>
  </tr>`;
  }
  document.getElementById('tbody').innerHTML = box
}


function crudProduct(endPoint, methods, data) {

  fetch(`http://localhost:3030/${endPoint}`, {

    method: methods,

    body: JSON.stringify(data),

    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })

    .then(response => response.json())

    .then(obj => {

      if (obj.message == 'success') {
        gitDataFromApi()
      }
    });
}


function deleteProduct(id) {
  crudProduct('delete', 'DELETE', { id });
}

let productId
function updateProduct(i, id) {
  productId = id
  ProductName.value = productsList[i].name
  ProductPrice.value = productsList[i].price
  ProductDescription.value = productsList[i].description

  updateBtn.classList.replace('d-none', 'd-inline-block');
  addBtn.classList.add('d-none');
}


function sendUpdate() {

  let data = {
    id: productId,
    name: ProductName.value,
    price: ProductPrice.value,
    description: ProductDescription.value,
  }
  crudProduct('update', 'PUT', data);
  updateBtn.classList.replace('d-inline-block', 'd-none');
  addBtn.classList.replace('d-none', 'd-inline-block');
  clearForm();
}


function searchProducts() {
  let term = searchInput.value;

  searchResult = [];

  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].name.includes(term) === true) {
      searchResult.push(productsList[i]);
    }
  }
  display(searchResult);
}


function clearForm() {
  ProductName.value = "";
  ProductPrice.value = "";
  ProductDescription.value = "";
}


particlesJS("particles-js", {
  particles: {
    number: { value: 142, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
