const RANDOM_WORD_URL = "https://random-word-api.herokuapp.com/word";
const DICTIONARY_URL = "https://freedictionaryapi.com/api/v1/entries/en";

export async function getRandomWord(length = 5) {
  const response = await fetch(`${RANDOM_WORD_URL}?length=${length}`);
  if (!response.ok) {
    throw new Error(`'Random word API failed' with status ${response.status}`);
  }
  const [word] = await response.json();
  console.log('Random word fetched:', word);
  return word;
}

export async function isValidWord(word) {
  const response = await fetch(
    `${DICTIONARY_URL}/${encodeURIComponent(word.toLowerCase())}`,
  );
  return response.ok;
}
