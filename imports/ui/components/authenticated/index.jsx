import React from 'react';
import HeroBackground from '../../../ui/components/public/hero_background';
import Hero from '../../../ui/components/public/hero';
import Intro from '../../../ui/components/public/intro';

export default Index = React.createClass({
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
