// Load the core node modules.
var AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var webpack = require("webpack");
const WrmPlugin = require("atlassian-webresource-webpack-plugin");
const pluginKey = "net.seibertmedia.plugin.confluence.event-manager";
const OUTPUT_DIR = path.resolve(process.cwd(), "target/classes/");
const resources = "./src/main/web/src/";

// We are exporting a Function instead of a configuration object so that we can
// dynamically define the configuration object based on the execution mode.
module.exports = (env, argv) =
>
{

  var isDevelopmentMode = (argv.mode === "development");


  // Locally, we want robust source-maps. However, in production, we want something
  // that can help with debugging without giving away all of the source-code. This
  // production setting will give us proper file-names and line-numbers for debugging;
  // but, without actually providing any code content.
  var devtool = isDevelopmentMode
    ? "eval-source-map"
    : "nosources-source-map"
  ;

  // By default, each module is identified based on Webpack's internal ordering. This
  // can cause issues for cache-busting and long-term browser caching as a localized
  // change can create a rippling effect on module identifiers. As such, we want to
  // identify modules based on a name that is order-independent. Both of the following
  // plugins do roughly the same thing; only, the one in development provides a longer
  // and more clear ID.
  var moduleIdentifierPlugin = isDevelopmentMode
    ? new webpack.NamedModulesPlugin()
    : new webpack.HashedModuleIdsPlugin()
  ;

  return ({
    context: path.resolve(resources),

    entry: {
      easy_events_polyfill: "polyfills.ts",
      easy_events_main: "app.entry.ts"
    },
    output: {
      filename: "[name].bundle.js",
      path: OUTPUT_DIR
    },
    devtool: devtool,
    resolve: {
      modules: [
        resources,
        "node_modules"
      ],
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /(\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: "@ngtools/webpack"
        },
        {
          test: /\.(html|css)$/,
          loader: "raw-loader"
        },
        {
          test: /\.less$/,
          loaders: [
            "raw-loader",
            "less-loader"
          ]
        }
      ]
    },
    plugins: [
      // clean the build directory before each build.
      new CleanWebpackPlugin([
        path.join(OUTPUT_DIR, "*.js"),
        path.join(OUTPUT_DIR, "*.js.map")
      ], {allowExternal: true}),

      new AngularCompilerPlugin({
        tsConfigPath: path.join(__dirname, "src/tsconfig.json"),
        mainPath: path.join(__dirname, "src/app.entry"),
        entryModule: path.join(__dirname, "src/app/app.module#AppModule"),
        sourceMap: true
      }),

      new WrmPlugin({
        amdProvider: "confluence.web.resources:almond",
        pluginKey,
        xmlDescriptors: path.resolve(OUTPUT_DIR, "META-INF", "plugin-descriptors", "wr-defs.xml"),
        contextMap: {
          'easy_events_polyfill': ['easy-event-context'],
          'easy_events_main': ['easy-event-context']
        },
        watch: isDevelopmentMode,
        providedDependencies: {
          ajs: {dependency: "com.atlassian.auiplugin:ajs", import: "AJS"},
          moment: {dependency: "confluence.web.resources:moment", import: "moment"}

        }
      }),

      // I generate the main "index" file and inject Script tags for the files emitted
      // by the compilation process.
      new HtmlWebpackPlugin({
        template: "index.vm",
        filename: 'angulardemo_module.vm',
        atlassiancontext: isDevelopmentMode ? '' : '#requireResourcesForContext("angulardemo-context")',
        startdev: isDevelopmentMode ? 'start your dev-server now: <b>npm run webpack-dev</b>' : '',
        // generate script-tag to load js dynamically. false for prod, because scripts are loaded via atlassian-include-machanism
        inject: isDevelopmentMode
      }),
      // I facilitate better caching for generated bundles.
      moduleIdentifierPlugin,
    ],
    optimization: {
      // 	splitChunks: {
      // 		// Apply optimizations to all chunks, even initial ones (not just the
      // 		// ones that are lazy-loaded).
      // 		chunks: "all"
      // 	},
      // 	// I pull the Webpack runtime out into its own bundle file so that the
      // 	// contentHash of each subsequent bundle will remain the same as long as the
      // 	// source code of said bundles remain the same.
      // 	runtimeChunk: "single"
    }
  });
}
;
