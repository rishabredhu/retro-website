/**
 * Declaration module for importing PNG files.
 * This allows TypeScript to understand imports of PNG files as strings.
 */
declare module '*.png' {
    const value: string;
    export default value;
}

/**
 * Declaration module for importing GLB files.
 * This allows TypeScript to understand imports of GLB files as strings.
 */
declare module '*.glb' {
    const value: string;
    export default value;
}