let setBrowserPolicies = () => {
  BrowserPolicy.content.disallowInlineScripts();
  BrowserPolicy.content.allowImageOrigin("https://facebook.com");
  BrowserPolicy.content.allowImageOrigin("https://amazon.com");
};

Modules.server.setBrowserPolicies = setBrowserPolicies;
