const {Student,Faculty,Dean,Principal}=require('../Modals/UsersModel');
const bcrypt = require('bcryptjs');
const auth=require('../Helpers/jwt');

async function login({ employeeNo, password }) {
    
    let user = await Dean.findOne({employeeNo:employeeNo}) || await Student.findOne({admissionNo:employeeNo}) || await Faculty.findOne({employeeNo:employeeNo}) || await Principal.findOne({employeeNo:employeeNo});
    console.log(user);
    if(user){
        if(bcrypt.compareSync(password,user.password)){
        
            const token = auth.generateAccessToken(user);

            // call toJSON method applied during model instantiation
            return {...user.toJSON(), token}
        }
        else return null;
    }
    else{
        return null;
    }
    // synchronously compare user entered password with hashed password
    
    
    
}

async function register(params){

    // instantiate a user modal and save to mongoDB
    const user = new User(params)
    await user.save();
}

async function getById(id) {

    const user = await User.findById(id);
    // call toJSON method applied during model instantiation
    return user.toJSON()
}

module.exports = {
    login,
    register,
    getById
};