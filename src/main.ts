import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalValidationPipe } from "./validation.filter";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(GlobalValidationPipe);
  await app.listen(5001);
}

bootstrap();
