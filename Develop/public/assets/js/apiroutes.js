const fs = require('fs');
const express = require('express');

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



module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        jsonReader('../../../db/db.json', (err, note) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(note);
        })
    })

    app.post('/api/notes', (req, res) => {
        jsonReader('../../../db/db.json', (err, note) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(
                {
                    "title": req.title,
                    "text": req.text,
                    "id": 2
                }
            )
            
        })
        })
    }

