<script lang="ts">
  import type { CourseContent } from '$lib/types';

  let {
    course,
    instructor
  }: {
    course: CourseContent['course'];
    instructor: CourseContent['instructor'];
  } = $props();
</script>

<section class="hero" aria-labelledby="course-title">
  <div class="container hero-main">
    <div class="hero-copy">
      <p class="hero-kicker">
        {course.term} <span aria-hidden="true">/</span>
        {course.code}
      </p>
      <h1 id="course-title">Truth-Telling 101</h1>
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
        <span class="meta-label">Location</span>
        <strong>{course.location}</strong>
        <span>{course.room}</span>
      </div>
    </div>
  </div>
</section>
