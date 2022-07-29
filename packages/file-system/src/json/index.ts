import * as fs from 'fs';
// import fse from 'fs-extra';

class WriteStream {
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
        let dataChunk: string = data;
        if (typeof data === 'object' && data !== null) {
            this.isObject = true;
            dataChunk = JSON.stringify(data);
        }

        if (this.path.endsWith('.json')) {
            let writeChunk = '';
            if (this.isFirstChunk) {
                writeChunk = '[';
            }

            if (this.isObject) {
                writeChunk += `${this.getDelimiter()}${dataChunk}`;
            } else {
                writeChunk += `${this.getDelimiter()}"${dataChunk}"`;
            }

            this.stream.write(writeChunk);
            this.isFirstChunk = false;
        } else {
            this.stream.write(dataChunk);
        }
    };

    public end() {
        if (this.path.endsWith('.json')) {
            this.stream.write(']');
        }
        this.stream.end();
    }
}

export default WriteStream;
