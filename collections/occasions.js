Occasions = new Mongo.Collection('occasions');

OccasionsSchema = new SimpleSchema({
    'name': {
        type: String,
        label: 'Occasion Name'
    },
    'userId': {
        type: String,
        label: 'Occasion Owner User ID',
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
        label: 'Date Occasion Created',
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
        label: 'Date Occasion Last Updated',
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return new Date;
            }
        }
    },
    'giftCount': {
        type: Number,
        label: 'Number of Gifts with Occasion',
        optional: true,
        autoValue: function() {
            if (this.isInsert) {
                return 0;
            }
        }
    }
});
Occasions.attachSchema(OccasionsSchema);

Occasions.allow({
    update: function(userId) {
        return isAdmin(userId);
    },
    remove: function(userId) {
        return isAdmin(userId);
    }
});

Occasions.deny({
    update: function(userId, occasion, fieldNames) {
        //may only edit accessible fields:
        return (_.without(fieldNames, 'name').length > 0);
    }
});

Occasions.deny({
    update: function(userId, occasion, fieldNames, modifier) {
        const errors = validateOccasion(modifier.$set);
        return errors.name;
    }
});

validateOccasion = function(occasion) {
    const errors = {};
    if (!occasion.name)
        errors.name = 'Please enter a name';
    return errors;
};

Meteor.methods({
    occasionInsert: function(occasion) {
        check(Meteor.userId(), String);
        check(occasion, Occasions.simpleSchema());

        const errors = validateOccasion(occasion);
        if (errors.name)
            throw new Meteor.Error('invalid-occasion', 'You must set a name.');

        const occasionId = Occasions.insert(occasion);
        return {
            _id: occasionId
        };
    }
});
