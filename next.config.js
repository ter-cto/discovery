const {
    withModuleFederation,
    MergeRuntime,
} = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
    webpack: (config, options) => {
        const { buildId, dev, isServer, defaultLoaders, webpack } = options;
        const mfConf = {
            name: "discovery",
            library: { type: config.output.libraryTarget, name: "discovery" },
            filename: "static/runtime/remoteEntry.js",
            remotes: {
                // landing: 'landing@http://cto-landing.netlify.app/_next/static/runtime/remoteEntry.js'
                // For SSR, resolve to disk path (or you can use code streaming if you have access)
                landing: isServer
                    ? path.resolve(
                        __dirname,
                        "../landing/.next/server/static/runtime/remoteEntry.js"
                    )
                    : "landing", // for client, treat it as a global
            },
            exposes: {},
            shared: [],
        };

        // Configures ModuleFederation and other Webpack properties
        withModuleFederation(config, options, mfConf);

        if (!isServer) {
            config.output.publicPath = process.env.NODE_ENV === "dev" ? "http://localhost:3000/_next/" : "http://cto-discovery.netlify.app/_next/";
        }

        config.plugins.push(new MergeRuntime());

        return config;
    },
};