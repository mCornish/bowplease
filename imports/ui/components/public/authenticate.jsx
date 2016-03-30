Authenticate = ( props ) => {
  const isModal = props.className === 'modal';
  const containerClass = isModal ? 'modal-container' : '';
  const close = function() {
    $('[data-hook=modal]').remove();
  };
  const getClose = function() {
    if ( isModal ) {
      return (
        <div className="modal__close" onClick={close}><i className="fa fa-close"></i></div>
      );
    }
  };
  return (
    <div className={containerClass} data-hook='modal'>
      {getClose()}
      <div className={props.className}>
        <Login />
      </div>
      <div className={`in-right ${props.className}`}>
        <ForgottenPassword />
      </div>
    </div>
  );
};
