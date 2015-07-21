module.exports = {
  description: 'Blueprint for ember-cli-calendar',

  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function () {
    return this.addBowerPackageToProject('coreweb-css', '*');
  }
};
