const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function main(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
  });
  console.log(response.text);
  return response.text;
}
module.exports = {
    main,
}