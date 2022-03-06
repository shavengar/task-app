const query = require("../config/mysql.config");

async function addHabit(res, habit) {
    try {
        const { insert_id } = await query("INSERT INTO habits SET ?", [habit]);
        return res.send({
            data: insert_id,
            success: true,
            error: null,
        });
    } catch (error) {
        return res.send({
            data: null,
            success: false,
            error: "Something went wrong, please try again later.",
        });
    }
}

async function removeHabit(res, id) {
    try {
        await query("DELETE FROM habits WHERE habit.id = ?", [id]);
        return res.send({
            data: "Removed successfully.",
            success: true,
            error: null,
        });
    } catch (error) {
        return res.send({
            data: null,
            success: false,
            error: "Something went wrong, please try again later.",
        });
    }
}

async function getHabitsByUserId(res, userID) {
    try {
        const habits = await query("SELECT * FROM habits WHERE user_id = ?", [
            userID,
        ]);
        return res.send({
            data: habits,
            success: true,
            error: null,
        });
    } catch (err) {
        return res.send({
            data: null,
            success: false,
            error: "Something went wrong, please try again later.",
        });
    }
}

module.exports = { addHabit, removeHabit, getHabitsByUserId };
