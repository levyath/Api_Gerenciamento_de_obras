import { forwardRef, Module } from '@nestjs/common';
import { DiarioDeObraService } from './diario-de-obra.service';
import { DiarioDeObraController } from './diario-de-obra.controller';
import { DiarioDeObraRepository } from './diario-de-obra.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiarioDeObra } from './entities/diario-de-obra.entity';
import { Obras } from '../obras/entities/obras.entity';
import { Material } from '../materiais/entities/material.entity';
import { DiarioMaterial } from '../diario-materiais/diario-material.entity';
import { MateriaisModule } from '../materiais/materiais.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      DiarioDeObra,
      Obras,
      Material,
      DiarioMaterial
    ]),
    AuthModule,
    forwardRef(() => MateriaisModule),
  ],
  controllers: [DiarioDeObraController],
  providers: [DiarioDeObraService, DiarioDeObraRepository],
})
export class DiarioDeObraModule {}
