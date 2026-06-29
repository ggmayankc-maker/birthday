/* ==========================================
   GLOBAL VARIABLES
========================================== */

const pages = document.querySelectorAll(".page");

const loader = document.getElementById("loader");

const pinInput = document.getElementById("pin");

const wrongPin = document.getElementById("wrongPin");

const music = document.getElementById("bgMusic");

music.volume = 0.25;

const musicBtn = document.getElementById("musicBtn");

let enteredPin = "";

const CORRECT_PIN = "0708";

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

setTimeout(() => {

loader.style.display = "none";

},2500);

});

/* ==========================================
   PIN KEYPAD
========================================== */

function press(num){

if(enteredPin.length >= 4) return;

enteredPin += num;

pinInput.value = "•".repeat(enteredPin.length);

}

function clearPin(){

enteredPin = enteredPin.slice(0,-1);

pinInput.value = "•".repeat(enteredPin.length);

}

/* ==========================================
   UNLOCK
========================================== */

function unlock(){

if(enteredPin === CORRECT_PIN){

wrongPin.innerHTML = "";

nextPage("welcome");

}else{

wrongPin.innerHTML = "❌ Wrong PIN";

pinInput.classList.add("shake");

setTimeout(()=>{

pinInput.classList.remove("shake");

},500);

enteredPin = "";

pinInput.value = "";

}

}

/* ==========================================
   PAGE NAVIGATION
========================================== */

function nextPage(id){

pages.forEach(page=>{

page.classList.remove("active");

});

document.getElementById(id).classList.add("active");

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/* ==========================================
   MUSIC BUTTON
========================================== */

musicBtn.addEventListener("click",()=>{

if(music.paused){

music.play();

musicBtn.innerHTML="🔊";

}else{

music.pause();

musicBtn.innerHTML="🎵";

}

});
/* ==========================================
   TYPING EFFECT
========================================== */

const message = `Happy Birthday ❤️

You are one of the most special people in my life.

Thank you for every smile, every memory and every moment.

May your life always be filled with happiness, love and success.

Stay blessed.
Stay happy.
Stay beautiful.

Happy Birthday Once Again 🎂❤️`;

let index = 0;

function startTyping(){

const text = document.getElementById("typingText");

if(!text) return;

text.innerHTML = "";

index = 0;

typing();

}

function typing(){

const text = document.getElementById("typingText");

if(index < message.length){

text.innerHTML += message.charAt(index);

index++;

setTimeout(typing,35);

}

}

/* ==========================================
   GIFT ANIMATION
========================================== */

function openGift(){

const gift = document.querySelector(".gift-box");

const giftMessage = document.getElementById("giftMessage");

gift.classList.add("open");

giftMessage.style.display = "block";

}

/* ==========================================
   PAGE EVENTS
========================================== */

const oldNextPage = nextPage;

nextPage = function(id){

oldNextPage(id);

if(id === "letter"){

setTimeout(startTyping,300);

}

if(id === "final"){

setTimeout(showConfetti,500);

}

};

/* ==========================================
   MUSIC CONTROLS
========================================== */

const playBtn = document.getElementById("playMusic");

const pauseBtn = document.getElementById("pauseMusic");

if(playBtn){

playBtn.onclick = ()=>{

music.play();

};

}

if(pauseBtn){

pauseBtn.onclick = ()=>{

music.pause();

};

}
/* ==========================================
   FLOATING HEARTS
========================================== */

function createHeart(){

    const heart = document.createElement("div");
    
    heart.className = "heart";
    
    heart.innerHTML = ["❤️","💖","💕","💗"][Math.floor(Math.random()*4)];
    
    heart.style.left = Math.random()*100 + "vw";
    
    heart.style.animationDuration = (4 + Math.random()*4) + "s";
    
    document.getElementById("floatingHearts").appendChild(heart);
    
    setTimeout(()=>{
    
    heart.remove();
    
    },8000);
    
    }
    
    setInterval(createHeart,700);
    
    /* ==========================================
       SPARKLES
    ========================================== */
    
    function createSparkle(){
    
    const sparkle = document.createElement("div");
    
    sparkle.className = "sparkle";
    
    sparkle.style.left = Math.random()*100 + "vw";
    
    sparkle.style.top = Math.random()*100 + "vh";
    
    sparkle.style.animationDuration = (1 + Math.random()*2) + "s";
    
    document.getElementById("floatingStars").appendChild(sparkle);
    
    setTimeout(()=>{
    
    sparkle.remove();
    
    },3000);
    
    }
    
    setInterval(createSparkle,350);
    
    /* ==========================================
       CONFETTI
    ========================================== */
    
    function showConfetti(){
    
    const container = document.getElementById("confetti-container");
    
    const colors = [
    
    "#ff4f93",
    "#ffd93d",
    "#7ee8fa",
    "#b388ff",
    "#7cffcb",
    "#ff9ec4"
    
    ];
    
    for(let i=0;i<120;i++){
    
    const confetti = document.createElement("div");
    
    confetti.className = "confetti";
    
    confetti.style.left = Math.random()*100 + "vw";
    
    confetti.style.background = colors[Math.floor(Math.random()*colors.length)];
    
    confetti.style.animationDelay = Math.random()*2 + "s";
    
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    
    container.appendChild(confetti);
    
    setTimeout(()=>{
    
    confetti.remove();
    
    },6000);
    
    }
    
    }
    
    /* ==========================================
       POPUP
    ========================================== */
    
    function openPopup(){
    
    const popup = document.getElementById("popup");
    
    popup.style.display = "flex";
    
    }
    
    function closePopup(){
    
    const popup = document.getElementById("popup");
    
    popup.style.display = "none";
    
    }
    /* ==========================================
   INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Hide all pages except active
    pages.forEach(page => {
        if (!page.classList.contains("active")) {
            page.style.display = "none";
        }
    });

    // Observe page changes
    const observer = new MutationObserver(() => {
        pages.forEach(page => {
            page.style.display = page.classList.contains("active")
                ? "flex"
                : "none";
        });
    });

    pages.forEach(page => {
        observer.observe(page, {
            attributes: true,
            attributeFilter: ["class"]
        });
    });

});

/* ==========================================
   AUTOPLAY MUSIC AFTER FIRST TOUCH
========================================== */

function enableMusic() {

    music.play().catch(() => {});

    document.removeEventListener("click", enableMusic);
    document.removeEventListener("touchstart", enableMusic);

}

document.addEventListener("click", enableMusic);

document.addEventListener("touchstart", enableMusic);

/* ==========================================
   REPLAY
========================================== */

function replayWebsite() {

    enteredPin = "";

    pinInput.value = "";

    wrongPin.innerHTML = "";

    nextPage("lockScreen");

    music.currentTime = 0;

}

/* ==========================================
   ENTER KEY SUPPORT
========================================== */

document.addEventListener("keydown", e => {

    if (!isNaN(e.key)) {

        press(e.key);

    }

    if (e.key === "Backspace") {

        clearPin();

    }

    if (e.key === "Enter") {

        unlock();

    }

});

/* ==========================================
   RANDOM HEART BURST
========================================== */

setInterval(() => {

    for (let i = 0; i < 3; i++) {

        createHeart();

    }

}, 5000);

/* ==========================================
   RANDOM CONFETTI
========================================== */

setInterval(() => {

    if (document.getElementById("final").classList.contains("active")) {

        showConfetti();

    }

}, 12000);

/* ==========================================
   END
========================================== */

console.log("❤️ Birthday Website Loaded Successfully ❤️");
