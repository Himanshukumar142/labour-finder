document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const stepOtp = document.getElementById('stepOtp');
    const stepForm = document.getElementById('stepForm');
    const otpDisplay = document.getElementById('otpDisplay');
    const otpVerifyDiv = document.getElementById('otpVerifyDiv');
    
    // Buttons
    const btnGenOTP = document.getElementById('btnGenOTP');
    const btnVerifyOTP = document.getElementById('btnVerifyOTP');
    const profileForm = document.getElementById('profileForm');

    // Step 1: Generate OTP
    btnGenOTP.addEventListener('click', () => {
        const mobile = document.getElementById('inputMobile').value;
        if (!mobile || mobile.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        const otp = OTPService.generate(mobile);
        
        // UI Updates
        otpDisplay.innerText = `DEMO SMS: Your OTP is ${otp}`;
        otpDisplay.classList.remove('hidden');
        otpVerifyDiv.classList.remove('hidden');
        btnGenOTP.disabled = true;
        btnGenOTP.innerText = "OTP Sent";
    });

    // Step 2: Verify OTP
    btnVerifyOTP.addEventListener('click', () => {
        const mobile = document.getElementById('inputMobile').value;
        const inputOtp = document.getElementById('inputOTP').value;

        if (OTPService.validate(mobile, inputOtp)) {
            stepOtp.classList.add('hidden');
            stepForm.classList.remove('hidden');
            loadProfileData(mobile);
        } else {
            alert("Invalid OTP. Please try again.");
        }
    });

    // Step 3: Load Data (if exists)
    function loadProfileData(mobile) {
        const existing = DataManager.getAll().find(u => u.mobile === mobile);
        if (existing) {
            document.getElementById('pName').value = existing.name;
            document.getElementById('pRole').value = existing.role;
            document.getElementById('pRate').value = existing.rate;
            document.getElementById('pTiming').value = existing.timing;
            document.getElementById('pExp').value = existing.experience;
            document.getElementById('pRating').value = existing.rating;
            document.getElementById('pVill').value = existing.location.village;
            document.getElementById('pCity').value = existing.location.city;
            document.getElementById('pState').value = existing.location.state;
        }
    }

    // Step 4: Save Profile
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const payload = {
            name: document.getElementById('pName').value,
            mobile: document.getElementById('inputMobile').value,
            role: document.getElementById('pRole').value,
            rate: document.getElementById('pRate').value,
            timing: document.getElementById('pTiming').value,
            experience: document.getElementById('pExp').value,
            rating: document.getElementById('pRating').value,
            location: {
                village: document.getElementById('pVill').value,
                city: document.getElementById('pCity').value,
                state: document.getElementById('pState').value,
                country: "India"
            }
        };

        DataManager.save(payload);
        alert("Profile Saved Successfully!");
        window.location.href = "index.html";
    });
});