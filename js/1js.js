const form = document.getElementById('form-contacto');
const statusBox = document.getElementById('status');
const btnEnviar = document.getElementById('btn-enviar');

const fields = {
  nombre: {
    el: document.getElementById('nombre'),
    err: document.getElementById('error-nombre'),
    validate: (v) => v.trim().length >= 2 || 'El nombre debe tener al menos 2 caracteres.'
  },
  email: {
    el: document.getElementById('email'),
    err: document.getElementById('error-email'),
    validate: (v) => /^\S+@\S+\.\S+$/.test(v) || 'Ingresa un correo válido.'
  },
  asunto: {
    el: document.getElementById('asunto'),
    err: document.getElementById('error-asunto'),
    validate: (v) => v.trim().length > 0 || 'El asunto es obligatorio.'
  },
  mensaje: {
    el: document.getElementById('mensaje'),
    err: document.getElementById('error-mensaje'),
    validate: (v) => v.trim().length >= 10 || 'El mensaje debe tener al menos 10 caracteres.'
  },
  acepto: {
    el: document.getElementById('acepto'),
    err: null,
    validate: (checked) => checked || 'Debes aceptar la política de privacidad.'
  }
};

// Mostrar error
function setError(key, msg) {
  const { el, err } = fields[key];
  if (err) err.textContent = msg || '';
  el.setCustomValidity(msg ? msg : '');
}

// Validar un campo
function validateField(key) {
  const { el, validate } = fields[key];
  const value = el.type === 'checkbox' ? el.checked : el.value;
  const result = validate(value);
  if (result !== true) {
    setError(key, result);
    return false;
  }
  setError(key, '');
  return true;
}


for (const key of Object.keys(fields)) {
  const { el } = fields[key];
  el.addEventListener('input', () => validateField(key));
  el.addEventListener('blur', () => validateField(key));
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();

 
  let ok = true;
  for (const key of Object.keys(fields)) {
    ok = validateField(key) && ok;
  }
  if (!ok) {
    statusBox.textContent = 'Revisa los campos marcados en rojo.';
    return;
  }

 
  btnEnviar.classList.add('is-loading');
  statusBox.textContent = 'Enviando...';

  try {
  
    await new Promise((res) => setTimeout(res, 1200));

    

    form.reset();
    statusBox.textContent = '¡Gracias! Tu mensaje ha sido enviado.';
  } catch (err) {
    statusBox.textContent = 'Ocurrió un error al enviar. Intenta nuevamente.';
  } finally {
    btnEnviar.classList.remove('is-loading');
  }
});

