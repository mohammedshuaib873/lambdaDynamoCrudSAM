let response;
const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.FetchAllEmployees = async (event, context) => {

    const data = await dynamodb.scan({

        TableName: 'employeeDetails'

    }).promise()

        response = {

            'statusCode': 200,

            'body': JSON.stringify({

                employee: data.Items,

            })

        }

    return response

};

exports.createEmployee = async (event, context) => {
    const {id, employeeName, dob, salary } = JSON.parse(event.body);
    await dynamodb.put({
        TableName: "employeeDetails",
        Item : {
            id,
            employeeName,
            dob,
            salary
        }
    }).promise()
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: `Employee Created Successfully`,
        })
    }
return response
};

exports.deleteEmployee = async (event, context) => {
    await dynamodb.delete({
        TableName: "employeeDetails",
        Key : {
            id : event.pathParameters.id,
        }
    }).promise()
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: `Employee Deletion Successfull`,
        })
    }
return response
};

exports.updateEmployee = async (event, context) => {
    const {Item} = JSON.parse(event.body);
    await dynamodb.update({
        TableName: "employeeDetails",
        Key : {
            id : event.pathParameters.id,
        },
    UpdateExpression: 'set employeeName= :e, dob= :d, salary= :s',
        ExpressionAttributeValues:{
          ':e' : Item.employeeName,
          ':d' : Item.dob,
          ':s' : Item.salary
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: `Employee UPDATED Successfully`,
        })
    }
return response
};
