function initSlideshow(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const images = container.querySelectorAll('img');
  if (images.length === 0) return;

  // Add navigation buttons
  const navHTML = `
    <div class="slideshow-nav">
      <button class="prev">❮</button>
      <button class="next">❯</button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', navHTML);

  let currentIndex = 0;
  images[currentIndex].classList.add('active');

  // Handle next/prev clicks
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');

  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  // Optional: Keyboard arrow navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

// Initialize all slideshows on the page
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow('.slideshow-container');
});