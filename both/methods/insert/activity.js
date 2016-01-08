Meteor.methods({
    activityInsert: function (activity) {
        check(activity, Activity.simpleSchema());

        try {
          const activityId = Activity.insert( activity );
          return activityId;
        } catch( exception ) {
          return exception;
        }
    }
});
