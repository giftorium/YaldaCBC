// ========================================
// YALDA NIGHT - INTERACTIVE EXPERIENCE
// Fortune Wheel + Atmospheric Enhancements
// ========================================

const fallbackFortunes = [
    {
        title: "Saqi's Call",
        persian: `الا یا ایها الساقی ادر کاسا و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل ها`,
        translation: `Cupbearer, keep the goblet turning and place it at our lips;\nLove looked easy at sunrise, yet soon revealed its knots.`,
        faal: `A fresh desire is awakening. Welcome it, but do not assume the road will stay simple. Patience is part of the blessing.`
    },
    {
        title: "Angelic Brew",
        persian: `دوش دیدم که ملائک در میخانه زدند\nگل آدم بسرشتند و به پیمانه زدند`,
        translation: `Last night I saw the angels knock upon the tavern door;\nThey kneaded Adam's clay and measured it with the wine cup.`,
        faal: `The unseen is collaborating on your behalf. Allow a sacred mix of destiny and delight to remake your plans.`
    },
    {
        title: "Snared Heart",
        persian: `هر که دلارام دید از دلش آرام رفت\nچشم ندارد خلاص هر که در این دام رفت`,
        translation: `Whoever glimpsed that gentle beloved lost the calm of the heart;\nNo eye finds release once it steps inside this snare.`,
        faal: `Attachment is transforming you. Instead of fighting the pull, learn from it and let devotion refine your character.`
    },
    {
        title: "Separation Ends",
        persian: `روز هجران و شب فرقت یار آخر شد\nزدم این فال و گذشت اختر و کار آخر شد`,
        translation: `The day of separation and the night of parting finally ended;\nI cast this omen and the turning star announced the work is done.`,
        faal: `Cycles of waiting are closing. Prepare your space and spirit for reunion, resolution, or long-awaited news.`
    },
    {
        title: "Bury the Gloom",
        persian: `ساقیا برخیز و در ده جام را\nخاک بر سر کن غم ایام را`,
        translation: `Cupbearer, rise and fill the cup once more;\nCover the head of sorrowful days with dust and send them off.`,
        faal: `Change the atmosphere yourself. A bold gesture or celebration will break the stale mood and invite better fortune.`
    },
    {
        title: "Royal Heart",
        persian: `ای دل غلام شاه جهان باش و شاه باش\nپیوسته در حمایت لطف اله باش`,
        translation: `O heart, be both servant and king under the Sovereign of the world;\nStay forever sheltered inside divine kindness.`,
        faal: `Lead with humility and courage at the same time. Aligning with a higher ethic gives you both authority and safety.`
    },
    {
        title: "Secret Gallery",
        persian: `به تماشاگه راز آمد و آیینه به دست\nکه به هر جا نظر انداخت جز تو ندید`,
        translation: `He entered the gallery of secrets with a mirror in hand;\nWherever he gazed he saw nothing but you.`,
        faal: `Clear away distractions. Reflection will show that the answer you seek has been present in every scene.`
    },
    {
        title: "Scatter Blossoms",
        persian: `بیا تا گل بر افشانیم و می در ساغر اندازیم\nفلک را سقف بشکافیم و طرحی نو در اندازیم`,
        translation: `Come, let us scatter roses and pour wine into the cup;\nLet us tear the roof of the heavens and sketch a brand-new design.`,
        faal: `It is time to innovate. Gather your allies, celebrate, and disrupt tired limits with joyful courage.`
    },
    {
        title: "Primordial Light",
        persian: `در ازل پرتو حسنت ز تجلی دم زد\nعشق پیدا شد و آتش به همه عالم زد`,
        translation: `At pre-eternity the ray of your beauty flashed;\nLove appeared and set the entire cosmos aflame.`,
        faal: `A timeless inspiration is touching you now. Let passion ignite your craft or calling without apology.`
    },
    {
        title: "Morning Breeze",
        persian: `نسیم باد صبا دوشم آگهی آورد\nکه روز محنت و غم رو به کوتهی آورد`,
        translation: `The dawn breeze visited me last night with news;\nIt said the days of toil and grief are bending toward an end.`,
        faal: `Relief is already traveling your way. Keep your routines steady and welcome the first sign of ease.`
    },
    {
        title: "Exile Drum",
        persian: `مرا در منزل جانان چه امن عیش چون هر دم\nجرس فریاد می دارد که بربندید محمل ها`,
        translation: `How can I rest in the beloved's abode when every moment\nThe caravan bell cries, 'Pack up the litters now!'`,
        faal: `Do not cling to temporary comfort. Be ready to move quickly when destiny signals a new migration.`
    },
    {
        title: "Stormed Night",
        persian: `شب تاریک و بیم موج و گردابی چنین هایل\nکجا دانند حال ما سبکباران ساحل ها`,
        translation: `A dark night, fearful waves, a whirlpool wild and deep;\nHow could the light travellers on shore know what we endure?`,
        faal: `Your struggle is valid even if others do not see it. Stay focused on navigation rather than outside opinions.`
    },
    {
        title: "Vanishing Heart",
        persian: `دل می رود ز دستم صاحب دلان خدا را\nدردا که راز پنهان خواهد شد آشکارا`,
        translation: `My heart is slipping from my grasp, O keepers of hearts;\nAlas, this hidden secret is about to shine in the open.`,
        faal: `Truth wants expression. Share authentically before circumstances reveal what you prefer to guide yourself.`
    },
    {
        title: "Shirazi Promise",
        persian: `اگر آن ترک شیرازی به دست آرد دل ما را\nبه خال هندویش بخشم سمرقند و بخارا را`,
        translation: `If that Shirazi Turk were to claim my heart,\nI would gift Samarkand and Bukhara for the mole upon her cheek.`,
        faal: `Value can shift overnight. Be willing to trade old ambitions for the single bond or idea that truly moves you.`
    },
    {
        title: "Joseph Returns",
        persian: `یوسف گمگشته باز آید به کنعان غم مخور\nکلبه احزان شود روزی گلستان غم مخور`,
        translation: `The lost Joseph returns to Canaan, do not grieve;\nThe hut of sorrows will one day turn to a garden, do not grieve.`,
        faal: `Hope is justified. A missing piece, person, or resource is on the way back once you keep faith.`
    },
    {
        title: "Desert Envoy",
        persian: `صبا به لطف بگو آن غزال رعنا را\nکه سر به کوه و بیابان تو داده ای ما را`,
        translation: `Kind breeze, tell that graceful gazelle;\nYour wandering has driven us into mountains and deserts.`,
        faal: `Send the message you have been holding. Honest communication will shorten the distance between hearts.`
    },
    {
        title: "Listen Well",
        persian: `چو بشنوی سخن اهل دل مگو که خطاست\nسخن شناس نه ای جان من خطا اینجاست`,
        translation: `When you hear the speech of heart-people, do not call it wrong;\nMy dear, the error lies in not knowing the language of the soul.`,
        faal: `Guidance may sound unfamiliar. Suspend judgment and learn the dialect of intuition before deciding.`
    },
    {
        title: "Fragrant Crossing",
        persian: `صبا اگر گذرت بر دیار یار فتد\nزبان حال مرا بازگوی یار نزد`,
        translation: `Breeze, if your path passes through the beloved's land,\nSpeak the language of my state when you stand before that friend.`,
        faal: `Allies can carry your intentions farther than you can alone. Share your prayer with a trusted messenger.`
    },
    {
        title: "Guiding Star",
        persian: `در این شب سیاه گم شد راه مقصود\nاز گوشه ای برون آی ای کوکب هدایت`,
        translation: `In this black night the road to my aim is lost;\nRise from some corner, O guiding star of direction.`,
        faal: `Ask openly for guidance. A mentor or sign will appear as soon as you admit you cannot see the path.`
    },
    {
        title: "Tear-Stained Eyes",
        persian: `ز گریه مردم چشمم نشسته در خون است\nببین که در طلبت حال مردمان چون است`,
        translation: `From endless weeping, the people of my eyes are seated in blood;\nSee what becomes of lovers who keep searching for you.`,
        faal: `Emotion is not weakness. Let your sincerity show, but also soothe yourself with rest and trusted company.`
    }
];

