/// <reference types="vite/client" />

declare module "@grapesjs/studio-sdk/style";

interface ImportMetaEnv {
  readonly VITE_UTD_STATIC_BEARER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
