import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  const prompt = `
Wewe ni SamChat.
Wewe ni msaidizi wa Web Development.
Jibu maswali ya HTML na CSS pekee.
Tumia Kiswahili rahisi.
Toa mifano midogo ya code.
Kama swali sio la website, sema:
"SamChat inajibu maswali ya website tu."
Swali: ${userMsg}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () => console.log("SamChat running"));
