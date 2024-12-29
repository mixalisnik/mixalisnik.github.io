document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active'); // Toggle the active class on the menu toggle
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
            nav.classList.remove('active'); // Close the menu on link click
            menuToggle.classList.remove('active'); // Reset the hamburger menu to its original state
        });
    });

    // Matrix effect
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
    const font_size = 16;
    const columns = canvas.width / font_size;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ffcc';
        ctx.font = font_size + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);

    // Parallax effect for hero section
    document.addEventListener('scroll', function() {
        const hero = document.getElementById('hero');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Typing effect for About section
    const aboutText = "I am a software engineer, web designer, and consultant specializing in futuristic and cyberpunk themes. My passion lies in creating innovative solutions and visually stunning designs that push the boundaries of technology.";
    const aboutDescription = document.getElementById('about-description');
    const typingCursor = document.getElementById('typing-cursor');
    let index = 0;

    function typeEffect() {
        if (index < aboutText.length) {
            aboutDescription.textContent += aboutText.charAt(index);
            index++;
            setTimeout(typeEffect, 25); // Adjust typing speed here
        } else {
            typingCursor.style.display = 'inline';
        }
    }

    // Intersection Observer to start typing effect when About section is in view
    const aboutSection = document.getElementById('about');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value to determine when the effect should start
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeEffect();
                observer.unobserve(entry.target); // Stop observing after the effect starts
            }
        });
    }, observerOptions);

    observer.observe(aboutSection);

    // Fade-in effect for project items
    const projectItems = document.querySelectorAll('.project-item');

    const projectObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, projectObserverOptions);

    projectItems.forEach(item => {
        projectObserver.observe(item);
    });

    // Tabbed panel functionality for services section
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Command-line modal functionality
    const buttons = document.querySelectorAll('.btn');
    const modal = document.getElementById('cmd-modal');
    const cmdOutput = document.getElementById('cmd-output');

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showCmdModal();
        });
    });

    function showCmdModal() {
        modal.style.display = 'block';
        cmdOutput.innerHTML = 'Enter password: ';
        simulatePasswordAttempts(1); // Simulate 2 failed attempts before success
    }

    function simulatePasswordAttempts(attempts) {
        if (attempts > 0) {
            setTimeout(() => {
                cmdOutput.innerHTML += '********<br>';
                setTimeout(() => {
                    cmdOutput.innerHTML += '<span style="color: red;">Access Denied</span><br>';
                    cmdOutput.innerHTML += 'Entering password: ';
                    simulatePasswordAttempts(attempts - 1);
                }, 1000);
            }, 1000);
        } else {
            setTimeout(() => {
                cmdOutput.innerHTML += '********<br>';
                setTimeout(() => {
                    cmdOutput.innerHTML += 'Access Granted';
                    setTimeout(() => {
                        modal.style.display = 'none';
                        cmdOutput.innerHTML = '';
                    }, 2000); // Close the modal after 2 seconds
                }, 1000);
            }, 1000);
        }
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            cmdOutput.innerHTML = '';
        }
    }
});
