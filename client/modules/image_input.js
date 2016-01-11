const imageInput = {
  upload( e, input ) {
    return _upload( e, input );
  }
};

const _upload = ( e, input ) => {
  if ( input.state.uploading ) {
    const filePath = $(e.target).val();
    const dotIndex = filePath.lastIndexOf('.');
    const extension = filePath.slice(dotIndex + 1);

    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
      return _insertImage( e, input );
    } else {
      _resetData( input );
      Bert.alert('Image must be a JPG or PNG', 'warning');
    }
  } else {
    const imageUrl = $('[name=image-file]').val();
    Session.set('imageUrl', imageUrl);
  }
};

const _insertImage = ( e, input ) => {
  FS.Utility.eachFile(e, function (file) {
    Images.insert(file, function (err, fileObj) {
      if (err) {
        alert(err.reason)
      } else {
        Session.set('imageName', fileObj.original.name);
        input.state.imageName = fileObj.original.name;
        setTimeout(function () {
          Session.set('imageUrl', '/cfs/files/images/' + fileObj._id);
          return '/cfs/files/images/' + fileObj._id;
        }, 1000);
      }
    });
  });
};

const _resetData = ( input ) => {
  input.state.imageName = null;
  input.state.imageUrl = null;
  input.setState({
    uploading: true
  });
  Session.set('imageName', null);
  Session.set('imageUrl', null);
};

Modules.client.imageInput = imageInput;
