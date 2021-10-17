const { it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../index");
const { questions } = require("../../db/seed");

describe("/api/v1/knowledge-check", () => {
  describe("GET /", () => {
    it("retrieves knowledge checks ", (done) => {
      request(app)
        .get("/api/v1/knowledge-checks")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = JSON.parse(res.text);

          for (const question of questions) {
            expect(
              response.payload.find(
                (q) => q.question.text === question.question.text
              )
            ).toBeDefined();
          }

          done();
        });
    });

    it("only sends 1 check", (done) => {
      request(app)
        .get("/api/v1/knowledge-checks?qty=1")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = JSON.parse(res.text);
          expect(response.payload).toHaveLength(1);

          done();
        });
    });
  });

  describe("GET /:id", () => {});
});
