
/*--------------------*/





let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Hiển thị slide đầu tiên khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});

// Tự động chuyển slide sau 5 giây
setInterval(() => {
    nextSlide();
  }, 5000); // 5000ms = 5 giây

  
 
/*----------------------------------------------------------------------------*/
// Đợi cho DOM được tải xong
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup'); // Lấy phần tử popup
  const closePopupButton = document.getElementById('close-popup'); // Lấy nút đóng popup

  if (!popup || !closePopupButton) {
    console.error('Không tìm thấy phần tử popup hoặc nút đóng.');
    return;
  }

  // Hiển thị popup sau 15 giây
  setTimeout(() => {
    popup.style.display = 'flex'; // Hiển thị popup
  }, 15000); // 15 giây

  // Đóng popup khi bấm nút đóng
  closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none'; // Ẩn popup
  });
});


////////////////////////////////////////////////////////////////////////////
const products = [
  "Labubu",
  "Dimoo",
  "Skullpanda",
  "Azura",
  "Hacipupu",
  "Crybaby",
  "Molly"
];

const searchInput = document.getElementById("search");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = "";

  if (query.trim() !== "") {
      const filteredProducts = products.filter(product =>
          product.toLowerCase().includes(query)
      );

      if (filteredProducts.length > 0) {
          searchResults.style.display = "block";
          filteredProducts.forEach(product => {
              const item = document.createElement("div");
              item.classList.add("result-item");
              item.textContent = product;
              searchResults.appendChild(item);

              item.addEventListener("click", () => {
                  searchInput.value = product;
                  searchResults.style.display = "none";
              });
          });
      } else {
          searchResults.style.display = "block";
          const noResult = document.createElement("div");
          noResult.classList.add("result-item");
          noResult.textContent = "No results found";
          searchResults.appendChild(noResult);
      }
  } else {
      searchResults.style.display = "none";
  }
});
