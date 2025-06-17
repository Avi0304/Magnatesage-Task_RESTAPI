const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

let token = "";
let taskId = "";

beforeAll(async () => {
    await request(app).post('/api/auth/register').send({ username: "taskuser", password: "12345678" })
    const res = await request(app).post('/api/auth/login').send({ username: "taskuser", password: "12345678" });
    token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});


describe('Task API', () => {
    it('should create a task', async () => {
        const res = await request(app)
            .post('/api/task')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: "Test Task", description: "Jest Test", status: 'pending' })

        expect(res.statusCode).toBe(201 || 200)
        expect(res.body.task).toBeDefined();
        taskId = res.body.task._id;
    });

    it('should create with token', async () => {
        const res = await request(app)
            .post('/api/task')
            .send({ title: "No token task" });
        expect(res.statusCode).toBe(401);
    });

    it('should get all task', async () => {
        const res = await request(app)
            .get('/api/task')
            .set('Authorization', `Bearer ${token}`)

        expect([200, 201]).toContain(res.statusCode);
        expect(Array.isArray(res.body)).toBe(true);
    });
})