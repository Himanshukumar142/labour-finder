const DataManager = {
    KEY_LABOURS: 'labour_finder_data',
    
    init: function() {
        if (!localStorage.getItem(this.KEY_LABOURS)) {
            const seedData = [
                { name: "Rahul Sharma", mobile: "9876543210", role: "Plumber", rate: "500", timing: "09:00 AM - 06:00 PM", experience: "5", rating: "4.8", location: { village: "Sector 45", city: "Gurgaon", state: "Haryana", country: "India" } },
                { name: "Vikram Singh", mobile: "9988776655", role: "Electrician", rate: "600", timing: "10:00 AM - 07:00 PM", experience: "8", rating: "4.5", location: { village: "Andheri West", city: "Mumbai", state: "Maharashtra", country: "India" } },
                { name: "Suresh Patil", mobile: "9123456780", role: "Carpenter", rate: "750", timing: "08:00 AM - 05:00 PM", experience: "12", rating: "5.0", location: { village: "Koramangala", city: "Bangalore", state: "Karnataka", country: "India" } }
            ];
            localStorage.setItem(this.KEY_LABOURS, JSON.stringify(seedData));
        }
    },

    getAll: function() {
        this.init();
        return JSON.parse(localStorage.getItem(this.KEY_LABOURS));
    },

    save: function(labourData) {
        let list = this.getAll();
        const index = list.findIndex(l => l.mobile === labourData.mobile);
        
        if (index > -1) {
            list[index] = labourData; 
        } else {
            list.push(labourData); 
        }
        localStorage.setItem(this.KEY_LABOURS, JSON.stringify(list));
    },

    
    setOTP: function(mobile, otp) {
        sessionStorage.setItem(`otp_${mobile}`, otp); 
    },
    
    getOTP: function(mobile) {
        return sessionStorage.getItem(`otp_${mobile}`);
    }
};