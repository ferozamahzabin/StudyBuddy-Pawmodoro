const { saveSettings, getSettings } = require('../model/settingsModel');

exports.saveUserSettings = (req, res) => {
  saveSettings(req.body);
  res.status(200).json({ message: 'Settings saved' });
};

exports.getUserSettings = (req, res) => {
  res.status(200).json(getSettings());
};