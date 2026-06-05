const db = require("../config/db");

const signup = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            address
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !address
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (name.length < 20 || name.length > 60) {
            return res.status(400).json({
                message: "Name must be between 20 and 60 characters"
            });
        }

        if (address.length > 400) {
            return res.status(400).json({
                message: "Address is too long"
            });
        }

        const emailCheck =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailCheck.test(email)) {
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        const passCheck =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

        if (!passCheck.test(password)) {
            return res.status(400).json({
                message:
                    "Password must contain uppercase and special character"
            });
        }

        const [user] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (user.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        await db.query(
            `INSERT INTO users
            (name,email,password,address,role)
            VALUES(?,?,?,?,?)`,
            [
                name,
                email,
                password,
                address,
                "user"
            ]
        );

        res.status(201).json({
            message: "Account created successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const [rows] = await db.query(
            `SELECT * FROM users
             WHERE email=? AND password=?`,
            [email, password]
        );

        if (rows.length === 0) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        req.session.user = {
            id: rows[0].id,
            name: rows[0].name,
            role: rows[0].role
        };

        res.json({
            message: "Login successful",
            user: req.session.user
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const logout = (req, res) => {

    req.session.destroy(() => {

        res.json({
            message: "Logged out successfully"
        });

    });

};

module.exports = {
    signup,
    login,
    logout
};