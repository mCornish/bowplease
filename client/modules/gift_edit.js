'use strict';
const giftEdit = {
  submits( options ) {
    console.log('sub');
    _validate( options.form );
  },
  removes() {
    _remove();
  }
};

const _validate = ( form ) => {
  console.log('val1');
  $( form ).validate( validation() );
};

const validation = () => {
  console.log('val');
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
    submitHandler() { _handleSubmit(); }
  };
};

const _handleSubmit = () => {
  console.log('test');
  const giftId = Gifts.findOne()._id;
  const gift = {
    image: Session.get('imageUrl'),
    description: $('[name=description]').val(),
    link: $('[name=link]').val(),
    recipient: $('[name=recipient]').val(),
    occasion: $('[name=occasion]').val()
  };

  // Append http:// to link if necessary
  if (gift.link !== '' && gift.link.indexOf('http://') !== 0) {
    gift.link = 'http://' + gift.link;
  }

  const price = parseFloat( $('[name=price]').val() );
  const age = parseInt( $('[name=age]').val() );
  if ( !isNaN(price) ) {
    _.extend(gift, {
      price: price
    });
  }
  if ( !isNaN(age) ) {
    _.extend(gift, {
      age: age
    });
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

const _remove = () => {
  const giftId = Gifts.findOne()._id;
  const confirmed = confirm('Delete this gift?');
  if ( confirmed ) {
    Meteor.call('giftRemove', giftId, gift, function( err ) {
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
