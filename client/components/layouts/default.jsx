Default = React.createClass({
  render() {
    return (
      <div className="app-root">
        <Header />
        <div className="container">
          {this.props.yield}
        </div>
      </div>
    );
  }
});
