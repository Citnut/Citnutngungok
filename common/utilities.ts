import { existsSync, writeFileSync } from "node:fs"

function checkfile(path: string, defaultData: undefined | any = false) {
    if (existsSync(path)) return true
    else {
        if (!defaultData) return false
        writeFileSync(path, defaultData)
    }
    return false
}

export {
    checkfile
}