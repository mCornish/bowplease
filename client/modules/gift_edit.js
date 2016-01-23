'use strict';
const giftEdit = {
  submit( options ) {
    _validate( options.form, options.imageUrl );
  },
  remove( giftId ) {
    _remove( giftId );
  }
};

const _validate = ( form, imageUrl ) => {
  $( form ).validate( validation( imageUrl ) );
};

const validation = ( imageUrl ) => {
  return {
    rules: {
      'image-file': {
        required: false
      },
      image: {
        required: true
      },
      description: {
        required: true
      },
      link: {
        required: false,
        url: true
      },
      price: {
        required: false,
        number: true
      },
      age: {
        required: false,
        number: true
      }
    },
    messages: {
      image: {
        required: 'Your gift needs an image.'
      },
      description: {
        required: 'Please describe your gift.'
      },
      link: {
        url: "Your gift needs a valid link."
      }
    },
    submitHandler() { _handleSubmit( imageUrl ); }
  };
};

const _handleSubmit = ( imageUrl ) => {
  const giftId = Gifts.findOne()._id;
  const gift = {
    image: Session.get('imageUrl') || imageUrl,
    description: $('[name=description]').val()
  };
  const linkVal = $('[name=link]').val();
  const recipientVal = $('[name=recipient]').val();
  const occasionVal = $('[name=occasion]').val();
  const priceVal = parseFloat($('[name=price]').val());
  const ageVal = parseInt($('[name=age]').val());
  // Append http:// to link if necessary
  if ( linkVal && linkVal.indexOf('http://') !== 0 && linkVal.indexOf('https://') !== 0 ) {
    gift.link = 'http://' + linkVal;
  } else {
    gift.link = linkVal;
  }
  // Make sure recipient doesn't have default value;
  if (recipientVal && recipientVal.indexOf('...') < 0) {
    gift.recipient = recipientVal;
  } else {
    gift.recipient = '';
  }
  // Make sure occasion doesn't have default value;
  if (occasionVal && occasionVal.indexOf('...') < 0) {
    gift.occasion = occasionVal;
  } else {
    gift.occasion = '';
  }
  if ( !isNaN(priceVal) ) {
    gift.price = priceVal
  } else {
    gift.price = 0;
  }
  if ( !isNaN(ageVal) ) {
    gift.age = ageVal;
  } else {
    gift.age = 0;
  }

  Meteor.call('giftUpdate', giftId, gift, function( err ) {
    if ( err ) {
      Bert.alert(`Gift update failed: ${err.reason}`, 'danger');
    } else {
      Bert.alert('Gift updated', 'success');
      analytics.track('Gift Edit');
      FlowRouter.go('/gifts/:id', {id: giftId});
    }
  });
};

const _remove = ( giftId ) => {
  console.log(giftId);
  const confirmed = confirm('Delete this gift?');
  if ( confirmed ) {
    Meteor.call('giftRemove', giftId, function( err ) {
      if ( err ) {
        Bert.alert(`Gift delete failed: ${err.reason}`, 'danger');
      } else {
        Bert.alert('Gift deleted', 'success');
        analytics.track('Gift Delete');
        FlowRouter.go('/');
      }
    });
  }
};

Modules.client.giftEdit = giftEdit;
