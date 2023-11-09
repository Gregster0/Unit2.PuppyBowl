



// create a state variable to house the puppy database, display them, and display puppies individually.
const state = {
    puppyDB: [],
    puppyDisplay: [],
}

// create variables as needed to access html elements
const main = document.querySelector('main');
const puppyForm = document.querySelector(`form`);
const puppyUl = document.querySelector('ul');

//Create a render function to render puppies based on the database
const render =  () => {
    main.innerHTML = ""
    state.puppyDB.forEach(pup => {
        /*    displayText += `<section>
                            <img src="${pup.imageUrl}" alt="${pup.breed}"/>
                            <h2>${pup.name}</h2>
                            <h2>Breed: ${pup.breed}</h2>
                            <h2>Status: ${pup.status}</h2>
                            <button>More Info!</button>
                            </section>`*/
            const section = document.createElement(`section`);
            section.innerHTML = `<img src="${pup.imageUrl}" alt="${pup.breed}"/>
                                <h2>${pup.name}</h2>
                                <h2>Breed: ${pup.breed}</h2>
                                <h2>Status: ${pup.status}</h2>`
            const button = document.createElement(`button`);
            button.textContent = "More Info";
            button.addEventListener("click", (event) => {
                event.preventDefault();
                console.log(pup);
                main.innerHTML = ""
                const descPage = document.createElement(`section`);
                descPage.innerHTML = `<h1>Description Page</h1>
                <img src="${pup.imageUrl}" alt="${pup.breed}"/>
                <h2>${pup.name}</h2>
                <h2>Breed: ${pup.breed}</h2>
                <h2>Status: ${pup.status}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae diam laoreet, tincidunt arcu in, placerat lectus. Donec vestibulum quam vitae sapien mattis, finibus efficitur nisi porttitor. In varius luctus ullamcorper. Nulla porta rhoncus malesuada. Etiam efficitur maximus urna. Sed vulputate, est id egestas varius, augue augue euismod mauris, a sagittis urna augue vel felis. Integer scelerisque iaculis cursus. Duis hendrerit ligula ipsum. Pellentesque et imperdiet magna. Proin risus leo, aliquam in tortor vulputate, facilisis pellentesque mauris. Donec non felis hendrerit, mattis risus et, fringilla ante. Nullam ac dictum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ut nibh porttitor, blandit ultrices ante commodo. Aliquam erat volutpat. </p>
                `
                const descButton = document.createElement(`button`);
                descButton.textContent = "Go Back";
                descButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    render()
                })
                descPage.append(descButton);
                main.append(descPage);
            })
            section.append(button);
            main.append(section)
        })

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
