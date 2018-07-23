import { Connection } from 'mongoose';
import { UserSchema } from '../../../schemas/user.schema';

export const userAuthProviders = [
  {
    provide: 'AuthModelToken',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DbConnectionToken'],
  },
];