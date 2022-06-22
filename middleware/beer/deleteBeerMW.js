/**
 * Eltávolitjuk az adatbázisból az adott sört
 *      és a felhasználót az előző oldalra irányítjuk
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const back = req.headers.referer.split('3000')[1]
        if(typeof res.locals.beer === 'undefined'){
            return next();
        }
        return  res.locals.beer.remove(err=>{
            if(err){
                return next(err);
            }
            return res.redirect(back);
        })
    };
};