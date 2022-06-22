/**
 * Elmentjük egy sörfözde adatait az adatbázisba
 *      (lehet egy új sörfözde felvétele vagy egy meglévő modosítása)
 *      a felhasználót az előző oldalra irányítjuk
 */

module.exports = function (objectrepository) {
    const BreweryModel = objectrepository.BreweryModel;
    return function (req, res, next) {
        if(req.headers.referer.split('3000')[1] !== '/brewery/new' && req.headers.referer.split('3000')[1].split("/")[2] !== 'edit'){
            req.session.back = req.headers.referer.split('3000')[1]
        }
        if((typeof req.body.name === "undefined") ||
            (typeof req.body.est === "undefined") ||
            (typeof req.body.founder === "undefined") ||
            (typeof req.body.loc === "undefined")){
            return next();
        }
        const newBrewery = res.locals.brew ? res.locals.brew : new BreweryModel();
        newBrewery.name = req.body.name;
        newBrewery.est = req.body.est;
        newBrewery.loc = req.body.loc;
        newBrewery.founder = req.body.founder;

        return newBrewery.save(err => {
            if(err){
                return next(err);
            }
            res.redirect(req.session.back)
        })
    };
};