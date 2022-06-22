var expect = require('chai').expect;
var checkPasswordMW = require('../../../../middleware/auth/checkPasswordMW');

describe('checkPasswordMW middleware ', function () {
    it('should redirect to /brewerylist and loggedin true', function (done){
        const mw = checkPasswordMW({});
        const reqMock={
            session:{
                save: (err)=>{
                    done();
                }
            },
            body:{
                pass: 'asd'
            }
        }
        const resMock={
            locals:{},
            redirect: (dir)=>{
                expect(resMock.body).to.be.eql({pass: 'asd'})
                expect(dir).to.be.eql("/brewerylist")
                expect(reqMock.session).to.be.eql({loggedin: true})
            }
        }
        mw(
            reqMock,
            resMock,
            ()=>{
                expect(resMock.locals).to.be.eql({})
                done();
            });
    });
    it('should call next because Wrong pass', function (done){
        const mw = checkPasswordMW({});
        const reqMock={
            session:{
                save: (err)=>{
                    done();
                }
            },
            body:{
                pass: '123'
            }
        }
        const resMock={
            locals:{},
            redirect: (dir)=>{}
        }
        mw(
            reqMock,
            resMock,
            ()=>{
                expect(reqMock.body.pass).to.be.eql('123')
                expect(resMock.locals).to.be.eql({error: "Wrong Password"})
                done();
            });
    });
    it('should call next because pass is undefined', function (done){
        const mw = checkPasswordMW({});
        const reqMock={
            session:{
                save: (err)=>{
                    done();
                }
            },
            body:{
            }
        }
        const resMock={
            locals:{},
            redirect: (dir)=>{}
        }
        mw(
            reqMock,
            resMock,
            ()=>{
                expect(reqMock.body.pass).to.be.eql(undefined)
                done();
            });
    });
});