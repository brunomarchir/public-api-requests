//get the DOM elements
const galleryDiv = document.getElementById('gallery');

function generateCard() {
  const cardDiv = document.createElement('DIV');
  cardDiv.classList.add('card');
  galleryDiv.appendChild(cardDiv);

  let cardImgDiv = document.createElement('DIV');
  cardImgDiv.classList.add('card-img-container');
  cardDiv.appendChild(cardImgDiv);

  let cardImg = document.createElement('IMG');
  cardImg.classList.add('card-img');
  cardImgDiv.appendChild(cardImg);

  let cardInfoDiv = document.createElement('DIV');
  cardInfoDiv.classList.add('card-info-container');
  cardDiv.appendChild(cardInfoDiv);

  let cardName = document.createElement('H3');
  cardName.classList.add('card-name-cap');
  cardName.id = 'name';
  cardInfoDiv.appendChild(cardName);

  let cardText = document.createElement('P');
  cardText.classList.add('card-text');
  cardInfoDiv.appendChild(cardText);

  let cardCap = document.createElement('P');
  cardCap.classList.add('card-text-cap');
  cardInfoDiv.appendChild(cardCap);
}


//ajax request
function getData() {
  fetch('https://randomuser.me/api/?results=12')
    .then((response) => {return response.json()})
    .then((data) => {for (let i = 0; i < data.results.length; i++) {
      generateCard();
      document.getElementsByTagName('H3')[i].textContent = `${data.results[i].name.first} ${data.results[i].name.last}`;
      document.getElementsByTagName('IMG')[i].src = `${data.results[i].picture.large}`;
      document.getElementsByClassName('card-text')[i].textContent = `${data.results[i].email}`;
      document.getElementsByClassName('card-text-cap')[i].textContent = `${data.results[i].location.city}`;
    }})
}
getData();

//modal window
function modal() {
  let modalContainerDiv = document.createElement('DIV');
  modalContainerDiv.classList.add('modal-container');
  

}
