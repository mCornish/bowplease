const generateRecipients = () => {
  let fakeRecipientCount = 20,
      recipientsExist    = _checkIfRecipientsExist( fakeRecipientCount );

  if ( !recipientsExist ) {
    _createRecipients( _generateFakeRecipients( fakeRecipientCount ) );
  }
};

const _checkIfRecipientsExist = ( count ) => {
  let recipientCount = Recipients.find().count();
  return recipientCount < count ? false : true;
};

const _createRecipients = ( recipients ) => {
  for ( let i = 0; i < recipients.length; i++ ) {
    const recipient = recipients[ i ];
    const recipientExists = _checkIfRecipientExists( recipient );

    if ( !recipientExists ) {
      _createRecipient( recipient );
    }
  }
};

let _checkIfRecipientExists = ( name ) => {
  return Recipients.findOne( { 'name': name } );
};

let _createRecipient = ( recipient ) => {
  Meteor.call('recipientInsert', recipient);
};

let _generateFakeRecipients = ( count ) => {
  let recipients = [];

  for ( let i = 0; i < count; i++ ) {
    recipients.push({
      name: faker.hacker.noun(),
      gender: Math.random() < .5 ? 'male' : 'female'
    });
  }

  return recipients;
};

Modules.server.generateRecipients = generateRecipients;
