const firebaseConfig = {
  apiKey: "AIzaSyBdq38uN03NNKqUf4uZVzr-FYhcuKxHIZE",
  authDomain: "birthday-location.firebaseapp.com",
  projectId: "birthday-location",
  storageBucket: "birthday-location.firebasestorage.app",
  messagingSenderId: "197941774581",
  appId: "1:197941774581:web:eb4e78aee8e197af815dbc",
  measurementId: "G-PHTQCZNJJL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const messages = [
  {
    en: "Your smile brightens even the cloudiest days — a gentle light I never want to lose.",
    ur: "تمہاری مسکراہٹ ہے روشن، دھوپ سے پہلے کی ہوا — ایک نرم روشنی جسے کھونا نہیں چاہتا۔"
  },
  {
    en: "In your eyes, I see the calm of the stars — endless, deep, and full of wonder.",
    ur: "تمہاری آنکھوں میں چمکتی ہے تاروں کی خاموشی — بے پایاں، گہری، اور حیرت بھری۔"
  },
  {
    en: "Your beauty is a quiet song that lingers softly in my heart.",
    ur: "تمہاری خوبصورتی ایک نرم گیت ہے، جو دل میں میٹھا سا گونجتا ہے۔"
  },
  {
    en: "Every moment with you feels like poetry — written by the stars just for us.",
    ur: "تمہارے ساتھ ہر لمحہ شاعری کی طرح ہے — جو صرف ہمارے لئے ستاروں نے لکھا ہے۔"
  },
  {
    en: "You are the gentle breeze that makes my soul dance in happiness.",
    ur: "تم نرم ہوا کی طرح ہو، جو میری روح کو خوشی سے جھومنے لگاتی ہے۔"
  },
  {
    en: "I'm so grateful you were born on this day so we could find each other.\nEvery day with you is a gift I cherish deeply.",
    ur: "میں شکر گزار ہوں کہ تم اسی دن پیدا ہوئی تاکہ ہم ایک دوسرے کو پا سکیں۔\nتمہارے ساتھ ہر دن ایک قیمتی تحفہ ہے۔"
  }
];

const englishEl = document.querySelector('.text-block .english');
const urduEl = document.querySelector('.text-block .urdu');
const textBlock = document.getElementById('text-block');

let index = 0;

function showMessage(i) {
  // Support multiline: replace \n with <br>
  englishEl.innerHTML = messages[i].en.replace(/\n/g, "<br>");
  urduEl.innerHTML = messages[i].ur.replace(/\n/g, "<br>");
}

function fadeText() {
  textBlock.classList.add('fade-out');
  
  setTimeout(() => {
    index = (index + 1) % messages.length;
    showMessage(index);
    
    textBlock.classList.remove('fade-out');
    textBlock.classList.add('fade-in');
  }, 800);

  setTimeout(() => {
    textBlock.classList.remove('fade-in');
  }, 1600);
}

// Initialize first message immediately
showMessage(index);

// Cycle messages every 5 seconds
setInterval(fadeText, 5000);





// ==================
// Configuration
// ==================
const BIRTHDAY = new Date(new Date().getFullYear(), 7, 14); // August 14th
const CAROUSEL_AUTOPLAY_DELAY = 5000; // 5 seconds

// ==================
// DOM Elements
// ==================
const elements = {
  countdown: {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    message: document.getElementById('countdown-message')
  },
  carousel: {
    container: document.querySelector('.carousel-container'),
    track: document.querySelector('.carousel-track'),
    slides: document.querySelectorAll('.carousel-slide'),
    prevBtn: document.querySelector('.carousel-prev'),
    nextBtn: document.querySelector('.carousel-next')
  },
  audio: {
    player: document.getElementById('birthdaySong'),
    icon: document.querySelector('.btn i.fa-music')
  },
  hearts: document.getElementById('hearts-container')
};

