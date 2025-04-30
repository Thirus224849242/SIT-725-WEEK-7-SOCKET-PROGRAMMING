const expect = require("chai").expect;
const request = require("request");

const baseUrl = "http://localhost:3000";

describe("User Registration API", function () {
  
  it("should return status 200 for the homepage", function (done) {
    request(baseUrl, function (error, response, body) {
      console.log("\n[TEST] Homepage status code:", response.statusCode);
      expect(response.statusCode).to.equal(200);
      console.log("[PASS] Homepage loaded successfully");
      done();
    });
  });

  it("should register a user with valid data", function (done) {
    const testEmail = `test${Date.now()}@example.com`;

    request.post({
      url: `${baseUrl}/register`,
      json: {
        first_name: "Test",
        last_name: "User",
        email: testEmail,
        password: "password123"
      }
    }, function (error, response, body) {
      console.log("\n[TEST] Register valid user status code:", response.statusCode);
      console.log("[TEST] Response body:", body);
      expect(response.statusCode).to.equal(200);
      expect(body.message).to.include("User registered successfully");
      console.log("[PASS] User registered successfully with email:", testEmail);
      done();
    });
  });

  it("should fail registration with missing fields", function (done) {
    request.post({
      url: `${baseUrl}/register`,
      json: { first_name: "Incomplete" }
    }, function (error, response, body) {
      console.log("\n[TEST] Register with missing fields status code:", response.statusCode);
      console.log("[TEST] Response body:", body);
      expect(response.statusCode).to.equal(500);
      expect(body.message).to.include("Error registering user");
      console.log("[PASS] Properly handled missing fields");
      done();
    });
  });

  it("should return 404 for an invalid route", function (done) {
    request(`${baseUrl}/invalidRoute`, function (error, response, body) {
      console.log("\n[TEST] Invalid route status code:", response.statusCode);
      expect(response.statusCode).to.equal(404);
      console.log("[PASS] Invalid route returned 404 as expected");
      done();
    });
  });

  it("should fail registration with invalid email", function (done) {
    request.post({
      url: `${baseUrl}/register`,
      json: {
        first_name: "Invalid",
        last_name: "Email",
        email: null,
        password: "password123"
      }
    }, function (error, response, body) {
      console.log("\n[TEST] Register with invalid email status code:", response.statusCode);
      console.log("[TEST] Response body:", body);
      expect(response.statusCode).to.equal(500);
      expect(body.message).to.include("Error registering user");
      console.log("[PASS] Properly handled invalid email format");
      done();
    });
  });

});
