/// <reference types="vite/client" />

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

interface ImportMeta {
  env: {
    VITE_BACKEND_URL?: string;
  };
}
