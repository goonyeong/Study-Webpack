module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "83",
          ie: "11",
        },
      },
    ],
  ],
};
