const loggingMiddleware = (db) =>
  async (req, res, next) => {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    const header = JSON.stringify(req.headers);
    const originalUrl = req.originalUrl;

    try {
      await db.logging.create({
        ip,
        header,
        action: originalUrl,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error saving log:', err);
    }

    next();
  };

module.exports = loggingMiddleware;