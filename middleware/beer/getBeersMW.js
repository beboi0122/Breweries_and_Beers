/**
 * Lekérdezzük az adatbázisban lévő összes sör minden adatát
 */

module.exports = function (objectrepository) {
    const BeerModel = objectrepository.BeerModel;
    return function (req, res, next) {
        BeerModel.find({}, (err, beers)=>{
            if(err){
                return next(err);
            }
            res.locals.beers = beers;
            return next();
        });
    };
};