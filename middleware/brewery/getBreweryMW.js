/**
 * Lekérdezzük egy sörfözde adatait az adatbázisból
 */

module.exports = function (objectrepository) {
    const BreweryModel = objectrepository.BreweryModel;
    const BeerModel = objectrepository.BeerModel;
    return function (req, res, next) {
         BreweryModel.findOne({_id: req.params.breweryid}, (err, brewery) =>{
            if(err){
                next(err);
            }
            if(brewery === null){
                res.redirect('/brewerylist');
            }
            res.locals.brew = brewery;
            return next();
        });
    };
};