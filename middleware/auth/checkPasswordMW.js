/**
 * POST-on keresztül érkező jelszót ellenőrizzük,
 *          ha jó a jelszó átirányítjuk a /brewerylist-re   +session
 *          ha nem jó a /-re
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof req.body.pass ==='undefined'){
            return next();
        }
        if(req.body.pass ==='asd'){
            req.session.loggedin = true;
            return req.session.save(err => res.redirect("/brewerylist"));
        }else{
            res.locals.error = "Wrong Password";
            return next();
        }
    };
};