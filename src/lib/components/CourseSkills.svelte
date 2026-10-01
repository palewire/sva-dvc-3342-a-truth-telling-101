<script lang="ts">
  import {
    BarChart3,
    Database,
    Hammer,
    Lightbulb,
    Map,
    MessageCircle
  } from '@lucide/svelte';
  import type { CourseContent } from '$lib/types';

  let { skills }: { skills: CourseContent['skills'] } = $props();

  const icons = {
    BarChart3,
    Database,
    Hammer,
    Lightbulb,
    Map,
    MessageCircle
  };
</script>

<section class="skills-section section" aria-labelledby="skills-title">
  <div class="container">
    <div class="section-header">
      <p class="section-kicker">{skills.kicker}</p>
      <h2 id="skills-title">{skills.title}</h2>
    </div>
    <p class="section-intro">{skills.description}</p>
    <div class="course-skills">
      {#each skills.items as skill (skill.title)}
        {@const Icon = icons[skill.icon]}
        <article class="course-skill">
          <div class="skill-content">
            <Icon aria-hidden="true" size={28} strokeWidth={2.25} />
            <h3>{skill.title}</h3>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
