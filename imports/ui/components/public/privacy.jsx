Privacy = React.createClass({
  componentDidMount() {
    $.get('http://www.iubenda.com/api/privacy-policy/931887/only-legal', function(data) {
        $('[data-hook=embed]').html(data.content);
    });
  },
  render() {
    return (
      <div className="page">
        <div data-hook="embed"></div>
      </div>
    );
  }
});
