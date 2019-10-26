const AWS = require('aws-sdk');
const firehose = new AWS.Firehose({ apiVersion: '2015-08-04', region: 'us-east-1' });
var params = {
    DeliveryStreamName: 'terraform-kinesis-firehose-extended-s3-test-stream',
    Record: {
        Data: Buffer.from(JSON.stringify({ "hello": "test" })) || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */ /* required */
    }
};
firehose.putRecord(params, function (err, data) {
    if (err)
        console.log(err, err.stack); // an error occurred
    else
        console.log(data); // successful response
});
//# sourceMappingURL=index.js.map