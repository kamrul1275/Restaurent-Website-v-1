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

//Hero slider

let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".carousel .time");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 4000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};

let runTimeOut;
let runNextAuto = setTimeout(() => {
  nextDom.click(); // Fixed: changed from next.click() to nextDom.click()
}, timeAutoNext);

function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);
}

document.addEventListener("keydown", function (e) {
  if (isTransitioning) return;

  if (e.key === "ArrowLeft") {
    prevDom.click();
  } else if (e.key === "ArrowRight") {
    nextDom.click();
  }
});

carouselDom.addEventListener("mouseenter", function () {
  clearTimeout(runNextAuto);
});

carouselDom.addEventListener("mouseleave", function () {
  runNextAuto = setTimeout(() => {
    if (!isTransitioning) {
      nextDom.click();
    }
  }, timeAutoNext);
});

//Try meal

const cardsWrapper = document.getElementById("cardsWrapper");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function getCardWidth() {
  const card = document.querySelector(".food-card");
  const style = window.getComputedStyle(card);
  const cardWidth = card.offsetWidth;
  const gap = parseInt(style.marginRight || "30");
  return cardWidth + 30;
}

function scrollCards(direction) {
  const scrollAmount = getCardWidth();
  if (direction === "right") {
    cardsWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
  } else if (direction === "left") {
    cardsWrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
}

nextBtn.addEventListener("click", () => scrollCards("right"));
prevBtn.addEventListener("click", () => scrollCards("left"));

//Testimonial

const testimonials = [
  {
    text: "The atmosphere was absolutely magical! Every detail was perfectly crafted, creating an unforgettable dining experience. The staff went above and beyond to make our evening special.",
    name: "SARAH JOHNSON",
  },
  {
    text: "Every dish was bursting with flavor and creativity! The ambiance set the mood perfectly. From start to finish, it was a delightful culinary adventure. The presentation stunning!",
    name: "DAN BITSON",
  },
  {
    text: "Outstanding service and incredible food! The chef's attention to detail was remarkable. This place exceeded all our expectations. We'll definitely be coming back soon!",
    name: "MICHAEL CHEN",
  },
];

let currentIndex = 1;
let isTransitioning = false;
const slideInterval = 3000; // Made faster
let intervalId;
let progressInterval;

const testimonialText = document.getElementById("testimonialText");
const customerName = document.getElementById("customerName");
const progressFill = document.getElementById("progressFill");
const avatars = document.querySelectorAll(".avatar");
const customerNameElement = document.querySelector(".customer-name");

function updateTestimonial(index) {
  if (isTransitioning) return;

  isTransitioning = true;

  testimonialText.style.opacity = "0";
  customerNameElement.style.opacity = "0";

  setTimeout(() => {
    testimonialText.textContent = testimonials[index].text;
    customerName.textContent = testimonials[index].name;

    avatars.forEach((avatar, i) => {
      avatar.classList.toggle("active", i === index);
    });

    customerNameElement.classList.toggle("active", true);

    testimonialText.style.opacity = "1";
    customerNameElement.style.opacity = "1";

    isTransitioning = false;
  }, 300); // Reduced transition time
}

function startProgress() {
  // Clear any existing progress
  if (progressInterval) {
    clearInterval(progressInterval);
  }

  let progress = 0;
  const increment = 100 / (slideInterval / 50);

  progressFill.style.width = "0%";

  progressInterval = setInterval(() => {
    progress += increment;
    progressFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(progressInterval);
    }
  }, 50);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonial(currentIndex);
}

function startAutoSlider() {
  // Clear existing intervals
  if (intervalId) clearInterval(intervalId);
  if (progressInterval) clearInterval(progressInterval);

  startProgress();

  intervalId = setInterval(() => {
    nextSlide();
    startProgress();
  }, slideInterval);
}

avatars.forEach((avatar, index) => {
  avatar.addEventListener("click", () => {
    if (currentIndex !== index && !isTransitioning) {
      currentIndex = index;
      updateTestimonial(currentIndex);
      startAutoSlider();
    }
  });
});

// Initialize
updateTestimonial(currentIndex);
startAutoSlider();

// Video Modal

var modal = document.getElementById("video-modal");

var playBtn = document.getElementById("play-button");

var span = document.getElementsByClassName("close")[0];

var iframe = document.getElementById("modal-video");
var videoUrl = "https://youtu.be/xPPLbEFbCAo?si=R4aK_VcDh4l-cule";

playBtn.onclick = function () {
  modal.style.display = "block";
  iframe.src = videoUrl;
};

span.onclick = function () {
  modal.style.display = "none";
  iframe.src = "";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
};


//Booking form

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookTableForm");
  const bookingButton = document.querySelector(".booking-button");

  // Success message container
  const successMsg = document.createElement("div");
  successMsg.className = "successMessage";
  successMsg.textContent = "Your reservation has been successfully made!";
  form.parentElement.insertBefore(successMsg, form.nextSibling);

  function showError(input, message) {
    let small = input.nextElementSibling;
    if (!small || small.tagName !== "SMALL") {
      small = document.createElement("small");
      input.parentNode.insertBefore(small, input.nextSibling);
    }
    small.textContent = message;
    small.style.color = "#fde056";
    input.style.borderColor = "yellow";
  }

  function clearError(input) {
    let small = input.nextElementSibling;
    if (small && small.tagName === "SMALL") {
      small.textContent = "";
    }
    input.style.borderColor = "#ccc";
  }

  function isValidPhone(phone) {
    return /^[0-9+]{7,15}$/.test(phone);
  }

  // Live validation
  const inputs = form.querySelectorAll('input[required]');
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.name === "name") {
        input.value.trim().length < 2 ? showError(input, "Name must be at least 2 characters.") : clearError(input);
      } else if (input.name === "phone") {
        !isValidPhone(input.value.trim()) ? showError(input, "Enter a valid phone number.") : clearError(input);
      } else if (input.name === "persons") {
        input.value < 1 ? showError(input, "At least 1 person required.") : clearError(input);
      } else {
        input.value ? clearError(input) : showError(input, `Please fill this field.`);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const personsInput = form.querySelector('input[name="persons"]');
    const dateInput = form.querySelector('input[name="date"]');
    const timeInput = form.querySelector('input[name="time"]');

    // Validate fields
    if (nameInput.value.trim().length < 2) { showError(nameInput, "Name must be at least 2 characters."); isValid = false; } else clearError(nameInput);
    if (!isValidPhone(phoneInput.value.trim())) { showError(phoneInput, "Enter a valid phone number."); isValid = false; } else clearError(phoneInput);
    if (personsInput.value < 1) { showError(personsInput, "At least 1 person required."); isValid = false; } else clearError(personsInput);
    if (!dateInput.value) { showError(dateInput, "Please select a date."); isValid = false; } else clearError(dateInput);
    if (!timeInput.value) { showError(timeInput, "Please select a time."); isValid = false; } else clearError(timeInput);

    if (!isValid) return; // stop if validation fails

    // Show loading
    bookingButton.classList.add("loading");
    const originalText = bookingButton.textContent;
    bookingButton.textContent = "Booking...";

    setTimeout(() => {
      bookingButton.textContent = originalText;
      bookingButton.classList.remove("loading");

      form.reset();
      successMsg.style.display = "block";

      setTimeout(() => {
        successMsg.style.display = "none";
      }, 2000);
    }, 1000); // 1-second loading
  });
});