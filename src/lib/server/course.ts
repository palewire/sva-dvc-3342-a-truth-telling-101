import { load } from 'js-yaml';
import type { CourseContent, GuestSpeaker, Week } from '$lib/types';

const homepageFiles = import.meta.glob<string>('/src/content/homepage.yaml', {
  eager: true,
  import: 'default',
  query: '?raw'
});
const publishedWeekPages = import.meta.glob('/src/content/weeks/*.svx');

function object(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(label + ' must be an object in homepage.yaml');
  }
  return value as Record<string, unknown>;
}

function string(data: Record<string, unknown>, key: string, label: string): string {
  const value = data[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(label + '.' + key + ' must be nonempty in homepage.yaml');
  }
  return value;
}

function optionalString(
  data: Record<string, unknown>,
  key: string,
  label: string
): string | undefined {
  const value = data[key];
  if (value === undefined) return undefined;
  return string(data, key, label);
}

function array(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(label + ' must be a list in homepage.yaml');
  }
  return value;
}

/** Read the single editorial source and reject broken schedule links at build time. */
export function loadCourse(): CourseContent {
  const source = homepageFiles['/src/content/homepage.yaml'];
  if (!source) throw new Error('src/content/homepage.yaml is missing');

  const root = object(load(source), 'homepage');
  const meta = object(root.meta, 'meta');
  const course = object(root.course, 'course');
  const introduction = object(root.introduction, 'introduction');
  const schedule = object(root.schedule, 'schedule');
  const guestSpeakers = object(root.guestSpeakers, 'guestSpeakers');
  const instructor = object(root.instructor, 'instructor');
  const footer = object(root.footer, 'footer');
  const instructorPhoto = optionalString(instructor, 'photo', 'instructor');

  const weeks: Week[] = array(schedule.weeks, 'schedule.weeks').map((item, index) => {
    const week = object(item, 'schedule.weeks[' + index + ']');
    const number = week.number;
    if (typeof number !== 'number' || !Number.isInteger(number) || number !== index + 1) {
      throw new Error('Schedule week numbers must run from 1 through 6');
    }
    const href = optionalString(week, 'href', 'schedule.weeks[' + index + ']');
    if (href) {
      const expectedHref = '/weeks/week-' + number + '/';
      const pagePath = '/src/content/weeks/week-' + number + '.svx';
      if (href !== expectedHref || !publishedWeekPages[pagePath]) {
        throw new Error(
          'Week ' + number + ' links to a page that is not published: ' + href
        );
      }
    }
    return {
      number,
      date: string(week, 'date', 'schedule.weeks[' + index + ']'),
      displayDate: string(week, 'displayDate', 'schedule.weeks[' + index + ']'),
      topic: string(week, 'topic', 'schedule.weeks[' + index + ']'),
      ...(href ? { href } : {})
    };
  });
  if (weeks.length !== 6) throw new Error('The schedule must contain six weeks');

  const speakers: GuestSpeaker[] = array(
    guestSpeakers.speakers,
    'guestSpeakers.speakers'
  ).map((item, index) => {
    const guest = object(item, 'guestSpeakers.speakers[' + index + ']');
    const photo = optionalString(guest, 'photo', 'guestSpeakers.speakers[' + index + ']');
    return {
      name: string(guest, 'name', 'guestSpeakers.speakers[' + index + ']'),
      newsroom: string(guest, 'newsroom', 'guestSpeakers.speakers[' + index + ']'),
      workUrl: string(guest, 'workUrl', 'guestSpeakers.speakers[' + index + ']'),
      ...(photo ? { photo } : {})
    };
  });

  return {
    meta: {
      title: string(meta, 'title', 'meta'),
      description: string(meta, 'description', 'meta')
    },
    course: {
      title: string(course, 'title', 'course'),
      code: string(course, 'code', 'course'),
      school: string(course, 'school', 'course'),
      program: string(course, 'program', 'course'),
      term: string(course, 'term', 'course'),
      proposition: string(course, 'proposition', 'course'),
      meetingLabel: string(course, 'meetingLabel', 'course'),
      dateRange: string(course, 'dateRange', 'course'),
      time: string(course, 'time', 'course'),
      format: string(course, 'format', 'course'),
      location: string(course, 'location', 'course'),
      room: string(course, 'room', 'course'),
      officialUrl: string(course, 'officialUrl', 'course'),
      officialLinkLabel: string(course, 'officialLinkLabel', 'course')
    },
    introduction: {
      kicker: string(introduction, 'kicker', 'introduction'),
      title: string(introduction, 'title', 'introduction'),
      firstParagraph: string(introduction, 'firstParagraph', 'introduction'),
      secondParagraph: string(introduction, 'secondParagraph', 'introduction'),
      quote: string(introduction, 'quote', 'introduction'),
      quoteAttribution: string(introduction, 'quoteAttribution', 'introduction')
    },
    schedule: {
      kicker: string(schedule, 'kicker', 'schedule'),
      title: string(schedule, 'title', 'schedule'),
      note: string(schedule, 'note', 'schedule'),
      weeks
    },
    guestSpeakers: {
      kicker: string(guestSpeakers, 'kicker', 'guestSpeakers'),
      title: string(guestSpeakers, 'title', 'guestSpeakers'),
      description: string(guestSpeakers, 'description', 'guestSpeakers'),
      speakers
    },
    instructor: {
      kicker: string(instructor, 'kicker', 'instructor'),
      title: string(instructor, 'title', 'instructor'),
      name: string(instructor, 'name', 'instructor'),
      role: string(instructor, 'role', 'instructor'),
      bio: string(instructor, 'bio', 'instructor'),
      email: string(instructor, 'email', 'instructor'),
      profileUrl: string(instructor, 'profileUrl', 'instructor'),
      ...(instructorPhoto ? { photo: instructorPhoto } : {})
    },
    footer: {
      note: string(footer, 'note', 'footer')
    }
  };
}
