import { A, useParams } from "@solidjs/router";
import { createResource, onCleanup } from "solid-js";
import { getGame, updateGame } from "../service/lpnService";

const POLL_INTERVAL_MS = 60_000;

type LicensePlateProps = {
	plateNum: number | undefined;
}

function LicensePlate(props: LicensePlateProps) {
	const plateString = () => `${props.plateNum ?? 0}`.padStart(3, "0")
	return (
		<div class="license-plate">
			<div class="plate-header">Looking For</div>
			<div class="plate-number">{plateString()}</div>
			<div class="plate-slogan">Land of 10,000 Lakes</div>
		</div>
	)
}

export default function Game() {
	const params = useParams();
	const [currentPlate, { mutate: setCurrentPlate, refetch }] = createResource(
		params.code,
		async () => {
			return (await getGame(Number(params.code))).lpn
		},
	)

	const intervalId = setInterval(() => refetch(), POLL_INTERVAL_MS);
	onCleanup(() => clearInterval(intervalId));

	const handleFoundNumber = async () => {
		let plate = (currentPlate() ?? 0) + 1
		await updateGame(Number(params.code), plate)
		setCurrentPlate(plate)
	}

	const handleSubtractOne = async () => {
		let plate = (currentPlate() ?? 0) - 1
		await updateGame(Number(params.code), plate)
		setCurrentPlate(plate)
	}

	return (
		<div class="home">
			<A class="text-link" href="/">Home</A>
			<LicensePlate plateNum={currentPlate()} />
			<button class="button secondary found-button hideable-content" onClick={handleFoundNumber}>Found It!</button>
			<button class="button primary found-button hideable-content" onClick={handleSubtractOne}>Subtract One</button>
			<div class="footer-text">
				<h3>Game Code: {params.code}</h3>
			</div>
		</div >
	)
}

