const selectTag = document.querySelectorAll('select'),
      translatebtn = document.querySelector('button'),
      toText = document.querySelector('.to-text'),
      fromText = document.querySelector('.from-text'),
      exchangeIcon = document.querySelector('.exchange'),
      icons = document.querySelectorAll('.row i');

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected = ''; // Initialized as an empty string
    if (id == 0 && country_code == 'en-GB') {
      selected = 'selected';  
    } else if (id == 1 && country_code == 'fr-FR') {
      selected = 'selected';  
    }

    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML('beforeend', option);
  }
});

exchangeIcon.addEventListener('click', () => {
  // swapping the values of the select tags and textareas
  [selectTag[0].value, selectTag[1].value] = [selectTag[1].value, selectTag[0].value];
  [fromText.value, toText.value] = [toText.value, fromText.value];
});

translatebtn.addEventListener('click', () => {
  // remove all punctuation marks from the text and make it a sim
  let text = fromText.value.trim();
  let translateFrom = selectTag[0].value || 'en';
  let translateTo = selectTag[1].value;
  if (text === '') return;
  toText.setAttribute('placeholder', 'Translating...');

  let apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${translateFrom}&tl=${translateTo}&dt=t&q=${encodeURIComponent(text)}`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    toText.value = data[0][0][0];
    toText.setAttribute('placeholder', 'Translation');
  }).catch(error => {
    console.error('Error:', error);
    toText.setAttribute('placeholder', 'Translation failed');
  });
});

// on pressing enter key translate the text and prevent default behaviour
fromText.addEventListener('keydown', ({key}) => {
  if (key === 'Enter') {
    translatebtn.click();
    event.preventDefault();
  }
});

icons.forEach(icon => {
  icon.addEventListener('click', ({target}) => {
    if (target.classList.contains("copyBtn")) {
      // Copy functionality
      navigator.clipboard.writeText(target.id === "from" ? fromText.value : toText.value);
      target.classList.remove("fa-copy");
      target.classList.add("fa-check-circle");
      setTimeout(() => {
        target.classList.remove("fa-check-circle");
        target.classList.add("fa-copy");
      }, 1500);
    } else {
      // Speech synthesis
      let utterance = new SpeechSynthesisUtterance(target.id === "from" ? fromText.value : toText.value);
      utterance.lang = target.id === "from" ? selectTag[0].value : selectTag[1].value;
      speechSynthesis.speak(utterance);
    }
  });
});
