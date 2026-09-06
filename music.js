const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");


// Ambil waktu terakhir musik
const savedTime = localStorage.getItem("musicTime");

if (savedTime) {

    bgMusic.currentTime = parseFloat(savedTime);

}


// Cek apakah musik sebelumnya sedang diputar
const wasPlaying = localStorage.getItem("musicPlaying");

if (wasPlaying === "true") {

    bgMusic.play().catch(() => {});

    musicIcon.textContent = "♫";

}


// Tombol musik
musicButton.addEventListener("click", () => {

    if (bgMusic.paused) {

        bgMusic.play();

        musicIcon.textContent = "♫";

        localStorage.setItem("musicPlaying", "true");

    } else {

        bgMusic.pause();

        musicIcon.textContent = "♪";

        localStorage.setItem("musicPlaying", "false");

    }

});


// Simpan waktu musik setiap beberapa saat
bgMusic.addEventListener("timeupdate", () => {

    localStorage.setItem(
        "musicTime",
        bgMusic.currentTime
    );

});


// Sebelum pindah halaman
window.addEventListener("beforeunload", () => {

    localStorage.setItem(
        "musicTime",
        bgMusic.currentTime
    );


    localStorage.setItem(
        "musicPlaying",
        !bgMusic.paused
    );

});
 
