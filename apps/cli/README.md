# arkitect-ui CLI

A modern CLI built with Effect-TS for creating and managing Arkitect UI projects and components.

## 🎯 Features

1. **Create monorepos** with predefined templates
2. **Component registry** Shadcn-style for reusable UI libraries (React & Solid)
3. **Framework Agnostic** Support for React and SolidJS
4. **Automated Setup** Init command to configure your project

## 🚀 Installation and Usage

### Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn

### Installation

```bash
npm install -g @arkitect-ui/cli
# or
pnpm add -g @arkitect-ui/cli
```

## 📖 Available Commands

### `init` - Initialize Project

Configures your project for Arkitect UI components. Detects your framework (React/Solid), sets up paths, creates `components.json`, and installs base dependencies.

```bash
arkitect-ui init
```

### `list` - List Components

Lists all available components in the Arkitect UI registry.

```bash
arkitect-ui list
```

### `add` - Add Component

Installs a component into your project. Automatically handles dependencies and file placement using `shadcn`.

```bash
# Add specific component
arkitect-ui add button

# Add multiple components
arkitect-ui add button card input

# Add ALL available components
arkitect-ui add --all
```

**Options:**

- `--all`: Install all components available in the registry.
- `--overwrite`: Overwrite existing files.

### `create` - Create Project (Beta)

Creates a new project from a predefined template.

```bash
arkitect-ui create [options] <project-name>
```

## 🛠️ Development

### Local Setup

```bash
# Clone the monorepo
git clone https://github.com/devx-op/arkitect-ui.git
cd arkitect-ui

# Install dependencies
pnpm install

# Build CLI
pnpm nx build cli

# Link locally
cd apps/cli
pnpm link --global
```

### Running Locally

```bash
arkitect-ui --help
```

## 📄 License

MIT
