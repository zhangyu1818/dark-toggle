# dark-toggle

Reliable dark theme toggling logic with no theme flicker and comprehensive testing.

Theme toggling should not be entirely controlled by JavaScript. When the theme is set to "system," it should automatically match the `prefers-color-scheme` media query.

> **Theme Flickering**
>
> If the default page theme is light and has already rendered, when the script identifies the need for a dark theme and switches styles, users can noticeably perceive the flicker, diminishing the user experience.

## install

```shell
pnpm i dark-toggle
```

## Usage

This library can be used vanilla or with React.

### Vanilla Usage

```javascript
import { createDarkToggle } from 'dark-toggle'

const darkToggle = createDarkToggle({
  key: 'theme',
})

darkToggle.subscribe((dark, theme) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  document.documentElement.setAttribute('data-theme', theme ?? '')
})

const btn = document.querySelector('button')

btn.onclick = darkToggle.toggle
```

#### API

The following describes the API based on the interface provided:

```typescript
const createDarkToggle = (params: Params): Return

export interface Params {
  storage?: Storage; // Specifies the storage used, default SessionStorage
  key: string;
}

export interface Return {
  // Indicates if the dark theme is active
  isDark: boolean;
  // Current theme
  theme: Theme | null;
  // Function to set the theme
  setTheme: (theme: Theme) => void;
  // Function to toggle light/dark themes
  toggle: VoidFunction;
  // Subscribe to changes, returns unsubscribe function
  subscribe: (cb: SubscribeFunction) => () => void;
}
```

### Using in React

Here's an example of usage in a `Next.js` application:

```javascript
// layout.ts
import { DarkToggleScript, DarkToggleProvider } from 'dark-toggle/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <DarkToggleProvider>{children}</DarkToggleProvider>
        <DarkToggleScript />
      </body>
    </html>
  );
}
```

Component Usage

```javascript
import { useDarkToggle } from 'dark-toggle/react'

export default function Toggle() {
  const { isDark, theme, toggle } = useDarkToggle()
  return (
    <main>
      <p>isDark: {`${isDark}`}</p>
      <p>theme: {theme}</p>
      <button onClick={toggle}>Toggle</button>
    </main>
  )
}
```

#### API

`<DarkToggleScript/>` Initialization script.

`<DarkToggleProvider/>` Provider.

`useDarkToggle(): Return`

`useDarkToggle` returns the same values as `createDarkToggle` used vanilla. The only difference is that `isDark` and `theme` are `states`, ensuring that hook values change when properties change.

##### Note

The `DarkToggleScript` injects the script into the page at a different timing than React, avoiding theme flickering.

It communicates with React through the `window.darkToggle` object. It is recommended to use `useDarkToggle`; however, you can directly access it in your code if needed.

### Example Usage

[zhangyu.dev](https://zhangyu.dev)

## Contributions

Contributions are welcome.

## License

[MIT](LICENSE)
