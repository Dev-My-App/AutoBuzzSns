<script lang="ts">
import { goto } from '$app/navigation';
</script>

<div class="text-center py-12">
  <h1 class="text-4xl font-bold text-gray-900 mb-4">
    SNS投稿を<br class="sm:hidden" />AI生成
  </h1>
  <p class="text-lg text-gray-600 mb-8">
    ジャンル、形式、トーンを選択するだけで<br class="sm:hidden" />
    魅力的な投稿を自動生成
  </p>
  <button
    class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    on:click={() => goto('/generate')}
  >
    投稿を生成する
  </button>
</div>