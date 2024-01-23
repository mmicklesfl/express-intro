const request = require('supertest');
const app = require('./app'); 

describe('Mean, Median, Mode, and All Routes', () => {
    describe('/mean', () => {
        it('should calculate the mean of numbers correctly', async () => {
            const response = await request(app)
                .get('/mean?nums=1,2,3,4,5');
            expect(response.status).toBe(200);
            expect(response.body.operation).toBe('mean');
            expect(response.body.value).toBe(3);
        });
    });

    describe('/median', () => {
        it('should calculate the median of numbers correctly', async () => {
            const response = await request(app)
                .get('/median?nums=1,2,3,4,5');
            expect(response.status).toBe(200);
            expect(response.body.operation).toBe('median');
            expect(response.body.value).toBe(3);
        });
    });

    describe('/mode', () => {
        it('should calculate the mode of numbers correctly', async () => {
            const response = await request(app)
                .get('/mode?nums=1,2,2,3,3,4,4,5');
            expect(response.status).toBe(200);
            expect(response.body.operation).toBe('mode');
            expect(response.body.value).toBe('2, 3, 4');
        });
    });

    describe('/all', () => {
        it('should calculate mean, median, and mode correctly', async () => {
            const response = await request(app)
                .get('/all?nums=1,2,3,4,5,6,7,8,9,10');
            expect(response.status).toBe(200);
            expect(response.body.operation).toBe('all');
            expect(response.body.mean).toBe(5.5);
            expect(response.body.median).toBe(5.5);
            expect(response.body.mode).toBe('No mode');
        });
    });
});
