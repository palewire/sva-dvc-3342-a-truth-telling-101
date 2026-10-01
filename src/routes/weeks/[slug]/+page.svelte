<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import Meta from '$lib/components/Meta.svelte';

  let { data }: { data: PageData } = $props();
  const Content = $derived(data.pageComponent);
  const week = $derived(
    data.site.schedule.weeks.find((item) => item.number === data.metadata.week)
  );
  const canonicalRoot = import.meta.env.VITE_CANONICAL_URL?.replace(/\/+$/, '');
  const canonicalUrl = $derived(
    canonicalRoot ? canonicalRoot + '/weeks/' + data.slug + '/' : undefined
  );
</script>

<Meta
  meta={{
    title: data.metadata.title + ' | ' + data.site.course.title,
    description: data.metadata.summary || data.site.meta.description
  }}
  {canonicalUrl}
/>

<main id="main-content" class="week-page" tabindex="-1">
  <div class="container week-container">
    <a class="week-back" href={base + '/#schedule'}>All class dates</a>
    <p class="eyebrow">Week {data.metadata.week}{week ? ' · ' + week.displayDate : ''}</p>
    <h1>{data.metadata.title}</h1>
    {#if data.metadata.summary}
      <p class="week-summary">{data.metadata.summary}</p>
    {/if}
    <article class="week-body">
      <Content />
    </article>
  </div>
</main>
