<script lang="ts">
import '../app.css';

const navItems = [
  { href: '/generate', label: '投稿生成' },
  { href: '/history', label: '履歴' },
  { href: '/themes', label: 'テーマ' },
  { href: '/plans', label: 'プラン' }
];
</script>

<div class="min-h-screen bg-gray-50">
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <a href="/" class="text-xl font-bold text-gray-900">AutoBuzzSns</a>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            {#each navItems as item}
              <a
                href={item.href}
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
              >
                {item.label}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <slot />
  </main>
</div>