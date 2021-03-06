import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TasksModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'task-management',
    autoLoadEntities: true,
    synchronize: true,
    //entities: []
  }), AuthModule ],

  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
