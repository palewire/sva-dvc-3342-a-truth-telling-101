<script lang="ts">
  import type { CourseContent } from '$lib/types';

  let {
    meta,
    canonicalUrl
  }: {
    meta: CourseContent['meta'];
    canonicalUrl?: string;
  } = $props();
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  {#if canonicalUrl}
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:url" content={canonicalUrl} />
  {/if}
</svelte:head>
