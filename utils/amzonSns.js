import AWS from "aws-sdk"

const sendSMS=(phone,message)=>{

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1"
});

const sns = new AWS.SNS();

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
