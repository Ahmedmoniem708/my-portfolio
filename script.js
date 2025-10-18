// --- Navigation Menu Toggle ---
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// --- Active Link Highlighting on Scroll ---
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

     menuIcon.classList.remove('bx-x');
     navbar.classList.remove('active');
};

// --- Typing Effect ---
const typedTextSpan = document.getElementById('typed-text');
const textToType = "AI & ML Engineer";
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetween = 2000;
let charIndex = 0;

function type() {
    if (charIndex < textToType.length) {
        typedTextSpan.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetween);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textToType.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        setTimeout(type, typingSpeed + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    if(typedTextSpan) {
        setTimeout(type, 250);
    }
});

// --- Skills Animation on Scroll ---
const skillsSection = document.querySelector('#skills');
let animationStarted = false;

const animateSkills = () => {
    if(animationStarted) return;
    animationStarted = true;

    // Animate horizontal bars
    const skillBars = document.querySelectorAll('.technical-skills .progress .bar span');
    skillBars.forEach(bar => {
        const barWidth = bar.getAttribute('data-width');
        bar.style.width = barWidth;
    });

    // Animate circular progress bars
    const circularProgresses = document.querySelectorAll('.circular-progress');
    circularProgresses.forEach(progress => {
        let progressValue = progress.querySelector('.progress-value');
        let startValue = 0;
        let endValue = parseInt(progress.getAttribute('data-value'));
        let speed = 20;

        let progressInterval = setInterval(() => {
            startValue++;
            progressValue.textContent = `${startValue}%`;
            progress.style.background = `conic-gradient(var(--main-color) ${startValue * 3.6}deg, var(--second-bg-color) 0deg)`;

            if (startValue == endValue) {
                clearInterval(progressInterval);
            }
        }, speed);
    });
};

const resetSkills = () => {
    if(!animationStarted) return;
    animationStarted = false;
    // Reset horizontal bars
    const skillBars = document.querySelectorAll('.technical-skills .progress .bar span');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });

    // Reset circular progress bars
    const circularProgresses = document.querySelectorAll('.circular-progress');
    circularProgresses.forEach(progress => {
        let progressValue = progress.querySelector('.progress-value');
        progressValue.textContent = '0%';
        progress.style.background = `var(--second-bg-color)`;
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        } else {
            // Optional: reset animation when scrolling away
            // resetSkills(); 
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

if (skillsSection) {
    observer.observe(skillsSection);
}
