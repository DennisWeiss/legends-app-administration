module.exports = (req, res, next) => {
  
    // since mime-type is multipart/formData, poi-object was stringified and needs to be parsed
    const body = JSON.parse(req.body.poi);

    const url = req.protocol + "://" + req.get("host") + '/';
  
    body.icons.default = url + req.files['icon_default'][0].filename;
    body.icons.explored = url + req.files['icon_explored'][0].filename;
    body.media.image.preview = url + req.files['image_preview'][0].filename;
    body.media.video.arScene = url + req.files['video_ar_scene'][0].filename,
    body.media.video.iconScene = url + req.files['video_icon_scene'][0].filename,
    
    // existing urls are already added in vuforiaTargets
    body.media.vuforiaTargets.push(...req.files['vuforia_targets'].map(file=> url + file.filename));
    
    req.body = body;

    next();
}