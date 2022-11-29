const request = require('supertest');
const assert = require('assert');
const express = require('express');
const Post = require("../models/Post");
const  ObjectID = require('mongodb').ObjectId;




const app = express();
req = request('http://localhost:8082/api');

describe('GET /user', function() {
    test('successfully created new post', function () {
        const post = {
            'username': "aman",
            'title': "TestPost",
            'desc': "Post for testing",
            'categories': "ppo",
            'photo': "test-2.png"
          };
        req
            .post('/posts')
            .send(post)
            .expect(200);
    })
    test('failed due to same title', function () {
        const post = {
            'username': "aman",
            'title': "TestPost",
            'desc': "Amazon selected 58 from iiitb",
            'categories': "SDE",
            'photo': "1650293072774WhatsApp Image 2022-03-04 at 14.10.12.jpeg"
          };
        req
            .post('/posts')
            .send(post)
            .expect(500);
    })
    test('failed because of no title', function () {
        const post = {
            'username': "aman",
            'desc': "Amazon selected 58 from iiitb",
            'categories': "SDE",
            'photo': "1650293072774WhatsApp Image 2022-03-04 at 14.10.12.jpeg"
          };
        req
            .post('/posts')
            .send(post)
            .expect(500);
    })
    test('failed because of no username', function () {
        const post = {
            'title': "PPO Update 1",
            'desc': "Amazon selected 58 from iiitb",
            'categories': "SDE",
            'photo': "1650293072774WhatsApp Image 2022-03-04 at 14.10.12.jpeg"
          };
        req
            .post('/posts')
            .send(post)
            .expect(500);
    })
    test('failed due to no description', function () {
        const post = {
            'username': "aman",
            'title': "PPO Update 2",
            'categories': "SDE",
            'photo': "1650293072774WhatsApp Image 2022-03-04 at 14.10.12.jpeg"
          };
        req
            .post('/posts')
            .send(post)
            .expect(500);
    })
    test('Unauthorised user trying to delete the post', function (done) {
        const id = ObjectID('62797c7cddad38817ad27974');
        
        req
            .delete(`/posts/${id}`
              ).send({ 'username': 'amana' })
            .expect(401,done);
    })
    test('successfully deleted post', function (done) {
        const id = ObjectID('6380c32fa37641290d9dac80');
        req
            .delete(`/posts/${id}`
              ).send({ 'username': 'aman' })
            .expect(200,done);
    })
    test('Get a post successful', function () {
        const id = ObjectID('62797c7cddad38817ad27974');
        
        req
            .get(`/posts/${id}`)
            .expect(200);
    })
    test('Get all post successful', function (done) {
        req
            .get(`/posts`)
            .expect(200,done);
    })
    test('successfully updated own post', function (done) {
        const id = ObjectID('6380c3f3a37641290d9dac8e');
        req
            .put(`/posts/${id}`
              ).send({
                username: 'aman',
                title: 'UpdatePost',
                desc: 'Test Succcessful',
              })
            .expect(200,done);
    })
    test('successfully updated post using admin account', function (done) {
        const id = ObjectID('6380c4b4a37641290d9dac96');
        req
            .put(`/posts/${id}`
              ).send({
                username: 'admin',
                title: 'AdminUpdatePost',
                desc: 'Test Succcessful',
              })
            .expect(200,done);
    })
    test('Unauthorized user trying to update post', function (done) {
        const id = ObjectID('6380c4b4a37641290d9dac96');
        req
            .put(`/posts/${id}`
              ).send({
                username: 'rahul',
                title: 'AWS',
                desc: 'Test Succcessful',
              })
            .expect(401,done);
    })
})