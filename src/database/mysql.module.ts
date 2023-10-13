import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: '12345678',
      database: 'family_app_db',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class MysqlModule {}
