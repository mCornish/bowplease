import React from 'react';

export default Intro = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="intro__section row row--margin">
                    <div className="col-xs-12">
                        <div className="row">
                            <h1 className="no-margin col-xs-12 text-center">Be Generous</h1>

                            <h2 className="no-margin col-xs-12 text-center">Subheader text will go here</h2>
                        </div>

                        <div className="row row--margin">
                            <p>Here is where we will have some intro content. Here is where we will have some intro content.
                                Here is where we will have some intro content. Here is where we will have some intro
                                content.</p>
                        </div>
                    </div>
                </div>
                <div className="intro__section row row--margin">
                    <div className="col-xs-12">
                        <div className="row">
                            <h1 className="no-margin col-xs-12 text-center">Be Calm</h1>

                            <h2 className="no-margin col-xs-12 text-center">Shopping shouldn't be stressful</h2>
                        </div>

                        <div className="row row--margin">
                            <p>Here is where we will have some intro content. Here is where we will have some intro content.
                                Here is where we will have some intro content. Here is where we will have some intro
                                content.</p>
                        </div>
                    </div>
                </div>
                <div className="intro__section row row--margin">
                    <div className="col-xs-12">
                        <div className="row">
                            <h1 className="no-margin col-xs-12 text-center">Be Rewarded</h1>

                            <h2 className="no-margin col-xs-12 text-center">We appreciate your generosity</h2>
                        </div>

                        <div className="row row--margin">
                            <p>Here is where we will have some intro content. Here is where we will have some intro content.
                                Here is where we will have some intro content. Here is where we will have some intro
                                content.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
