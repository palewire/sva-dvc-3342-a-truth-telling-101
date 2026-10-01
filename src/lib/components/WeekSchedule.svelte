<script lang="ts">
  import { base } from '$app/paths';
  import type { CourseContent } from '$lib/types';

  let { schedule }: { schedule: CourseContent['schedule'] } = $props();
</script>

<section class="schedule-section" id="schedule" aria-labelledby="schedule-title">
  <div class="container">
    <div class="section-header">
      <p class="section-kicker">{schedule.kicker}</p>
      <h2 id="schedule-title">{schedule.title}</h2>
    </div>
    <p class="section-intro">{schedule.note}</p>
    <ol class="week-grid">
      {#each schedule.weeks as week (week.number)}
        <li class="week-card">
          <span class="week-number">Week {String(week.number).padStart(2, '0')}</span>
          <h3><time datetime={week.date}>{week.displayDate}</time></h3>
          <p class="week-topic">
            {#if week.href}
              <a href={base + week.href}>{week.topic}</a>
            {:else}
              {week.topic}
            {/if}
          </p>
        </li>
      {/each}
    </ol>
  </div>
</section>
