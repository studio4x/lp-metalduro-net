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
            let zapText = `Olá! Gostaria de saber mais sobre este produto e solicitar uma avaliação.\n\n`;
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
    
    /* --- GALERIA DE FOTOS (SCROLL NATIVO RE-IMPLANTADO) --- */
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    
    if (track && nextButton && prevButton) {
        nextButton.addEventListener('click', () => {
            const slideWidth = track.querySelector('.carousel-slide').offsetWidth;
            const maxScroll = track.scrollWidth - track.clientWidth;
            
            if (track.scrollLeft >= maxScroll - 5) {
                // Fim da galeria, rola inicio suave
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        });
        
        prevButton.addEventListener('click', () => {
            const slideWidth = track.querySelector('.carousel-slide').offsetWidth;
            
            if (track.scrollLeft <= 5) {
                // Inicio da galeria, rola final suave
                track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
            }
        });
    }
});
