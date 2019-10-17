
'use strict';

var allProducts = [];
var uniquePicsArray = [];

//global variables
var leftImageEl = document.getElementById('left');
var rightImageEl = document.getElementById('right');
var centerImageEl = document.getElementById('center');
var containerEl = document.getElementById('image_container');

Product.pics =[ document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
var totalClicks = 0;



function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}
if (localStorage.getItem('data') === null) {
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
} else {
  
  var storageAllProducts = localStorage.getItem('data');
  var parseAllProducts = JSON.parse(storageAllProducts);

  for (var i = 0; i < parseAllProducts.length; i++) {
    new Product(parseAllProducts[i].name, parseAllProducts[i].views, parseAllProducts[i].votes);
    console.log(allProducts);
  }
}

// making a random number to assign to the pictures so they show up randomly
function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

// trying to set an array, so that the random pictures don't show up in the next iteration.
function uniqueArrayGen(){
  while(uniquePicsArray.length < 6){
    var random = makeRandom();
    while(!uniquePicsArray.includes(random)){
      uniquePicsArray.push(random);
    }
  }
}
function displayPics() {
  uniqueArrayGen();
  for (var i = 0; i < uniquePicsArray.legnth; i++){
    var temp = uniquePicsArray.shift();
    console.log ('temp: ', temp);
    Product.pics[i].src = allProducts[temp].path;
    Product.pics[i].id = allProducts[temp].name;
    Product[temp].views += 1;
  }
}
function handleClick(event) {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  // storeData();
  var allProductsStringified = JSON.stringify(allProducts);
  localStorage.setItem('data', allProductsStringified);

  if(totalClicks === 25){
    containerEl.removeEventListener('click', handleClick);
    containerEl.remove();
    makeChart();
  }

  for( var i = 0; i < allProducts.length; i++ ) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }
  totalClicks++;
  renderProducts();
  displayPics ();
}

function renderProducts (){
  //create an array to hold unique indexes
  var uniquePicsArray = [];
  //assign values to index 0 and 1
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  while(uniquePicsArray[0] === uniquePicsArray[1]) {
    console.error('Duplicate found, Re-rolling!');
    uniquePicsArray[1] = makeRandom();
  }
  while(uniquePicsArray[1] === uniquePicsArray[2]) {
    console.error('Duplicate found, Re-rolling!');
    uniquePicsArray[2] = makeRandom();
  }
  while(uniquePicsArray[0] === uniquePicsArray[2]) {
    console.error('Duplicate found, Re-rolling!');
    uniquePicsArray[2] = makeRandom();
  }

  //add views here
  allProducts[uniquePicsArray[0]].views++ ;
  //get a random index
  //display a product whose index is the random number
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;
  //add views here
  allProducts[uniquePicsArray[1]].views++ ;
  rightImageEl.src = allProducts[uniquePicsArray[1]].path;
  rightImageEl.name = allProducts[uniquePicsArray[1]].name;
  rightImageEl.title = allProducts[uniquePicsArray[1]].name;

  allProducts[uniquePicsArray[2]].views++ ;
  centerImageEl.src = allProducts[uniquePicsArray[2]].path;
  centerImageEl.name = allProducts[uniquePicsArray[2]].name;
  centerImageEl.title = allProducts[uniquePicsArray[2]].name;
}

var nameData = [];
console.log('name: ', nameData);
var voteData = [];
console.log('vote: ', voteData);
var viewsData = [];

var getChartData = function () {
  for (var i = 0; i < allProducts.length; i++) {
    nameData.push(allProducts[i].name);
    voteData.push(allProducts[i].votes);
    viewsData.push(allProducts[i].views);
  }
};

var makeChart = function () {
  getChartData();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameData,
      datasets: [{
        label: 'Votes',
        data: voteData,
        backgroundColor: [
          'rgba(252, 23, 3, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(5, 110, 58, 0.2)',
          'rgba( 214, 6, 127, 0.2)',
          'rgba(61, 242, 121, 0.2)',
          'rgba(179, 61, 242, 0.2)',
          'rgba(252, 23, 3, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(5, 110, 58, 0.5)',
          'rgba( 214, 6, 127, 0.5)',
          'rgba(61, 242, 121, 0.5)',
          'rgba(179, 61, 242, 0.5)',
        ],
        borderColor: [
          'rgba(252, 23, 3, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(5, 110, 58, 1)',
          'rgba( 214, 6, 127, 1)',
          'rgba(61, 242, 121, 1)',
          'rgba(179, 61, 242, 1)',
          'rgba(252, 23, 3, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(5, 110, 58, 1)',
          'rgba( 214, 6, 127, 1)',
          'rgba(61, 242, 121, 1)',
          'rgba(179, 61, 242, 1)',
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
};
containerEl.addEventListener('click', handleClick);
renderProducts();
