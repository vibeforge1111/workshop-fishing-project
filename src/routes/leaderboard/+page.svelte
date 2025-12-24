<script>
  const weeklyLeaders = [
    {
      rank: 1,
      username: 'bass_master',
      display_name: 'Mike Johnson',
      species: 'Largemouth Bass',
      weight_lb: 12.4,
      location: 'Lake Michigan',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200'
    },
    {
      rank: 2,
      username: 'pike_hunter',
      display_name: 'Jake Wilson',
      species: 'Northern Pike',
      weight_lb: 11.8,
      location: 'Lake of the Woods',
      image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=200'
    },
    {
      rank: 3,
      username: 'trout_whisperer',
      display_name: 'Sarah Chen',
      species: 'Rainbow Trout',
      weight_lb: 8.2,
      location: 'Clear Creek, CO',
      image: 'https://images.unsplash.com/photo-1545450660-3378a7f3a364?w=200'
    },
    {
      rank: 4,
      username: 'reel_deal',
      display_name: 'Tom Anderson',
      species: 'Walleye',
      weight_lb: 7.6,
      location: 'Lake Erie',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200'
    },
    {
      rank: 5,
      username: 'fish_whiz',
      display_name: 'Emily Davis',
      species: 'Musky',
      weight_lb: 6.9,
      location: 'St. Lawrence',
      image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=200'
    }
  ];

  const categories = ['All Species', 'Bass', 'Trout', 'Pike', 'Walleye'];
  let selectedCategory = $state('All Species');

  function getRankStyle(rank) {
    if (rank === 1) return 'bg-gradient-to-r from-golden-400 to-golden-500 text-slate-900';
    if (rank === 2) return 'bg-slate-300 text-slate-800';
    if (rank === 3) return 'bg-amber-600 text-white';
    return 'bg-slate-100 text-slate-600';
  }

  function getRankEmoji(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  }
</script>

<svelte:head>
  <title>Leaderboard | FishFlex</title>
</svelte:head>

<div class="p-4 space-y-6">
  <header class="text-center">
    <h1 class="text-2xl font-display font-bold">🏆 Leaderboard</h1>
    <p class="text-slate-500">This week's top catches</p>
  </header>

  <!-- Category filter -->
  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {#each categories as category}
      <button
        onclick={() => selectedCategory = category}
        class="flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all
          {selectedCategory === category
            ? 'bg-ocean-600 text-white'
            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}"
      >
        {category}
      </button>
    {/each}
  </div>

  <!-- Top 3 Podium -->
  <div class="flex items-end justify-center gap-2 py-4">
    <!-- 2nd Place -->
    <div class="flex flex-col items-center">
      <img
        src={weeklyLeaders[1].image}
        alt={weeklyLeaders[1].display_name}
        class="w-16 h-16 rounded-full object-cover border-4 border-slate-300"
      />
      <div class="mt-2 w-20 h-20 bg-slate-300 rounded-t-lg flex items-center justify-center">
        <span class="text-2xl">🥈</span>
      </div>
      <p class="text-xs font-medium mt-1 text-center">{weeklyLeaders[1].display_name}</p>
      <p class="text-xs text-golden-600 font-bold">{weeklyLeaders[1].weight_lb} lb</p>
    </div>

    <!-- 1st Place -->
    <div class="flex flex-col items-center">
      <img
        src={weeklyLeaders[0].image}
        alt={weeklyLeaders[0].display_name}
        class="w-20 h-20 rounded-full object-cover border-4 border-golden-400 shadow-lg shadow-golden-500/30"
      />
      <div class="mt-2 w-24 h-28 bg-gradient-to-t from-golden-500 to-golden-400 rounded-t-lg flex items-center justify-center">
        <span class="text-3xl">🥇</span>
      </div>
      <p class="text-sm font-bold mt-1 text-center">{weeklyLeaders[0].display_name}</p>
      <p class="text-sm text-golden-600 font-bold">{weeklyLeaders[0].weight_lb} lb</p>
    </div>

    <!-- 3rd Place -->
    <div class="flex flex-col items-center">
      <img
        src={weeklyLeaders[2].image}
        alt={weeklyLeaders[2].display_name}
        class="w-16 h-16 rounded-full object-cover border-4 border-amber-600"
      />
      <div class="mt-2 w-20 h-16 bg-amber-600 rounded-t-lg flex items-center justify-center">
        <span class="text-2xl">🥉</span>
      </div>
      <p class="text-xs font-medium mt-1 text-center">{weeklyLeaders[2].display_name}</p>
      <p class="text-xs text-golden-600 font-bold">{weeklyLeaders[2].weight_lb} lb</p>
    </div>
  </div>

  <!-- Full rankings list -->
  <div class="space-y-2">
    {#each weeklyLeaders as leader}
      <div class="card p-3 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full {getRankStyle(leader.rank)} flex items-center justify-center font-bold text-sm">
          {getRankEmoji(leader.rank)}
        </div>
        <img
          src={leader.image}
          alt={leader.display_name}
          class="w-12 h-12 rounded-lg object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="font-semibold truncate">{leader.display_name}</p>
          <p class="text-xs text-slate-500 truncate">
            {leader.species} • 📍 {leader.location}
          </p>
        </div>
        <div class="text-right">
          <p class="font-bold text-golden-600">{leader.weight_lb} lb</p>
          <p class="text-xs text-slate-500">This week</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Your rank -->
  <div class="card p-4 bg-ocean-50 border-ocean-200">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
          🎣
        </div>
        <div>
          <p class="font-semibold">Your Rank</p>
          <p class="text-sm text-slate-600">Keep fishing to climb!</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold text-ocean-600">#42</p>
        <p class="text-xs text-slate-500">of 1,234</p>
      </div>
    </div>
  </div>
</div>

<style>
  @media (prefers-color-scheme: dark) {
    .card.bg-ocean-50 {
      background-color: rgba(30, 64, 175, 0.1);
      border-color: rgba(30, 64, 175, 0.3);
    }
  }
</style>
