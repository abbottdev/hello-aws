'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;


describe('Tests index', function () {
    // This is no longer a unit test.. Need to work out how to best spin up a sam environment for running tests.
    // it('verifies successful response', async () => {
    //     const result = await app.lambdaHandler(event, context)

    //     expect(result).to.be.an('object');
    //     expect(result.statusCode).to.equal(200);
    //     expect(result.body).to.be.an('string');

    //     let response = JSON.parse(result.body);

    //     expect(response).to.be.an('object');
    //     expect(response.message).to.be.equal("hello world");
    //     expect(response.location).to.be.an("string");
    // }).timeout(120000);
});

