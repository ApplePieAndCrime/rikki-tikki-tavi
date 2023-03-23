import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

// entities
import { UserDialogue } from './users-dialogues/entities/user-dialogue';
import { User } from './users/entities/user.entity';
import { Dialogue } from './dialogues/entities/dialogue.entity';
// import { DialoguePart } from './dialogue-parts/entities/dialogue-part.entity';

// modules
import { UsersModule } from './users/users.module';
import { DialoguesModule } from './dialogues/dialogues.module';
// import { DialoguePartsModule } from './dialogue-parts/dialogue-parts.module';
import { TranslatorModule } from './translator/translator.module';
import { AuthModule } from './auth/auth.module';
import { TextModule } from './text/texts.module';
import { Text } from './text/entities/text.entity';
import { HelpersService } from './helpers/helpers.service';
import { HelpersController } from './helpers/helpers.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      expandVariables: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Dialogue, UserDialogue, Text],
      autoLoadModels: true,
      synchronize: true,
    }),

    UsersModule,
    AuthModule,
    DialoguesModule,
    TranslatorModule,
    TextModule,
  ],
  controllers: [AppController, HelpersController],
  providers: [HelpersService],
})
export class AppModule {}
