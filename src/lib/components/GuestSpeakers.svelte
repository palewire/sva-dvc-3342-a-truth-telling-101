<script lang="ts">
  import { base } from '$app/paths';
  import { initials } from '$lib/initials';
  import type { CourseContent } from '$lib/types';

  let { guests }: { guests: CourseContent['guestSpeakers'] } = $props();
</script>

<section class="guests-section section" id="guests" aria-labelledby="guests-title">
  <div class="container">
    <div class="section-header">
      <p class="section-kicker">{guests.kicker}</p>
      <h2 id="guests-title">{guests.title}</h2>
    </div>
    <p class="section-intro">{guests.description}</p>

    <div class="speakers-grid">
      {#each guests.speakers as speaker (speaker.name)}
        <article class="speaker-card">
          <div class="speaker-portrait">
            <span class="portrait-initials" aria-hidden="true"
              >{initials(speaker.name)}</span
            >
            {#if speaker.photo}
              <img
                src={base + '/speakers/' + speaker.photo}
                alt=""
                loading="lazy"
                onerror={(event) => {
                  event.currentTarget.setAttribute('hidden', '');
                }}
              />
            {/if}
          </div>
          <div class="speaker-info">
            <h3>{speaker.name}</h3>
            <p>{speaker.newsroom}</p>
            <a href={speaker.workUrl} aria-label={'See ' + speaker.name + '’s work'}
              >View work <span aria-hidden="true">↗</span></a
            >
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
