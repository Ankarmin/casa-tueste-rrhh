import { AppDataSource } from '../db/data-source';
import { NotificationEntity } from '../entities/notification.entity';
import { mapNotification } from '../mappers';
import { codeNumber, padCode } from '../utils';

export class NotificationService {
  async list() {
    const repository = AppDataSource.getRepository(NotificationEntity);
    const notifications = await repository.find({ order: { createdAt: 'DESC' } });
    return notifications.map(mapNotification);
  }

  async nextId() {
    const repository = AppDataSource.getRepository(NotificationEntity);
    const notifications = await repository.find({ select: { id: true } });
    const maxCode = notifications.reduce((max, item) => Math.max(max, codeNumber(item.id)), 0);
    return padCode('N', maxCode + 1);
  }
}
