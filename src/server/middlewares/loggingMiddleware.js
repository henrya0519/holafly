const loggingMiddleware = (db) =>
    (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const headers = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;
        // Persist this info on DB
        console.log('ip: ', ip)
        console.log('headers: ', headers)
        console.log('originalUrl: ', originalUrl)
        const data = db.logging.create({
            ip:ip,
            headers:headers,
            action:originalUrl

        })
        console.log('dataaaa: ', data)       
        next();
    }

module.exports = loggingMiddleware;