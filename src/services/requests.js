const apiUrl = 'https://v3.football.api-sports.io/countries';

export const authenticate = async (apiKey) => {
  const response = await fetch(apiUrl, {
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
};
