import * as fs from 'fs';
import * as csvWriteStream from 'csv-write-stream';

// import userLists from '../userLists.json' assert { type: 'json' };

interface Option {
    append?: boolean;
    jsonData: { [key: string]: any }[];
    csvFilePath: string;
    headers?: string[];
    includes?: string[];
}

interface FsOption {
    flags?: string;
}

interface ExecOption {
    append?: boolean;
    jsonData: any;
    csvFilePath: string;
    headers?: string[];
    includes?: string[];
}

class ToCsv {
    private jsonData: any;

    private csvFilePath: string;

    private headers: string[];

    private includes: string[] = [];

    private append: boolean = false;

    constructor(options: Option = {} as Option) {
        this.assignValues(options);
    }

    private assignValues = (options: ExecOption = {} as ExecOption) => {
        const { append, jsonData, csvFilePath, headers, includes } = options;

        this.jsonData = jsonData;
        this.csvFilePath = csvFilePath;
        if (headers) this.headers = headers;
        if (includes) this.includes = includes;
        if (append) this.append = append;

        this.validate();
    };

    private validate = () => {
        if (!this.csvFilePath) {
            throw new Error('csvFilePath is required');
        }
        if (!this.csvFilePath.endsWith('.csv')) {
            throw new Error('Invalid CSV filePath');
        }
    };

    private getWriteStream = () => {
        const options = { headers: this.headers };
        const fsOptions: FsOption = {};

        if (this.append) {
            fsOptions.flags = 'a';
        }

        const writeStream = csvWriteStream(options);
        writeStream.pipe(fs.createWriteStream(this.csvFilePath, fsOptions));

        return writeStream;
    };

    public exec = async () => {
        try {
            const writeStream = this.getWriteStream();

            for (const row of this.jsonData) {
                let record = {};
                if (this.includes.length) {
                    for (const include of this.includes) {
                        record[include] = row[include];
                    }
                } else {
                    record = row;
                }

                writeStream.write(record);
            }

            writeStream.end();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    // public write = () => {};
    // public end = () => {};
}

export { ToCsv };
