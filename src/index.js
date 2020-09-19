let addToy = false;
//1st step to make each div card show up stable element from html 
const toyCollectionDiv = document.querySelector("#toy-collection")
//stable element to create form
const toyForm = document.querySelector(".add-toy-form")

//gets you array of toys in console

fetch("http://localhost:3000/toys")
  .then(res => res.json()) 
  .then((arrayOfToys) => {
    // console.log(arrayOfToys) 

    arrayOfToys.forEach((singleToy) => {
      turnToyToHtml(singleToy)

    })

  })

  
  
  
//helper method turn object into li helpers are needed when adding to html 

//each toy card show up bc of this helper method below turntoytohtml
  let turnToyToHtml = (toy) => {
    //<div class="card"> below two lines we created first div 
    let toyCardDiv = document.createElement("div")
      toyCardDiv.classList.add("card")

      // <h2>Woody</h2>
      let toyNameH2 = document.createElement("h2")
        toyNameH2.innerText = toy.name 
      //<img src=toy_image_url
      let toyImg = document.createElement("img")
        toyImg.src = toy.image  
        //class="toy-avatar" />
        toyImg.alt = toy.name //if img doesn't show up name will 
        toyImg.classList.add("toy-avatar")
        //<p>4 Likes </p> seen on console 
       let toyLikesP = document.createElement("p")
       //see on Dom 
        toyLikesP.innerText = `${toy.likes} Likes`
        
        //<button class="like-btn">Like <3</button>
        let likeButton = document.createElement("button")
          likeButton.classList.add("like-btn")
          likeButton.innerText = "Like <3"

        //append each element created above so they show up in the div otherwise you'd get empty div 
        toyCardDiv.append(toyNameH2, toyImg, toyLikesP, likeButton)  
        //2nd step to make each div show up on the DOM (empty div w/o above append code)
        toyCollectionDiv.append(toyCardDiv)

        likeButton.addEventListener("click", (evt) => {
          let theNewLikes = toy.likes + 1
          // console.log("The New Likes Becomes", theNewLikes)
          //clicking like button shows hello in console 
          //changed clicking like button shows you id toy object and like number in console ***
          // console.log(toy, toyLikesP)
        
          //fetch alter data in back end if you want to see if its working in browser click on network and press the button to test it out
          //fetch is updating one of the attributes about a toy 
          fetch(`http:/localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              likes: theNewLikes
            })
            //above fetch code will require to refresh page to see added like//code below needed for it to update on the front end without refresh 
          })
          .then(res => res.json())
          //update dom
          .then((updatedToy) => {
            //razzmatzz element 
            toyLikesP.innerText = `${updatedToy.likes} Likes`
            //alters object in memeory will not update w/o code below 
            toy.likes = updatedToy.likes
          })
        

        })
}

//turnToyToHtml func ends 
//form to create new toy 
toyForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  console.log("hello")
  let theImage = evt.target.image.value
  let theName = evt.target.name.value
  //creates new toy from back end 
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: theName, //from above let 
      image: theImage, //from above let 
      likes: 1
    })
  })
  .then(res => res.json())
  .then((createdToy) => {
    turnToyToHTML(createdToy);
    //clear out input after submitting form 
    evt.target.reset()
  })
  
})


// {/* <div class="card">
//     <h2>Woody</h2>
//     <img src=toy_image_url class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div> */}














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

