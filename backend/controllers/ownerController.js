const db = require("../config/db");

const dashboard = async (req, res) => {

    try {

        const ownerId =
            req.session.user.id;

        const [stores] =
            await db.query(
                `SELECT id
                 FROM stores
                 WHERE owner_id=?`,
                [ownerId]
            );

        if (stores.length === 0) {

            return res.json({
                averageRating: 0,
                users: []
            });

        }

        const storeIds =
            stores.map(
                item => item.id
            );

        const placeholders =
            storeIds
            .map(() => "?")
            .join(",");

        const [rating] =
            await db.query(
                `SELECT
                ROUND(
                AVG(rating),
                1
                ) averageRating
                FROM ratings
                WHERE store_id IN (${placeholders})`,
                storeIds
            );

        const [users] =
            await db.query(
                `SELECT
                users.id,
                users.name,
                users.email,
                ratings.rating,
                ratings.store_id
                FROM ratings
                JOIN users
                ON ratings.user_id =
                users.id
                WHERE ratings.store_id
                IN (${placeholders})`,
                storeIds
            );

        res.json({
            averageRating:
                rating[0]
                .averageRating || 0,
            users
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const changePassword =
async (req, res) => {

    try {

        const ownerId =
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
                [ownerId]
            );

        if (
            rows.length === 0
        ) {

            return res.status(404)
            .json({
                message:
                "Owner not found"
            });

        }

        if (
            rows[0].password !==
            oldPassword
        ) {

            return res.status(400)
            .json({
                message:
                "Wrong old password"
            });

        }

        const passCheck =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

        if (
            !passCheck.test(
                newPassword
            )
        ) {

            return res.status(400)
            .json({
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
                ownerId
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
    dashboard,
    changePassword
};