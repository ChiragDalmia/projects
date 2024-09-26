document.addEventListener('DOMContentLoaded', (event) => {
  const progress = document.getElementById('progress');
  const song = document.getElementById('song');
  const ctrlIcon = document.getElementById('ctrlIcon');
  const currentTimeDisplay = document.getElementById('current-time');
  const durationDisplay = document.getElementById('duration');

  let wasPlaying = false; // To track if the song was playing before sliding

  // Function to format time in minutes:seconds
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secondsPart}`;
  }

  song.addEventListener('loadedmetadata', () => {
    progress.max = song.duration;
    progress.value = song.currentTime;
    durationDisplay.textContent = `-${formatTime(song.duration)}`; // Update remaining time display initially
  });

  song.addEventListener('timeupdate', () => {
    progress.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime); // Update current time display

    const remainingTime = song.duration - song.currentTime;
    durationDisplay.textContent = `-${formatTime(remainingTime)}`; // Update remaining time display

    updateProgressBar();
  });

  song.addEventListener('ended', () => {
    ctrlIcon.classList.replace('fa-pause', 'fa-play'); // Change icon back to play when the song ends
  });

  progress.addEventListener('input', () => {
    song.currentTime = progress.value;
    currentTimeDisplay.textContent = formatTime(progress.value); // Update current time display during scrubbing
    updateProgressBar();
  });

  ctrlIcon.addEventListener('click', togglePlayPause);

  function togglePlayPause() {
    if (song.paused) {
      song.play();
      ctrlIcon.classList.replace('fa-play', 'fa-pause');
    } else {
      song.pause();
      ctrlIcon.classList.replace('fa-pause', 'fa-play');
    }
  }

  function updateProgressBar() {
    const percentage = (progress.value / progress.max) * 100;
    progress.style.background = `linear-gradient(90deg, #A1959D ${percentage}%, #5D525B ${percentage}%)`;
  }

  const pauseSong = () => {
    wasPlaying = !song.paused; // Check if the song is playing
    song.pause(); // Pause the song
  };

  const resumeSong = () => {
    if (wasPlaying) {
      song.play(); // Resume playing if the song was playing before sliding
    }
  };

  progress.addEventListener('mousedown', pauseSong);
  progress.addEventListener('touchstart', pauseSong);

  progress.addEventListener('mouseup', resumeSong);
  progress.addEventListener('touchend', resumeSong);
});

// Volume Control 

const volumeControl = document.getElementById('volumeControl');
volumeControl.addEventListener('input', function () {
  const volume = this.value;
  document.getElementById('song').volume = volume;
  updateVolumeBar();
});

function updateVolumeBar() {
  const percentage = (volumeControl.value / volumeControl.max) * 100;
  volumeControl.style.background = `linear-gradient(90deg, #A1959D ${percentage}%, #5D525B ${percentage}%)`;
}
