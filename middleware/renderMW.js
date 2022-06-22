/**
 *  Betöltünk egy oldalt és feltöltjük az adatokkal.
 */

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        res.render(viewName);
    };
};