export const checkVersionFlutterApp = (req, res, next) => {
    let flutter_key = req.get('version');

    if(flutter_key != process.env.FLUTTER_KEY) {
        return res.status(406).json({
            ok: false,
            message: 'Update the app'
        });
    }
    
    next();

}
    