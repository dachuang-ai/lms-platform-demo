/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Award, Eye, GraduationCap, Star, BookOpen, MessageSquare } from 'lucide-react';
import { Instructor, Course } from '../types';

interface InstructorDetailModalProps {
  instructor: Instructor;
  courses: Course[];
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
}

export default function InstructorDetailModal({ instructor, courses, onClose, onSelectCourse }: InstructorDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,180,255,0.15)] flex flex-col max-h-[85vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/40">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4.5 h-4.5 text-[#00d2ff]" />
            <h3 className="text-zinc-200 text-xs font-bold font-mono tracking-wider">
              達創講師大師檔案 / INSTRUCTOR DOSSIER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main profile section */}
          <div className="flex flex-col md:flex-row gap-5 md:items-start select-none">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-24 h-24 rounded-2xl object-cover border border-zinc-855 shadow-md flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2 text-xs">
              <div>
                <h4 className="text-lg font-bold text-zinc-100 flex items-center gap-1.5">
                  <span>{instructor.name}</span>
                  <span className="text-[10px] bg-sky-500/10 border border-sky-500/25 text-sky-400 px-1.5 py-0.5 rounded font-mono">
                    達創認證
                  </span>
                </h4>
                <p className="text-[#00d2ff] font-medium font-mono text-[11px] mt-0.5">{instructor.title}</p>
              </div>

              {/* Statistics row */}
              <div className="flex items-center space-x-4 bg-zinc-900/40 border border-zinc-900 px-3 py-1.5 rounded-lg font-mono text-[11px] text-zinc-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-zinc-200 font-bold">{instructor.rating}</span>
                </div>
                <span className="text-zinc-800">|</span>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#00d2ff]" />
                  <span>{instructor.reviewsCount.toLocaleString()} 則評論</span>
                </div>
                <span className="text-zinc-800">|</span>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>{instructor.coursesCount} 門主力課程</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic biography */}
          <div className="space-y-2 text-xs">
            <h5 className="text-zinc-300 font-semibold flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-[#00d2ff]" />
              <span>大師簡介與學術根底</span>
            </h5>
            <p className="text-zinc-400 leading-relaxed text-[13px] bg-zinc-900/10 p-3 rounded-xl border border-zinc-900/60 font-sans">
              {instructor.bio}
            </p>
          </div>

          {/* Specialties list */}
          <div className="space-y-2 text-xs">
            <h5 className="text-zinc-300 font-semibold">核心技術矩陣 & 專精領域</h5>
            <div className="flex flex-wrap gap-1.5">
              {instructor.specialties.map((spec, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-850 font-mono text-[10px]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Instructor's Courses list */}
          <div className="space-y-3 text-xs">
            <h5 className="text-zinc-300 font-semibold mb-2 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-[#00d2ff]" />
              <span>主導之精選課程目錄 ({courses.length})</span>
            </h5>
            
            <div className="space-y-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-3 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-xl border border-zinc-900 flex items-center justify-between group transition-colors select-none"
                >
                  <div className="flex items-center space-x-3 text-left">
                    <img
                      src={course.cover}
                      alt={course.title}
                      className="w-10 h-10 rounded-lg object-cover border border-zinc-850"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h6 className="text-[11px] md:text-xs font-semibold text-zinc-200 line-clamp-1">
                        {course.title}
                      </h6>
                      <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono mt-0.5">
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.lessonsCount} 單元</span>
                        <span>•</span>
                        <span className="text-[#00d2ff]">NT$ {course.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCourse(course);
                      onClose();
                    }}
                    className="flex-shrink-0 px-3 py-1.5 bg-zinc-900 hover:bg-[#0088ff] text-[10px] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 font-medium rounded-lg transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <span>研讀</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
