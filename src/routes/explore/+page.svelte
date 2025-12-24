<script>
  const trendingSpecies = [
    { name: 'Largemouth Bass', count: 1234, emoji: '🐟' },
    { name: 'Rainbow Trout', count: 892, emoji: '🌈' },
    { name: 'Northern Pike', count: 654, emoji: '🦈' },
    { name: 'Walleye', count: 543, emoji: '👁️' },
    { name: 'Catfish', count: 421, emoji: '🐱' }
  ];

  const featuredCatches = [
    { id: '1', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', species: 'Bass' },
    { id: '2', image: 'https://images.unsplash.com/photo-1545450660-3378a7f3a364?w=400', species: 'Trout' },
    { id: '3', image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=400', species: 'Pike' },
    { id: '1', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', species: 'Bass' },
    { id: '2', image: 'https://images.unsplash.com/photo-1545450660-3378a7f3a364?w=400', species: 'Trout' },
    { id: '3', image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=400', species: 'Pike' }
  ];

  let searchQuery = $state('');
</script>

<svelte:head>
  <title>Explore | FishFlex</title>
</svelte:head>

<div class="p-4 space-y-6">
  <header>
    <h1 class="text-2xl font-display font-bold">Explore</h1>
    <p class="text-slate-500">Discover amazing catches</p>
  </header>

  <!-- Search -->
  <div class="relative">
    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
    <input
      type="text"
      bind:value={searchQuery}
      class="input pl-12"
      placeholder="Search species, locations, anglers..."
    />
  </div>

  <!-- Trending Species -->
  <section>
    <h2 class="font-bold mb-3">Trending Species</h2>
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {#each trendingSpecies as species}
        <button class="flex-shrink-0 card px-4 py-3 flex items-center gap-2 hover:border-ocean-500 transition-colors">
          <span class="text-xl">{species.emoji}</span>
          <div class="text-left">
            <p class="font-medium text-sm">{species.name}</p>
            <p class="text-xs text-slate-500">{species.count.toLocaleString()} catches</p>
          </div>
        </button>
      {/each}
    </div>
  </section>

  <!-- Featured Catches Grid -->
  <section>
    <h2 class="font-bold mb-3">Featured Catches</h2>
    <div class="grid grid-cols-3 gap-1">
      {#each featuredCatches as catch_, i}
        <a href="/catch/{catch_.id}" class="aspect-square relative overflow-hidden rounded-lg">
          <img
            src={catch_.image}
            alt={catch_.species}
            class="w-full h-full object-cover hover:scale-105 transition-transform"
            loading="lazy"
          />
        </a>
      {/each}
    </div>
  </section>

  <!-- Top Locations -->
  <section>
    <h2 class="font-bold mb-3">Top Locations</h2>
    <div class="space-y-2">
      {#each ['Lake Michigan', 'Florida Keys', 'Lake Tahoe', 'Colorado River'] as location, i}
        <button class="w-full card px-4 py-3 flex items-center justify-between hover:border-ocean-500 transition-colors">
          <div class="flex items-center gap-3">
            <span class="text-lg">📍</span>
            <span class="font-medium">{location}</span>
          </div>
          <span class="text-sm text-slate-500">{Math.floor(Math.random() * 500 + 100)} catches</span>
        </button>
      {/each}
    </div>
  </section>
</div>
