const { Configuration, OpenAIApi } = require("openai");
const conf = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(conf);

const generateImage = async (req, res) => {
    const { prompt, n } = req.body;

    try {
        const response = await openai.createImage({
            prompt,
            n,
            size: "256x256",
        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
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
