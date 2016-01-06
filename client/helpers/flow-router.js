const pathFor = ( path, params ) => {
    let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
    return FlowRouter.path( path, params, query );
};

const urlFor = ( path, params ) => {
  return Meteor.absoluteUrl( pathFor( path, params ) );
};

const currentRoute = ( route ) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
};

const currentHash = ( hash ) => {
    return window.location.hash.substr(1) === hash ? 'is-active' : '';
};

FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute,
  currentHash: currentHash
};
