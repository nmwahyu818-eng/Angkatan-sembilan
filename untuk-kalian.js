// ========================================
// GARDAMAS - UNTUK KALIAN
// JAVASCRIPT
// ========================================


// ========================================
// NAVBAR
// ========================================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ========================================
// MOBILE MENU
// ========================================

const menuButton = document.getElementById("menuButton");

const navMenu = document.getElementById("navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("show");

    });

}


// ========================================
// TUTUP MENU SETELAH KLIK LINK
// ========================================

const navLinks = document.querySelectorAll("#navMenu a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

    });

});


// ========================================
// SMOOTH SCROLL
// ========================================

const scrollLinks = document.querySelectorAll(
    'a[href^="#"]'
);


scrollLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();


        const targetId =
            this.getAttribute("href");


        const target =
            document.querySelector(targetId);


        if (target) {

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


// ========================================
// SCROLL REVEAL
// ========================================

const revealElements =
    document.querySelectorAll(".reveal");


const observerOptions = {

    root: null,

    rootMargin: "0px 0px -80px 0px",

    threshold: 0.05

};


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        observerOptions

    );


// Observe semua elemen reveal

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


// ========================================
// FALLBACK
// Memastikan konten tetap muncul
// jika IntersectionObserver bermasalah
// ========================================

setTimeout(function () {

    revealElements.forEach(function (element) {

        element.classList.add("active");

    });

}, 1000);


// ========================================
// HERO ANIMATION
// ========================================

const heroContent =
    document.querySelector(".hero-content");


if (heroContent) {

    heroContent.style.opacity = "0";

    heroContent.style.transform =
        "translateY(30px)";


    setTimeout(function () {

        heroContent.style.transition =
            "opacity 1s ease, transform 1s ease";


        heroContent.style.opacity = "1";

        heroContent.style.transform =
            "translateY(0)";

    }, 200);

}


// ========================================
// HERO SIDE TEXT PARALLAX
// ========================================

const heroSideText =
    document.querySelector(".hero-side-text");


window.addEventListener("scroll", function () {

    if (!heroSideText) return;


    const scrollPosition =
        window.scrollY;


    if (scrollPosition < window.innerHeight) {

        const movement =
            scrollPosition * 0.05;


        heroSideText.style.transform =

            "rotate(-90deg) translateY(" +
            movement +
            "px)";

    }

});


// ========================================
// LETTER PROTECTION
// PASTIKAN PESAN UTAMA SELALU TERLIHAT
// ========================================

const letter =
    document.querySelector(".letter");


if (letter) {

    letter.style.opacity = "1";

    letter.style.visibility = "visible";

    letter.style.transform = "translateY(0)";

}


// ========================================
// LETTER HEADER PROTECTION
// ========================================

const letterHeader =
    document.querySelector(".letter-header");


if (letterHeader) {

    setTimeout(function () {

        letterHeader.classList.add("active");

    }, 300);

}


// ========================================
// PAGE LOADED
// ========================================

window.addEventListener("load", function () {

    document.body.style.opacity = "1";


    // Pastikan semua konten penting muncul

    document.querySelectorAll(
        ".letter, .letter-body, .letter-header"
    ).forEach(function (element) {

        element.style.opacity = "1";

        element.style.visibility = "visible";

    });

});


// ========================================
// CONSOLE MESSAGE
// ========================================

console.log(
    "GARDAMAS | Untuk Kalian berhasil dimuat."
);