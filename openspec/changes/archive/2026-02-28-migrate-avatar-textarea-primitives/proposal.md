# Proposal: Migrar Avatar y Textarea a Ark UI Primitives

## Intent

Migrar los componentes Avatar y Textarea para utilizar los Ark UI Primitives (`@ark-ui/react` y `@ark-ui/solid`) en lugar de implementaciones custom basadas en tags HTML puros. El objetivo es seguir el patrón ShadCN de composición con sub-componentes (Avatar.Root, Avatar.Image, Avatar.Fallback, etc.), proporcionando mejor accesibilidad, estado de carga, y consistencia con el resto del design system.

## Scope

### In Scope

- Refactorizar Avatar en React (`packages/react/src/components/ui/avatar.tsx`) para usar `AvatarPrimitives` de `@ark-ui/react`
- Refactorizar Avatar en Solid (`packages/solid/src/components/ui/avatar.tsx`) para usar `AvatarPrimitives` de `@ark-ui/solid`
- Refactorizar Textarea en React (`packages/react/src/components/ui/textarea.tsx`) para usar `FieldPrimitives.Textarea` de `@ark-ui/react`
- Refactorizar Textarea en Solid (`packages/solid/src/components/ui/textarea.tsx`) para usar `FieldPrimitives.Textarea` de `@ark-ui/solid`
- Mantener API externa compatible (mismas props públicas)
- Actualizar stories si es necesario para demostrar las nuevas capacidades (onStatusChange para Avatar)

### Out of Scope

- No se migrarán otros componentes en este change
- No se creará una nueva API de styling - se mantiene el patrón CVA existente
- No se modifican los ejemplos en `apps/react-example` y `apps/solid-example` a menos que sea necesario para testing

## Approach

### Avatar

Seguir el patrón compound components existente en el proyecto (similar a Select):

```tsx
import { Avatar as AvatarPrimitives } from "@ark-ui/react/avatar"

const Avatar = (props: AvatarPrimitives.RootProps) => (
  <AvatarPrimitives.Root data-slot="avatar" {...props} />
)

const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitives.Image>,
  ComponentProps<typeof AvatarPrimitives.Image>
>((props, ref) => (
  <AvatarPrimitives.Image ref={ref} {...props} />
))

const AvatarFallback = forwardRef<...>((props, ref) => (
  <AvatarPrimitives.Fallback ref={ref} {...props} />
))
```

Beneficios de Ark UI Avatar:

- Estado de carga incorporado (`loaded`, `loading`, `error`)
- `onStatusChange` callback para监听 cambios de estado
- Soporte para delayMs en Fallback para evitar flash
- Mejores atributos de accesibilidad (data-part, data-scope)

### Textarea

Seguir el patrón de Input existente usando FieldPrimitives.Textarea:

```tsx
import { Field as FieldPrimitives } from "@ark-ui/react"

// Textarea usando FieldPrimitives.Textarea
const Textarea = forwardRef<...>((props, ref) => (
  <FieldPrimitives.Textarea ref={ref} className={textareaStyle(...)} {...props} />
))
```

Esto proporciona:

- Integración con el sistema de Field de Ark UI
- Posibilidad de usar Field.Label, Field.HelperMessage en el futuro
- Consistencia con el componente Input existente

## Affected Areas

| Area                                                    | Impact   | Description                                     |
| ------------------------------------------------------- | -------- | ----------------------------------------------- |
| `packages/react/src/components/ui/avatar.tsx`           | Modified | Migrate to AvatarPrimitives compound components |
| `packages/react/src/components/ui/avatar.stories.tsx`   | Modified | Update stories if needed                        |
| `packages/solid/src/components/ui/avatar.tsx`           | Modified | Migrate to AvatarPrimitives compound components |
| `packages/solid/src/components/ui/avatar.stories.tsx`   | Modified | Update stories if needed                        |
| `packages/react/src/components/ui/textarea.tsx`         | Modified | Use FieldPrimitives.Textarea                    |
| `packages/solid/src/components/ui/textarea.tsx`         | Modified | Use FieldPrimitives.Textarea                    |
| `packages/react/src/components/ui/textarea.stories.tsx` | Modified | Update stories if needed                        |
| `packages/solid/src/components/ui/textarea.stories.tsx` | Modified | Update stories if needed                        |

## Risks

| Risk                            | Likelihood | Mitigation                                                                      |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------- |
| Breaking changes en API pública | Low        | Mantener mismo interface de props públicas, solo cambiar implementación interna |
| Comportamiento visual diferente | Low        | Mantener clases CSS existentes, solo añadirdata attributes de Ark UI            |
| Issues con types de Ark UI      | Low        | Verificar tipos con `nx run packages/react:typecheck` antes de commit           |

## Rollback Plan

1. Reversión simple: restaurar los archivos desde git
2. Los archivos están en el directorio `packages/react/src/components/ui/` y `packages/solid/src/components/ui/`
3. Comandos:
   ```bash
   git checkout HEAD -- packages/react/src/components/ui/avatar.tsx
   git checkout HEAD -- packages/react/src/components/ui/textarea.tsx
   git checkout HEAD -- packages/solid/src/components/ui/avatar.tsx
   git checkout HEAD -- packages/solid/src/components/ui/textarea.tsx
   ```

## Dependencies

- `@ark-ui/react` ya está en las dependencias del proyecto
- `@ark-ui/solid` ya está en las dependencias del proyecto
- No se necesitan nuevas dependencias

## Success Criteria

- [ ] `nx run react:typecheck` pasa sin errores
- [ ] `nx run solid:typecheck` pasa sin errores
- [ ] `nx run react:test -- --testPathPattern=avatar` pasa
- [ ] `nx run react:test -- --testPathPattern=textarea` pasa
- [ ] `nx run solid:test -- --testPathPattern=avatar` pasa
- [ ] `nx run solid:test -- --testPathPattern=textarea` pasa
- [ ] Stories de Avatar funcionan correctamente en Storybook
- [ ] Stories de Textarea funcionan correctamente en Storybook
- [ ] API pública permanece compatible (mismas props que antes)
