import { initScene, animate } from './js/scene.js';
import { initParticles } from './js/particles.js';
import { initCoffeeBean } from './js/coffeeBean.js';
import { initLanguage } from './js/lang.js';

// DOM Elements
const heroLines = document.querySelectorAll('.hero-title .line');
const heroSubtitle = document.querySelector('.hero-subtitle');
const steps = document.querySelectorAll('.step');

// Init Sequence
document.addEventListener('DOMContentLoaded', () => {
    // 0. Init Language
    initLanguage();

    // 1. Init 3D Scene
    const sceneObjects = initScene();

    // 2. Add Elements to Scene
    const particles = initParticles(sceneObjects.scene);
    const coffeeBean = initCoffeeBean(sceneObjects.scene);

    // 3. Start Animation Loop
    animate((time) => {
        // Update particles
        if (particles) particles.update(time);

        // Update bean (rotation, etc if needed apart from scroll)
        if (coffeeBean) coffeeBean.update(time);
    });

    // 4. Reveal Text
    revealHeroText();

    // 5. Setup Scrollytelling Observer
    setupScrollObserver(coffeeBean);
});

function revealHeroText() {
    heroLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transition = 'opacity 1s ease, transform 1s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    setTimeout(() => {
        heroSubtitle.style.transition = 'opacity 1s ease';
        heroSubtitle.style.opacity = '1';
    }, 800);
}

function setupScrollObserver(webglBean) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Highlight text
                entry.target.classList.add('active');

                // Trigger 3D changes based on data-step
                const step = entry.target.dataset.step;
                if (webglBean) webglBean.onScrollStep(step);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.5
    });

    steps.forEach(step => observer.observe(step));
}
