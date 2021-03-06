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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("./abstract.entity");
const user_entity_1 = require("./user.entity");
const guild_entity_1 = require("./guild.entity");
let BanEntity = class BanEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], BanEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], BanEntity.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.bans, { primary: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], BanEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => guild_entity_1.Guild, (guild) => guild.bans, { primary: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'guildId' }),
    __metadata("design:type", guild_entity_1.Guild)
], BanEntity.prototype, "guild", void 0);
BanEntity = __decorate([
    (0, typeorm_1.Entity)('bans')
], BanEntity);
exports.BanEntity = BanEntity;
//# sourceMappingURL=ban.entity.js.map