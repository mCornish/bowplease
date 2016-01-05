Template.login.onCreated(() => {
    Session.setDefault('showPass', false);
});

Template.login.onRendered(() => {
  Modules.client.login.withEmail( { form: "[data-hook=login]", template: Template.instance() } );
});

Template.login.helpers({
    passType() {
        return Session.get('showPass') ? 'text' : 'password';
    },
    togglePassText() {
        return Session.get('showPass') ? 'HIDE' : 'SHOW';
    }
});

Template.login.events({
  'submit form': ( e ) => e.preventDefault(),
  'click [data-hook=facebook]': () => Modules.client.login.withFacebook(),
  'click [data-hook=toggle-pass]': () => Modules.client.login.togglePass(),
  'click [data-hook=forgotten-password]': () => Modules.client.login.toForgPass()
});
