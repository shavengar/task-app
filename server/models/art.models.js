const query = require("../config/mysql.config");
const axios = require("axios");

async function addArt(res) {
    try {
        const baseURL =
            "https://www.rijksmuseum.nl/api/en/collection?key=L93w4I9H&imgonly=true&ps=100&toppieces=true";
        let randomIndex = math.Floor(math.Random() * (100 - 1) + 1);
        const response = await axios.get(baseURL);
        const art = response.artObjects.at(randomIndex).map((val) => ({
            id: val.id,
            title: val.longTitle,
            img: val.webImage.url,
        }));
        if (!art) {
            return res.send({
                data: null,
                success: false,
                error: "Unable to connect to Rijk Museum.",
            });
        }
        let { insertId } = await query("INSERT INTO art SET ?", [art]);
        return res.send({
            data: insertId,
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

async function removeArt(res, id) {
    try {
        await query("DELETE FROM art WHERE id = ?", [id]);
        return res.send({
            data: "Successfully removed.",
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

async function getArtByHabitId(res, habitID) {
    try {
        const art = await query("SELECT * FROM art WHERE habit_id = ?", [
            habitID,
        ]);
    } catch (err) {
        return res.send({
            data: null,
            success: false,
            error: "Something went wrong, please try again later.",
        });
    }
}

module.exports = { addArt, removeArt, getArtByHabitId };
