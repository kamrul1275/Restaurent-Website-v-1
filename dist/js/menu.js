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

//Menu data

const menuData = {
  breakfast: [
    {
      id: 1,
      name: "Avocado Toast Supreme",
      description:
        "Fresh avocado on sourdough with poached eggs, cherry tomatoes, and microgreens",
      price: 18,
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Berry Pancake Stack",
      description:
        "Fluffy pancakes with mixed berries, whipped cream, and maple syrup",
      price: 22,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Breakfast Burrito Bowl",
      description:
        "Scrambled eggs, chorizo, black beans, avocado, salsa, and cheese",
      price: 19,
      image:
        "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "French Toast Delight",
      description:
        "Thick brioche French toast with cinnamon, vanilla, and fresh strawberries",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Healthy Green Smoothie Bowl",
      description:
        "Spinach, banana, mango smoothie topped with granola and coconut flakes",
      price: 16,
      image:
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Classic Eggs Benedict",
      description:
        "Poached eggs on English muffin with ham and hollandaise sauce",
      price: 24,
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop",
    },
  ],
  lunch: [
    {
      id: 7,
      name: "Grilled Salmon Salad",
      description:
        "Fresh Atlantic salmon with mixed greens, quinoa, and lemon vinaigrette",
      price: 28,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      name: "BBQ chicken Sandwich",
      description: "Slow-cooked pulled chicken with coleslaw and crispy fries",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 9,
      name: "Mediterranean Bowl",
      description:
        "Hummus, falafel, cucumber, tomatoes, olives, and pita bread",
      price: 22,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    },
    {
      id: 10,
      name: "Chicken Caesar Wrap",
      description:
        "Grilled chicken, romaine lettuce, parmesan, and caesar dressing in tortilla",
      price: 19,
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 11,
      name: "Veggie Burger Deluxe",
      description:
        "Plant-based patty with avocado, sprouts, and sweet potato fries",
      price: 21,
      image:
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop",
    },
    {
      id: 12,
      name: "Thai Curry Chicken",
      description:
        "Tender chicken in coconut curry sauce with jasmine rice and vegetables",
      price: 26,
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
    },
  ],
  dinner: [
    {
      id: 13,
      name: "Ribeye Steak Premium",
      description:
        "12oz grilled ribeye with garlic mashed potatoes and seasonal vegetables",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    },
    {
      id: 14,
      name: "Lobster Thermidor",
      description:
        "Fresh lobster tail with creamy cheese sauce, served with rice pilaf",
      price: 52,
      image:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    },
    {
      id: 15,
      name: "Truffle Pasta Special",
      description:
        "Homemade fettuccine with black truffle, mushrooms, and parmesan",
      price: 38,
      image:
        "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 16,
      name: "Pan-Seared Duck Breast",
      description:
        "Duck breast with cherry sauce, roasted vegetables, and wild rice",
      price: 42,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    },
    {
      id: 17,
      name: "Seafood Paella",
      description:
        "Traditional Spanish paella with shrimp, mussels, clams, and saffron rice",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop",
    },
    {
      id: 18,
      name: "Lamb Rack Provençal",
      description:
        "French-style lamb rack with herbs, ratatouille, and red wine reduction",
      price: 48,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    },
  ],
};

const tabButtons = document.querySelectorAll(".tab-btn");
const menuGrid = document.getElementById("menuGrid");

let currentCategory = "breakfast";

// Initialize the menu
document.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(currentCategory);
  setupTabListeners();
});

function setupTabListeners() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      currentCategory = category;
      displayMenuItems(category);
    });
  });
}

// Display menu items for selected category
function displayMenuItems(category) {
  const items = menuData[category] || [];

  menuGrid.innerHTML = "";

  menuGrid.style.opacity = "0";

  setTimeout(() => {
    items.forEach((item, index) => {
      const card = createMenuCard(item, category);
      menuGrid.appendChild(card);

      setTimeout(() => {
        card.classList.add("fade-in");
      }, index * 100);
    });

    menuGrid.style.opacity = "1";
  }, 150);
}

// Create individual menu card
function createMenuCard(item, category) {
  const card = document.createElement("div");
  card.className = "menu-card";

  card.innerHTML = `
        <div class="card-image" style="background-image: url('${item.image}')">
            <div class="category-badge">${category}</div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${item.name}</h3>
            <p class="card-description">${item.description}</p>
            <div class="card-footer">
                <span class="card-price">$${item.price}</span>
            </div>
        </div>
    `;

  return card;
}

