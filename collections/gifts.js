Gifts = new Mongo.Collection('gifts');

Gifts.allow({
  update: function(userId, gift) {
    return ownsDocument(userId, gift) || isAdmin(userId);
  },
  remove: function(userId, gift) {
    return ownsDocument(userId, gift) || isAdmin(userId);
  }
});

Gifts.deny({
  update: function(userId, gift, fieldNames) {
    //may only edit accessible fields:
    return (_.without(fieldNames, 'description', 'image', 'link', 'price', 'recipient', 'age', 'occasion').length > 0);
  }
});

const GiftsSchema = new SimpleSchema({
  'image': {
    type: String,
    label: 'Gift Image'
  },
  'description': {
    type: String,
    label: 'Gift Description'
  },
  'link': {
    type: String,
    label: 'Link to Buy Gift',
    optional: true
  },
  'price': {
    type: Number,
    label: 'Gift Price',
    decimal: true,
    optional: true
  },
  'recipient': {
    type: String,
    label: 'Gift Recipient',
    optional: true
  },
  'age': {
    type: Number,
    label: 'Gift Recipient Age',
    optional: true
  },
  'occasion': {
    type: String,
    label: 'Gift Occasion',
    optional: true
  },
  'userId': {
    type: String,
    label: 'Gift Owner User ID',
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
    label: 'Date Comment Created',
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
    label: 'Date Comment Last Updated',
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date;
      }
    }
  },
  'commentsCount': {
    type: Number,
    label: 'Number of Gift Comments',
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return 0;
      }
    }
  },
  'wanters': {
    type: [String],
    label: 'User IDs of Gift Wanters',
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return [];
      }
    }
  },
  'wantsCount': {
    type: Number,
    label: 'Number of Gift Wants',
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return 0;
      }
    }
  }
});

Gifts.attachSchema(GiftsSchema);
