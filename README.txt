REPORTES DE MANTENIMIENTO

Archivos HTML:
- horometros_datos.html
- horometros_turnos.html
- mantenimiento_compresores.html
- mantenimiento_generadores.html

Archivos JS:
- reporte-horometros.js
- reporte-horometros-turnos.js
- reporte-compresores.js
- reporte-generadores.js
- reporte-utils.js

IMPORTANTE:
Los JS asumen inicialmente estos endpoints:
  GET /horometro_maquinas
  GET /mantenimiento_criticos

Si tu API usa otras rutas, cambia solamente la constante ENDPOINT al comienzo de cada JS.

Los JS reutilizan API_BASE o API_URL si api-config.js las define.

REPORTE DE TURNOS:
Para cada máquina se ordenan los registros por dia_registro + fecha_envio + id.
Horas del turno = lectura actual - lectura anterior.
Si la lectura actual es 0, la lectura anterior es 0 o no existe lectura anterior, el resultado es 0.
Si la resta resulta negativa, se muestra 0 para evitar horas negativas por reinicio/corrección del horómetro.
