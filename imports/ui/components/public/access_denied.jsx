AccessDenied = React.createClass({
    render() {
        return (
            <div className="access-denied page">
                <h2>Access Denied</h2>
                <p>You can't get here! Please <a href="/&login=true">log in</a>.</p>
            </div>
        );
    }
});
