import { HttpException, ValidationPipe } from "@nestjs/common";

export const GlobalValidationPipe = new ValidationPipe({
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    return new HttpException({
      message: {
        errors: errors.map(error => {
          const { constraints, property } = error;
          return { property, constraints };
        })
      }
    }, 400);
  }
})