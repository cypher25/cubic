// Prompting for sharing
document.querySelector(".share").addEventListener("click", () => {
    if (navigator.share) {
        navigator.share({
            title: "Cubic",
            text: "Check out Cubic",
            url: "https://cypher25.github.io/cubic",
        })
            .then(() => {console.log("Thanks For Sharing!")})
            .catch(() => {console.error});
    } else {
        document.querySelector(".share-overlay").classList.add("share-overlay--show");
        document.querySelector(".share-container").classList.add("share-container--show");
    }
});

// Hiding share modal if clicked outside of share dialog box.
document.querySelector(".share-overlay").addEventListener("click", () => {
    document.querySelector(".share-overlay").classList.remove("share-overlay--show");
    document.querySelector(".share-container").classList.remove("share-container--show");
});

// Hiding share modal if clicked on close btn 
document.querySelector(".close-svg").addEventListener("click", () => {
    document.querySelector(".share-overlay").classList.remove("share-overlay--show");
    document.querySelector(".share-container").classList.remove("share-container--show");
});

// Copying the url to clipboard and showing notification
document.querySelector(".copy-btn").addEventListener("click", () => {
    document.querySelector(".share-inp").select();
    document.execCommand("Copy");
    document.querySelector(".share-notify").classList.add("share-notify--show");
    setTimeout(() => {
        document.querySelector(".share-notify").classList.remove("share-notify--show");
    }, 4000)
});