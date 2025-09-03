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



// Navbar

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

// Contact form ajax

(function () {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");

  // ছোট হেল্পার: এরর দেখানো
  function setError(input, text) {
    const small = form.querySelector(`.err[data-for="${input.name}"]`);
    if (small) small.textContent = text || "";
    input.classList.toggle("invalid", !!text);
  }

  // বেসিক কাস্টম ভ্যালিডেশন
  function validate() {
    let ok = true;

    // Name
    if (form.name.value.trim().length < 2) {
      setError(form.name, "Please enter at least 2 characters.");
      ok = false;
    } else setError(form.name, "");

    // Email
    const email = form.email.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setError(form.email, "Please enter a valid email address.");
      ok = false;
    } else setError(form.email, "");

    // Phone (required) — international
    const phRaw = form.phone.value.trim();
    // keep a leading +, strip all other non-digits/spaces/dashes/parens etc.
    const ph = phRaw.replace(/(?!^\+)[^\d]/g, "");

    // E.164-like: optional +, then 8–15 digits; first digit after + cannot be 0
    const intlPhone = /^\+?[1-9]\d{7,14}$/;

    if (!intlPhone.test(ph)) {
      setError(
        form.phone,
        "Enter a valid international number (e.g., +14155552671 or +447911123456)."
      );
      ok = false;
    } else setError(form.phone, "");

    // Message
    if (form.message.value.trim().length < 10) {
      setError(form.message, "Please write at least 10 characters.");
      ok = false;
    } else setError(form.message, "");

    return ok;
  }

  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // client-side validate
    if (!validate()) {
      msg.textContent = "Please correct the highlighted fields.";
      return;
    }

    msg.textContent = "Sending...";
    const btn = form.querySelector(".submit-btn");
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "X-Requested-With": "XMLHttpRequest" }, // AJAX হিন্ট
      });
      // mail() কাজ না করলে সার্ভার থেকে HTML/টেক্সট আসতে পারে, তাই try..catch
      let data;
      try {
        data = await res.json();
      } catch {
        data = { success: false, message: "Unexpected server response" };
      }

      msg.textContent = data.message || (data.success ? "Sent!" : "Failed.");
      if (data.success) form.reset();
    } catch (err) {
      msg.textContent = "Server error. Please try again.";
    } finally {
      btn.disabled = false;
    }
  });
})();




// Form validation

// document
//   .getElementById("contactForm")
//   .addEventListener("submit", function (event) {
//     let form = event.target;
//     let isValid = true;

//     // Validate Name
//     if (!form.name.value || form.name.value.length < 2) {
//       isValid = false;
//       document.querySelector("[data-for='name']").textContent =
//         "Please enter a valid name.";
//     } else {
//       document.querySelector("[data-for='name']").textContent = "";
//     }

//     // Validate Email
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!form.email.value || !emailRegex.test(form.email.value)) {
//       isValid = false;
//       document.querySelector("[data-for='email']").textContent =
//         "Please enter a valid email.";
//     } else {
//       document.querySelector("[data-for='email']").textContent = "";
//     }

//     // Validate Phone
//     if (!form.phone.value) {
//       isValid = false;
//       document.querySelector("[data-for='phone']").textContent =
//         "Please enter your phone number.";
//     } else {
//       document.querySelector("[data-for='phone']").textContent = "";
//     }

//     // Validate Message
//     if (!form.message.value || form.message.value.length < 10) {
//       isValid = false;
//       document.querySelector("[data-for='message']").textContent =
//         "Message should be at least 10 characters.";
//     } else {
//       document.querySelector("[data-for='message']").textContent = "";
//     }

//     // Check Honeypot field for bots
//     if (form.website.value) {
//       isValid = false;
//       alert("Bot detected.");
//     }

//     if (!isValid) {
//       event.preventDefault();
//     }
//   });

// // Check if the status is success in the URL
// window.onload = function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const status = urlParams.get("status");

//   // If status is 'success', show the success message
//   if (status === "success") {
//     document.getElementById("successMessage").style.display = "block";
//   }
// };


// Form validation contact

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    const successMessage = document.getElementById("successMessage");

    function showError(input, message) {
      const small = document.querySelector(`small[data-for="${input.id}"]`);
      small.textContent = message;
      small.style.color = "#fde056";
      input.style.borderColor = "yellow";
    }

    function clearError(input) {
      const small = document.querySelector(`small[data-for="${input.id}"]`);
      small.textContent = "";
      input.style.borderColor = "#ccc";
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
      return /^[0-9+]{10,15}$/.test(phone);
    }

    // Live validation
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim().length < 2) showError(nameInput, "Name must be at least 2 characters.");
      else clearError(nameInput);
    });

    emailInput.addEventListener("input", () => {
      if (!isValidEmail(emailInput.value.trim())) showError(emailInput, "Please enter a valid email.");
      else clearError(emailInput);
    });

    phoneInput.addEventListener("input", () => {
      if (!isValidPhone(phoneInput.value.trim())) showError(phoneInput, "Please enter a valid phone number.");
      else clearError(phoneInput);
    });

    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim().length < 10) showError(messageInput, "Message must be at least 10 characters.");
      else clearError(messageInput);
    });

    // Form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      if (nameInput.value.trim().length < 2) { showError(nameInput, "Name must be at least 2 characters."); isValid = false; }
      if (!isValidEmail(emailInput.value.trim())) { showError(emailInput, "Please enter a valid email."); isValid = false; }
      if (!isValidPhone(phoneInput.value.trim())) { showError(phoneInput, "Please enter a valid phone number."); isValid = false; }
      if (messageInput.value.trim().length < 10) { showError(messageInput, "Message must be at least 10 characters."); isValid = false; }

      if (isValid) {
        successMessage.style.display = "block";
        form.reset();
        setTimeout(() => { successMessage.style.display = "none"; }, 5000);
      }
    });
  });



