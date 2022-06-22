var expect = require('chai').expect;
var getBeerMW = require('../../../../middleware/beer/getBeerMW');

describe('getBeerMW middleware ', function () {
    it('should set res.locals.beers with an object from db', function (done){
        const mw = getBeerMW({
            BeerModel:{
                findOne: (p1, cb)=>{
                    expect(p1).to.be.eql({_id: '22' });
                    cb(null, 'mockbeer');
                }
            }

        });
        const resMock={
            locals:{}
        }
        mw({
            params:{
                beerid: '22'
            }
        },
        resMock,
        (err)=>{
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({beer: 'mockbeer' });
            done();
        });
    });
    it('should call next cause db problem', function (done){
        const mw = getBeerMW({
            BeerModel:{
                findOne: (p1, cb)=>{
                    expect(p1).to.be.eql({_id: '22' });
                    cb('dbHiba', null);
                }
            }

        });
        const resMock={
            locals:{}
        }
        mw({
                params:{
                    beerid: '22'
                }
            },
            resMock,
            (err)=>{
                expect(err).to.be.eql('dbHiba');
                done();
            });
    });
});