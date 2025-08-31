// // === Home Page Logic ===
// document.addEventListener('DOMContentLoaded', function () {
//     // Check if we're on the home page
//     if (document.querySelector('.home-page-wrapper')) {
//         // Mobile Navigation Toggle
//         const mobileNavToggle = document.getElementById('mobileNavToggle');
//         const mobileNavOverlay = document.getElementById('mobileNavOverlay');
//         const closeMobileNav = document.getElementById('closeMobileNav');
//         const mobileLoginIcon = document.getElementById('mobileLoginIcon');

//         if (mobileNavToggle && mobileNavOverlay) {
//             mobileNavToggle.addEventListener('click', function () {
//                 mobileNavOverlay.style.width = '100%';
//             });
//         }

//         if (closeMobileNav) {
//             closeMobileNav.addEventListener('click', function () {
//                 mobileNavOverlay.style.width = '0';
//             });
//         }


//         // Desktop Login Button
//         const loginButton = document.getElementById('loginButton');
//         if (loginButton) {
//             loginButton.addEventListener('click', function () {
//                 window.location.href = '../entry/login.html';
//             });
//         }

//         // === Animated Photo Automatic Transition ===
//         // const animatedPhoto = document.getElementById('animated-photo');
//         // if (animatedPhoto) {
//         //     const imageFrames = [
//         //         'Property 1=Default (1).png', // First image
//         //         'Property 1=Variant2 (2).png'  // Second image
//         //     ];

//         //     // Set the initial image to the first one
//         //     animatedPhoto.src = imageFrames[0];

//         //     // After 2 seconds, transition to the second image
//         //     setTimeout(() => {
//         //         animatedPhoto.src = imageFrames[1];
//         //     }, 250); // 2000 milliseconds = 2 seconds
//         // }

//         const animatedPhoto = document.getElementById('animated-photo');
//         if (animatedPhoto) {
//             const imageFrames = [
//                 'Property 1=Default (1).png', // First image
//                 'Property 1=Variant2 (2).png'  // Second image
//             ];

//             // Function to get full static path for images
//             function getImagePath(filename) {
//                 // Use Django's static URL if available, otherwise fallback to relative path
//                 if (typeof window.STATIC_URL !== 'undefined') {
//                     return window.STATIC_URL + 'img/pages/' + filename;
//                 }
//                 return '/static/img/pages/' + filename;
//             }

//             // Convert image frames to full paths
//             const fullImagePaths = imageFrames.map(getImagePath);

//             // Set the initial image to the first one
//             animatedPhoto.src = fullImagePaths[0];

//             // After 250 milliseconds, transition to the second image
//             setTimeout(() => {
//                 animatedPhoto.src = fullImagePaths[1];
//             }, 250); // 250 milliseconds = 0.25 seconds
//         }

//         // Header background change on scroll
//         window.addEventListener('scroll', function () {
//             const header = document.querySelector('header');
//             if (header) {
//                 if (window.scrollY > 50) {
//                     header.style.backgroundColor = 'rgba(13, 13, 13, 0.9)';
//                 } else {
//                     header.style.backgroundColor = 'transparent';
//                 }
//             }
//         });
//     }

//     const watchJourneyBtn = document.getElementById('watchJourneyBtn');
//     const videoModal = document.getElementById('videoModal');
//     const closeVideoBtn = document.getElementById('closeVideoBtn');
//     const journeyVideo = document.getElementById('journeyVideo');

//     if (watchJourneyBtn && videoModal) {
//         watchJourneyBtn.addEventListener('click', function () {
//             videoModal.style.display = 'flex';
//             journeyVideo.play();
//         });

//         closeVideoBtn.addEventListener('click', function () {
//             videoModal.style.display = 'none';
//             journeyVideo.pause();
//             journeyVideo.currentTime = 0;
//         });

//         window.addEventListener('click', function (event) {
//             if (event.target === videoModal) {
//                 videoModal.style.display = 'none';
//                 journeyVideo.pause();
//                 journeyVideo.currentTime = 0;
//             }
//         });

//         journeyVideo.addEventListener('ended', function () {
//             videoModal.style.display = 'none';
//             journeyVideo.pause();
//             journeyVideo.currentTime = 0;
//         });
//     }

//     document.addEventListener('DOMContentLoaded', function () {
//         // Function to show a custom message modal (reused from other pages)
//         function showMessageModal(message, isError = false) {
//             const modal = document.getElementById('messageModal');
//             const modalMessage = document.getElementById('modalMessage');
//             const modalCloseBtn = document.getElementById('modalCloseBtn');

//             if (modal && modalMessage && modalCloseBtn) {
//                 modalMessage.textContent = message;
//                 if (isError) {
//                     modalMessage.style.color = '#FF4444'; // Red for errors
//                 } else {
//                     modalMessage.style.color = '#91CC1F'; // Green for success/info
//                 }
//                 modal.classList.add('show-modal');

//                 modalCloseBtn.onclick = function () {
//                     modal.classList.remove('show-modal');
//                 };

//                 window.onclick = function (event) {
//                     if (event.target == modal) {
//                         modal.classList.remove('show-modal');
//                     }
//                 };
//             }
//         }

//         // === Contact Form Submission ===
//         const contactForm = document.getElementById('contactForm');
//         if (contactForm) {
//             contactForm.addEventListener('submit', function (event) {
//                 event.preventDefault(); // Prevent default form submission

