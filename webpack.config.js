const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  profile: true,
  entry: {
    main: {
      import: path.resolve(__dirname, "./src/main.ts"),
      runtime: "common-runtime",
    },
    main2: {
      import: path.resolve(__dirname, "./src/a.ts"),
      runtime: "common-runtime",
    },
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /(\.scss|\.css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer"),
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // exclude: /node_module/,
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      // {
      //   test: /\.png/,
      //   type: "asset/resource",
      // },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 10,
      //       },
      //     },
      //   ],
      //   type: "javascript/auto",
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
        type: "javascript/auto",
      },
      // {
      //   test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
      //   type: "asset",
      // },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", "png"],
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  devServer: {
    hot: true,
    port: 9000,
    // open: true,
  },
};
