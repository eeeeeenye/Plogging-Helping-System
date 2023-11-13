module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      [
        'module:react-native-dotenv',
        // 'react-native-reanimated/plugin',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
    presets: ['babel-preset-expo', ['module:metro-react-native-babel-preset']],
  }
}
