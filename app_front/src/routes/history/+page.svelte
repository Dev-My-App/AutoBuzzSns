<script lang="ts">
import type { PostHistoryItem } from '$lib/api';
import type { PageData } from './$types';

export let data: { posts?: PostHistoryItem[]; error?: string };
const { posts, error } = data;

function formatDate(date: string) {
  return new Date(date).toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
</script>

<div class="max-w-2xl mx-auto py-10 px-4">
  <h1 class="text-2xl font-bold mb-6">投稿履歴</h1>
  {#if !posts && !error}
    <div>読み込み中...</div>
  {:else if error}
    <div class="text-red-600">{error}</div>
  {:else if posts && posts.length === 0}
    <div>履歴がありません。</div>
  {:else if posts}
    <div class="space-y-4">
      {#each posts as post}
        <div class="p-4 bg-white rounded shadow border border-gray-100">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold">{post.genre} <span class="text-xs text-gray-500">({post.format})</span></div>
            <div class="text-xs text-gray-400">{formatDate(post.created_at)}</div>
          </div>
          <div class="mb-2 text-gray-800">{post.content}</div>
          <a class="text-blue-600 text-sm hover:underline" href={`/history/${post.id}`}>詳細を見る</a>
        </div>
      {/each}
    </div>
  {/if}
</div>
