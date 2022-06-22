/**
 * Lekérdezzük egy sör adatait az adatbázisból
 */

module.exports = function (objectrepository) {
    const BeerModel = objectrepository.BeerModel;
    return function (req, res, next) {
        BeerModel.findOne({_id: req.params.beerid}, (err, beer)=>{
            if(err){
                return next(err);
            }
            res.locals.beer = beer;
            return next();
        });
    };
};