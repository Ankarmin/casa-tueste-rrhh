import { AppDataSource } from '../db/data-source';
import { ContractEntity } from '../entities/contract.entity';
import { mapContractDetail, mapContractListItem } from '../mappers';

export class ContractService {
  async list() {
    const repository = AppDataSource.getRepository(ContractEntity);
    const contracts = await repository.find({ relations: { employee: true }, order: { id: 'ASC' } });

    return {
      contratos: contracts.map((contract) => mapContractListItem(contract, contract.employee)),
      stats: {
        total: contracts.length,
        vigentes: contracts.filter((contract) => contract.estado === 'vigente').length,
        porVencer: contracts.filter((contract) => contract.estado === 'por_vencer').length,
        vencidos: contracts.filter((contract) => contract.estado === 'vencido').length,
      },
    };
  }

  async getById(id: string) {
    const repository = AppDataSource.getRepository(ContractEntity);
    const contract = await repository.findOne({ where: { id }, relations: { employee: true } });
    return contract ? mapContractDetail(contract, contract.employee) : null;
  }
}
