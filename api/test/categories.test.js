const request = require('supertest');
const assert = require('assert');
const express = require('express');


const app = express();
req = request('http://localhost:8082/api');

beforeEach(async () => {
	// Increasing timeout otherwise sometimes a timeout error can wreck the whole testing phase
  jest.setTimeout(30000) 
})


describe('GET /categories', function() {
    test('failed due to same category', function () {
        const cat={
            'name': 'vaccine'
          };
        req
            .post('/categories')
            .send(cat)
            .expect(500);
    })
    test('get all the categories', function () {
        req
            .get('/categories')
            .expect(200);
    })
    test('successfully created new category', function (done) {
        const cat={
            'name': 'testcategory'
          }
        req
            .post('/categories')
            .send(cat)
            .expect(200,done);
    })
});