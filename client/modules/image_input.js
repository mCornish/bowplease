const imageInput = {
  upload( e, uploading ) {
    return _upload( e, uploading );
  }
};

const _upload = ( e, uploading ) => {
  if ( uploading ) {
    const filePath = $(e.target).val();
    const dotIndex = filePath.lastIndexOf('.');
    const extension = filePath.slice(dotIndex + 1);

    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
      return _insertImage( e );
    } else {
      _resetData();
      Bert.alert('Image must be a JPG or PNG', 'warning');
    }
  } else {
    const imageUrl = $('[name=image-file]').val();
    Session.set('imageUrl', imageUrl);
  }
};

const _insertImage = ( e ) => {
  FS.Utility.eachFile(e, function (file) {
    Images.insert(file, function (err, fileObj) {
      if (err) {
        alert(err.reason)
      } else {
        Session.set('imageName', fileObj.original.name);
        setTimeout(function () {
          Session.set('imageUrl', '/cfs/files/images/' + fileObj._id);
        }, 1000);
      }
    });
  });
};

const _resetData = () => {
  Session.set('imageName', null);
  Session.set('imageUrl', null);
};

Modules.client.imageInput = imageInput;
