import { User, ADMIN_SECRET, USER_SECRET, MEMBER_SECRET } from "models-pms";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getRoleToken = (role) => {
    switch (role) {
        case "admin":
            return ADMIN_SECRET;
        case "member":
            return MEMBER_SECRET;
        case "user":
            return USER_SECRET;
        default:
            throw new Error("Invalid role");
    }
};

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const secret = getRoleToken(user.role);
        const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "3h" });

        // Send token in the Authorization header
        res.setHeader('Authorization', `Bearer ${token}` );

        res.json({
            message: "Login successful",
            user: { id: user._id, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
