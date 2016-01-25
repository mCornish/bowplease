authenticate = () => {
  const mainEl = document.querySelector('main');
  const wrapper = mainEl.appendChild(document.createElement('div'));
  ReactDOM.render(
    React.createElement( Authenticate, {
      className: 'modal'
    }),
    wrapper
  );
};
