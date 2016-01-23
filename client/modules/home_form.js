const homeForm = {
    setFilters( e ) {
        _setFilterValues( e );
    }
};

_setFilterValues = ( e ) => {
  query = ''
  const ageVal = $('[name=age]').val();
  const recipientVal = $('[name=recipient]').val();
  const occasionVal = $('[name=occasion]').val();
  if ( ageVal != 'default' ) {
    query += `age=${ageVal}`;
  }
  if ( recipientVal != 'default' ) {
    query += `&recipient=${recipientVal}`;
  }
  if ( occasionVal != 'default' ) {
    query += `&occasion=${occasionVal}`;
  }
  console.log(query);
  FlowRouter.go( `/browse#new?${query}` )
};

Modules.client.homeForm = homeForm;
