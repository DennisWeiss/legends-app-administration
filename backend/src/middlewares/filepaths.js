
const getFilePath = function (prop, files) {
    return files[prop][0].filename;
}

module.exports.middleware = async (req, res, next) => {
    // since mime-type is multipart/formData, poi-object was stringified and needs to be parsed
    const body = JSON.parse(req.body.poi);
  
    // if formdata contains strings (in this case url), multer puts them into the body

    const files = req.files;

    body.icons.default = files['icon_default'] ? getFilePath('icon_default', files) : body.icons.default;
    body.icons.explored = files['icon_explored'] ? getFilePath('icon_explored', files) : body.icons.explored;
    body.media.image.preview = files['image_preview'] ? getFilePath('image_preview', files) : body.media.image.preview;
    
    body.media.video.arScene = files['video_ar_scene'] ? getFilePath('video_ar_scene', files) : body.media.video.arScene;
    body.media.video.iconScene = files['video_icon_scene'] ? getFilePath('video_icon_scene', files): body.media.video.iconScene;


    
    let targets = [];
    if (req.files['vuforia_targets']) {
        targets =  req.files['vuforia_targets'].map(file => file.filename);
    }

    // existing urls are already added in vuforia_targets
    // not reading from parsed poi since array also includes {}
    if(req.body.vuforia_targets) {
     targets.push(...req.body.vuforia_targets);
    }
    body.media.vuforiaTargets  = targets;

    // replace body with actual poi
    req.body = body;

    next();
}

