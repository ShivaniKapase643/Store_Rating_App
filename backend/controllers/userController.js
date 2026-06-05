const db = require("../config/db");

const getStores = async (req, res) => {

    try {

        const userId = req.session.user.id;

        let {
            name,
            address
        } = req.query;

        let sql = `
        SELECT
        stores.id,
        stores.name,
        stores.address,
        ROUND(AVG(r.rating),1) overall_rating,
        ur.rating user_rating
        FROM stores

        LEFT JOIN ratings r
        ON stores.id = r.store_id

        LEFT JOIN ratings ur
        ON stores.id = ur.store_id
        AND ur.user_id = ?

        WHERE 1=1
        `;

        const values = [userId];

        if (name) {
            sql += " AND stores.name LIKE ?";
            values.push(`%${name}%`);
        }

        if (address) {
            sql += " AND stores.address LIKE ?";
            values.push(`%${address}%`);
        }

        sql += `
        GROUP BY
        stores.id,
        ur.rating
        `;

        const [rows] = await db.query(
            sql,
            values
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const addRating = async (req, res) => {

    try {

        const userId =
            req.session.user.id;

        const {
            store_id,
            rating
        } = req.body;

        if (
            rating < 1 ||
            rating > 5
        ) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        const [check] =
            await db.query(
                `SELECT *
                 FROM ratings
                 WHERE user_id=? AND store_id=?`,
                [userId, store_id]
            );

        if (check.length > 0) {
            return res.status(400).json({
                message: "Rating already submitted"
            });
        }

        await db.query(
            `INSERT INTO ratings
            (user_id,store_id,rating)
            VALUES(?,?,?)`,
            [
                userId,
                store_id,
                rating
            ]
        );

        res.json({
            message: "Rating submitted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
const updateRating = async (req, res) => {

    try {

        const userId =
            req.session.user.id;

        const storeId =
            req.params.storeId;

        const {
            rating
        } = req.body;

        if (
            rating < 1 ||
            rating > 5
        ) {

            return res.status(400).json({
                message:
                "Rating must be between 1 and 5"
            });

        }

        const [check] =
        await db.query(
            `SELECT *
             FROM ratings
             WHERE user_id=? AND store_id=?`,
            [
                userId,
                storeId
            ]
        );

        if (
            check.length === 0
        ) {

            return res.status(404).json({
                message:
                "Rating not found"
            });

        }

        await db.query(
            `UPDATE ratings
             SET rating=?
             WHERE user_id=?
             AND store_id=?`,
            [
                rating,
                userId,
                storeId
            ]
        );

        res.json({
            message:
            "Rating updated"
        });

    } catch (err) {

        res.status(500).json({
            message:
            err.message
        });

    }

};
const changePassword = async (req, res) => {

    try {

        const userId =
            req.session.user.id;

        const {
            oldPassword,
            newPassword
        } = req.body;

        const [rows] =
            await db.query(
                `SELECT *
                 FROM users
                 WHERE id=?`,
                [userId]
            );

        if (
            rows[0].password !==
            oldPassword
        ) {
            return res.status(400).json({
                message: "Wrong old password"
            });
        }

        const passCheck =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

        if (
            !passCheck.test(
                newPassword
            )
        ) {
            return res.status(400).json({
                message:
                "Invalid password format"
            });
        }

        await db.query(
            `UPDATE users
             SET password=?
             WHERE id=?`,
            [
                newPassword,
                userId
            ]
        );

        res.json({
            message:
            "Password updated"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getStores,
    addRating,
    updateRating,
    changePassword
};