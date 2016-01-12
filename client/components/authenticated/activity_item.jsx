ActivityItem = React.createClass({
  render() {
    return (
      <div className="row row--margin">
        <a href={this.props.activity.link}>
          <img className="col-xs-2" src={this.props.gift.image}/>
        </a>
        <div className="col-xs-10">
          <p>
            {this.props.activity.text}&nbsp;
            <a href={this.props.activity.link}>
              <i className="fa fa-arrow-circle-o-right"></i>
            </a>
          </p>
        </div>
      </div>
    );
  }
});
