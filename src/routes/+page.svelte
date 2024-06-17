<script>
	import './main.css';
	import Preloader from './components/Preloader.svelte';
	import Logo from './components/Logo.svelte';
	import { showPreloader } from './utils/store';
</script>

{#if $showPreloader}
	<Preloader />
{/if}

<nav class="flex justify-between items-center w-full h-[10vh] my-5">
	<Logo />
</nav>

<!-- <div class="flex justify-center items-center w-full h-screen"></div> -->
