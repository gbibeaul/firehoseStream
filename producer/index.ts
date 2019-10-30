const AWS = require('aws-sdk');
const retry = require('async-retry')
const firehose = new AWS.Firehose({apiVersion: '2015-08-04', region: 'us-east-1'});
import fetch from 'node-fetch';



const url: string = "https://randomuser.me/api/";

const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json.results[0]
  } catch (error) {
    console.log(error);
  }
};

const streamData = async (dataObject) => {

   const dataReceived = await dataObject
   const dataFiltered = {
     firstName: dataReceived.name.first,
     lastName: dataReceived.name.last,
     longitude: dataReceived.location.coordinates.longitude,
     latitude: dataReceived.location.coordinates.latitude,
     age: dataReceived.dob.age,
   }
    try {

        const params = {
            DeliveryStreamName: 'firehose-test', /* required */
            Record: { /* required */
              Data: Buffer.from(JSON.stringify(dataFiltered)) || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */ /* required */
            }
          };
          firehose.putRecord(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });
    } catch (error) {
        console.log(error);
      }
}



const generateUsers = (apiUrl: string, repetitions: number) => retry(async () => {
  for(let i = 0; i < repetitions; i++) {
    await streamData(getData(apiUrl))
  }
} , { retries: 1, onRetry: (err) => console.log(err)})

generateUsers(url, 10000)