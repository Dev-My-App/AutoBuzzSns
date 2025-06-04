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

<div class="w-full max-w-none sm:max-w-2xl lg:max-w-4xl mx-auto py-6 sm:py-10 px-4">
  <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">プラン管理</h1>
  <form class="mb-6 sm:mb-8 space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white rounded-lg border border-gray-200" on:submit|preventDefault={handleAddPlan}>
    <div>
      <input 
        class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
        placeholder="プラン名" 
        bind:value={planName} 
        required 
      />
    </div>
    <div>
      <input 
        class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
        type="number" 
        min="0" 
        placeholder="価格" 
        bind:value={planPrice} 
        required 
      />
    </div>
    <div>
      <input 
        class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
        placeholder="説明" 
        bind:value={planDescription} 
        required 
      />
    </div>
    <button 
      class="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all text-sm sm:text-base" 
      type="submit" 
      disabled={addingPlan}
    >
      {addingPlan ? '追加中...' : 'プランを追加'}
    </button>
    {#if addPlanError}
      <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600 text-sm">{addPlanError}</p>
      </div>
    {/if}
  </form>
  
  {#if !plans && !error}
    <div class="text-center py-8 text-gray-500">読み込み中...</div>
  {:else if error}
    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">{error}</p>
    </div>
  {:else if plans && plans.length === 0}
    <div class="text-center py-8 text-gray-500">プランがありません。</div>
  {:else if plans}
    <div class="space-y-3 sm:space-y-4">
      {#each plans as plan}
        <div class="p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="mb-4 lg:mb-0 flex-1">
              <div class="font-semibold text-gray-900 text-sm sm:text-base mb-1">{plan.name}</div>
              <div class="text-gray-600 text-sm mb-2">{plan.description}</div>
              <div class="flex flex-wrap gap-2 text-xs sm:text-sm">
                <span class="text-gray-400">作成日: {new Date(plan.created_at).toLocaleDateString('ja-JP')}</span>
                <span class="text-gray-500">価格: {plan.price}円</span>
                <span class="{plan.is_active ? 'text-green-600' : 'text-gray-400'}">{plan.is_active ? '有効' : '無効'}</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-2 lg:ml-4">
              <button 
                class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                on:click={() => startEditPlan(plan)}
              >
                編集
              </button>
              <button 
                class="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50" 
                on:click={() => handleDeletePlan(plan.id)} 
                disabled={deletingPlanId === plan.id}
              >
                {deletingPlanId === plan.id ? '削除中...' : '削除'}
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if deletePlanError}
    <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">{deletePlanError}</p>
    </div>
  {/if}

  {#if editingPlan}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="p-4 sm:p-6">
          <h2 class="text-lg font-bold mb-4">プラン編集</h2>
          <form on:submit|preventDefault={handleUpdatePlan} class="space-y-4">
            <input 
              class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
              placeholder="プラン名" 
              bind:value={editPlanName} 
              required 
            />
            <input 
              class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
              type="number" 
              min="0" 
              placeholder="価格" 
              bind:value={editPlanPrice} 
              required 
            />
            <input 
              class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base" 
              placeholder="説明" 
              bind:value={editPlanDescription} 
              required 
            />
            <label class="flex items-center gap-2 mt-2">
              <input type="checkbox" bind:checked={editPlanActive} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span class="text-sm sm:text-base">有効</span>
            </label>
            <div class="flex flex-col sm:flex-row gap-2 mt-6">
              <button 
                class="flex-1 bg-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all text-sm sm:text-base" 
                type="submit" 
                disabled={updatingPlan}
              >
                {updatingPlan ? '保存中...' : '保存'}
              </button>
              <button 
                class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-all text-sm sm:text-base" 
                type="button" 
                on:click={cancelEditPlan} 
                disabled={updatingPlan}
              >
                キャンセル
              </button>
            </div>
            {#if updatePlanError}
              <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-600 text-sm">{updatePlanError}</p>
              </div>
            {/if}
          </form>
        </div>
      </div>
    </div>
  {/if}
</div>
