import AWS from "aws-sdk"
const topicArn = "arn:aws:sns:ap-south-1:211125617330:otp-india"
  // Replace with the ARN of the SNS topic

const sendSMS=async(phone,message)=>{

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1"
});

const sns = new AWS.SNS();
    // const paramsForSub = {
    //   Protocol: 'sms',
    //   TopicArn: topicArn,
    //   Endpoint: phone
    // };
    //
    // // Subscribe phone number to the specified SNS topic
    // const subscriptionResult = await sns.subscribe(paramsForSub).promise();
    //
    // console.log('Successfully subscribed phone number:', phone);
    // console.log('Subscription ARN:', subscriptionResult.SubscriptionArn);
const params = {
  Message: message,
  PhoneNumber: phone, 
};


sns.publish(params, (err, data) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Message sent successfully:', data.MessageId);
  }
});

}




export default sendSMS
