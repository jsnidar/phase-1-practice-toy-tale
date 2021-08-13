let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toysUrl = "http://localhost:3000/toys"
document.addEventListener('DOMContentLoaded', () => {
  renderToys()
})

//With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
function renderOneToy (toy) {
    //create elements
    let toyCard = document.createElement('div')
    let img = document.createElement('img')
    let button = document.createElement('button')
    let p = document.createElement('p')
    let h2 = document.createElement('h2')

    //assign properties to elements
    let toyId = toy.id
    toyCard.id = `card${toyId}`
    toyCard.className = 'card'
    h2.innerText = toy.name
    img.src = toy.image
    img.className ="toy-avatar"
    p.id=`p${toyId}`
    p.innerText = toy.likes + ' Likes'
    button.innerText = 'Like'
    button.className = 'like-btn' 
    button.id=toyId

    //append elements
    document.querySelector('#toy-collection').appendChild(toyCard)
    toyCard.appendChild(h2)
    toyCard.appendChild(img)
    toyCard.appendChild(p)
    toyCard.appendChild(button)
    //I did this with much less code using innerHTML, but I couldn't get anything to work below the img. I'm not sure why. But I decided to rewrite it this way.
    document.getElementById(toyId).addEventListener('click', (e) => {
      toy.likes++
      document.querySelector(`#p${toyId}`).innerText = toy.likes + ' Likes';
      updateLikes(toy)
    })
}
//Add a new Toy
  //send a post request
  //add the towy to the DOM without reloading the page
function newToy () {
  toyData = {name: '', image: '', likes: '0'}
  createToyBtn = document.querySelector('.submit')
  createToyBtn.addEventListener('click', (e) => {
    toyData.name = document.querySelector("body > div.container > form > input:nth-child(2)").value
    toyData.image = document.querySelector("body > div.container > form > input:nth-child(4)").value
    fetch(toysUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify(toyData),
      })
  })
}
newToy();

//When the page loads, make a 'GET' request to fetch all the toy objects. 
function renderToys () {
  fetch(toysUrl)
  .then(response => response.json())
  .then(data => data.forEach(toy => renderOneToy(toy)))
    }
    
//PATCH to update likes
function updateLikes(toy) {
  
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}