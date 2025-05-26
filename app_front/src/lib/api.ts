// API型定義とfetchラッパー
export interface PostDetail {
  id: string;
  genre: string;
  format: string;
  tone: string;
  memo: string;
  result: string;
  prompt_used: string;
  created_at: string;
}

export async function fetchPostDetail(id: string, fetchFn = fetch): Promise<PostDetail> {
  const res = await fetchFn(`/api/posts/${id}`);
  if (!res.ok) throw new Error('詳細取得に失敗しました');
  return res.json();
}

export type PostHistoryItem = {
  id: string;
  content: string;
  format: string;
  genre: string;
  tone: string;
  created_at: string;
};

export async function fetchPostHistory(page = 1, limit = 10, fetchFn = fetch): Promise<PostHistoryItem[]> {
  const res = await fetchFn('/api/posts/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, limit })
  });
  if (!res.ok) throw new Error('履歴の取得に失敗しました');
  const data = await res.json();
  return data.posts;
}

export interface ThemeItem {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export async function fetchThemes(fetchFn = fetch): Promise<ThemeItem[]> {
  const res = await fetchFn('/api/themes');
  if (!res.ok) throw new Error('テーマ一覧の取得に失敗しました');
  return res.json();
}

export interface PlanItem {
  id: string;
  name: string;
  price: number;
  description: string;
  is_active: boolean;
  created_at: string;
}

export async function fetchPlans(fetchFn = fetch): Promise<PlanItem[]> {
  const res = await fetchFn('/api/plans');
  if (!res.ok) throw new Error('プラン一覧の取得に失敗しました');
  return res.json();
}

export async function addPlan(
  name: string,
  price: number,
  description: string,
  fetchFn = fetch
): Promise<void> {
  const res = await fetchFn('/api/plans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description })
  });
  if (!res.ok) throw new Error('プラン追加に失敗しました');
}

export async function updatePlan(
  id: string,
  name: string,
  price: number,
  description: string,
  is_active: boolean,
  fetchFn = fetch
): Promise<void> {
  const res = await fetchFn(`/api/plans/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description, is_active })
  });
  if (!res.ok) throw new Error('プラン更新に失敗しました');
}

export async function deletePlan(id: string, fetchFn = fetch): Promise<void> {
  const res = await fetchFn(`/api/plans/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('プラン削除に失敗しました');
}
