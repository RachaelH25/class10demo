"use strict";

let goatContainer = document.querySelector("section");
let resultButton = document.querySelector("section + div");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");

let clicks = 0;
let maxClicksAllowed = 9;

const state = {
    allGoatsArray: [],
};

function Goat(name, src) {
    this.name = name;
    this.src = src;
    this.views = 0;
    this.clicks = 0;
}

function getRandomNumber() {
    return Math.floor(Math.random() * state.allGoatsArray.length);
}

function renderGoats() {
    let goat1 = getRandomNumber();
    let goat2 = getRandomNumber();

    while (goat1 === goat2) {
        goat2 = getRandomNumber();
    }

    image1.src = state.allGoatsArray[goat1].src;
    image2.src = state.allGoatsArray[goat2].src;
    image1.alt = state.allGoatsArray[goat1].name;
    image2.alt = state.allGoatsArray[goat2].name;
    state.allGoatsArray[goat1].views++;
    state.allGoatsArray[goat2].views++;
    console.log(state.allGoatsArray[goat1]);
    console.log("renderGoats");
}

function handleGoatClick(event) {
    if (event.target === goatContainer) {
        alert("Please click on an image.");
    }
    clicks++;
    let clickGoat = event.target.alt;
    for (let i = 0; i < state.allGoatsArray.length; i++) {
        if (clickGoat === state.allGoatsArray[i].name) {
            state.allGoatsArray[i].clicks++;
            break;
        }
    }
    if (clicks === maxClicksAllowed) {
        goatContainer.removeEventListener("click", handleGoatClick);
        resultButton.addEventListener("click", renderChart);
        // resultButton.className = "clicks-allowed";
        goatContainer.className = "no-voting";
    } else {
        renderGoats();
    }
}

// function renderResults() {
//     let ul = document.querySelector("ul");
//     for (let i = 0; i < state.allGoatsArray; i++) {
//         let li = document.createElement("li");
//         li.textContent = `${state.allGoatsArray[i].name} had ${state.allGoatsArray[i].views} views and was clicked ${state.allGoatsArray[i].clicks} times.`;
//         ul.appendChild(li);
//     }
// }

function renderChart() {
    const labelArray = [];
    const clicksArray = [];
    const viewsArray = [];

    for (let i = 0; i < state.allGoatsArray.length; i++) {
        let thisGoat = state.allGoatsArray[i];
        labelArray.push(thisGoat.name);
        clicksArray.push(thisGoat.clicks);
        viewsArray.push(thisGoat.views);
    }
}

const data = {
    labels: labelArray,
    datasets: [
        {
            label: "Views",
            data: viewsArray,
            backgroundColor: ["teal"],
            borderColor: ["tomato"],
            borderWidth: 2,
        },
        {
            label: "Clicks",
            data: clicksArray,
            backgroundColor: ["tomato"],
            borderColor: ["teal"],
            borderWidth: 2,
        },
    ],
};

const config = {
    type: "bar",
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        // indexAxis: "y",
    },
};
const canvasChart = document.getElementById("myChart");
newChart(canvasChart, config);

let cruising = new Goat("Cruising Goat", "./images/cruisin-goat.jpg");
let float = new Goat("Float Your Goat", "./images/float-your-goat.jpg");
let hand = new Goat("Goat Out of Hand", "./images/goat-out-of-hand.jpg");
let kissing = new Goat("Kissing Goat", "./images/kissing-goat.jpg");
let sassy = new Goat("Sassy Goat", "./images/sassy-goat.jpg");
let smiling = new Goat("Smiling Goat", "./images/smiling-goat.jpg");
let sweater = new Goat("Sweater Goat", "./gitimages/sweater-goat.jpg");

state.allGoatsArray.push(cruising, float, hand, kissing, sassy, smiling, sweater);

renderGoats();

goatContainer.addEventListener("click", handleGoatClick);
