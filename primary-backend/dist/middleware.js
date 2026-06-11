import jwt from 'jsonwebtoken';
function getToken(authorizationHeader) {
    if (!authorizationHeader) {
        return undefined;
    }
    return authorizationHeader.startsWith('Bearer ')
        ? authorizationHeader.slice('Bearer '.length)
        : authorizationHeader;
}
function isAuthTokenPayload(payload) {
    return typeof payload !== 'string' && typeof payload.id === 'number';
}
export function authMiddleware(req, res, next) {
    const token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    try {
        const payload = jwt.verify(token, process.env["JWT_SECRET"]);
        if (!isAuthTokenPayload(payload)) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        req.id = payload.id;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}
//# sourceMappingURL=middleware.js.map