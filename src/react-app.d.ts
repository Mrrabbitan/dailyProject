/// <reference types="react-scripts" />

declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare namespace NodeJS {
  interface ProcessEnv {
    DEVELOP: 'true' | 'false'
  }
}
