const request = require("supertest");
const { user } = require("../models");
const app = require("../app");
const { encodePin } = require("../utils");

beforeAll(async () => {
  let users = await user.create({
    firstName: "Gusti",
    lastName: "Arsyad",
    email: "selamat@gmail.com",
    password: "12345TestingOke!",
  });
});
afterAll((done) => {
  user
    .destroy({ where: {}, force: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("user signup", () => {
  describe("Successfully create user", () => {
    it("Should return 201 and obj (user)", (done) => {
      const hashPassword = encodePin("12345TestingOke!");
      let input = {
        firstName: "Gusti",
        lastName: "Arsyad",
        email: "selamat@gmail.com",
        password: hashPassword,
        confirmPassword: hashPassword,
      };
      request(app)
        .post("/signup")
        .send(input)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("data");
          expect(body.data).toMatchObject({
            firstName: "Gusti",
            lastName: "Arsyad",
            email: "selamat@gmail.com",
          });
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Email already registered", () => {
    it("Should return 400 and error messages", (done) => {
      let input = {
        firstName: "Gusti",
        lastName: "Arsyad",
        email: "selamat@gmail.com",
        password: "12345TestingOke!",
        confirmPassword: "12345TestingOke!",
      };
      request(app)
        .post("/signup")
        .send(input)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message");
          expect(body.message).toBe("Email already registered!");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
