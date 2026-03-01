# Design: Migrar Avatar y Textarea a Ark UI Primitives

## Technical Approach

Migrar los componentes Avatar y Textarea para utilizar Ark UI Primitives siguiendo el patrón compound components existente en el proyecto. El objetivo es mantener 100% de compatibilidad de API pública mientras se obtienen los beneficios de Ark UI (estados de carga, atributos de accesibilidad, consistencia con otros componentes).

## Architecture Decisions

### Decision: Avatar — Compound Components Pattern con Ark UI Primitives

**Choice**: Envolver `AvatarPrimitives` de Ark UI con componentes wrapper que mantienen la API existente y aplican estilos CVA.

**Alternatives considered**:

- Usar `AvatarPrimitives` directamente sin wrapper — reduce control sobre estilos y API
- Crear componentes completamente nuevos — rompatibility break

**Rationale**: El proyecto ya usa este patrón en Select, Checkbox, Dialog. Mantiene la API existente (mismas props, mismo comportamiento) mientras permite:

- Aplicar clases CVA para sizes
- Mantener `data-slot="avatar"` para identificación en el sistema
- Preservar backward compatibility completa

```tsx
// packages/react/src/components/ui/avatar.tsx
import { Avatar as AvatarPrimitives } from "@ark-ui/react/avatar"

const Avatar = forwardRef<
  ComponentRef<typeof AvatarPrimitives.Root>,
  ComponentProps<typeof AvatarPrimitives.Root> & VariantProps<typeof avatarSizes>
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitives.Root
    ref={ref}
    data-slot="avatar"
    className={cn("relative flex shrink-0 overflow-hidden rounded-full", avatarSizes({ size }), className)}
    {...props}
  />
))
```

### Decision: Avatar — Cómo Preservar Size Variants con CVA

**Choice**: Mantener el CVA `avatarSizes` existente y aplicarlo como clase en el componente wrapper.

**Alternatives considered**:

- Migrar a Ark UI slot recipes — requiere cambio significativo de arquitectura
- Pasar size directamente a Ark UI — no hay soporte nativo para estos tamaños

**Rationale**: El CVA actual ya funciona correctamente y los usuarios dependen de él. Simplemente cambiamos el elemento raíz de `<span>` a `<AvatarPrimitives.Root>` pero mantenemos la misma lógica de clases.

### Decision: Textarea — Usar FieldPrimitives en lugar de native textarea

**Choice**: Usar `FieldPrimitives.Textarea` de `@ark-ui/react` directamente (similar a cómo Input usa `FieldPrimitives.Input`).

**Alternatives considered**:

- Envolver en `Field.Root` + native `<textarea>` — perdería beneficios de FieldPrimitives
- Usar solo native textarea sin FieldPrimitives — no hay beneficio de migración

**Rationale**: El componente Input existente ya usa este patrón exitosamente. `FieldPrimitives.Textarea` proporciona:

- Integración con sistema de Field de Ark UI
- Posibilidad de usar Field.Label, Field.HelperText en futuro
- Consistencia con componente Input

```tsx
// packages/react/src/components/ui/textarea.tsx
import { Field as FieldPrimitives } from "@ark-ui/react"

const Textarea = forwardRef<
  React.ComponentRef<typeof FieldPrimitives.Textarea>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitives.Textarea> & VariantProps<typeof textareaStyle>
>(({ className, variant, ...props }, ref) => (
  <FieldPrimitives.Textarea
    ref={ref}
    className={cn(textareaStyle({ variant, className }))}
    {...props}
  />
))
```

### Decision: Solid.js — Mismo Patrón que React

**Choice**: Implementar la migración en Solid siguiendo la misma estructura que React, adaptando la sintaxis a Solid.js (splitProps en lugar de forwardRef).

**Alternatives considered**:

- Patrón diferente para Solid — complejidad innecesaria
- Mantener implementación actual en Solid — código inconsistente entre frameworks

**Rationale**: La consistencia cross-framework es un requerimiento explícito del spec. El patrón `splitProps` ya se usa extensivamente en otros componentes Solid del proyecto (Select, etc).

## Data Flow

