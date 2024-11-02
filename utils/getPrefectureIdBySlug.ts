import { PREFECTURES } from '@/constants/prefectures';

export default function getPrefectureIdBySlug(slug: string): number | undefined {
  const prefecture = PREFECTURES.find((prefecture) => prefecture.slug === slug);
  return prefecture ? prefecture.id : undefined;
}
