HomeForm = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        const subscription = Meteor.subscribe('home-form');
        return {
            isLoading: !subscription.ready(),
            occasions: Occasions.find().fetch(),
            recipients: Recipients.find().fetch()
        }
    },
    filterGifts( e ) {
        e.preventDefault();
        Modules.client.homeForm.filterGifts( e );
    },
    renderOccasions() {
        return this.data.occasions.map((occasion) => {
            return <option>{occasion.name}</option>;
        });
    },
    renderRecipients() {
        return this.data.recipients.map((recipient) => {
            return <option>{recipient.name}</option>;
        });
    },
    render() {
        return (
            <form className="home__form inline-form col-xs-12" onSubmit={this.filterGifts}>
                <label htmlFor="recipient">Recipient</label>
                <select id="recipient" className="col-xs-4 col-sm-3 col-md-2 col-md-offset-2"
                        name="recipient">
                    <option>Who is it for?</option>
                    {this.renderRecipients()}
                </select>
                <label htmlFor="age">Age</label>
                <select id="age" className="col-xs-4 col-sm-3 col-md-2" name="age">
                    <option>How old?</option>
                    <option>Newborn</option>
                    <option>1 - 5</option>
                    <option>11 - 15</option>
                    <option>16 - 20</option>
                    <option>21 - 30</option>
                    <option>31 - 40</option>
                    <option>41 - 50</option>
                    <option>50+</option>
                </select>
                <label htmlFor="occasion">Occassion</label>
                <select id="occasion" className="hidden-xs col-sm-3 col-md-2" name="occasion">
                    <option>The occasion?</option>
                    {this.renderOccasions()}
                </select>
                <button className="button button--submit col-xs-4 col-sm-3 col-md-2" type="submit">
                    FIND IT
                </button>
            </form>
        );
    }
});
