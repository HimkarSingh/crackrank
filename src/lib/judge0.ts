// judge0.ts - Utility for Judge0 API integration

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = import.meta.env.VITE_JUDGE0_API_KEY || ""; // Add this to your .env file

const languageMap: Record<string, number> = {
  python: 71, // Python 3
  javascript: 63, // JavaScript (Node.js)
  java: 62, // Java (OpenJDK)
  cpp: 54, // C++ (GCC)
};

export async function executeCode({ source_code, language, stdin = "" }: { source_code: string; language: string; stdin?: string; }) {
  const language_id = languageMap[language] || 71;
  const response = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": JUDGE0_API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_code,
      language_id,
      stdin,
    }),
  });
  if (!response.ok) throw new Error("Failed to execute code");
  return response.json();
} 