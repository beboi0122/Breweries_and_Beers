/**
 * Lekérdezzük az adatbázisban lévő összes sörfözde nevét
 */

module.exports = function (objectrepository) {
    const BreweryModel = objectrepository.BreweryModel;
    return function (req, res, next) {
        BreweryModel.find({}, (err, breweries)=>{
            if(err){
                return next(err);
            }
            res.locals.brews = breweries;
            return next();
        })
    };
};