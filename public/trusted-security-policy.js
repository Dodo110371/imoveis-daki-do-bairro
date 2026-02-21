if (window.trustedTypes && window.trustedTypes.createPolicy) {
  try {
    window.trustedTypes.createPolicy('default', {
      createHTML: function(string) { return string; },
      createScript: function(string) { return string; },
      createScriptURL: function(string) { return string; }
    });
  } catch (e) {
  }
}
