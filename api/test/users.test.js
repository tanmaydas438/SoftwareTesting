const request = require('supertest');
const assert = require('assert');
const express = require('express');
const Post = require("../models/Post");
const  ObjectID = require('mongodb').ObjectId;




const app = express();
req = request('http://localhost:8082/api');
describe('GET /user', function() {
    test('Successfully updated user', function (done) {
        const id = ObjectID('637bea0c5f6b89e04d70b0ae');
        req
            .put(`/users/${id}`
              ).send({
                userId: id,
                username: 'agt110',
                email: 'agt110@gmail.com',
                password: 'agt110',
              })
            .expect(200,done);
    })
    test('Unauthorized user trying to update other profile', function (done) {
        const id = ObjectID('6276aa21f35aa70020605451');
        req
            .put(`/users/${id}`
              ).send({
                userId: ObjectID('637bea0c5f6b89e04d70b0ae'),
                username: 'agtt10',
                email: 'agtt@gmail.com',
                password: 'agtt10',
              })
            .expect(401,done);
    })
    test('Successfully deleted user', function (done) {
        const id = ObjectID('62775675e7e3973f4810bdb8');
        req
            .delete(`/users/${id}`
              ).send({
                userId: id,
              })
            .expect(200,done);
    })
    test('Unauthorized access to delete user', function (done) {
        const id = ObjectID('6276aa21f35aa70020605451');
        req
            .delete(`/users/${id}`
              ).send({
                userId: ObjectID('6278249b50395f44fa115a61'),
              })
            .expect(401,done);
    })
    test('Get a user', function (done) {
        const id = ObjectID('637bea0c5f6b89e04d70b0ae');
        req
            .get(`/users/${id}`)
            .expect(200,done);
    })
})