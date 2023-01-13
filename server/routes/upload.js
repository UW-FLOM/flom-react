const Router = require('express-promise-router');
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

const mp3Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = `public/audio/${req.body.path}`
        console.log(`Server_Directory: public/audio/${req.body.path}`)
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true })
            console.log(`mkdir: ${req.body.path}`)
        }
        cb(null, directory)
    }, 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const mp3Upload = multer({
    storage: mp3Storage,
    limits: {
        fileSize: 10000000 // 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(mp3)$/)) {
            return cb(new Error('Please upload an mp3'))
        }
        cb(undefined, true)
    }
});

router.post('/', passport.authenticate('jwt', { session: false }), mp3Upload.array('file'), async (req, res) => {
    res.send(req.files)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})