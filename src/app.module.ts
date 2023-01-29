import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DialoguesModule } from './dialogues/dialogues.module';
import { DialoguePartsModule } from './dialogue-parts/dialogue-parts.module';
import { UserDialogue } from './users-dialogues/entities/user-dialogue';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';
import { Dialogue } from './dialogues/entities/dialogue.entity';
import { DialoguePart } from './dialogue-parts/entities/dialogue-part.entity';
import { TranslatorModule } from './translator/translator.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Dialogue, DialoguePart, UserDialogue],
      autoLoadModels: true,
    }),

    UsersModule,
    DialoguesModule,
    TranslatorModule,
    DialoguePartsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
