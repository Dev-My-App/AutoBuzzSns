import type { PageLoad } from './$types';
import { fetchPostDetail } from '$lib/api';

export const load: PageLoad = async ({ params, fetch }) => {
  try {
    const detail = await fetchPostDetail(params.id, fetch);
    return { detail };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'エラーが発生しました' };
  }
};
