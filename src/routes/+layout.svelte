<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { base } from '$app/paths';
  import '../app.css';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<a class="skip-link" href="#main-content">Skip to main content</a>

<header class="masthead">
  <div class="container masthead-inner">
    <div class="brand">
      <a
        class="brand-mark"
        href={data.site.course.schoolUrl}
        aria-label={data.site.course.school + ' home'}
      >
        <img src={base + '/sva-mark.svg'} alt="" width="45" height="45" />
      </a>
      <span class="brand-copy">
        <a class="brand-name" href={data.site.course.schoolUrl}
          >{data.site.course.school}</a
        >
        <a class="brand-program" href={data.site.course.programUrl}
          >{data.site.course.program}</a
        >
      </span>
    </div>
  </div>
</header>

{@render children()}
