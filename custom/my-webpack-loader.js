
// custom plugin
module.exports = function myWebpackLoader (content) {
    console.log("my loader is working");
    return content;
}