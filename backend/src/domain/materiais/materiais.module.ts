import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MateriaisController } from './materiais.controller';
import { MateriaisService } from './materiais.service';
import { MaterialRepository } from './materiais.repository';
import { Material } from './entities/material.entity';
import { DiarioMaterial } from '../diario-materiais/diario-material.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Material,DiarioMaterial
    ]),
    AuthModule
  ],
  controllers: [MateriaisController],
  providers: [
    MateriaisService,
    MaterialRepository,
  ],
  exports: [
    MaterialRepository,
    MateriaisService,
    MateriaisModule
  ],
})
export class MateriaisModule {}