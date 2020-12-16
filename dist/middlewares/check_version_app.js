"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVersionFlutterApp = void 0;
const checkVersionFlutterApp = (req, res, next) => {
    let flutter_key = req.get('flutter_key');
    if (flutter_key != process.env.FLUTTER_KEY) {
        return res.status(406).json({
            ok: false,
            message: 'Update the app'
        });
    }
    next();
};
exports.checkVersionFlutterApp = checkVersionFlutterApp;
