
# UI

Market Plus is an admin dashboard for store management. It uses a left-panel navigation (desktop) and bottom navigation (mobile), a sticky topbar with search and user actions, and stat cards / chart panels / data tables across pages. The design system uses Tailwind CSS design tokens (`--color-*`, `--radius-*`, `--shadow-*`, font weights) defined in `src/styles/design-tokens.css`, with animated icons from `@animateicons/react`.

Pages:
- Overview — dashboard stats, sales chart, category donut, recent orders
- Orders / Products / Inventory / Customers / Payments — data tables with toolbars, pagination, and status badges
- Analytics — revenue and sales charts with range filters
- Marketing / Store — campaign and store settings
- Settings — General, Account, Notifications, Security, Appearance, Integrations, Billing, and Danger Zone tabs

# Code stack

- React 19 with TypeScript, Vite, and `react-router-dom` for client-side routing
- Tailwind CSS v4 (`@tailwindcss/vite`) with design-token CSS variables
- `motion` for animations
- `recharts` for charts (sales area chart, category donut)
- `@animateicons/react` (lucide animated icon set)
- ESLint with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

# Dependencies

| Dependency | Purpose |
|---|---|
| `react` / `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `vite` | Build tool / dev server |
| `@vitejs/plugin-react` | React plugin for Vite |
| `typescript` | Static typing |
| `tailwindcss` / `@tailwindcss/vite` | Utility-first CSS with design tokens |
| `motion` | Layout and gesture animations |
| `recharts` | Composable charting |
| `@animateicons/react` | Animated lucide icons |
| `eslint`, `typescript-eslint`, `@eslint/js` | Linting |
| `eslint-plugin-react-hooks` | React hooks lint rules |
| `eslint-plugin-react-refresh` | Fast refresh ESLint plugin |

<img width="1895" height="912" alt="Screenshot 2026-11-10 131512" src="https://github.com/user-attachments/assets/76d7e8ff-cbf6-40aa-982d-e75358dee7cc" />
<img width="1898" height="910" alt="Screenshot 2026-11-10 131704" src="https://github.com/user-attachments/assets/49a86097-9f91-454d-9587-8fd219684b57" />






# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
