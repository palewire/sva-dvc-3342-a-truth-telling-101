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
    <a
      class="brand"
      href={base + '/'}
      aria-label={data.site.course.title + ' syllabus home'}
    >
      <img src={base + '/sva-mark.svg'} alt="" width="45" height="45" />
      <span class="brand-copy">
        <span class="brand-name">{data.site.course.school}</span>
        <span class="brand-program">{data.site.course.program}</span>
      </span>
    </a>
    <nav class="site-nav" aria-label="Course sections">
      <a href={base + '/#schedule'}>Class dates</a>
      <a href={base + '/#guests'}>Guests</a>
      <a href={base + '/#instructor'}>Instructor</a>
    </nav>
  </div>
</header>

{@render children()}

<footer class="site-footer">
  <div class="container">
    <div class="footer-main">
      <div class="footer-identity">
        <img src={base + '/sva-mark.svg'} alt="" width="45" height="45" />
        <div>
          <p class="footer-school">{data.site.course.school}</p>
          <p>{data.site.course.program}</p>
        </div>
      </div>
      <div class="footer-details">
        <p>{data.site.footer.note}</p>
        <a href={data.site.course.officialUrl}
          >{data.site.course.officialLinkLabel} <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
    <div class="footer-bottom">
      <span>{data.site.course.title}</span>
      <span
        >{data.site.course.term} <span aria-hidden="true">·</span>
        {data.site.course.code}</span
      >
    </div>
  </div>
</footer>
