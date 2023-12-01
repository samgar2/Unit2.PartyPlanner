// Part 1: A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening

// Variable for our API URL
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`;

// Creating our state
let state = {
    parties: [],
};

// Get party elements
const partyList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

// Sync state with the API and rerender
async function render() {
    await getParties();
    renderParties();
}
render();

// GET: Update state with parties from API
async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log(response)
        state.parties = json.data;
    } catch (error) {
        console.error(error);
    }
}

// Render parties from state
function renderParties() {
    console.log(state.parties)
    if (!state.parties.length) {
        partyList.innerHTML = "<li>No parties.</li>";
        return;
    }

    const partyCards = state.parties.map((party) => {
        const li = document.createElement("li");
        li.innerHTML = ` 
            <h4>Name: ${party.name}</h4>
            <p>${getdateTime(party.date)}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
      `;

        // Delete button
        const deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete Party"
        li.append(deleteButton)

        deleteButton.addEventListener("click", () => deleteParty(party.id))

        return li;
    });

    partyList.replaceChildren(...partyCards);
}

// Separate out the date and time
function getdateTime(dateTimeString) {
    let date = ''
    let time = ''

    for (let i = 0; i < 10; i++) {
        date += dateTimeString[i]
    }

    for (let i = 11; i < 19; i++) {
        time += dateTimeString[i]
    }

    return `Date: ${date} Time: ${time}`
}

// POST: Ask the API to create a new party based on form data
async function addParty(event) {
    event.preventDefault();

    try {
        let DateAndTime = `${event.target[1].value}T${event.target[2].value}Z` // Reunify date and time

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: addPartyForm.name.value,
                date: DateAndTime,
                location: addPartyForm.location.value,
                description: addPartyForm.description.value,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create party");
        }

        render();
    } catch (error) {
        console.error(error);
    }
}

// DELETE: Ask the API to delete the selected party
async function deleteParty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete party");
        }

        render();
    } catch (error) {
        console.error(error);
    }
}