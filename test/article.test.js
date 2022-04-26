let chai = require("chai");
let chaiHttp = require("chai-http");
const server = require("../server");

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {
  /**
   * Test the GET route
   */
  describe("GET /article", () => {
    it("It should GET all the tasks", (done) => {
      chai
        .request(server)
        .get("/article")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should NOT GET all the articles", (done) => {
      chai
        .request(server)
        .get("/articles")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET /article/:id", () => {
    it("It should GET a article by ID", (done) => {
      const articleId = "6266f8091c9f90bd9ffde058";
      chai
        .request(server)
        .get("/article/" + articleId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("title");
          response.body.should.have.property("content");
          response.body.should.have.property("author");
          response.body.should.have.property("dateCreated");
          response.body.should.have
            .property("_id")
            .eq("6266f8091c9f90bd9ffde058");
          done();
        });
    });

    it("It should NOT GET an article by ID", (done) => {
      const articleId = 123;
      chai
        .request(server)
        .get("/article/" + articleId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq("Article does not exist!");
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /article", () => {
    it("It should POST a new article", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMzY3ZTg0ZmM1MmIwZTU0YjM2NDUiLCJlbWFpbCI6ImVsb2ltaXplcm8xMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJlbG9pIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUwOTUyMjA4fQ.Lo1QjnXxhBp6Vt10TdFS4H1WKpA4VbYl5U3svoS49_c";
      const article = {
        title: "Test Article",
        content: "This is the content from test",
      };
      chai
        .request(server)
        .post("/article")
        .set({ "x-auth-token": token })
        .send(article)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("title");
          response.body.should.have.property("content");
          response.body.should.have.property("author");
          response.body.should.have.property("dateCreated");
          response.body.should.have
            .property("_id")
            .eq("6266f8091c9f90bd9ffde058");
          done();
        });
    });
  });

  /**
   * Test the put route
   */
  describe("PUT /article", () => {
    it("It should not  PUT(UPDATE) a new article because you are not admin, not autheticated !", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMzY3ZTg0ZmM1MmIwZTU0YjM2NDUiLCJlbWFpbCI6ImVsb2ltaXplcm8xMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJlbG9pIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUwOTUyMjA4fQ.Lo1QjnXxhBp6Vt10TdFS4H1WKpA4VbYl5U3svoS49_c";
      const articleId = "6266f8091c9f90bd9ffde058";

      const article = {
        title: "UPDATED ARTICLE",
        content: "UPDATED CONTENT!",
      };
      chai
        .request(server)
        .put("/article/" + articleId)
        .set({ "x-auth-token": token })
        .send(article)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("title");
          response.body.should.have.property("content");
          response.body.should.have.property("author");
          response.body.should.have.property("dateCreated");
          response.body.should.have
            .property("_id")
            .eq("6266f8091c9f90bd9ffde058");
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  // describe("DELETE /api/tasks/:id", () => {
  //   it("It should not DELETE an existing task", (done) => {
  //     const articleId = "6266f8111c9f90bd9ffde05b";
  //     const token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMzY3ZTg0ZmM1MmIwZTU0YjM2NDUiLCJlbWFpbCI6ImVsb2ltaXplcm8xMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJlbG9pIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUwOTEzOTYzfQ.WS9_YI5TqwcAL8k_68sVtFLe22OKNi8z-PIu_tMD104";

  //     chai
  //       .request(server)
  //       .delete("/article/" + articleId)
  //       .set({ "x-auth-token": token })
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         response.body.should.be.a("object");
  //         response.body.should.have.property("_id");
  //         response.body.should.have.property("title");
  //         response.body.should.have.property("content");
  //         response.body.should.have.property("author");
  //         response.body.should.have.property("dateCreated");
  //         response.body.should.have
  //           .property("_id")
  //           .eq("6266f8111c9f90bd9ffde05b");
  //         done();
  //       });
  //   });
  // });
});

// describe("DELETE /api/tasks/:id", () => {
//   it("It should not DELETE an existing task", (done) => {
//     const articleId = "625036f7b46163e8bed15341";
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMzY3ZTg0ZmM1MmIwZTU0YjM2NDUiLCJlbWFpbCI6ImVsb2ltaXplcm8xMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJlbG9pIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ5OTQxNDI0fQ.lEEDCMgzUFBQHYdXGy48qZgvh2OIZKyqHrQ_pxvo2g4";
//     chai
//       .request(server)
//       .delete("/article/" + articleId)
//       .set("x-auth-token", token)
//       .end((err, response) => {
//         response.should.have.status(401);
//         response.text.should.be.eq("Access denied. No token provided");
//         done();
//       });
//   });
// });
