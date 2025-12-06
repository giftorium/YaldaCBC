// ========================================
// YALDA NIGHT - ENGLISH-ONLY INTERACTIVE EXPERIENCE
// Fortune Wheel + Atmospheric Enhancements (Quiz removed)
// ========================================

const fortunes = [
    {
        title: "Cupbearer",
        translation: "Cupbearer, bring forth the cup and place it at my lips\nLove felt simple at dawn, yet the path soon revealed its trials",
        interpretation: "New beginnings are thrilling, but depth arrives only after you face a few honest challenges."
    },
    {
        title: "Mirror of Awareness",
        translation: "Where is righteous action and where am I within my ruins?\nThe path stretches far between who I am and who I wish to be",
        interpretation: "Take inventory of your inner world. Awareness is the map that turns longing into motion."
    },
    {
        title: "Beloved Teacher",
        translation: "My beloved never studied nor wrote a single line\nYet a single glance from her teaches a hundred scholars",
        interpretation: "Wisdom can feel informal and surprising. Trust lessons that arrive through lived experience."
    },
    {
        title: "Breath of Dawn",
        translation: "At daybreak I told the wind the story of my heart\nFor it is confidant of souls and keeper of quiet secrets",
        interpretation: "Let your worries travel. Confiding in a trusted listener lightens the path ahead."
    },
    {
        title: "Vigil of Light",
        translation: "In the darkest night the fearful waves rose high\nWhat do those resting on the shore know of our storm?",
        interpretation: "You understand your struggle better than anyone else. Honor your courage and keep steering forward."
    },
    {
        title: "Rebel Joy",
        translation: "Come, for the palace of hopeful plans is fragile\nBring wine, for the foundation of life rests upon the wind",
        interpretation: "Perfection is overrated. Celebrate what is here now and let delight steady your steps."
    },
    {
        title: "Sacred Message",
        translation: "After stories and laughter we opened Hafez at random\nThe poem became a lantern, guiding the wish in our hearts",
        interpretation: "Guidance often arrives once you declare your intention. Ask clearly, then stay open to an answer."
    },
    {
        title: "Garden Promise",
        translation: "Each pomegranate seed shimmers like a jewel of dawn\nIts crimson glow carries the memory of summer's warmth",
        interpretation: "Tender rituals sustain us through winter. Nourish yourself with reminders of abundance."
    },
    {
        title: "Candle Devotion",
        translation: "In the alley of love be like a candle, bright and burning\nOnly a candle that fully glows keeps a flame alive",
        interpretation: "Offer your full presence to what matters. Half-light cannot warm a gathering."
    },
    {
        title: "Quiet Hope",
        translation: "I sat in hope of seeing you, radiant rose\nEven if you withhold the meeting, hope itself is sweet",
        interpretation: "Expectation need not be heavy. Let hope become a gentle companion rather than a demand."
    },
    {
        title: "Saffron Horizon",
        translation: "Darkness believes itself endless until dawn breathes\nLight always remembers the way back",
        interpretation: "Every season turns. Trust that the return of brightness is already on its way to you."
    },
    {
        title: "Nightingale Oath",
        translation: "O nightingale, pour out your longing until you laugh\nYour song will split the bud so the blossom can speak",
        interpretation: "Vulnerability is fertile ground. Sharing your truth is what finally allows joy to bloom."
    }
];

const wheelColors = ['#b5122f', '#4a0c16', '#d7263d', '#a10f2b'];
const segmentAngle = (Math.PI * 2) / fortunes.length;

const wheelState = {
    angle: 0,
    isSpinning: false,
    animationId: null
};

