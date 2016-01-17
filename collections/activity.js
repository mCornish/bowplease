Activity = new Mongo.Collection('activity');

Activity.allow({
  update: function(userId, activity) {
    return false;
  },
  remove: function(userId, activity) {
    return ownsDocument(userId, activity) || isAdmin(userId);
  }
});

const ActivitySchema = new SimpleSchema({
  'userId': {
    type: String,
    label: 'Activity Owner User ID',
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    },
    denyUpdate: true
  },
  'title': {
    type: String,
    label: 'Activity Title',
    denyUpdate: true
  },
  'text': {
    type: String,
    label: 'Activity Text',
    denyUpdate: true
  },
  'giftId': {
    type: String,
    label: 'Associated Gift ID',
    optional: true,
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
});

Activity.attachSchema(ActivitySchema);
