Comments = new Mongo.Collection('comments');

Comments.allow({
    update: function(userId, comment) {
        return ownsDocument(userId, comment) || isAdmin(userId);
    },
    remove: function(userId, comment) {
        return ownsDocument(userId, comment) || isAdmin(userId);
    }
});

Comments.deny({
    update: function(userId, comment, fieldNames) {
        //may only edit accessible fields:
        return (_.without(fieldNames, 'body', 'updated').length > 0);
    }
});

Comments.deny({
    update: function(userId, comment, fieldNames, modifier) {
        var errors = validateComment(modifier.$set);
        return errors.body;
    }
});

const CommentsSchema = new SimpleSchema({
    'giftId': {
        type: String,
        label: 'Gift ID',
        optional: true
    },
    'body': {
        type: String,
        label: 'Comment Body'
    },
    'userId': {
        type: String,
        label: 'Comment Owner User ID',
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
    }
});
Comments.attachSchema(CommentsSchema);
