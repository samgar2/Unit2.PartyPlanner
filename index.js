// Part 1: A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening

// Get party elements
const partiesContainer = document.getElementById('parties-container');
const newPartyFormContainer = document.getElementById('new-party-form');

// Variable for our API URL
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`;

// Fetch parties
const fetchAllParties = async () => {
    try {
        const response = await fetch(API_URL);
        const parties = await response.json();
        console.log(parties);
        return parties;
    } catch (error) {
        console.log(error);
    }
}

// Render all parties
const renderAllParties = (partyList) => {
    if (!partyList || partyList.length === 0) {
        partiesContainer.innerHTML = '<h3>No parties found</h3>';
        return;
    }

    partiesContainer.innerHTML = '';

    partyList.data.forEach((party) => {
        console.log(party);
        const partyElement = document.createElement('div');
        partyElement.classList.add('party-card');

        partyElement.innerHTML = `
            <h4>Name: ${party.name}</h4>
            <p>${getdateTime(party.date)}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
        `;

        partiesContainer.appendChild(partyElement);
    });
}

// Separate out the date and time
function getdateTime (dateTimeString) {
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

const init = async () => {
    const parties = await fetchAllParties();
    renderAllParties(parties);
}

init();