class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

module.exports = CustomError;
