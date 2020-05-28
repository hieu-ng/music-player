const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukelele'];

// Keep tracks of song
let songIndex = 2;

loadSong(song[songIndex]);

function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.mp3`;
}

function playSong() {
	musicContainer.classList.add('.play');
	playBtn.querySelector('i.fas')
		.classList.remove('fa-play');
	playBtn.querySelector('i.fas')
		.classList.add('fa-play');

	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove('.play');
	playBtn.querySelector('i.fas')
		.classList.add('fa-play');
	playBtn.querySelector('i.fas')
		.classList.remove('fa-play');

	audio.pause();
}

playBtn.addEventListener('click' () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1
	}

	loadSong(song[songIndex]);
}

function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(song[songIndex]);
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
	const {
		duration,
		currentTime
	} = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);
