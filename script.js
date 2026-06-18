// =====================================================================
// CONFEITARIA ÂMBAR — interações do site (vanilla JS, sem dependências)
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Ano atual no rodapé ---------- */
  const anoEl = document.getElementById('anoAtual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---------- Cabeçalho: sombra ao rolar ---------- */
  const header = document.querySelector('.site-header');
  const onScrollHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  const closeMenu = () => {
    navbar.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navbar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Destaque do link ativo conforme a seção visível ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ---------- Revelar seções ao rolar ---------- */
  const revealTargets = document.querySelectorAll(
    '.mini-card, .dif-card, .produto-card, .galeria-item, .depoimento-card, .equipe-card, .accordion-item, .local-grid > *, .contato-grid > *'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contador animado (Números da Empresa) ---------- */
  const counters = document.querySelectorAll('.numero-valor');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString('pt-BR') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  /* ---------- Accordion do FAQ ---------- */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Fecha os outros itens (acordeão exclusivo)
      document.querySelectorAll('.accordion-trigger').forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
    });
  });

  /* ---------- Carrossel de depoimentos ---------- */
  const track = document.getElementById('depoimentosTrack');
  const btnPrev = document.getElementById('depAnterior');
  const btnNext = document.getElementById('depProximo');
  if (track && btnPrev && btnNext) {
    const scrollByCard = (dir) => {
      const card = track.querySelector('.depoimento-card');
      const gap = 24;
      const distance = (card ? card.offsetWidth : 320) + gap;
      track.scrollBy({ left: dir * distance, behavior: 'smooth' });
    };
    btnPrev.addEventListener('click', () => scrollByCard(-1));
    btnNext.addEventListener('click', () => scrollByCard(1));
  }

  /* ---------- Galeria: modal / lightbox ---------- */
  const modal = document.getElementById('galeriaModal');
  const modalCaption = document.getElementById('modalCaption');
  const modalIcon = document.getElementById('modalIcon');
  let lastFocused = null;

  const openModal = (item) => {
    const caption = item.dataset.caption || item.querySelector('.galeria-label').textContent;
    const useEl = item.querySelector('use');
    modalCaption.textContent = caption;
    if (useEl) modalIcon.innerHTML = `<use href="${useEl.getAttribute('href')}"></use>`;
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-close').focus();
  };
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', () => openModal(item));
  });
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------- Botão "voltar ao topo" ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 480);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Formulário de contato (validação client-side) ----------
     Este site é uma demonstração estática (sem back-end). O envio real
     pode ser conectado depois a um serviço como Formspree, EmailJS ou
     a uma API própria — ver README.md para instruções.            */
  const form = document.getElementById('contatoForm');
  const feedback = document.getElementById('formFeedback');

  const setError = (field, message) => {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = message;
    field.classList.toggle('is-invalid', Boolean(message));
  };

  const validateField = (field) => {
    if (field.hasAttribute('required') && !field.value.trim()) {
      setError(field, 'Esse campo é obrigatório.');
      return false;
    }
    if (field.type === 'email' && field.value) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (!emailOk) {
        setError(field, 'Digite um e-mail válido.');
        return false;
      }
    }
    setError(field, '');
    return true;
  };

  if (form) {
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = Array.from(form.querySelectorAll('input, select, textarea'));
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        feedback.textContent = 'Verifique os campos destacados antes de enviar.';
        feedback.style.color = 'var(--color-berry-700)';
        return;
      }

      feedback.style.color = 'var(--color-green-800)';
      feedback.textContent = 'Enviando…';

      // Simulação de envio (não há back-end neste projeto de demonstração).
      setTimeout(() => {
        feedback.textContent = `Obrigado! Recebemos sua mensagem e responderemos em breve no e-mail informado.`;
        form.reset();
      }, 700);
    });
  }
});