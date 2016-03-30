Confirm = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    trueText: React.PropTypes.string,
    falseText: React.PropTypes.string,
    onTrue: React.PropTypes.func.isRequired,
    onFalse: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      trueText: 'Continue',
      falseText: 'Cancel',
      onFalse: function(){}
    };
  },
  render() {
    return (
      <div className="modal-container" data-hook="modal">
        <div className="modal">
          <h1 className="modal__head">Confirm</h1>
          <div className="modal__body">
            <p>{this.props.text}</p>
            <button className="button button--slim" type="button" onClick={this._onFalseClick}>{this.props.falseText}</button>
            <button className="button button--slim button--warning" type="button" onClick={this._onTrueClick}>{this.props.trueText}</button>
          </div>
        </div>
      </div>
    );
  },
  _onTrueClick() {
    this.props.onTrue();
    $('[data-hook=modal]').remove();
  },
  _onFalseClick() {
    this.props.onFalse();
    $('[data-hook=modal]').remove();
  }
});
