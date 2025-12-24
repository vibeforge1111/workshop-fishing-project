<script>
  import Icon from './Icons.svelte';

  // Fishing conditions
  const conditions = {
    temp: 68,
    wind: '8 mph NW',
    pressure: 'Rising',
    moonPhase: 'Waxing',
    rating: 'Excellent',
    bestTime: '6AM - 9AM'
  };

  // Trending species this week
  const trendingSpecies = [
    { name: 'Largemouth Bass', catches: 1247, change: +12 },
    { name: 'Rainbow Trout', catches: 892, change: +8 },
    { name: 'Northern Pike', catches: 654, change: -3 },
    { name: 'Walleye', catches: 543, change: +15 },
  ];

  // Live activity
  const recentActivity = [
    { user: 'mike_bass', action: 'caught', item: '8.5 lb Bass', time: '2m ago', avatar: 'https://i.pravatar.cc/40?img=1' },
    { user: 'sarah_fly', action: 'achieved', item: 'First Trout', time: '5m ago', avatar: 'https://i.pravatar.cc/40?img=2' },
    { user: 'jake_pike', action: 'ranked', item: '#3 Weekly', time: '12m ago', avatar: 'https://i.pravatar.cc/40?img=3' },
    { user: 'emma_reel', action: 'caught', item: '12 lb Pike', time: '18m ago', avatar: 'https://i.pravatar.cc/40?img=4' },
  ];

  // Top anglers
  const topAnglers = [
    { rank: 1, name: 'Pro Fisher', username: 'pro_fisher', catches: 47, avatar: 'https://i.pravatar.cc/40?img=11' },
    { rank: 2, name: 'Lake Master', username: 'lake_master', catches: 42, avatar: 'https://i.pravatar.cc/40?img=12' },
    { rank: 3, name: 'Reel Queen', username: 'reel_queen', catches: 38, avatar: 'https://i.pravatar.cc/40?img=13' },
  ];

  let followedUsers = $state(new Set());

  function toggleFollow(username) {
    if (followedUsers.has(username)) {
      followedUsers.delete(username);
    } else {
      followedUsers.add(username);
    }
    followedUsers = new Set(followedUsers);
  }
</script>

