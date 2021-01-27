// GLOBALS 
var song;               // Stores the song.
var size;               // Stores the size of the cube.
var fft;                // Stores the Fast Fourier Transform's instance.
var amp;                // Stores the Amplitude instance of the song.
var centerCube;         // Stores the instance of the Cube.
var theta = 0;          // Stores the Angle of rotation of the cube.
var loading = 1;        // Stores the loading flag which is true when song is loading.
var local = JSON.parse(localStorage.getItem("song"));       // Stores the song object present in Local Storage of the browser.

// Setting the size of cube according to the size of the screen.
if (window.innerWidth > 900) {
    size = window.innerWidth / 4;
} else {
    size = window.innerWidth / 1.8;
}


//Callback from the loadSound function to verify that the
//song has indeed been loaded.  
function songLoaded(s) {
    song = s;
    loading = 0;
}

function setup() {
    window.addEventListener("resize", () => {
        createCanvas(window.innerWidth, window.innerHeight, WEBGL).parent("wrapper");
        background(20);
    });
    createCanvas(window.innerWidth, window.innerHeight, WEBGL).parent("wrapper");
    background(20);

    fft = new p5.FFT(0, 8192);
    amp = new p5.Amplitude();

    centerCube = new Cube(size, 1, 20, local.bgColor);

    document.querySelectorAll(".var-color").forEach(index => {
        index.style.fill = local.bgColor;
    });
    document.querySelector(".upload-svg").style.fill = local.color;
    document.querySelector(".upload-file").style.background = local.bgColor;
    document.querySelector(".upload-file").style.color = local.color;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', `${local.bgColor}`);
    document.querySelector(".song-title").innerHTML = `${local.song} ${local.artist}`
    document.querySelector(".copy-btn").style.color = local.bgColor;
    
    loadSound(local.url, songLoaded).onended(showPlay);
}

function draw() {
    if (!loading) {
        document.querySelector(".loading-wrapper").classList.add("hide");
        var spectrum = fft.analyze();
        var vol = amp.getLevel();

        let sum = 0;
        for (let i = 0; i < spectrum.length; i++) {
            sum += spectrum[i];
        }

        let avg = sum / spectrum.length * 512;
        theta += avg;

        if (song.isPlaying()) {
            centerCube.displayWRotate(cos(theta * 0.000002), sin(theta * 0.000002), avg * 0.00002);
        }

        if (window.innerWidth < 900) {
            document.querySelector('.ctop').style.boxShadow = `1px ${avg * 0.0002}px 40px rgba(${local.bgColRange[0]}, ${local.bgColRange[1]}, ${local.bgColRange[2]}, ${vol * 5})`;
            document.querySelector('.cbottom').style.boxShadow = `1px -${avg * 0.0002}px 40px rgba(${local.bgColRange[0]}, ${local.bgColRange[1]}, ${local.bgColRange[2]}, ${vol * 5})`;
        } else {
            document.querySelector('.ctop').style.boxShadow = `1px ${avg * 0.0002}px 60px rgba(${local.bgColRange[0] + avg * 0.001}, ${local.bgColRange[1] + avg * 0.001}, ${local.bgColRange[2] + vol * 100}, ${vol * 5})`;
            document.querySelector('.cleft').style.boxShadow = `${avg * 0.0002}px 1px 60px rgba(${local.bgColRange[0] + avg * 0.001}, ${local.bgColRange[1] + avg * 0.001}, ${local.bgColRange[2] + vol * 100}, ${vol * 5})`;
            document.querySelector('.cright').style.boxShadow = `-${avg * 0.0002}px 1px 60px rgba(${local.bgColRange[0] + avg * 0.001}, ${local.bgColRange[1] + avg * 0.001}, ${local.bgColRange[2] + vol * 100}, ${vol * 5})`;
            document.querySelector('.cbottom').style.boxShadow = `1px -${avg * 0.0002}px 60px rgba(${local.bgColRange[0] + avg * 0.001}, ${local.bgColRange[1] + avg * 0.001}, ${local.bgColRange[2] + vol * 100}, ${vol * 5})`;
        }
    } else {
        document.querySelector(".loading-wrapper").classList.remove("hide");
    }
}

// Show play button.
function showPlay() {
    document.querySelector(".play").classList.add("play--show");
    document.querySelector(".pause").classList.remove("pause--show");
}

// Show pause button.
function showPause() {
    document.querySelector(".pause").classList.add("pause--show");
    document.querySelector(".play").classList.remove("play--show");
}

// Toggles song's state [play or pause]
function toggleSong() {
    if (document.querySelector("#wrapper").requestFullscreen) {
        document.querySelector("#wrapper").requestFullscreen();
    } else if (document.querySelector("#wrapper").webkitRequestFullscreen) {
        document.querySelector("#wrapper").webkitRequestFullscreen();
    }
    document.querySelector(".upload-file").classList.add("upload-file--show");
    if (song.isPlaying()) {
        song.pause();
        showPlay();
    } else {
        song.play();
        showPause();
    }
}

// Handle song uploads from users.
document.querySelector(".upload").addEventListener("change", (event) => {
    event.preventDefault();
    loading = 1;
    song.stop();
    clear();
    background(20);
    document.querySelector(".song-title").innerHTML = event.target.files[0].name;
    song = loadSound(event.target.files[0], songLoaded);
    showPlay();
    if (window.innerWidth < 700) {
        centerCube.size = window.innerWidth / 1.8;
    } else {
        centerCube.size = window.innerWidth / 4;
    }
});

onInactivity(15000, function () {
    document.querySelector(".music-controls").classList.add("music-controls--hide");
    document.querySelector(".share").classList.add("share--hide");
});

/**
 * Detects inactivity of the user
 * 
 * @param {number} timeout - Milliseconds after which buttons will disappear. 
 * @param {Function} callback - Callback for hiding the controls container.
 */
function onInactivity(timeout, callback) {
    let wait = setTimeout(callback, timeout);
    document.onmousedown =
        document.onmouseup =
        document.onmousemove =
        document.onkeydown =
        document.onkeyup =
        document.focus =
        document.ontouchstart = function () {
            document.querySelector(".music-controls").classList.remove("music-controls--hide");
            document.querySelector(".share").classList.remove("share--hide");
            clearTimeout(wait);
            wait = setTimeout(callback, timeout);
        }
}

// In-App Installaiton
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
});