<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { generateCatchCard } from '$lib/utils/cardGenerator.js';

  // Mock data - in real app this would come from Supabase
  const mockCatches = {
    '1': {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      species: 'Largemouth Bass',
      weight_lb: 8.5,
      length_in: 22,
      location_name: 'Lake Michigan',
      caption: 'Personal best! What a fight this one put up 💪',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      user: { username: 'bass_master', display_name: 'Mike Johnson' },
      likes_count: 42,
      comments_count: 8
    },
    '2': {
      id: '2',
      image_url: 'https://images.unsplash.com/photo-1545450660-3378a7f3a364?w=800',
      species: 'Rainbow Trout',
      weight_lb: 4.2,
      length_in: 18,
      location_name: 'Clear Creek, Colorado',
      caption: 'Early morning catch on a fly rod 🎣',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      user: { username: 'trout_whisperer', display_name: 'Sarah Chen' },
      likes_count: 28,
      comments_count: 5
    },
    '3': {
      id: '3',
      image_url: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=800',
      species: 'Northern Pike',
      weight_lb: 12.3,
      length_in: 36,
      location_name: 'Lake of the Woods',
      caption: 'Monster pike on a spinnerbait! 🔥',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      user: { username: 'pike_hunter', display_name: 'Jake Wilson' },
      likes_count: 89,
      comments_count: 15
    }
  };

  let catchData = $state(null);
  let showCardGenerator = $state(false);
  let selectedTemplate = $state('classic');
  let cardDataUrl = $state(null);
  let generating = $state(false);
  let liked = $state(false);
  let comment = $state('');

  const templates = [
    { id: 'classic', name: 'Classic', emoji: '🌊' },
    { id: 'trophy', name: 'Trophy', emoji: '🏆' },
    { id: 'neon', name: 'Neon', emoji: '✨' }
  ];

  onMount(() => {
    const id = $page.params.id;
    // Check localStorage first (for user-created catches)
    const localCatches = JSON.parse(localStorage.getItem('fishflex_catches') || '[]');
    const localCatch = localCatches.find(c => c.id === id);

    if (localCatch) {
      catchData = localCatch;
    } else if (mockCatches[id]) {
      catchData = mockCatches[id];
    }
  });

  async function generateCard() {
    if (!catchData) return;
    generating = true;
    try {
      cardDataUrl = await generateCatchCard(catchData, selectedTemplate);
    } catch (e) {
      console.error('Failed to generate card:', e);
    }
    generating = false;
  }

  async function downloadCard() {
    if (!cardDataUrl) return;
    const link = document.createElement('a');
    link.download = `fishflex-${catchData.species || 'catch'}-${Date.now()}.png`;
    link.href = cardDataUrl;
    link.click();
  }

  async function shareCard() {
    if (!cardDataUrl) return;
    try {
      const blob = await (await fetch(cardDataUrl)).blob();
      const file = new File([blob], 'fishflex-catch.png', { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My FishFlex Catch',
          text: `Check out my ${catchData.species || 'catch'} on FishFlex!`
        });
      } else {
        downloadCard();
      }
    } catch (e) {
      console.error('Share failed:', e);
      downloadCard();
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  $effect(() => {
    if (showCardGenerator && catchData && !cardDataUrl) {
      generateCard();
    }
  });

  $effect(() => {
    if (selectedTemplate && showCardGenerator && catchData) {
      generateCard();
    }
  });
</script>

<svelte:head>
  <title>{catchData?.species || 'Catch'} | FishFlex</title>
</svelte:head>

{#if catchData}
  <div class="pb-4">
    <!-- Header -->
    <header class="flex items-center gap-3 p-4">
      <a href="/" class="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
        ←
      </a>
      <div class="flex items-center gap-3 flex-1">
        <div class="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">🎣</div>
        <div>
          <p class="font-semibold">{catchData.user?.display_name || 'Angler'}</p>
          <p class="text-sm text-slate-500">@{catchData.user?.username || 'angler'}</p>
        </div>
      </div>
    </header>

    <!-- Catch image -->
    <img
      src={catchData.image_url}
      alt={catchData.species || 'Catch'}
      class="w-full aspect-square object-cover"
    />

    <!-- Actions -->
    <div class="flex items-center gap-4 p-4">
      <button onclick={() => liked = !liked} class="flex items-center gap-2 text-lg">
        <span class={liked ? 'text-red-500' : ''}>{liked ? '❤️' : '🤍'}</span>
        <span class="text-sm font-medium">{catchData.likes_count + (liked ? 1 : 0)}</span>
      </button>
      <button class="flex items-center gap-2 text-lg">
        <span>💬</span>
        <span class="text-sm font-medium">{catchData.comments_count}</span>
      </button>
      <button
        onclick={() => showCardGenerator = !showCardGenerator}
        class="ml-auto btn-golden py-2 px-4 text-sm"
      >
        📤 Create Card
      </button>
    </div>

    <!-- Card generator -->
    {#if showCardGenerator}
      <div class="px-4 pb-4">
        <div class="card p-4 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-bold">Create Shareable Card</h3>
            <button onclick={() => showCardGenerator = false} class="text-slate-500 hover:text-slate-700">✕</button>
          </div>

          <!-- Template selector -->
          <div class="flex gap-2 overflow-x-auto pb-2">
            {#each templates as template}
              <button
                type="button"
                onclick={() => selectedTemplate = template.id}
                class="flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all
                  {selectedTemplate === template.id
                    ? 'bg-ocean-600 text-white'
                    : 'bg-slate-200 text-slate-700'}"
              >
                {template.emoji} {template.name}
              </button>
            {/each}
          </div>

          <!-- Card preview -->
          <div class="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200">
            {#if generating}
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-4xl animate-pulse">🎨</span>
              </div>
            {:else if cardDataUrl}
              <img src={cardDataUrl} alt="Shareable catch card" class="w-full h-full object-contain" />
            {/if}
          </div>

          <!-- Share buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button onclick={downloadCard} class="btn-secondary flex items-center justify-center gap-2">
              <span>📥</span> Save
            </button>
            <button onclick={shareCard} class="btn-golden flex items-center justify-center gap-2">
              <span>📤</span> Share
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Catch details -->
    <div class="px-4 space-y-3">
      {#if catchData.species}
        <div class="flex items-center gap-2 flex-wrap">
          <span class="badge-golden">🐟 {catchData.species}</span>
          {#if catchData.weight_lb}
            <span class="badge-ocean">{catchData.weight_lb} lb</span>
          {/if}
          {#if catchData.length_in}
            <span class="badge-ocean">{catchData.length_in}"</span>
          {/if}
        </div>
      {/if}

      {#if catchData.location_name}
        <p class="text-sm text-slate-600">
          📍 {catchData.location_name}
        </p>
      {/if}

      {#if catchData.caption}
        <p>
          <span class="font-semibold">@{catchData.user?.username || 'angler'}</span>
          {' '}{catchData.caption}
        </p>
      {/if}

      <p class="text-sm text-slate-500">{formatDate(catchData.created_at)}</p>
    </div>

    <!-- Comments section -->
    <div class="mt-6 px-4 space-y-4">
      <h3 class="font-semibold">Comments</h3>

      <div class="space-y-3">
        <div class="flex gap-3">
          <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">👤</div>
          <div>
            <p class="text-sm">
              <span class="font-semibold">@fishing_fan</span>
              {' '}Nice catch! What lure did you use?
            </p>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">👤</div>
          <div>
            <p class="text-sm">
              <span class="font-semibold">@lake_legend</span>
              {' '}That's a beauty! 🔥
            </p>
          </div>
        </div>
      </div>

      <!-- Add comment -->
      <form onsubmit={(e) => e.preventDefault()} class="flex gap-2">
        <input
          type="text"
          bind:value={comment}
          class="input flex-1"
          placeholder="Add a comment..."
        />
        <button type="submit" class="btn-primary px-4">Post</button>
      </form>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center h-96">
    <p class="text-slate-500">Loading...</p>
  </div>
{/if}

<style>
  @media (prefers-color-scheme: dark) {
    header a:hover, header button:hover {
      background-color: rgb(51, 65, 85);
    }
  }
</style>
