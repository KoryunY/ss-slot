"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const slot_controller_1 = require("./slot.controller");
const slot_service_1 = require("./slot.service");
const slot_providers_1 = require("./slot.providers");
const microservices_1 = require("@nestjs/microservices");
const microservices_2 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
let SlotModule = class SlotModule {
};
SlotModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, microservices_1.ClientsModule.registerAsync([
                {
                    name: 'NUM_GENERATOR',
                    imports: [config_1.ConfigModule],
                    useFactory: async (configService) => ({
                        transport: microservices_2.Transport.RMQ,
                        options: {
                            queue: configService.get('QUEUE'),
                            urls: [configService.get('URL')],
                            queueOptions: { durable: false },
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),],
        controllers: [slot_controller_1.SlotController],
        providers: [
            ...slot_providers_1.slotProviders,
            slot_service_1.SlotService
        ]
    })
], SlotModule);
exports.SlotModule = SlotModule;
//# sourceMappingURL=slot.module.js.map