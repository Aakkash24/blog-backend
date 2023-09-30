import { app } from ".."
import Blog from "../models/Blog";
import request from 'supertest';
import { deleteBlog,likeBlog } from "../controllers/blog";

const mockRequest:any = {} as Request;
const mockResponse:any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("Blog Router",()=>{
    describe('GET /getAll', () => {
        it('should respond with status 200 and return all blogs', async () => {
          const response = await request(app).get('/blog/getAll');
          expect(response.status).toBe(200);
        });
    });

    describe('GET /find/:id', () => {
        it('should respond with status 200 and return a specific blog', async () => {
          const blogId = '1234'; // Invalid blog ID
          const response = await request(app).get(`/blog/find/${blogId}`);
          expect(response.status).toBe(400);
        });
      });
    
    describe('POST /blog', () => {
    it('should respond with status 200', async () => {
      const response = await request(app).post('/blog/').send({
        title:"Temp",
        desc:"Temp",
        category:"Music",
        photo:"Temp"
      });
      expect(response.status).toBe(200);

      it('should handle errors and respond with status 400', async () => {
        const response = await request(app).post('/blog/').send({ title:"Temp",
        desc:"Temp",
        category:"Music",
        photo:"Temp"});
        expect(response.status).toBe(400);

            });
        });
      
        describe('deleteBlog', () => {
          it('should delete a blog and respond with status 200', async () => {
            const blogId = 'mockBlogId';
            const mockBlog = {
              _id: blogId,
              uid: 'mockUserId', // Assuming the user ID of the blog owner
            };
            (Blog.findById as jest.Mock).mockResolvedValueOnce(mockBlog);
        
            mockRequest.params = { id: blogId };
            mockResponse.user = { id: 'mockUserId' }; // Simulating the authenticated user
            await deleteBlog(mockRequest, mockResponse);
        
            expect(mockResponse.status).toHaveBeenCalledWith(200);
          });
        
          it('should not delete a blog if the authenticated user is not the owner', async () => {
            const blogId = 'mockBlogId';
            const mockBlog = {
              _id: blogId,
              uid: 'otherUserId', // A different user ID than the authenticated user
            };
            (Blog.findById as jest.Mock).mockResolvedValueOnce(mockBlog);
        
            mockRequest.params = { id: blogId };
            mockResponse.user = { id: 'mockUserId' }; // Simulating a different authenticated user
            await deleteBlog(mockRequest, mockResponse);
        
            expect(mockResponse.status).toHaveBeenCalledWith(400);
          });
        
          it('should handle an error and respond with status 400', async () => {
            const blogId = 'mockBlogId';
            (Blog.findById as jest.Mock).mockRejectedValueOnce(new Error('Mock error'));
        
            mockRequest.params = { id: blogId };
            await deleteBlog(mockRequest, mockResponse);
        
            expect(mockResponse.status).toHaveBeenCalledWith(400);
          });
        });
    });

    describe('likeBlog', () => {
      it('should like a blog and respond with status 200', async () => {
        const blogId = 'mockBlogId';
        const userId = 'mockUserId';
        const mockBlog = { blikes: [] };
        (Blog.findById as jest.Mock).mockResolvedValueOnce(mockBlog);
    
        mockRequest.params = { id: blogId };
        mockResponse.locals = { user: { id: userId } };
    
        await likeBlog(mockRequest, mockResponse);
    
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    
      it('should unlike a blog and respond with status 200', async () => {
        const blogId = 'mockBlogId';
        const userId = 'mockUserId';
        const mockBlog = { blikes: [userId] };
        (Blog.findById as jest.Mock).mockResolvedValueOnce(mockBlog);
    
        mockRequest.params = { id: blogId };
        mockResponse.locals = { user: { id: userId } };
    
        await likeBlog(mockRequest, mockResponse);
    
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    
      it('should handle errors and respond with status 400', async () => {
        const blogId = 'mockBlogId';
        const errorMessage = 'An error occurred';
        (Blog.findById as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
        mockRequest.params = { id: blogId };
    
        await likeBlog(mockRequest, mockResponse);
    
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
    });
})