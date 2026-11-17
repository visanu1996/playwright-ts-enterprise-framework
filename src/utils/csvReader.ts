import { parse } from 'csv-parse/sync'
import * as path from 'node:path';
import * as fs from 'node:fs'

export function csvReader(filename:string): Record<any,any>[] {
    const csvPath = path.join(__dirname,'../data/saucedemo',filename)
    const fileContent = fs.readFileSync(csvPath, 'utf-8')
    const records: Record<any,any>[] = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    })

    return records
}
