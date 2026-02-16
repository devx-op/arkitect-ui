---
title: Instalación
description: Instala arkitect-ui para React usando el CLI o manualmente.
---

## Usando el CLI (recomendado)

Si ya tienes un proyecto React con Tailwind configurado, la forma más sencilla de instalar y conectar arkitect-ui es mediante el CLI:

```bash
npx arkitect-ui init
```

Este comando:

- Crea `components.json` con aliases como `@/components/ui` y `@/lib/utils`
- Genera una hoja de estilos global si falta
- Crea un helper `cn` en `src/lib/utils.ts`
- Actualiza la configuración de TypeScript para soportar el alias `@/*`
- Añade un alias `@` a tu configuración de Vite cuando usas Vite

Después instala tu primer componente:

```bash
npx arkitect-ui add button
```

Puedes repetir el comando `add` para cualquier otro componente que quieras instalar.

## Instalación manual

Para instalar directamente el paquete de React:

```bash
pnpm add @ark-ui/react @arkitect-ui/react
```

Además, asegúrate de que:

- Tailwind CSS v4 esté configurado en tu proyecto
- Tu configuración de TypeScript tenga `baseUrl: "."` y `paths["@/*"] = ["./src/*"]`
- Tu bundler (por ejemplo, Vite) tenga un alias `@` que apunte a `./src`
- Crees `src/lib/utils.ts` con un helper `cn` si quieres igualar la configuración que genera el CLI

Con esto listo, puedes copiar componentes desde la documentación a `src/components/ui/` e importarlos usando `@/components/ui/...`.
