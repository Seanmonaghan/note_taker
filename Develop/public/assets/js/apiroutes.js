const fs = require('fs');
const {
    v4: uuidv4
} = require('uuid');

const dbFile = require('../../../db/db.json');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

module.exports = (app) => {

    app.delete('/api/notes/:id', (req, res) => {
        jsonReader('../../../db/db.json', (err, note) => {
            if (err) {
                console.log(err);
                return;
            }
            
            for (let [i, item] of note.entries()) {
                if (item.id === req.params.id) {
                    note.splice(i, 1);
                    console.log("Note Deleted");
                    fs.writeFile('../../../db/db.json', JSON.stringify(note), err => {
                        if (err) throw err;
                    })
                } else {
                    
                }
            }
        })
    })

    app.post('/api/notes/', (req, res) => {
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