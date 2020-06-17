//you should store the following values in an encrypted KVM

//var accessKeyId = context.getVariable("aws.accessKeyId");
//var secretAccessKey = context.getVariable("aws.secretAccessKey");
//var region = context.getVariable("aws.region");
//var fName = context.getVariable(request, 'aws.function');

//alternative hard code for testing
var accessKeyId = "AKIAJQ....F42ZUOA";
var secretAccessKey = "/eo6tPaMtomXx82....9OnUkhmSK5nN";
var region = "us-east-2";
var fName = "helloWorld";


var awsCredentials = new AWS.Credentials({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});

AWS.config.region = region;
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

if(!lambda){
    lambda = new AWS.Lambda();
}


//var requestPayload = context.getVariable(request, 'request.content');


var requestPayload = context.getVariable("request.content");

var params = {
    FunctionName: fName,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: requestPayload
};

lambda.invoke(params, function (err, data) {
    if (err) {
        context.setVariable("response.content","Error: " + err);
    } else {
        context.setVariable("response.content",data.Payload);
    }
});

