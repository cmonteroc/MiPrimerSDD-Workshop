# Revisión SDD - Curso-PSWE-07

**Participante:** Carlos Montero  
**Fecha de preparación:** 2026-11-02

## Resumen del proceso SDD seguido

Se aplicó un flujo Spec-Driven Development antes de implementar la aplicación:

1. Se creó una constitución que establece alcance limitado, separación de responsabilidades, trazabilidad, TDD, escalamiento de ambigüedades y evidencia verificable.
2. Se tomó `idea.md` como solicitud original y `requirements/spec-inicial.md` como referencia inicial.
3. Se redactó la especificación de `Curso-PSWE-07` con historias, criterios Given/When/Then, casos de borde, requisitos funcionales, criterios de éxito y alcance excluido.
4. Se contrastaron los documentos de origen para identificar omisiones y contradicciones.
5. Se aclararon decisiones de persistencia, eliminación, filtros y evidencia de usabilidad.
6. Se realizó un plan técnico con HTML, CSS, JavaScript, Node.js y localStorage.
7. Se descompuso el plan en tareas trazables y pruebas.
8. Se realizó un análisis de consistencia entre constitución, especificación, plan y tareas.
9. Se implementó la aplicación en la raíz del repositorio y se creó la suite automatizada.
10. Se registraron en los artefactos los resultados ejecutados y los pendientes no observados.

## Decisiones justificadas y alternativas consideradas

### 1. Confirmación de persistencia

- **Decisión:** Una modificación se considera guardada solamente después de que `localStorage` confirma la escritura. Si falla, la interfaz debe informar que no fue guardada.
- **Justificación:** Evita declarar exitoso un cambio que podría haberse perdido y hace visible el límite entre estado editado y estado persistido.
- **Alternativas:**
  - Considerar exitoso el cambio en memoria y asumir que `localStorage` funcionará.
  - Reintentar automáticamente varias veces sin informar al usuario.
- **Resultado:** La alternativa elegida fue implementada en el módulo de persistencia mediante resultados `ok/error`.

### 2. Navegación después de eliminar

- **Decisión:** Confirmar elimina la tarea y devuelve a la lista; cancelar mantiene la tarea y vuelve al detalle.
- **Justificación:** La eliminación confirmada requiere salir de una vista cuyo objeto ya no existe. Cancelar no altera datos ni obliga al usuario a comenzar de nuevo desde la lista.
- **Alternativas:**
  - Volver siempre a la lista.
  - Permanecer siempre en el detalle tras confirmar.
- **Resultado:** Quedó definido en la especificación y se implementó el comportamiento correspondiente.

### 3. Tecnología de implementación

- **Decisión:** Aplicación web con HTML, CSS, JavaScript ES Modules, Node.js para el servidor estático y `node --test` para las pruebas.
- **Justificación:** Resuelve un alcance sencillo sin frameworks ni servicios externos, según el plan aprobado.
- **Alternativas:**
  - React, Angular u otro framework.
  - Backend con base de datos externa.
- **Resultado:** Se mantuvo una solución sin dependencias de ejecución. El servidor estático y las pruebas usan capacidades integradas de Node.js.

### 4. Persistencia local

- **Decisión:** Encapsular `localStorage` detrás de un módulo independiente.
- **Justificación:** Permite probar y reemplazar el acceso a almacenamiento sin mezclarlo con la lógica o la interfaz.
- **Alternativas:**
  - Acceso directo a `localStorage` desde `app.js`.
  - Persistencia mediante servicios externos.
- **Resultado:** Se creó `src/task-store.js`, excluyendo servicios externos y manteniendo separadas las responsabilidades.

### 5. Cambio de estado desde filtro

- **Decisión:** El detalle permanece abierto al cambiar el estado y, al volver, se reaplica el filtro activo.
- **Justificación:** Evita que el usuario pierda contexto en el detalle y permite que la lista refleje inmediatamente el nuevo estado.
- **Alternativas:**
  - Volver automáticamente a la lista.
  - Conservar el filtro sin reaplicarlo visualmente.
- **Resultado:** Se dejó explícito en el requisito FR-014A y en las tareas correspondientes.

## Hallazgos del análisis y resolución

El análisis transversal encontró hallazgos principalmente relacionados con cobertura verificable y decisiones pendientes:

| Hallazgo | Resolución |
|---|---|
| DEC-001 no establecía valores exactos de color, tipografía ni color de advertencia. | Se mantuvo pendiente en lugar de inventar una decisión; el alcance visual existente se conserva. |
| DEC-003 no fijaba puntos de corte responsive ni anchos representativos. | Se mantuvo pendiente y se añadió evidencia responsive futura basada en viewport documentado. |
| La fecha de ratificación de la constitución era desconocida. | Se conservó como `TODO(RATIFICATION_DATE)` y se registró como pendiente de confirmación. |
| SC-001, SC-002 y SC-003 requerían evidencia de usabilidad, pero las tareas existentes no ejecutaban una prueba real con participantes. | Se añadieron tareas específicas T051–T053 para registrar método, participantes, tiempos, resultados y limitaciones. No se marcaron como completadas sin ejecución real. |
| FR-002 debía definir de forma inequívoca el nombre visible y el título del documento. | Se aclaró que ambos deben ser `Curso-PSWE-07`. |
| SC-004 requería persistencia completa después de la recarga. | Se extendió la tarea de integración para cubrir creación, edición, estado, eliminación y recarga completa. |
| El contraste “suficiente” carecía de una medida. | Se especificaron 4.5:1 para texto normal y controles, y 3:1 para texto grande. |
| Era necesaria una prueba de etiquetas dinámicas de estado. | Se amplió T030 para incluir `Mark as done` y `Mark as not done`. |

