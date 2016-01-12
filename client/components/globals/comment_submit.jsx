CommentSubmit = React.createClass({
  componentDidMount() {
    Modules.client.comments.submit( { form: "[data-hook=comment-form]"}, this.props.giftId  );
  },
  handleSubmit( e ) {
    e.preventDefault();
  },
  componentDidMount() {
    // Focus on comment textarea when appropriate
    const hash = window.location.hash.substr(1);
    if ( hash === 'info' ) {
      this.refs.commentBody.getDOMNode().focus();
    }
  },
  autoText() {
    const hash = window.location.hash.substr(1);
    return hash === 'info' ? 'I\'d love more information on this gift.' : '';
  },
  render() {
    return (
      <form data-hook="comment-form" onSubmit={this.handleSubmit}>
        <div className="row">
            <div className="col-xs-12">
                <label htmlFor="body">Comment on this gift</label>
                <textarea id="body" name="body" ref="commentBody" rows="3">{this.autoText()}</textarea>
            </div>
        </div>
        <div className="row row--margin">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
                <button type="submit" className="button button--submit col-xs-12 col-md-6 col-md-offset-3">Add comment</button>
            </div>
        </div>
    </form>
    );
  }
});
