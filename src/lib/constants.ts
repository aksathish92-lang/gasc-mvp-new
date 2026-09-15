import type { Course } from '@/types';

export const COLLEGE = {
  name: 'Government Arts and Science College',
  shortName: 'GASC Melvenkatapuram',
  location: 'Melvenkatapuram',
  district: 'Ranipet District',
  state: 'Tamil Nadu',
  taluk: 'Sholinghur Taluk',
  affiliation: 'Thiruvalluvar University, Vellore',
  established: '2020',
  address: [
    'Government Arts and Science College, Melvenkatapuram',
    'Walajah–Sholinghur Road,',
    'Near Jambukulam Coot Road,',
    'Sholinghur Taluk,',
    'Ranipet District – 631 102,',
    'Tamil Nadu.',
  ],
  emails: ['onesemabroad@gascmvp.in', 'gascsholinghur@gmail.com'],
  website: 'https://gascmvp.in/',
};

export const COURSES: Course[] = [
  {
    id: 'ba-tamil',
    name: 'B.A. Tamil',
    degreeType: 'Bachelor of Arts',
    description: 'A programme focused on Tamil language, literature, and cultural heritage.',
    iconName: 'BookOpen',
  },
  {
    id: 'ba-english',
    name: 'B.A. English',
    degreeType: 'Bachelor of Arts',
    description: 'A programme centred on English literature, language, and communication skills.',
    iconName: 'Languages',
  },
  {
    id: 'bcom',
    name: 'B.Com.',
    degreeType: 'Bachelor of Commerce',
    description: 'A programme covering foundational commerce, accounting, and business studies.',
    iconName: 'Calculator',
  },
  {
    id: 'bsc-maths',
    name: 'B.Sc. Mathematics',
    degreeType: 'Bachelor of Science',
    description: 'A programme in mathematical sciences, analysis, and quantitative reasoning.',
    iconName: 'Sigma',
  },
  {
    id: 'bsc-cs',
    name: 'B.Sc. Computer Science',
    degreeType: 'Bachelor of Science',
    description: 'A programme in computing, programming fundamentals, and information technology.',
    iconName: 'Cpu',
  },
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Courses', path: '/courses' },
  { label: 'Admission', path: '/admission' },
  { label: 'Student Corner', path: '/student-corner' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];
