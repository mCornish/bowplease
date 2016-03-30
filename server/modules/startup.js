const startup = () => {
  _setEnvironmentVariables();
  //_setBrowserPolicies();
  //_generateAccounts();
  _generateOccasions();
  _generateRecipients();
};

const _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();
const _setBrowserPolicies = () => Modules.server.setBrowserPolicies();
const _generateAccounts = () => Modules.server.generateAccounts();
const _generateOccasions = () => Modules.server.generateOccasions();
const _generateRecipients = () => Modules.server.generateRecipients();

Modules.server.startup = startup;