const wheelElements = {
    canvas: null,
    ctx: null,
    spinButton: null,
    wheelWrapper: null,
    ctaButton: null,
    result: null,
    translation: null,
    interpretation: null,
    closeBtn: null,
    spinAgainBtn: null
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFortuneWheel();
    initScrollAnimations();
    initHeroParticles();
    initParallaxLayers();
    initSparkleEffects();
    initPointerPulse();
    console.log('Yalda Night experience ready - may your fortune shine.');
});

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initFortuneWheel() {
    wheelElements.canvas = document.getElementById('fortuneWheel');
    wheelElements.spinButton = document.getElementById('spinButton');
    wheelElements.wheelWrapper = document.getElementById('wheelContainer');
    wheelElements.ctaButton = document.getElementById('getFaalButton');
    wheelElements.result = document.getElementById('fortuneResult');
    wheelElements.translation = document.getElementById('poemTranslation');
    wheelElements.interpretation = document.getElementById('poemInterpretation');
    wheelElements.closeBtn = document.querySelector('.result-close');
    wheelElements.spinAgainBtn = document.getElementById('spinAgainBtn');

    if (!wheelElements.canvas) {
        return;
    }

    wheelElements.ctx = wheelElements.canvas.getContext('2d');
    setCanvasSize();
    drawWheel();

    window.addEventListener('resize', () => {
        setCanvasSize();
        drawWheel();
    });

    if (wheelElements.ctaButton && wheelElements.wheelWrapper) {
        wheelElements.ctaButton.addEventListener('click', () => {
            wheelElements.wheelWrapper.style.display = 'flex';
            wheelElements.wheelWrapper.style.opacity = '1';
            wheelElements.wheelWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    if (wheelElements.spinButton) {
        wheelElements.spinButton.addEventListener('click', spinWheel);
    }

    if (wheelElements.spinAgainBtn) {
        wheelElements.spinAgainBtn.addEventListener('click', () => {
            hideFortuneResult();
            spinWheel();
        });
    }

    if (wheelElements.closeBtn) {
        wheelElements.closeBtn.addEventListener('click', hideFortuneResult);
    }
}

function setCanvasSize() {
    if (!wheelElements.canvas) {
        return;
    }
    const maxSize = 600;
    const minSize = 320;
    const responsiveSize = Math.min(maxSize, window.innerWidth - 80);
    const size = Math.max(minSize, responsiveSize);
    wheelElements.canvas.width = size;
    wheelElements.canvas.height = size;
}

function drawWheel() {
    if (!wheelElements.ctx || !wheelElements.canvas) {
        return;
    }
    const ctx = wheelElements.ctx;
    const canvas = wheelElements.canvas;
    const center = canvas.width / 2;
    const radius = center - 12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(wheelState.angle);

    fortunes.forEach((fortune, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = wheelColors[index % wheelColors.length];
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.fillStyle = '#f8f8f8';
        ctx.font = '18px "Playfair Display", "Cormorant Garamond", serif';
        ctx.textAlign = 'right';
        ctx.fillText(fortune.title, radius - 24, 6);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#0f0507';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f5f5f5';
    ctx.stroke();

    ctx.restore();
}

function spinWheel() {
    if (!wheelElements.ctx || wheelState.isSpinning) {
        return;
    }

    if (wheelElements.wheelWrapper && getComputedStyle(wheelElements.wheelWrapper).display === 'none') {
        wheelElements.wheelWrapper.style.display = 'flex';
    }

    hideFortuneResult();
    wheelState.isSpinning = true;

    if (wheelElements.spinButton) {
        wheelElements.spinButton.disabled = true;
    }

    const spinAmount = Math.PI * 6 + Math.random() * (Math.PI * 2);
    const duration = 4200;
    const start = performance.now();
    const initialAngle = wheelState.angle;

    function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        wheelState.angle = initialAngle + spinAmount * eased;
        drawWheel();

        if (progress < 1) {
            wheelState.animationId = requestAnimationFrame(animate);
        } else {
            finishSpin();
        }
    }

    wheelState.animationId = requestAnimationFrame(animate);
}

function finishSpin() {
    wheelState.isSpinning = false;
    if (wheelElements.spinButton) {
        wheelElements.spinButton.disabled = false;
    }

    const normalizedAngle = (2 * Math.PI - (wheelState.angle % (2 * Math.PI))) % (2 * Math.PI);
    const segmentIndex = Math.floor(normalizedAngle / segmentAngle) % fortunes.length;
    const selectedFortune = fortunes[segmentIndex];
    showFortuneResult(selectedFortune);
}

function showFortuneResult(fortune) {
    if (!wheelElements.result || !wheelElements.translation || !wheelElements.interpretation) {
        return;
    }

    wheelElements.translation.innerHTML = fortune.translation.replace(/\n/g, '<br>');
    wheelElements.interpretation.textContent = fortune.interpretation;

    wheelElements.result.classList.remove('hidden');
    wheelElements.result.classList.add('visible');
    wheelElements.result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideFortuneResult() {
    if (wheelElements.result) {
        wheelElements.result.classList.add('hidden');
        wheelElements.result.classList.remove('visible');
    }
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function initScrollAnimations() {
    const cards = document.querySelectorAll('.about-card');
    if (!('IntersectionObserver' in window) || cards.length === 0) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initHeroParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
        return;
    }

    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = Math.random() > 0.5
            ? 'radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0))'
            : 'radial-gradient(circle, rgba(196, 30, 58, 0.8), rgba(196, 30, 58, 0))';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = '100%';
        particle.style.opacity = '0';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `float ${Math.random() * 3 + 4}s ease-in-out forwards`;
        heroSection.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.opacity = '0.6';
        });

        setTimeout(() => particle.remove(), 7000);
    };

    setInterval(createParticle, 2200);

    heroSection.addEventListener('mousemove', (event) => {
        const rect = heroSection.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        heroSection.style.setProperty('--mouse-x', `${x}%`);
        heroSection.style.setProperty('--mouse-y', `${y}%`);
    });
}

function initParallaxLayers() {
    const parallaxElements = document.querySelectorAll('.hero-background-image, .wheel-background-image');
    if (parallaxElements.length === 0) {
        return;
    }

    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        parallaxElements.forEach((el) => {
            el.style.transform = `translateY(${offset * 0.35}px)`;
        });
    });
}

function initSparkleEffects() {
    const cards = document.querySelectorAll('.about-card');
    if (cards.length === 0) {
        return;
    }

    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => createSparkles(card));
    });
}

function createSparkles(element) {
    for (let i = 0; i < 3; i += 1) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '8px';
            sparkle.style.height = '8px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 1), transparent)';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 180);
    }
}

function initPointerPulse() {
    const pointer = document.querySelector('.wheel-pointer');
    if (!pointer) {
        return;
    }

    setInterval(() => {
        pointer.style.animation = 'none';
        requestAnimationFrame(() => {
            pointer.style.animation = 'pulse 2s ease-in-out infinite';
        });
    }, 4800);
}
