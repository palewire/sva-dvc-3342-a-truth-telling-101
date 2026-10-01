<script lang="ts">
  import type { CourseContent } from '$lib/types';

  let {
    course,
    instructor
  }: {
    course: CourseContent['course'];
    instructor: CourseContent['instructor'];
  } = $props();

  let title = $derived.by(() => {
    const separator = course.title.indexOf(':');
    return {
      lead: separator < 0 ? course.title : course.title.slice(0, separator + 1),
      end: separator < 0 ? '' : course.title.slice(separator + 1).trim()
    };
  });
</script>

<section class="hero" aria-labelledby="course-title">
  <div class="container hero-main">
    <div class="hero-copy">
      <p class="hero-kicker">
        {course.term} <span aria-hidden="true">/</span>
        {course.code}
      </p>
      <h1 id="course-title">
        <span>{title.lead}</span>
        {#if title.end}<span class="hero-title-accent">{title.end}</span>{/if}
      </h1>
      <p class="hero-proposition">{course.proposition}</p>
    </div>
  </div>

  <div class="hero-meta-wrap">
    <div class="container hero-meta" aria-label="Class at a glance">
      <div class="hero-meta-item">
        <span class="meta-label">Instructor</span>
        <strong><a href={instructor.profileUrl}>{instructor.name}</a></strong>
        <span>{instructor.role}</span>
      </div>
      <div class="hero-meta-item">
        <span class="meta-label">{course.meetingLabel}</span>
        <strong>{course.dateRange}</strong>
        <span>{course.time}</span>
      </div>
      <div class="hero-meta-item">
        <span class="meta-label">Format</span>
        <strong>{course.format}</strong>
      </div>
    </div>
  </div>
</section>
