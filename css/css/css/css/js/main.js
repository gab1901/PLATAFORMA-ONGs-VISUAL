// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle - mostra/oculta nav em mobile
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  const navList = document.querySelector('.nav-list');

  if(hamburger){
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      // toggle display
      navList.style.display = expanded ? '' : 'flex';
      navList.style.flexDirection = 'column';
      navList.style.background = 'var(--color-white)';
      navList.style.position = 'absolute';
      navList.style.right = '16px';
      navList.style.top = '64px';
      navList.style.padding = '12px';
      navList.style.boxShadow = '0 8px 24px rgba(11,15,23,0.08)';
    });
  }

  // Dropdown (desktop)
  document.querySelectorAll('.has-dropdown').forEach(item => {
    const btn = item.querySelector('.dropdown-toggle');
    btn.addEventListener('click', (e) => {
      const expanded = item.getAttribute('aria-expanded') === 'true';
      item.setAttribute('aria-expanded', !expanded);
      btn.setAttribute('aria-expanded', !expanded);
    });
    // close when clicking outside
    document.addEventListener('click', (ev) => {
      if(!item.contains(ev.target)) {
        item.setAttribute('aria-expanded', false);
        item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', false);
      }
    });
  });

  // Modal: open / close
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('open-modal');
  const closeBtns = document.querySelectorAll('.modal-close');

  function showModal(){
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function hideModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  if(openModalBtn) openModalBtn.addEventListener('click', showModal);
  closeBtns.forEach(b => b.addEventListener('click', hideModal));
  modal.addEventListener('click', (e) => {
    if(e.target === modal) hideModal();
  });

  // Toasts
  const toastContainer = document.getElementById('toast-container');
  function createToast(message, timeout = 3500){
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    toastContainer.appendChild(t);
    setTimeout(()=> t.classList.add('visible'), 50);
    setTimeout(()=> {
      t.style.opacity = '0';
      setTimeout(()=> t.remove(), 400);
    }, timeout);
  }

  // Form validation (visual)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = form.querySelectorAll('input, textarea');
      let valid = true;
      fields.forEach(f => {
        const error = f.parentElement.querySelector('.field-error');
        if(!f.checkValidity()){
          valid = false;
          error.textContent = f.validationMessage;
        } else {
          error.textContent = '';
        }
      });
      if(valid){
        createToast('Mensagem enviada com sucesso!');
        form.reset();
      } else {
        createToast('Verifique os dados do formulário.');
      }
    });

    // live validation on blur
    form.querySelectorAll('input, textarea').forEach(f => {
      f.addEventListener('input', () => {
        const error = f.parentElement.querySelector('.field-error');
        if(f.checkValidity()) error.textContent = '';
      });
    });
  }

  // Small accessibility: trap focus in modal (simple)
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') hideModal();
  });
});
