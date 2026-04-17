document.addEventListener('DOMContentLoaded', () => {

    /* --- MENU MOBILE --- */
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('ph-x', 'ph-list');
            }
        });
    });

    /* --- HEADER STICKY --- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- SCROLL REVEAL (ANIMAÇÕES) --- */
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* --- ACCORDION FAQ --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Fechar todos
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Se não estava ativo, abre. Se estava, fechou no passo acima.
            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* --- ENVIO DO FORMULÁRIO PARA WHATSAPP --- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const cidade = document.getElementById('cidade').value;
            const quantidade = document.getElementById('quantidade').value;
            const material = document.getElementById('material').value;
            const mensagem = document.getElementById('mensagem').value;

            // Formata a mensagem para o URL do WhatsApp
            let zapText = `Olá, quero solicitar uma cotação de sucata de metal duro / tungstênio.\n\n`;
            zapText += `*Nome:* ${nome}\n`;
            zapText += `*Cidade:* ${cidade}\n`;
            zapText += `*Material:* ${material}\n`;
            zapText += `*Quantidade aproximada:* ${quantidade}\n`;
            
            if (mensagem.trim() !== '') {
                zapText += `*Detalhes:* ${mensagem}`;
            }

            const encodedText = encodeURIComponent(zapText);
            const wppNumber = '5511940072477';
            const wppUrl = `https://wa.me/${wppNumber}?text=${encodedText}`;

            // Abre navegação em nova aba
            window.open(wppUrl, '_blank');
        });
    }

    /* --- UPDATE YEAR IN FOOTER --- */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    /* --- GALERIA DE FOTOS (TRANSLATE REVERTIDO A PROVA DE FALHAS) --- */
    const galTrack = document.querySelector('.carousel-track');
    const galNext = document.querySelector('.carousel-button.next');
    const galPrev = document.querySelector('.carousel-button.prev');
    
    if (galTrack && galNext && galPrev) {
        let galIndex = 0;
        
        const updateGal = () => {
            const slides = galTrack.querySelectorAll('.carousel-slide');
            if(!slides.length) return;
            const slideW = slides[0].offsetWidth;
            galTrack.style.transition = 'transform 0.4s ease-in-out';
            galTrack.style.transform = `translateX(-${galIndex * slideW}px)`;
        };

        galNext.addEventListener('click', (e) => {
            e.preventDefault();
            const slides = galTrack.querySelectorAll('.carousel-slide');
            const viewCount = Math.round(galTrack.offsetWidth / slides[0].offsetWidth) || 1;
            if(galIndex < slides.length - viewCount) {
                galIndex++;
            } else {
                galIndex = 0;
            }
            updateGal();
        });

        galPrev.addEventListener('click', (e) => {
            e.preventDefault();
            if(galIndex > 0) {
                galIndex--;
            } else {
                const slides = galTrack.querySelectorAll('.carousel-slide');
                const viewCount = Math.round(galTrack.offsetWidth / slides[0].offsetWidth) || 1;
                galIndex = slides.length - viewCount;
            }
            updateGal();
        });
        
        // Mantém as posições encaixadas mesmo ao deitar ou levantar o celular
        window.addEventListener('resize', updateGal);
    }
});
