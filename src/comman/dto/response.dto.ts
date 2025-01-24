export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  total?: number;
  page?: number;
  limit?: number;
  errors?: string;

  constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data?: T,
    total?: number,
    page?: number,
    limit?: number,
    errors?: string
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.errors = errors;
  }
}
