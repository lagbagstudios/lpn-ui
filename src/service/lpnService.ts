const baseUrl = "https://lpnapi.deiders.com"

interface Game {
	code: number;
	lpn: number;
}

export const createGame = async (code: number): Promise<Game> => {
	const response = await fetch(`${baseUrl}/game`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ code })
	});
	return response.json();
}

export const getGame = async (code: number): Promise<Game> => {
	const response = await fetch(`${baseUrl}/game/${code}`);
	return response.json();
}

export const updateGame = async (code: number, lpn: number): Promise<Game> => {
	const response = await fetch(`${baseUrl}/game/${code}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ code, lpn })
	});
	return response.json();
}
