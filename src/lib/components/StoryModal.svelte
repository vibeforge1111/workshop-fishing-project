<script>
  import Icon from './Icons.svelte';

  let {
    stories = [],
    currentIndex = 0,
    isOpen = false,
    onClose = () => {}
  } = $props();

  let progress = $state(0);
  let isPaused = $state(false);
  let intervalId = $state(null);

  const STORY_DURATION = 5000; // 5 seconds per story

  $effect(() => {
    if (isOpen && stories.length > 0) {
      startProgress();
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });

  function startProgress() {
    progress = 0;
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      if (!isPaused) {
        progress += 100 / (STORY_DURATION / 50);
        if (progress >= 100) {
          nextStory();
        }
      }
    }, 50);
  }

  function nextStory() {
    if (currentIndex < stories.length - 1) {
      currentIndex++;
      startProgress();
    } else {
      handleClose();
    }
  }

  function prevStory() {
    if (currentIndex > 0) {
      currentIndex--;
      startProgress();
    }
  }

  function handleClose() {
    if (intervalId) clearInterval(intervalId);
    onClose();
  }

  function handleKeydown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') handleClose();
    if (e.key === 'ArrowRight') nextStory();
    if (e.key === 'ArrowLeft') prevStory();
  }

  function handlePointerDown() {
    isPaused = true;
  }

  function handlePointerUp() {
    isPaused = false;
  }

  let currentStory = $derived(stories[currentIndex] || null);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen && currentStory}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
    role="dialog"
    aria-modal="true"
  >
    <!-- Story Container -->
    <div class="relative w-full max-w-md h-full max-h-[90vh] mx-auto">
      <!-- Progress Bars -->
      <div class="absolute top-4 left-4 right-4 z-20 flex gap-1">
        {#each stories as _, i}
          <div class="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              class="h-full bg-white rounded-full transition-all duration-50"
              style="width: {i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%'}"
            ></div>
          </div>
        {/each}
      </div>

      <!-- Header -->
      <div class="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 p-0.5">
            {#if currentStory.avatar}
              <img src={currentStory.avatar} alt={currentStory.username} class="w-full h-full rounded-full object-cover" />
            {:else}
              <div class="w-full h-full rounded-full bg-slate-700 flex items-center justify-center">
                <Icon name="user" size={18} class="text-white" />
              </div>
            {/if}
          </div>
          <div>
            <p class="text-white font-semibold text-sm">{currentStory.username}</p>
            <p class="text-white/60 text-xs">{currentStory.time || 'Just now'}</p>
          </div>
        </div>
        <button
          onclick={handleClose}
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <Icon name="x" size={24} class="text-white" />
        </button>
      </div>

      <!-- Story Content -->
      <div
        class="relative w-full h-full rounded-2xl overflow-hidden"
        onpointerdown={handlePointerDown}
        onpointerup={handlePointerUp}
        onpointerleave={handlePointerUp}
      >
        <!-- Story Image/Content -->
        {#if currentStory.image}
          <img
            src={currentStory.image}
            alt="Story"
            class="w-full h-full object-cover"
          />
        {:else if currentStory.catch}
          <!-- Catch Story -->
          <div class="w-full h-full bg-gradient-to-br from-ocean-600 to-ocean-800 flex flex-col items-center justify-center p-8">
            <img
              src={currentStory.catch.image}
              alt={currentStory.catch.species}
              class="w-64 h-64 rounded-2xl object-cover shadow-2xl mb-6"
            />
            <p class="text-white text-2xl font-bold mb-2">{currentStory.catch.species}</p>
            <div class="flex items-center gap-4 text-white/80">
              {#if currentStory.catch.weight}
                <span class="flex items-center gap-1">
                  <Icon name="scale" size={16} />
                  {currentStory.catch.weight} lb
                </span>
              {/if}
              {#if currentStory.catch.length}
                <span class="flex items-center gap-1">
                  <Icon name="ruler" size={16} />
                  {currentStory.catch.length} in
                </span>
              {/if}
            </div>
            {#if currentStory.catch.location}
              <p class="text-white/60 text-sm mt-2 flex items-center gap-1">
                <Icon name="location" size={14} />
                {currentStory.catch.location}
              </p>
            {/if}
          </div>
        {:else}
          <!-- Default placeholder -->
          <div class="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            <p class="text-white/50">No content</p>
          </div>
        {/if}

        <!-- Tap zones for navigation -->
        <button
          class="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10"
          onclick={prevStory}
          aria-label="Previous story"
        ></button>
        <button
          class="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10"
          onclick={nextStory}
          aria-label="Next story"
        ></button>

        <!-- Caption Overlay -->
        {#if currentStory.caption}
          <div class="absolute bottom-24 left-4 right-4 z-10">
            <p class="text-white text-center text-lg font-medium drop-shadow-lg">
              {currentStory.caption}
            </p>
          </div>
        {/if}
      </div>

      <!-- Bottom Actions -->
      <div class="absolute bottom-4 left-4 right-4 z-20">
        <div class="flex items-center gap-3">
          <input
            type="text"
            placeholder="Send a message..."
            class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
          />
          <button class="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
            <Icon name="heart" size={22} class="text-white" />
          </button>
          <button class="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
            <Icon name="share" size={22} class="text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
