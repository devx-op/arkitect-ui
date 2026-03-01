# Proposal: Component Patterns Standardization

## Intent

Realizar code review de todos los componentes de React y Solid para asegurar que usan los patrones correctos de Ark UI. El objetivo NO es agregar variantes CVA (no requerido), sino asegurar:

1. Uso de Ark UI primitives cuando existen (no implementaciones custom)
2. Uso correcto de `asChild` prop para composición
3. Uso de Ark Factory solo cuando no hay primitives (como Button)
4. Uso de ID Composition con `ids` prop para accesibilidad
5. Uso correcto de Context/hooks para acceder estado

## Scope

### In Scope

- Revisar componentes Lote 1: badge, card, checkbox, select, separator
- Revisar componentes Lote 2: skeleton, avatar, empty, collapsible, alert-dialog, sheet, float, combobox, sidebar, toast
- Revisar componentes Lote 3: center, grid-pattern, grid, chart, copy-id-button, marquee, input-group, textarea, tooltip, stack
- Verificar uso correcto de Ark UI primitives en packages/react y packages/solid
- Documentar componentes que necesitan refactoring

### Out of Scope

- Agregar nuevas variantes CVA (fuera del alcance)
- Cambiar la API pública de los componentes
- Modificar implementación de estilos

## Approach

Realizar revisión por lotes siguiendo el checklist de verificación:

### Checklist de Verificación por Componente

| Pattern        | Pregunta de Verificación                                                         |
| -------------- | -------------------------------------------------------------------------------- |
| Ark Primitives | ¿Existe Ark UI primitive para este componente? Si existe, ¿se usa correctamente? |
| asChild        | ¿Soporta el componente el patrón de composición con `asChild`?                   |
| Ark Factory    | Si no hay primitive, ¿se usa Ark Factory correctamente (ej: Button)?             |
| ID Composition | ¿Los componentes que requieren IDs compartidos usan `ids` prop?                  |
| State Access   | ¿Se usa el patrón correcto para acceder estado (Context/hooks)?                  |

### Componentes con Ark UI Primitives Disponibles

- Checkbox → CheckboxPrimitives
- Select → SelectPrimitives
- Combobox → ComboboxPrimitives
- Dialog (AlertDialog, Sheet) → DialogPrimitives
- Toast → createToaster from @ark-ui/react/toast
- Tooltip → TooltipPrimitives
- Collapsible → AccordionPrimitives (reusado)
- Button → ark.button (Factory)

### Componentes Custom (sin primitive)

- Badge, Card, Separator, Sidebar, Center, Float, InputGroup, Empty, Skeleton, Textarea, Grid, Grid-Pattern, Stack, Marquee, CopyIdButton, Chart

### Hallazgos Iniciales (a verificar en detalle)

| Componente        | Estado Actual              | Problema Identificado                                              |
| ----------------- | -------------------------- | ------------------------------------------------------------------ |
| Avatar            | Custom `<span>`            | **PENDIENTE**: Existe `AvatarPrimitives` en Ark UI - debe migrarse |
| Button            | Usa `ark.button` (Factory) | ✅ Correcto - usa Factory cuando no hay primitive                  |
| Checkbox          | Usa `CheckboxPrimitives`   | ✅ Correcto                                                        |
| Select            | Usa `SelectPrimitives`     | ✅ Correcto                                                        |
| Combobox          | Usa `ComboboxPrimitives`   | ✅ Correcto                                                        |
| AlertDialog       | Usa `DialogPrimitives`     | ✅ Correcto                                                        |
| Sheet             | Usa `DialogPrimitives`     | ✅ Correcto                                                        |
| Collapsible       | Usa `AccordionPrimitives`  | ✅ Correcto                                                        |
| Toast             | Usa `createToaster`        | ✅ Correcto                                                        |
| Tooltip           | Usa `TooltipPrimitives`    | ✅ Correcto                                                        |
| Badge             | Custom `<span>`            | ✅ Correcto - no hay primitive en Ark UI                           |
| Card              | Custom `<div>`             | ✅ Correcto - no hay primitive en Ark UI                           |
| Separator         | Custom `<div>`             | ✅ Correcto - no hay primitive en Ark UI                           |
| Textarea          | Custom `<textarea>`        | ✅ Posible: usar `Field.Textarea` de Ark UI                        |
| Sidebar           | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| Center            | Custom `<div>`             | ✅ Correcto - no hay primitive en Ark UI                           |
| Float             | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| InputGroup        | Custom wrapper             | ✅ Correcto - no hay primitive en Ark UI                           |
| Empty             | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| Skeleton          | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| Grid/Grid-Pattern | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| Stack             | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| Marquee           | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| CopyIdButton      | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |
| Chart             | Custom                     | ✅ Correcto - no hay primitive en Ark UI                           |

## Affected Areas

| Area                                     | Impact   | Description             |
| ---------------------------------------- | -------- | ----------------------- |
| `packages/react/src/components/ui/*.tsx` | Modified | Revisar patrones Ark UI |
| `packages/solid/src/components/ui/*.tsx` | Modified | Revisar patrones Ark UI |

## Risks

| Risk                               | Likelihood | Mitigation                                      |
| ---------------------------------- | ---------- | ----------------------------------------------- |
| Breaking changes en API pública    | Low        | Solo verificación, no cambios de implementación |
| Incompatibilidad entre React/Solid | Low        | Revisar cada package independientemente         |

## Rollback Plan

- No se realizan cambios de código en esta fase
- Solo se documentan los hallazgos en un reporte de code review
- Si se decide implementar cambios, se crea un nuevo change para eso

## Dependencies

- Ninguna dependencia externa

## Success Criteria

- [ ] Componentes Lote 1 revisados y documentados
- [ ] Componentes Lote 2 revisados y documentados
- [ ] Componentes Lote 3 revisados y documentados
- [ ] Reporte de code review generado con hallazgos
- [ ] Lista de componentes que necesitan refactoring documentada

## Hallazgos de Revisión Inicial

### Input component - Ya usa Ark UI

El componente `Input` en packages/react y packages/solid ya usa `FieldPrimitives.Input` de Ark UI.

### Verificación de asChild

- ✅ Button tiene soporte para `asChild`
- ✅ Sheet usa `asChild` en CloseTrigger
- ✅ Dialog usa `asChild` en CloseTrigger
- ✅ Los stories demuestran uso correcto de `asChild`

### Componentes que pueden necesitar refactoring

1. **Avatar** - Usa implementación custom pero existe `AvatarPrimitives` en Ark UI
2. **Textarea** - Usa implementation custom pero podría usar `FieldPrimitives.Textarea` de Ark UI

### Revisión de packages completa

| Package | Componentes con Primitives                                                                                 | Componentes Custom                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React   | checkbox, select, combobox, dialog, alert-dialog, sheet, collapsible, toast, tooltip, input, dropdown-menu | badge, card, separator, avatar*, textarea*, sidebar, center, float, input-group, empty, skeleton, grid, grid-pattern, stack, marquee, copy-id-button, chart |
| Solid   | checkbox, select, combobox, dialog, alert-dialog, sheet, collapsible, toast, tooltip, input, dropdown-menu | badge, card, separator, avatar*, textarea*, sidebar, center, float, input-group, empty, skeleton, grid, grid-pattern, stack, marquee, copy-id-button, chart |

*Componentes marcados con * tienen primitive disponible en Ark UI pero usan implementación custom
