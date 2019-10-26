const AWS = require('aws-sdk');
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
   console.log(dataReceived)
   const dataFiltered = dataReceived.map(data => ({
     firstName: data.name.first,
     lastName: data.name.last,
     
   }))
    // try {
    //     const params = {
    //         DeliveryStreamName: 'firehose-test', /* required */
    //         Record: { /* required */
    //           Data: Buffer.from(JSON.stringify(dataFiltered)) || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */ /* required */
    //         }
    //       };
    //       firehose.putRecord(params, function(err, data) {
    //         if (err) console.log(err, err.stack); // an error occurred
    //         else     console.log(data);           // successful response
    //       });
    // } catch (error) {
    //     console.log(error);
    //   }
}



const generateUsers = async (apiUrl: string, repetitions: number) => {
  for(let i = 0; i < repetitions; i++) {
    await streamData(getData(apiUrl))
  }
} 

generateUsers(url, 10000)