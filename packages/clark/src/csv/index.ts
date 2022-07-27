import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Transform } from 'stream';
import csvWriteStream from 'csv-write-stream';
// import {  } from 'fs/promises'
// import { setTimeout } from 'timers/promises';

const readStream = async (
    filePath: string,
    { delimiter = ',', fromRow = 0, toJson = false } = {}
): Promise<any> => {
    try {
        const readStream = fs.createReadStream(filePath);
        const parser = parse({
            delimiter,
            from: fromRow,
            relax_column_count: true,
        });
        readStream.pipe(parser);

        return Promise.resolve(parser);
    } catch (err) {
        return Promise.reject(err);
    }
};

const writeStream = async (filePath: string, headers: Array<string>): Promise<any> => {
    try {
        const writer = csvWriteStream({ headers });
        writer.pipe(fs.createWriteStream(filePath));

        // writer.end();
        return Promise.resolve(writer);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { readStream, writeStream };
