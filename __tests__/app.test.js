const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
process.env.NODE_ENV = "test";

afterAll(() => {
  return connection.destroy();
});

beforeEach(() => {
  return connection.seed.run();
});

xdescribe("/api", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api").expect(200);
  });
});

describe("/api/users", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/users").expect(200);
  });
  test("GET:200 responds with array of all users", () => {
    return request(app)
      .get("/api/users")
      .then(({ body }) => {
        expect(body.campingHistory[0].camping_history[0]).toEqual(
          expect.objectContaining({
            campsite_name: expect.any(String),
            date: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("POST:201 posts username, password, firstname and lastname to passed user", () => {
    const input = {
      username: "dan",
      password: "password",
      firstname: "firstname",
      lastname: "lastname",
    };
    const expected = {
      username: "dan",
    };
    return request(app)
      .post("/api/users")
      .send(input)
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user.username).toEqual(expected.username);
      });
  });
  test("POST:400 responds with error status code", () => {
    const input = {
      username: "user1",
      password: "password1",
      firstname: "steve",
      lastname: "t",
      avatar_url:
        "https://www.iconspng.com/images/canadian-goose/canadian-goose.jpg",
    };
    return request(app)
      .post("/api/users")
      .send(input)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Key (username)=(user1) already exists.");
      });
  });
});

describe("/api/users/:user_id", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/users/user1").expect(200);
  });
  test("GET:200 responds with object of user, username and camping history", () => {
    return request(app)
      .get("/api/users/user1")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            camping_history: expect.any(Array),
            username: expect.any(String),
          })
        );
      });
  });
  test("GET:400 responds with correct error status", () => {
    return request(app).get("/api/users/user100").expect(400);
  });
});

describe("/api/reviews:place_id", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/reviews/1").expect(200);
  });
  test("GET:200 responds with object with key of reviews with array of object as property", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body: { reviews } }) => {
        expect(reviews[0]).toEqual({
          review: expect.any(String),
          username: expect.any(String),
        });
      });
  });

  test("POST:201 responds with object with review key, with values of username, review, created_at", () => {
    const input = {
      username: "user1",
      review: "test review 1",
    };
    const expected = {
      review: { username: "user1", review: "test review 1", place_id: 1 },
    };
    return request(app)
      .post("/api/reviews/1")
      .send(input)
      .expect(201)
      .then(({ body: { review } }) => {
        expect(review.username).toBe(expected.review.username);
        expect(review.place_id).toBe(expected.review.place_id);
      });
  });
});

describe("/api/camping_history", () => {
  test("POST:201 responds with campsite_history object with keys of username, date, campsite_name, votes", () => {
    const input = { username: "user1", place_id: 1, votes: 1 };
    const expected = {
      camping_history: { username: "user1", place_id: 1, votes: 1 },
    };
    return request(app)
      .post("/api/camping_history")
      .send(input)
      .expect(201)
      .then(({ body: { camping_history } }) => {
        expect(camping_history.username).toEqual(
          expected.camping_history.username
        );
      });
  });
});

describe("/api/campsites/:place_id", () => {
  test("GET:200 responds with campsite object wiith properties campsite_name, owner_name, campsite_address, booked_dates, votes", () => {
    return request(app)
      .get("/api/campsites/1")
      .expect(200)
      .then(({ body: { campsite } }) => {
        expect(campsite).toEqual(
          expect.objectContaining({
            place_id: expect.any(Number),
            owner_username: expect.any(String),
            campsite_address: expect.any(String),
            booked_dates: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });

  test("PATCH:201 increases votes on passed place_id", () => {
    const input = { votes: 1 };
    return request(app)
      .patch("/api/campsites/1")
      .send(input)
      .expect(201)
      .then(({ body: { votes } }) => expect(votes).toEqual({ votes: 2 }));
  });

  test("PATCH:400 increases votes on passed place_id", () => {
    const input = { votes: "NOTANUMBER" };
    return request(app)
      .patch("/api/campsites/1")
      .send(input)
      .expect(400)
      .then(({ body: { msg } }) => expect(msg).toBe("votes is not a number"));
  });
});

describe("/api/:owner_username/campsites", () => {
  test("GET:200 responds with owners campsites array of objects", () => {
    return request(app)
      .get("/api/owners/owner1/campsites")
      .expect(200)
      .then(({ body: { campsites } }) => {
        expect(campsites).toEqual([
          {
            owner_username: "owner1",
            campsite_name: "campsite1",
            campsite_address: "1 nc street, manchester",
            booked_dates: "1st-Jan-2002",
            place_id: 1,
            votes: 1,
          },
        ]);
      });
  });
});

describe("/api/login", () => {
  test("POST:200 responds with user details", () => {
    return request(app)
      .post("/api/login")
      .send({ username: "user1", password: "password1", isUser: true })
      .expect(200);
  });
  test("POST:200 responds with owner user details", () => {
    return request(app)
      .post("/api/login")
      .send({ username: "owner1", password: "ownerpassword1", isUser: false })
      .expect(200);
  });
  test("POST:400 responds with error", () => {
    return request(app)
      .post("/api/login")
      .send({ username: "NOTAUSER", password: "NOTAPASSWORD", isUser: true })
      .expect(400);
  });
});
