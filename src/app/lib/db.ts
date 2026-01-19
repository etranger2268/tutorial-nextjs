import postgres from 'postgres';

const globalForSql = global as unknown as { sql: postgres.Sql | undefined };

if (!process.env.POSTGRES_URL) {
  console.log('env >>>> POSTGRES_URL is not found;');
  throw new Error();
}

export const sql =
  globalForSql.sql ??
  postgres(process.env.POSTGRES_URL, {
    ssl: 'require',
    max: 10,
    idle_timeout: 20,
  });

if (process.env.NODE_ENV !== 'production') globalForSql.sql = sql;
