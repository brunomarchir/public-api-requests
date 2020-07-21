//get the DOM elements
const galleryDiv = document.getElementById("gallery");
const bodyHTML =   document.getElementsByTagName("BODY")[0];

//change default background color
bodyHTML.style.background = 'rgb(144, 135, 135)';

//add search bar to UI
const searchDiv = document.querySelector(".search-container");
searchDiv.innerHTML = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

//create modal window with further details of the employee
function generateModal(info, z) {
  let modalContainerDiv = document.createElement("DIV");
  modalContainerDiv.classList.add("modal-container");
  bodyHTML.appendChild(modalContainerDiv);

//gets the first characters indicating only the employee's birthday
  let bday = info.results[z].dob.date.substring(0,10);

//add the html elements with the data extracted, respectively
  modalContainerDiv.innerHTML = `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src=${info.results[z].picture.large} alt="profile picture">
          <h3 id="name" class="modal-name cap">${info.results[z].name.first} ${info.results[z].name.last}</h3>
          <p class="modal-text">${info.results[z].email}</p>
          <p class="modal-text cap">${info.results[z].location.city}</p>
          <hr>
          <p class="modal-text">${info.results[z].phone}</p>
          <p class="modal-text">${info.results[z].location.street.number} ${info.results[z].location.street.name}, ${info.results[z].location.state} ${info.results[z].location.postcode}</p>
          <p class="modal-text">Birthday: ${bday}</p>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>`;

  //add function to search button
  let button = document.getElementById("modal-close-btn");
  button.addEventListener("click", () => {
    modalContainerDiv.remove();
  });

  //add functionality to modal toggle
  let buttonPrev = document.querySelector("#modal-prev");
  let buttonNext = document.querySelector("#modal-next");
  if (z == 0) {
    buttonPrev.remove();
  } else if (z == (info.results.length - 1)) {
    buttonNext.remove();
  }

  buttonPrev.addEventListener("click", () => {
    modalContainerDiv.remove();
    generateModal(info, z - 1);
  });

  buttonNext.addEventListener("click", () => {
    modalContainerDiv.remove();
    generateModal(info, z + 1);
  });
}

//fetch data from the "data base" and creates interface
function getData() {
  fetch("https://randomuser.me/api/?results=12")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        let cardDiv = document.createElement("DIV");
        galleryDiv.appendChild(cardDiv);
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `<div class="card-img-container">
                <img class="card-img" src="${data.results[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                <p class="card-text">${data.results[i].email}</p>
                <p class="card-text cap">${data.results[i].location.city}</p>
            </div>`;

        document
          .getElementsByClassName("card")
          [i].addEventListener("click", (e) => {
            generateModal(data, i);
          });
      }

      //add functionality to search filtering results by name
      document.getElementById("search-input").addEventListener("keyup", (e) => {
        for (let j = 0; j < data.results.length; j++) {
          if (
            JSON.stringify(data.results[j].name.first)
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            JSON.stringify(data.results[j].name.last)
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            document.getElementsByClassName("card")[j].style.display = "";
          } else {
            document.getElementsByClassName("card")[j].style.display = "none";
          }
        }
      })
    })
    .catch(error => {throw(error)});
}
//initialize page by calling function
getData();
