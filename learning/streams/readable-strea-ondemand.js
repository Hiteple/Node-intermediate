const { Readable } = require('stream')

const readableStream = new Readable({

    read(size) {
        setTimeout(() => {
            if (this.chartCode > 90) {
                this.push(null)
                return;
            }

            this.push(String.fromCharCode(this.chartCode++))
        }, 100)
    }
})

// 65 is A
readableStream.chartCode = 65
readableStream.pipe(process.stdout)
