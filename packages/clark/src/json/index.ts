import * as fs from 'fs';
// import fse from 'fs-extra';

export class WriteStream {
    private path: string;
    private isFirstChunk: boolean;
    private isObject: boolean;
    private isArray: boolean;
    private stream: fs.WriteStream;

    constructor(path: string) {
        this.path = path;
        this.isFirstChunk = true;
        this.isObject = false;
        this.isArray = false;
        this.stream = fs.createWriteStream(path);
    }

    private getDelimiter = () => {
        return this.path.endsWith('.json') && !this.isFirstChunk ? ',' : '';
    };

    public write = (data: string) => {
        if (typeof data === 'object' && data !== null) {
            this.isObject = true;
            data = JSON.stringify(data);
        }

        if (this.path.endsWith('.json')) {
            let writeChunk = '';
            if (this.isFirstChunk) {
                writeChunk = '[';
            }

            if (this.isObject) {
                writeChunk += `${this.getDelimiter()}${data}`;
            } else {
                writeChunk += `${this.getDelimiter()}"${data}"`;
            }

            this.stream.write(writeChunk);
            this.isFirstChunk = false;
        } else {
            this.stream.write(data);
        }
    };

    public end() {
        if (this.path.endsWith('.json')) {
            this.stream.write(']');
        }
        this.stream.end();
    }
}
