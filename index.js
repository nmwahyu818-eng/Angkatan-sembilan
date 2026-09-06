document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       LOADER
    ========================================= */

    const loader =
        document.getElementById("loader");


    window.addEventListener("load", function () {


        setTimeout(function () {


            loader.classList.add("hide");


        }, 1200);


    });



    /* =========================================
       NAVBAR SCROLL
    ========================================= */

    const navbar =
        document.getElementById("navbar");


    window.addEventListener("scroll", function () {


        if (window.scrollY > 60) {


            navbar.classList.add("scrolled");


        } else {


            navbar.classList.remove("scrolled");


        }


    });



    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton =
        document.getElementById("menuButton");

    const navMenu =
        document.getElementById("navMenu");


    if (menuButton && navMenu) {


        menuButton.addEventListener("click", function () {


            navMenu.classList.toggle("show");


            menuButton.classList.toggle("active");


        });


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {


            link.addEventListener("click", function () {


                navMenu.classList.remove("show");


            });


        });


    }



    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            function (entries) {


                entries.forEach(function (entry) {


                    if (entry.isIntersecting) {


                        entry.target.classList.add("active");


                        revealObserver.unobserve(
                            entry.target
                        );


                    }


                });


            },

            {

                threshold: 0.15,

                rootMargin:
                    "0px 0px -50px 0px"

            }

        );


    revealElements.forEach(function (element) {


        revealObserver.observe(element);


    });



    /* =========================================
       HERO PARALLAX
    ========================================= */

    const heroImage =
        document.querySelector(".hero-image");

    const heroContent =
        document.querySelector(".hero-content");


    window.addEventListener("scroll", function () {


        const scrollPosition =
            window.scrollY;


        if (scrollPosition < window.innerHeight) {


            if (heroImage) {


                heroImage.style.transform =
                    `translateY(${scrollPosition * 0.15}px) scale(1.05)`;


            }


            if (heroContent) {


                const opacity =
                    1 -
                    (scrollPosition /
                    (window.innerHeight * 0.8));


                heroContent.style.opacity =
                    Math.max(0, opacity);


                heroContent.style.transform =
                    `translateY(${scrollPosition * 0.15}px)`;


            }


        }


    });



    /* =========================================
       SMOOTH ANCHOR
    ========================================= */

    const anchors =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchors.forEach(function (anchor) {


        anchor.addEventListener(
            "click",
            function (event) {


                const targetId =
                    this.getAttribute("href");


                const target =
                    document.querySelector(targetId);


                if (target) {


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });


                }


            }

        );


    });


});