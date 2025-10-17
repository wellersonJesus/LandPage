const { API_KEY } = require('../config/zerosheets');

function authMiddleware(req, res, next) {
    const token = req.headers['x-api-key'];
    if (!token || token !== API_KEY) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
    next();
}

module.exports = authMiddleware;
