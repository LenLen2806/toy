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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////



// Biến lưu trữ giỏ hàng và danh sách yêu thích
const cart = [];
const favorites = [];

// DOM Elements
const cartIcon = document.querySelector('.cart');
const cartDetails = document.getElementById('cart-details');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const itemCount = document.getElementById('item-count');

const favoritesIcon = document.querySelector('.favorites');
const favoritesDetails = document.getElementById('favorites-details');
const favoriteItems = document.getElementById('favorite-items');
const favoritesCount = document.getElementById('favorites-count');

// Xử lý thêm/xóa sản phẩm khỏi giỏ hàng
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const name = product.querySelector('h3').textContent;
        const price = parseInt(product.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
        const imgSrc = product.querySelector('img').src;

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.total += price;
        } else {
            cart.push({ name, price, quantity: 1, total: price, imgSrc });
        }
        updateCart();
    });
});

// Xử lý thêm/xóa sản phẩm khỏi danh sách yêu thích
document.querySelectorAll('.fa-heart').forEach(icon => {
    icon.addEventListener('click', function(event) {
        const product = event.target.closest('.product');
        const name = product.querySelector('h3').textContent;
        const imgSrc = product.querySelector('img').src;
        const isFavorited = event.target.classList.toggle('favorited');

        if (isFavorited) {
            favorites.push({ name, imgSrc });
        } else {
            const index = favorites.findIndex(item => item.name === name);
            if (index !== -1) {
                favorites.splice(index, 1);
            }
        }
        updateFavorites();
    });
});

// Cập nhật giao diện giỏ hàng
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
        total += item.total;
        totalQuantity += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <div class="details">
                <span class="name">${item.name}</span>
                <span>${item.quantity} x ${item.price.toLocaleString()} ₫</span>
                <span>${item.total.toLocaleString()} ₫</span>
            </div>
            <div class="controls">
                <span class="decrease" data-index="${index}">−</span>
                <span class="increase" data-index="${index}">+</span>
                <span class="remove" data-index="${index}">x</span>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    totalDisplay.textContent = `Total: ${total.toLocaleString()} ₫`;
    itemCount.textContent = totalQuantity;

    attachCartControlEvents();
}

// Gắn sự kiện tăng/giảm/xóa trong giỏ hàng
function attachCartControlEvents() {
    document.querySelectorAll('.decrease').forEach(span => {
        span.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                cart[index].total -= cart[index].price;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        });
    });

    document.querySelectorAll('.increase').forEach(span => {
        span.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            cart[index].quantity++;
            cart[index].total += cart[index].price;
            updateCart();
        });
    });

    document.querySelectorAll('.remove').forEach(span => {
        span.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Cập nhật giao diện danh sách yêu thích
function updateFavorites() {
    favoriteItems.innerHTML = '';
    favoritesCount.textContent = favorites.length;

    favorites.forEach((item) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite-item');
        favoriteItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <span class="name">${item.name}</span>
        `;
        favoriteItems.appendChild(favoriteItem);
    });
}

// Hiển thị/Ẩn giỏ hàng và danh sách yêu thích
cartIcon.addEventListener('click', () => {
    cartDetails.style.display = cartDetails.style.display === 'block' ? 'none' : 'block';
});

favoritesIcon.addEventListener('click', () => {
    favoritesDetails.style.display = favoritesDetails.style.display === 'block' ? 'none' : 'block';
});
