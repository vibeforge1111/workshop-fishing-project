<script>
  import { page } from '$app/stores';

  let currentPath = $derived($page.url.pathname);

  const navItems = [
    { href: '/', icon: '🏠', label: 'Home' },
    { href: '/explore', icon: '🔍', label: 'Explore' },
    { href: '/catch/new', icon: '➕', label: 'Catch', isAction: true },
    { href: '/leaderboard', icon: '🏆', label: 'Ranks' },
    { href: '/profile', icon: '👤', label: 'Profile' }
  ];
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-bottom z-50">
  <div class="flex items-center justify-around h-16 max-w-lg mx-auto">
    {#each navItems as item}
      <a
        href={item.href}
        class="flex flex-col items-center justify-center w-full h-full transition-all
          {item.isAction ? '' : currentPath === item.href ? 'text-ocean-600' : 'text-slate-500 hover:text-slate-700'}"
      >
        {#if item.isAction}
          <div class="flex items-center justify-center w-14 h-14 -mt-8 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-full shadow-lg shadow-ocean-500/40 border-4 border-white">
            <span class="text-2xl text-white">{item.icon}</span>
          </div>
        {:else}
          <span class="text-xl">{item.icon}</span>
          <span class="text-xs mt-1 font-medium">{item.label}</span>
        {/if}
      </a>
    {/each}
  </div>
</nav>

<style>
  @media (prefers-color-scheme: dark) {
    nav {
      background-color: rgb(15 23 42); /* slate-900 */
      border-color: rgb(51 65 85); /* slate-700 */
    }
    nav :global(.border-white) {
      border-color: rgb(15 23 42);
    }
  }
</style>
