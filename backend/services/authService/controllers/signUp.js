import bcrypt from "bcrypt";
import {User} from "models-pms"; // Update with your correct path

// Register Controller
export const signUpController = async (req, res) => {
    try {
        const { name, email, password, gender, role, address, phone } = req.body.formData;
        if(!password){
            return res.status(400).json({message: "Password is required"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', 
            address,
            phone,
            gender
        });

        await newUser.save();

    
        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
