<script lang="ts">
  import type { PageData } from './$types';
  import Meta from '$lib/components/Meta.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import WeekSchedule from '$lib/components/WeekSchedule.svelte';
  import GuestSpeakers from '$lib/components/GuestSpeakers.svelte';
  import Instructor from '$lib/components/Instructor.svelte';

  let { data }: { data: PageData } = $props();
  const canonicalUrl = import.meta.env.VITE_CANONICAL_URL?.trim() || undefined;
</script>

<Meta meta={data.site.meta} {canonicalUrl} />

<main id="main-content" tabindex="-1">
  <Hero course={data.site.course} instructor={data.site.instructor} />

  <section class="introduction section" aria-labelledby="introduction-title">
    <div class="container">
      <div class="section-header">
        <p class="section-kicker">{data.site.introduction.kicker}</p>
        <h2 id="introduction-title">{data.site.introduction.title}</h2>
      </div>
      <div class="introduction-grid">
        <div class="introduction-copy">
          <p>{data.site.introduction.firstParagraph}</p>
          <p>{data.site.introduction.secondParagraph}</p>
        </div>
        <blockquote class="course-quote">
          <p>“{data.site.introduction.quote}”</p>
          <cite>
            <span aria-hidden="true">—</span>
            <a href={data.site.introduction.quoteUrl}
              >{data.site.introduction.quoteAttribution}</a
            >
          </cite>
        </blockquote>
      </div>
    </div>
  </section>

  <WeekSchedule schedule={data.site.schedule} />
  <GuestSpeakers guests={data.site.guestSpeakers} />
  <Instructor instructor={data.site.instructor} />
</main>
