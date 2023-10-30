import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }
  public getPort() {
    return this.getValue('PORT', true);
  }
  public getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET'),
      expiresIn: this.getValue('JWT_EXPIRES_IN'),
      refreshTokenSecret: this.getValue('JWT_REFRESH_TOKEN_SECRET'),
      refreshExpiresIn: this.getValue('JWT_REFRESH_EXPIRES_IN'),
    };
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    let migrations = [__dirname + '/../migration/*{.ts,.js}'];

    if ((<any>module).hot) {
      const migrationContext = (<any>require).context(
        '../migration',
        false,
        /\.ts$/,
      );

      migrations = migrationContext.keys().map((id) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }

    // return {
    //   type: 'postgres',
    //   host: this.getValue('POSTGRES_HOST'),
    //   port: parseInt(this.getValue('POSTGRES_PORT')),
    //   username: this.getValue('POSTGRES_USER'),
    //   password: this.getValue('POSTGRES_PASSWORD'),
    //   database: this.getValue('POSTGRES_DB'),
    //   migrationsTableName: 'migration',

    //   entities: ['dist/**/*.entity{.ts,.js}'],

    //   migrations: ['dist/migration/*.js'],
    //   cli: {
    //     migrationsDir: 'src/migration',
    //   },
    //   ssl: this.getValue('DATABASE_SSL') === 'true',
    // };
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
]);
export { configService };
