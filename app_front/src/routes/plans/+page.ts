import { fetchPlans } from '$lib/api';

export const load = async ({ fetch }) => {
  try {
    const plans = await fetchPlans(fetch);
    return { plans };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'エラーが発生しました' };
  }
};
