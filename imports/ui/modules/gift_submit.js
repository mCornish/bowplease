'use strict';
const giftSubmit = {
  submit( options ) {
    _validate( options.form );
  },
  track( e ) {
    _track( e );
  }
};

const _validate = ( form ) => {
  $( form ).validate( validation() );
};

const validation = () => {
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
      'is-want': {
        required: false
      },
      link: {
        required: false
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
      }
    },
    submitHandler() { _handleSubmit(); }
  };
};

const _handleSubmit = () => {
  const isWant = Boolean($('[name=is-want]').is(':checked'));
  const gift = {
    image: Session.get('imageUrl'),
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
  if ( recipientVal != 'default' ) {
    gift.recipient = recipientVal;
  } else {
    gift.recipient = '';
  }
  // Make sure occasion doesn't have default value;
  if ( occasionVal != 'default' ) {
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

  Meteor.call('giftInsert', gift, function( err, giftId ) {
    if ( err ) {
      analytics.track("Gift submit failure", {
        gift: gift,
        error: err.reason
      });
      Bert.alert(`Gift submit failed: ${err.reason}`, 'danger');
    } else {
      if (isWant) {
        console.log(giftId);
        Meteor.call('want', giftId, function( err ) {
          if( err ) {
            analytics.track("Gift want failure", {
              gift: gift,
              error: err.reason
            });
            Bert.alert(`Unable to want gift: ${err.reason}`, 'danger');
          } else {
            analytics.track("Gift submit", gift);
            FlowRouter.go('/gifts/:id', { id: giftId });
          }
        });
      } else {
        analytics.track("Gift submit", gift);
        FlowRouter.go('/gifts/:id', { id: giftId });
      }
    }
  });
};

const _track = ( e ) => {
  const step = $( e.target ).attr('name');
  analytics.track('Gift Submit form: ' + step);
};

Modules.client.giftSubmit = giftSubmit;
