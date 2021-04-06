const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const dbFile = require('../../../db/db.json');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb (err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb (null, object)
        } catch (err) {
            return cb && cb (err)
        }
    })
}

console.log(dbFile);

module.exports = (app) => {

    app.delete

    app.post('/api/notes', (req, res) => {
        var newObj = {
            "title": req.body.title,
            "text": req.body.text,
            "id": uuidv4()
        };
        dbFile.push(newObj);
        fs.writeFile("../../../db/db.json", JSON.stringify(dbFile), err => {
            if (err) throw err;
            console.log("Done Writing")
        })
    })

    app.get('/api/notes', (req, res) => {
                jsonReader('../../../db/db.json', (err, note) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.send(note);
                })
            })
}