let fortunes = [];

const fortuneState = {
    isRevealing: false,
    revealDefaultText: ''
};

const fortuneElements = {
    ctaButton: null,
    ctaLabel: null,
    result: null,
    original: null,
    translation: null,
    interpretation: null,
    title: null
};

document.addEventListener('DOMContentLoaded', () => {
    cacheFortuneElements();
    initNavigation();
    initFortuneConsole();
    initScrollAnimations();
    initHeroParticles();
    initParallaxLayers();
    initSparkleEffects();
    initPointerPulse();
    loadFortunes();
    console.log('Yalda Night experience ready - may your fortune shine.');
});

function cacheFortuneElements() {
    fortuneElements.ctaButton = document.getElementById('getFaalButton');
    fortuneElements.result = document.getElementById('fortuneResult');
    fortuneElements.original = document.getElementById('poemOriginal');
    fortuneElements.translation = document.getElementById('poemTranslation');
    fortuneElements.interpretation = document.getElementById('poemInterpretation');
    fortuneElements.title = document.getElementById('poemTitle');
    fortuneElements.ctaLabel = fortuneElements.ctaButton
        ? fortuneElements.ctaButton.querySelector('.cta-text')
        : null;
}

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    if (navButtons.length === 0) {
        return;
    }

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

function initFortuneConsole() {
    if (!fortuneElements.ctaButton) {
        return;
    }

    fortuneState.revealDefaultText = fortuneElements.ctaLabel
        ? fortuneElements.ctaLabel.textContent.trim()
        : fortuneElements.ctaButton.textContent.trim();

    fortuneElements.ctaButton.addEventListener('click', revealFortune);
    hideFortuneResult();
    setFortuneAvailability(false, 'Loading poems...');
}

