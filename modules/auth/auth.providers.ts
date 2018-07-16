import { Connection } from 'mongoose';
import { AdminSchema } from '../../../schemas/admin.schema';

export const authProviders = [
  {
    provide: 'AuthModelToken',
    useFactory: (connection: Connection) => connection.model('Admin', AdminSchema),
    inject: ['DbConnectionToken'],
  },
];