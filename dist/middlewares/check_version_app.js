"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVersionFlutterApp = void 0;
exports.checkVersionFlutterApp = (req, res, next) => {
    let flutter_key = req.get('flutter_key');
    if (flutter_key != process.env.FLUTTER_KEY) {
        return res.status(400).json({
            ok: false,
            message: 'Update the app'
        });
    }
    next();
};
