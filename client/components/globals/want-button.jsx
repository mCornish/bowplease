WantButton = React.createClass({
  getInitialState() {
    return {
      wantedClass: this.wantedClass(),
      wantsCount: this.props.gift.wantsCount
    }
  },
  handleWant( e ) {
    const wantable = $( e.target ).hasClass( 'is-wantable' )
      || $( e.target ).parent().hasClass( 'is-wantable' );

    if ( wantable ) {
      Meteor.call('want', this.props.gift._id, function( err ) {
        if ( err ) {
          Bert.alert( `Want failed: ${err.reason}`, danger );
        }
      });
    } else {
      Meteor.call('unwant', this.props.gift._id, function( err ) {
        if ( err ) {
          Bert.alert( `Unwant failed: ${err.reason}`, danger );
        }
      });
    }
    if ( this.state.wantedClass === 'is-wantable' ) {
      this.setState({
        wantedClass: 'is-unwantable',
        wantsCount: this.state.wantsCount + 1
      });
    } else {
      this.setState({
        wantedClass: 'is-wantable',
        wantsCount: this.state.wantsCount - 1
      });
    }
  },
  text() {
    if ( Meteor.userId() ) {
      return 'Want';
    } else {
      return (
        <span><a href='/#login'>Sign in</a> to want</span>
      );
    }
  },
  wantedClass() {
    const userId = Meteor.userId();
    if ( userId && !_.include(this.props.gift.wanters, userId) ) {
      return 'is-wantable';
    } else if ( userId ) {
      return 'is-unwantable'
    } else {
      return 'is-disabled';
    }
  },
  render() {
    if ( this.props.gift.counter ) {
      return (
        <div className={`want-button button button--addon ${this.state.wantedClass}`} onClick={this.handleWant}>
          <div className={`row ${this.state.wantedClass}`}>
            <div className={`button--addon__addon col-xs-6 col-sm-8 ${this.state.wantedClass}`}>
              <i className="fa fa-gift"></i> <span className="hidden-xs">{this.text()}</span>
            </div>
            <div className={`want-button__count col-xs-6 col-sm-4 ${this.state.wantedClass}`}>{this.state.wantsCount}</div>
          </div>
        </div>
      );
    } else {
      return (
        <button className={`want-button want-button--${this.props.modifier} button col-xs-12 ${this.state.wantedClass}`} onClick={this.handleWant}>
          <i className="fa fa-gift"></i> {this.text()}
        </button>
      );
    }
  }
});
