import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiResponse,
} from '@nestjs/swagger';

export const CustomApiCreatedResponse = (
  model: any,
  apiDescription: string,
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponse, model),
    ApiCreatedResponse({
      description: apiDescription,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
    ApiResponse({ status: 400, description: '올바르지 않은 요청 방식입니다.' }),
    ApiResponse({ status: 401, description: '인증되지 않은 요청입니다.' }),
    ApiResponse({ status: 403, description: '접근 권한이 없습니다.' }),
    ApiResponse({ status: 404, description: '리소스를 찾을 수 없습니다.' }),
    ApiResponse({ status: 500, description: '서버 내부 오류가 발생했습니다.' }),
  );
};
