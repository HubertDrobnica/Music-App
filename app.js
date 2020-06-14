const musics = [
  {
    name: "Sea",
    sound: "sounds/sea.mp3",
    img: "img/sea.jpg"
  },
  {
    name: "Forest",
    sound: "sounds/forest.mp3",
    img: "img/forest.jpg"
  },
  {
    name: "Rain",
    sound: "sounds/rain.mp3",
    img: "img/rain.jpg"
  },
  {
    name: "Storm",
    sound: "sounds/storm.mp3",
    img: "img/storm.jpg"
  },
  {
    name: "Birds",
    sound: "sounds/birds.mp3",
    img: "img/birds.jpg"
  },
  {
    name: "Stream",
    sound: "sounds/stream.mp3",
    img: "img/stream.jpg"
  },
  {
    name: "Wind",
    sound: "sounds/wind.mp3",
    img: "img/wind.jpg"
  },
  {
    name: "Hail",
    sound: "sounds/hail.mp3",
    img: "img/hail.jpg"
  }
];
const container = document.querySelector('.musics');
const selectedContainer = document.querySelector('.selected-musics')

for(let i = 0; i < musics.length; i++) {
  container.insertAdjacentHTML('beforeend', 
  `<div class="music" id=${musics[i].name}>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <span class="music-name">${musics[i].name}</span>
    <img src=${musics[i].img} alt="">
    <audio class=${musics[i].name} src=${musics[i].sound}></audio>
  </div>`);
};


const soundBoxes = document.querySelectorAll('.music');
const sounds = document.querySelectorAll('audio');
const playIcon = document.querySelector('#turn-on-music');
const nextIcon = document.querySelector('#next');
const previousIcon = document.querySelector('#previous')
let soundName = document.querySelector('.player-song');



soundBoxes.forEach((soundBox, index) => {
  soundBox.addEventListener('click', soundBoxClick);

  function soundBoxClick() {
    soundBox.style.opacity = '0.8';
    if(sounds[index].paused) {
      sounds[index].play();
      timeUpdate(index);
      playIcon.className = 'fa fa-pause';
    } else {
      sounds[index].pause();
      playIcon.className = 'fa fa-play';
    }

    eliminateOtherSound(soundBox, index)

    changeSoundName(soundBox, index)
  }
  
})


playIcon.addEventListener('click', playOrStop);
function playOrStop() {

  let thisSound = Array.from(sounds).filter(
    function(thisSound) {
      return thisSound.className === document.querySelector('.player-song').innerHTML;
    }
  );

  thisSound = thisSound[0];
  if(thisSound.paused) {
    thisSound.play();
    playIcon.className = 'fa fa-pause';
  } else {
    thisSound.pause();
    playIcon.className = 'fa fa-play';   
  }

}


nextIcon.addEventListener('click', nextSound);
function nextSound() {

  let currentSound = Array.from(sounds).findIndex(currentSound => {
    return currentSound.className === soundName.innerHTML;
  })

  let currentSoundBox = Array.from(soundBoxes).find(currentSoundBox => {
    return currentSoundBox.id === soundName.innerHTML;
  })

  

  if(currentSound == 7) {
    currentSound = -1
  }

  let nextSound = sounds[currentSound = currentSound + 1];
  soundBoxes[currentSound].style.opacity = '0.8';

  const otherSoundBoxes = Array.from(soundBoxes).filter(
  function(otherSoundBoxes) {
  return otherSoundBoxes !== soundBoxes[currentSound];
  })

  otherSoundBoxes.forEach(otherSoundBox => {
    otherSoundBox.style.opacity ='0.4';
  })
 
  console.log(nextSound)
  nextSound.play()
  timeUpdate(currentSound);
  playIcon.className = 'fa fa-pause';
  soundName.innerHTML = nextSound.className;

  const otherSounds = Array.from(sounds).filter(
    function(otherSound) {
      return otherSound !== nextSound;
    }
  );

  otherSounds.forEach( otherSound => {
    otherSound.pause();
  })

  // }

}


previousIcon.addEventListener('click', previousSound)
function previousSound() {
  let currentSound = Array.from(sounds).findIndex(currentSounds => {
    return currentSounds.className === soundName.innerHTML;
  })

  if(currentSound == 0) {
    currentSound = 8
  }

  let nextSound = sounds[currentSound = currentSound - 1];
  soundBoxes[currentSound].style.opacity = '0.8';

  const otherSoundBoxes = Array.from(soundBoxes).filter(
  function(otherSoundBoxes) {
  return otherSoundBoxes !== soundBoxes[currentSound];
  })

  otherSoundBoxes.forEach(otherSoundBox => {
    otherSoundBox.style.opacity ='0.4';
  })
 
  console.log(nextSound)
  nextSound.play()
  timeUpdate(currentSound);
  playIcon.className = 'fa fa-pause';
  soundName.innerHTML = nextSound.className;

  const otherSounds = Array.from(sounds).filter(
    function(otherSound) {
      return otherSound !== nextSound;
    }
  );

  otherSounds.forEach( otherSound => {
    otherSound.pause();
  })

}



function timeUpdate(index) {

  sounds[index].addEventListener('timeupdate', function() {
    let position = sounds[index].currentTime / sounds[index].duration;
    document.querySelector('.player-line-fill').style.width = position * 100 +'%';
  })

}

function eliminateOtherSound(soundBox, index) {

  const otherSounds = Array.from(sounds).filter(
    function(otherSound) {
      return otherSound !== sounds[index];
    }
  );

  otherSounds.forEach( otherSound => {
    otherSound.pause();
    otherSound.currentTime = 0;
  })

  const otherSoundBoxes = Array.from(soundBoxes).filter(
    function(otherSoundBox) {
      return otherSoundBox !== soundBox;
    }
  )

  
  otherSoundBoxes.forEach( otherSoundBox => {
    otherSoundBox.style.opacity = '0.4';
  })

}

function changeSoundName(soundBox, index) {
  soundName.innerHTML = musics[index].name;
}


function makeHeartRed() {
  const hearts =  document.querySelectorAll('.fa-heart')
  hearts.forEach( heart => {
    heart.addEventListener('click', function() {
      heart.classList.toggle('fa-heart-toggle');  
    })
  }
)}
makeHeartRed();









