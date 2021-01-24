// GLOBALS
var index = 0;
var swipeStart = 0;
var swipeEnd = 0;
localStorage.setItem("song", JSON.stringify(songs[index]));

// Show next song slide.
function showNext() {
    index++;
    index %= songs.length;
    localStorage.setItem("song", JSON.stringify(songs[index]));
    slide(index);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', `${songs[index].bgColor}`);
}

// Show previous song slide.
function showPrev() {
    if (index <= 0) index = songs.length;
    index--;
    index %= songs.length;
    localStorage.setItem("song", JSON.stringify(songs[index]));
    slide(index);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', `${songs[index].bgColor}`);
}

document.querySelector(".next").addEventListener("click", () => {
    showNext();
});

document.querySelector(".prev").addEventListener("click", () => {
    showPrev();
});

/**
 * Animatees the slide and changes the song information.
 * 
 * @param {number} index - Index of the songs Object Array
 */
function slide(index) {
    if (window.innerWidth >= 700) {
        document.querySelector(".background").style.backgroundImage = `url(${songs[index].bgImage})`
    } else {
        document.querySelector(".background").style.backgroundImage = `url(${songs[index].bgImageMobile})`;
    }

    document.querySelector(".song-name").style.transform = "translateY(-50rem)";
    document.querySelector(".artist").style.transform = "translateY(30rem)";

    setTimeout(() => {
        document.querySelector(".song-name").innerHTML = songs[index].song;
        document.querySelector(".artist-name").innerHTML = songs[index].artist;
        document.querySelector(".song-name").style.transform = "translateY(0)";
        document.querySelector(".artist").style.transform = "translateY(0)";
        document.querySelector(".quote").innerHTML = songs[index].lyrics;
    }, 600);

    document.querySelector(".bubble").style.background = songs[index].bgColor;
    document.querySelector(".bubblet").style.background = songs[index].bgColor;
    document.querySelector(".play-btn").style.background = songs[index].bgColor;
    document.querySelector(".play-btn").style.color = songs[index].color;
    document.querySelector(".install-btn").style.background = songs[index].bgColor;
    document.querySelector(".install-btn").style.color = songs[index].color;
}

// Preloads all the images associated with the songs.
function preLoadImage(url) {
    let image = new Image();
    image.src = url;
}

// STUPIDITY (To be fixed.)
for (let i = 0; i < songs.length; i++) {
    if (window.innerWidth > 700) {
        preLoadImage(songs[i].bgImage);
    } else {
        preLoadImage(songs[i].bgImageMobile);
    }
}

// Handles right or left swipes
function swipeHandler() {
    if ((swipeEnd - swipeStart) < -100) {
        showNext();
    }
    else if ((swipeEnd - swipeStart) > 100) {
        showPrev();
    }
}

document.addEventListener('touchstart', event => {
    swipeStart = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', event => {
    swipeEnd = event.changedTouches[0].screenX;
    swipeHandler();
});

// Show arrow animation 500ms after window is loaded.
window.onload = function () {
    setTimeout(() => {
        document.querySelector(".swipe").style.animation = "swipe-left 2s 1";
        document.querySelector(".swipe").style.animationFillMode = "forwards";
    }, 500);
}

document.querySelector(".warning--close").addEventListener("click", () => {
    document.querySelector(".warning").classList.add("warning--hide");
});

// Creating In-App installation flow
let deferredPrompt;
window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    document.querySelector(".install-btn").classList.add("install-btn--show");
});
document.querySelector(".install-btn").addEventListener("click", event => {
    document.querySelector(".install-btn").classList.remove("install-btn--show");
    deferredPrompt.prompt();
});