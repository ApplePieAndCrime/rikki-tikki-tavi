import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle('rikki-tikki-tavi api')
    .setDescription('Апишка для приложения по изучению языков')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });

  // auth
  // app.use(
  //   session({
  //     secret: process.env.JWT_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 3600000 },
  //   }),
  // );
  app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
