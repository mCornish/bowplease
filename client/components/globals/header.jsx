Header = React.createClass({
    renderNav() {
        if ( !Meteor.loggingIn() && Meteor.user() ) {
            return <AuthenticatedNav />;
        } else {
            return <PublicNav />;
        }
    },
    render() {
        return (
            <header className="header">
                {this.renderNav()}
            </header>
        );
    }
});
