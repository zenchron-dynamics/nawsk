const path = require('path');

const config = {
    user: "",
    // Password optional, prompted if none given
    password: "",
    host: "",
    port: 21,
    localRoot: path.resolve(__dirname, 'dist'),
    remoteRoot: "/",
    include: ["*", "**/*"],      // this would upload everything except dot files
    // include: ["*.php", "dist/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    // exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: true,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true
};

module.exports = config;