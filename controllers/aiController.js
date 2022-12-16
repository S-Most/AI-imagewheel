const { Configuration, OpenAIApi } = require("openai");
const conf = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(conf);

const generateImage = async (req, res) => {
    const { prompt, num } = req.body;

    try {
        const response = await openai.createImage({
            prompt,
            n: parseInt(num, 10),
            size: "256x256",
        });

        const dataObject = response.data.data;

        res.status(200).json({
            success: true,
            data: dataObject,
        });
    } catch (err) {
        if (err.response) {
            console.error(err.response.status);
            console.error(err.response.data);
        } else {
            console.error(err.message);
        }
        res.status(400).json({
            success: false,
            error: "Your Fault!",
        });
    }
};

module.exports = { generateImage };
