window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 600);
});

const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('main-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');

const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

const btnComecar = document.getElementById('btn-comecar');
if (btnComecar) {
    btnComecar.addEventListener('click', () => {
        const target = document.getElementById('funcionalidades');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        showToast('🏋️ Conheça nossas funcionalidades!');
    });
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        const url = this.getAttribute('href');
        if (!url || url.startsWith('#') || this.target === '_blank') return;
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    });
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translateY(-4px) translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

(function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    Object.assign(cursor.style, {
        position:     'fixed',
        width:        '14px',
        height:       '14px',
        borderRadius: '50%',
        background:   'rgba(209,0,0,0.85)',
        pointerEvents:'none',
        zIndex:       '99999',
        transition:   'transform 0.15s ease, opacity 0.3s',
        transform:    'translate(-50%,-50%)',
        mixBlendMode: 'difference',
    });
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1.6)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });
})();

(function initCounters() {
    const sobre = document.getElementById('sobre');
    if (!sobre) return;

    const stats = [
        { value: 24,   suffix: 'h',  label: 'Acesso'        },
        { value: 500,  suffix: '+',  label: 'Equipamentos'   },
        { value: 5000, suffix: '+',  label: 'Alunos'         },
        { value: 10,   suffix: 'x',  label: 'Mais Resultado' },
    ];

    const wrap = document.createElement('div');
    wrap.className = 'counters-grid reveal';
    Object.assign(wrap.style, {
        display:        'flex',
        justifyContent: 'center',
        gap:            '40px',
        flexWrap:       'wrap',
        marginTop:      '60px',
    });

    stats.forEach(stat => {
        const box = document.createElement('div');
        box.className = 'counter-box';
        Object.assign(box.style, {
            textAlign: 'center',
            minWidth:  '110px',
        });

        const num = document.createElement('span');
        num.className      = 'counter-num';
        num.dataset.target = stat.value;
        num.textContent    = '0' + stat.suffix;
        Object.assign(num.style, {
            display:    'block',
            fontSize:   'clamp(2rem, 5vw, 3rem)',
            fontWeight: '900',
            color:      '#d10000',
        });

        const lbl = document.createElement('span');
        lbl.textContent = stat.label;
        Object.assign(lbl.style, {
            display:       'block',
            color:         '#888',
            fontSize:      '0.85rem',
            fontWeight:    '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop:     '4px',
        });

        box.appendChild(num);
        box.appendChild(lbl);
        wrap.appendChild(box);
    });

    sobre.appendChild(wrap);

    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            counterObs.unobserve(entry.target);

            entry.target.querySelectorAll('.counter-num').forEach(el => {
                const target = parseInt(el.dataset.target);
                const suffix = el.textContent.replace(/[0-9]/g, '');
                let current  = 0;
                const step   = Math.ceil(target / 80);
                const timer  = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = current.toLocaleString('pt-BR') + suffix;
                    if (current >= target) clearInterval(timer);
                }, 20);
            });

            entry.target.classList.add('visible');
        });
    }, { threshold: 0.3 });

    counterObs.observe(wrap);
    revealObserver.observe(wrap);
})();