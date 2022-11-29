const request = require('supertest');
const assert = require('assert');
const express = require('express');
const User = require("../models/User");


const app = express();
req = request('http://localhost:8082/api');

describe('GET /user', function() {
    test('login failed due to wrong password', function () {
        const user = {
			'username': 'aman',
			'password': 'aman1x'
		}
        req
            .post('/auth/login')
            .send(user)
            .expect(400);
    })
    test('login failed due to wrong username', function () {
        const user12 = {
			'username': 'aman1',
			'password': 'aman12122'
		}
        req
            .post('/auth/login')
            .send(user12)
            .expect(401);
    })
    test('login successful', function () {
        const user12 = {
			'username': 'aman',
			'password': 'aman'
		}
        req
            .post('/auth/login')
            .send(user12)
            .expect(200);
    })
    test('registration failed due to same username', function () {
        const newUser = {
            'username': 'aman',
            'email': 'akajkdgakd@hmail.com',
            'password': 'abcd',
          };
        req
            .post('/auth/register')
            .send(newUser)
            .expect(500);
    })
    test('registration failed due to same email', function () {
        const newUser = {
            'username': 'aman123',
            'email': 'aman@gmail.com',
            'password': 'abcd',
          };
        req
            .post('/auth/register')
            .send(newUser)
            .expect(500);
    })
    test('registration successful', function (done) {
        const newUser = {
            'username': 'testuser',
            'email': 'testuser@gmail.com',
            'password': 'testuser',
          };
        req
            .post('/auth/register')
            .send(newUser)
            .expect(200,done);
    })
}); 