<script lang="ts">
  import { base } from '$app/paths';

  let {
    meta,
    canonicalUrl
  }: {
    meta: {
      title: string;
      description: string;
      image?: string;
      imageAlt?: string;
      imageWidth?: string;
      imageHeight?: string;
    };
    canonicalUrl?: string;
  } = $props();

  const imagePath = $derived(meta.image ? base + '/' + meta.image : undefined);
  const imageUrl = $derived(
    imagePath && canonicalUrl ? new URL(imagePath, canonicalUrl).href : imagePath
  );
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  {#if imageUrl}
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:type" content="image/avif" />
    <meta property="og:image:alt" content={meta.imageAlt} />
    <meta property="og:image:width" content={meta.imageWidth} />
    <meta property="og:image:height" content={meta.imageHeight} />
    <meta name="twitter:image" content={imageUrl} />
    <meta name="twitter:image:alt" content={meta.imageAlt} />
  {/if}
  {#if canonicalUrl}
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:url" content={canonicalUrl} />
  {/if}
</svelte:head>
