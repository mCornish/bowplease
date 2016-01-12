ImageInput = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      imageName: Session.get('imageName'),
      imageUrl: Session.get('imageUrl')
    };
  },
  getInitialState() {
    return {
      uploading: true
    }
  },
  buttonText() {
    return Session.get('imageName') || 'Choose a gift image';
  },
  imageUrl() {
    return Session.get('imageUrl');
  },
  toggleUploading() {
    const state = this.state.uploading;
    this.setState({
      uploading: !state
    });
  },
  upload( e ) {
    Modules.client.imageInput.upload( e, this.state.uploading );
  },
  render() {
    if( this.data.imageUrl || this.props.source ) {
      return (
        <div className="col-xs-6 col-xs-offset-3">
          <div className="row">
            <img className="col-xs-12" src={this.data.imageUrl || this.props.source}/>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <label className="fake-link text-center col-xs-12" htmlFor="image-file">New image</label>
              <input id="image-file" className="file-input" name="image-file" type="file"  data-track="change" onChange={this.upload}/>
              <input className="file-input" name="image" type="text" id="image" defaultValue={this.data.imageUrl || this.props.source} data-track="change" required/>
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
          <input id="image-file" className="file-input" name="image-file" type="file" data-track="change" onChange={this.upload}/>
          <input id="image" className="file-input" name="image" type="text" defaultValue={this.data.imageUrl || this.props.source} data-track="change" required/>
          <div className="row">
              <p className="col-xs-8">Must be jpg or png</p>
              <p className="fake-link text-center col-xs-4" onClick={this.toggleUploading}>Use image URL instead</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor="image">Image Link</label>
          <input id="image" type="url" name="image" defaultValue=""/>
          <p className="col-xs-8">Must be jpg, jpeg, or png</p>
          <p className="fake-link text-center col-xs-4" onClick={this.toggleUploading}>Upload image instead</p>
        </div>
      );
    }
  }
});
