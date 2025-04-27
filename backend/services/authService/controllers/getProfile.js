import { USER_SECRET, ADMIN_SECRET, MEMBER_SECRET, User } from 'models-pms';
import jwt from 'jsonwebtoken';

const getRoleToken = (role) => {
    switch (role) {
        case 'admin':
            return ADMIN_SECRET;
        case 'member':
            return MEMBER_SECRET;
        case 'user':
            return USER_SECRET;
        default:
            throw new Error('Invalid role');
    }
};

export const isAuthenticatedMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token
        if (!token) return res.status(401).send({ message: "Unauthorized" });
        let decoded;
        try {
            decoded = jwt.decode(token); 

            if (!decoded || !decoded.role) {
                return res.status(401).send({ message: "Invalid token payload" });
            }

            // Now, use the role to verify the token with the correct secret
            const secret = getRoleToken(decoded.role); // Get secret based on the role
            jwt.verify(token, secret); // Verify the token with the corresponding secret
        } catch (error) {
            return res.status(401).send({ message: "Invalid or expired token" });
        }

        // Now that the token is verified, attach the decoded data to the request
        req.user = decoded;
        next(); // Proceed to next middleware/route handler
    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }

};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the decoded JWT
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        // Return user profile (excluding sensitive fields)
        res.json({
            message: "Profile retrieved successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status,
                createdAt: user.createdAt,
                address: user.address,
                phone: user.phone,
                gender:user.gender
            }
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
