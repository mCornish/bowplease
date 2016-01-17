const homeForm = {
    setFilters( e ) {
        _setFilterValues( e );
    }
};

_setFilterValues = ( e ) => {
  Session.set( 'ageVal', $('[name=age]').val() );
  Session.set( 'recipientVal', $('[name=recipient]').val() );
  Session.set( 'occasionVal', $('[name=occasion]').val() );
};

Modules.client.homeForm = homeForm;
