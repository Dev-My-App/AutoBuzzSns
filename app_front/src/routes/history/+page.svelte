<script lang="ts">
import type { PostHistoryItem } from '$lib/api';
import type { PageData } from './$types';

export let data: { posts?: PostHistoryItem[]; error?: string };
const { posts, error } = data;

function formatDate(date: string) {
  return new Date(date).toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
</script>

<div class="w-full max-w-none sm:max-w-2xl lg:max-w-4xl mx-auto py-6 sm:py-10 px-4">
  <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">投稿履歴</h1>
  {#if !posts && !error}
    <div class="text-center py-8 text-gray-500">読み込み中...</div>
  {:else if error}
    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">{error}</p>
    </div>
  {:else if posts && posts.length === 0}
    <div class="text-center py-8 text-gray-500">履歴がありません。</div>
  {:else if posts}
    <div class="space-y-3 sm:space-y-4">
      {#each posts as post}
        <div class="p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
            <div class="mb-2 sm:mb-0">
              <span class="font-semibold text-gray-900">{post.genre}</span>
              <span class="text-xs sm:text-sm text-gray-500 ml-2">({post.format})</span>
            </div>
            <div class="text-xs sm:text-sm text-gray-400">{formatDate(post.created_at)}</div>
          </div>
          <div class="mb-3 text-gray-800 text-sm sm:text-base leading-relaxed">{post.content}</div>
          <a 
            class="inline-flex items-center text-blue-600 text-sm hover:text-blue-700 hover:underline transition-colors" 
            href={`/history/${post.id}`}
          >
            詳細を見る
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      {/each}
    </div>
  {/if}
</div>
