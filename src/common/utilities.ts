import { existsSync, writeFileSync } from "fs"

/**
 * Check if a file exists and create a new file if desired
 * @param path String
 * @param defaultData Input data if you want to create a new file
 * @returns If the file exists, it will return true and vice versa
 */
function checkfile(path: string, defaultData: undefined | any = false) {
    if (existsSync(path)) return true
    else if (defaultData) writeFileSync(path, defaultData)
    return false
}

class Language {

    // public static get(): string {

    // }
}

export {
    checkfile,
    Language
}