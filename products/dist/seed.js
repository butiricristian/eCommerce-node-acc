"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seeder_module_1 = require("./seeder/seeder.module");
const seeder_service_1 = require("./seeder/seeder.service");
async function bootstrap() {
    const appContext = await core_1.NestFactory.createApplicationContext(seeder_module_1.SeederModule);
    const seeder = appContext.get(seeder_service_1.SeederService);
    console.log('HELLO THERE');
    await seeder.seedCategories();
    await seeder.seedProductTypes();
    appContext.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map