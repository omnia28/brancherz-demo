window.addEventListener('DOMContentLoaded', () => {
    const layoutAnimationVideo = document.getElementById('layout-animation-video');
    const layoutVideoSource = document.getElementById('layout-video-source');
    const layoutPageBody = document.querySelector('.layout-page');

    const shellBreakSound = new Audio('https://freesound.org/data/previews/321/321151_5482392-lq.mp3');
    shellBreakSound.volume = 0.7;

    let clickCount = 0;
    let isPlaying = false;
    let targetTime = null;
    let allowPause = true;

    function getSelectedVideo() {
        return window.matchMedia("(max-width: 768px)").matches
            ? 'cracked_mobile2.mp4'
            : 'cracked_desktop.mp4';
    }

    function updateVideoSourceIfNeeded() {
        const currentSrc = layoutVideoSource.src.split('/').pop();
        const newSrc = getSelectedVideo();

        if (currentSrc !== newSrc) {
            layoutVideoSource.src = newSrc;
            layoutAnimationVideo.load();
            console.log("Changed video source to:", newSrc);
        }
    }

    if (layoutPageBody && layoutAnimationVideo && layoutVideoSource) {
        layoutAnimationVideo.style.display = 'block';

        layoutVideoSource.src = getSelectedVideo();
        layoutAnimationVideo.load();

        layoutAnimationVideo.muted = true;
        targetTime = 0.80;
        allowPause = true;
        isPlaying = true;
        layoutAnimationVideo.play().catch(err => console.warn("Initial autoplay error:", err));

        window.addEventListener('resize', () => {
            updateVideoSourceIfNeeded();
        });

        layoutAnimationVideo.addEventListener('timeupdate', () => {
            if (allowPause && isPlaying && targetTime !== null && layoutAnimationVideo.currentTime >= targetTime) {
                layoutAnimationVideo.pause();
                isPlaying = false;
                console.log(`⏸ Paused at ${layoutAnimationVideo.currentTime.toFixed(2)}s`);

                layoutAnimationVideo.muted = false;
            }
        });

        const handleClick = (e) => {
            e.preventDefault();

            shellBreakSound.currentTime = 0;
            shellBreakSound.play().catch(err => console.error("Sound error:", err));

            clickCount++;

            if (clickCount === 1) {
                targetTime = 1.80;
                allowPause = true;
            } else if (clickCount === 2) {
                targetTime = 2.80;
                allowPause = true;
            } else if (clickCount === 3) {
                targetTime = null;
                allowPause = false;
                layoutAnimationVideo.onended = () => {
                    window.location.href = 'home.html';
                };
            } else {
                return;
            }

            isPlaying = true;
            layoutAnimationVideo.play().catch(err => console.warn("Playback error:", err));
        };

        layoutPageBody.addEventListener('click', handleClick);
        layoutPageBody.addEventListener('touchend', handleClick);
    }
});





