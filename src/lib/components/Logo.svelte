<script>
  let { size = 'md' } = $props();

  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };
</script>

<div class="flex items-center gap-2">
  <span class="text-3xl">🐟</span>
  <span class="font-display font-bold {sizes[size]} bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
    FishFlex
  </span>
</div>
