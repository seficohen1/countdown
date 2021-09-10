const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completedEl = document.getElementById("complete");
const completedElInfo = document.getElementById("complete-info");
const completedButton = document.getElementById("complete-button");

let countdownTitle;
let countdownDate;
let countdownValue = new Date();
let countdownActive;
let savedCountdown = {};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Setting The Date Input Min With Today's Date

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Creating Countdown

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input
    inputContainer.hidden = true;

    if (distance < 0) {
      countdownComplete();
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completedEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, 1000);
}

// /Getting Val From Form

function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("Countdown", JSON.stringify(savedCountdown));
  // const year = parseInt(countdownDate.split("-")[0]);
  // const month = parseInt(countdownDate.split("-")[1]);
  // const day = parseInt(countdownDate.split("-")[2]);

  if (countdownDate === "") {
    alert("Please pick a valid date");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset All Vals

function reset() {
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completedEl.hidden = true;
  clearInterval(countdownActive);
  countdownElTitle.textContent = "";
  countdownDate = "";
  localStorage.removeItem("Countdown");
}

function countdownComplete() {
  countdownEl.hidden = true;
  clearInterval(countdownActive);
  completedEl.hidden = false;
  completedElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
}

// Getting Countdown Object from localStorage if exsists

function retrivePreviousCountdown() {
  if (localStorage.getItem("Countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("Countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listeners

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completedButton.addEventListener("click", reset);

// On Load - Checking localStorage

retrivePreviousCountdown();
