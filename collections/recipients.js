Recipients = new Mongo.Collection('recipients');

Recipients.allow({
  update: function(userId) {
    return isAdmin(userId);
  },
  remove: function(userId) {
    return isAdmin(userId);
  }
});

Recipients.deny({
  update: function(userId, recipient, fieldNames) {
    //may only edit accessible fields:
    return (_.without(fieldNames, 'name', 'gender').length > 0);
  }
});

Recipients.deny({
  update: function(userId, recipient, fieldNames, modifier) {
    const errors = validateRecipient(modifier.$set);
    return errors.name || errors.gender;
  }
});

const RecipientsSchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Recipient Name'
  },
  'gender': {
    type: String,
    label: 'Recipient Gender'
  },
  'userId': {
    type: String,
    label: 'Recipient Owner User ID',
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    },
    denyUpdate: true
  },
  'created': {
    type: Date,
    label: 'Date Recipient Created',
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    },
    denyUpdate: true
  },
  'updated': {
    type: Date,
    label: 'Date Recipient Last Updated',
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date;
      }
    }
  },
  'giftCount': {
    type: Number,
    label: 'Number of Gifts with Recipient',
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return 0;
      }
    }
  }
});

Recipients.attachSchema(RecipientsSchema);
