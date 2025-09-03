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
  currentPage = "index.html"; 
}

const navLinks = document.querySelectorAll(".nav-links li a");

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Animate stats on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        const finalNumber = stat.textContent.replace(/\D/g, "");
        const suffix = stat.textContent.replace(/\d/g, "");
        let currentNumber = 0;
        const increment = Math.ceil(finalNumber / 100);

        const timer = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
          }
          stat.textContent = currentNumber + suffix;
        }, 20);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".chef-stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});
