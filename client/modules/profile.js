const profile = {
  update( options ) {
    _validate( options.form );
  },
  track( e ) {
    _track( e );
  },
  countries() {
    return _countries;
  }
}

const _validate = ( form ) => {
  $( form ).validate( validation() );
};

const validation = () => {
  return {
    'image-file': {
      required: false
    },
    image: {
      required: true
    },
    rules: {
      website: {
        required: false,
        url: true
      }
    },
    messages: {
      website: {
        url: 'Make sure your website includes http://.'
      }
    },
    submitHandler() { _handleUpdate(); }
  };
};

const _handleUpdate = () => {
  const image = Session.get('imageUrl');
  const name = $('[name=name]').val();
  const gender = $('[name=gender]:checked').val();
  const birthday = $('[name=birthday]').val();
  const website = $('[name=website]').val();
  const country = $('[name=country]').val();
  const location = $('[name=location]').val();

  // create user object with profile data for update
  const user = {
    'profile.image': image,
    'profile.name': name,
    'profile.gender': gender,
    'profile.birthday': birthday,
    'profile.website': website,
    'profile.country': country,
    'profile.location': location
  };

  Meteor.users.update(Meteor.userId(), {$set: user}, function( err ) {
    if ( err ) {
      analytics.track('Profile update fail', {
        user: user,
        error: err.reason
      });
      Bert.alert(`Profile update failed: ${err.reason}`, 'danger');
    } else {
      analytics.track('Profile update', user);
      Bert.alert('Profile updated', 'success');
    }
  });
};

const _track = ( e ) => {
  const step = $( e.target ).attr( 'name' );
  const value = $( e.target ).val();
  analytics.track('Profile form: ' + step, {value: value});
};

