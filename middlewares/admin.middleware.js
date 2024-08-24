import Employee from '../models/user.model.js'; 

async function adminrole(req, res, next) {
    const email = req.body.email; 
    if (email) {
        try {
            const employee = await Employee.findOne({ email });
            if (employee) {
              
                if (employee.role === 'admin') {
                    
                    return next();
                } else {
                  
                    return res.status(403).json({ message: "Access denied: Admins only" });
                }
            } else {
                return res.status(404).json({ message: "Employee not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    } else {
        return res.status(400).json({ message: "Email is required" });
    }
}

export default adminrole;
