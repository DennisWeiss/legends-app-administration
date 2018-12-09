
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

const videoMimeTypes = [
    'video/x-flv', 
    'video/mp4', 
    'video/3gpp', 
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv'
]

const imgMimeTypes = [
    'image/jpeg', 
    'image/png', 
    'image/bmp',
    'image/gif'
]

module.exports.mimetypes = [...videoMimeTypes, ...imgMimeTypes];
    

const validateImg = async (...imgArr) => {
    return validateFile(imgMimeTypes, imgArr);
}

const validateVideo = async (...videoArr) => {
    return validateFile(videoMimeTypes, videoArr);
}

const validateFile = async (mimetypes, fileArr) => {
    for(let file of fileArr) {
        if(!mimetypes.includes(file[0].mimetype)) {
            return false;
        }
    }
    return true;
}

const deleteFiles = async (fileArr) => {
    for (let file of fileArr) {
        await unlinkAsync(file[0].path);
    }
}

module.exports.validate = async (req, res, next) => {

    let isValid = true;
    const files = req.files;

    const images = [files['icon_default'], files['icon_explored'], files['image_preview']]
    .filter((file) => {
        return typeof file !== 'undefined'
    })

    if (! await validateImg(...images)) { isValid = false; }
    
    const videos = [files['video_ar_scene'], files['video_icon_scene']]
    .filter((file) => {
        return typeof file !== 'undefined'
    })

    if (! await validateVideo(...videos)) { isValid = false; }
 
    if (isValid) {
        next();
    } else {
        await deleteFiles([...images, ...videos]); //invalid poi will not be saved -> delete all files belonging to poi
        return res.status(400).send({message: 'Invalid mime-type!'});
    }

}