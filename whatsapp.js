exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient();
  const myNumber = context.MY_NUMBER;
  const momNumber = context.MOM_NUMBER;

  const messageBody = event.Body;
  const fromNumber = event.From;

  if (fromNumber === myNumber) {
    // Forward message to mom
    const messageOptions = {
      body: `${event.From} is asking: ${messageBody}`,
      from: 'whatsapp:' + myNumber,
      to: 'whatsapp:' + momNumber
    };
    client.messages.create(messageOptions)
      .then(() => callback(null, 'Message sent to mom'))
      .catch(err => callback(err));
  } else if (fromNumber === momNumber) {
    // Forward message to me
    const messageOptions = {
      body: `Mom says: ${messageBody}`,
      from: 'whatsapp:' + momNumber,
      to: 'whatsapp:' + myNumber
    };
    client.messages.create(messageOptions)
      .then(() => callback(null, 'Message sent to me'))
      .catch(err => callback(err));
  } else {
    // Unknown sender
    callback(null, 'Unknown sender');
  }
};
