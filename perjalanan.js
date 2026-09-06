document.addEventListener("DOMContentLoaded", function () {


    /* ========================================
       NAVBAR SCROLL
    ======================================== */

    const navbar =
        document.getElementById("navbar");


    window.addEventListener("scroll", function () {


        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }


    });



    /* ========================================
       MOBILE MENU
    ======================================== */

    const menuButton =
        document.getElementById("menuButton");

    const navMenu =
        document.getElementById("navMenu");


    if (menuButton && navMenu) {


        menuButton.addEventListener("click", function () {


            navMenu.classList.toggle("show");


        });


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {


            link.addEventListener("click", function () {


                navMenu.classList.remove("show");


            });


        });


    }



    /* ========================================
       HERO PARALLAX
    ======================================== */

    const heroBackground =
        document.querySelector(".journey-hero-bg");

    const heroContent =
        document.querySelector(
            ".journey-hero-content"
        );


    window.addEventListener("scroll", function () {


        const scrollPosition =
            window.scrollY;


        const heroHeight =
            window.innerHeight;


        if (scrollPosition < heroHeight) {


            if (heroBackground) {


                heroBackground.style.transform =
                    `translateY(${scrollPosition * 0.18}px) scale(1.05)`;


            }


            if (heroContent) {


                const opacity =
                    1 -
                    (scrollPosition /
                    (heroHeight * 0.85));


                heroContent.style.opacity =
                    Math.max(0, opacity);


                heroContent.style.transform =
                    `translateY(${scrollPosition * 0.12}px)`;


            }


        }


    });



    /* ========================================
       REVEAL ANIMATION
    ======================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


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

            {

                threshold: 0.15,

                rootMargin:
                    "0px 0px -40px 0px"

            }

        );


    revealElements.forEach(function (element) {


        revealObserver.observe(element);


    });



    /* ========================================
       TIMELINE ANIMATION
    ======================================== */

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    const timelineObserver =
        new IntersectionObserver(

            function (entries) {


                entries.forEach(function (entry) {


                    if (entry.isIntersecting) {


                        entry.target.classList.add(
                            "show"
                        );


                        timelineObserver.unobserve(
                            entry.target
                        );


                    }


                });


            },

            {

                threshold: 0.15

            }

        );


    timelineItems.forEach(function (item) {


        timelineObserver.observe(item);


    });



    /* ========================================
       TIMELINE PROGRESS LINE
    ======================================== */

    const timeline =
        document.getElementById("timeline");


    if (timeline) {


        const progressLine =
            document.createElement("div");


        progressLine.className =
            "timeline-progress";


        timeline.appendChild(
            progressLine
        );


        window.addEventListener(
            "scroll",
            function () {


                const timelineTop =
                    timeline.getBoundingClientRect().top;


                const timelineHeight =
                    timeline.offsetHeight;


                const screenPosition =
                    window.innerHeight * 0.65;


                let progress =
                    (screenPosition - timelineTop)
                    / timelineHeight;


                progress =
                    Math.max(
                        0,
                        Math.min(1, progress)
                    );


                progressLine.style.height =
                    `${progress * 100}%`;


            }

        );


    }



    /* ========================================
       TRANSITION IMAGE ANIMATION
    ======================================== */

    const transitionSection =
        document.getElementById(
            "transitionSection"
        );


    if (transitionSection) {


        const transitionObserver =
            new IntersectionObserver(

                function (entries) {


                    entries.forEach(function (entry) {


                        if (entry.isIntersecting) {


                            transitionSection.classList.add(
                                "active"
                            );


                        }


                    });


                },

                {

                    threshold: 0.3

                }

            );


        transitionObserver.observe(
            transitionSection
        );


    }



    /* ========================================
       IMAGE HOVER PARALLAX
    ======================================== */

    const timelineImages =
        document.querySelectorAll(
            ".timeline-image"
        );


    timelineImages.forEach(function (image) {


        image.addEventListener(
            "mousemove",
            function (event) {


                const imageElement =
                    image.querySelector("img");


                const rect =
                    image.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const moveX =
                    (x / rect.width - 0.5) * 10;


                const moveY =
                    (y / rect.height - 0.5) * 10;


                imageElement.style.transform =
                    `scale(1.06) translate(${moveX}px, ${moveY}px)`;


            }
        );


        image.addEventListener(
            "mouseleave",
            function () {


                const imageElement =
                    image.querySelector("img");


                imageElement.style.transform = "";


            }
        );


    });



    /* ========================================
       SMOOTH PAGE ENTRY
    ======================================== */

    document.body.style.opacity = "0";


    window.requestAnimationFrame(function () {


        document.body.style.transition =
            "opacity 0.6s ease";


        document.body.style.opacity = "1";


    });


});