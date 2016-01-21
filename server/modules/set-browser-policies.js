let setBrowserPolicies = () => {
  BrowserPolicy.content.disallowInlineScripts();
  BrowserPolicy.content.allowImageOrigin("graph.facebook.com");
  BrowserPolicy.content.allowImageOrigin("*.fbcdn.net");
};

Modules.server.setBrowserPolicies = setBrowserPolicies;
