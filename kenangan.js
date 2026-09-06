document.addEventListener("DOMContentLoaded", function () {

/* =========================
   PAGE ENTRY
========================= */

document.body.style.opacity = "0";


requestAnimationFrame(function () {

    document.body.style.transition =
        "opacity 0.6s ease";

    document.body.style.opacity = "1";

});



/* =========================
   NAVBAR
========================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("show");

    });


    const links =
        navMenu.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

        });

    });

}



/* =========================
   HERO PARALLAX
========================= */

const heroBackground =
    document.querySelector(".hero-background");

const heroContent =
    document.querySelector(".hero-content");


window.addEventListener("scroll", function () {

    const scroll =
        window.scrollY;

    const height =
        window.innerHeight;


    if (scroll < height) {

        if (heroBackground) {

            heroBackground.style.transform =
                `translateY(${scroll * 0.18}px) scale(1.05)`;

        }


        if (heroContent) {

            const opacity =
                1 - (scroll / (height * 0.8));


            heroContent.style.opacity =
                Math.max(opacity, 0);


            heroContent.style.transform =
                `translateY(${scroll * 0.12}px)`;

        }

    }

});



/* =========================
   REVEAL ON SCROLL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});



/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxNumber =
    document.getElementById("lightboxNumber");

const lightboxText =
    document.getElementById("lightboxText");

const closeButton =
    document.getElementById("closeLightbox");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");


let currentIndex = 0;


const galleryData = [];


galleryItems.forEach(function (item, index) {

    const image =
        item.querySelector("img");

    const number =
        item.querySelector(".gallery-overlay span");

    const text =
        item.querySelector(".gallery-overlay p");


    galleryData.push({

        image: image.src,

        number: number
            ? number.textContent
            : index + 1,

        text: text
            ? text.textContent
            : ""

    });


    item.addEventListener("click", function () {

        currentIndex = index;

        openLightbox();

    });

});



/* =========================
   OPEN LIGHTBOX
========================= */

function openLightbox() {

    const current =
        galleryData[currentIndex];


    lightboxImage.src =
        current.image;


    lightboxNumber.textContent =
        current.number;


    lightboxText.textContent =
        current.text;


    lightbox.classList.add("active");


    document.body.style.overflow =
        "hidden";

}



/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

    lightbox.classList.remove("active");


    document.body.style.overflow =
        "";

}


closeButton.addEventListener(
    "click",
    closeLightbox
);



/* =========================
   NEXT PHOTO
========================= */

function nextPhoto() {

    currentIndex++;


    if (currentIndex >= galleryData.length) {

        currentIndex = 0;

    }


    updateLightbox();

}



/* =========================
   PREVIOUS PHOTO
========================= */

function previousPhoto() {

    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            galleryData.length - 1;

    }


    updateLightbox();

}



/* =========================
   UPDATE LIGHTBOX
========================= */

function updateLightbox() {

    const current =
        galleryData[currentIndex];


    lightboxImage.style.opacity = "0";


    setTimeout(function () {

        lightboxImage.src =
            current.image;


        lightboxNumber.textContent =
            current.number;


        lightboxText.textContent =
            current.text;


        lightboxImage.style.opacity = "1";

    }, 150);

}



nextButton.addEventListener(
    "click",
    nextPhoto
);


prevButton.addEventListener(
    "click",
    previousPhoto
);



/* =========================
   CLICK OUTSIDE IMAGE
========================= */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});



/* =========================
   KEYBOARD CONTROL
========================= */

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) {

        return;

    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowRight") {

        nextPhoto();

    }


    if (event.key === "ArrowLeft") {

        previousPhoto();

    }

});



/* =========================
   IMAGE LOADING EFFECT
========================= */

const images =
    document.querySelectorAll("img");


images.forEach(function (image) {

    image.addEventListener("load", function () {

        image.classList.add("loaded");

    });

});

});