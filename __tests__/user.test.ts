import { app } from ".."
import request from 'supertest'

describe("user",()=>{
    describe('POST /login', () => {
        it('should respond with 200 and a success message', async () => {
          const response = await request(app).post('/user/login').send({
            email: 'Aakkash@gmail.com',
            password: 'Aakkash',
          });
          expect(response.status).toBe(200);
        });
    
        it('should handle invalid login data', async () => {
          const response = await request(app).post('/user/login').send({
            username: 'invaliduser',
            password: 'invalidpassword',
          });
    
          expect(response.status).toBe(400);
        });
      });

      describe('POST /register', () => {
        it('should respond with 200 and a success message', async () => {
          const response = await request(app).post('/user/register').send({
            username: 'Test3',
            email:"Test3@gmail.com",
            password: 'Test3',
          });
          console.log(response);
          expect(response.status).toBe(200);
        });
    
        it('should handle invalid registration data', async () => {
          const response = await request(app).post('/user/register').send({
            username: '',
            email:"temp@gmail.com",
            password: 'Aakkash', // Assuming invalid due to empty username
          });
    
          expect(response.status).toBe(400);
        });
      });
})