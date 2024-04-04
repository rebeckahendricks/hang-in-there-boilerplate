// query selector variables go here 👇
const posterImage = document.querySelector('.poster-img');
const posterTitle = document.querySelector('.poster-title');
const posterQuote = document.querySelector('.poster-quote');

const posterViews = {
  MAIN: document.querySelector('.main-poster'),
  FORM: document.querySelector('.poster-form'),
  SAVED: document.querySelector('.saved-posters'),
};

const buttons = {
  showRandom: document.querySelector('.show-random'),
  showForm: document.querySelector('.show-form'),
  showMain: document.querySelector('.show-main'),
  showSaved: document.querySelector('.show-saved'),
  backToMain: document.querySelector('.back-to-main'),
  makePoster: document.querySelector('.make-poster'),
  savePoster: document.querySelector('.save-poster')
}

const newPosterForm = document.getElementById('newPosterForm')
const savedPostersGrid = document.querySelector('.saved-posters-grid')

// we've provided you with some data to work with 👇
var images = [
  "./assets/bees.jpg",
  "./assets/bridge.jpg",
  "./assets/butterfly.jpg",
  "./assets/cliff.jpg",
  "./assets/elephant.jpg",
  "./assets/flock.jpg",
  "./assets/fox.jpg",
  "./assets/frog.jpg",
  "./assets/horse.jpg",
  "./assets/lion.jpg",
  "./assets/mountain.jpg",
  "./assets/pier.jpg",
  "./assets/puffins.jpg",
  "./assets/pug.jpg",
  "./assets/runner.jpg",
  "./assets/squirrel.jpg",
  "./assets/tiger.jpg",
  "./assets/turtle.jpg"
];
var titles = [
  "determination",
  "success",
  "inspiration",
  "perspiration",
  "grit",
  "empathy",
  "feelings",
  "hope",
  "believe",
  "try",
  "conviction",
  "accomplishment",
  "achievement",
  "ambition",
  "clarity",
  "challenge",
  "commitment",
  "confidence",
  "action",
  "courage",
  "focus",
  "breathe",
  "gratitude",
  "imagination",
  "kindness",
  "mindfulness",
  "knowledge",
  "opportunity",
  "passion",
  "patience",
  "practice",
  "smile",
  "trust",
  "understanding",
  "wisdom"
];
var quotes = [
  "Don’t downgrade your dream just to fit your reality, upgrade your conviction to match your destiny.",
  "You are braver than you believe, stronger than you seem and smarter than you think.",
  "You are confined only by the walls you build yourself.",
  "The one who has confidence gains the confidence of others.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Never bend your head. Always hold it high. Look the world straight in the eye.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Believe you can and you're halfway there.",
  "When you have a dream, you've got to grab it and never let go.",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
  'Limit your "always" and your "nevers."',
  "You are never too old to set another goal or to dream a new dream.",
  "Try to be a rainbow in someone else's cloud.",
  "You do not find the happy life. You make it.",
  "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
  "Sometimes you will never know the value of a moment, until it becomes a memory.",
  "The most wasted of days is one without laughter.",
  "You must do the things you think you cannot do.",
  "It isn't where you came from. It's where you're going that counts.",
  "It is never too late to be what you might have been.",
  "Happiness often sneaks in through a door you didn't know you left open.",
  "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
  "Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.",
  "Be the change that you wish to see in the world.",
  "Let us make our future now, and let us make our dreams tomorrow's reality.",
  "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
  "If I cannot do great things, I can do small things in a great way.",
  "Don't wait. The time will never be just right.",
  "With the right kind of coaching and determination you can accomplish anything.",
  "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
  "No matter what people tell you, words and ideas can change the world.",
  "Each person must live their life as a model for others.",
  "A champion is defined not by their wins but by how they can recover when they fall."
];
var savedPosters = [];
var currentPoster;

// event listeners go here 👇
displayCurrentPoster();
setupButtonClicks(buttons.showRandom, generateNewPoster);
setupButtonClicks(buttons.showForm, changeView, posterViews.MAIN, posterViews.FORM)
setupButtonClicks(buttons.showMain, changeView, posterViews.FORM, posterViews.MAIN)
setupButtonClicks(buttons.showSaved, changeView, posterViews.MAIN, posterViews.SAVED)
setupButtonClicks(buttons.backToMain, changeView, posterViews.SAVED, posterViews.MAIN)
setupButtonClicks(buttons.savePoster, savePoster)

