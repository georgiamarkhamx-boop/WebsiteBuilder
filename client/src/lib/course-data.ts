export interface CourseCategory {
  id: string;
  label: string;
  description: string;
}

export interface CourseTag {
  name: string;
  color: string;
  bgColor: string;
}

export interface CourseBadge {
  type: 'popular' | 'new' | 'advanced';
  text: string;
  className: string;
}

export const courseCategories: CourseCategory[] = [
  {
    id: "all",
    label: "All Courses",
    description: "Browse all available training modules"
  },
  {
    id: "general",
    label: "General Employee",
    description: "Essential security training for all staff members"
  },
  {
    id: "technical",
    label: "Technical Staff",
    description: "Advanced technical security training for IT professionals"
  },
  {
    id: "leadership",
    label: "Leadership",
    description: "Executive and management-level security training"
  },
  {
    id: "compliance",
    label: "Compliance",
    description: "Regulatory compliance and governance training"
  },
  {
    id: "ai_business",
    label: "AI & Business",
    description: "Leverage AI for business growth and competitive advantage"
  },
  {
    id: "founders",
    label: "Tech for Founders",
    description: "Essential technology knowledge for startup founders"
  }
];

export const courseTags: Record<string, CourseTag> = {
  quizzes: {
    name: "Quizzes",
    color: "text-green-800",
    bgColor: "bg-green-100"
  },
  videos: {
    name: "Videos",
    color: "text-blue-800",
    bgColor: "bg-blue-100"
  },
  games: {
    name: "Games",
    color: "text-pink-800",
    bgColor: "bg-pink-100"
  },
  scenarios: {
    name: "Scenarios",
    color: "text-pink-800",
    bgColor: "bg-pink-100"
  },
  simulations: {
    name: "Simulations",
    color: "text-pink-800",
    bgColor: "bg-pink-100"
  },
  certificate: {
    name: "Certificate",
    color: "text-green-800",
    bgColor: "bg-green-100"
  },
  "role-play": {
    name: "Role-play",
    color: "text-pink-800",
    bgColor: "bg-pink-100"
  },
  tutorials: {
    name: "Tutorials",
    color: "text-blue-800",
    bgColor: "bg-blue-100"
  },
  "hands-on": {
    name: "Hands-on",
    color: "text-purple-800",
    bgColor: "bg-purple-100"
  },
  labs: {
    name: "Labs",
    color: "text-purple-800",
    bgColor: "bg-purple-100"
  },
  "case studies": {
    name: "Case Studies",
    color: "text-blue-800",
    bgColor: "bg-blue-100"
  },
  frameworks: {
    name: "Frameworks",
    color: "text-blue-800",
    bgColor: "bg-blue-100"
  },
  templates: {
    name: "Templates",
    color: "text-blue-800",
    bgColor: "bg-blue-100"
  },
  checklists: {
    name: "Checklists",
    color: "text-green-800",
    bgColor: "bg-green-100"
  },
  ttx: {
    name: "TTX",
    color: "text-blue-800",
    bgColor: "bg-blue-100"
  }
};

export const courseBadges: Record<string, CourseBadge> = {
  popular: {
    type: 'popular',
    text: 'Popular',
    className: 'badge-popular'
  },
  new: {
    type: 'new',
    text: 'New',
    className: 'badge-new'
  },
  advanced: {
    type: 'advanced',
    text: 'Advanced',
    className: 'badge-advanced'
  }
};

export const difficultyColors: Record<string, string> = {
  'Beginner': 'text-green-600',
  'Intermediate': 'text-yellow-600',
  'Advanced': 'text-red-600'
};

export const courseIcons: Record<string, string> = {
  'cyber-basics': '🔐',
  'data-protection': '🛡️',
  'remote-work': '🏠',
  'email-security': '📧',
  'social-engineering': '🎭',
  'mobile-security': '📱',
  'secure-development': '💻',
  'ai-security': '🤖',
  'cloud-security': '☁️',
  'incident-leadership': '👔',
  'security-governance': '📊',
  'gdpr-compliance': '📋',
  'iso-27001': '🛡️'
};

/**
 * Get the appropriate badge for a course based on its properties
 */
export function getCourseBadge(course: any): CourseBadge | null {
  if (course.isPopular) return courseBadges.popular;
  if (course.isNew) return courseBadges.new;
  if (course.difficulty === 'Advanced') return courseBadges.advanced;
  return null;
}

