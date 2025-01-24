import { ApiResponse } from '../dto/response.dto';

export const createApiResponse = <T>(
  success: boolean,
  statusCode: number,
  message: string,
  data?: T,
  total?: number,
  page?: number,
  limit?: number,
  errors?: string
): ApiResponse<T> => {
  return new ApiResponse(
    success,
    statusCode,
    message,
    data,
    total,
    page,
    limit,
    errors
  );
};