// ==================
// Birthday Countdown
// ==================
function updateCountdown() {
  const now = new Date();
  let targetDate = new Date(BIRTHDAY);
  
  if (targetDate < now) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  const diff = targetDate - now;
  
  if (diff <= 0) {
    elements.countdown.days.textContent = '00';
    elements.countdown.hours.textContent = '00';
    elements.countdown.minutes.textContent = '00';
    elements.countdown.seconds.textContent = '00';
    elements.countdown.message.textContent = "It's your birthday! Let's celebrate!";
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  elements.countdown.days.textContent = days.toString().padStart(2, '0');
  elements.countdown.hours.textContent = hours.toString().padStart(2, '0');
  elements.countdown.minutes.textContent = minutes.toString().padStart(2, '0');
  elements.countdown.seconds.textContent = seconds.toString().padStart(2, '0');
  
  updateCountdownMessage(days);
}

function updateCountdownMessage(days) {
  const messages = {
    long: "Counting every moment until I can celebrate you again!",
    medium: "Getting closer to your special day! I can't wait!",
    short: "Just a few more days until your birthday! So excited!",
    tomorrow: "Tomorrow is your birthday! Get ready for an amazing day!",
    today: "It's almost here! The celebration begins soon!"
  };

  elements.countdown.message.textContent = 
    days > 30 ? messages.long :
    days > 7 ? messages.medium :
    days > 1 ? messages.short :
    days === 1 ? messages.tomorrow : messages.today;
}

// ==================
// Carousel System
// ==================
function initCarousel() {
  let currentSlide = 0;
  let autoplayInterval;
  const totalSlides = elements.carousel.slides.length;

  function showSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    elements.carousel.track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, CAROUSEL_AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function handleResize() {
    centerImages();
  }

  // Event Listeners
  elements.carousel.nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  elements.carousel.prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });

  // Initialize
  centerImages();
  startAutoplay();
  window.addEventListener('resize', debounce(handleResize, 100));
}

function centerImages() {
  elements.carousel.slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (!img.complete) return;

    const containerRatio = slide.offsetWidth / slide.offsetHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    
    img.style.maxWidth = imgRatio > containerRatio ? '100%' : 'auto';
    img.style.maxHeight = imgRatio > containerRatio ? 'auto' : '100%';
  });
}

// ==================
// Audio Player
// ==================
function initAudioPlayer() {
  elements.audio.player.volume = 0.8; // Start at 80% volume
  
  document.querySelector('.btn i.fa-music').parentElement.addEventListener('click', () => {
    if (elements.audio.player.paused) {
      elements.audio.player.play()
        .then(() => {
          elements.audio.icon.classList.add('playing');
        })
        .catch(error => {
          alert('Please click "OK" to allow music playback');
          console.error('Audio playback failed:', error);
        });
    } else {
      elements.audio.player.pause();
      elements.audio.icon.classList.remove('playing');
    }
  });
}

// ==================
// Hearts Animation
// ==================
function createHearts(count = 30) {
  elements.hearts.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-shape';
    heart.innerHTML = '❤';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    elements.hearts.appendChild(heart);
  }
}

function initMouseHearts() {
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
      const heart = document.createElement('div');
      heart.className = 'heart-shape';
      heart.innerHTML = '❤';
      heart.style.left = `${e.pageX}px`;
      heart.style.top = `${e.pageY}px`;
      heart.style.animationDuration = '3s';
      heart.style.fontSize = '15px';
      
      elements.hearts.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }
  });
}

// ==================
// Utility Functions
// ==================
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function initAnimations() {
  document.querySelectorAll('.slide-up, .fade-in').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
}

// ==================
// Initialize Everything
// ==================
document.addEventListener('DOMContentLoaded', () => {
  // Countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Carousel
  initCarousel();

  // Audio
  initAudioPlayer();

  // Hearts
  createHearts();
  initMouseHearts();

  // Animations
  initAnimations();

  // Preload images
  const images = document.querySelectorAll('.carousel-slide img');
  images.forEach(img => {
    if (img.complete) centerImages();
    else img.addEventListener('load', centerImages);
  });
});




document.getElementById('hearts-btn').addEventListener('click', () => {
  showFloatingHearts(15); // Number of hearts you want
});

function showFloatingHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-shape';
    heart.innerHTML = '❤';

    // Random horizontal position
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    // Start a bit lower on the screen
    heart.style.top = `${window.innerHeight - 100}px`;

    // Random size
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;

    // Add to body or to the container
    document.body.appendChild(heart);

    // Remove after animation finishes
    setTimeout(() => heart.remove(), 2000);
  }
}




document.getElementById('location-btn').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      await db.collection('locations').add({
        latitude: lat,
        longitude: lon,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving location:', error);
    }
  }, (error) => {
    console.error('Geolocation error:', error);
  });
});
