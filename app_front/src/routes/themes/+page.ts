import { fetchThemes } from '$lib/api';

export const load = async ({ fetch }) => {
  try {
    const themes = await fetchThemes(fetch);
    return { themes };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'エラーが発生しました' };
  }
};
