<script>
  import { onMount } from 'svelte';

  // Mock user data
  const user = {
    username: 'you',
    display_name: 'Guest Angler',
    bio: 'Just getting started on FishFlex! 🎣',
    location: 'Your City',
    xp: 250,
    level: 3,
    catches_count: 0,
    followers_count: 0,
    following_count: 0
  };

  const achievements = [
    { id: 1, name: 'First Catch', emoji: '🎣', unlocked: false },
    { id: 2, name: 'Bass Master', emoji: '🐟', unlocked: false },
    { id: 3, name: 'Early Bird', emoji: '🌅', unlocked: false },
    { id: 4, name: 'Trophy Hunter', emoji: '🏆', unlocked: false }
  ];

  let userCatches = $state([]);

  onMount(() => {
    // Load user's catches from localStorage
    const catches = JSON.parse(localStorage.getItem('fishflex_catches') || '[]');
    userCatches = catches;
  });

  const xpToNextLevel = 500;
  const xpProgress = (user.xp / xpToNextLevel) * 100;
</script>

<svelte:head>
  <title>Profile | FishFlex</title>
</svelte:head>

<div class="p-4 space-y-6">
  <!-- Profile Header -->
  <div class="text-center space-y-4">
    <div class="relative inline-block">
      <div class="w-24 h-24 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center text-4xl">
        🎣
      </div>
      <div class="absolute -bottom-1 -right-1 bg-golden-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
        Lvl {user.level}
      </div>
    </div>

    <div>
      <h1 class="text-xl font-bold">{user.display_name}</h1>
      <p class="text-slate-500">@{user.username}</p>
    </div>

    {#if user.bio}
      <p class="text-sm">{user.bio}</p>
    {/if}

    <!-- XP Bar -->
    <div class="max-w-xs mx-auto space-y-1">
      <div class="flex justify-between text-xs text-slate-500">
        <span>Level {user.level}</span>
        <span>{user.xp} / {xpToNextLevel} XP</span>
      </div>
      <div class="xp-bar">
        <div class="xp-fill" style="width: {xpProgress}%"></div>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex justify-center gap-8">
      <div class="text-center">
        <p class="text-2xl font-bold">{userCatches.length}</p>
        <p class="text-xs text-slate-500">Catches</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold">{user.followers_count}</p>
        <p class="text-xs text-slate-500">Followers</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold">{user.following_count}</p>
        <p class="text-xs text-slate-500">Following</p>
      </div>
    </div>

    <button class="btn-secondary">Edit Profile</button>
  </div>

  <!-- Achievements -->
  <section>
    <h2 class="font-bold mb-3">Achievements</h2>
    <div class="grid grid-cols-4 gap-2">
      {#each achievements as achievement}
        <div class="card p-3 text-center {achievement.unlocked ? '' : 'opacity-40'}">
          <span class="text-2xl">{achievement.emoji}</span>
          <p class="text-xs mt-1 font-medium truncate">{achievement.name}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- My Catches -->
  <section>
    <div class="flex items-center justify-between mb-3">
      <h2 class="font-bold">My Catches</h2>
      <a href="/catch/new" class="text-ocean-600 text-sm font-medium">+ Add</a>
    </div>

    {#if userCatches.length === 0}
      <div class="card p-8 text-center">
        <span class="text-4xl mb-2 block">🐟</span>
        <p class="text-slate-600 mb-4">No catches yet</p>
        <a href="/catch/new" class="btn-golden inline-block">Log Your First Catch</a>
      </div>
    {:else}
      <div class="grid grid-cols-3 gap-1">
        {#each userCatches as catch_}
          <a href="/catch/{catch_.id}" class="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={catch_.image_url}
              alt={catch_.species}
              class="w-full h-full object-cover hover:scale-105 transition-transform"
            />
            {#if catch_.species}
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p class="text-white text-xs font-medium truncate">{catch_.species}</p>
              </div>
            {/if}
          </a>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Settings shortcuts -->
  <section class="space-y-2">
    <button class="w-full card px-4 py-3 flex items-center gap-3 text-left hover:border-ocean-500 transition-colors">
      <span>⚙️</span>
      <span>Settings</span>
    </button>
    <button class="w-full card px-4 py-3 flex items-center gap-3 text-left hover:border-ocean-500 transition-colors">
      <span>❓</span>
      <span>Help & Support</span>
    </button>
    <button class="w-full card px-4 py-3 flex items-center gap-3 text-left hover:border-ocean-500 transition-colors">
      <span>📤</span>
      <span>Invite Friends</span>
    </button>
  </section>
</div>
