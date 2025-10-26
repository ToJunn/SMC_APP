module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // <-- Dòng này BẮT BUỘC PHẢI CÓ
  ],
};
