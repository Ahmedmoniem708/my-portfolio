// Functionality for smooth scrolling and navigation link highlighting
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Adjust for header height
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Check if the current scroll position is within the section bounds
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                // Remove 'active' class from all links
                links.classList.remove('active');
                // Add 'active' class to the corresponding link
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Toggle sticky header (optional style adjustment)
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100); 
};


// === Typing Effect JavaScript Logic (The movement you requested) ===
const typedTextSpan = document.getElementById('typed-text');
const textToType = "AI & ML Engineer"; // The text to be typed out
const typingSpeed = 100; // Speed in milliseconds per character

let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        // Add one character at a time
        typedTextSpan.textContent += textToType.charAt(charIndex);
        charIndex++;
        // Repeat the function after the defined speed
        setTimeout(typeText, typingSpeed);
    }
}

// Start the typing animation once the page is fully loaded
window.onload = function() {
    typeText();
};
