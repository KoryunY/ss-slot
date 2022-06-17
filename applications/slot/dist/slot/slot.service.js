"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
let SlotService = class SlotService {
    constructor(repo, client) {
        this.repo = repo;
        this.client = client;
    }
    async genRandomNumber() {
        const pattern = { cmd: 'num' };
        const observableNum = await this.client.send(pattern, 0);
        let randNumber;
        const resolveNum = new Promise(resolve => {
            observableNum
                .subscribe((data) => {
                resolve(data);
            });
        });
        await resolveNum.then((data) => {
            randNumber = data;
        });
        const slot = this.repo.create({ random: randNumber });
        return this.repo.save(slot);
    }
};
SlotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SLOT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('NUM_GENERATOR')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        microservices_1.ClientProxy])
], SlotService);
exports.SlotService = SlotService;
//# sourceMappingURL=slot.service.js.map