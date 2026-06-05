const db = require("../config/db");

const dashboard = async (req, res) => {

    try {

        const [users] = await db.query(
            "SELECT COUNT(*) total FROM users"
        );

        const [stores] = await db.query(
            "SELECT COUNT(*) total FROM stores"
        );

        const [ratings] = await db.query(
            "SELECT COUNT(*) total FROM ratings"
        );

        res.json({
            totalUsers: users[0].total,
            totalStores: stores[0].total,
            totalRatings: ratings[0].total
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const addUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !address ||
            !role
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const [check] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (check.length > 0) {
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
                role
            ]
        );

        res.json({
            message: "User added successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const addStore = async (req, res) => {

    try {

        const {
            name,
            email,
            address,
            owner_id
        } = req.body;

        const [owner] = await db.query(
            `SELECT *
             FROM users
             WHERE id=?
             AND role='owner'`,
            [owner_id]
        );

        if (owner.length === 0) {

            return res.status(400).json({
                message: "Invalid owner"
            });

        }

        await db.query(
            `INSERT INTO stores
            (name,email,address,owner_id)
            VALUES(?,?,?,?)`,
            [
                name,
                email,
                address,
                owner_id
            ]
        );

        res.json({
            message: "Store added successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const getUsers = async (req, res) => {

    try {

        let {
            name,
            email,
            address,
            role,
            sort,
            order
        } = req.query;

        let sql = `
        SELECT
        id,
        name,
        email,
        address,
        role
        FROM users
        WHERE 1=1
        `;

        const values = [];

        if (name) {

            sql += `
            AND name LIKE ?
            `;

            values.push(
                `%${name}%`
            );

        }

        if (email) {

            sql += `
            AND email LIKE ?
            `;

            values.push(
                `%${email}%`
            );

        }

        if (address) {

            sql += `
            AND address LIKE ?
            `;

            values.push(
                `%${address}%`
            );

        }

        if (role) {

            sql += `
            AND role = ?
            `;

            values.push(role);

        }

        const sortField =
            sort === "email"
                ? "email"
                : "name";

        const sortOrder =
            order === "desc"
                ? "DESC"
                : "ASC";

        sql += `
        ORDER BY
        ${sortField}
        ${sortOrder}
        `;

        const [rows] =
            await db.query(
                sql,
                values
            );

        res.json(rows);

    }
    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const getStores = async (req, res) => {

    try {

        let {
            name,
            address,
            sort,
            order
        } = req.query;

        let sql = `
        SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        ROUND(
            AVG(ratings.rating),
            1
        ) AS rating
        FROM stores

        LEFT JOIN ratings
        ON stores.id =
        ratings.store_id

        WHERE 1=1
        `;

        const values = [];

        if (name) {

            sql += `
            AND stores.name LIKE ?
            `;

            values.push(
                `%${name}%`
            );

        }

        if (address) {

            sql += `
            AND stores.address LIKE ?
            `;

            values.push(
                `%${address}%`
            );

        }

        sql += `
        GROUP BY stores.id
        `;

        const sortField =
            sort === "email"
                ? "stores.email"
                : "stores.name";

        const sortOrder =
            order === "desc"
                ? "DESC"
                : "ASC";

        sql += `
        ORDER BY
        ${sortField}
        ${sortOrder}
        `;

        const [rows] =
            await db.query(
                sql,
                values
            );

        res.json(rows);

    }
    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const getUserDetails = async (req, res) => {

    try {

        const id =
        req.params.id;

        const [user] =
        await db.query(
            `SELECT
            id,
            name,
            email,
            address,
            role
            FROM users
            WHERE id=?`,
            [id]
        );

        if (
            user.length === 0
        ) {

            return res.status(404)
            .json({
                message:
                "User not found"
            });

        }

        const result =
        user[0];

        if (
            result.role ===
            "owner"
        ) {

            const [rating] =
            await db.query(
                `SELECT
                ROUND(
                    AVG(ratings.rating),
                    1
                ) rating
                FROM stores
                LEFT JOIN ratings
                ON stores.id =
                ratings.store_id
                WHERE stores.owner_id=?`,
                [id]
            );

            result.rating =
            rating[0].rating || 0;

        }

        res.json(result);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    dashboard,
    addUser,
    addStore,
    getUsers,
    getStores,
    getUserDetails
};