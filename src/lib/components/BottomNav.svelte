<script>
  import { page } from '$app/stores';
  import Icon from './Icons.svelte';

  let currentPath = $derived($page.url.pathname);

  const navItems = [
    { href: '/', icon: 'home', activeIcon: 'home-filled', label: 'Home' },
    { href: '/explore', icon: 'search', activeIcon: 'search', label: 'Explore' },
    { href: '/catch/new', icon: 'plus', label: 'Catch', isAction: true },
    { href: '/leaderboard', icon: 'trophy', activeIcon: 'trophy-filled', label: 'Ranks' },
    { href: '/profile', icon: 'user', activeIcon: 'user-filled', label: 'Profile' }
  ];
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200/50 safe-bottom z-50">
  <div class="flex items-center justify-around h-16 max-w-lg mx-auto">
    {#each navItems as item}
      <a
        href={item.href}
        class="flex flex-col items-center justify-center w-full h-full transition-all"
      >
        {#if item.isAction}
          <div class="flex items-center justify-center w-14 h-14 -mt-8 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-2xl shadow-lg shadow-ocean-500/40 border-4 border-white hover:scale-105 transition-transform">
            <Icon name={item.icon} size={26} class="text-white" />
          </div>
        {:else}
          <div class="flex flex-col items-center gap-1 {currentPath === item.href ? 'text-ocean-600' : 'text-slate-400 hover:text-slate-600'}">
            <Icon
              name={currentPath === item.href ? item.activeIcon : item.icon}
              size={22}
            />
            <span class="text-[10px] font-medium">{item.label}</span>
          </div>
        {/if}
      </a>
    {/each}
  </div>
</nav>

<style>
  @media (prefers-color-scheme: dark) {
    nav {
      background-color: rgba(15, 23, 42, 0.9);
      border-color: rgba(51, 65, 85, 0.5);
    }
    nav :global(.border-white) {
      border-color: rgb(15, 23, 42);
    }
  }
</style>
