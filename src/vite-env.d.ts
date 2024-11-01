// vite-env.d.ts
/// <reference types="vite/client" />

declare module '*.svg?react' {
  import { FunctionComponent, SVGProps } from 'react'
  const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >
  export default ReactComponent
}
