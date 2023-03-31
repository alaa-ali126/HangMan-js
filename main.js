let letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theletter = document.createTextNode(letter);
  span.appendChild(theletter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpaces = Array.from(randomValueValue);

lettersAndSpaces.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let hangDraw = document.querySelector(".hangman-draw");
let wrongs = 0;
let array = [];

document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordindex) => {
      if (wordLetter === theClickedLetter) {
        guessSpans.forEach((span, spanIndex) => {
          if (wordindex === spanIndex) {
            span.innerHTML = theClickedLetter;
            array += theClickedLetter;
            theStatus = true;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongs++;
      hangDraw.classList.add(`wrong-${wrongs}`);
      if (wrongs === 8) {
        endGame();
        lettersContainer.classList.add("finished");
        restartGame();
      }
    } else {
      if (array.length === theChosenWord.length) {
        winner();
        lettersContainer.classList.add("finished");
        restartGame();
      }
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game over, the word is ${randomValueValue}`
  );
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}

function winner() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Congratulations 🤩`);
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}

function restartGame() {
  setTimeout(() => {
    document.body.removeChild("div")
  }, 3000);
}
