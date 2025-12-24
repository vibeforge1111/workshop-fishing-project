<script>
  import Icon from '$lib/components/Icons.svelte';
  import StoryModal from '$lib/components/StoryModal.svelte';

  // Mock stories data with rich content
  const stories = [
    { id: 'you', username: 'You', avatar: null, hasStory: false, isYou: true },
    {
      id: '1',
      username: 'bass_king',
      avatar: 'https://i.pravatar.cc/100?img=1',
      hasStory: true,
      time: '2h ago',
      catch: {
        species: 'Largemouth Bass',
        weight: 6.2,
        length: 19,
        location: 'Lake Travis',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600'
      },
      caption: 'Morning glory!'
    },
    {
      id: '2',
      username: 'trout_pro',
      avatar: 'https://i.pravatar.cc/100?img=2',
      hasStory: true,
      time: '4h ago',
      catch: {
        species: 'Rainbow Trout',
        weight: 3.8,
        length: 16,
        location: 'Clear Creek',
        image: 'https://images.unsplash.com/photo-1545450660-3378a7f3a364?w=600'
      },
      caption: 'Fly fishing at its best'
    },
    {
      id: '3',
      username: 'pike_master',
      avatar: 'https://i.pravatar.cc/100?img=3',
      hasStory: true,
      time: '6h ago',
      catch: {
        species: 'Northern Pike',
        weight: 11.5,
        length: 34,
        location: 'Lake Winnipeg',
        image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600'
      },
      caption: 'Monster catch today!'
    },
    {
      id: '4',
      username: 'reel_queen',
      avatar: 'https://i.pravatar.cc/100?img=4',
      hasStory: true,
      time: '8h ago',
      image: 'https://images.unsplash.com/photo-1516962126636-27ad087061cc?w=600',
      caption: 'Perfect sunset on the water'
    },
    {
      id: '5',
      username: 'fish_wizard',
      avatar: 'https://i.pravatar.cc/100?img=5',
      hasStory: true,
      time: '12h ago',
      catch: {
        species: 'Walleye',
        weight: 5.4,
        length: 22,
        location: 'Lake Erie',
        image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600'
      },
      caption: 'New personal best!'
    },
    {
      id: '6',
      username: 'catch_pro',
      avatar: 'https://i.pravatar.cc/100?img=6',
      hasStory: true,
      time: '1d ago',
      image: 'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=600',
      caption: 'Early morning vibes'
    },
  ];

  // Story modal state
  let storyModalOpen = $state(false);
  let currentStoryIndex = $state(0);

  // Get viewable stories (exclude "You" unless they have a story)
  let viewableStories = $derived(stories.filter(s => !s.isYou && s.hasStory));

  function openStory(storyId) {
    const index = viewableStories.findIndex(s => s.id === storyId);
    if (index !== -1) {
      currentStoryIndex = index;
      storyModalOpen = true;
    }
  }

  function closeStoryModal() {
    storyModalOpen = false;
  }

  function openCreateStory() {
    // Navigate to create story page
    window.location.href = '/catch/new';
  }

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

  function toggleLike(id) {
    if (likedCatches.has(id)) {
      likedCatches.delete(id);
    } else {
      likedCatches.add(id);
    }
    likedCatches = new Set(likedCatches);
  }
</script>

