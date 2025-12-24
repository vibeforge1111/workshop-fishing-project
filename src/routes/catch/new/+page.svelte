<script>
  import { goto } from '$app/navigation';

  let imageFile = $state(null);
  let imagePreview = $state(null);
  let species = $state('');
  let weight = $state('');
  let length = $state('');
  let location = $state('');
  let caption = $state('');

  const commonSpecies = [
    'Largemouth Bass',
    'Smallmouth Bass',
    'Rainbow Trout',
    'Brown Trout',
    'Walleye',
    'Northern Pike',
    'Musky',
    'Crappie',
    'Bluegill',
    'Catfish',
    'Carp',
    'Salmon',
    'Steelhead',
    'Perch',
    'Striped Bass',
    'Redfish',
    'Snook',
    'Tarpon'
  ];

  let showSpeciesDropdown = $state(false);
  let filteredSpecies = $derived(
    species
      ? commonSpecies.filter(s => s.toLowerCase().includes(species.toLowerCase()))
      : commonSpecies
  );

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    imageFile = null;
    imagePreview = null;
  }

  function selectSpecies(s) {
    species = s;
    showSpeciesDropdown = false;
  }

  function handleSubmit() {
    // For now, just store in localStorage and redirect
    const newCatch = {
      id: Date.now().toString(),
      image_url: imagePreview,
      species,
      weight_lb: weight ? parseFloat(weight) : null,
      length_in: length ? parseFloat(length) : null,
      location_name: location,
      caption,
      created_at: new Date().toISOString(),
      user: { username: 'you', display_name: 'You', avatar_url: null },
      likes_count: 0,
      comments_count: 0
    };

    // Store in localStorage for demo
    const catches = JSON.parse(localStorage.getItem('fishflex_catches') || '[]');
    catches.unshift(newCatch);
    localStorage.setItem('fishflex_catches', JSON.stringify(catches));

    goto(`/catch/${newCatch.id}`);
  }
</script>

<svelte:head>
  <title>Log Catch | FishFlex</title>
</svelte:head>

<div class="p-4 space-y-6">
  <header class="flex items-center justify-between">
    <a href="/" class="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
      <span class="text-xl">←</span>
    </a>
    <h1 class="text-lg font-bold">Log Your Catch</h1>
    <div class="w-10"></div>
  </header>

  <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
    <!-- Image Upload -->
    <div class="relative">
      {#if imagePreview}
        <div class="relative aspect-square rounded-2xl overflow-hidden">
          <img src={imagePreview} alt="Catch preview" class="w-full h-full object-cover" />
          <button
            type="button"
            onclick={clearImage}
            class="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
        </div>
      {:else}
        <label class="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-slate-300 cursor-pointer hover:border-ocean-500 transition-colors bg-slate-50">
          <div class="text-center space-y-2">
            <span class="text-5xl">📸</span>
            <p class="text-lg font-medium text-slate-700">Add your catch</p>
            <p class="text-sm text-slate-500">Tap to take photo or upload</p>
          </div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onchange={handleFileSelect}
            class="hidden"
          />
        </label>
      {/if}
    </div>

    <!-- Species -->
    <div class="relative">
      <label class="block text-sm font-medium mb-1">Species</label>
      <input
        type="text"
        bind:value={species}
        onfocus={() => showSpeciesDropdown = true}
        class="input"
        placeholder="What did you catch?"
      />
      {#if showSpeciesDropdown && filteredSpecies.length > 0}
        <div class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-200 max-h-60 overflow-y-auto z-10">
          {#each filteredSpecies as s}
            <button
              type="button"
              onclick={() => selectSpecies(s)}
              class="w-full px-4 py-3 text-left hover:bg-slate-100 first:rounded-t-xl last:rounded-b-xl"
            >
              {s}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Weight & Length -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Weight (lb)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          bind:value={weight}
          class="input"
          placeholder="0.0"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Length (in)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          bind:value={length}
          class="input"
          placeholder="0.0"
        />
      </div>
    </div>

    <!-- Location -->
    <div>
      <label class="block text-sm font-medium mb-1">Location</label>
      <input
        type="text"
        bind:value={location}
        class="input"
        placeholder="Lake Michigan, Chicago"
      />
    </div>

    <!-- Caption -->
    <div>
      <label class="block text-sm font-medium mb-1">Caption</label>
      <textarea
        bind:value={caption}
        class="input resize-none"
        rows="3"
        placeholder="Tell the story of this catch..."
      ></textarea>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      class="btn-golden w-full text-lg"
      disabled={!imagePreview}
    >
      🎣 Share Catch
    </button>
  </form>
</div>

<svelte:window onclick={(e) => {
  if (!e.target.closest('.relative')) showSpeciesDropdown = false;
}} />

<style>
  @media (prefers-color-scheme: dark) {
    label[class*="border-dashed"] {
      background-color: rgba(51, 65, 85, 0.5);
      border-color: rgb(71, 85, 105);
    }
    .absolute[class*="bg-white"] {
      background-color: rgb(30, 41, 59);
      border-color: rgb(51, 65, 85);
    }
    .absolute button:hover {
      background-color: rgb(51, 65, 85);
    }
  }
</style>
