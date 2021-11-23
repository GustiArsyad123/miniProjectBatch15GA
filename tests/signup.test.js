const request = require("supertest");
const { user } = require("../models");
const app = require("../app");
const { encodePin } = require("../utils");

beforeAll(async () => {
  let users = await user.create({
    firstName:
      "/home/cryptography/Documents/Glints Academy Batch 15/Back-End/miniProject/mini project fix/backendteam_d/app.s",
    lastName: "Gusti Arsyad",
    email: "gusti@gmail.com",
    password: "oke12345",
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
      const hashPassword = encodePin("Rahasiaaa1@");
      let input = {
        firstName:
          "/home/cryptography/Documents/Glints Academy Batch 15/Back-End/miniProject/mini project fix/backendteam_d/app.s",
        lastName: "Eka",
        email:
          "/home/cryptography/Documents/Glints Academy Batch 15/Back-End/miniProject/mini project fix/backendteam_d/app.s@gmail.com",
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
            firstName:
              "/home/cryptography/Documents/Glints Academy Batch 15/Back-End/miniProject/mini project fix/backendteam_d/app.s",
            lastName: "Eka",
            email:
              "/home/cryptography/Documents/Glints Academy Batch 15/Back-End/miniProject/mini project fix/backendteam_d/app.s@gmail.com",
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
        firstName:
          "/home/cryptography/Documents/Glints Academy Batch 15/Back-End/miniProject/mini project fix/backendteam_d/app.s",
        lastName: "Eka",
        email: "de@gmail.com",
        password: "Rahasiaaa1@",
        confirmPassword: "Rahasiaaa1@",
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
