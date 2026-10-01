import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { EntryGenerator, PageLoad } from './$types';

interface WeekModule {
  default: Component;
  metadata?: {
    title?: string;
    summary?: string;
    week?: number;
  };
}

const weekModules = import.meta.glob<WeekModule>('/src/content/weeks/*.svx');

export const entries: EntryGenerator = () =>
  Object.keys(weekModules).map((path) => ({
    slug: path.split('/').pop()!.replace('.svx', '')
  }));

export const load: PageLoad = async ({ params }) => {
  const loader = weekModules['/src/content/weeks/' + params.slug + '.svx'];
  if (!loader) error(404, 'Week page not found');

  const module = await loader();
  const metadata = module.metadata;
  if (!metadata || !metadata.title || !metadata.week) {
    error(500, 'Week pages need a title and week number in their frontmatter');
  }

  return {
    pageComponent: module.default,
    metadata: {
      title: metadata.title,
      summary: metadata.summary ?? '',
      week: metadata.week
    },
    slug: params.slug
  };
};
