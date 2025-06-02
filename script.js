document.addEventListener('DOMContentLoaded', () => {
    const SENDER_NAME_ENGLISH = "ANUPAM TOPPO"; // Default sender name
    const SENDER_NAME_HINDI = "अनूपम टोप्पो";   // Default sender name in Hindi

    // Set User Names (can be customized if needed, e.g., via URL params for advanced use)
    document.getElementById('headerUserName').textContent = SENDER_NAME_ENGLISH;
    document.getElementById('subheadingUserName').textContent = SENDER_NAME_HINDI;
    document.getElementById('signatureUserName').textContent = SENDER_NAME_HINDI;
    document.getElementById('modalSenderName').textContent = SENDER_NAME_HINDI;


    // Auto Date
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    // For Hindi date:
    // dateElement.textContent = today.toLocaleDateString('hi-IN-u-nu-deva', options); // Using Devanagari numerals
    dateElement.textContent = today.toLocaleDateString('hi-IN', options); // Using standard numerals but Hindi month names


    // Background Music
    const music = document.getElementById('eidMusic');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    let isMusicPlaying = false;

    // Autoplay attempt (browsers often block this, user interaction is preferred)
    music.play().then(() => {
        isMusicPlaying = true;
        musicToggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(error => {
        console.log("Autoplay was prevented. User interaction needed.");
        // Keep button as play, user needs to click
        isMusicPlaying = false;
        musicToggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    musicToggleBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggleBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            music.play();
            musicToggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Share Functionality
    const shareButton = document.getElementById('shareButton');
    const shareModal = document.getElementById('shareModal');
    const closeModalButton = document.querySelector('.modal .close-button');
    const recipientNameInput = document.getElementById('recipientName');
    const confirmShareButton = document.getElementById('confirmShareButton');

    shareButton.addEventListener('click', () => {
        shareModal.style.display = 'block';
        recipientNameInput.value = ''; // Clear previous input
        recipientNameInput.focus();
    });

    closeModalButton.addEventListener('click', () => {
        shareModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });

    confirmShareButton.addEventListener('click', () => {
        const recipientName = recipientNameInput.value.trim();
        const pageTitle = document.title;
        const pageUrl = window.location.href;
        
        let shareText = `🌙 ईद मुबारक! ${SENDER_NAME_HINDI} की तरफ से। ${pageUrl}`;
        if (recipientName) {
            shareText = `नमस्ते ${recipientName}, आपको ${SENDER_NAME_HINDI} की तरफ से ईद उल अजहा की बहुत बहुत शुभकामनाएँ! 🌙 चेक करें: ${pageUrl}`;
        } else {
             shareText = `आपको ${SENDER_NAME_HINDI} की तरफ से ईद उल अजहा की बहुत बहुत शुभकामनाएँ! 🌙 चेक करें: ${pageUrl}`;
        }

        if (navigator.share) {
            navigator.share({
                title: `Eid Greetings from ${SENDER_NAME_ENGLISH}`,
                text: shareText,
                url: pageUrl,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            // Try to open WhatsApp or provide a general copyable link
            const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
            const mailtoUrl = `mailto:?subject=Eid Greetings from ${SENDER_NAME_ENGLISH}&body=${encodeURIComponent(shareText)}`;

            // Attempt to open WhatsApp, then offer copy or mailto
            // This is a simplified fallback. A more robust one might show options.
            if (confirm("Web Share API not supported. Try opening WhatsApp?")) {
                window.open(whatsappUrl, '_blank');
            } else {
                prompt("Copy this link to share:", pageUrl + ` (Message for ${recipientName || 'your friend'}: ${shareText})`);
            }
        }
        shareModal.style.display = 'none';
    });
});