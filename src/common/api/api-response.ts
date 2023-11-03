export class ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    constructor(success: boolean, data: T, message: string) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    static success<T>(message: string, data: T): ApiResponse<T> {
        return new ApiResponse<T>(true, data, message);
    }

    static fail<T>(message: string, data: T): ApiResponse<T> {
        return new ApiResponse<T>(false, data, message);
    }
}
