
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
      // console.log(productsList)
      display(productsList);
    });
}

gitDataFromApi();

function display(data) {
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    box += `  <tr>
      <td>${data[i].name}</td>
      <td>${data[i].price}</td>
      <td>${data[i].description}</td>
      <td>
          <button onclick="deleteProduct(${data[i].id})" kkk class=" btn btn-outline-success" >Delete</button>
          <button onclick="updateProduct(${i} , ${data[i].id})" class=" btn btn-outline-primary" >Update</button>
      </td>
  </tr>`;
  }
  document.getElementById('tbody').innerHTML = box
}

function addProduct() {
  let data = {
    name: ProductName.value,
    price: ProductPrice.value,
    description: ProductDescription.value,
  };

  crudProduct('addProduct', 'POST', data);
  clearForm();
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


function searchProducts()
{
  let term = searchInput.value;

  searchResult =[];

  for( var i = 0 ; i < productsList.length ; i++)
  {
    if(productsList[i].name.includes(term) === true )
    {
      searchResult.push(productsList[i]);
    }
  }
  display(searchResult);
  // console.log(searchResult)
}


function clearForm() {
  ProductName.value = "";
  ProductPrice.value = "";
  ProductDescription.value = "";
}