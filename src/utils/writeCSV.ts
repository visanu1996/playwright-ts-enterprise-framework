import { stringify } from 'csv-stringify/sync'
import * as path from 'node:path';
import * as fs from 'node:fs'

/**
 * Writes records to a CSV file, using the first record's keys as the header.
 * The output file is created or overwritten.
 */
export function writeCSV(records: Record<string, unknown>[], filename: string): void {
    //Added by AI
    const firstRecord = records[0]
    if (!firstRecord) {
        throw new Error('Cannot write CSV because no records were provided.')
    }

    const csvPath = path.resolve(__dirname, '../../test-results/saucedemo', filename)
    const columns = Object.keys(firstRecord)
    const csvContent = stringify(records, { columns, header: true })

    fs.mkdirSync(path.dirname(csvPath), { recursive: true })
    fs.writeFileSync(csvPath, csvContent, 'utf8')
}
