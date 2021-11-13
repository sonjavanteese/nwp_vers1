<script>
	import { onMount, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  	const icon_size = "24px";
	const playIco = `<svg style="width:${icon_size};height:${icon_size}" viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>`;
	const pauseIco = `<svg style="width:${icon_size};height:${icon_size}" viewBox="0 0 24 24"><path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>`;
	const muteIco = `<svg style="width:${icon_size};height:${icon_size}" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" /></svg>`;
	const unmuteIco = `<svg style="width:${icon_size};height:${icon_size}" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /></svg>`;
	const closeIco = `<svg style="width:${icon_size};height:${icon_size}" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;
	const elements = new Set();
	export let daten = {
		titel: "LA LA LAND",
		interpret: "Haiyti",
		album: "Sui Sui",
		jahr: 2020,
		id: 3,
		img_url: "https://nwp-cgn.de/img/poser/haiyti-wall1.jpg",
		file_url: "https://nwp-cgn.de/archiv/audio/haiyti_la_la_land.mp3"
	};
	let src;
	let duration = 0;
	let dur = 0;
	let paused = true;
	let muted = false;
	let volume = 0.5;
	let time = 0;
	let pos = 0;
	let vol = 50;
	let audio;
	const stopOthers = () => {
		elements.forEach((element) => {
			if (element !== audio) element.pause();
		});
	}
	const format = (seconds) => {
		if (isNaN(seconds)) return "...";
		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = "0" + seconds;
		return `${minutes}:${seconds}`;
	}
	onMount(() => {
		elements.add(audio);
		return () => elements.delete(audio);
	})
	$: volume = vol / 100;
	$: pos = format(time.toFixed(1))
	$: dur = format(duration.toFixed(1))
	$: if(daten && daten.file_url) {
		src = daten.file_url;
	}
</script>

{#if src}
<section class="flex flex-col-reverse sm:flex-row items-center justify-between py-2 px-4">
	<button on:click={() => dispatch('closePlayer', 'close player')} class="hidden sm:inline-block px-1 py-1 mr-1">{@html closeIco}</button>
	<article class="w-full flex items-center md:justify-center">
		<button on:click={() => (paused = !paused)} class="px-1 py-1">
			{#if paused}
			{@html playIco}
			{:else}
			{@html pauseIco}
			{/if}
		</button>
		<span class="px-1">
			<input
						 bind:value={time}
						 type="range"
						 id="tim"
						 min="0"
						 max={duration}
						 />
		</span>
		<span class="mx-2 px-2 py-1 text-sm md:text-base border truncate">
			{pos}/{dur}
		</span>            
	</article>
	<header class="w-full flex items-center sm:text-center h-full mr-2 pb-2 sm:pb-0">
		<button on:click={() => dispatch('closePlayer', 'close player')} class="sm:hidden px-1 sm:py-1 mr-1">{@html closeIco}</button>
		<div class="w-full text-xs sm:text-sm md:text-base font-medium px-4 py-1 border truncate">{daten.titel} - {daten.interpret}</div>
	</header>
	<article class="hidden w-full md:flex flex items-center justify-center px-4 py-4">
		<button on:click={() => (muted = !muted)} class="px-1 py-1" class:opacity-50={muted}>
			{#if muted}
			{@html muteIco}
			{:else}
			{@html unmuteIco}
			{/if}
		</button>
		<span class="px-1" class:opacity-10={muted}>
			<input
						 bind:value={vol}
						 type="range"
						 id="vol"
						 name="vol"
						 min="0"
						 max="100"
						 />
		</span>
		<span class="mx-2 px-2 py-1 border" class:opacity-10={muted}>
			{volume * 100}%
		</span>

	</article>
</section>
<audio class="hidden"
	controls={false}
	{src}
	bind:duration
	bind:currentTime={time}
	bind:paused
	bind:volume
	bind:muted
	/>
{/if}