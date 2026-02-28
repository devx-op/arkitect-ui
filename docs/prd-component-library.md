# PRD: Arkitect UI - Biblioteca de Componentes UI

## Resumen Ejecutivo

Arkitect UI es una biblioteca de componentes UI que ofrece compatibilidad API externa con Shadcn UI mientras utiliza Ark UI internamente como primitive. El proyecto soporta tanto React como Solid.js con la misma API pública, permitiendo a los desarrolladores migrar fácilmente desde Shadcn o usar la biblioteca con cualquier framework soportado.

## Estado Actual del Proyecto

### Componentes Existentes

| Componente    | React | Solid | Stories |
| ------------- | ----- | ----- | ------- |
| button        | ✅    | ✅    | ✅      |
| input         | ✅    | ✅    | ✅      |
| label         | ✅    | ✅    | ✅      |
| dialog        | ✅    | ✅    | ✅      |
| dropdown-menu | ✅    | ✅    | ✅      |

### Estructura del Proyecto

```
packages/
├── react/           # Componentes React
│   └── src/
│       ├── components/ui/
│       └── index.ts
├── solid/           # Componentes Solid.js
│   └── src/
│       ├── components/ui/
│       └── index.tsx
└── shared/          # Utilidades compartidas
apps/
├── docs/            # Documentación (Astro Starlight)
└── ...
```

## Requisitos del Proyecto

### Alcance

Implementar 30 componentes UI para ambos paquetes (React + Solid) manteniendo compatibilidad API con Shadcn UI:

**Lote 1 (10 componentes)**

- button (existente)
- input (existente)
- label (existente)
- dialog (existente)
- dropdown-menu (existente)
- badge (NUEVO)
- card (NUEVO)
- checkbox (NUEVO)
- select (NUEVO)
- separator (NUEVO)

**Lote 2 (10 componentes)**

- alert-dialog
- avatar
- collapsible
- combobox
- empty
- float
- sheet
- sidebar
- skeleton
- sonner

**Lote 3 (10 componentes)**

- center
- chart
- copy-id-button
- data-table
- data-table-filters
- grid-pattern
- grid
- infinite-slider
- input-group
- textarea
- tooltip

### Compatibilidad API con Shadcn

Todos los componentes deben mantener compatibilidad API con Shadcn UI:

#### Exportación de Componentes

```typescript
// shadcn
import { Button, buttonVariants } from "@/components/ui/button"

// arkitect (misma API)
import { Button, buttonVariants } from "@arkitect-ui/react"
```

#### Props y Tipos

- Mantener mismos nombres de props que Shadcn
- Soportar todas las variantes de Shadcn
- Mantener tipos de TypeScript compatibles
- Usar forwardRef para compatibilidad de refs

#### Estilos CSS

- Usar clases Tailwind CSS idénticas a Shadcn
- Mantener data attributes para estados (data-[state=open], etc.)
- Soportar tokens de diseño de Shadcn

### Requisitos Técnicos

#### Stack Tecnológico

- **Framework UI**: React 19, Solid.js 1.9
- **Primitives**: Ark UI (@ark-ui/react, @ark-ui/solid)
- **Estilos**: Tailwind CSS v4
- **Variantes**: class-variance-authority (CVA)
- **Iconos**: Tabler Icons (@tabler/icons-react, @tabler/icons-solidjs)
- **Testing**: Vitest
- **Documentación**: Storybook, Astro Starlight

#### Patrones de Implementación

**React:**

```typescript
import { Component } from "@ark-ui/react"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "variant-classes",
    },
    size: {
      default: "size-classes",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ComponentProps extends ComponentProps<"element">, VariantProps<typeof componentVariants> {
  asChild?: boolean
}

const Component = forwardRef<HTMLElementType, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <ComponentPrimitive
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)
Component.displayName = "Component"

export { Component, componentVariants }
```

**Solid:**

```typescript
import { Component } from "@ark-ui/solid"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-classes", {/* ... */})

export interface ComponentProps extends ComponentProps<"element">, VariantProps<typeof componentVariants> {}

export const Component = (props: ComponentProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size"])

  return (
    <ComponentPrimitive
      class={cn(componentVariants({
        variant: local.variant,
        size: local.size,
        class: local.class,
      }))}
      {...rest}
    />
  )
}
```

#### Diferencias Clave Ark UI vs Radix

| Radix (Shadcn)  | Ark UI                            |
| --------------- | --------------------------------- |
| Menu.Root       | Menu.Root                         |
| Menu.Trigger    | Menu.Trigger                      |
| Menu.Content    | Menu.Content + Positioner         |
| Menu.Item       | Menu.Item (requiere prop `value`) |
| Menu.RadioGroup | Menu.RadioItemGroup               |
| Portal          | Positioner                        |

## Requisitos de Testing

### Tests Unitarios (Vitest)

Cada componente debe incluir:

- Tests para variantes
- Tests para sizes
- Tests para estados (disabled, focus, etc.)
- Tests para props personalizadas
- Tests de accesibilidad básica

```typescript
// Ejemplo estructura test
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Component } from "./component"

describe("Component", () => {
  it("renders with default variant", () => {
    render(<Component>Content</Component>)
    expect(screen.getByText("Content")).toBeDefined()
  })

  it("renders with custom variant", () => {
    render(<Component variant="secondary">Content</Component>)
    expect(screen.getByText("Content")).toBeDefined()
  })

  it("handles disabled state", () => {
    render(<Component disabled>Content</Component>)
    expect(screen.getByText("Content")).toBeDisabled()
  })
})
```

### Stories (Storybook)

Cada componente debe incluir stories para:

- Default/state básico
- Todas las variantes
- Todos los sizes
- Estados interactivos (hover, focus, disabled)
- Casos de uso comunes

