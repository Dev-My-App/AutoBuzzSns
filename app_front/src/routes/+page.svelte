<script lang="ts">
import { goto } from '$app/navigation';
</script>

<div class="text-center py-8 sm:py-12 lg:py-16 px-4">
  <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
    SNS投稿を<br class="sm:hidden" />AI生成
  </h1>
  <p class="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
    ジャンル、形式、トーンを選択するだけで<br class="sm:hidden" />
    魅力的な投稿を自動生成
  </p>
  <button
    class="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base"
    on:click={() => goto('/generate')}
  >
    投稿を生成する
  </button>
</div>
