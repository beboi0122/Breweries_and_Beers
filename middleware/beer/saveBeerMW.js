/**
 * Elmentjük egy sör adatait az adatbázisba
 *      (lehet egy új sör felvétele vagy egy meglévő modosítása)
 *      a felhasználót az előző oldalra irányítjuk
 */

module.exports = function (objectrepository) {
    const BeerModel = objectrepository.BeerModel;
    return function (req, res, next) {
        if(req.headers.referer.split('3000')[1] !== '/beer/new' && req.headers.referer.split('3000')[1].split("/")[2] !== 'edit'){
            req.session.back = req.headers.referer.split('3000')[1]
        }
        if((typeof req.body.beername === "undefined") ||
            (typeof req.body.type === "undefined") ||
            (typeof req.body.alc === "undefined") ||
            (typeof req.body._producer === "undefined")){
            return next();
        }
        const newBeer = res.locals.beer ? res.locals.beer : new BeerModel();
        newBeer.name = req.body.beername;
        newBeer.type = req.body.type;
        newBeer.alc = req.body.alc;
        newBeer._producer = req.body._producer;

        return newBeer.save(err => {
            if(err){
                return next(err);
            }
            res.redirect(req.session.back);
        });
    };
};