También se normalizó la terminología de cerrar y reabrir la aplicación. No se eliminaron requisitos ni pruebas para resolver hallazgos; los criterios de éxito se conservaron.

## Resultados reales de las pruebas automatizadas

La suite automatizada ejecutada fue:

```powershell
npm.cmd test
```

Resultado registrado el 2026-11-02:

- **15 pruebas ejecutadas.**
- **15 aprobadas.**
- **0 fallidas.**

Incluye pruebas de:

- creación, edición, validación, estados y filtros;
- persistencia exitosa y fallida;
- lectura de JSON inválido;
- servidor estático;
- integración de la interfaz y contratos observables;
- ausencia de funciones excluidas.

La aplicación se inició con:

```powershell
npm.cmd start
```

Se verificó el servidor estático en `http://localhost:8080`; se observaron respuestas HTTP 200 para `index.html`, `styles.css` y `app.js`.

## Mis verificaciones manuales

Completar este apartado después de ejecutar personalmente cada revisión. No marcar como completado antes de realizarla.

### Datos de la sesión

- **Fecha:**
- **Navegador y versión:**
- **Sistema operativo:**
- **Ancho de móvil:**
- **Ancho de escritorio:**
- **Limitaciones observadas:**

### Revisión en escritorio (T046)

- [ ] Lista, detalle y navegación.
- [ ] Creación con título válido.
- [ ] Rechazo de título vacío o compuesto solo por espacios.
- [ ] Creación sin descripción.
- [ ] Edición, guardado y cancelación.
- [ ] Cancelación de eliminación.
- [ ] Confirmación de eliminación.
- [ ] Cambio de estado.
- [ ] Filtros All, Pending y Done.
- [ ] Persistencia después de cerrar y reabrir.
- [ ] Estados de error de almacenamiento.
- **Resultado:**
- **Evidencia o observaciones:**

### Revisión en móvil (T047)

- [ ] La aplicación se adapta sin ocultar controles requeridos.
- [ ] Los controles interactivos permiten interacción con tamaño adecuado.
- [ ] Lista y detalle conservan legibilidad.
- [ ] No se requieren desplazamientos horizontales.
- **Resultado:**
- **Evidencia o observaciones:**

### Verificación visual y de accesibilidad (T045/T054)

- [ ] Texto normal cumple al menos 4.5:1 de contraste.
- [ ] Texto grande cumple al menos 3:1 de contraste.
- [ ] Controles interactivos efectivos tienen al menos 44 × 44 px.
- [ ] Se realizó la revisión en una resolución móvil.
- [ ] Se realizó la revisión en una resolución de escritorio.
- **Resultado:**
- **Herramienta o método utilizado:**

### Usabilidad con participantes (T051–T053)

Esta sección debe completarse solo si se ejecuta una prueba real con participantes.

#### SC-001 - Crear y abrir detalle

- **Participantes:**
- **Método:**
- **Duración máxima esperada:** dos minutos por participante sin asistencia.
- **Tasa de éxito observada:**
- **Umbral requerido:** al menos 90%.
- **Resultado:**
- **Limitaciones:**

#### SC-002 - Cambiar estado y localizarlo con filtros

- **Participantes:**
- **Método:**
- **Duración máxima esperada:** un minuto por participante sin asistencia.
- **Tasa de éxito observada:**
- **Umbral requerido:** al menos 90%.
- **Resultado:**
- **Limitaciones:**

#### SC-003 - Editar y eliminar mediante confirmación

- **Participantes:**
- **Método:**
- **Duración máxima esperada:** dos minutos por participante sin asistencia.
- **Tasa de éxito observada:**
- **Umbral requerido:** al menos 90%.
- **Resultado:**
- **Limitaciones:**

## Limitaciones

- DEC-001 permanece pendiente: color exacto, familia tipográfica y color de advertencia.
- DEC-003 permanece pendiente: breakpoints y anchos representativos.
- La fecha original de ratificación de la constitución no fue confirmada.
- Las pruebas automatizadas verifican lógica, contratos, estructura y servidor, pero no sustituyen una interacción real en navegador.
- No se ejecutaron pruebas manuales ni pruebas con participantes dentro de los resultados registrados.
- La suite actual no usa un navegador automatizado para manipular DOM y `localStorage`.
- Las comprobaciones de contraste, tamaño táctil, responsive y usabilidad requieren evidencia humana o automatizada adicional.

## Reflexión crítica sobre el uso de IA

La IA fue útil para estructurar el proceso, detectar preguntas pendientes, mantener trazabilidad entre artefactos y convertir requisitos en tareas verificables. También aceleró la separación inicial de diseño, pruebas e implementación.

Sin embargo, su uso requiere revisión humana porque puede producir propuestas consistentes en lenguaje pero no justificadas por el producto, omitir contrastes con documentos existentes o convertir supuestos en decisiones. En este trabajo se evitaron valores visuales cuando faltaba una decisión aprobada y se mantuvieron pendientes las decisiones que afectan comportamiento o alcance.

La automatización tampoco debe confundirse con evidencia de experiencia real: una prueba que pasa confirma el comportamiento implementado bajo esa prueba, pero no demuestra por sí sola usabilidad con participantes, legibilidad visual ni funcionamiento completo en todos los navegadores.

Por ello, el proceso SDD fue más fiable cuando los artefactos se trataron como contratos sujetos a revisión crítica, y no como texto que la IA debía completar sin validar.
