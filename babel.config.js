module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
    ],
    presets: ['babel-preset-expo'],
  }
}
