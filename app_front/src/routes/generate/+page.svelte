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

<div class="w-full max-w-none sm:max-w-lg lg:max-w-xl mx-auto py-6 sm:py-10 px-4">
  <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">SNS投稿を生成</h1>
  <form class="space-y-4 sm:space-y-6" on:submit|preventDefault={handleGenerate}>
    <div class="space-y-4">
      <div>
        <label for="genre" class="block text-sm font-medium text-gray-700 mb-2">ジャンル</label>
        <input 
          id="genre" 
          class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
          bind:value={genre} 
          required 
          placeholder="例: テクノロジー、ライフスタイル"
        />
      </div>
      <div>
        <label for="format" class="block text-sm font-medium text-gray-700 mb-2">形式</label>
        <input 
          id="format" 
          class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
          bind:value={format} 
          required 
          placeholder="例: リスト形式、ストーリー形式"
        />
      </div>
      <div>
        <label for="tone" class="block text-sm font-medium text-gray-700 mb-2">トーン</label>
        <input 
          id="tone" 
          class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
          bind:value={tone} 
          required 
          placeholder="例: カジュアル、プロフェッショナル"
        />
      </div>
      <div>
        <label for="memo" class="block text-sm font-medium text-gray-700 mb-2">備考</label>
        <textarea 
          id="memo" 
          class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base resize-none" 
          bind:value={memo} 
          rows="3"
          placeholder="追加の要望があれば記入してください"
        ></textarea>
      </div>
    </div>
    <button 
      class="w-full bg-blue-600 text-white px-4 py-3 sm:py-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base" 
      type="submit" 
      disabled={loading}
    >
      {loading ? '生成中...' : '生成する'}
    </button>
  </form>
  {#if error}
    <div class="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600 text-sm sm:text-base">{error}</p>
    </div>
  {/if}
  {#if result}
    <div class="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div class="font-semibold mb-3 text-gray-900 text-sm sm:text-base">生成結果</div>
      <div class="whitespace-pre-line text-gray-800 text-sm sm:text-base leading-relaxed">{result}</div>
      {#if promptUsed}
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-xs sm:text-sm text-gray-500">プロンプト: {promptUsed}</p>
        </div>
      {/if}
    </div>
  {/if}
</div>
