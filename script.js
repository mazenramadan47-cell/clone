document.addEventListener("DOMContentLoaded", () => {

    console.log("RADODA WEBSITE LOADED");


    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);


    /* =====================================================
       SCENES
    ===================================================== */

    const scenes = $$(".scene");


    function showScene(id) {

        console.log("Opening scene:", id);

        scenes.forEach(scene => {
            scene.classList.remove("active");
        });

        const target = document.getElementById(id);

        if (!target) {
            console.error("Scene not found:", id);
            return;
        }

        target.classList.add("active");

        target.scrollTop = 0;
    }


    /* =====================================================
       STARS
    ===================================================== */

    const stars = $("#stars");

    if (stars) {

        for (let i = 0; i < 70; i++) {

            const star = document.createElement("span");

            star.className = "star";

            star.style.left =
                Math.random() * 100 + "vw";

            star.style.top =
                Math.random() * 100 + "vh";

            star.style.animationDelay =
                Math.random() * 4 + "s";

            star.style.animationDuration =
                2 + Math.random() * 4 + "s";

            stars.appendChild(star);
        }
    }


    /* =====================================================
       MUSIC
    ===================================================== */

    const music = $("#music");
    const musicToggle = $("#musicToggle");

    let musicStarted = false;


    async function startMusic() {

        if (!music) {
            console.error("Music element not found!");
            return;
        }

        try {

            music.volume = 0.22;

            await music.play();

            musicStarted = true;

            if (musicToggle) {
                musicToggle.textContent = "♫";
            }

            console.log("Music started.");

        } catch (error) {

            console.log(
                "Browser blocked music:",
                error
            );

        }
    }


    if (musicToggle) {

        musicToggle.addEventListener(
            "click",
            async (event) => {

                event.preventDefault();
                event.stopPropagation();

                if (!music) return;

                if (music.paused) {

                    await startMusic();

                } else {

                    music.pause();

                    musicToggle.textContent = "♪";

                }

            }
        );

    }


    /* =====================================================
       ENTER MUSEUM
    ===================================================== */

    const enterMuseum = $("#enterMuseum");

    if (enterMuseum) {

        enterMuseum.addEventListener(
            "click",
            async (event) => {

                event.preventDefault();
                event.stopPropagation();

                console.log("ENTER clicked");

                /* Start music from actual user click */
                await startMusic();

                showScene("gallery");

            }
        );

    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const artworks =
        $$(".artwork");

    const viewer =
        $("#artViewer");

    const viewerImage =
        $("#viewerImage");

    const viewerNumber =
        $("#viewerNumber");

    const closeViewer =
        $("#closeViewer");

    const openedCount =
        $("#openedCount");

    const galleryHint =
        $("#galleryHint");

    const continueGallery =
        $("#continueGallery");


    const openedImages =
        new Set();


    artworks.forEach((artwork, index) => {

        artwork.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                console.log(
                    "Artwork clicked:",
                    index + 1
                );


                const image =
                    artwork.querySelector("img");


                if (!image) {

                    console.error(
                        "Image missing"
                    );

                    return;

                }


                if (!viewer || !viewerImage) {

                    console.error(
                        "Viewer missing"
                    );

                    return;

                }


                viewerImage.src =
                    image.currentSrc ||
                    image.src;


                if (viewerNumber) {

                    viewerNumber.textContent =
                        String(index + 1)
                            .padStart(2, "0");

                }


                viewer.classList.add("show");


                openedImages.add(index);


                if (openedCount) {

                    openedCount.textContent =
                        openedImages.size;

                }


                if (
                    openedImages.size === 6
                ) {

                    if (galleryHint) {

                        galleryHint.textContent =
                            "The entire collection has been explored.";

                    }


                    if (continueGallery) {

                        continueGallery.classList.remove(
                            "hidden"
                        );

                    }

                } else {

                    if (galleryHint) {

                        galleryHint.textContent =
                            "Keep exploring the collection.";

                    }

                }

            }
        );

    });


    /* =====================================================
       CLOSE VIEWER
    ===================================================== */

    if (closeViewer) {

        closeViewer.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                viewer.classList.remove("show");

            }
        );

    }


    if (viewer) {

        viewer.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === viewer
                ) {

                    viewer.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* =====================================================
       CONTINUE FROM GALLERY
    ===================================================== */

    if (continueGallery) {

        continueGallery.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                console.log(
                    "Continue gallery clicked"
                );

                showScene(
                    "messageRoom"
                );

            }
        );

    }


    /* =====================================================
       MESSAGE ROOM
    ===================================================== */

    const toCinema =
        $("#toCinema");


    if (toCinema) {

        toCinema.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                console.log(
                    "Cinema clicked"
                );

                showScene("cinema");

            }
        );

    }


    /* =====================================================
       VIDEO
    ===================================================== */

    const mainVideo =
        $("#mainVideo");


    if (mainVideo) {

        mainVideo.addEventListener(
            "loadedmetadata",
            () => {

                console.log(
                    "Video loaded successfully."
                );

            }
        );


        mainVideo.addEventListener(
            "error",
            () => {

                console.error(
                    "VIDEO ERROR: birthday.mp4 could not be loaded."
                );

            }
        );

    }


    /* =====================================================
       FINISH
    ===================================================== */

    const finishButton =
        $("#finishButton");


    if (finishButton) {

        finishButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                console.log(
                    "Finish clicked"
                );

                showScene("finale");

                createFinalParticles();

            }
        );

    }


    /* =====================================================
       FINAL PARTICLES
    ===================================================== */

    function createFinalParticles() {

        const container =
            $("#finalParticles");


        if (!container) return;


        container.innerHTML = "";


        const symbols = [
            "✦",
            "✧",
            "⋆",
            "♥"
        ];


        for (
            let i = 0;
            i < 35;
            i++
        ) {

            const particle =
                document.createElement("div");


            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            particle.style.position =
                "fixed";


            particle.style.left =
                Math.random() * 100 + "vw";


            particle.style.top =
                105 + Math.random() * 10 + "vh";


            particle.style.fontSize =
                10 + Math.random() * 18 + "px";


            particle.style.color =
                i % 4 === 3
                    ? "rgba(255,120,159,.7)"
                    : "rgba(216,180,124,.65)";


            particle.style.pointerEvents =
                "none";


            particle.style.animation =
                `rise ${
                    5 + Math.random() * 5
                }s linear forwards`;


            container.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 11000);

        }

    }


    /* =====================================================
       RESTART
    ===================================================== */

    const restart =
        $("#restart");


    if (restart) {

        restart.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                location.reload();

            }
        );

    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                viewer &&
                viewer.classList.contains("show")
            ) {

                viewer.classList.remove(
                    "show"
                );

            }

        }
    );


    console.log(
        "RADODA WEBSITE READY ✅"
    );

});
