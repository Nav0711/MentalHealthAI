// Modal functionality
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const getStartedBtn = document.getElementById("getStartedBtn");
const closeBtn = document.getElementsByClassName("close")[0];

// Open modal when clicking Login button
loginBtn.onclick = function() {
    modal.style.display = "flex";
}

// Open modal when clicking Get Started button
getStartedBtn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "flex";
}

// Close modal when clicking X
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if(this.getAttribute('href') === '#') return;
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});