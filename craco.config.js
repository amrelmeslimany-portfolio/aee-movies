const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@theme": "dark",
              "@primary-color": "#543864",
              "@layout-header-background": "#171726",
              "@tooltip-bg": "black",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
