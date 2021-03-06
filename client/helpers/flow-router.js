const pathFor = ( path, params ) => {
    let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
    return FlowRouter.path( path, params, query );
};

const urlFor = ( path, params ) => {
  return Meteor.absoluteUrl( pathFor( path, params ) );
};

const currentRoute = ( route ) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'is-active' : '';
};

const currentEndpoint = ( endpoint ) => {
  FlowRouter.watchPathChange();
  const path = FlowRouter.current().path;
  const currentEndpoint = path.slice(path.lastIndexOf('/'));
  return path.indexOf( currentEndpoint, endpoint ) > -1 ? 'is-active' : '';
};

const currentHash = ( hash ) => {
  FlowRouter.watchPathChange();
  let current = window.location.hash.substr( 1 );
  const qLoc = current.indexOf( '?' );
  if ( qLoc > -1 ) {
    current = current.substr( 0, qLoc );
  }
  return hash === current ? 'is-active' : '';
};

FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute,
  currentEndpoint: currentEndpoint,
  currentHash: currentHash
};
