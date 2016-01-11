ImageInput = React.createClass({
  getInitialState() {
    return {
      imageName: Session.get('imageName'),
      imageUrl: Session.get('imageUrl'),
      uploading: true,
    }
  },
  buttonText() {
    return Session.get('imageName') || 'Choose a gift image';
  },
  imageUrl() {
    return Session.get('imageUrl');
  },
  upload( e ) {
    this.state.imageUrl = Modules.client.imageInput.upload( e, this );
  },
  render() {
    if( this.state.imageUrl ) {
      return (
        <div className="col-xs-6 col-xs-offset-3">
          <div className="row">
            <img className="col-xs-12" src={this.state.imageUrl}/>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <label className="fake-link text-center col-xs-12" htmlFor="image-file">New image</label>
              <input className="file-input" name="image-file" type="file" id="image-file" data-track="change" onChange={this.upload}/>
            </div>
          </div>
        </div>
      );
    } else if( this.state.uploading ) {
      return (
        <div>
          <label className="button col-xs-12" htmlFor="image-file">
              <span>{this.buttonText()}</span>
          </label>
          <input className="file-input" name="image-file" type="file" id="image-file" data-track="change" onChange={this.upload}/>
          <input className="file-input" name="image" type="text" id="image" value={this.state.imageUrl} data-track="change" required/>
          <div className="row">
              <p className="col-xs-8">Must be jpg or png</p>

              <p className="fake-link text-center col-xs-4" data-hook="image-toggle">Use image URL instead</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor="image">Image Link</label>
          <input id="image" type="url" name="image" value=""/>
          <p className="col-xs-8">Must be jpg, jpeg, or png</p>
          <p className="fake-link text-center col-xs-4" data-hook="image-toggle">Upload image instead</p>
        </div>
      );
    }
  }
});
