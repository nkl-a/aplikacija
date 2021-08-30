import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { DatabaseConfiguration } from 'config/database.config';
import { Game } from 'entities/game.entity';
import { Word } from 'entities/word.entity';
import { Latters } from 'entities/latters.entity';
import { GameType } from 'entities/gameType.entity';
import { Player } from 'entities/player.entity';
import { GamePlayer } from 'entities/gamePlayer.entity';
import { GameService } from './services/game/game.service';
import { PlayerController } from './controllers/api/player.controller';
import { PlayerService } from './services/player/player.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [Game, Word, Latters, Player, GamePlayer, GameType]
    }),
    TypeOrmModule.forFeature([Game, Word, Latters, Player, GamePlayer, GameType])
  ],
  controllers: [AppController, PlayerController, AuthController],
  providers: [GameService, PlayerService],
  exports: [PlayerService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*')
  }
}
