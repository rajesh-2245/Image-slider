const slides = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Stranger_Things_season_1.jpg',
      title: 'Stranger Things Season 1',
      description: 'The disappearance of Will Byers and the emergence of Eleven, a young girl with psychokinetic abilities, sets off a chain of supernatural events in Hawkins.',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Stranger_Things_%28season_II%29.jpg',
      title: 'Stranger Things Season 2',
      description: 'Will struggles with visions of the Upside Down while a new threat, the Mind Flayer, looms over Hawkins as Eleven discovers more about her past.',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Stranger_Things_season_3.png',
      title: 'Stranger Things Season 3',
      description: 'Summer of 1985 brings new dangers as the Mind Flayer returns, threatening our heroes while they navigate teenage romance and a mysterious Russian facility.',
    },
    {
      url: 'https://static.wikia.nocookie.net/strangerthings8338/images/7/74/Stranger_Things_4_Poster.jpg',
      title: 'Stranger Things Season 4',
      description: 'The gang faces their greatest challenge yet as a new supernatural threat emerges, forcing them to confront the horrors of the Upside Down once again.',
    },
  ];
  
  class ImageSlider {
    constructor() {
      this.currentIndex = 0;
      this.isAutoPlaying = true;
      this.touchStartX = 0;
      this.touchEndX = 0;
  
      // DOM Elements
      this.slider = document.getElementById('slider');
      this.prevButton = document.getElementById('prev');
      this.nextButton = document.getElementById('next');
      this.thumbnailsContainer = document.getElementById('thumbnails');
  
      this.initThumbnails();
      this.bindEvents();
      this.startAutoPlay();
    }
  
    initThumbnails() {
      slides.forEach((slide, index) => {
        const thumbnail = document.createElement('button');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${slide.url}" alt="Thumbnail ${index + 1}">`;
        thumbnail.addEventListener('click', () => this.goToSlide(index));
        this.thumbnailsContainer.appendChild(thumbnail);
      });
    }
  
    bindEvents() {
      this.prevButton.addEventListener('click', () => this.goToPrevious());
      this.nextButton.addEventListener('click', () => this.goToNext());
  
      this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
  
      this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e));
      this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e));
      this.slider.addEventListener('touchend', () => this.handleTouchEnd());
    }
  
    goToPrevious() {
      this.currentIndex = this.currentIndex === 0 ? slides.length - 1 : this.currentIndex - 1;
      this.updateSlider();
    }
  
    goToNext() {
      this.currentIndex = this.currentIndex === slides.length - 1 ? 0 : this.currentIndex + 1;
      this.updateSlider();
    }
  
    goToSlide(index) {
      this.currentIndex = index;
      this.updateSlider();
    }
  
    updateSlider() {
      this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      this.updateThumbnails();
    }
  
    updateThumbnails() {
      const thumbnails = this.thumbnailsContainer.getElementsByClassName('thumbnail');
      Array.from(thumbnails).forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === this.currentIndex);
      });
    }
  
    startAutoPlay() {
      this.isAutoPlaying = true;
      this.autoPlayInterval = setInterval(() => this.goToNext(), 5000);
    }
  
    stopAutoPlay() {
      this.isAutoPlaying = false;
      clearInterval(this.autoPlayInterval);
    }
  
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    }
  
    handleTouchMove(e) {
      this.touchEndX = e.touches[0].clientX;
    }
  
    handleTouchEnd() {
      const touchDiff = this.touchStartX - this.touchEndX;
      if (Math.abs(touchDiff) > 50) {
        if (touchDiff > 0) {
          this.goToNext();
        } else {
          this.goToPrevious();
        }
      }
    }
  }
  
  // Initialize the slider when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
  });