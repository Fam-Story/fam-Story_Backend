import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomApiResponse } from './custom-api-response';

export const CustomApiOKResponse = (model: any, apiDescription: string) => {
  return applyDecorators(
    ApiExtraModels(CustomApiResponse, model),
    ApiOkResponse({
      description: apiDescription,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomApiResponse) },
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
