<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<title>FishFlex</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	{@render children()}
</div>
