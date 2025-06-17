const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await User.deleteOne({ username: "testuser" });
    await mongoose.connection.close();
});

describe("Auth API", () => {
    it("should register a new user", async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: "testuser", password: "testpass" });

        expect([200, 201]).toContain(res.statusCode);
        expect(res.body.message).toBeDefined();
    })

    it("should login successfully with correct credentials", async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it("should login with wrong password", async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'worngpass' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    })
});



