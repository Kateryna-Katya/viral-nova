// Добавляем функцию инициализации анимации текста
function initHeroAnimation() {
    const splitTarget = document.querySelector('.js-split');
    if (!splitTarget) return;

    const text = splitTarget.innerText;
    splitTarget.innerHTML = '';

    // Разбиваем текст на символы, сохраняя пробелы
    text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.innerText = char === ' ' ? '\u00A0' : char;
        splitTarget.appendChild(span);
    });

    // Запускаем появление с задержкой для каждого символа
    const chars = document.querySelectorAll('.char');
    chars.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('active');
        }, 50 * index);
    });
}

// Вызываем в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    
    // Эффект появления при скролле (простой Observer вместо AOS)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Мобильное меню (базовый функционал)
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Плавный скролл для ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Эффект подсвечивания карточек за мышью
const cards = document.querySelectorAll('.tech-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // Создаем эффект радиального градиента через border
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 65, 0.07), transparent 80%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = `rgba(15, 15, 15, 0.8)`;
    });
});
});