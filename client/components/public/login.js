Template.login.onRendered( () => {
  Modules.client.login( { form: "[data-hook=login]", template: Template.instance() } );
});

Template.login.events({
  'submit form': ( e ) => e.preventDefault(),
  'click [data-hook=facebook]': () => Modules.client.handleFacebook()
});
