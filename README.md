# Create React Component

A simple extension to create a new react component with styled components

## Features

With this extension you can generate the files for a new component, using typescript or plain js, the file structure created is as follows:

```
┌─────────────────────┐
│ Component           │
│  │                  │
│  ├──► index.ts      │  // just exports the component
│  │                  │
│  ├──► Component.tsx │  // the component itself
│  │                  │
│  └──► styles.ts     │  // imports styled-components and exports Container
└─────────────────────┘
```

Note: this is just my preferred way of creating a new component, it may not fit your project, but future updates will adress customization issues.

## Usage

To use it, simply press `Ctrl + Shift + P` and search for 'Create Js Component' (or 'Ts' instead), and hit Enter, then the extension will ask for a name for the component, which shouldnt contain any spaces nor the `.js` termination.
By default there aren't any shortcuts for the commands but they can be easily added.
