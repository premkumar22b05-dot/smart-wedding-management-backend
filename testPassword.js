const bcrypt = require("bcryptjs");

const plainPassword = "Prem@1234";

const hashedPassword =
"$2b$12$8lJqp6N1MpWLk9zx4DFmVOUQ.bBmMccppA5CgfnmLhIO9wk6jSVCO";


bcrypt.compare(
    plainPassword,
    hashedPassword
)
.then((result)=>{

    console.log(
        "Password Match:",
        result
    );

})
.catch((error)=>{

    console.error(error);

});