//                 // Get form field values
//                 const fullName = document.getElementById('fullName').value.trim();
//                 const email = document.getElementById('email').value.trim();
//                 const phoneNumber = document.getElementById('phoneNumber').value.trim();
//                 const message = document.getElementById('message').value.trim();

//                 // Basic client-side validation
//                 if (!fullName || !email || !phoneNumber || !message) {
//                     showMessageModal("Please fill in all required fields.", true);
//                     return;
//                 }

//                 // Simple email format validation
//                 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (!emailPattern.test(email)) {
//                     showMessageModal("Please enter a valid email address.", true);
//                     return;
//                 }

//                 // You would typically send this data to your backend server here.
//                 // For demonstration, we simulate success and log the data.
//                 console.log("Contact Form Submission:", { fullName, email, phoneNumber, message });

//                 showMessageModal("Your message has been sent successfully!", false);

//                 // Clear the form fields after successful submission
//                 contactForm.reset();
//             });
//         }
//     });
// });

// === Home Page Logic ===
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the home page
    if (document.querySelector('.home-page-wrapper')) {
        // Mobile Navigation Toggle
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

        // Desktop Login Button
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', function () {
                window.location.href = '../entry/login.html';
            });
        }

        // === Animated Photo Automatic Transition ===
        const animatedPhoto = document.getElementById('animated-photo');
        if (animatedPhoto) {
            const imageFrames = [
                'Property 1=Default (1).png', // First image
                'Property 1=Variant2 (2).png'  // Second image
            ];

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

            // Set the initial image to the first one
            animatedPhoto.src = fullImagePaths[0];

            // After 250 milliseconds, transition to the second image
            setTimeout(() => {
                animatedPhoto.src = fullImagePaths[1];
            }, 250); // 250 milliseconds = 0.25 seconds
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
    }

    // Video Modal Logic
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

        journeyVideo.addEventListener('ended', function () {
            videoModal.style.display = 'none';
            journeyVideo.pause();
            journeyVideo.currentTime = 0;
        });
    }

    // Function to show a custom message modal
    function showMessageModal(message, isError = false) {
        const modal = document.getElementById('messageModal');
        const modalMessage = document.getElementById('modalMessage');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        if (modal && modalMessage && modalCloseBtn) {
            modalMessage.textContent = message;
            if (isError) {
                modalMessage.style.color = '#FF4444'; // Red for errors
            } else {
                modalMessage.style.color = '#91CC1F'; // Green for success/info
            }
            modal.classList.add('show-modal');

            modalCloseBtn.onclick = function () {
                modal.classList.remove('show-modal');
            };

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.classList.remove('show-modal');
                }
            };
        }
    }

    // === Contact Form Submission ===
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function (event) {
    //         event.preventDefault(); // Prevent default form submission

    //         // Get form field values
    //         const fullName = document.getElementById('fullName').value.trim();
    //         const email = document.getElementById('email').value.trim();
    //         const phoneNumber = document.getElementById('phoneNumber').value.trim();
    //         const message = document.getElementById('message').value.trim();

    //         // Basic client-side validation
    //         if (!fullName || !email || !phoneNumber || !message) {
    //             showMessageModal("Please fill in all required fields.", true);
    //             return;
    //         }

    //         // Simple email format validation
    //         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //         if (!emailPattern.test(email)) {
    //             showMessageModal("Please enter a valid email address.", true);
    //             return;
    //         }

    //         // Get CSRF token
    //         function getCookie(name) {
    //             let cookieValue = null;
    //             if (document.cookie && document.cookie !== '') {
    //                 const cookies = document.cookie.split(';');
    //                 for (let i = 0; i < cookies.length; i++) {
    //                     const cookie = cookies[i].trim();
    //                     if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                         break;
    //                     }
    //                 }
    //             }
    //             return cookieValue;
    //         }

    //         // Send data to Django backend
    //         fetch(window.location.href, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'X-CSRFToken': getCookie('csrftoken')
    //             },
    //             body: JSON.stringify({
    //                 fullName: fullName,
    //                 email: email,
    //                 phoneNumber: phoneNumber,
    //                 message: message
    //             })
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 showMessageModal(data.message, false);
    //                 contactForm.reset(); // Clear form on success
    //             } else {
    //                 showMessageModal(data.message, true);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             showMessageModal("Sorry, there was an error sending your message. Please try again.", true);
    //         });
    //     });
    // }

    // Replace the contact form submission handler with this improved version:
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form field values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic client-side validation
            if (!fullName || !email || !phoneNumber || !message) {
                showMessageModal("Please fill in all required fields.", true);
                return;
            }

            // Simple email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showMessageModal("Please enter a valid email address.", true);
                return;
            }

            // === IMMEDIATE USER FEEDBACK ===
            // Show loading state immediately
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Show loading modal immediately
            showMessageModal("Sending your message...", false);

            // Get CSRF token
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

            // Send data to Django backend
            fetch(window.location.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    phoneNumber: phoneNumber,
                    message: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    // Restore button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;

                    if (data.success) {
                        showMessageModal(data.message, false);
                        contactForm.reset();
                    } else {
                        showMessageModal(data.message, true);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Restore button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    showMessageModal("Sorry, there was an error sending your message. Please try again.", true);
                });
        });
    }
});