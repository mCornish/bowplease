PublicNav = React.createClass({
    beginSubmit() {
        Modules.client.nav.beginSubmit();
    },
    trackClick( e ) {
        //const pageName = $(e.target).attr('data-page');
        //analytics.track(`Click header: ${pageName}`);
    },
    render() {
        return (
            <nav className="menu row" role="navigation">
                <div className="container">
                    <div className="col-xs-12">
                        <div className="row">
                            <a className="menu__button button col-xs-3 {FlowHelpers.currentRoute( 'home' )}" href="/"
                            data-page="Home" onClick={this.trackClick()}>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <i className="fa fa-home"></i>
                                    </div>
                                    <span className="col-xs-12">Home</span>
                                </div>
                            </a>
                            <a className="menu__button button col-xs-3 {FlowHelpers.currentRoute( 'trending' )}" href="/trending"
                            data-page="Trending" onClick={this.trackClick()}>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <i className="fa fa-bar-chart"></i>
                                    </div>
                                    <span className="col-xs-12">Trending</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
});
