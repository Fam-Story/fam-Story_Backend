import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponse } from './api-response';

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
  );
};
