export const checkValidData = (email,password)=> {
    const isEmailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
    const isPassword = /^[a-zA-Z0-9]{6}$/.test(password);
    // const isPassword = /^[a-zA-Z0-9!@#$%^&*()_+]{8}$/.test(password);

    if(!isEmailValid) return "Email Id is not valid";
    if(!isPassword) return "Password is not valid";
    return null;
};