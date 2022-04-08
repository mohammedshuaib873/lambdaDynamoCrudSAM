'use strict';
const nock = require('nock');
const got = require('got');
const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Employee Data', function () {
    it('To get All Employee', async () => {
        const result = await app.FetchAllEmployees(event, context)
        expect(result.statusCode).to.equal(200);
    });
    it('can get all employee data', async () => {
        const empObject = {
            employees: [
                { employeeName: "Shuaib", id: "3", "salary": "19000" },
                { employeeName: "Salman", id: "4", "salary": "19800"}]
        }
        nock('https://7x26zz35a2.execute-api.us-east-1.amazonaws.com/Prod/')
            .get('/FetchAllEmployees')
            .reply(200,
                empObject
            )
        const res = await got('https://7x26zz35a2.execute-api.us-east-1.amazonaws.com/Prod/FetchAllEmployees');
        expect(res.body).to.eq(JSON.stringify(empObject))
        expect(res.statusCode).to.equal(200)
    })
    it('To Post An Employee', async () => {
        const result = await app.createEmployee(event, context)
        expect(result.statusCode).to.equal(200);
    });
    it('can create employee', async () => {
        var addEmployee = {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
              employeeName: 'Shuaib'
            })
          };
  
        // nock.enableNetConnect(/(todo-app-barkend)\.herokuapp.com/)
        const res = await got.post('https://7x26zz35a2.execute-api.us-east-1.amazonaws.com/Prod/createEmployee', addEmployee)
        expect(JSON.parse(res.body)).to.have.property('employeeName', "Shuaib");
    })
});