const _countries = [
  {name: 'Afghanistan'},
  {name: 'Albania'},
  {name: 'Algeria'},
  {name: 'American Samoa'},
  {name: 'Andorra'},
  {name: 'Angola'},
  {name: 'Anguilla'},
  {name: 'Antarctica'},
  {name: 'Antigua and Barbuda'},
  {name: 'Argentina'},
  {name: 'Armenia'},
  {name: 'Aruba'},
  {name: 'Australia'},
  {name: 'Austria'},
  {name: 'Azerbaijan'},
  {name: 'Bahamas'},
  {name: 'Bahrain'},
  {name: 'Bangladesh'},
  {name: 'Barbados'},
  {name: 'Belarus'},
  {name: 'Belgium'},
  {name: 'Belize'},
  {name: 'Benin'},
  {name: 'Bermuda'},
  {name: 'Bhutan'},
  {name: 'Bolivia'},
  {name: 'Bosnia and Herzegovina'},
  {name: 'Botswana'},
  {name: 'Bouvet Island'},
  {name: 'Brazil'},
  {name: 'British Indian Ocean Territory'},
  {name: 'Brunei Darussalam'},
  {name: 'Bulgaria'},
  {name: 'Burkina Faso'},
  {name: 'Burundi'},
  {name: 'Cambodia'},
  {name: 'Cameroon'},
  {name: 'Canada'},
  {name: 'Cape Verde'},
  {name: 'Cayman Islands'},
  {name: 'Central African Republic'},
  {name: 'Chad'},
  {name: 'Chile'},
  {name: 'China'},
  {name: 'Christmas Island'},
  {name: 'Cocos Islands'},
  {name: 'Colombia'},
  {name: 'Comoros'},
  {name: 'Congo'},
  {name: 'Congo, Democratic Republic of the'},
  {name: 'Cook Islands'},
  {name: 'Costa Rica'},
  {name: "Cote d'Ivoire"},
  {name: 'Croatia'},
  {name: 'Cuba'},
  {name: 'Cyprus'},
  {name: 'Czech Republic'},
  {name: 'Denmark'},
  {name: 'Djibouti'},
  {name: 'Dominica'},
  {name: 'Dominican Republic'},
  {name: 'Ecuador'},
  {name: 'Egypt'},
  {name: 'El Salvador'},
  {name: 'Equatorial Guinea'},
  {name: 'Eritrea'},
  {name: 'Estonia'},
  {name: 'Ethiopia'},
  {name: 'Falkland Islands'},
  {name: 'Faroe Islands'},
  {name: 'Fiji'},
  {name: 'Finland'},
  {name: 'France'},
  {name: 'French Guiana'},
  {name: 'French Polynesia'},
  {name: 'Gabon'},
  {name: 'Gambia'},
  {name: 'Georgia'},
  {name: 'Germany'},
  {name: 'Ghana'},
  {name: 'Gibraltar'},
  {name: 'Greece'},
  {name: 'Greenland'},
  {name: 'Grenada'},
  {name: 'Guadeloupe'},
  {name: 'Guam'},
  {name: 'Guatemala'},
  {name: 'Guinea'},
  {name: 'Guinea-Bissau'},
  {name: 'Guyana'},
  {name: 'Haiti'},
  {name: 'Heard Island and McDonald Islands'},
  {name: 'Honduras'},
  {name: 'Hong Kong'},
  {name: 'Hungary'},
  {name: 'Iceland'},
  {name: 'India'},
  {name: 'Indonesia'},
  {name: 'Iran'},
  {name: 'Iraq'},
  {name: 'Ireland'},
  {name: 'Israel'},
  {name: 'Italy'},
  {name: 'Jamaica'},
  {name: 'Japan'},
  {name: 'Jordan'},
  {name: 'Kazakhstan'},
  {name: 'Kenya'},
  {name: 'Kiribati'},
  {name: 'Kuwait'},
  {name: 'Kyrgyzstan'},
  {name: 'Laos'},
  {name: 'Latvia'},
  {name: 'Lebanon'},
  {name: 'Lesotho'},
  {name: 'Liberia'},
  {name: 'Libya'},
  {name: 'Liechtenstein'},
  {name: 'Lithuania'},
  {name: 'Luxembourg'},
  {name: 'Macao'},
  {name: 'Madagascar'},
  {name: 'Malawi'},
  {name: 'Malaysia'},
  {name: 'Maldives'},
  {name: 'Mali'},
  {name: 'Malta'},
  {name: 'Marshall Islands'},
  {name: 'Martinique'},
  {name: 'Mauritania'},
  {name: 'Mauritius'},
  {name: 'Mayotte'},
  {name: 'Mexico'},
  {name: 'Micronesia'},
  {name: 'Moldova'},
  {name: 'Monaco'},
  {name: 'Mongolia'},
  {name: 'Montenegro'},
  {name: 'Montserrat'},
  {name: 'Morocco'},
  {name: 'Mozambique'},
  {name: 'Myanmar'},
  {name: 'Namibia'},
  {name: 'Nauru'},
  {name: 'Nepal'},
  {name: 'Netherlands'},
  {name: 'Netherlands Antilles'},
  {name: 'New Caledonia'},
  {name: 'New Zealand'},
  {name: 'Nicaragua'},
  {name: 'Niger'},
  {name: 'Nigeria'},
  {name: 'Norfolk Island'},
  {name: 'North Korea'},
  {name: 'Norway'},
  {name: 'Oman'},
  {name: 'Pakistan'},
  {name: 'Palau'},
  {name: 'Palestinian Territory'},
  {name: 'Panama'},
  {name: 'Papua New Guinea'},
  {name: 'Paraguay'},
  {name: 'Peru'},
  {name: 'Philippines'},
  {name: 'Pitcairn'},
  {name: 'Poland'},
  {name: 'Portugal'},
  {name: 'Puerto Rico'},
  {name: 'Qatar'},
  {name: 'Romania'},
  {name: 'Russian Federation'},
  {name: 'Rwanda'},
  {name: 'Saint Helena'},
  {name: 'Saint Kitts and Nevis'},
  {name: 'Saint Lucia'},
  {name: 'Saint Pierre and Miquelon'},
  {name: 'Saint Vincent and the Grenadines'},
  {name: 'Samoa'},
  {name: 'San Marino'},
  {name: 'Sao Tome and Principe'},
  {name: 'Saudi Arabia'},
  {name: 'Senegal'},
  {name: 'Serbia'},
  {name: 'Seychelles'},
  {name: 'Sierra Leone'},
  {name: 'Singapore'},
  {name: 'Slovakia'},
  {name: 'Slovenia'},
  {name: 'Solomon Islands'},
  {name: 'Somalia'},
  {name: 'South Africa'},
  {name: 'South Georgia'},
  {name: 'South Korea'},
  {name: 'Spain'},
  {name: 'Sri Lanka'},
  {name: 'Sudan'},
  {name: 'Suriname'},
  {name: 'Svalbard and Jan Mayen'},
  {name: 'Swaziland'},
  {name: 'Sweden'},
  {name: 'Switzerland'},
  {name: 'Syrian Arab Republic'},
  {name: 'Taiwan'},
  {name: 'Tajikistan'},
  {name: 'Tanzania'},
  {name: 'Thailand'},
  {name: 'The Former Yugoslav Republic of Macedonia'},
  {name: 'Timor-Leste'},
  {name: 'Togo'},
  {name: 'Tokelau'},
  {name: 'Tonga'},
  {name: 'Trinidad and Tobago'},
  {name: 'Tunisia'},
  {name: 'Turkey'},
  {name: 'Turkmenistan'},
  {name: 'Tuvalu'},
  {name: 'Uganda'},
  {name: 'Ukraine'},
  {name: 'United Arab Emirates'},
  {name: 'United Kingdom'},
  {name: 'United States'},
  {name: 'United States Minor Outlying Islands'},
  {name: 'Uruguay'},
  {name: 'Uzbekistan'},
  {name: 'Vanuatu'},
  {name: 'Vatican City'},
  {name: 'Venezuela'},
  {name: 'Vietnam'},
  {name: 'Virgin Islands, British'},
  {name: 'Virgin Islands, U.S.'},
  {name: 'Wallis and Futuna'},
  {name: 'Western Sahara'},
  {name: 'Yemen'},
  {name: 'Zambia'},
  {name: 'Zimbabwe'}
];

Modules.client.profile = profile;
