const comments = {
  submits( options ) {
    _validate( options.form, options.giftId );
  },
  edit( options ) {
    console.log('edit');
    _validate( options.form, options.commentId, true );
  },
  remove( commentId ) {
    _remove( commentId );
  }
}

const _validate = ( form, id, editting=false ) => {
  console.log(editting);
  if ( editting ) {
    $( form ).validate( _editValidation( id ) );
  } else {
    $( form ).validate( _validation( id ) );
  }
};

const _validation = ( giftId ) => {
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
    submitHandler() { _handleSubmit( giftId ); }
  };
};

const _editValidation = ( commentId ) => {
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
    submitHandler() { _handleEdit( commentId ); }
  };
};

const _handleSubmit = ( giftId ) => {
  console.log('test');
  const $body = $('[name=body]');
  const comment = {
    body: $body.val(),
    giftId: giftId
  };

  Meteor.call('commentInsert', comment, function(err, commentId) {
    if ( err ) {
      Bert.alert(`Comment failed: ${err.reason}`, 'danger');
    } else {
      Bert.alert(`Comment submitted`, 'success');
      $body.val('');
    }
  });
};

const _handleEdit = ( commentId ) => {
  const comment = {
    body: $(`[data-id=${commentId}]`).val()
  };

  Meteor.call('commentUpdate', commentId, comment, function( err ) {
    if ( err ) {
      Bert.alert(`Update failed: ${err.reason}`, 'danger');
    } else {
      Bert.alert(`Comment updated`, 'success');
    }
  });
};

const _remove = ( commentId ) => {
  const remove = confirm( 'Delete this comment?' );
  if ( remove ) {
    Meteor.call('commentRemove', commentId, function( err ) {
      if ( err ) {
        Bert.alert(`Delete failed: ${err.reason}`, 'danger');
      } else {
        Bert.alert(`Comment deleted`, 'success');
      }
    });
  }
};

Modules.client.comments = comments;
