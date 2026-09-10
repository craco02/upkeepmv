const bajaForm = document.getElementById('bajaForm');
const masterKeyModal = document.getElementById('masterKeyModal');
const masterKeyForm = document.getElementById('masterKeyForm');
const masterKeyInput = document.getElementById('masterKey');
const masterKeyMessage = document.getElementById('masterKeyMensaje');
const closeMasterKeyModal = document.getElementById('closeMasterKeyModal');

function cerrarModalClave() {
  masterKeyModal.classList.remove('is-visible');
  masterKeyModal.setAttribute('aria-hidden', 'true');
  masterKeyForm.reset();
  masterKeyMessage.textContent = '';
}

function abrirModalClave() {
  masterKeyModal.classList.add('is-visible');
  masterKeyModal.setAttribute('aria-hidden', 'false');
  masterKeyInput.focus();
}

bajaForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!bajaForm.reportValidity()) return;
  abrirModalClave();
});

closeMasterKeyModal.addEventListener('click', cerrarModalClave);
masterKeyModal.addEventListener('click', event => {
  if (event.target === masterKeyModal) cerrarModalClave();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && masterKeyModal.classList.contains('is-visible')) cerrarModalClave();
});

masterKeyForm.addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = masterKeyForm.querySelector('button[type="submit"]');
  const payload = {
    id: document.getElementById('maquina').value,
    notas: document.getElementById('notas').value.trim(),
    password: masterKeyInput.value
  };

  if (!payload.id) {
    masterKeyMessage.textContent = 'Seleccione una solicitud.';
    return;
  }

  submitButton.disabled = true;
  masterKeyMessage.textContent = '';

  try {
    const response = await API_FETCH('/api/ordenes/baja', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detalle || data.error || 'No se pudo dar de baja la orden.');
    alert(data.message || 'Orden dada de baja.');
    window.location.href = '../pages/lista_solicitudes.html';
  } catch (error) {
    masterKeyMessage.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});