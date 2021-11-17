const request = require("supertest");
const app = require("express");
const { user } = require("../models");

beforeAll(() => {
  user.create({
    firstName: "Dena",
    lastName: "Eka",
    email: "dena@gmail.com",
    password: "rahasia",
    image: "http:www.image.com/images/abc.jpg",
  });
});
afterAll((done) => {
  user
    .destroy({ where: {} })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("User try to login:", () => {
  describe("Success:", () => {
    it("Should return 200 and access_token", (done) => {
      let input = {
        email: "dena@gmail.com",
        password: "rahasia",
      };
      request(app)
        .post("/signin")
        .send(input)
        .then((response) => {
          let { body, status } = response;
          expect(status).toBe(200);
          console.log("user token", body.token);
          expect(body).toHaveProperty("token");
          expect(typeof body.token).toBe("string");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Failed:", () => {
    describe("Wrong email", () => {
      it("Should return 400 and 'Please input email correctly!", (done) => {
        let input = {
          email: "jajaja@outlook.co.id",
          password: "rahasia",
        };
        request(app)
          .post("/signin")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Please input email correctly!"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Wrong password", () => {
      it("Should return 400 and 'Please input password correctly!'", (done) => {
        let input = {
          email: "dena@gmail.com",
          password: "rafsdhasia",
        };
        request(app)
          .post("/signin")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Please input password correctly!"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Email or password is not found or empty", () => {
      it("Should return 400 and 'Email or Password is incorrect'", (done) => {
        let input = {
          email: "",
        };
        request(app)
          .post("/signin")
          .send(input)
          .then((response) => {
            let { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("errorMessages");
            expect(body.errorMessages).toEqual(
              expect.arrayContaining(["Email or Password is incorrect"])
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
