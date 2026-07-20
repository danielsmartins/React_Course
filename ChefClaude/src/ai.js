const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.

You don't need to use every ingredient they mention.

The recipe can include additional ingredients they didn't mention, but try not to include too many.

Format your response in markdown.
`;

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function getRecipe(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          // ou "qwen/qwen3.6-plus-preview:free"
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `I have ${ingredientsString}. Please recommend a recipe.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return "Sorry, I couldn't generate a recipe right now.";
  }
}
