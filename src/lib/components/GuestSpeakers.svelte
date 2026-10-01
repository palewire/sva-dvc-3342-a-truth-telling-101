<script lang="ts">
  import { base } from '$app/paths';
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
        <a
          class="speaker-card"
          href={speaker.workUrl}
          aria-label={'See ' + speaker.name + '’s work'}
        >
          <div class="speaker-portrait">
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
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