<aside class="w-80 flex-shrink-0 space-y-4 sticky top-4 h-fit">
  <!-- Fishing Conditions Widget -->
  <div class="sidebar-card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold text-sm text-slate-800">Fishing Conditions</h3>
      <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
        {conditions.rating}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="condition-item">
        <div class="condition-icon bg-orange-50 text-orange-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <div>
          <p class="text-xs text-slate-500">Temperature</p>
          <p class="font-semibold text-sm">{conditions.temp}°F</p>
        </div>
      </div>

      <div class="condition-item">
        <div class="condition-icon bg-sky-50 text-sky-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </div>
        <div>
          <p class="text-xs text-slate-500">Wind</p>
          <p class="font-semibold text-sm">{conditions.wind}</p>
        </div>
      </div>

      <div class="condition-item">
        <div class="condition-icon bg-violet-50 text-violet-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        </div>
        <div>
          <p class="text-xs text-slate-500">Pressure</p>
          <p class="font-semibold text-sm">{conditions.pressure}</p>
        </div>
      </div>

      <div class="condition-item">
        <div class="condition-icon bg-indigo-50 text-indigo-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </div>
        <div>
          <p class="text-xs text-slate-500">Moon</p>
          <p class="font-semibold text-sm">{conditions.moonPhase}</p>
        </div>
      </div>
    </div>

    <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
      <span class="text-xs text-slate-500">Best fishing time today</span>
      <span class="text-xs font-semibold text-ocean-600">{conditions.bestTime}</span>
    </div>
  </div>

  <!-- Trending Species -->
  <div class="sidebar-card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold text-sm text-slate-800">Trending This Week</h3>
      <button class="text-xs text-ocean-600 font-medium hover:underline">View All</button>
    </div>

    <div class="space-y-2.5">
      {#each trendingSpecies as species, i}
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
          <span class="w-5 h-5 rounded-full bg-ocean-100 text-ocean-600 text-xs font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate">{species.name}</p>
            <p class="text-xs text-slate-500">{species.catches.toLocaleString()} catches</p>
          </div>
          <span class="text-xs font-medium {species.change >= 0 ? 'text-emerald-600' : 'text-red-500'}">
            {species.change >= 0 ? '+' : ''}{species.change}%
          </span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Live Activity -->
  <div class="sidebar-card">
    <div class="flex items-center gap-2 mb-3">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <h3 class="font-semibold text-sm text-slate-800">Live Activity</h3>
    </div>

    <div class="space-y-3">
      {#each recentActivity as activity}
        <div class="flex items-start gap-2.5">
          <img src={activity.avatar} alt={activity.user} class="w-8 h-8 rounded-full object-cover ring-2 ring-white" />
          <div class="flex-1 min-w-0">
            <p class="text-sm">
              <span class="font-semibold">@{activity.user}</span>
              <span class="text-slate-500"> {activity.action} </span>
              <span class="font-medium text-ocean-600">{activity.item}</span>
            </p>
            <p class="text-xs text-slate-400">{activity.time}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Top Anglers This Week -->
  <div class="sidebar-card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold text-sm text-slate-800">Top Anglers</h3>
      <a href="/leaderboard" class="text-xs text-ocean-600 font-medium hover:underline">Leaderboard</a>
    </div>

    <div class="space-y-2">
      {#each topAnglers as angler}
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
          <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
            {angler.rank === 1 ? 'bg-golden-100 text-golden-700' :
             angler.rank === 2 ? 'bg-slate-200 text-slate-600' :
             'bg-amber-100 text-amber-700'}">
            {angler.rank}
          </div>
          <img src={angler.avatar} alt={angler.name} class="w-8 h-8 rounded-full object-cover" />
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate">{angler.name}</p>
            <p class="text-xs text-slate-500">{angler.catches} catches this week</p>
          </div>
          <button
            onclick={() => toggleFollow(angler.username)}
            class="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all
              {followedUsers.has(angler.username)
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-ocean-600 text-white hover:bg-ocean-700'}"
          >
            {followedUsers.has(angler.username) ? 'Following' : 'Follow'}
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Quick Stats -->
  <div class="sidebar-card bg-gradient-to-br from-ocean-600 to-ocean-700 text-white">
    <h3 class="font-semibold text-sm opacity-90 mb-3">Your Weekly Stats</h3>
    <div class="grid grid-cols-3 gap-2 text-center">
      <div>
        <p class="text-2xl font-bold">0</p>
        <p class="text-xs opacity-75">Catches</p>
      </div>
      <div>
        <p class="text-2xl font-bold">0</p>
        <p class="text-xs opacity-75">Likes</p>
      </div>
      <div>
        <p class="text-2xl font-bold">#--</p>
        <p class="text-xs opacity-75">Rank</p>
      </div>
    </div>
    <a href="/catch/new" class="mt-3 block w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-center text-sm font-semibold transition-colors">
      Log Your First Catch
    </a>
  </div>

  <!-- Footer links -->
  <div class="px-2 text-xs text-slate-400 space-x-2">
    <a href="/about" class="hover:text-slate-600">About</a>
    <span>·</span>
    <a href="/help" class="hover:text-slate-600">Help</a>
    <span>·</span>
    <a href="/terms" class="hover:text-slate-600">Terms</a>
    <span>·</span>
    <a href="/privacy" class="hover:text-slate-600">Privacy</a>
    <p class="mt-2">© 2024 FishFlex</p>
  </div>
</aside>

<style>
  .sidebar-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 16px;
    padding: 16px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.04),
      0 2px 4px -2px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease;
  }

  .sidebar-card:hover {
    border-color: rgba(203, 213, 225, 0.9);
    box-shadow:
      0 8px 15px -3px rgba(0, 0, 0, 0.06),
      0 4px 6px -4px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
  }

  .condition-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .condition-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    .sidebar-card {
      background: rgba(30, 41, 59, 0.95);
      border-color: rgba(51, 65, 85, 0.6);
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }
    .sidebar-card h3 {
      color: #e2e8f0;
    }
  }
</style>