function loadFortunes() {
    if (!fortuneElements.ctaButton) {
        return;
    }

    if (window.location.protocol === 'file:') {
        useFallbackFortunes('Running offline; using bundled fortunes.');
        return;
    }

    fetch('data/faals.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) {
                if (!useFallbackFortunes('faals.json empty; using bundled fortunes.')) {
                    setFortuneAvailability(false, 'Poems unavailable');
                }
                return;
            }
            fortunes = data;
            setFortuneAvailability(true);
        })
        .catch((error) => {
            console.error('Unable to load faals.json', error);
            if (!useFallbackFortunes('faals.json fetch failed; using bundled fortunes.')) {
                setFortuneAvailability(false, 'Poems unavailable');
            }
        });
}

function revealFortune() {
    if (!fortuneElements.ctaButton || fortuneState.isRevealing || fortunes.length === 0) {
        return;
    }

    fortuneState.isRevealing = true;
    setRevealButtonState(true);
    hideFortuneResult();

    const revealDelay = 700 + Math.random() * 400;
    setTimeout(() => {
        const selectedFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        showFortuneResult(selectedFortune);
        setRevealButtonState(false);
        fortuneState.isRevealing = false;
    }, revealDelay);
}

function showFortuneResult(fortune) {
    if (!fortuneElements.result || !fortuneElements.translation || !fortuneElements.interpretation) {
        return;
    }

    if (fortuneElements.original) {
        const persianText = fortune.persian || '';
        fortuneElements.original.innerHTML = persianText.replace(/\n/g, '<br>');
    }

    fortuneElements.translation.innerHTML = (fortune.translation || '').replace(/\n/g, '<br>');
    fortuneElements.interpretation.textContent = fortune.faal || '';
    if (fortuneElements.title) {
        fortuneElements.title.textContent = fortune.title || 'Fāl-e Hafez';
    }

    fortuneElements.result.classList.remove('hidden');
    fortuneElements.result.classList.add('visible');
    fortuneElements.result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideFortuneResult() {
    if (!fortuneElements.result) {
        return;
    }
    fortuneElements.result.classList.add('hidden');
    fortuneElements.result.classList.remove('visible');
}

function setRevealButtonState(isLoading) {
    if (!fortuneElements.ctaButton) {
        return;
    }

    fortuneElements.ctaButton.disabled = isLoading;

    const labelTarget = fortuneElements.ctaLabel || fortuneElements.ctaButton;
    if (isLoading) {
        labelTarget.textContent = 'Consulting Hafez...';
    } else {
        labelTarget.textContent = fortuneState.revealDefaultText;
    }
}

function setFortuneAvailability(isAvailable, message) {
    if (!fortuneElements.ctaButton) {
        return;
    }

    fortuneElements.ctaButton.disabled = !isAvailable;
    const labelTarget = fortuneElements.ctaLabel || fortuneElements.ctaButton;

    if (message) {
        labelTarget.textContent = message;
    } else if (!fortuneState.isRevealing) {
        labelTarget.textContent = fortuneState.revealDefaultText;
    }
}

function useFallbackFortunes(reason) {
    if (!fallbackFortunes.length) {
        return false;
    }

    fortunes = fallbackFortunes;
    setFortuneAvailability(true);
    if (reason) {
        console.warn(reason);
    }
    return true;
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

    pointer.style.animation = 'pulse 3s ease-in-out infinite';
}
