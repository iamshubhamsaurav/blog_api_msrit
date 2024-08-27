class AppError extends Error {
    // Error has message
    // AppError should have message and statusCode
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = AppError