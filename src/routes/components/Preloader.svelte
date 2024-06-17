<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { showPreloader } from '../utils/store.js';

	onMount(() => {
		gsap.fromTo('.preloader-text', { scale: 5 }, { scale: 1, duration: 1, ease: 'power1.inOut' });
		gsap.fromTo(
			'.preloader-text',
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 1.5,
				delay: 0.4,
				ease: 'power1.inOut'
			}
		);
		gsap.fromTo(
			'.preloader',
			{ y: '0%', rotation: 0, scale: 1 },
			{
				y: '125%',
				rotation: 10,
				scale: 0.8,
				duration: 1,
				delay: 2,
				ease: 'expo.in',
				onComplete: () => {
					showPreloader.set(false);
				}
			}
		);
	});
</script>

<div class="preloader">
	<div class="preloader-text">
		<span>L</span><span>0</span><span>A</span><span>D</span><span>I</span><span>N</span><span
			>G</span
		>
	</div>
</div>

<style>
	@keyframes bigger {
		0% {
			font-variation-settings: 'wght' 700;
		}
		50% {
			font-variation-settings: 'wght' 900;
		}
		100% {
			font-variation-settings: 'wght' 700;
		}
	}

	.preloader-text span {
		animation: bigger 1.5s infinite ease;
	}
	.preloader-text span:nth-child(2) {
		animation-delay: 0.1s;
	}
	.preloader-text span:nth-child(3) {
		animation-delay: 0.2s;
	}
	.preloader-text span:nth-child(4) {
		animation-delay: 0.3s;
	}
	.preloader-text span:nth-child(5) {
		animation-delay: 0.4s;
	}
	.preloader-text span:nth-child(6) {
		animation-delay: 0.5s;
	}
	.preloader-text span:nth-child(7) {
		animation-delay: 0.6s;
	}

	.preloader {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100vw + 10px);
		height: calc(100vh + 10px);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--orange);
		color: var(--white);
		font-size: 20em;
		border-radius: 20px;
		z-index: 2;
		font-size: 50vw;
	}

	@media only screen and (max-width: 600px) {
		.preloader {
			overflow: hidden;
		}
	}
</style>
