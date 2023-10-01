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
const Blog_1 = __importDefault(require("../models/Blog"));
const supertest_1 = __importDefault(require("supertest"));
const blog_1 = require("../controllers/blog");
const mockRequest = {};
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
describe("Blog Router", () => {
    describe('GET /getAll', () => {
        it('should respond with status 200 and return all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).get('/blog/getAll');
            expect(response.status).toBe(200);
        }));
    });
    describe('GET /find/:id', () => {
        it('should respond with status 200 and return a specific blog', () => __awaiter(void 0, void 0, void 0, function* () {
            const blogId = '1234'; // Invalid blog ID
            const response = yield (0, supertest_1.default)(__1.app).get(`/blog/find/${blogId}`);
            expect(response.status).toBe(400);
        }));
    });
    describe('POST /blog', () => {
        it('should respond with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).post('/blog/').send({
                title: "Temp",
                desc: "Temp",
                category: "Music",
                photo: "Temp"
            });
            expect(response.status).toBe(200);
            it('should handle errors and respond with status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).post('/blog/').send({ title: "Temp",
                    desc: "Temp",
                    category: "Music",
                    photo: "Temp" });
                expect(response.status).toBe(400);
            }));
        }));
        describe('deleteBlog', () => {
            it('should delete a blog and respond with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                const blogId = 'mockBlogId';
                const mockBlog = {
                    _id: blogId,
                    uid: 'mockUserId', // Assuming the user ID of the blog owner
                };
                Blog_1.default.findById.mockResolvedValueOnce(mockBlog);
                mockRequest.params = { id: blogId };
                mockResponse.user = { id: 'mockUserId' }; // Simulating the authenticated user
                yield (0, blog_1.deleteBlog)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('should not delete a blog if the authenticated user is not the owner', () => __awaiter(void 0, void 0, void 0, function* () {
                const blogId = 'mockBlogId';
                const mockBlog = {
                    _id: blogId,
                    uid: 'otherUserId', // A different user ID than the authenticated user
                };
                Blog_1.default.findById.mockResolvedValueOnce(mockBlog);
                mockRequest.params = { id: blogId };
                mockResponse.user = { id: 'mockUserId' }; // Simulating a different authenticated user
                yield (0, blog_1.deleteBlog)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('should handle an error and respond with status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                const blogId = 'mockBlogId';
                Blog_1.default.findById.mockRejectedValueOnce(new Error('Mock error'));
                mockRequest.params = { id: blogId };
                yield (0, blog_1.deleteBlog)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
        });
    });
    describe('likeBlog', () => {
        it('should like a blog and respond with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const blogId = 'mockBlogId';
            const userId = 'mockUserId';
            const mockBlog = { blikes: [] };
            Blog_1.default.findById.mockResolvedValueOnce(mockBlog);
            mockRequest.params = { id: blogId };
            mockResponse.locals = { user: { id: userId } };
            yield (0, blog_1.likeBlog)(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        }));
        it('should unlike a blog and respond with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const blogId = 'mockBlogId';
            const userId = 'mockUserId';
            const mockBlog = { blikes: [userId] };
            Blog_1.default.findById.mockResolvedValueOnce(mockBlog);
            mockRequest.params = { id: blogId };
            mockResponse.locals = { user: { id: userId } };
            yield (0, blog_1.likeBlog)(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        }));
        it('should handle errors and respond with status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const blogId = 'mockBlogId';
            const errorMessage = 'An error occurred';
            Blog_1.default.findById.mockRejectedValueOnce(new Error(errorMessage));
            mockRequest.params = { id: blogId };
            yield (0, blog_1.likeBlog)(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        }));
    });
});
