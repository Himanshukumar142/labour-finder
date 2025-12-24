const OTPService = {
    generate: (mobile) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        DataManager.setOTP(mobile, otp);
        return otp;
    },
    
    validate: (mobile, inputOtp) => {
        const validOtp = DataManager.getOTP(mobile);
        return validOtp && validOtp == inputOtp;
    }
};