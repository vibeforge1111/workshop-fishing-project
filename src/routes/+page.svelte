<script>
  import Icon from '$lib/components/Icons.svelte';

  // Mock stories data
  const stories = [
    { id: 'you', username: 'You', avatar: null, hasStory: false, isYou: true },
    { id: '1', username: 'bass_king', avatar: 'https://i.pravatar.cc/100?img=1', hasStory: true },
    { id: '2', username: 'trout_pro', avatar: 'https://i.pravatar.cc/100?img=2', hasStory: true },
    { id: '3', username: 'pike_master', avatar: 'https://i.pravatar.cc/100?img=3', hasStory: true },
    { id: '4', username: 'reel_queen', avatar: 'https://i.pravatar.cc/100?img=4', hasStory: true },
    { id: '5', username: 'fish_wizard', avatar: 'https://i.pravatar.cc/100?img=5', hasStory: true },
  ];

  // Mock suggested anglers
  const suggestedAnglers = [
    { id: '1', username: 'lake_legend', display_name: 'Jake Rivers', avatar: 'https://i.pravatar.cc/100?img=11', catches: 156, followers: '2.3K' },
    { id: '2', username: 'coastal_queen', display_name: 'Maria Santos', avatar: 'https://i.pravatar.cc/100?img=12', catches: 89, followers: '1.8K' },
    { id: '3', username: 'fly_fisher', display_name: 'Tom Brooks', avatar: 'https://i.pravatar.cc/100?img=13', catches: 234, followers: '5.1K' },
  ];

  // Mock catches data
  const mockCatches = [
    {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      species: 'Largemouth Bass',
      weight_lb: 8.5,
      length_in: 22,
      location_name: 'Lake Michigan',
      caption: 'Personal best! What a fight this one put up',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      user: { username: 'bass_master', display_name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/100?img=8' },
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
      caption: 'Early morning catch on a fly rod',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      user: { username: 'trout_whisperer', display_name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/100?img=9' },
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
      caption: 'Monster pike on a spinnerbait!',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      user: { username: 'pike_hunter', display_name: 'Jake Wilson', avatar: 'https://i.pravatar.cc/100?img=10' },
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
  let followedAnglers = $state(new Set());

  function toggleLike(id) {
    if (likedCatches.has(id)) {
      likedCatches.delete(id);
    } else {
      likedCatches.add(id);
    }
    likedCatches = new Set(likedCatches);
  }

  function toggleFollow(id) {
    if (followedAnglers.has(id)) {
      followedAnglers.delete(id);
    } else {
      followedAnglers.add(id);
    }
    followedAnglers = new Set(followedAnglers);
  }
</script>

<div class="space-y-4">
  <!-- Header -->
  <header class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/20">
    <div class="flex items-center justify-between p-4">
      <h1 class="text-2xl font-display font-bold bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
        FishFlex
      </h1>
      <div class="flex items-center gap-1">
        <a href="/leaderboard" class="p-2.5 hover:bg-white/50 rounded-xl transition-colors">
          <Icon name="trophy" size={22} class="text-slate-600" />
        </a>
        <button class="p-2.5 hover:bg-white/50 rounded-xl transition-colors relative">
          <Icon name="bell" size={22} class="text-slate-600" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-golden-500 rounded-full"></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Stories Row -->
  <div class="px-4">
    <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {#each stories as story}
        <button class="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div class="relative">
            <div class="w-16 h-16 rounded-full {story.hasStory ? 'p-[2px] bg-gradient-to-br from-golden-400 to-ocean-500' : 'p-[2px] bg-slate-200'}">
              <div class="w-full h-full rounded-full bg-white p-[2px]">
                {#if story.isYou}
                  <div class="w-full h-full rounded-full bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center">
                    <Icon name="plus" size={20} class="text-ocean-600" />
                  </div>
                {:else}
                  <img src={story.avatar} alt={story.username} class="w-full h-full rounded-full object-cover" />
                {/if}
              </div>
            </div>
          </div>
          <span class="text-[11px] font-medium text-slate-600 truncate w-16 text-center">
            {story.isYou ? 'Add Story' : story.username}
          </span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Suggested Anglers -->
  <div class="px-4">
    <div class="glass-card p-4 rounded-2xl">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-semibold text-slate-800">Suggested Anglers</h2>
        <button class="text-sm text-ocean-600 font-medium">See All</button>
      </div>
      <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {#each suggestedAnglers as angler}
          <div class="flex-shrink-0 w-36 bg-white/60 rounded-xl p-3 text-center border border-white/50">
            <img src={angler.avatar} alt={angler.display_name} class="w-14 h-14 rounded-full mx-auto mb-2 ring-2 ring-ocean-200" />
            <p class="font-semibold text-sm truncate">{angler.display_name}</p>
            <p class="text-xs text-slate-500 truncate">@{angler.username}</p>
            <p class="text-xs text-slate-400 mt-1">{angler.catches} catches • {angler.followers}</p>
            <button
              onclick={() => toggleFollow(angler.id)}
              class="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold transition-all {followedAnglers.has(angler.id) ? 'bg-slate-200 text-slate-600' : 'bg-ocean-600 text-white hover:bg-ocean-700'}"
            >
              {followedAnglers.has(angler.id) ? 'Following' : 'Follow'}
            </button>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Feed -->
  <div class="px-4 space-y-4 pb-4">
    {#each mockCatches as catchItem (catchItem.id)}
      <article class="glass-card rounded-2xl overflow-hidden">
        <!-- Header -->
        <div class="flex items-center gap-3 p-3">
          <img src={catchItem.user.avatar} alt={catchItem.user.display_name} class="w-10 h-10 rounded-full object-cover ring-2 ring-white" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm">{catchItem.user.display_name}</p>
            <p class="text-xs text-slate-500 flex items-center gap-1">
              <Icon name="location" size={12} />
              {catchItem.location_name} • {timeAgo(catchItem.created_at)}
            </p>
          </div>
          <span class="px-2.5 py-1 bg-golden-100 text-golden-700 text-xs font-semibold rounded-full">
            {catchItem.species}
          </span>
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
        <div class="flex items-center justify-center gap-8 py-2.5 bg-gradient-to-r from-ocean-50/80 to-golden-50/80 text-sm">
          {#if catchItem.weight_lb}
            <span class="flex items-center gap-1.5">
              <Icon name="scale" size={16} class="text-golden-600" />
              <span class="font-semibold">{catchItem.weight_lb}</span>
              <span class="text-slate-500 text-xs">lb</span>
            </span>
          {/if}
          {#if catchItem.length_in}
            <span class="flex items-center gap-1.5">
              <Icon name="ruler" size={16} class="text-ocean-600" />
              <span class="font-semibold">{catchItem.length_in}</span>
              <span class="text-slate-500 text-xs">in</span>
            </span>
          {/if}
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-5 p-3">
          <button
            onclick={() => toggleLike(catchItem.id)}
            class="flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <Icon
              name={likedCatches.has(catchItem.id) ? 'heart-filled' : 'heart'}
              size={22}
              class={likedCatches.has(catchItem.id) ? 'text-red-500' : 'text-slate-600'}
            />
            <span class="text-sm font-medium">
              {catchItem.likes_count + (likedCatches.has(catchItem.id) ? 1 : 0)}
            </span>
          </button>
          <a href="/catch/{catchItem.id}" class="flex items-center gap-1.5 hover:scale-105 transition-transform">
            <Icon name="comment" size={22} class="text-slate-600" />
            <span class="text-sm font-medium">{catchItem.comments_count}</span>
          </a>
          <a href="/catch/{catchItem.id}" class="ml-auto flex items-center gap-1.5 text-ocean-600 text-sm font-medium hover:underline">
            <Icon name="share" size={18} />
            Create Card
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
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  }

  @media (prefers-color-scheme: dark) {
    .glass-card {
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(51, 65, 85, 0.5);
    }
    header {
      background-color: rgba(15, 23, 42, 0.7);
      border-color: rgba(51, 65, 85, 0.5);
    }
  }
</style>