<div class="space-y-4">
  <!-- Unified Header + Stories -->
  <div class="sticky top-0 z-40 lg:relative lg:top-auto">
    <header class="header-unified mx-4 lg:mx-0 mt-4 rounded-2xl overflow-hidden">
      <!-- Top bar with gradient accent -->
      <div class="h-1 bg-gradient-to-r from-ocean-400 via-ocean-500 to-golden-400"></div>

      <!-- Header content -->
      <div class="px-4 pt-4 pb-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/30">
              <Icon name="fish" size={20} class="text-white" />
            </div>
            <div>
              <h1 class="text-xl font-display font-bold text-slate-800 text-premium tracking-tight">
                FishFlex
              </h1>
              <p class="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Catch & Share</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a href="/explore" class="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-all">
              <Icon name="search" size={20} class="text-slate-500" />
            </a>
            <a href="/leaderboard" class="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-all">
              <Icon name="trophy" size={20} class="text-slate-500" />
            </a>
            <button class="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-all relative">
              <Icon name="bell" size={20} class="text-slate-500" />
              <span class="absolute top-2 right-2 w-2 h-2 bg-golden-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="mx-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <!-- Stories section integrated -->
      <div class="px-4 py-4">
        <div class="flex gap-3 overflow-x-auto scrollbar-hide">
          {#each stories as story}
            <button
              class="flex flex-col items-center gap-1.5 flex-shrink-0 group"
              onclick={() => story.isYou ? openCreateStory() : openStory(story.id)}
            >
              <div class="relative">
                <div class="w-[60px] h-[60px] rounded-2xl {story.hasStory ? 'p-[2px] bg-gradient-to-br from-golden-400 via-ocean-400 to-ocean-600' : 'p-[2px] bg-slate-200'} transition-transform group-hover:scale-105 group-active:scale-95">
                  <div class="w-full h-full rounded-[14px] bg-white p-[2px]">
                    {#if story.isYou}
                      <div class="w-full h-full rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                        <div class="w-7 h-7 rounded-lg bg-ocean-500 flex items-center justify-center shadow-sm">
                          <Icon name="plus" size={14} class="text-white" />
                        </div>
                      </div>
                    {:else}
                      <img src={story.avatar} alt={story.username} class="w-full h-full rounded-xl object-cover" />
                    {/if}
                  </div>
                </div>
                {#if story.hasStory && !story.isYou}
                  <span class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-md ring-2 ring-white flex items-center justify-center">
                    <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </span>
                {/if}
              </div>
              <span class="text-[10px] font-medium text-slate-500 truncate w-[60px] text-center group-hover:text-slate-700 transition-colors">
                {story.isYou ? 'Your Story' : story.username}
              </span>
            </button>
          {/each}
        </div>
      </div>
    </header>
  </div>

  <!-- Feed -->
  <div class="px-4 space-y-5 pb-4">
    {#each mockCatches as catchItem (catchItem.id)}
      <article class="feed-card rounded-2xl overflow-hidden">
        <!-- Header -->
        <div class="flex items-center gap-3 p-4 border-b border-slate-100">
          <div class="relative">
            <img src={catchItem.user.avatar} alt={catchItem.user.display_name} class="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200" />
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-md ring-2 ring-white"></span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-slate-800">{catchItem.user.display_name}</p>
            <p class="text-xs text-slate-500 flex items-center gap-1">
              <Icon name="location" size={12} class="text-ocean-500" />
              {catchItem.location_name} • {timeAgo(catchItem.created_at)}
            </p>
          </div>
          <span class="px-3 py-1.5 bg-golden-50 text-golden-700 text-xs font-semibold rounded-lg border border-golden-200">
            {catchItem.species}
          </span>
        </div>

        <!-- Image -->
        <a href="/catch/{catchItem.id}" class="block relative group">
          <img
            src={catchItem.image_url}
            alt={catchItem.species}
            class="w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </a>

        <!-- Stats bar -->
        <div class="flex items-center justify-center gap-8 py-3 bg-slate-50/80 border-y border-slate-100">
          {#if catchItem.weight_lb}
            <span class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-golden-200 shadow-sm">
                <Icon name="scale" size={16} class="text-golden-600" />
              </div>
              <div class="text-left">
                <p class="font-bold text-slate-800 text-sm">{catchItem.weight_lb}</p>
                <p class="text-[10px] text-slate-400 uppercase tracking-wider font-medium">pounds</p>
              </div>
            </span>
          {/if}
          {#if catchItem.length_in}
            <span class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-ocean-200 shadow-sm">
                <Icon name="ruler" size={16} class="text-ocean-600" />
              </div>
              <div class="text-left">
                <p class="font-bold text-slate-800 text-sm">{catchItem.length_in}</p>
                <p class="text-[10px] text-slate-400 uppercase tracking-wider font-medium">inches</p>
              </div>
            </span>
          {/if}
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 p-4">
          <button
            onclick={() => toggleLike(catchItem.id)}
            class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all group"
          >
            <Icon
              name={likedCatches.has(catchItem.id) ? 'heart-filled' : 'heart'}
              size={22}
              class="{likedCatches.has(catchItem.id) ? 'text-red-500' : 'text-slate-400 group-hover:text-red-400'} transition-colors"
            />
            <span class="text-sm font-semibold text-slate-600">
              {catchItem.likes_count + (likedCatches.has(catchItem.id) ? 1 : 0)}
            </span>
          </button>
          <a href="/catch/{catchItem.id}" class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all group">
            <Icon name="comment" size={22} class="text-slate-400 group-hover:text-ocean-500 transition-colors" />
            <span class="text-sm font-semibold text-slate-600">{catchItem.comments_count}</span>
          </a>
          <a href="/catch/{catchItem.id}" class="ml-auto flex items-center gap-2 px-4 py-2.5 bg-ocean-600 text-white text-sm font-semibold rounded-xl hover:bg-ocean-700 transition-all border border-ocean-700">
            <Icon name="share" size={16} />
            Create Card
          </a>
        </div>

        <!-- Caption -->
        <div class="px-4 pb-4 pt-1 border-t border-slate-100">
          <p class="text-sm leading-relaxed text-slate-700">
            <a href="/profile/{catchItem.user.username}" class="font-semibold text-slate-800 hover:text-ocean-600 transition-colors">@{catchItem.user.username}</a>
            {' '}{catchItem.caption}
          </p>
        </div>
      </article>
    {/each}
  </div>
</div>

<!-- Story Modal -->
<StoryModal
  stories={viewableStories}
  currentIndex={currentStoryIndex}
  isOpen={storyModalOpen}
  onClose={closeStoryModal}
/>

<style>
  .header-unified {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.05),
      0 2px 4px -2px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
  }

  .feed-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 232, 240, 0.6);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.04),
      0 2px 4px -2px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.6);
    transition: all 0.2s ease;
  }

  .feed-card:hover {
    border-color: rgba(203, 213, 225, 0.8);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.06),
      0 4px 6px -4px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
  }

  @media (prefers-color-scheme: dark) {
    .header-unified {
      background: rgba(30, 41, 59, 0.95);
      border-color: rgba(51, 65, 85, 0.6);
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    .header-unified h1 {
      color: #f1f5f9;
    }

    .feed-card {
      background: rgba(30, 41, 59, 0.9);
      border-color: rgba(51, 65, 85, 0.6);
    }
  }
</style>
