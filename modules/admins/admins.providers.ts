import { Connection } from 'mongoose';
import { AdminSchema } from '../../../schemas/admin.schema';

export const adminsProviders = [
  {
    provide: 'AdminModelToken',
    useFactory: (connection: Connection) => connection.model('Admin', AdminSchema),
    inject: ['DbConnectionToken'],
  },
];