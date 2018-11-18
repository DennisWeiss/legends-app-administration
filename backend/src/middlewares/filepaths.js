
const getFilePath = function (prop, files, url) {
    return url + '/' + files[prop][0].filename;
}

module.exports = (req, res, next) => {
    // since mime-type is multipart/formData, poi-object was stringified and needs to be parsed
    const body = JSON.parse(req.body.poi);

    const url = req.protocol + "://" + req.get("host") + '/';
  
    // if formdata contains strings (in this case url), multer puts them into the body

    const files = req.files;

    body.icons.default = files['icon_default'] ? getFilePath('icon_default', files, url) : body.icons.default;
    body.icons.explored = files['icon_explored'] ? getFilePath('icon_explored', files, url) : body.icons.explored;
    body.media.image.preview = files['image_preview'] ? getFilePath('image_preview', files, url) : body.media.image.preview;
    body.media.video.arScene = files['video_ar_scene'] ? getFilePath('video_ar_scene', files, url) : body.media.video.arScene;
    body.media.video.iconScene = files['video_icon_scene'] ? getFilePath('video_icon_scene', files, url): body.media.video.iconScene;

    
    let targets = [];
    if (req.files['vuforia_targets']) {
        targets =  req.files['vuforia_targets'].map(file=> url + file.filename);
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

