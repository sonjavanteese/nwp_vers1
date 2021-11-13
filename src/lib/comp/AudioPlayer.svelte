<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>

<script>
	import { onMount } from 'svelte';

	export let src;
	export let titel;
	export let interpret;
	export let album;
	export let jahr;
    export let poster;
	let audio;
	let paused = true;

	onMount(() => {
		elements.add(audio);
		return () => elements.delete(audio);
	});

	function stopOthers() {
		elements.forEach(element => {
			if (element !== audio) element.pause();
		});
	}
</script>

<article class:playing={!paused}>
	<h2>{titel}</h2>
	<p>by <strong>{interpret}</strong> / <small>released</small> <em>{jahr}</em> <small>on</small> <strong><em>{album}</em></strong></p>
    <div data-src={poster}></div>
	<audio
		bind:this={audio}
		bind:paused
		on:play={stopOthers}
		controls
		{src}
	></audio>
</article>

<style>
	article { 
        @apply w-full py-4 px-4 my-2 border border-dashed;
     }
	h2, p { margin: 0 0 0.3em 0; }
	audio { 
        @apply w-full max-w-3xl p-2 m-0 rounded-full; 
    }
	.playing { color: #ff3e00; }
</style>



<!--
<script>
	import AudioPlayer, { stopAll } from './AudioPlayer.svelte';
	const audioData = [
    { titel: "LA LA LAND", interpret: "Haiyti", album: "Sui Sui", jahr: 2020, id: 3, img_url: "https://nwp-cgn.de/img/poser/haiyti-wall1.jpg", file_url: "https://nwp-cgn.de/archiv/audio/haiyti_la_la_land.mp3" },
    { titel: "Echte Waffen", interpret: "Haiyti", album: "Nightliner", jahr: 2016, id: 2, img_url: "https://nwp-cgn.de/img/poser/haiyti-wall1.jpg", file_url: "https://nwp-cgn.de/archiv/audio/haiyti_echte_waffen.mp3" },
    { titel: "Nightliner", interpret: "Haiyti", album: "Follow mich nicht", jahr: 2017, id: 4, img_url: "https://nwp-cgn.de/img/poser/haiyti-wall1.jpg", file_url: "https://nwp-cgn.de/archiv/audio/haiyti_nightliner.mp3" },
    { titel: "Speedleiche", interpret: "Haiyti", album: "Havarie", jahr: 2015, id: 5, img_url: "https://nwp-cgn.de/img/poser/haiyti-wall1.jpg", file_url: "https://nwp-cgn.de/archiv/audio/haiyti_speedleiche.mp3" },
    { titel: "Dope Game", interpret: "Haiyti", album: "Follow mich nicht", jahr: 2017, id: 1, img_url: "https://nwp-cgn.de/img/poser/haiyti-wall1.jpg", file_url: "https://nwp-cgn.de/archiv/audio/haiyti_dope_game.mp3" },
];
</script>

<button on:click={stopAll}>
	stop all audio
</button>


{#each audioData as {id, titel, interpret, album, jahr, img_url, lyrics, file_url}, i}
<AudioPlayer
   src={file_url}
   titel={titel}
   jahr={jahr}						
   interpret={interpret}
   album={album}
   poster={img_url}
/>   
{/each}


-->