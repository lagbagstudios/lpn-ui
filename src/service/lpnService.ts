const baseUrl = "http://localhost:8080"

interface Game {
	code: number;
	lpn: number;
}

export const createGame = async (code: number): Promise<Game> => {
	try {
		return (await fetch(`${baseUrl}/game`, {
			method: "POST",
			body: JSON.stringify({ code: code })
		})).json()
	} catch (error) {
		throw error
	}
}

export const getGame = async (code: number): Promise<Game> => {
	try {
		return (await fetch(`${baseUrl}/game/${code}`)).json()
	} catch (error) {
		throw error
	}
}

export const updateGame = async (code: number, lpn: number): Promise<Game> => {
	console.log(code, lpn)
	try {
		return (await fetch(`${baseUrl}/game/${code}`, {
			method: "PUT",
			body: JSON.stringify({ code: code, lpn: lpn })
		})).json()
	} catch (error) {
		throw error
	}
}

