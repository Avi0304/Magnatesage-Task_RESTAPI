const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User')

let token = "";
let taskId = "";

beforeAll(async () => {
    await request(app).post('/api/auth/register').send({ username: "taskuser", password: "12345678" });
    const res = await request(app).post('/api/auth/login').send({ username: "taskuser", password: "12345678" });
    token = res.body.token;
});

afterAll(async () => {
    await User.deleteOne({ username: "taskuser" });
    await mongoose.connection.close();
});

describe('Task API', () => {
    it('should create a task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: "Test Task", description: "Jest Test", status: 'pending' });

        expect([200, 201]).toContain(res.statusCode);
        expect(res.body.task).toBeDefined();
        taskId = res.body.task._id;
    });

    it('should fail to create without token', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({ title: "No token task" });

        expect(res.statusCode).toBe(401);
    });

    it('should get all tasks', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect([200, 201]).toContain(res.statusCode);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the task', async () => {
        const res = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: "Updated Task", status: "completed" });

        expect(res.statusCode).toBe(200);
        expect(res.body.updateTask).toBeDefined();
        expect(res.body.updateTask.title).toBe("Updated Task");
    });

    it('should delete the task', async () => {
        const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/Delete/i);
    });
});
