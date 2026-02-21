# Effect v4 Beta Migration Guide

## Resumen Ejecutivo

Esta guía documenta la migración del CLI de Arkitect UI desde Effect v3.19.16 hacia Effect v4.0.0-beta.8. La migración implica cambios significativos en la estructura de paquetes, reorganización de módulos y actualizaciones de API.

**Fecha de migración:** Febrero 2026\
**Versión anterior:** Effect 3.19.16\
**Versión objetivo:** Effect 4.0.0-beta.8\
**Impacto:** Aplicación CLI completa (`apps/cli`)

## Cambios de Dependencias

### Tabla Comparativa de Versiones

| Paquete                 | Versión v3 | Versión v4   | Notas                                      |
| ----------------------- | ---------- | ------------ | ------------------------------------------ |
| `effect`                | 3.19.16    | 4.0.0-beta.8 | Core migrado a v4                          |
| `@effect/cli`           | 0.73.2     | -            | Eliminado - ahora en `effect/unstable/cli` |
| `@effect/platform`      | 0.94.0     | -            | Eliminado - ahora integrado en core        |
| `@effect/platform-node` | 0.104.1    | 4.0.0-beta.8 | Actualizado a v4                           |
| `@effect/vitest`        | 0.27.0     | 4.0.0-beta.0 | Actualizado a v4                           |

### Eliminaciones Importantes

El paquete `@effect/cli` ya no existe como dependencia separada. Su funcionalidad ha sido integrada en el core de Effect bajo el namespace `effect/unstable/cli`.

## Migración de Imports

### Cambios Principales

| v3 (Anterior)                         | v4 (Nuevo)                                | Notas                          |
| ------------------------------------- | ----------------------------------------- | ------------------------------ |
| `@effect/cli/Command`                 | `effect/unstable/cli/Command`             | CLI modules moved              |
| `@effect/cli/Args`                    | `effect/unstable/cli/Argument`            | Renamed: Args → Argument       |
| `@effect/cli/Options`                 | `effect/unstable/cli/Flag`                | Renamed: Options → Flag        |
| `@effect/cli/Prompt`                  | `effect/unstable/cli/Prompt`              | Unchanged                      |
| `@effect/platform/Command`            | `effect/Command`                          | Moved to core                  |
| `@effect/platform/FileSystem`         | `effect/FileSystem`                       | Moved to core                  |
| `@effect/platform/Path`               | `effect/Path`                             | Moved to core                  |
| `@effect/platform/HttpClient`         | `effect/unstable/http/HttpClient`         | HTTP modules moved to unstable |
| `@effect/platform/HttpClientResponse` | `effect/unstable/http/HttpClientResponse` | HTTP modules moved to unstable |

### Estructura de Módulos en v4

En Effect v4, los módulos se organizan de la siguiente manera:

```
effect/
├── Core modules (estables)
│   ├── Command
│   ├── FileSystem
│   ├── Path
│   └── ...
└── unstable/
    ├── cli/          # CLI functionality
    │   ├── Command
    │   ├── Argument  # (formerly Args)
    │   ├── Flag      # (formerly Options)
    │   └── Prompt
    ├── http/         # HTTP functionality
    │   ├── HttpClient
    │   ├── HttpClientResponse
    │   └── ...
    └── ...
```

## Breaking Changes

### 1. API de Schema.Record

**Cambio:** La firma de `Schema.Record` ha cambiado entre v3 y v4.

**v3:**

```typescript
Schema.Record({
  key: Schema.String,
  value: Schema.String,
})
```

**v4:**

```typescript
// La API puede variar - consultar documentación oficial de Effect v4
// Generalmente acepta un Schema para keys y otro para values
Schema.Record(Schema.String, Schema.String)
```

### 2. Manejo de Errores

Algunos métodos de manejo de errores pueden tener cambios sutiles en sus firmas. Es recomendable revisar la documentación oficial de Effect v4 para los métodos `catch`, `catchAll`, etc.

### 3. Cambios en Estructura de Efectos

El tipo interno `Effect` puede tener cambios en su estructura interna, aunque la API pública se mantiene estable.