```
                    React Components
┌─────────────────────────────────────────────────────┐
│  Avatar.tsx                                         │
│  ┌─────────────────────────────────────────────┐   │
│  │ AvatarPrimitives.Root (span)                │   │
│  │   ├── AvatarPrimitives.Image (img)          │   │
│  │   └── AvatarPrimitives.Fallback (span)      │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Textarea.tsx                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │ FieldPrimitives.Textarea (textarea)         │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
    CVA (sizes)                 CVA (variants)
    - default: h-10 w-10        - outline: border...
    - sm: h-8 w-8               - soft: bg-base-100
    - lg: h-12 w-12             - plain: border-none
    - xl: h-16 w-16
```

## File Changes

| File                                                  | Action | Description                                               |
| ----------------------------------------------------- | ------ | --------------------------------------------------------- |
| `packages/react/src/components/ui/avatar.tsx`         | Modify | Migrate to AvatarPrimitives with compound components      |
| `packages/react/src/components/ui/avatar.stories.tsx` | Modify | Update stories to demonstrate new capabilities (optional) |
| `packages/react/src/components/ui/textarea.tsx`       | Modify | Use FieldPrimitives.Textarea                              |
| `packages/solid/src/components/ui/avatar.tsx`         | Modify | Migrate to AvatarPrimitives with compound components      |
| `packages/solid/src/components/ui/avatar.stories.tsx` | Modify | Update stories if needed                                  |
| `packages/solid/src/components/ui/textarea.tsx`       | Modify | Use FieldPrimitives.Textarea                              |

## Interfaces / Contracts

### React Avatar

```typescript
// Props preservadas (no hay cambios en API pública)
interface AvatarProps extends SpanHTMLAttributes<HTMLSpanElement> {
  size?: "default" | "sm" | "lg" | "xl"
}

interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

interface AvatarFallbackProps extends SpanHTMLAttributes<HTMLSpanElement> {}

// Nuevas props disponibles (opcionales, no requerido migrar)
interface AvatarNewProps extends AvatarPrimitives.RootProps {
  onStatusChange?: (details: { loaded: boolean }) => void // Post-migration enhancement
  delayMs?: number // Post-migration enhancement
}
```

### React Textarea

```typescript
// Props preservadas (no hay cambios)
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "outline" | "soft" | "plain"
}
```

### Solid Avatar

```typescript
interface AvatarProps extends ComponentProps<"span"> {
  size?: "default" | "sm" | "lg" | "xl"
}

interface AvatarImageProps extends ComponentProps<"img"> {}

interface AvatarFallbackProps extends ComponentProps<"span"> {}
```

### Solid Textarea

```typescript
interface TextareaProps extends ComponentProps<"textarea"> {
  variant?: "outline" | "soft" | "plain"
}
```

## Testing Strategy

| Layer       | What to Test                                | Approach                                                         |
| ----------- | ------------------------------------------- | ---------------------------------------------------------------- |
| Unit        | Avatar size variants render correct classes | Vitest con renderizado de componente y verificación de className |
| Unit        | Textarea variant classes                    | Vitest verificando clases generadas por CVA                      |
| Unit        | Ref forwarding                              | Verificar que ref apunta al elemento correcto                    |
| Integration | Compound components work together           | Storybook manual + tests de renderizado                          |
| Integration | Cross-framework equivalence                 | Comparar salida DOM entre React y Solid                          |

## Migration / Rollout

No migration de datos requerida. Los cambios son puramente de implementación interna:

1. **Fase 1**: Migrar React Avatar y Textarea
2. **Fase 2**: Migrar Solid Avatar y Textarea
3. **Fase 3**: Verificar que todos los tests pasan
4. **Fase 4**: Storybook verification visual

## Open Questions

- [ ] ¿Deberíamos añadir `data-slot="avatar"` al Avatar.Root para consistencia con otros componentes del proyecto?
- [ ] ¿Exponemos las nuevas props de Ark UI (onStatusChange, delayMs) en la API pública o las mantenemos como enhancement interno?
- [ ] ¿Añadimos stories para demostrar el estado de carga del Avatar post-migración?
