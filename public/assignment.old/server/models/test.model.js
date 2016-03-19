/**
 * Created by ravit on 3/18/2016.
 */
module.exports = function () {


    var test = function () {
        console.log("Test model:");
    }

    var api = {test: test()}
    return api;
}