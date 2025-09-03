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

//Booking Form

// (() => {
//   const form = document.getElementById("bookTableForm");
//   const msg = document.getElementById("bt_msg");

//   const setError = (name, text = "") => {
//     const input = form.elements[name];
//     const small = form.querySelector(`.err[data-for="${name}"]`);
//     if (small) small.textContent = text;
//     if (input) input.classList.toggle("invalid", !!text);
//   };

//   function validate() {
//     let ok = true;

//     // name
//     const name = form.name.value.trim();
//     if (name.length < 2) {
//       setError("name", "Please enter at least 2 characters.");
//       ok = false;
//     } else setError("name");

//     // phone (E.164-like)
//     const phRaw = form.phone.value.trim();
//     const ph = phRaw.replace(/(?!^\+)[^\d]/g, ""); // keep leading +, strip others
//     const intl = /^\+?[1-9]\d{7,14}$/; // 8–15 digits, optional +
//     if (!intl.test(ph)) {
//       setError(
//         "phone",
//         "Enter a valid international number (e.g., +14155552671)."
//       );
//       ok = false;
//     } else setError("phone");

//     // people
//     const people = parseInt(form.people.value, 10);
//     if (!Number.isFinite(people) || people < 1 || people > 20) {
//       setError("people", "People must be between 1 and 20.");
//       ok = false;
//     } else setError("people");

//     // date/time (not in the past)
//     const d = form.date.value;
//     const t = form.time.value;
//     if (!d) {
//       setError("date", "Please select a date.");
//       ok = false;
//     } else setError("date");
//     if (!t) {
//       setError("time", "Please select a time.");
//       ok = false;
//     } else setError("time");

//     if (d && t) {
//       const sel = new Date(`${d}T${t}:00`);
//       const now = new Date();
//       if (sel < now) {
//         setError("time", "Please choose a future time.");
//         ok = false;
//       }
//     }

//     return ok;
//   }

//   form?.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       msg.textContent = "Please correct the highlighted fields.";
//       return;
//     }

//     msg.textContent = "Submitting...";
//     const btn = form.querySelector(".booking-button");
//     btn.disabled = true;

//     try {
//       const res = await fetch(form.action, {
//         method: "POST",
//         body: new FormData(form),
//         headers: { "X-Requested-With": "XMLHttpRequest" },
//       });
//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         data = { success: false, message: "Unexpected server response" };
//       }
//       msg.textContent =
//         data.message || (data.success ? "Request sent!" : "Failed.");
//       if (data.success) form.reset();
//     } catch (err) {
//       msg.textContent = "Server error. Please try again.";
//     } finally {
//       btn.disabled = false;
//     }
//   });
// })();





// Booking form valiadtion

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookTableForm");
  const successMsg = document.getElementById("bookingSuccessMsg");
  const bookingButton = document.querySelector(".booking-button");

  // Inputs
  const nameInput = document.getElementById("bt_name");
  const phoneInput = document.getElementById("bt_phone");
  const peopleInput = document.getElementById("bt_people");
  const dateInput = document.getElementById("bt_date");
  const timeInput = document.getElementById("bt_time");

  function showError(input, message) {
    const small = document.querySelector(`small[data-for="${input.name}"]`);
    small.textContent = message;
    small.style.color = "#fde056";
    input.style.borderColor = "yellow";
  }

  function clearError(input) {
    const small = document.querySelector(`small[data-for="${input.name}"]`);
    small.textContent = "";
    input.style.borderColor = "#ccc";
  }

  function isValidPhone(phone) {
    return /^[0-9+]{7,15}$/.test(phone);
  }

  // Live validation
  nameInput.addEventListener("input", () => {
    nameInput.value.trim().length < 2 ? showError(nameInput, "Name must be at least 2 characters.") : clearError(nameInput);
  });
  phoneInput.addEventListener("input", () => {
    !isValidPhone(phoneInput.value.trim()) ? showError(phoneInput, "Enter a valid phone number.") : clearError(phoneInput);
  });
  peopleInput.addEventListener("input", () => {
    (peopleInput.value < 1 || peopleInput.value > 20) ? showError(peopleInput, "Number of people must be 1-20.") : clearError(peopleInput);
  });
  dateInput.addEventListener("input", () => {
    !dateInput.value ? showError(dateInput, "Please select a date.") : clearError(dateInput);
  });
  timeInput.addEventListener("input", () => {
    !timeInput.value ? showError(timeInput, "Please select a time.") : clearError(timeInput);
  });

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim().length < 2) { showError(nameInput, "Name must be at least 2 characters."); isValid = false; }
    if (!isValidPhone(phoneInput.value.trim())) { showError(phoneInput, "Enter a valid phone number."); isValid = false; }
    if (peopleInput.value < 1 || peopleInput.value > 20) { showError(peopleInput, "Number of people must be 1-20."); isValid = false; }
    if (!dateInput.value) { showError(dateInput, "Please select a date."); isValid = false; }
    if (!timeInput.value) { showError(timeInput, "Please select a time."); isValid = false; }

    if (isValid) {
      // Show loading on button
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
    }
  });
});
