export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export class BadRequestError extends HttpError {
    constructor(message) {
        super(400, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = 'Неавторизований користувач') {
        super(401, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = 'Немає доступу') {
        super(403, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message) {
        super(404, message);
    }
}

export class ConflictError extends HttpError {
    constructor(message) {
        super(409, message );
    }
}


