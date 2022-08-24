import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Transform } from 'stream';
import csvWriteStream from 'csv-write-stream';
// import {  } from 'fs/promises'
// import { setTimeout } from 'timers/promises';

const readStream = async (filePath: string, { delimiter = ',', fromRow = 0, toJson = false } = {}): Promise<any> => {
    try {
        const reader = fs.createReadStream(filePath);
        const parser = parse({
            delimiter,
            from: fromRow,
            relax_column_count: true
        });
        reader.pipe(parser);

        return Promise.resolve(parser);
    } catch (err) {
        return Promise.reject(err);
    }
};

const writeStream = async (filePath: string, headers: Array<string>): Promise<any> => {
    try {
        const writer = csvWriteStream({ ...(headers && { headers }) });
        writer.pipe(fs.createWriteStream(filePath));

        // writer.end();
        return Promise.resolve(writer);
    } catch (err) {
        return Promise.reject(err);
    }
};

const addColumn = async (filePath: string, column: string, fetchDataFunc: (row: any) => Promise<any>): Promise<any> => {
    try {
        let count = 0;
        let headers = [];
        let writer;
        const reader = await readStream(filePath);

        for await (const row of reader) {
            count++;
            if (count === 1) {
                headers = row;
                writer = await writeStream(`${filePath.split('.csv')[0]}_updated.csv`, [...headers, column]);
                continue;
            }

            const obj = {};
            for (let i = 0; i < headers.length; i++) {
                const header = headers[i];
                const value = row[i];
                obj[header] = value;
            }

            const newColumnData = await fetchDataFunc(obj);
            writer.write({ ...obj, [column]: newColumnData });
        }

        writer.end();
        return 'OK';
    } catch (err) {
        return Promise.reject(err);
    }
    // const results = [];
    // const p = new Promise((resolve, reject) => {
    //     parser.pipe(csv.parse({ columns: true }))
    //         .on('data', (data) => {
    //             console.log('data --------------', data);
    //             data.name = 'somename'; // will add new column with same data in all rows
    //             console.log('data after pushing ----------', data);
    //             results.push(data);
    //         })
    //         .on('error', (err) => {
    //             console.log('error ------------', err);
    //             reject();
    //         })
    //         .on('finish', () => {
    //             console.log();
    //             console.log('all the csv strings parsed to objects -------------', results);
    //         })
    //         .pipe(csv.stringify({ header: true }))
    //         .pipe(writeStream);
    // });
    // return p;
};

export { readStream, writeStream, addColumn };
