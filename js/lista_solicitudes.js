let datos = [];
let ordenAsc = true;
let columnaOrden = "id"; // columna inicial
let ordenInicialDesc = true;
let filaSeleccionadaId = null;

// Cargar datos desde backend (solo ordenes)
async function cargarOrdenes() {
  try {
    const res = await API_FETCH('/api/ordenes');
    let data = await res.json();

    // Ordenar por id descendente y limitar a 1500
    datos = data.sort((a, b) => b.id - a.id).slice(0, 1500);

    renderTabla(datos);

    // marcar encabezado ID con indicador ▼
    const thId = document.querySelector('th[data-col="id"]');
    if (thId) thId.classList.add("desc");
    ordenAsc = false;
    columnaOrden = "id";
  } catch (err) {
    console.error("Error cargando ordenes:", err);
  }
}

function formatFecha(value) {
  if (!value && value !== 0) return '';

  const texto = String(value).trim();
  if (!texto) return '';

  const match = texto.match(/^\s*(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?\s*$/i);
  if (match) {
    const [, año, mes, dia, hora, minutos, segundos] = match;
    return `${dia}/${mes}/${año} ${hora}:${minutos}${segundos ? `:${segundos}` : ''}`;
  }

  return texto;
}

function normalizarTexto(value) {
  return String(value || "").trim().toLowerCase();
}

function claseEstadoFila(row) {
  const progreso = normalizarTexto(row.progreso);
  const estadoEjecucion = normalizarTexto(row.estado_ejecucion);

  if (progreso === "baja" || progreso === "de baja") return "estado-baja";
  if (progreso === "reprogramado") return "estado-reprogramado";

  if (progreso === "completado") {
    if (estadoEjecucion === "en plazo") return "estado-completado-plazo";
    if (estadoEjecucion === "con retraso") return "estado-completado-retraso";
  }

  if (progreso === "no iniciado") {
    const vencimiento = row.fecha_vencimiento ? new Date(String(row.fecha_vencimiento).replace(' ', 'T')) : null;
    const ahora = new Date();
    return vencimiento && !Number.isNaN(vencimiento.getTime()) && vencimiento < ahora
      ? "estado-vencido"
      : "estado-pendiente";
  }

  return "";
}

// Renderizar tabla
function renderTabla(data) {
  const tbody = document.querySelector("#tablaOrdenes tbody");
  tbody.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");
    const claseEstado = claseEstadoFila(row);
    if (claseEstado) tr.classList.add(claseEstado);
    if (String(row.id) === String(filaSeleccionadaId)) tr.classList.add("fila-seleccionada");
    tr.addEventListener("click", () => {
      filaSeleccionadaId = row.id;
      document.querySelectorAll("#tablaOrdenes tbody tr").forEach(fila => {
        fila.classList.toggle("fila-seleccionada", fila === tr);
      });
    });
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.NE || ""}</td>
      <td>${row.codigo || ""}</td>
      <td>${row.maquina_equipo || ""}</td>
      <td>${row.nombre_declarado || ""}</td>
      <td>${row.averia || ""}</td>
      <td>${row.prioridad || ""}</td>
      <td>${row.solicitado || ""}</td>
      <td>${row.sector || ""}</td>
      <td>${row.registrado || ""}</td>
      <td>${formatFecha(row.fecha_inicio)}</td>
      <td>${formatFecha(row.fecha_vencimiento)}</td>
      <td>${formatFecha(row.fecha_final)}</td>
      <td>${row.reparacion || ""}</td>
      <td>${row.responsable || ""}</td>
      <td>${row.apoyo || ""}</td>
      <td>${row.categoria || ""}</td>
      <td>${row.clasificacion || ""}</td>
      <td>${row.costo_repuestos || ""}</td>
      <td>${row.unidad_mo || ""}</td>
      <td>${row.horas || ""}</td>
      <td>${row.total_mo || ""}</td>
      <td>${row.total_costo || ""}</td>
      <td>${row.notas || ""}</td>
      <td>${row.progreso || ""}</td>
      <td>${row.estado_ejecucion || ""}</td>
      <td>${row.carga || ""}</td>
      <td>${row.horas_paro || ""}</td>
      <td>${row.horas_mes || ""}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Ordenar por columna al hacer clic en el encabezado
document.querySelectorAll("#tablaOrdenes th").forEach(th => {
  th.addEventListener("click", () => {
    const col = th.getAttribute("data-col");
    if (!col) return;

    document.querySelectorAll("#tablaOrdenes th").forEach(h => {
      h.classList.remove("asc", "desc");
    });

    if (columnaOrden === col) {
      ordenAsc = !ordenAsc;
    } else {
      columnaOrden = col;
      ordenAsc = true;
    }

    datos.sort((a, b) => {
      let valA = (a[col] || "").toString().toLowerCase();
      let valB = (b[col] || "").toString().toLowerCase();

      if (!isNaN(valA) && !isNaN(valB) && valA !== "" && valB !== "") {
        return ordenAsc ? valA - valB : valB - valA;
      } else {
        return ordenAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });

    th.classList.add(ordenAsc ? "asc" : "desc");
    renderTabla(datos);
  });
});

// Buscador dinámico
document.getElementById("buscador").addEventListener("input", e => {
  const palabras = e.target.value.toLowerCase().split(" ").filter(p => p);
  const filtrados = datos.filter(row => {
    const campos = `${row.codigo || ""} ${row.nombre_declarado || ""} ${row.maquina_equipo || ""}`.toLowerCase();
    return palabras.every(p => campos.includes(p));
  });
  renderTabla(filtrados);
});

// Ejecutar carga inicial
cargarOrdenes();
