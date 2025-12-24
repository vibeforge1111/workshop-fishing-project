<script>
	import '../app.css';
	import BottomNav from '$lib/components/BottomNav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<title>FishFlex</title>
</svelte:head>

<div class="min-h-screen flex flex-col pb-20 md:pb-0">
	<main class="flex-1 max-w-2xl mx-auto w-full">
		{@render children()}
	</main>

	<!-- Mobile bottom nav -->
	<div class="md:hidden">
		<BottomNav />
	</div>
</div>
