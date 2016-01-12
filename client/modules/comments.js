const comments = {
  submit( options ) {
    _validate( options.form );
  },
}

const _validate = ( form ) => {
  $( form ).validate( validation() );
};

const validation = () => {
  return {
    rules: {
      body: {
        required: true
      }
    },
    messages: {
      body: {
        required: 'Your comment needs some text'
      }
    },
    submitHandler() { _handleSubmit(); }
  };
};

const _handleSubmit = ( giftId ) => {
  const $body = $('[name=body]');
        const comment = {
            body: $body.val(),
            giftId: giftId
        };

        Meteor.call('commentInsert', comment, function(err, commentId) {
            if (err) {
                Bert.alert(`Comment failed: ${err.reason}`, 'danger');
            } else {
                Bert.alert(`Comment submitted`, 'success');
                $body.val('');
            }
        });
};

Modules.client.comments = comments;
