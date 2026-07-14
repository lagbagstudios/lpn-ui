import { A, useParams } from "@solidjs/router";
import { createResource, createSignal, Show } from "solid-js";

type LicensePlateProps = {
	plateNum: string;
}

function LicensePlate(props: LicensePlateProps) {
	return (
		<div class="license-plate">
			<div class="plate-header">Looking For...</div>
			<div class="plate-number">{props.plateNum}</div>
			<div class="plate-slogan">Land of 10,000 Lakes</div>
		</div>
	)
}

export default function Game() {
	const params = useParams();
	const [currentPlate] = createResource(
		() => params.code,
		async () => {
			return "123";
		},
	)

	const [showSetCounter, setShowSetCounter] = createSignal(false);
	const [resetTo] = createSignal('');

	const handleSetNumber = () => {
		console.log(`setting plate number to ${resetTo()}`)
		setShowSetCounter(false)
	}

	return (
		<div class="home">
			<LicensePlate plateNum={currentPlate() ?? "000"} />
			<button class="button secondary found-button">Found It!</button>
			<button class="button primary found-button">Subtract One</button>
			<Show when={showSetCounter()}>
				<div class="reset-counter">
					<input placeholder="Enter LPN" type="tel" />
					<button class="button secondary" onClick={handleSetNumber} value={resetTo()}>Set</button>
				</div>
			</Show>
			<p class="footer-text">
				<A class="text-link" href="/">Home</A> | <button class="text-link" onClick={() => setShowSetCounter(true)}>Manually Set Counter</button>
			</p>
		</div >
	)
}

