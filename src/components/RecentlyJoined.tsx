import { useNavigate } from "@solidjs/router";
import { Show, createSignal, onMount } from "solid-js";

export default function RecentlyJoined() {
	const navigate = useNavigate();
	const [recentCodes, setRecentCodes] = createSignal<string[]>([]);

	onMount(() => {
		try {
			console.log("recent codes", JSON.parse(localStorage.getItem("recentCodes") || "[]"))
			setRecentCodes(JSON.parse(localStorage.getItem("recentCodes") || "[]"));
		} catch {
			setRecentCodes([]);
		}
	});

	return (
		<Show when={recentCodes().length > 0}>
			<div class="recently-joined">
				<p class="recently-joined-label">Recently Joined</p>
				<div class="recently-joined-list">
					{recentCodes().map((code) => (
						<button class="button secondary" onClick={() => navigate(`/game/${code}`)}>
							Game {code}
						</button>
					))}
				</div>
			</div>
		</Show>
	);
}
