import { fetchPostHistory } from '$lib/api';

export const load = async ({ fetch }) => {
  try {
    const posts = await fetchPostHistory(1, 10, fetch);
    return { posts };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'エラーが発生しました' };
  }
};
