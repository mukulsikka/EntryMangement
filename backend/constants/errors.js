const blank_variable = "Input %s was empty";

module.exports.status = {
    '500' : "server error",
    '200' : "success",
    '101' : "user already exists",
    '403' : "blank field",
    '102' : "unmatched",
    '103' : "too small",
    '104' : "otp not verified",
    '405' : "user doesn't exist"
}; 
                                  
module.exports = {
    blank_variable,
};