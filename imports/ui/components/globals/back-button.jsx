BackButton = () => {
  const goBack = function() {
    window.history.back();
  };
  return (
    <button className="back-button fake-link" onClick={goBack}>
      <i className="fa fa-angle-left"></i>
    </button>
  );
};
