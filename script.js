```javascript
document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCENE NAVIGATION
    ===================================================== */

    const scenes =
        document.querySelectorAll(".scene");


    function showScene(id) {

        scenes.forEach(scene => {
            scene.classList.remove("active");
        });

        const target =
            document.getElementById(id);

        if (!target) return;

        requestAnimationFrame(() => {
            target.classList.add("active");
        });
    }


    /* =====================================================
       STARS
    ===================================================== */

    const stars =
        document.getElementById("stars");


    if (stars) {

        for (let i = 0; i < 70; i++) {

            const star =
                document.createElement("span");

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

    const music =
        document.getElementById("music");

    const musicToggle =
        document.getElementById("musicToggle");


    function playMusic() {

        if (!music) return;

        music.volume = 0.22;

        music.play()
            .then(() => {

                if (musicToggle) {
                    musicToggle.textContent = "♫";
                }

            })
            .catch(() => {});
    }


    if (musicToggle) {

        musicToggle.addEventListener("click", () => {

            if (!music) return;

            if (music.paused) {

                playMusic();

            } else {

                music.pause();

                musicToggle.textContent = "♪";
            }
        });
    }


    /* =====================================================
       ENTER MUSEUM
    ===================================================== */

    const enterMuseum =
        document.getElementById("enterMuseum");


    if (enterMuseum) {

        enterMuseum.addEventListener("click", () => {

            playMusic();

            showScene("gallery");

        });
    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const artworks =
        document.querySelectorAll(".artwork");

    const viewer =
        document.getElementById("artViewer");

    const viewerImage =
        document.getElementById("viewerImage");

    const viewerNumber =
        document.getElementById("viewerNumber");

    const closeViewer =
        document.getElementById("closeViewer");

    const openedCount =
        document.getElementById("openedCount");

    const galleryHint =
        document.getElementById("galleryHint");

    const continueGallery =
        document.getElementById("continueGallery");


    let openedImages =
        new Set();


    artworks.forEach((artwork, index) => {

        artwork.addEventListener("click", () => {

            const imageName =
                artwork.dataset.image;

            const img =
                artwork.querySelector("img");


            if (
                !imageName ||
                !img ||
                !viewer ||
                !viewerImage
            ) {
                return;
            }


            viewerImage.src =
                img.currentSrc ||
                "./" + imageName;


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

        });

    });


    if (closeViewer) {

        closeViewer.addEventListener("click", () => {

            viewer.classList.remove("show");

        });

    }


    if (viewer) {

        viewer.addEventListener("click", event => {

            if (
                event.target === viewer
            ) {

                viewer.classList.remove("show");

            }

        });

    }


    /* =====================================================
       TO MESSAGE ROOM
    ===================================================== */

    if (continueGallery) {

        continueGallery.addEventListener("click", () => {

            showScene("messageRoom");

        });

    }


    /* =====================================================
       MESSAGE → CINEMA
    ===================================================== */

    const toCinema =
        document.getElementById("toCinema");


    if (toCinema) {

        toCinema.addEventListener("click", () => {

            showScene("cinema");

        });

    }


    /* =====================================================
       VIDEO
    ===================================================== */

    const mainVideo =
        document.getElementById("mainVideo");


    if (mainVideo) {

        mainVideo.addEventListener(
            "error",
            () => {

                console.error(
                    "birthday.mp4 could not be loaded."
                );

            }
        );

    }


    /* =====================================================
       FINISH
    ===================================================== */

    const finishButton =
        document.getElementById(
            "finishButton"
        );


    if (finishButton) {

        finishButton.addEventListener("click", () => {

            showScene("finale");

            createFinaleParticles();

        });

    }


    /* =====================================================
       FINALE PARTICLES
    ===================================================== */

    function createFinaleParticles() {

        const container =
            document.getElementById(
                "finalParticles"
            );


        if (!container) return;


        const symbols = [
            "✦",
            "✧",
            "⋆",
            "♥"
        ];


        for (let i = 0; i < 35; i++) {

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


    const style =
        document.createElement("style");


    style.textContent = `

        @keyframes rise {

            from {
                transform:
                    translateY(0)
                    rotate(0deg);

                opacity: 0;
            }

            12% {
                opacity: 1;
            }

            to {
                transform:
                    translateY(-120vh)
                    rotate(35deg);

                opacity: 0;
            }

        }

    `;


    document.head.appendChild(style);


    /* =====================================================
       RESTART
    ===================================================== */

    const restart =
        document.getElementById(
            "restart"
        );


    if (restart) {

        restart.addEventListener("click", () => {

            location.reload();

        });

    }

});
```
```javascript
document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCENE NAVIGATION
    ===================================================== */

    const scenes =
        document.querySelectorAll(".scene");


    function showScene(id) {

        scenes.forEach(scene => {
            scene.classList.remove("active");
        });

        const target =
            document.getElementById(id);

        if (!target) return;

        requestAnimationFrame(() => {
            target.classList.add("active");
        });
    }


    /* =====================================================
       STARS
    ===================================================== */

    const stars =
        document.getElementById("stars");


    if (stars) {

        for (let i = 0; i < 70; i++) {

            const star =
                document.createElement("span");

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

    const music =
        document.getElementById("music");

    const musicToggle =
        document.getElementById("musicToggle");


    function playMusic() {

        if (!music) return;

        music.volume = 0.22;

        music.play()
            .then(() => {

                if (musicToggle) {
                    musicToggle.textContent = "♫";
                }

            })
            .catch(() => {});
    }


    if (musicToggle) {

        musicToggle.addEventListener("click", () => {

            if (!music) return;

            if (music.paused) {

                playMusic();

            } else {

                music.pause();

                musicToggle.textContent = "♪";
            }
        });
    }


    /* =====================================================
       ENTER MUSEUM
    ===================================================== */

    const enterMuseum =
        document.getElementById("enterMuseum");


    if (enterMuseum) {

        enterMuseum.addEventListener("click", () => {

            playMusic();

            showScene("gallery");

        });
    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const artworks =
        document.querySelectorAll(".artwork");

    const viewer =
        document.getElementById("artViewer");

    const viewerImage =
        document.getElementById("viewerImage");

    const viewerNumber =
        document.getElementById("viewerNumber");

    const closeViewer =
        document.getElementById("closeViewer");

    const openedCount =
        document.getElementById("openedCount");

    const galleryHint =
        document.getElementById("galleryHint");

    const continueGallery =
        document.getElementById("continueGallery");


    let openedImages =
        new Set();


    artworks.forEach((artwork, index) => {

        artwork.addEventListener("click", () => {

            const imageName =
                artwork.dataset.image;

            const img =
                artwork.querySelector("img");


            if (
                !imageName ||
                !img ||
                !viewer ||
                !viewerImage
            ) {
                return;
            }


            viewerImage.src =
                img.currentSrc ||
                "./" + imageName;


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

        });

    });


    if (closeViewer) {

        closeViewer.addEventListener("click", () => {

            viewer.classList.remove("show");

        });

    }


    if (viewer) {

        viewer.addEventListener("click", event => {

            if (
                event.target === viewer
            ) {

                viewer.classList.remove("show");

            }

        });

    }


    /* =====================================================
       TO MESSAGE ROOM
    ===================================================== */

    if (continueGallery) {

        continueGallery.addEventListener("click", () => {

            showScene("messageRoom");

        });

    }


    /* =====================================================
       MESSAGE → CINEMA
    ===================================================== */

    const toCinema =
        document.getElementById("toCinema");


    if (toCinema) {

        toCinema.addEventListener("click", () => {

            showScene("cinema");

        });

    }


    /* =====================================================
       VIDEO
    ===================================================== */

    const mainVideo =
        document.getElementById("mainVideo");


    if (mainVideo) {

        mainVideo.addEventListener(
            "error",
            () => {

                console.error(
                    "birthday.mp4 could not be loaded."
                );

            }
        );

    }


    /* =====================================================
       FINISH
    ===================================================== */

    const finishButton =
        document.getElementById(
            "finishButton"
        );


    if (finishButton) {

        finishButton.addEventListener("click", () => {

            showScene("finale");

            createFinaleParticles();

        });

    }


    /* =====================================================
       FINALE PARTICLES
    ===================================================== */

    function createFinaleParticles() {

        const container =
            document.getElementById(
                "finalParticles"
            );


        if (!container) return;


        const symbols = [
            "✦",
            "✧",
            "⋆",
            "♥"
        ];


        for (let i = 0; i < 35; i++) {

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


    const style =
        document.createElement("style");


    style.textContent = `

        @keyframes rise {

            from {
                transform:
                    translateY(0)
                    rotate(0deg);

                opacity: 0;
            }

            12% {
                opacity: 1;
            }

            to {
                transform:
                    translateY(-120vh)
                    rotate(35deg);

                opacity: 0;
            }

        }

    `;


    document.head.appendChild(style);


    /* =====================================================
       RESTART
    ===================================================== */

    const restart =
        document.getElementById(
            "restart"
        );


    if (restart) {

        restart.addEventListener("click", () => {

            location.reload();

        });

    }

});
```
