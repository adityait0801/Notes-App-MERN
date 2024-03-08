const {Router} = require('express')
const { NoteModel } = require('../models/note.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const notesController = Router();

notesController.get("/", (res, req)=> {
    res.send("Notes");
})

module.exports = {
    notesController
}