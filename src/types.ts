/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isVideo: boolean;
  isPreview: boolean;
}

export interface SyllabusSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructorId: string;
  category: string;
  description: string;
  cover: string;
  tags: string[];
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  price: number;
  originalPrice: number;
  syllabus: SyllabusSection[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialties: string[];
  coursesCount: number;
  bio: string;
  rating: number;
  reviewsCount: number;
}

export interface LearningNode {
  id: string;
  stage: '入門' | '進階' | '應用' | '實戰';
  title: string;
  subtitle: string;
  description: string;
  skillsReached: string[];
  recommendedCourses: string[]; // corresponding course IDs
}

export interface PlatformModule {
  id: string;
  name: string;
  iconName: string; // references lucide icon
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StudyRecord {
  courseId: string;
  lessonId: string;
  progressPercentage: number; // 0 - 100
  lastWatchedAt: string;
  completed: boolean;
}
