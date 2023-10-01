"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const supertest_1 = __importDefault(require("supertest"));
describe("user", () => {
    describe('POST /login', () => {
        it('should respond with 200 and a success message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).post('/user/login').send({
                email: 'Aakkash@gmail.com',
                password: 'Aakkash',
            });
            expect(response.status).toBe(200);
        }));
        it('should handle invalid login data', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).post('/user/login').send({
                username: 'invaliduser',
                password: 'invalidpassword',
            });
            expect(response.status).toBe(400);
        }));
    });
    describe('POST /register', () => {
        it('should respond with 200 and a success message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).post('/user/register').send({
                username: 'Test3',
                email: "Test3@gmail.com",
                password: 'Test3',
            });
            console.log(response);
            expect(response.status).toBe(200);
        }));
        it('should handle invalid registration data', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).post('/user/register').send({
                username: '',
                email: "temp@gmail.com",
                password: 'Aakkash', // Assuming invalid due to empty username
            });
            expect(response.status).toBe(400);
        }));
    });
});
