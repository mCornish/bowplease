approve = function( options ) {
  const mainEl = document.querySelector('main');
  const wrapper = mainEl.appendChild(document.createElement('div'));
  ReactDOM.render(
    React.createElement( Confirm, {
      text: options.text,
      trueText: options.trueText,
      falseText: options.falseText,
      onTrue: options.onTrue,
      onFalse: options.onFalse
    }),
    wrapper
  );
};
