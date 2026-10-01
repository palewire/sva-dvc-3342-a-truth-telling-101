export interface CourseContent {
  meta: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imageWidth: string;
    imageHeight: string;
  };
  course: {
    title: string;
    code: string;
    school: string;
    schoolUrl: string;
    program: string;
    programUrl: string;
    term: string;
    proposition: string;
    meetingLabel: string;
    dateRange: string;
    time: string;
    format: string;
    location: string;
    room: string;
    officialUrl: string;
    officialLinkLabel: string;
  };
  introduction: {
    kicker: string;
    title: string;
    firstParagraph: string;
    secondParagraph: string;
    quote: string;
    quoteAttribution: string;
  };
  skills: {
    kicker: string;
    title: string;
    description: string;
    items: CourseSkill[];
  };
  schedule: {
    kicker: string;
    title: string;
    note: string;
    weeks: Week[];
  };
  guestSpeakers: {
    kicker: string;
    title: string;
    description: string;
    speakers: GuestSpeaker[];
  };
  instructor: {
    kicker: string;
    title: string;
    description: string;
    name: string;
    role: string;
    bio: string;
    email: string;
    profileUrl: string;
    photo?: string;
  };
}

export interface Week {
  number: number;
  date: string;
  displayDate: string;
  topic: string;
  href?: string;
}

export interface GuestSpeaker {
  name: string;
  newsroom: string;
  workUrl: string;
  photo?: string;
}

export type CourseSkillIcon =
  'Lightbulb' | 'Database' | 'Hammer' | 'BarChart3' | 'Map' | 'MessageCircle';

export interface CourseSkill {
  title: string;
  icon: CourseSkillIcon;
}
