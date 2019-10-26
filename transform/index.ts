exports.handler = async (event, context) => {
    /* Process the list of records and transform them */
   
    const output = event.records.map((record) => {
        let dataBuffer = new Buffer(record.data);
        let dataString = dataBuffer.toString('ascii');
        return {
        /* This transformation is the "identity" transformation, the data is left intact */
        recordId: record.recordId,
        result: 'Ok',
        data: dataString,
        }
    })
    ;
    console.log(`Processing completed.  Successful records ${output.length}.`);
    return { records: output };
};
