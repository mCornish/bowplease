'use strict';
const nav = {
  beginSubmit( e ) {
    _beginSubmit( e );
  },
  trackClick( e ) {
    _trackClick( e );
  }
}

const _beginSubmit = ( e ) => {
  const filePath = $( e.target ).val();
  const dotIndex = filePath.lastIndexOf('.');
  const extension = filePath.slice(dotIndex + 1);

  if ( extension === 'jpg' || extension === 'jpeg' || extension === 'png' ) {
    FS.Utility.eachFile(e, function( file ) {
      Images.insert(file, function( err, fileObj ) {
        if ( err ) {
          Bert.alert(`Image upload failed: ${err.reason}`);
        } else {
          Session.set('imageName', fileObj.original.name);
          setTimeout(function () {
            Session.set('imageUrl', '/cfs/files/images/' + fileObj._id);
            FlowRouter.go('giftSubmit');
          }, 1000);
        }
      });
    });
  } else {
    Session.set('imageName', null);
    Session.set('imageUrl', null);
    $( e.target ).blur();
    Bert.alert(`Image must be a JPG or PNG`, 'warning');
  }
}

const _trackClick = ( e ) => {
  const pageName = $(e.target).attr('data-page');
  analytics.track(`Click header: ${pageName}`);
}

Modules.client.nav = nav;
