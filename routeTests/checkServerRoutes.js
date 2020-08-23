const chai = require("chai");
const chaiHttp = require("./node_modules/chai-http");
const app = require("../index");

// configure chai
chai.use(chaiHttp);
chai.should();

describe("Make sure status is 200", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("Make sure register failure if no data", () => {
  it("should return 400", (done) => {
    chai
      .request(app)
      .post("/register")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
});
