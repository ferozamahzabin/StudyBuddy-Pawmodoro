let settingsStore = {};

function saveSettings(settings) {
  settingsStore = { ...settings };
}

function getSettings() {
  return settingsStore;
}

module.exports = { saveSettings, getSettings };