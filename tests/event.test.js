const request = require("supertest");
const app = require("../index");
const { verifyToken } = require("../utils");
const { event } = require("../models");

beforeAll(() => {});

afterAll(() => {});

describe("User try to create event:", () => {
  describe("Success:", () => {
    it("Should create the data", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImZpcnN0X25hbWUiOiJuYW5kYSIsImxhc3RfbmFtZSI6Im5pZiIsImVtYWlsIjoibmFuZGFuaWZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkclBBekxueVJiMnUudUg5WUZoTzBiZS9vZGlrMEtrT3ZnRDVzSURNQ3BUS25GT1Q1OUFhYVMiLCJjcmVhdGVkQXQiOiIyMDIxLTExLTIwVDA1OjEwOjUwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTIwVDA1OjEwOjUwLjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTYzNzQ5NzY0MH0.NHnbBZTF5pUorh6ZeAv6to4LQeUoPtRtQ3yY3PVeifA";
      const payload = verifyToken(token);
      const email = payload.email;
      console.log(payload);

      const data = await event.create(
        {
          id_user: 21,
          id_category: 7,
          event_title: "Ini Judul Event",
          event_photo: "Iniphoto.jpg",
          event_detail: "Ini Detail Event",
          date_and_time: "2021/11/11",
          link_conference: "Link Conference",
          speaker_photo: "Link Foto Speaker",
          speaker_name: "Nama Speaker",
        },
        999999999
      );

      request(app)
        .post("/event")
        .send(data)
        .set("access_token", token)
        .then((response) => {
          let { body } = response;
          expect(body).toHaveProperty("success");
          expect(body).toHaveProperty("message");
          expect(body.success).toBe(true);
          expect(body.message).toContain(
            "Congratulations!!! Success create new event"
          );
        }, 99999999)
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

describe("User try to update event:", () => {
  describe("Success:", () => {
    it("Should update the data", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImZpcnN0X25hbWUiOiJuYW5kYSIsImxhc3RfbmFtZSI6Im5pZiIsImVtYWlsIjoibmFuZGFuaWZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkclBBekxueVJiMnUudUg5WUZoTzBiZS9vZGlrMEtrT3ZnRDVzSURNQ3BUS25GT1Q1OUFhYVMiLCJjcmVhdGVkQXQiOiIyMDIxLTExLTIwVDA1OjEwOjUwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTIwVDA1OjEwOjUwLjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTYzNzQ5NzY0MH0.NHnbBZTF5pUorh6ZeAv6to4LQeUoPtRtQ3yY3PVeifA";
      const payload = verifyToken(token);
      const email = payload.email;
      console.log(payload);

      const input = await event.update(
        {
          id_user: 21,
          id_category: 7,
          event_title: "Ini Judul Event yang uda update",
          event_photo: "Iniphotoupdate.jpg",
          event_detail: "Ini Detail Event udah update",
          date_and_time: "2021/11/11",
          link_conference: "Link Conference",
          speaker_photo: "Link Foto Speaker",
          speaker_name: "Nama Speaker",
        },
        { where: { id: 44 } },
        999999999
      );

      request(app)
        .put("/event/44")
        .send(input)
        .set("access_token", token)
        .then((response) => {
          let { body } = response;
          expect(body).toHaveProperty("success");
          expect(body).toHaveProperty("data");
          expect(body.success).toBe(true);
          expect(body.data.event_title).toBe("Ini Judul Event yang uda update");
        }, 99999999)
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

describe("User try to get detail event:", () => {
  describe("Success:", () => {
    it("Should showing the data detail", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImZpcnN0X25hbWUiOiJuYW5kYSIsImxhc3RfbmFtZSI6Im5pZiIsImVtYWlsIjoibmFuZGFuaWZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkclBBekxueVJiMnUudUg5WUZoTzBiZS9vZGlrMEtrT3ZnRDVzSURNQ3BUS25GT1Q1OUFhYVMiLCJjcmVhdGVkQXQiOiIyMDIxLTExLTIwVDA1OjEwOjUwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTIwVDA1OjEwOjUwLjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTYzNzQ5NzY0MH0.NHnbBZTF5pUorh6ZeAv6to4LQeUoPtRtQ3yY3PVeifA";
      const payload = verifyToken(token);
      const email = payload.email;
      console.log(payload);

      const getDetail = await event.findOne({ where: { id: 44 } }, 999999999);

      request(app)
        .get("/event/44")
        .send()
        .set("access_token", token)
        .then((response) => {
          let { body } = response;
          expect(body).toHaveProperty("success");
          expect(body).toHaveProperty("data");
          expect(body.success).toBe(true);
          expect(body.data).toBeTruthy();
        }, 99999999)
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
