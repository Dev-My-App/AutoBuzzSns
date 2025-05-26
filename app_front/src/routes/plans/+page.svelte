<script lang="ts">
import { addPlan, updatePlan, deletePlan, type PlanItem } from '$lib/api';

export let data: { plans?: PlanItem[]; error?: string };
const { plans, error } = data;

let planName = '';
let planPrice: number | '' = '';
let planDescription = '';
let addPlanError = '';
let addingPlan = false;

async function handleAddPlan() {
  addPlanError = '';
  addingPlan = true;
  try {
    if (planName && planPrice !== '' && planDescription) {
      await addPlan(planName, Number(planPrice), planDescription);
      location.reload();
    }
  } catch (e) {
    addPlanError = e instanceof Error ? e.message : 'エラーが発生しました';
  } finally {
    addingPlan = false;
  }
}

let editingPlan: PlanItem | null = null;
let editPlanName = '';
let editPlanPrice: number | '' = '';
let editPlanDescription = '';
let editPlanActive = true;
let updatingPlan = false;
let updatePlanError = '';

function startEditPlan(plan: PlanItem) {
  editingPlan = plan;
  editPlanName = plan.name;
  editPlanPrice = plan.price;
  editPlanDescription = plan.description;
  editPlanActive = plan.is_active;
  updatePlanError = '';
}

function cancelEditPlan() {
  editingPlan = null;
  editPlanName = '';
  editPlanPrice = '';
  editPlanDescription = '';
  updatePlanError = '';
}

async function handleUpdatePlan() {
  if (!editingPlan) return;
  updatingPlan = true;
  updatePlanError = '';
  try {
    await updatePlan(editingPlan.id, editPlanName, Number(editPlanPrice), editPlanDescription, editPlanActive);
    location.reload();
  } catch (e) {
    updatePlanError = e instanceof Error ? e.message : 'エラーが発生しました';
  } finally {
    updatingPlan = false;
  }
}

let deletingPlanId: string | null = null;
let deletePlanError = '';
async function handleDeletePlan(id: string) {
  deletePlanError = '';
  deletingPlanId = id;
  try {
    await deletePlan(id);
    location.reload();
  } catch (e) {
    deletePlanError = e instanceof Error ? e.message : 'エラーが発生しました';
  } finally {
    deletingPlanId = null;
  }
}
</script>

<div class="max-w-2xl mx-auto py-10 px-4">
  <h1 class="text-2xl font-bold mb-6">プラン管理</h1>
  <form class="mb-8 space-y-2" on:submit|preventDefault={handleAddPlan}>
    <div>
      <input class="input input-bordered w-full" placeholder="プラン名" bind:value={planName} required />
    </div>
    <div>
      <input class="input input-bordered w-full" type="number" min="0" placeholder="価格" bind:value={planPrice} required />
    </div>
    <div>
      <input class="input input-bordered w-full" placeholder="説明" bind:value={planDescription} required />
    </div>
    <button class="btn btn-primary" type="submit" disabled={addingPlan}>{addingPlan ? '追加中...' : 'プランを追加'}</button>
    {#if addPlanError}
      <div class="text-red-600 mt-2">{addPlanError}</div>
    {/if}
  </form>
  {#if !plans && !error}
    <div>読み込み中...</div>
  {:else if error}
    <div class="text-red-600">{error}</div>
  {:else if plans && plans.length === 0}
    <div>プランがありません。</div>
  {:else if plans}
    <div class="space-y-4">
      {#each plans as plan}
        <div class="p-4 bg-white rounded shadow border border-gray-100 flex items-center justify-between">
          <div>
            <div class="font-semibold">{plan.name}</div>
            <div class="text-gray-600 text-sm mb-1">{plan.description}</div>
            <div class="text-xs text-gray-400">作成日: {new Date(plan.created_at).toLocaleDateString('ja-JP')}</div>
            <div class="text-xs text-gray-500">価格: {plan.price}円</div>
            <div class="text-xs {plan.is_active ? 'text-green-600' : 'text-gray-400'}">{plan.is_active ? '有効' : '無効'}</div>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-sm btn-outline" on:click={() => startEditPlan(plan)}>編集</button>
            <button class="btn btn-sm btn-outline-red" on:click={() => handleDeletePlan(plan.id)} disabled={deletingPlanId === plan.id}>{deletingPlanId === plan.id ? '削除中...' : '削除'}</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if deletePlanError}
    <div class="text-red-600 mt-4">{deletePlanError}</div>
  {/if}

  {#if editingPlan}
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded shadow p-6 w-full max-w-md">
        <h2 class="text-lg font-bold mb-4">プラン編集</h2>
        <form on:submit|preventDefault={handleUpdatePlan} class="space-y-3">
          <input class="input input-bordered w-full" placeholder="プラン名" bind:value={editPlanName} required />
          <input class="input input-bordered w-full" type="number" min="0" placeholder="価格" bind:value={editPlanPrice} required />
          <input class="input input-bordered w-full" placeholder="説明" bind:value={editPlanDescription} required />
          <label class="flex items-center gap-2 mt-2">
            <input type="checkbox" bind:checked={editPlanActive} />
            <span>有効</span>
          </label>
          <div class="flex gap-2 mt-4">
            <button class="btn btn-primary" type="submit" disabled={updatingPlan}>{updatingPlan ? '保存中...' : '保存'}</button>
            <button class="btn btn-outline" type="button" on:click={cancelEditPlan} disabled={updatingPlan}>キャンセル</button>
          </div>
          {#if updatePlanError}
            <div class="text-red-600 mt-2">{updatePlanError}</div>
          {/if}
        </form>
      </div>
    </div>
  {/if}
</div>
