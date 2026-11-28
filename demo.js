const modal = document.getElementById('demoModal');

if (modal) {
  const dialog = modal.querySelector('.modal__box');
  let lastFocusedElement;

  const openModal = event => {
    event.preventDefault();
    lastFocusedElement = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    dialog.focus();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  document.querySelectorAll('[data-demo]').forEach(button => {
    button.addEventListener('click', openModal);
  });

  modal.querySelector('.modal__close').addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

}

document.querySelectorAll('[data-demo-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(form);
    const labels = {
      nombre: 'Nombre',
      taller: 'Taller',
      telefono: 'Teléfono / WhatsApp',
      email: 'Correo electrónico',
      plan: 'Plan de interés',
      mensaje: 'Mensaje'
    };
    const details = Array.from(values.entries())
      .filter(([, value]) => value)
      .map(([name, value]) => `${labels[name]}: ${value}`)
      .join('\n');
    const message = `Hola, quiero solicitar una demo de SYCO.\n\n${details}`;
    window.location.href = `https://wa.me/524442529506?text=${encodeURIComponent(message)}`;
  });
});
