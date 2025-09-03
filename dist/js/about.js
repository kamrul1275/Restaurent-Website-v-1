// Loader

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");

  setTimeout(function () {
    loader.classList.add("fade-out");

    setTimeout(function () {
      mainContent.classList.add("show");
    }, 500); 
  }, 3000); 
});

document.addEventListener("mousemove", function (e) {
  const sparkles = document.querySelectorAll(".sparkle");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  sparkles.forEach((sparkle, index) => {
    const delay = index * 0.1;
    setTimeout(() => {
      sparkle.style.transform = `scale(${1 + mouseX * 0.5})`;
      sparkle.style.filter = `brightness(${1 + mouseY * 0.5})`;
    }, delay * 1000);
  });
});

document.addEventListener("mouseleave", function () {
  const sparkles = document.querySelectorAll(".sparkle");
  sparkles.forEach((sparkle) => {
    sparkle.style.transform = "scale(1)";
    sparkle.style.filter = "brightness(1)";
  });
});

(function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const minShow = parseInt(loader.getAttribute("data-min") || "300", 10); // ms
  const start = performance.now();

  function hide() {
    const elapsed = performance.now() - start;
    const delay = Math.max(0, minShow - elapsed);
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 550);
    }, delay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hide, { once: true });
  } else {
    hide();
  }

  setTimeout(() => {
    if (document.body.contains(loader)) hide();
  }, 3000);
})();



//Navbar

document.getElementById("mobile-menu").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
});

//Active link

let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "" || currentPage === "/") {
  currentPage = "index.html"; // fallback
}

// Select all nav links
const navLinks = document.querySelectorAll(".nav-links li a");

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Spin text

function createSpinningText() {
  const text = "FRESH CUISINE • AUTHENTIC TASTE • ";
  const spinningTextEl = document.getElementById("spinningText");

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    span.style.transform = `rotate(${(360 / text.length) * i}deg)`;
    spinningTextEl.appendChild(span);
  }
}

// Initialize spinning text when page loads
document.addEventListener("DOMContentLoaded", createSpinningText);

//About slider

let circle = document.querySelector(".circle");
let slider = document.querySelector(".slider");
let list = document.querySelector(".list");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let items = document.querySelectorAll(".list .item");
let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

next.onclick = () => {
  active = active >= count - 1 ? count - 1 : active + 1;
  runCarousel();
};
prev.onclick = () => {
  active = active <= 0 ? active : active - 1;
  runCarousel();
};
function runCarousel() {
  prev.style.display = active == 0 ? "none" : "block";
  next.style.display = active == count - 1 ? "none" : "block";

  let old_active = document.querySelector(".item.active");
  if (old_active) old_active.classList.remove("active");
  items[active].classList.add("active");

  leftTransform = width_item * (active - 1) * -1;
  list.style.transform = `translateX(${leftTransform}px)`;
}
runCarousel();

// Set Text on a Circle
let textCircle = circle.innerText.split("");
circle.innerText = "";
textCircle.forEach((value, key) => {
  let newSpan = document.createElement("span");
  newSpan.innerText = value;
  let rotateThisSpan = (360 / textCircle.length) * (key + 1);
  newSpan.style.setProperty("--rotate", rotateThisSpan + "deg");
  circle.appendChild(newSpan);
});

