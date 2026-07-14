import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

function Join() {
	const [code, setCode] = createSignal("");
	const navigate = useNavigate();

	const handleJoin = () => {
		const gameCode = code().trim();
		if (gameCode) {
			navigate(`/game/${gameCode}`);
		}
	};

	return (
		<div class="join">
			<input
				placeholder={"Game Code"}
				value={code()}
				onInput={(e) => setCode(e.currentTarget.value)}
				onKeyDown={(e) => e.key === "Enter" && handleJoin()}
			/>
			<button class="button primary" onClick={handleJoin}>
				Join Game
			</button>
		</div>
	);
}

function Create() {
	const navigate = useNavigate();
	const handleCreate = () => {
		const gameCode = Math.floor(1000 + Math.random() * 9000).toString();
		navigate(`/game/${gameCode}`);
	}

	return (
		<button class="button secondary" onClick={handleCreate}>
			Create New Game
		</button>
	);
}

export default function Home() {
	return (
		<div class="home">
			<h1 class="main-header">License Plate Game</h1>
			<Create />
			<p>- or -</p>
			<Join />
		</div>
	);
}
