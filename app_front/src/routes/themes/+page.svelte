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

<div class="max-w-2xl mx-auto py-10 px-4">
  <h1 class="text-2xl font-bold mb-6">テーマ管理</h1>
  <form class="mb-8 space-y-2" on:submit|preventDefault={addTheme}>
    <div>
      <input class="input input-bordered w-full" placeholder="テーマ名" bind:value={name} required />
    </div>
    <div>
      <input class="input input-bordered w-full" placeholder="説明" bind:value={description} required />
    </div>
    <button class="btn btn-primary" type="submit" disabled={adding}>{adding ? '追加中...' : 'テーマを追加'}</button>
    {#if addError}
      <div class="text-red-600 mt-2">{addError}</div>
    {/if}
  </form>
  {#if !themes && !error}
    <div>読み込み中...</div>
  {:else if error}
    <div class="text-red-600">{error}</div>
  {:else if themes && themes.length === 0}
    <div>テーマがありません。</div>
  {:else if themes}
    <div class="space-y-4">
      {#each themes as theme}
        <div class="p-4 bg-white rounded shadow border border-gray-100 flex items-center justify-between">
          <div>
            <div class="font-semibold">{theme.name}</div>
            <div class="text-gray-600 text-sm mb-1">{theme.description}</div>
            <div class="text-xs text-gray-400">作成日: {new Date(theme.created_at).toLocaleDateString('ja-JP')}</div>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-sm btn-outline" on:click={() => editTheme(theme)}>編集</button>
            <button class="btn btn-sm btn-outline-red" on:click={() => deleteTheme(theme.id)} disabled={deletingId === theme.id}>{deletingId === theme.id ? '削除中...' : '削除'}</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if deleteError}
    <div class="text-red-600 mt-4">{deleteError}</div>
  {/if}

  {#if editingTheme}
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded shadow p-6 w-full max-w-md">
        <h2 class="text-lg font-bold mb-4">テーマ編集</h2>
        <form on:submit|preventDefault={updateTheme} class="space-y-3">
          <input class="input input-bordered w-full" placeholder="テーマ名" bind:value={editName} required />
          <input class="input input-bordered w-full" placeholder="説明" bind:value={editDescription} required />
          <div class="flex gap-2 mt-4">
            <button class="btn btn-primary" type="submit" disabled={updating}>{updating ? '保存中...' : '保存'}</button>
            <button class="btn btn-outline" type="button" on:click={cancelEdit} disabled={updating}>キャンセル</button>
          </div>
          {#if updateError}
            <div class="text-red-600 mt-2">{updateError}</div>
          {/if}
        </form>
      </div>
    </div>
  {/if}
</div>
