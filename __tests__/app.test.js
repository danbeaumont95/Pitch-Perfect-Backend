const request = require('supertest')
const app = require('../app');
const connection = require('../db/connection')

afterAll(() => {
    return connection.destroy()
})

beforeEach(() => {
    return connection.seed.run()
})

describe('/api', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api')
        .expect(200)
    })
})

describe('/api/users', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
    })
    test('GET:200 responds with array of all users', () => {
        return request(app)
        .get('/api/users')
        .then(({ body }) => {
            expect(body.users[0]).toEqual(expect.objectContaining({
                username: expect.any(String),
                password: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                avatar_url: expect.any(String)
            }))
        })
    })
    test('POST:201 responds with correct status code', () => {
        return request(app)
        .post('/api/users')
        .expect(201)
    })
    test('POST:201 posts username, password, firstname and lastname to passed user', () => {
        const input = { username: 'dan', password: 'password', firstname: 'firstname', lastname: 'lastname' };
        const expected = {
            username: 'dan'
        }
        return request(app)
        .post('/api/users')
        .send(input)
        .expect(201)
        .then(({ body: { user } }) => {
            expecT(user).toEqual(expected)
        })
    })
})

describe('/api/users/:user_id', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/users/1')
        .expect(200)
    })
    test('GET:200 responds with object of user, username and camping history', () => {
        return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(({ body: { user } }) => {
            expect(user).toEqual(expect.objectContaining({
                username: expect.any(String),
                camping_history: expect(Array).toEqual(expect.objectContaining({
                    date: expect.any(Number),
                    campsite_name: expect.any(String),
                    votes: expect.any(Number)
                }))
            }))
        })
    })
})

describe('/api/reviews', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
    })
    test('GET:200 responds with array of all reviews', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body }) => {
            expect(body.reviews[0]).toEqual(expect.objectContaining({
                review_id: expect.any(Number),
                username: expect.any(String),
                campsite_name: expect.any(String),
                review: expect.any(String),
                created_at: expect.any(Number)
            }))
        })
    })
}) 

describe('/api/reviews:place_id', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
    })
    test('GET:200 responds with object with key of reviews with array of object as property', () => {
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(({ body: {reviews} }) => {
            expect(reviews).toEqual(expect.objectContaining({
                reviews: expect(Array).toEqual(expect.objectContaining({
                    username, 
                    review
                }))
            }))
        })
    })
    test('POST:201 responds with correct status code', () => {
        return request(app)
        .post('/api/reviews/1234')
        .expect(201)
    })
    test('POST:201 responds with object with review key, with values of username, review, created_at', () => {
        const input = { username: 'user', campsite_name: 'csname', review: 'very nice', created_at: 1234 }
        const expected = { review: {username, review, created_at} }
        return request(app)
        .post('/api/reviews/1234')
        .send(input)
        .expect(201)
        .then(({ body: {review} }) => [
            expect(review).toEqual(expected)
        ])
    })
})

describe('/api/camping_history', () => {
    test('POST:201 responds with correct status code', () => {
        return request(app)
        .post('/api/camping_history')
        .expect(201)
    })
    test('POST:201 responds with campsite_history object with keys of username, date, campsite_name, votes', () => {
        const input = { username: 'user', date: 1234, place_id: 1234, votes: 1 }
        const expected = { camping_history: { username, date, place_id, votes } }
        return request(app)
        .post('/api/camping_history')
        .send(input)
        .expect(201)
        .then(({ body: { camping_history } }) => {
            expect(camping_history).toEqual(expected)
        })
    })
})

describe('/api/campsites/:place_id', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/campsites/1')
        .expect(200)
    })
    test('GET:200 responds with campsite object wiith properties campsite_name, owner_name, campsite_address, booked_dates, votes', () => {
        return request(app)
        .get('/api/campsites/1')
        .expect(200)
        .then(({ body: { campsite } }) => {
            expect(campsite).toEqual(expect.objectContaining({
                campsite_name: expect.any(String),
                owner_name: expect.any(String),
                campsite_address: expect.any(String),
                booked_dates: expect.any(String),
                votes: expect.any(Number)
            }))
        })
    })
    test('PATCH:200 responds with correct status code', () => {
        return request(app)
        .patch('/api/campsites/1')
        .expect(200)
    })
    test('PATCH:200 increases votes on passed place_id', () => {
        const input = {votes: 1}
        return request(app)
        .patch('/api/campsites/1')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual({
                votes: {
                    votes: 1
                }
            })
        })
    })
})

describe('/api/:owner_username/campsites', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/owner_username/campsites')
        .expect(200)
    })
    test('GET:200 responds with owners campsites array of objects', () => {
        const arr = [{campsite_name, owner_name, campsite_address, booked_dates, votes}]
        return request(app)
        .get('/api/owner_username/campsites')
        .expect(200)
        .then(({ body: { campsites } }) => {
            expect(campsites).toEqual(Array)
        })
    })
})