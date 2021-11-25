const request = require("supertest");
const { user } = require("../models");
const app = require("../app");
const { encodePin } = require("../utils");
const { verify } = require("jsonwebtoken");

beforeAll(async () => {
//   let users = await user.create({
//     firstName: "Dena",
//     lastName: "Eka",
//     email: "de@gmail.com",
//     password: "password",
//   });
});
afterAll((done) => {
//   user
//     .destroy({ where: {}, force: true })
//     .then(() => {
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
});

describe("user signin", () => {
  describe("Successfully create comment", () => {
    it("Should return 201 and obj (user)", (done) => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiRWthIiwibGFzdE5hbWUiOiJNYXJsaW5hIiwiZW1haWwiOiJla2FAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkZDNrdElEV3RFRUZaNThVdW56cHFOLjNSQ3FINmlyZUhqWlFGOUNZY2w3b3dxWFExWDZCaVMiLCJpbWFnZSI6Imh0dHBzOi8vY2RuLmZha2VyY2xvdWQuY29tL2F2YXRhcnMvbml0aW5oYXlhcmFuXzEyOC5qcGciLCJjcmVhdGVkQXQiOiIyMDIxLTExLTI1VDEwOjEzOjQwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTI1VDEwOjEzOjQwLjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTYzNzgzODM0OX0.Hvn5l4-Dvm1_CVLxDpnOxPRGBnOqMcoyQ-ibr0xB1h8";
        const payload = verifyToken(token);
    });
  });

//   describe("Email already registered", () => {
//     it("Should return 400 and error messages", (done) => {
//       let input = {
//         firstName: "Dena",
//         lastName: "Eka",
//         email: "de@gmail.com",
//         password: "Rahasiaaa1@",
//         confirmPassword: "Rahasiaaa1@",
//       };
//       request(app)
//         .post("/signup")
//         .send(input)
//         .then((response) => {
//           const { body, status } = response;
//           expect(status).toBe(400);
//           expect(body).toHaveProperty("message");
//           expect(body.message).toBe("Email already registered!");
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });
//   });
});
