import Employee from '../models/user.model.js'; 

const checkRole = (roles) => async (req, res, next) => {
  try {
    const { phonenumber,email } = req.body;

    if(phonenumber){
    const employee = await Employee.findOne({phonenumber});
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    if (!roles.includes(employee.role)) {
        return res.status(401).json({ message: 'Sorry, you do not have access to this route' });
      }
}
    if(email){
        const employee = await Employee.findOne({email});
        if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
        } if (!roles.includes(employee.role)) {
      return res.status(401).json({ message: 'Sorry, you do not have access to this route' });
    }}

   

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export default checkRole;
