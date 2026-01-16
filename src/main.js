document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Анимация Hero (Split Text) --- */
    function initHeroAnimation() {
        const splitTarget = document.querySelector('.js-split');
        if (!splitTarget) return;

        const text = splitTarget.innerText;
        splitTarget.innerHTML = '';

        text.split(' ').forEach((word, wordIndex, wordsArray) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            word.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.classList.add('char');
                charSpan.innerText = char;
                wordSpan.appendChild(charSpan);
            });

            splitTarget.appendChild(wordSpan);
            if (wordIndex < wordsArray.length - 1) {
                splitTarget.appendChild(document.createTextNode(' '));
            }
        });

        const chars = document.querySelectorAll('.char');
        chars.forEach((char, index) => {
            setTimeout(() => char.classList.add('active'), 40 * index);
        });
    }

    /* --- 2. Мобильное Меню --- */
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = document.querySelectorAll('.mobile-menu__link');

    function toggleMenu() {
        menuToggle.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

    /* --- 3. Intersection Observer (Reveal effects) --- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* --- 4. Интерактив карточек (Mouse Move) --- */
    const cards = document.querySelectorAll('.tech-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0, 255, 65, 0.07), transparent 80%)`;
        });
        card.addEventListener('mouseleave', () => card.style.background = `rgba(15, 15, 15, 0.8)`);
    });

    /* --- 5. Форма и Капча --- */
    let captchaResult = 0;
    const generateCaptcha = () => {
        const q = document.getElementById('captcha-question');
        if (!q) return;
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        captchaResult = a + b;
        q.innerText = `${a} + ${b}`;
    };

    const mainForm = document.getElementById('mainForm');
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phone = document.getElementById('phone').value.replace(/\D/g, '');
            const answer = parseInt(document.getElementById('captcha-answer').value);

            if (phone.length < 5) return alert('Введите корректный номер');
            if (answer !== captchaResult) {
                alert('Ошибка капчи');
                return generateCaptcha();
            }

            const btn = this.querySelector('button');
            btn.innerText = 'Отправка...';
            setTimeout(() => {
                this.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
            }, 1500);
        });
    }

    /* --- 6. Cookie Popup --- */
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('viralNova_cookies')) {
        setTimeout(() => cookiePopup.classList.add('is-show'), 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('viralNova_cookies', 'true');
        cookiePopup.classList.remove('is-show');
    });

    /* --- 7. Плавный скролл --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Инициализация
    initHeroAnimation();
    generateCaptcha();
});