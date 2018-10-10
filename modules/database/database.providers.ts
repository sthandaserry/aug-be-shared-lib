import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> => {
      if (process.env.NODE_ENV === 'prod') {
        return await mongoose.connect(process.env.DB);
      }
      if (process.env.NODE_ENV === 'dev') {
        return await mongoose.connect(process.env.DEVDB);
      }
    },
  },
];