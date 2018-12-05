import { Connection } from 'mongoose';
import { NotificationSchema } from '../../../schemas/notification.schema';

export const notificationsProviders = [
  {
    provide: 'NotificationModelToken',
    useFactory: (connection: Connection) => connection.model('Notification', NotificationSchema),
    inject: ['DbConnectionToken'],
  },
];