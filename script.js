const searchInput = document.getElementById("searchInput");
const postCards = document.querySelectorAll(".post-card-wrapper");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function() {
    let query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    postCards.forEach(card => {
        let title = card.getAttribute("data-title");
        if (title.includes(query)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleCount === 0) {
        noResults.classList.remove("d-none");
    } else {
        noResults.classList.add("d-none");
    }
});

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {
    let countSpan = button.querySelector(".like-count");
    let count = 0;
    let isLiked = false;

    button.addEventListener("click", function() {
        if (!isLiked) {
            count++;
            isLiked = true;
            button.classList.remove("btn-outline-danger");
            button.classList.add("btn-danger");
        } else {
            count--;
            isLiked = false;
            button.classList.remove("btn-danger");
            button.classList.add("btn-outline-danger");
        }
        countSpan.textContent = count;
    });
});

const readMoreButtons = document.querySelectorAll(".read-more-btn");

readMoreButtons.forEach(button => {
    button.addEventListener("click", function() {
        let cardBody = button.closest(".card-body");
        let extraContent = cardBody.querySelector(".extra-content");

        extraContent.classList.toggle("d-none");

        if (extraContent.classList.contains("d-none")) {
            button.textContent = "Читати далі";
        } else {
            button.textContent = "Згорнути";
        }
    });
});

const contactForm = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userMessage = document.getElementById("userMessage");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let nameVal = userName.value.trim();
    let emailVal = userEmail.value.trim();
    let msgVal = userMessage.value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formAlert.classList.remove("d-none");

    if (nameVal.length < 2) {
        formAlert.className = "alert alert-danger";
        formAlert.textContent = "Помилка: Ім'я повинно містити щонайменше 2 символи!";
        return;
    }

    if (!emailPattern.test(emailVal)) {
        formAlert.className = "alert alert-danger";
        formAlert.textContent = "Помилка: Введіть коректну електронну пошту!";
        return;
    }

    if (msgVal.length < 10) {
        formAlert.className = "alert alert-danger";
        formAlert.textContent = "Помилка: Повідомлення повинно містити щонайменше 10 символів!";
        return;
    }

    formAlert.className = "alert alert-success";
    formAlert.textContent = "Ваше повідомлення успішно перевірено!";
    contactForm.reset();
});

const themeToggleBtn = document.getElementById("themeToggleBtn");
const body = document.body;

if (localStorage.getItem("blog-theme") === "dark") {
    body.classList.add("dark-theme");
    themeToggleBtn.textContent = "☀️ Світла тема";
}

themeToggleBtn.addEventListener("click", function() {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
        localStorage.setItem("blog-theme", "dark");
        themeToggleBtn.textContent = "☀️ Світла тема";
    } else {
        localStorage.setItem("blog-theme", "light");
        themeToggleBtn.textContent = "🌙 Темна тема";
    }
});