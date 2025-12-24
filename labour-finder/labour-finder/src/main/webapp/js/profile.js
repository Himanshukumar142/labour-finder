document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const stepOtp = document.getElementById('stepOtp');
    const stepForm = document.getElementById('stepForm');
    
    // OTP Section Inputs
    const inputMobile = document.getElementById('inputMobile');
    const btnGenOTP = document.getElementById('btnGenOTP');
    const otpDisplay = document.getElementById('otpDisplay');
    const otpVerifyDiv = document.getElementById('otpVerifyDiv');
    const inputOTP = document.getElementById('inputOTP');
    const btnVerifyOTP = document.getElementById('btnVerifyOTP');

    // Profile Form Inputs
    const profileForm = document.getElementById('profileForm');
    const formTitle = document.querySelector('#stepForm h2'); // To change title
    const submitBtn = document.querySelector('#profileForm button[type="submit"]'); // To change button text

    // State Variable
    let currentMobile = "";

    // --- Step 1: Generate OTP ---
    btnGenOTP.addEventListener('click', () => {
        const mobile = inputMobile.value;
        if (!mobile || mobile.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        currentMobile = mobile; // Lock the mobile number
        const otp = OTPService.generate(currentMobile);
        
        // UI Feedback
        otpDisplay.innerText = `DEMO SMS: Your OTP is ${otp}`;
        otpDisplay.classList.remove('hidden');
        otpVerifyDiv.classList.remove('hidden');
        
        // Disable mobile input so they can't change it after getting OTP
        inputMobile.disabled = true; 
        btnGenOTP.innerText = "OTP Sent";
        btnGenOTP.disabled = true;
    });

    // --- Step 2: Verify OTP & Check for Edit Mode ---
    btnVerifyOTP.addEventListener('click', () => {
        const inputOtpValue = inputOTP.value;

        if (OTPService.validate(currentMobile, inputOtpValue)) {
            // 1. Hide OTP Step
            stepOtp.classList.add('hidden');
            
            // 2. Show Form Step
            stepForm.classList.remove('hidden');

            // 3. CHECK: Does this user exist? (The Edit Logic)
            checkForExistingProfile(currentMobile);
            
        } else {
            alert("Invalid OTP! You cannot access this profile.");
        }
    });

    // --- Logic: Distinguish Edit vs Create ---
    function checkForExistingProfile(mobile) {
        // Search in LocalStorage
        const allLabours = DataManager.getAll();
        const existingUser = allLabours.find(user => user.mobile === mobile);

        if (existingUser) {
            // === EDIT MODE ===
            console.log("User found! Switching to Edit Mode.");
            
            // 1. Update UI Text
            formTitle.innerText = `Edit Profile: ${existingUser.name}`;
            formTitle.style.color = "#2563eb"; // Make it look active
            submitBtn.innerText = "Update Profile";
            
            // 2. Pre-fill Data
            document.getElementById('pName').value = existingUser.name;
            document.getElementById('pRole').value = existingUser.role;
            document.getElementById('pRate').value = existingUser.rate;
            document.getElementById('pTiming').value = existingUser.timing;
            document.getElementById('pExp').value = existingUser.experience;
            document.getElementById('pRating').value = existingUser.rating;
            
            document.getElementById('pVill').value = existingUser.location.village;
            document.getElementById('pCity').value = existingUser.location.city;
            document.getElementById('pState').value = existingUser.location.state;

        } else {
            // === CREATE MODE ===
            console.log("New User. Switching to Create Mode.");
            formTitle.innerText = "Create New Profile";
            submitBtn.innerText = "Save Profile";
        }
    }

    // --- Step 3: Save/Update Data ---
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const payload = {
            // Ensure we save with the VERIFIED mobile, not what they might try to hack
            mobile: currentMobile, 
            name: document.getElementById('pName').value,
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
        
        // Success Feedback
        if(submitBtn.innerText === "Update Profile") {
            alert("✅ Your profile has been successfully UPDATED!");
        } else {
            alert("✅ New profile created successfully!");
        }
        
        window.location.href = "index.html";
    });
});