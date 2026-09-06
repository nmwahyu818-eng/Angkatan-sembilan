// ========================================
// GARDAMAS MUSIC SYSTEM
// STABLE VERSION
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicButton");
    const icon = document.getElementById("musicIcon");

    if (!music || !button) return;


    const TIME_KEY = "gardamas_music_time";
    const PLAY_KEY = "gardamas_music_playing";


    music.volume = 0.3;


    // ====================================
    // UPDATE BUTTON
    // ====================================

    function updateButton() {

        if (music.paused) {

            button.classList.remove("playing");

            if (icon) icon.textContent = "♪";

        } else {

            button.classList.add("playing");

            if (icon) icon.textContent = "Ⅱ";

        }

    }


    // ====================================
    // LOAD SAVED TIME
    // ====================================

    music.addEventListener("loadedmetadata", () => {

        const savedTime = sessionStorage.getItem(TIME_KEY);

        if (savedTime) {

            const time = Number(savedTime);

            if (
                Number.isFinite(time) &&
                time >= 0 &&
                time < music.duration
            ) {

                music.currentTime = time;

            }

        }


        // =================================
        // AUTO CONTINUE
        // =================================

        if (
            sessionStorage.getItem(PLAY_KEY) === "true"
        ) {

            music.play()
                .then(updateButton)
                .catch(() => {

                    /*
                    Browser memblokir autoplay.
                    Status jangan dihapus.
                    */

                });

        }

    });


    // ====================================
    // MUSIC BUTTON
    // ====================================

    button.addEventListener("click", () => {

        if (music.paused) {

            music.play()
                .then(() => {

                    sessionStorage.setItem(
                        PLAY_KEY,
                        "true"
                    );

                    updateButton();

                });

        } else {

            music.pause();

            sessionStorage.setItem(
                PLAY_KEY,
                "false"
            );

            updateButton();

        }

    });


    // ====================================
    // SAVE TIME
    // ====================================

    setInterval(() => {

        if (!music.paused) {

            sessionStorage.setItem(
                TIME_KEY,
                music.currentTime
            );

        }

    }, 300);


    // ====================================
    // SAVE BEFORE PAGE CHANGE
    // ====================================

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.visibilityState === "hidden") {

                sessionStorage.setItem(
                    TIME_KEY,
                    music.currentTime
                );

            }

        }
    );


    window.addEventListener(
        "pagehide",
        () => {

            sessionStorage.setItem(
                TIME_KEY,
                music.currentTime
            );

        }
    );


    // ====================================
    // UPDATE STATUS
    // ====================================

    music.addEventListener("play", () => {

        sessionStorage.setItem(
            PLAY_KEY,
            "true"
        );

        updateButton();

    });

});