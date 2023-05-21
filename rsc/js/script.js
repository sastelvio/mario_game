const gameOverContainer = document.querySelector('.game_over_container');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const jumpAudio = document.getElementById("jumpAudio");
jumpAudio.preload = 'auto'; // Preload the audio file
const gameOverAudio = document.getElementById("gameOverAudio");
gameOverAudio.preload = 'auto'; // Preload the audio file
// Set a flag to check if audio can be played
let canPlayAudio = true;



// Funcaion to jump
const jump = (event) => {
    if (event.keyCode === 32) { // Check if the key pressed is the spacebar (key code 32)
        mario.classList.add('jump'); // make the player jump
        //Play the jump sound        
        if (canPlayAudio) {
            jumpAudio.play();
            jumpAudio.currentTime = 0;
            canPlayAudio = true;
        }

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

// Set the loop to manage the animation of the pipe, the player and the clouds when the game runs and when game over
const loop = setInterval(() => {
    //console.log('loop');
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');/*+ to get the data as numerical*/
    const cloudsPosition = clouds.offsetLeft;

    //if mario touch the pipe (game over)
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.left = `${marioPosition}px`;

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = 'rsc/img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // Stop playing the audio when collision occurs
        jumpAudio.pause();
        jumpAudio.currentTime = 0;
        canPlayAudio = false;

        //play the game over audio
        gameOverAudio.play();

        gameOverContainer.classList.add('show');

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);


