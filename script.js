// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.querySelector("#menu-btn");
const navLinks = document.querySelector("#nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });
}


// ===============================
// DARK / LIGHT MODE
// ===============================

const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀️";
    }
}


// ===============================
// SCROLL ANIMATION
// ===============================

const animatedElements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

animatedElements.forEach(function (element) {
    observer.observe(element);
});


// ===============================
// PROJECT FILTER
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        projects.forEach(function (project) {
            const category = project.dataset.category;

            if (filter === "all" || category === filter) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    });
});


// ===============================
// CURRENT YEAR
// ===============================

const year = document.querySelector("#year");
if (year) {
    year.textContent = new Date().getFullYear();
}


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.querySelector("#name");
        const emailInput = document.querySelector("#email");
        const messageInput = document.querySelector("#message");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
            }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email address.");
            return;
            }
            if (message.length < 10) {
               alert("Please enter at least 10 characters in your message.");
               return;
            }
        const submitButton = document.querySelector("#contact-form button");
             submitButton.textContent = "Sending...";
             submitButton.disabled = true;
        fetch("https://portfolio-backend-5k0t.onrender.com/contact", {
             method: "POST",
             headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
        .then(function (response) {
            return response.json();
            })
        .then(function (data) {
           formMessage.textContent = data.message;
           contactForm.reset();
           submitButton.textContent = "Send";
           submitButton.disabled = false;
           })
        .catch(function (error) {
           console.error(error);
           alert("Something went wrong. Please try again.");
           submitButton.textContent = "Send";
           submitButton.disabled = false;
        });
    });
}
