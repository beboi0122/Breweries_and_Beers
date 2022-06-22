/**
 * Átirányítjuk a felhasználót a /-re és
 *      megsemmisítjük a hozzá tartozó session-t
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        req.session.destroy(err=> {
            res.redirect('/');
        });
    };
};