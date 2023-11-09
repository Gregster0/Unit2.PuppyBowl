



// create a state variable to house the puppy database, display them, and display puppies individually.
const state = {
    puppyDB: [],
    puppyDisplay: [],
    puppySingle: {}
}

// create variables as needed to access html elements
const main = document.querySelector('main');
const puppyForm = document.querySelector(`form`);
const puppyUl = document.querySelector('ul');

//Create a render function to render puppies based on the database
const render =  () => {
    let displayText = ""
    state.puppyDB.forEach(pup => {
        displayText += `<section>
                        <img src="${pup.imageUrl}" alt="${pup.breed}"/>
                        <h2>${pup.name}</h2>
                        <h2>Breed: ${pup.breed}</h2>
                        <h2>Status: ${pup.status}</h2>
                        <button>More Info!</button>
                        </section>`
    })
    main.innerHTML = displayText;
}

//create a function to fetch the puppy database from the api
const getPuppies = async () => {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players")
    puppyData = await response.json()
    state.puppyDB = puppyData.data.players;
    console.log(state.puppyDB)
    render();
}

getPuppies();

console.log(state.puppyDisplay)
//Create a function to add a puppy to the API
const postPuppy = async(pup) => {
    const response = await fetch(
        'https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pup),
        }
      );
      const result = await response.json();
      console.log(result)
}


// Create an event listener to add a puppy to the api based on the results of the form
puppyForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const newPup = {};
    newPup.name = puppyForm.elements[0].value;
    newPup.breed = puppyForm.elements[1].value;
    newPup.status = puppyForm.elements[2].value;
    newPup.id = Math.floor(Math.random() * 1000)
    newPup.imageUrl = `https://upload.wikimedia.org/wikipedia/commons/d/df/Doge_homemade_meme.jpg`
    postPuppy(newPup)
    getPuppies()
    })

//Create a function to render a description page on the main html for an individual puppy