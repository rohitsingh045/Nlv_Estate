/// <reference types="vite/client" />

declare module "*.asset.json" {
  const value: { url: string; asset_id: string; original_filename: string };
  export default value;
}
