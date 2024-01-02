const input = document.getElementById('input-word');
const searchBtn = document.getElementById('search-btn')
const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
const result = document.getElementById('result');
const sound = document.getElementById('sound')
let searchStyle = null;


async function fetchWordData(word) {
  if (!word) {
    throw new Error('Enter a word');
  }

  const response = await fetch(url + encodeURIComponent(word));
  if (!response.ok) {
    throw new Error('Word Not Found');
  }

  const data = await response.json();
  const wordData = data[0];
  const meanings = wordData.meanings[0];
  const definition = meanings.definitions[0];
  const example = definition.example || "";

  return {
    word,
    partOfSpeech: meanings.partOfSpeech,
    phonetic: wordData.phonetic,
    definition: definition.definition,
    example: example,
    audioUrl: wordData.phonetics[0]?.audio
  };
}

function displayWordInfo(wordInfo) {
  if (!wordInfo) {
    result.innerHTML = `<div class="word"><h3>Error: No word data provided</h3></div>`;
    return;
  }

  result.innerHTML = 
    `<div class="word">
      <h3>${wordInfo.word}</h3>
      <button onclick="playPauseSound()">
        <i class="fa-solid fa-volume-high"></i>
      </button>
    </div>
    <div class="details">
      <p>${wordInfo.partOfSpeech}</p>
      <p>${wordInfo.phonetic}</p>
    </div>
    <p class="word-meaning">${wordInfo.definition}</p>
    <p class="word-example">${wordInfo.example}</p>`;

  sound.setAttribute("src", wordInfo.audioUrl);
}

// Usage
async function findMeaning(word) {
  try {
    const wordInfo = await fetchWordData(word);
    displayWordInfo(wordInfo);
  } catch (err) {
    result.innerHTML = `<div class="word"><h3>${err.message}</h3></div>`;
  }
}


function playPauseSound() {
  if (!sound.src) return; // Do nothing if no sound source is set

  if (sound.paused) {
    sound.play();
  } else {
    sound.pause();
  }
}

function start(){
  let word = input.value;
  searchBtn.classList.add("button-active");
  if (searchStyle) { clearTimeout(searchStyle) };

  searchStyle = setTimeout(() => {
    searchBtn.classList.remove("button-active")
  }, 150)
  
  findMeaning(word);
}


searchBtn.addEventListener("click", () => {
  start();
});
input.addEventListener("keypress", (event) => {
  // Check if the pressed key is 'Enter'
  if (event.keyCode === 13) {
      start();
  }
});



