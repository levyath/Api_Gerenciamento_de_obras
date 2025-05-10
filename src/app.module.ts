import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObrasModule } from './domain/obras/obras.module';

@Module({
  imports: [ObrasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
