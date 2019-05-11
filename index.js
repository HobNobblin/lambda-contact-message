var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-east-1'
});

exports.handler = function(event, context) {
    console.log("Incoming: ", event);
   // var output = querystring.parse(event);
   
    var name = event.name;
    var phone = event.phone;
    var email = event.email;
    var message = event.message;

    var eParams = {
        Destination: {
            ToAddresses: ["mike.fawcett@gmail.com"]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Name: " + name + "\n" + "Phone: " + phone + "\n" + "Email: " + email + "\n" + "Message: " + message + "\n"
                }
            },
            Subject: {
                Data: "Message from " + name + " through mikefawcett.com"
            }
        },
        Source: "contact-message@mikefawcett.com"
    };

    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
            console.log("===EMAIL SENT===");
            console.log(data);


            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);
            context.succeed(event);

        }
    });

};
