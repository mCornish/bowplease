Header = React.createClass({
    renderNav() {
        if ( !Meteor.loggingIn() && Meteor.userId() ) {
            return <AuthenticatedNav />;
        } else {
            return <PublicNav />;
        }
    },
    render() {
        return (
            <div>
                <header className="header">
                    {this.renderNav()}
                </header>
            </div>
        );
    }
});