```typescript
// Ejemplo estructura story
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Component } from "./component"

const meta: Meta<typeof Component> = {
  title: "React/UI/Component",
  component: Component,
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => <Component>Content</Component>,
}

export const VariantSecondary: Story = {
  render: () => <Component variant="secondary">Content</Component>,
}
```

## Requisitos de Documentación

### Documentación MDX

Cada componente debe tener documentación en `apps/docs/src/content/docs/react/components/` y `apps/docs/src/content/docs/solid/components/`:

````mdx
---
title: Component Name
description: Description of the component.
---

import { Tabs, TabItem, Code } from "@astrojs/starlight/components"
import ComponentPreview from "@/components/ComponentPreview.astro"

## Component

<ComponentPreview />

## Installation

<Tabs>
  <TabItem label="CLI">
    npx shadcn@latest add https://devx-op.github.io/arkitect-ui/r/r/component.json
  </TabItem>
  <TabItem label="Manual">
    <Code code={componentCode} lang="tsx" />
  </TabItem>
</Tabs>

## Usage

```tsx
import { Component } from "@arkitect-ui/react"
````

## Props

| Prop    | Type                     | Default   | Description           |
| ------- | ------------------------ | --------- | --------------------- |
| variant | "default" \| "secondary" | "default" | Visual style          |
| size    | "sm" \| "md" \| "lg"     | "md"      | Size of the component |

````
### Actualización de Archivos

#### exports (index.ts / index.tsx)

```typescript
export * from "./components/ui/new-component"
````

#### registry.json

```json
{
  "name": "r/new-component",
  "type": "registry:ui",
  "title": "React New Component",
  "description": "New component for react",
  "author": "Arkitect-UI (http://devx-ops https://devx-op.github.io/arkitect-ui/)",
  "dependencies": ["@ark-ui/react", "@tabler/icons-react"],
  "files": [{
    "path": "packages/react/src/components/ui/new-component.tsx",
    "type": "registry:ui"
  }]
},

{
  "name": "s/new-component",
  "type": "registry:ui",
  "title": "Solid New Component",
  "description": "New Component for solid",
  "author": "Arkitect-UI (http://devx-ops https://devx-op.github.io/arkitect-ui/)",
  "dependencies": [
    "@ark-ui/solid", "@tabler/icons-solid"
  ],
  "files": [
    {
      "path": "packages/solid/src/components/ui/new-component.tsx",
      "type": "registry:ui";
    }
  ]
},
```

#### Sidebar Navigation (astro.config.ts)

```typescript
{
  label: "Components",
  items: [
    "react/components/button",
    "react/components/new-component",
  ],
}
```

## Skill de Creación de Componentes

### Ubicación

Extender el documento existente en `docs/componet-creation-guide.md` con instrucciones específicas para esta iniciativa.

### Contenido de la Skill

1. **Análisis de Referencia**: Cómo obtener código de Shadcn
2. **Mapeo Radix → Ark UI**: Tabla de conversiones
3. **Templates**: Código base para React y Solid
4. **Checklist**: Lista de verificación de implementación
5. **Patrones Comunes**: Soluciones a problemas frecuentes
6. **Errores Comunes**: Troubleshooting guide

## Proceso de QA

### Verificación Local

```bash
# Build de componentes
nx run react:build
nx run solid:build

# Typecheck
nx run react:typecheck
nx run solid:typecheck

# Lint
nx run react:lint
nx run solid:lint

# Tests
nx run react:test
nx run solid:test
```

### Storybook

- Ejecutar `nx run docs:storybook`
- Verificar todos los stories
- Verificar controls para props
- Verificar documentación inline

### Checklist de Componente

- [ ] Componente React implementado
- [ ] Componente Solid implementado
- [ ] Stories React creadas
- [ ] Stories Solid creadas
- [ ] Tests unitarios creados
- [ ] Exports actualizados en index.ts
- [ ] Exports actualizados en index.tsx
- [ ] Registry actualizado
- [ ] Documentación MDX creada
- [ ] Sidebar actualizado
- [ ] Build pasa
- [ ] Typecheck pasa
- [ ] Tests pasan
- [ ] Manual review en Storybook

## Timeline

### Lote 1 (10 componentes)

- **Duración estimada**: 2-3 semanas
- **Entregables**: 5 componentes nuevos + tests + docs

### Lote 2 (10 componentes)

- **Duración estimada**: 3-4 semanas
- **Entregables**: 10 componentes nuevos + tests + docs

### Lote 3 (10 componentes)

- **Duración estimada**: 3-4 semanas
- **Entregables**: 10 componentes nuevos + tests + docs

**Total estimado**: 8-11 semanas

## Risks y Mitigations

| Risk                               | Impact | Mitigation                               |
| ---------------------------------- | ------ | ---------------------------------------- |
| Complejidad de Ark UI              | Alto   | Documentar patrones en skill             |
| Incompatibilidades de API          | Medio  | Tests exhaustivos, comparison con Shadcn |
| Mantenimiento dual (React + Solid) | Medio  | Templates reutilizables, código paralelo |
| Performance                        | Bajo   | Monitoreo en CI, benchmarks              |

## Métricas de Éxito

- 30 componentes funcionando para React y Solid
- 100% compatibilidad API con Shadcn
- Tests coverage > 80%
- Documentación completa para cada componente
- Build y tests pasando en CI

## Recursos

- [Shadcn UI](https://ui.shadcn.com)
- [Ark UI React](https://ark-ui.com/react)
- [Ark UI Solid](https://ark-ui.com/solid)
- [Tabler Icons](https://tabler.io/icons)
- [Tailwind CSS](https://tailwindcss.com)
