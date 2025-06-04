<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { browser } from '$app/environment';

let genre = '';
let format = '';
let tone = '';
let memo = '';
let loading = false;
let error = '';
let result: string | null = null;
let promptUsed: string | null = null;

async function handleGenerate() {
  loading = true;
  error = '';
  result = null;
  promptUsed = null;
  try {
    // 仮API: 実際はAPIクライアントに置き換え
    const res = await fetch('/api/posts/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ genre, format, tone, memo })
    });
    if (!res.ok) throw new Error('生成に失敗しました');
    const data = await res.json();
    result = data.result;
    promptUsed = data.prompt_used;
  } catch (e) {
    error = e instanceof Error ? e.message : 'エラーが発生しました';
  } finally {
    loading = false;
  }
}
</script>

<div class="max-w-xl mx-auto py-10 px-4">
  <h1 class="text-2xl font-bold mb-6">SNS投稿を生成</h1>
  <form class="space-y-4" on:submit|preventDefault={handleGenerate}>
    <div>
      <label for="genre" class="block font-medium mb-1">ジャンル</label>
      <input id="genre" class="input input-bordered w-full" bind:value={genre} required />
    </div>
    <div>
      <label for="format" class="block font-medium mb-1">形式</label>
      <input id="format" class="input input-bordered w-full" bind:value={format} required />
    </div>
    <div>
      <label for="tone" class="block font-medium mb-1">トーン</label>
      <input id="tone" class="input input-bordered w-full" bind:value={tone} required />
    </div>
    <div>
      <label for="memo" class="block font-medium mb-1">備考</label>
      <textarea id="memo" class="input input-bordered w-full" bind:value={memo} rows="2"></textarea>
    </div>
    <button class="btn btn-primary w-full" type="submit" disabled={loading}>
      {loading ? '生成中...' : '生成する'}
    </button>
  </form>
  {#if error}
    <div class="mt-4 text-red-600">{error}</div>
  {/if}
  {#if result}
    <div class="mt-8 p-4 bg-gray-50 rounded shadow">
      <div class="font-bold mb-2">生成結果</div>
      <div class="whitespace-pre-line">{result}</div>
      {#if promptUsed}
        <div class="mt-2 text-xs text-gray-500">プロンプト: {promptUsed}</div>
      {/if}
    </div>
  {/if}
</div>
