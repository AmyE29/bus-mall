'use strict';

var leftImages = document.getElementById('left');
var rightImages = document.getElementById('right');
var centerImages = document.getElementById('center');

var containerEl = document.getElementById('image_container');

var totalClicks = 0;
var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  //create an array to hold unique indexes
  var uniquePicsArray = [];
  //   assigns random values to uniquePicsArray

  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  while (uniquePicsArray[0] === uniquePicsArray[1]) {
    console.log('Duplicate found, Re-rolling!');
    uniquePicsArray[1] = makeRandom();
  }

  while (uniquePicsArray[1] === uniquePicsArray[2] || uniquePicsArray[2] === uniquePicsArray[0]) {
    console.log('Line 41 Duplicate found, Re-rolling!');
    uniquePicsArray[2] = makeRandom();
  }

  allProducts[uniquePicsArray[0]].views++;

  leftImages.src = allProducts[uniquePicsArray[0]].path;
  leftImages.name = allProducts[uniquePicsArray[0]].name;
  leftImages.title = allProducts[uniquePicsArray[0]].name;

  allProducts[uniquePicsArray[1]].views++;
  rightImages.src = allProducts[uniquePicsArray[1]].path;
  rightImages.name = allProducts[uniquePicsArray[1]].name;
  rightImages.title = allProducts[uniquePicsArray[1]].name;

  allProducts[uniquePicsArray[2]].views++;
  centerImages.src = allProducts[uniquePicsArray[2]].path;
  centerImages.name = allProducts[uniquePicsArray[2]].name;
  centerImages.title = allProducts[uniquePicsArray[2]].name;
}
var names = [];

function voteChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var makingChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: ' Votes',
        data: voteTally(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(138, 0, 7, 0.2)',
          'rgba(55, 0, 138, 0.2)',
          'rgba(237, 5, 187, 0.2)',
          'rgba(5, 206, 237, 0.2)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(138, 0, 7, 0.6)',
          'rgba(55, 0, 138, 0.6)',
          'rgba(237, 5, 187, 0.6)',
          'rgba(5, 206, 237, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(138, 0, 7, 1)',
          'rgba(55, 0, 138, 1)',
          'rgba(237, 5, 187, 1)',
          'rgba(5, 206, 237, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
if (localStorage.data) {
  getData();
} else {
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('usb');
  new Product('water-can');
  new Product('wine-glass');
}
for (var i = 0; i < allProducts.length; i++) {
  names.push(allProducts[i].name);
}
console.log(names);
// this makes it so that the console will store prior votes and will cause it to keep stacking votes on top of eachother.
function storeData() {
// storing data into local storage
  var allProductsStringified = JSON.stringify(allProducts);
  localStorage.setItem('data', allProductsStringified);
}
// getting data from storage
function getData() {
  var storageAllProducts = localStorage.getItem('data');
  var parsedAllProducts = JSON.parse(storageAllProducts);

  for (var h = 0; h < parsedAllProducts.length; h++) {
    var createdProduct = new Product(parsedAllProducts[h].name);

    createdProduct.votes = parsedAllProducts[h].votes;
    createdProduct.views = parsedAllProducts[h].views;
  }
}
function handleClick() {
  var chosenImages = event.target.title;

  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImages) {
      allProducts[i].votes++;
      totalClicks++;

      while (totalClicks < 25) {
        renderProducts();
        return;
      }
      containerEl.removeEventListener('click', handleClick);
      containerEl.remove();
      voteTally();
      // makingChart.update();
      storeData();
      voteChart();
    }
  }
}
function voteTally() {
  var voteTotals = [];
  for (var i = 0; i < allProducts.length; i++) {
    voteTotals.push(allProducts[i].votes);
  }
  return voteTotals;
}
containerEl.addEventListener('click', handleClick);
renderProducts();
