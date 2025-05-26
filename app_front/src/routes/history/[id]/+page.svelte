<script lang="ts">
import { goto } from '$app/navigation';
import type { PageData } from './$types';
import type { PostDetail } from '$lib/api';

export let data: { detail?: PostDetail; error?: string };
const { detail, error } = data;
</script>

<div class="max-w-xl mx-auto py-10 px-4">
  <button class="mb-4 text-blue-600 hover:underline" on:click={() => goto('/history')}>← 履歴一覧へ戻る</button>
  <h1 class="text-2xl font-bold mb-6">投稿履歴詳細</h1>
  {#if !detail && !error}
    <div>読み込み中...</div>
  {:else if error}
    <div class="text-red-600">{error}</div>
  {:else if detail}
    <div class="space-y-4">
      <div>
        <span class="font-bold">ジャンル:</span> {detail.genre}
      </div>
      <div>
        <span class="font-bold">形式:</span> {detail.format}
      </div>
      <div>
        <span class="font-bold">トーン:</span> {detail.tone}
      </div>
      <div>
        <span class="font-bold">備考:</span> {detail.memo}
      </div>
      <div>
        <span class="font-bold">生成内容:</span>
        <div class="whitespace-pre-line bg-gray-50 rounded p-3 mt-1">{detail.result}</div>
      </div>
      <div class="text-xs text-gray-500">
        <span class="font-bold">プロンプト:</span> {detail.prompt_used}
      </div>
      <div class="text-xs text-gray-400">
        <span class="font-bold">生成日時:</span> {detail.created_at}
      </div>
    </div>
  {/if}
</div>
