<script>
  // Mock data for testing without auth
  const mockCatches = [
    {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      species: 'Largemouth Bass',
      weight_lb: 8.5,
      length_in: 22,
      location_name: 'Lake Michigan',
      caption: 'Personal best! What a fight this one put up 💪',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      user: { username: 'bass_master', display_name: 'Mike Johnson', avatar_url: null },
      likes_count: 42,
      comments_count: 8
    },
    {
      id: '2',
      image_url: 'https://images.unsplash.com/photo-1545450660-3378a7f3a364?w=800',
      species: 'Rainbow Trout',
      weight_lb: 4.2,
      length_in: 18,
      location_name: 'Clear Creek, Colorado',
      caption: 'Early morning catch on a fly rod 🎣',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      user: { username: 'trout_whisperer', display_name: 'Sarah Chen', avatar_url: null },
      likes_count: 28,
      comments_count: 5
    },
    {
      id: '3',
      image_url: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=800',
      species: 'Northern Pike',
      weight_lb: 12.3,
      length_in: 36,
      location_name: 'Lake of the Woods',
      caption: 'Monster pike on a spinnerbait! 🔥',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      user: { username: 'pike_hunter', display_name: 'Jake Wilson', avatar_url: null },
      likes_count: 89,
      comments_count: 15
    }
  ];

  function timeAgo(dateStr) {
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
    if (seconds < 60) return 'now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return new Date(dateStr).toLocaleDateString();
  }

  let likedCatches = $state(new Set());

  function toggleLike(id) {
    if (likedCatches.has(id)) {
      likedCatches.delete(id);
      likedCatches = new Set(likedCatches);
    } else {
      likedCatches.add(id);
      likedCatches = new Set(likedCatches);
    }
  }
</script>

<div class="space-y-4">
  <!-- Header -->
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
    <div class="flex items-center justify-between p-4">
      <h1 class="text-2xl font-display font-bold bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
        FishFlex
      </h1>
      <div class="flex items-center gap-2">
        <a href="/leaderboard" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <span class="text-xl">🏆</span>
        </a>
        <button class="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <span class="text-xl">🔔</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Feed -->
  <div class="px-4 space-y-4 pb-4">
    {#each mockCatches as catchItem (catchItem.id)}
      <article class="card overflow-hidden">
        <!-- Header -->
        <div class="flex items-center gap-3 p-3">
          <div class="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center text-lg">
            🎣
          </div>
          <div class="flex-1">
            <p class="font-semibold text-sm">{catchItem.user.display_name}</p>
            <p class="text-xs text-slate-500">
              📍 {catchItem.location_name} • {timeAgo(catchItem.created_at)}
            </p>
          </div>
          <span class="badge-golden text-xs">{catchItem.species}</span>
        </div>

        <!-- Image -->
        <a href="/catch/{catchItem.id}">
          <img
            src={catchItem.image_url}
            alt={catchItem.species}
            class="w-full aspect-square object-cover"
            loading="lazy"
          />
        </a>

        <!-- Stats bar -->
        <div class="flex items-center justify-center gap-6 py-2 bg-slate-50 text-sm">
          {#if catchItem.weight_lb}
            <span class="flex items-center gap-1">
              <span class="text-golden-500">⚖️</span>
              <span class="font-semibold">{catchItem.weight_lb}</span>
              <span class="text-slate-500">lb</span>
            </span>
          {/if}
          {#if catchItem.length_in}
            <span class="flex items-center gap-1">
              <span class="text-ocean-500">📏</span>
              <span class="font-semibold">{catchItem.length_in}</span>
              <span class="text-slate-500">in</span>
            </span>
          {/if}
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 p-3">
          <button
            onclick={() => toggleLike(catchItem.id)}
            class="flex items-center gap-1.5 hover:scale-110 transition-transform"
          >
            <span class="text-xl {likedCatches.has(catchItem.id) ? 'text-red-500' : ''}">
              {likedCatches.has(catchItem.id) ? '❤️' : '🤍'}
            </span>
            <span class="text-sm font-medium">
              {catchItem.likes_count + (likedCatches.has(catchItem.id) ? 1 : 0)}
            </span>
          </button>
          <a href="/catch/{catchItem.id}" class="flex items-center gap-1.5 hover:scale-110 transition-transform">
            <span class="text-xl">💬</span>
            <span class="text-sm font-medium">{catchItem.comments_count}</span>
          </a>
          <a href="/catch/{catchItem.id}" class="ml-auto text-ocean-600 text-sm font-medium hover:underline">
            Create Card →
          </a>
        </div>

        <!-- Caption -->
        <div class="px-3 pb-3">
          <p class="text-sm">
            <span class="font-semibold">@{catchItem.user.username}</span>
            {' '}{catchItem.caption}
          </p>
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  @media (prefers-color-scheme: dark) {
    header {
      background-color: rgba(15, 23, 42, 0.8);
      border-color: rgb(51, 65, 85);
    }
  }
</style>
