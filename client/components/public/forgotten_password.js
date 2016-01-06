Template.forgottenPassword.onRendered( () => {
  Modules.client.forgPass.submit({
    form: "[data-hook=forg-pass]",
    template: Template.instance()
  });
});

Template.forgottenPassword.events({
  'submit form': ( event ) => event.preventDefault(),
  'click [data-hook=go-back]': () => Modules.client.forgPass.goBack()
});
