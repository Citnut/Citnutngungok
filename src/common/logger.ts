/**
 * Green for the tag, reset for the message
 * @param args any
 */
const info = (args: any) => console.log(`\x1b[32m[INFO]\x1b[0m ${args}`)

/**
 * Yellow for the tag, reset for the message
 * @param args any
 */
const warn = (args: any) => console.log(`\x1b[33m[WARN]\x1b[0m ${args}`)

/**
 * Red for the tag, reset for the message
 * @param args any
 */
const error = (args: any) => console.log(`\x1b[31m[ERROR]\x1b[0m ${args}`)

/**
 * Blue for the tag, reset for the message
 * @param args any
 */
const system = (args: any) => console.log(`\x1b[34m[SYSTEM]\x1b[0m ${args}`)

/**
 * Cyan color by default for the tag, reset for the message
 * @param args any
 * @param type string, default is "Citnut" 
 * @param color ANSI color code
 */
const custom = (args: any, type: string = "Citnut", color = '\x1b[36m') => console.log(`\x1b[${color}[${type}]\x1b[0m ${args}`)

export { info, warn, error, system, custom }