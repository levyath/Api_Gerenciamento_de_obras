import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Relatorios } from '../relatorios/entities/relatorios.entity';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosRepository } from './relatorios.repository';
import { RelatoriosService } from './relatorios.service';
import { FiscalizacoesModule } from '../fiscalizacoes/fiscalizacoes.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Relatorios]),
    ],
    controllers: [RelatoriosController],
    providers: [RelatoriosService, RelatoriosRepository],
    exports: [RelatoriosService, RelatoriosRepository],
})
export class RelatoriosModule {}