## Ejemplos de Código: Before/After

### Importación de CLI

**Before (v3):**

```typescript
import * as Command from "@effect/cli/Command"
import * as Args from "@effect/cli/Args"
import * as Options from "@effect/cli/Options"
import * as Prompt from "@effect/cli/Prompt"
```

**After (v4):**

```typescript
import * as Command from "effect/unstable/cli/Command"
import * as Argument from "effect/unstable/cli/Argument" // Renamed from Args
import * as Flag from "effect/unstable/cli/Flag" // Renamed from Options
import * as Prompt from "effect/unstable/cli/Prompt"
```

### Importación de Plataforma

**Before (v3):**

```typescript
import * as FileSystem from "@effect/platform/FileSystem"
import * as Path from "@effect/platform/Path"
import * as PlatformCommand from "@effect/platform/Command"
import * as HttpClient from "@effect/platform/HttpClient"
```

**After (v4):**

```typescript
import * as FileSystem from "effect/FileSystem"
import * as Path from "effect/Path"
import * as PlatformCommand from "effect/Command"
import * as HttpClient from "effect/unstable/http/HttpClient"
```

### Configuración de package.json

**Before (v3):**

```json
{
  "dependencies": {
    "@effect/cli": "0.73.2",
    "@effect/platform": "0.94.0",
    "@effect/platform-node": "0.104.1",
    "effect": "3.19.16"
  }
}
```

**After (v4):**

```json
{
  "dependencies": {
    "@effect/platform-node": "4.0.0-beta.8",
    "effect": "4.0.0-beta.0"
  }
}
```

## Troubleshooting

### Problema: "Cannot find module 'effect/unstable/cli/Command'"

**Solución:** Verificar que la versión de Effect instalada sea 4.0.0-beta.x o superior. Los módulos `unstable` solo están disponibles en v4 beta.

### Problema: Schema.Record no funciona como en v3

**Solución:** Revisar la documentación actualizada de Schema en Effect v4. La API de Record ha cambiado y puede requerir ajustes en cómo se definen los schemas.

### Problema: Incompatibilidad de tipos entre Effect v3 y v4

**Solución:** Asegurarse de que todos los paquetes de Effect estén en la misma versión major. No mezclar v3 y v4 en el mismo proyecto.

### Problema: Tests fallan después de la migración

**Solución:**

1. Actualizar los imports en todos los archivos de test
2. Verificar que las APIs de test (como `@effect/vitest`) estén en la versión v4 correspondiente
3. Revisar cambios en la API de Schema si se usan schemas en los tests

## Referencias

### Documentación Oficial

- **Effect v4 Beta Announcement:** https://effect.website/blog/releases/effect/40-beta/
- **Migration Guide (effect-smol):** https://github.com/Effect-TS/effect-smol/blob/main/MIGRATION.md
- **Schema v4 Migration Guide:** Disponible en la documentación oficial de Effect

### Recursos de Migración

- **effect-smol Repository:** https://github.com/Effect-TS/effect-smol
  - Contiene la versión "smol" (smaller) de Effect v4
  - Incluye guías de migración detalladas
  - Código fuente de la versión beta

### Comunidad y Soporte

- **Discord de Effect:** Canal #effect-v4 para preguntas específicas de migración
- **GitHub Issues:** https://github.com/Effect-TS/effect/issues

## Notas Adicionales

### Sobre la Estabilidad

Effect v4 está actualmente en fase beta (4.0.0-beta.x). Esto significa:

- APIs pueden cambiar en releases beta futuros
- Se recomienda usar en producción con precaución
- Reportar bugs encontrados durante la migración al repositorio effect-smol

### Próximos Pasos

1. Monitorear lanzamientos de Effect v4 para actualizar a versión estable cuando esté disponible
2. Revisar periódicamente la documentación oficial por cambios en la API
3. Mantener esta guía actualizada con nuevos descubrimientos durante el uso de v4

---

**Última actualización:** Febrero 2026\
**Autor:** Equipo Arkitect UI\
**Estado:** Completa - CLI migrado exitosamente a Effect v4 beta
