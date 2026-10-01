import { loadCourse } from '$lib/server/course';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({ site: loadCourse() });
