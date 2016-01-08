Index = React.createClass({
    render() {
        if ( Meteor.userId() ) {
            return <GiftsList />;
        } else {
            return (
                <div className="parallax">
                    <HeroBackground />
                    <div className="parallax__layer parallax__layer--base">
                        <Hero />
                        <Intro />
                    </div>
                </div>
            );
        }
    }
});