// === Home Page Logic ===
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.home-page-wrapper')) {
        const mobileNavToggle = document.getElementById('mobileNavToggle');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const closeMobileNav = document.getElementById('closeMobileNav');
        const mobileLoginIcon = document.getElementById('mobileLoginIcon');

        if (mobileNavToggle && mobileNavOverlay) {
            mobileNavToggle.addEventListener('click', function () {
                mobileNavOverlay.style.width = '100%';
            });
        }

        if (closeMobileNav) {
            closeMobileNav.addEventListener('click', function () {
                mobileNavOverlay.style.width = '0';
            });
        }

        if (mobileLoginIcon) {
            mobileLoginIcon.addEventListener('click', function () {
                window.location.href = "{% url 'login' %}";
            });
        }

        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', function () {
                window.location.href = "{% url 'login' %}";
            });
        }


        const animatedPhoto = document.getElementById('animated-photo');
        const section1 = document.getElementById('section1');
        const section2 = document.getElementById('section2');

        if (animatedPhoto && section1 && section2) {
            // Image frames - will be replaced by Django template
            const imageFrames = [
                'f1.svg', 'f2.svg', 'f3.svg', 'f4.svg', 'f5.svg', 'f6.svg', 'f7.svg', 'f8.svg',
                'f9.svg', 'f10.svg', 'f11.svg', 'f12.svg', 'f13.svg', 'f14.svg', 'f15.svg', 'f16.svg'
            ];

            let currentFrameIndex = -1;

            // Function to get full static path for images
            function getImagePath(filename) {
                // Use Django's static URL if available, otherwise fallback to relative path
                if (typeof window.STATIC_URL !== 'undefined') {
                    return window.STATIC_URL + 'img/pages/' + filename;
                }
                return '/static/img/pages/' + filename;
            }

            // Convert image frames to full paths
            const fullImagePaths = imageFrames.map(getImagePath);

            // --- Preloading Images for Smoothness ---
            function preloadAllAnimationImages() {
                const preloadPromises = fullImagePaths.map(src => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => resolve();
                        img.onerror = () => {
                            console.warn(`Failed to preload image: ${src}`);
                            reject(new Error(`Failed to preload ${src}`));
                        };
                    });
                });

                Promise.allSettled(preloadPromises).then(results => {
                    console.log('All scroll animation images attempted to preload.');
                });
            }

            function updateAnimationFrame() {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;

                let animationStartPoint;
                let totalAnimationScrollRange;

                if (window.innerWidth <= 768) {
                    const rightDivElement = document.querySelector('.right-div-logos');
                    if (rightDivElement) {
                        animationStartPoint = rightDivElement.offsetTop;
                    } else {
                        console.warn('right-div not found, using fallback offset');
                        animationStartPoint = 400;
                    }
                    totalAnimationScrollRange = windowHeight * 0.5;
                } else {
                    animationStartPoint = 0;
                    totalAnimationScrollRange = windowHeight * 0.5;
                }

                if (totalAnimationScrollRange <= 0 || isNaN(totalAnimationScrollRange)) {
                    console.warn("Calculated animation scroll range is non-positive or NaN. Setting to 0.5 * windowHeight as fallback.");
                    totalAnimationScrollRange = windowHeight * 0.25;
                }

                const animationEndPoint = animationStartPoint + totalAnimationScrollRange;

                let scrollProgress = 0;
                if (scrollPosition >= animationStartPoint && scrollPosition <= animationEndPoint) {
                    scrollProgress = (scrollPosition - animationStartPoint) / totalAnimationScrollRange;
                } else if (scrollPosition > animationEndPoint) {
                    scrollProgress = 1;
                }
                scrollProgress = Math.max(0, Math.min(1, scrollProgress));

                const frameIndex = Math.floor(scrollProgress * (fullImagePaths.length - 1));
                const clampedFrameIndex = Math.max(0, Math.min(fullImagePaths.length - 1, frameIndex));

                if (clampedFrameIndex !== currentFrameIndex) {
                    currentFrameIndex = clampedFrameIndex;
                    animatedPhoto.src = fullImagePaths[currentFrameIndex];
                }
            }

            preloadAllAnimationImages();

            // Set initial image
            animatedPhoto.src = fullImagePaths[0];
            currentFrameIndex = 0;

            window.addEventListener('scroll', () => {
                requestAnimationFrame(updateAnimationFrame);
            });

            updateAnimationFrame();

            window.addEventListener('resize', () => {
                requestAnimationFrame(updateAnimationFrame);
            });
        }

        const section3 = document.getElementById('section3');

        const ellipseSequence = [
            "green", "green", "green",
            "orange", "orange",
            "orange", "green",
        ];

        const contentFrames = [
            "Scroll<br>Down",
            "Brand Identity<br>& Strategy",
            "Creatives &<br>Multimedia",
            "3D<br>Modeling",
            "Digital Marketing &<br> E-Commerce",
            "Medico-Marketing<br>Content",
            "Business Growth &<br>Training",
        ];

        const ellipseEl = document.querySelector('.ellipse');
        const contentEl = document.querySelector('.content-layer');
        const nest = document.querySelector('.base-nest');

        const gradients = [
            'radial-gradient(50% 50% at 50% 50%, rgba(145, 204, 31, 0.75) 0%, rgba(53, 30, 16, 0) 100%)',
            'radial-gradient(50% 50% at 50% 50%, rgba(145, 204, 31, 0.75) 0%, rgba(53, 30, 16, 0) 100%)',
            'radial-gradient(50% 50% at 50% 50%, rgba(112, 154, 32, 0.75) 0%, rgba(53, 30, 16, 0) 100%)',
            'radial-gradient(50% 50% at 50% 50%, rgba(245, 127, 32, 0.75) 0%, rgba(53, 30, 16, 0) 100%)',
            'radial-gradient(50% 50% at 50% 50%, rgba(255, 166, 95, 0.75) 0%, rgba(53, 30, 16, 0) 100%)',
            'radial-gradient(50% 50% at 50% 50%, rgba(246, 183, 133, 0.75) 0%, rgba(53, 30, 16, 0) 100%)',
            'radial-gradient(50% 50% at 50% 50%, rgba(168, 255, 0, 0.75) 0%, rgba(53, 30, 16, 0) 100%)',
        ];

        let currentFrameIndex = -1;
        let currentRotation = 0;
        const rotationStep = 5;

        const scrollPerFrame = window.innerHeight * 0.5;
        const totalScrollHeight = ellipseSequence.length * scrollPerFrame;

        if (section2) {
            if (window.innerWidth <= 768) {
                section2.style.minHeight = `${totalScrollHeight * 1.2 + window.innerHeight}px`;
            } else {
                section2.style.minHeight = `${totalScrollHeight + window.innerHeight}px`;
            }
        }

        function updateFrame() {
            if (!section2 || !section3) return;

            const scrollY = window.scrollY - section2.offsetTop;
            const progress = Math.max(0, Math.min(1, scrollY / totalScrollHeight));
            const frameIndex = Math.floor(progress * (ellipseSequence.length - 1));

            if (frameIndex !== currentFrameIndex) {
                const direction = frameIndex > currentFrameIndex ? 1 : -1;
                currentRotation += direction * rotationStep;

                if (nest) {
                    nest.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
                }

                // Update gradient
                ellipseEl.style.background = gradients[frameIndex];

                // Update text
                if (contentEl) {
                    contentEl.innerHTML = contentFrames[frameIndex];
                }

                currentFrameIndex = frameIndex;
            }
        }

        if (ellipseEl && contentEl && section2 && section3) {
            ellipseEl.style.transition = "background 0.5s ease-in-out";
            window.addEventListener('scroll', () => {
                requestAnimationFrame(updateFrame);
            });
            updateFrame();
        }


        // Video Modal
        const watchJourneyBtn = document.getElementById('watchJourneyBtn');
        const videoModal = document.getElementById('videoModal');
        const closeVideoBtn = document.getElementById('closeVideoBtn');
        const journeyVideo = document.getElementById('journeyVideo');

        if (watchJourneyBtn && videoModal) {
            watchJourneyBtn.addEventListener('click', function () {
                videoModal.style.display = 'flex';
                journeyVideo.play();
            });

            closeVideoBtn.addEventListener('click', function () {
                videoModal.style.display = 'none';
                journeyVideo.pause();
                journeyVideo.currentTime = 0;
            });

            window.addEventListener('click', function (event) {
                if (event.target === videoModal) {
                    videoModal.style.display = 'none';
                    journeyVideo.pause();
                    journeyVideo.currentTime = 0;
                }
            });

            function closeVideoModal() {
                videoModal.style.display = 'none';
                journeyVideo.pause();
                journeyVideo.currentTime = 0;
            }

            journeyVideo.addEventListener('ended', closeVideoModal);

            document.addEventListener('webkitendfullscreen', closeVideoModal);
        }


        // Header background change on scroll
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(13, 13, 13, 0.9)';
                } else {
                    header.style.backgroundColor = 'transparent';
                }
            }
        });


        document.getElementById('downloadPortfolioBtn').addEventListener('click', function (e) {
            e.preventDefault();

            const email = document.getElementById('emailInput').value.trim();
            const phone = document.getElementById('phoneInput').value.trim();
            const agreeCheckbox = document.getElementById('agreeCheckbox').checked;

            // Basic validation
            if (!email) {
                alert('Please enter your email');
                return;
            }

            if (!phone) {
                alert('Please enter your phone number');
                return;
            }

            // if (!agreeCheckbox) {
            //     alert('Please agree to receive marketing communications');
            //     return;
            // }

            // Submit form data
            fetch('/submit-portfolio-form/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')  // You'll need to get CSRF token
                },
                body: JSON.stringify({
                    email: email,
                    phone: phone,
                    agree_to_marketing: agreeCheckbox
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        // Trigger download
                        if (data.download_url) {
                            window.location.href = data.download_url;
                        }
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
        });

        // Function to get CSRF token
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
});

