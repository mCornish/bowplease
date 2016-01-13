ActivityItem = React.createClass({
  render() {
    return (
      <div className="row row--margin">
        <a href={`/gifts/${this.props.gift._id}`}>
          <img className="col-xs-2" src={this.props.gift.image}/>
        </a>
        <div className="col-xs-10">
          <p>
            {this.props.activity.text}&nbsp;
            <a href={`/gifts/${this.props.gift._id}`}>
              <i className="fa fa-arrow-circle-o-right"></i>
            </a>
          </p>
        </div>
      </div>
    );
  }
});
