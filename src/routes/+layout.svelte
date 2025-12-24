<script>
	import '../app.css';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<title>FishFlex</title>
</svelte:head>

<div class="min-h-screen pb-20 lg:pb-6">
	<div class="flex justify-center gap-6 px-4 lg:px-6">
		<!-- Main content -->
		<main class="flex-1 max-w-2xl w-full">
			{@render children()}
		</main>

		<!-- Desktop sidebar -->
		<div class="hidden lg:block pt-4">
			<Sidebar />
		</div>
	</div>

	<!-- Mobile bottom nav -->
	<div class="lg:hidden">
		<BottomNav />
	</div>
</div>
