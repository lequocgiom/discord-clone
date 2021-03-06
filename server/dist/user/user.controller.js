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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const LoginInput_1 = require("../models/input/LoginInput");
const express_1 = require("express");
const RegisterInput_1 = require("../models/input/RegisterInput");
const yupValidationPipe_1 = require("../utils/yupValidationPipe");
const user_schema_1 = require("../validation/user.schema");
const constants_1 = require("../utils/constants");
const ChangePasswordInput_1 = require("../models/input/ChangePasswordInput");
const ResetPasswordInput_1 = require("../models/input/ResetPasswordInput");
const auth_guard_1 = require("../guards/http/auth.guard");
const user_decorator_1 = require("../config/user.decorator");
const UpdateInput_1 = require("../models/input/UpdateInput");
const platform_express_1 = require("@nestjs/platform-express");
const UserResponse_1 = require("../models/response/UserResponse");
const MemberResponse_1 = require("../models/response/MemberResponse");
const RequestResponse_1 = require("../models/response/RequestResponse");
const serializeValidationError_1 = require("../utils/serializeValidationError");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(credentials, req) {
        return await this.userService.register(credentials, req);
    }
    async login(credentials, req) {
        return await this.userService.login(credentials, req);
    }
    async logout(req, res) {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy((err) => console.log(err));
        return res.clearCookie(constants_1.COOKIE_NAME).status(200).send(true);
    }
    async changePassword(input, id) {
        return await this.userService.changePassword(input, id);
    }
    async forgotPassword({ email }) {
        return await this.userService.forgotPassword(email);
    }
    async resetPassword(input, req) {
        return await this.userService.resetPassword(input, req);
    }
    async findCurrentUser(id) {
        return await this.userService.findCurrentUser(id);
    }
    async update(id, data, image) {
        return await this.userService.updateUser(id, data, image);
    }
    async getFriends(id) {
        return await this.userService.getFriends(id);
    }
    async getFriendRequests(id) {
        return await this.userService.getPendingFriendRequests(id);
    }
    async sendFriendRequest(memberId, userId) {
        return await this.userService.sendFriendRequest(userId, memberId);
    }
    async addFriend(memberId, userId) {
        return await this.userService.acceptFriendRequest(userId, memberId);
    }
    async cancelFriendRequest(memberId, userId) {
        return await this.userService.cancelFriendRequest(userId, memberId);
    }
    async removeFriend(memberId, userId) {
        return await this.userService.removeFriend(userId, memberId);
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register Account' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Newly Created User', type: UserResponse_1.UserResponse }),
    (0, swagger_1.ApiBadRequestResponse)({ type: serializeValidationError_1.ValidationErrors }),
    (0, swagger_1.ApiBody)({ type: RegisterInput_1.RegisterInput }),
    __param(0, (0, common_1.Body)(new yupValidationPipe_1.YupValidationPipe(user_schema_1.RegisterSchema))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({ summary: 'User Login' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Current User', type: UserResponse_1.UserResponse }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid credentials' }),
    (0, swagger_1.ApiBody)({ type: LoginInput_1.LoginInput }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, swagger_1.ApiOperation)({ summary: 'User Logout' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Put)('change-password'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Change Current User Password' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully changed password' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: serializeValidationError_1.ValidationErrors }),
    (0, swagger_1.ApiBody)({ type: ChangePasswordInput_1.ChangePasswordInput }),
    __param(0, (0, common_1.Body)(new yupValidationPipe_1.YupValidationPipe(user_schema_1.ChangePasswordSchema))),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangePasswordInput_1.ChangePasswordInput, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Forgot Password Request' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Send Email' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: serializeValidationError_1.ValidationErrors }),
    __param(0, (0, common_1.Body)(new yupValidationPipe_1.YupValidationPipe(user_schema_1.ForgotPasswordSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPasswordInput_1.ForgotPasswordInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset Password' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully reset password' }),
    (0, swagger_1.ApiBody)({ type: ResetPasswordInput_1.ResetPasswordInput }),
    (0, swagger_1.ApiBadRequestResponse)({ type: serializeValidationError_1.ValidationErrors }),
    __param(0, (0, common_1.Body)(new yupValidationPipe_1.YupValidationPipe(user_schema_1.ResetPasswordSchema))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPasswordInput_1.ResetPasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get Current User' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Current user', type: UserResponse_1.UserResponse }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findCurrentUser", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Current User' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Update Success', type: UserResponse_1.UserResponse }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBody)({ type: UpdateInput_1.UpdateInput }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(new yupValidationPipe_1.YupValidationPipe(user_schema_1.UserSchema), new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateInput_1.UpdateInput, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/me/friends'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get Current User\'s friends' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of users', type: [MemberResponse_1.MemberResponse] }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)('/me/pending'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get Current User\'s friend requests' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of users', type: [RequestResponse_1.RequestResponse] }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriendRequests", null);
__decorate([
    (0, common_1.Post)('/:memberId/friend'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Add Friend' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully send a friend request' }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)('/:memberId/friend/accept'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Accept Friend Request' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully added as friend' }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Post)('/:memberId/friend/cancel'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel Friend Request' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully canceled the request' }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "cancelFriendRequest", null);
__decorate([
    (0, common_1.Delete)('/:memberId/friend'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Remove Friend' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully removed friend' }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeFriend", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Account Operation'),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map