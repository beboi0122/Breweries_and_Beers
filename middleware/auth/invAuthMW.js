/**
 * Ha a felhasználó nincs bejelentkezve átirányítjuk a /-ra
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof req.session.loggedin !== 'undefined' || req.session.loggedin === true){
            return res.redirect('/brewerylist');
        }
        return next();
    };
};