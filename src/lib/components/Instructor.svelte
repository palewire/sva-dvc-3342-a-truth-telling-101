<script lang="ts">
  import { initials } from '$lib/initials';
  import type { CourseContent } from '$lib/types';

  let { instructor }: { instructor: CourseContent['instructor'] } = $props();
</script>

<section
  class="instructor-section section"
  id="instructor"
  aria-labelledby="instructor-title"
>
  <div class="container">
    <div class="section-header">
      <p class="section-kicker">{instructor.kicker}</p>
      <h2 id="instructor-title">{instructor.title}</h2>
    </div>
    <div class="instructor-profile">
      <div class="instructor-avatar" aria-hidden="true">{initials(instructor.name)}</div>
      <div class="instructor-details">
        <h3>{instructor.name}</h3>
        <p class="instructor-affiliation">{instructor.role}</p>
        <p>{instructor.bio}</p>
        <a href={instructor.profileUrl}
          >{instructor.profileLabel} <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
  </div>
</section>
