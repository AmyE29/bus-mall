
'use strict';


var leftImageEl = document.getElementById('left');
var rightImageEl = document.getElementById('right');
var centerImageEl = document.getElementById('center');
var containerEl = document.getElementById('image_container');

Product.pics = [document.getElementById('left'),document.getElementById('right'), document.getElementById('center')];

Product.totalClicks = 0;
var allProducts = [];

Product.uniqueArray = [];


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

function uniqueArrayGen(){
  while(allProducts.uniqueArray.length < 6){
    var random = makeRandom();
    while(!allProducts.uniqueArray.includes(random)){
      allProducts.uniqueArray.push(random);
    }
  }
}
function displayPics() {
  uniqueArrayGen();
  for (var i = 0; i < allProducts.uniqueArray.legnth; i++){
    var temp = allProducts.uniqueArray.shift();
    console.log ('temp: ', temp);
    allProducts.pics[i].src = allProducts[temp].path;
    allProducts.pics[i].id = allProducts[temp].name;
    allProducts[temp].views += 1;
  }
}
function handleClick(event) {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  if(Product.totalClicks === 25){
    containerEl.removeEventListener('click', handleClick);
    containerEl.setAttribute('hidden', true);
    makeChart();
  }

  for( var i = 0; i < allProducts.length; i++ ) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }
  Product.totalClicks++;
  renderProducts();
  // parentEl.innerHTML = '';
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

console.log(allProducts);

var nameData = [];
console.log('name: ', nameData);
var voteData = [];
console.log('vote: ', voteData);
var viewsData = [];

var getChartData = function () {
  for (var i = 0; i < allProducts.length; i++) {
    nameData.push(allProducts[i].name);
    voteData.push(allProducts[i].votes);
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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
