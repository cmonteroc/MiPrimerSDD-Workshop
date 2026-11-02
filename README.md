# Taller de Spec-Driven Development (SDD)

## Objetivo

Analizar y mejorar una especificación de requisitos elaborada con asistencia de inteligencia artificial.

El objetivo no es aceptar automáticamente lo que propone la IA, sino evaluar la calidad de los requisitos, identificar ambigüedades y justificar las decisiones de mejora.

## Caso de estudio

Una aplicación simple que gestiona tareas personales.

La especificación inicial se encuentra en `requirements/spec-inicial.md`.

## Actividades

1. Leer la especificación completa.
2. Identificar al menos tres ambigüedades, supuestos o decisiones pendientes.
3. Proponer mejoras a los criterios de aceptación.
4. Utilizar IA para explorar alternativas y evaluar críticamente sus propuestas.
5. Documentar las decisiones finales y justificarlas.

## Entregables

- Una especificación revisada.
- Al menos tres decisiones de mejora justificadas.
- Una reflexión breve sobre las limitaciones de utilizar IA para definir requisitos.

## Principio de trabajo

Cada cambio debe responder a una necesidad identificada y contar con una justificación.

No es necesario implementar la aplicación en este taller.

## Estructura del repositorio

- `requirements/`: especificación inicial.
- `activities/`: guía de trabajo.
- `deliverables/`: resultados de los estudiantes.

## Aplicación Curso-PSWE-07

La implementación se encuentra en la raíz de este repositorio.

Desde PowerShell, en la raíz:

```powershell
npm.cmd test
npm.cmd start
```

Después abra `http://localhost:8080`. `npm.cmd start` usa el servidor estático incluido y no requiere dependencias.

## Documentación del proyecto

- [Constitución](.specify/memory/constitution.md)
- [Especificación](specs/001-task-management/spec.md)
- [Plan](specs/001-task-management/plan.md)
- [Tareas](specs/001-task-management/tasks.md)
- [Revisión de Carlos Montero](deliverables/revision-carlos-montero.md)