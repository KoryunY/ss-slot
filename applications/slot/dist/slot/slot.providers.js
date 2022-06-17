"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotProviders = void 0;
const slot_entity_1 = require("./slot.entity");
exports.slotProviders = [{
        provide: 'SLOT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(slot_entity_1.Slot),
        inject: ['DATA_SOURCE'],
    },];
//# sourceMappingURL=slot.providers.js.map