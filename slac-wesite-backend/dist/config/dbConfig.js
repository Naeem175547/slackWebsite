export const dbConfig = (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: true,
    autoLoadEntities: true,
});
//# sourceMappingURL=dbConfig.js.map