/**
 * Get the color classes for a course tag
 */
export function getTagColors(tagName: string): CourseTag {
  const normalizedTag = tagName.toLowerCase();
  return courseTags[normalizedTag] || {
    name: tagName,
    color: "text-gray-800",
    bgColor: "bg-gray-100"
  };
}

/**
 * Filter courses by category
 */
export function filterCoursesByCategory(courses: any[], category: string): any[] {
  if (category === 'all') return courses;
  return courses.filter(course => course.category.includes(category));
}

/**
 * Get course statistics
 */
export function getCourseStats(courses: any[]) {
  return {
    total: courses.length,
    byCategory: {
      general: courses.filter(c => c.category.includes('general')).length,
      technical: courses.filter(c => c.category.includes('technical')).length,
      leadership: courses.filter(c => c.category.includes('leadership')).length,
      compliance: courses.filter(c => c.category.includes('compliance')).length
    },
    byDifficulty: {
      beginner: courses.filter(c => c.difficulty === 'Beginner').length,
      intermediate: courses.filter(c => c.difficulty === 'Intermediate').length,
      advanced: courses.filter(c => c.difficulty === 'Advanced').length
    },
    popular: courses.filter(c => c.isPopular).length,
    new: courses.filter(c => c.isNew).length
  };
}

/**
 * Get average course duration for a category
 */
export function getAverageDuration(courses: any[], category?: string): number {
  const filteredCourses = category ? filterCoursesByCategory(courses, category) : courses;
  if (filteredCourses.length === 0) return 0;
  
  const totalDuration = filteredCourses.reduce((sum, course) => sum + course.duration, 0);
  return Math.round(totalDuration / filteredCourses.length);
}

/**
 * Search courses by title or description
 */
export function searchCourses(courses: any[], query: string): any[] {
  if (!query.trim()) return courses;
  
  const searchTerm = query.toLowerCase();
  return courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm) ||
    course.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * Sort courses by various criteria
 */
export function sortCourses(courses: any[], sortBy: 'title' | 'duration' | 'difficulty' | 'popular'): any[] {
  const sortedCourses = [...courses];
  
  switch (sortBy) {
    case 'title':
      return sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    
    case 'duration':
      return sortedCourses.sort((a, b) => a.duration - b.duration);
    
    case 'difficulty':
      const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      return sortedCourses.sort((a, b) => 
        (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0) - 
        (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0)
      );
    
    case 'popular':
      return sortedCourses.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
    
    default:
      return sortedCourses;
  }
}

/**
 * Get recommended courses based on user's completed courses
 */
export function getRecommendedCourses(
  allCourses: any[], 
  completedCourseIds: number[], 
  userCategory?: string
): any[] {
  const incompleteCourses = allCourses.filter(course => 
    !completedCourseIds.includes(course.id)
  );
  
  // Prioritize courses in user's category
  if (userCategory && userCategory !== 'all') {
    const categoryCourses = filterCoursesByCategory(incompleteCourses, userCategory);
    const otherCourses = incompleteCourses.filter(course => 
      !course.category.includes(userCategory)
    );
    
    // Return category courses first, then popular courses from other categories
    return [
      ...categoryCourses.slice(0, 3),
      ...otherCourses.filter(course => course.isPopular).slice(0, 2)
    ];
  }
  
  // Default recommendation: popular and new courses
  return incompleteCourses
    .filter(course => course.isPopular || course.isNew)
    .slice(0, 5);
}

/**
 * Calculate course completion time estimation
 */
export function getCompletionTimeEstimate(course: any): string {
  const duration = course.duration;
  
  if (duration < 30) return 'Quick read';
  if (duration < 60) return '~1 hour';
  if (duration < 120) return '1-2 hours';
  if (duration < 180) return '2-3 hours';
  return '3+ hours';
}

/**
 * Get course difficulty badge color
 */
export function getDifficultyColor(difficulty: string): string {
  return difficultyColors[difficulty] || 'text-gray-600';
}

/**
 * Format course tags for display
 */
export function formatCourseTags(tags: string[]): string {
  if (!tags || tags.length === 0) return '';
  if (tags.length <= 2) return tags.join(', ');
  return `${tags.slice(0, 2).join(', ')} +${tags.length - 2} more`;
}
