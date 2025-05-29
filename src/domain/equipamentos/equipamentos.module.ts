import { Module } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipamentos } from './entities/equipamento.entity';
import { EquipamentosRepository } from './equipamentos.repository';


@Module({
  imports: [SequelizeModule.forFeature([Equipamentos])],
  controllers: [EquipamentosController],
  providers: [EquipamentosService, EquipamentosRepository],
})
export class EquipamentosModule {}