setupAttributeChanges(posterImage)
setupAttributeChanges(posterTitle)
setupAttributeChanges(posterQuote)

newPosterForm.addEventListener('submit', function(event) {
  submitPosterForm(event);
});

// functions and event handlers go here 👇
// (we've provided two to get you started)!
function displayCurrentPoster() {
  if (currentPoster == undefined) {
    currentPoster = randomPoster()
  }
  posterImage.src = currentPoster.imageURL;
  posterTitle.innerText = currentPoster.title;
  posterQuote.innerText = currentPoster.quote;
}

function generateNewPoster() {
  currentPoster = randomPoster()
  displayCurrentPoster();
}

function randomPoster() {
  return createPoster(getRandomElement(images), getRandomElement(titles), getRandomElement(quotes))
}

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function createPoster(imageURL, title, quote) {
  return {
    id: Date.now(), 
    imageURL: imageURL, 
    title: title, 
    quote: quote}
}

function setupButtonClicks(button, callback, arg1, arg2) {
  button.addEventListener('click', function() {
    callback(arg1, arg2);
  });
}

function changeView(currentView, newView) {
  currentView.classList.add('hidden');
  newView.classList.remove('hidden');
  displayCurrentPoster();
}

function submitPosterForm(event) {
  event.preventDefault();
  
  const imageUrl = document.getElementById('poster-image-url').value;
  const title = document.getElementById('poster-title').value;
  const quote = document.getElementById('poster-quote').value;

  if (!imageUrl || !title || !quote) {
    alert("Please fill out all fields.");
    return;
  }
  
  currentPoster = createPoster(imageUrl, title, quote);
  savePoster();
  changeView(posterViews.FORM, posterViews.MAIN);
}

function savePoster() {
  const isAlreadySaved = savedPosters.some(savedPoster => 
    savedPoster.imageURL === currentPoster.imageURL &&
    savedPoster.title === currentPoster.title &&
    savedPoster.quote === currentPoster.quote
  );
  
  if (isAlreadySaved) {
    showToast("This poster has already been saved.", false);
    return
  }

  const posterToSave = JSON.parse(JSON.stringify(currentPoster)); //Saves a deep copy of poster
  savedPosters.push(posterToSave);
  addPosterToGrid();
}

function addPosterToGrid() {
  const poster = document.createElement('article');
  poster.id = `${currentPoster.id}`
  poster.classList.add(`poster`)
  poster.innerHTML = `
    <img class="poster-img" src="${currentPoster.imageURL}">
    <h1 class="poster-title">${currentPoster.title}</h1>
    <h3 class="poster-quote">${currentPoster.quote}</h3>
  `;

  savedPostersGrid.appendChild(poster);
  enablePosterDeletion(poster, poster.id)
  showToast('Poster saved successfully!', true)
}

function enablePosterDeletion(posterElement, posterId) {
  posterElement.addEventListener('dblclick', function() {
    deletePoster(posterId)
  });
}

function deletePoster(idString) {
  // Remove from DOM
  document.getElementById(`${idString}`).remove();

  // Remove from array
  const posterID = parseInt(idString, 10)
  savedPosters = savedPosters.filter(poster => poster.id !== posterID);
}

function setupAttributeChanges(htmlElement) {
  htmlElement.addEventListener('click', function() {
    switch(htmlElement.className) {
      case 'poster-img':
        newImage = getRandomElement(images)
        htmlElement.src = newImage
        currentPoster.imageURL = newImage
        break;
      case 'poster-title':
        newTitle = getRandomElement(titles)
        htmlElement.innerText = newTitle
        currentPoster.title = newTitle
        break;
      case 'poster-quote':
        newQuote = getRandomElement(quotes)
        htmlElement.innerText = newQuote
        currentPoster.quote = newQuote
    }
  });
}

function showToast(message, isSuccess) {
  const toast = document.createElement('div');
  if (isSuccess) {
    toast.classList.add('success-toast');
  } else {
    toast.classList.add('error-toast');
  }
  toast.textContent = message;

  const container = document.getElementById('toast-container');
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.display = 'none';
    container.removeChild(toast);
  }, 5000);
}

