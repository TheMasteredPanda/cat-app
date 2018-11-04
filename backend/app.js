const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/images', express.static('images'));

app.get('/cat-images', (res, req) => {
    let params = res.query;
    let files = fs.readdirSync('images');

    if (params.currentImage === '' || params.currentImage == 'null') {
        console.log('Params is null.');
        req.send({location: `http://127.0.0.1:3001/images/${files[0]}`, name: `File: 1.`});
        return;
    }

    let splitCurrentPath = params.currentImage.split('/');
    let currentFile = splitCurrentPath[splitCurrentPath.length - 1];
    let fileLocation = 0;

    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        let splitPath = element.split('/');
        let elementFile = splitPath[splitPath.length - 1];
        if (elementFile === currentFile) {
            fileLocation = index;
        }
    }

    if (params.action === 'next') {
        fileLocation++;
          
        if (files.length <= fileLocation) {
            fileLocation = 0;
        }
    } else {
        console.log(`File Location: ${fileLocation}`);
        fileLocation--;
        console.log(`New File LocatiON: ${fileLocation}`);

        if (fileLocation < 0) {
            fileLocation = files.length - 1;
        }
    }

    req.send({location: `http://127.0.0.1:3001/images/${files[fileLocation]}`, name: `File ${fileLocation + 1}.`});
});


app.listen(3001, () => { console.log('Listening on port 3002.')});