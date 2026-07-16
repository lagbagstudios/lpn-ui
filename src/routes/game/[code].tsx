import { A, useParams } from "@solidjs/router";
import { createResource, createSignal, Show } from "solid-js";

type LicensePlateProps = {
	plateNum: Number | undefined;
}

function LicensePlate(props: LicensePlateProps) {
	const plateString = () => `${props.plateNum ?? 0}`.padStart(3, "0")
	console.log(props.plateNum, plateString)
	return (
		<div class="license-plate">
			<div class="plate-header">Looking For...</div>
			<div class="plate-number">{plateString()}</div>
			<div class="plate-slogan">Land of 10,000 Lakes</div>
		</div>
	)
}

export default function Game() {
	const params = useParams();
	const [currentPlate, { mutate: setCurrentPlate }] = createResource(
		params.code,
		async (code) => {
			console.log(`fetching lpn for code: ${code}`)
			return 123;
		},
	)

	const [showSetCounter, setShowSetCounter] = createSignal(false);
	const [resetTo, setResetTo] = createSignal('');
	const [inputFocused, setInputFocused] = createSignal(false);

	const handleSetNumber = () => {
		const plateNum = Number(resetTo())
		setInputFocused(false)
		if (isNaN(plateNum) || resetTo() === '') {
			setResetTo('')
			return
		}
		console.log(`setting plate number to ${plateNum}`)
		setCurrentPlate(plateNum)
		setShowSetCounter(false)
		setResetTo('')
	}

	const handleFoundNumber = () => {
		let plate = (currentPlate() ?? 0) + 1
		setCurrentPlate(plate)
		console.log(`set plate to ${plate}`)
	}

	const handleSubtractOne = () => {
		let plate = (currentPlate() ?? 0) - 1
		setCurrentPlate(plate)
		console.log(`set plate to ${plate}`)
	}

	return (
		<div class="home" classList={{ "input-focused": inputFocused() }}>
			<h3 class="hideable-content">Game Code: {params.code}</h3>
			<LicensePlate plateNum={currentPlate()} />
			<button class="button secondary found-button hideable-content" onClick={handleFoundNumber}>Found It!</button>
			<button class="button primary found-button hideable-content" onClick={handleSubtractOne}>Subtract One</button>
			<Show when={showSetCounter()}>
				<div class="reset-counter">
					<input
						placeholder="Enter LPN"
						type="tel"
						onInput={(e) => setResetTo(e.target.value)}
						onKeyDown={(e) => { if (e.key === 'Enter') { handleSetNumber() } }}
						onFocus={() => setInputFocused(true)}
						onBlur={() => { setInputFocused(false); setShowSetCounter(false); setResetTo(''); }}
						value={resetTo()}
					/>
					<button class="button secondary" onMouseDown={handleSetNumber}>Set</button>
				</div>
			</Show>
			<p class="footer-text">
				<A class="text-link" href="/">Home</A> | <button class="text-link" onClick={() => setShowSetCounter(!showSetCounter())}>{showSetCounter() ? `Close` : `Manually Set Number`}</button>
			</p>
		</div >
	)
}

