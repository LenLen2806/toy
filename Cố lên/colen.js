document.addEventListener('DOMContentLoaded', () => {
  // Get elements
  const popupContainer = document.getElementById('popupContainer');
  const closePopupButton = document.getElementById('closePopup');
  const introVideo = document.getElementById('introVideo');

  // Show popup after 3 seconds
  setTimeout(() => {
    popupContainer.style.display = 'flex'; // Show the popup
    introVideo.play(); // Automatically play the video
  }, 3000); // 3 seconds

  // Close popup when the close button is clicked
  closePopupButton.addEventListener('click', () => {
    popupContainer.style.display = 'none'; // Hide the popup
    introVideo.pause(); // Pause the video
  });
});



document.getElementById('dropdown-btn').addEventListener('click', function () {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });
  
  document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
      document.getElementById('dropdown-content').style.display = 'none';
    }
  });
  /*Chạy dropdown*/
// Tìm nút and nội dung dropdown
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownContent = document.getElementById('dropdown-content');
const radioButtons = document.querySelectorAll('.dropdown-item input');
// Thả danh mục xuống khi ấn nút
dropdownBtn.addEventListener('click', () => {
  dropdownContent.parentElement.classList.toggle('show');
});

// Cập nhật nút khi ấn
radioButtons.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    dropdownBtn.textContent = `Bộ lọc - ${selectedValue}`;
    dropdownContent.parentElement.classList.remove('show'); 
  });
});

// Đóng dropdown
document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    dropdownContent.parentElement.classList.remove('show');
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll('.product');
  const pageButtons = document.querySelectorAll('.page-btn');
  const productsPerPage = 12; // Number of products per page
  let currentPage = 1;
  const totalPages = Math.ceil(products.length / productsPerPage);

  function showPage(page) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Show products for the current page
    products.forEach((product, index) => {
      product.style.display = index >= startIndex && index < endIndex ? 'block' : 'none';
    });

    // Update pagination buttons
    pageButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.page-btn[data-page="${page}"]`)?.classList.add('active');

    // Enable/Disable prev and next buttons
    document.querySelector('.page-btn[data-page="prev"]').disabled = page === 1;
    document.querySelector('.page-btn[data-page="next"]').disabled = page === totalPages;
  }

  // Event listeners for pagination buttons
  document.querySelector('.pagination').addEventListener('click', event => {
    const button = event.target;
    if (button.classList.contains('page-btn')) {
      const page = button.dataset.page;

      if (page === 'prev' && currentPage > 1) {
        currentPage--;
      } else if (page === 'next' && currentPage < totalPages) {
        currentPage++;
      } else if (!isNaN(page)) {
        currentPage = parseInt(page);
      }

      showPage(currentPage);
    }
  });

  // Initialize the first page
  showPage(1);
});