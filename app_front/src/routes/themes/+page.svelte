<script lang="ts">
import type { ThemeItem } from '$lib/api';

export let data: { themes?: ThemeItem[]; error?: string };
const { themes, error } = data;

let name = '';
let description = '';
let addError = '';
let adding = false;

async function addTheme() {
  addError = '';
  adding = true;
  try {
    // 仮API: 実際はAPIクライアントに置き換え
    const res = await fetch('/api/themes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });
    if (!res.ok) throw new Error('テーマ追加に失敗しました');
    name = '';
    description = '';
    // 追加後に再取得
    location.reload();
  } catch (e) {
    addError = e instanceof Error ? e.message : 'エラーが発生しました';
  } finally {
    adding = false;
  }
}

let deleteError = '';
let deletingId: string | null = null;

async function deleteTheme(id: string) {
  deleteError = '';
  deletingId = id;
  try {
    // 仮API: 実際はAPIクライアントに置き換え
    const res = await fetch(`/api/themes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('削除に失敗しました');
    location.reload();
  } catch (e) {
    deleteError = e instanceof Error ? e.message : 'エラーが発生しました';
  } finally {
    deletingId = null;
  }
}

let editingTheme: ThemeItem | null = null;
let editName = '';
let editDescription = '';
let updating = false;
let updateError = '';

function editTheme(theme: ThemeItem) {
  editingTheme = theme;
  editName = theme.name;
  editDescription = theme.description;
  updateError = '';
}

function cancelEdit() {
  editingTheme = null;
  editName = '';
  editDescription = '';
  updateError = '';
}

async function updateTheme() {
  if (!editingTheme) return;
  updating = true;
  updateError = '';
  try {
    // 仮API: 実際はAPIクライアントに置き換え
    const res = await fetch(`/api/themes/${editingTheme.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, description: editDescription })
    });
    if (!res.ok) throw new Error('更新に失敗しました');
    location.reload();
  } catch (e) {
    updateError = e instanceof Error ? e.message : 'エラーが発生しました';
  } finally {
    updating = false;
  }
}
</script>

<div class="w-full max-w-none sm:max-w-2xl lg:max-w-4xl mx-auto py-6 sm:py-10 px-4">
  <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">テーマ管理</h1>
  <form class="mb-6 sm:mb-8 space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white rounded-lg border border-gray-200" on:submit|preventDefault={addTheme}>
    <div>
      <input 
        class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
        placeholder="テーマ名" 
        bind:value={name} 
        required 
      />
    </div>
    <div>
      <input 
        class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
        placeholder="説明" 
        bind:value={description} 
        required 
      />
    </div>
    <button 
      class="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all text-sm sm:text-base" 
      type="submit" 
      disabled={adding}
    >
      {adding ? '追加中...' : 'テーマを追加'}
    </button>
    {#if addError}
      <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600 text-sm">{addError}</p>
      </div>
    {/if}
  </form>
  
  {#if !themes && !error}
    <div class="text-center py-8 text-gray-500">読み込み中...</div>
  {:else if error}
    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">{error}</p>
    </div>
  {:else if themes && themes.length === 0}
    <div class="text-center py-8 text-gray-500">テーマがありません。</div>
  {:else if themes}
    <div class="space-y-3 sm:space-y-4">
      {#each themes as theme}
        <div class="p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="mb-4 lg:mb-0 flex-1">
              <div class="font-semibold text-gray-900 text-sm sm:text-base mb-1">{theme.name}</div>
              <div class="text-gray-600 text-sm mb-2">{theme.description}</div>
              <div class="text-xs sm:text-sm text-gray-400">作成日: {new Date(theme.created_at).toLocaleDateString('ja-JP')}</div>
            </div>
            <div class="flex flex-col sm:flex-row gap-2 lg:ml-4">
              <button 
                class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                on:click={() => editTheme(theme)}
              >
                編集
              </button>
              <button 
                class="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50" 
                on:click={() => deleteTheme(theme.id)} 
                disabled={deletingId === theme.id}
              >
                {deletingId === theme.id ? '削除中...' : '削除'}
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if deleteError}
    <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">{deleteError}</p>
    </div>
  {/if}

  {#if editingTheme}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="p-4 sm:p-6">
          <h2 class="text-lg font-bold mb-4">テーマ編集</h2>
          <form on:submit|preventDefault={updateTheme} class="space-y-4">
            <input 
              class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
              placeholder="テーマ名" 
              bind:value={editName} 
              required 
            />
            <input 
              class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
              placeholder="説明" 
              bind:value={editDescription} 
              required 
            />
            <div class="flex flex-col sm:flex-row gap-2 mt-6">
              <button 
                class="flex-1 bg-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all text-sm sm:text-base" 
                type="submit" 
                disabled={updating}
              >
                {updating ? '保存中...' : '保存'}
              </button>
              <button 
                class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-all text-sm sm:text-base" 
                type="button" 
                on:click={cancelEdit} 
                disabled={updating}
              >
                キャンセル
              </button>
            </div>
            {#if updateError}
              <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-600 text-sm">{updateError}</p>
              </div>
            {/if}
          </form>
        </div>
      </div>
    </div>
  {/if}
</div>
