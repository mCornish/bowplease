const generateOccasions = () => {
  let fakeOccasionCount = 20,
      occasionsExist    = _checkIfOccasionsExist( fakeOccasionCount );

  if ( !occasionsExist ) {
    _createOccasions( _generateFakeOccasions( fakeOccasionCount ) );
  }
};

const _checkIfOccasionsExist = ( count ) => {
  let occasionCount = Occasions.find().count();
  return occasionCount < count ? false : true;
};

const _createOccasions = ( occasions ) => {
  for ( let i = 0; i < occasions.length; i++ ) {
    const occasion = occasions[ i ];
    const occasionExists = _checkIfOccasionExists( occasion );

    if ( !occasionExists ) {
      _createOccasion( occasion );
    }
  }
};

let _checkIfOccasionExists = ( name ) => {
  return Occasions.findOne( { 'name': name } );
};

let _createOccasion = ( occasion ) => {
  Meteor.call('occasionInsert', occasion);
};

let _generateFakeOccasions = ( count ) => {
  let occasions = [];

  for ( let i = 0; i < count; i++ ) {
    occasions.push({
      name: faker.hacker.noun()
    });
  }

  return occasions;
};

Modules.server.generateOccasions = generateOccasions;
