let ordenActual = null;

function formatFecha(value) {
  if (!value) return '—';
  const texto = String(value).trim();
  const match = texto.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})/);
  return match ? `${match[3]}/${match[2]}/${match[1]} ${match[4]}:${match[5]}` : texto;
}

function formatFechaEntrega(value) {
  return formatFecha(value);
}

function timestampTemporal() {
  const ahora = new Date();
  const dosDigitos = numero => String(numero).padStart(2, '0');
  return `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())} ${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}:${dosDigitos(ahora.getSeconds())}`;
}

function rellenarCopia(copy, orden, etiqueta) {
  copy.querySelector('.copy-tag').textContent = etiqueta;
  copy.querySelectorAll('[data-field]').forEach(elemento => { elemento.textContent = orden[elemento.dataset.field] || '—'; });
  copy.querySelectorAll('[data-date]').forEach(elemento => {
    const valor = elemento.dataset.date === 'fecha_entrega'
      ? (orden.fecha_entrega || orden.fecha_entrega_temporal)
      : orden[elemento.dataset.date];
    elemento.textContent = elemento.dataset.date === 'fecha_entrega' ? formatFechaEntrega(valor) : formatFecha(valor);
  });
  copy.querySelector('.ts').textContent = `Documento generado el ${formatFecha(new Date().toISOString())}`;
}

function mostrarEntrega(orden) {
  const page = document.getElementById('page');
  const plantilla = document.getElementById('copy-template');
  page.innerHTML = '';
  ['Mantenimiento', 'Operador'].forEach((etiqueta, indice) => {
    const fragmento = plantilla.content.cloneNode(true);
    rellenarCopia(fragmento, orden, etiqueta);
    page.appendChild(fragmento);
    if (indice === 0) {
      const corte = document.createElement('div');
      corte.className = 'cut-line';
      corte.innerHTML = '<span>CORTAR AQUÍ</span>';
      page.appendChild(corte);
    }
  });
}

function headersAutorizados() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function cargarEntrega() {
  const page = document.getElementById('page');
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) { page.textContent = 'No se indicó una orden para imprimir.'; return; }
  try {
    const respuesta = await API_FETCH(`/api/ordenes/${encodeURIComponent(id)}`, { headers: headersAutorizados() });
    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => ({}));
      throw new Error(detalle.error || 'No se pudo cargar la orden seleccionada.');
    }
    ordenActual = await respuesta.json();
    // Se muestra un timestamp provisional; no se persiste hasta pulsar Imprimir.
    if (!ordenActual.fecha_entrega) ordenActual.fecha_entrega_temporal = timestampTemporal();
    mostrarEntrega(ordenActual);
  } catch (error) { page.textContent = error.message; }
}

async function imprimirEntrega() {
  if (!ordenActual) return;
  const boton = document.getElementById('imprimirPaginaEntrega');
  boton.disabled = true;
  boton.textContent = 'Guardando fecha...';
  try {
    // Esta es la única operación que registra fecha_entrega en la base de datos.
    const respuesta = await API_FETCH(`/api/ordenes/${encodeURIComponent(ordenActual.id)}/entrega`, {
      method: 'PUT',
      headers: headersAutorizados()
    });
    const detalle = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok) throw new Error(detalle.error || 'No se pudo guardar la fecha de entrega.');
    ordenActual = detalle;
    mostrarEntrega(ordenActual);
    window.print();
  } catch (error) {
    window.alert(error.message);
  } finally {
    boton.disabled = false;
    boton.textContent = 'Imprimir / Guardar PDF';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('imprimirPaginaEntrega').addEventListener('click', imprimirEntrega);
  cargarEntrega();
});
