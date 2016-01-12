CommentItem = React.createClass({
  handleSubmit( e ) {
    e.preventDefault();
    setTimeout(() => {
      this.setState({
        editing: false
      });
    }, 1000);
  },
  getInitialState() {
    return {
      editing: false
    };
  },
  componentDidUpdate() {
    if ( this.state.editing ) {
      Modules.client.comments.edit({ form: "[data-hook=edit-form]", commentId: this.props.comment._id });
    }
  },
  createdMoment() {
    return moment( this.props.comment.created ).fromNow();
  },
  editOn() {
    this.setState({
      editing: true
    });
  },
  remove() {
    Modules.client.comments.remove( this.props.comment._id );
  },
  renderBody() {
    if ( !this.state.editing ) {
      return (
        <p className="comment__body">{this.props.comment.body}</p>
      );
    } else {
      return (
        <form data-hook="edit-form" onSubmit={this.handleSubmit}>
          <div className="row row--margin">
            <textarea name="body" defaultValue={this.props.comment.body} data-id={this.props.comment._id}></textarea>
          </div>
          <div className="row row--margin">
            <div className="col-xs-12 col-md-3">
              <button className="button button--submit col-xs-12" type="submit">Update</button>
            </div>
          </div>
        </form>
      );
    }
  },
  renderEdit() {
    if ( Meteor.userId() === this.props.comment.userId ) {
      if ( this.state.editing ) {
        return (
          <div className="row text-right col-xs-6">
            <button className="fake-link" type="button" onClick={this.remove}>
              <i className="fa fa-remove"> Delete</i>
            </button>
          </div>
        );
      } else {
        return (
          <div className="row text-right col-xs-6">
            <button className="fake-link" type="button" onClick={this.editOn}>
              <i className="fa fa-pencil"> Edit</i>
            </button>
          </div>
        );
      }
    }
  },
  render() {
    return (
      <li className="comment">
        <div className="row">
          <a className="no-hover col-xs-6" href={`/user/${this.props.comment.userId}`}>
            <UserInfo userId={this.props.comment.userId} />
            <span className="comment__submitted"> {this.createdMoment()}</span>
          </a>
          {this.renderEdit()}
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.renderBody()}
          </div>
        </div>
    </li>
    );
  }
});
