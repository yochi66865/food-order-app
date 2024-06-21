const remote = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 5432,
    port: parseInt(process.env.DATABASE_PORT, 10),
    userName: parseInt(process.env.DB_USERNAME, 10),
    password: parseInt(process.env.DB_PASSWORD, 10),
    dbName: parseInt(process.env.DB_NAME, 10),
  },
};

const local = {
  port: 4000,
  database: {
    host: 'localhost',
    port: 5432,
    userName: 'postgres',
    password: 'postgres',
    dbName: 'food-orders',
  },
};

export default () => (process.env.NODE_ENV === 'remote' ? remote : local);
