
        // Set her birthday here (month is 0-indexed, so 0 = January, 11 = December)
        // Format: new Date(year, month, day)
        const birthday = new Date(new Date().getFullYear(), 7, 14); // August 14th (example)
        
        // If birthday has passed this year, set for next year
        if (birthday < new Date()) {
            birthday.setFullYear(birthday.getFullYear() + 1);
        }
        
        // Update countdown every second
        function updateCountdown() {
            const now = new Date();
            const diff = birthday - now;
            
            // If birthday is today
            if (diff <= 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                document.getElementById('countdown-message').textContent = "It's your birthday! Let's celebrate!";
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Update message based on time remaining
            const messageElement = document.getElementById('countdown-message');
            if (days > 30) {
                messageElement.textContent = "Counting every moment until I can celebrate you again!";
            } else if (days > 7) {
                messageElement.textContent = "Getting closer to your special day! I can't wait!";
            } else if (days > 1) {
                messageElement.textContent = "Just a few more days until your birthday! So excited!";
            } else if (days === 1) {
                messageElement.textContent = "Tomorrow is your birthday! Get ready for an amazing day!";
            } else {
                messageElement.textContent = "It's almost here! The celebration begins soon!";
            }
        }
        
        // Personalize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize countdown
            updateCountdown();
            setInterval(updateCountdown, 1000);
            
            // Create floating hearts
            createHearts();
            
            // Initialize carousel
            let currentSlide = 0;
            const slides = document.querySelectorAll('.carousel-item');
            const totalSlides = slides.length;
            
            function showSlide(index) {
                const carouselInner = document.getElementById('carousel-inner');
                carouselInner.style.transform = `translateX(-${index * 100}%)`;
                currentSlide = index;
            }
            
            window.nextSlide = function() {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            }
            
            window.prevSlide = function() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(currentSlide);
            }
            
            // Auto-advance carousel every 5 seconds
            setInterval(nextSlide, 5000);
            
            // Add animation to elements as they come into view
            const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
            animatedElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
            });
        });
        
        function createHearts() {
            const heartsContainer = document.getElementById('hearts-container');
            heartsContainer.innerHTML = '';
            
            for (let i = 0; i < 50; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart-shape';
                heart.innerHTML = '❤';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 5 + 5 + 's';
                heart.style.animationDelay = Math.random() * 2 + 's';
                heart.style.fontSize = Math.random() * 20 + 10 + 'px';
                heart.style.opacity = Math.random() * 0.5 + 0.3;
                
                heartsContainer.appendChild(heart);
            }
        }
        
        function playMusic() {
    const song = document.getElementById('birthdaySong');
    const musicIcon = document.querySelector('.btn i.fa-music');
    
    if (song.paused) {
        // Modern browsers require interaction before playing audio
        song.play().catch(e => {
            alert("Please click 'OK' to allow music playback");
            song.play();
        });
        musicIcon.classList.add('playing');
    } else {
        song.pause();
        musicIcon.classList.remove('playing');
    }
}
        
        // Add some hearts on mouse move
        document.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.9) {
                const heart = document.createElement('div');
                heart.className = 'heart-shape';
                heart.innerHTML = '❤';
                heart.style.left = e.pageX + 'px';
                heart.style.top = e.pageY + 'px';
                heart.style.animationDuration = '3s';
                heart.style.fontSize = '15px';
                
                document.getElementById('hearts-container').appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }
        });