/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, ChevronRight, FileText, Download, CheckCircle2, Tv, Award, ArrowUpRight, Volume2, ShieldAlert } from 'lucide-react';
import { Course, Lesson } from '../types';
import { INSTRUCTORS } from '../data';

interface CoursePlayerModalProps {
  course: Course;
  onClose: () => void;
  onProgressUpdate?: (courseId: string, completedCount: number) => void;
}

export default function CoursePlayerModal({ course, onClose, onProgressUpdate }: CoursePlayerModalProps) {
  // Find instructor
  const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId);

  // Active Lesson state
  const firstLesson = course.syllabus[0]?.lessons[0];
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(firstLesson || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(15); // simulate seconds
  const [videoDuration, setVideoDuration] = useState(240); // 4 minutes mock
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [videoQuality, setVideoQuality] = useState('1080P');
  const [studentNote, setStudentNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>(() => {
    const cached = localStorage.getItem(`notes_${course.id}`);
    return cached ? JSON.parse(cached) : [];
  });

  // Track completed lessons of this session only
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const cached = localStorage.getItem(`completed_${course.id}`);
    return cached ? JSON.parse(cached) : [];
  });

  // Floating Watermark position simulation
  const [watermarkCoords, setWatermarkCoords] = useState({ top: '25%', left: '15%' });

  useEffect(() => {
    // Save state
    localStorage.setItem(`completed_${course.id}`, JSON.stringify(completedLessonIds));
    if (onProgressUpdate) {
      onProgressUpdate(course.id, completedLessonIds.length);
    }
  }, [completedLessonIds, course.id, onProgressUpdate]);

  useEffect(() => {
    // Watermark interval
    const interval = setInterval(() => {
      const topPct = Math.floor(Math.random() * 60) + 15;
      const leftPct = Math.floor(Math.random() * 60) + 15;
      setWatermarkCoords({ top: `${topPct}%`, left: `${leftPct}%` });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Play video mock timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= videoDuration) {
            // mark current active lesson as completed!
            if (activeLesson && !completedLessonIds.includes(activeLesson.id)) {
              setCompletedLessonIds((c) => [...c, activeLesson.id]);
            }
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeLesson, completedLessonIds, videoDuration]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setPlaybackTime(Math.floor(Math.random() * 20) + 5);
    setIsPlaying(false);
  };

  const handleToggleComplete = (lessonId: string) => {
    if (completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((c) => c.filter((id) => id !== lessonId));
    } else {
      setCompletedLessonIds((c) => [...c, lessonId]);
    }
  };

  const handleSaveNote = () => {
    if (!studentNote.trim() || !activeLesson) return;
    const formatted = `[${activeLesson.title}] (已存檔): ${studentNote}`;
    const nextNotes = [...savedNotes, formatted];
    setSavedNotes(nextNotes);
    localStorage.setItem(`notes_${course.id}`, JSON.stringify(nextNotes));
    setStudentNote('');
  };

  const handleDeleteNote = (index: number) => {
    const nextNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(nextNotes);
    localStorage.setItem(`notes_${course.id}`, JSON.stringify(nextNotes));
  };

  const totalLessons = course.syllabus.flatMap((s) => s.lessons).length;
  const progressPercent = Math.min(
    100,
    Math.round((completedLessonIds.length / totalLessons) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,136,255,0.15)]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/60 border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 text-xs font-semibold tracking-wider text-[#00d2ff] bg-[#00d2ff]/10 rounded border border-[#00d2ff]/20 font-mono">
              {course.category}
            </span>
            <h2 className="text-base md:text-lg font-semibold text-zinc-100 truncate max-w-[250px] md:max-w-[450px]">
              {course.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 bg-zinc-900 border border-zinc-700 hover:border-[#00d2ff] text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          
          {/* Main Left Pane - Video Player + Note Taking */}
          <div className="lg:col-span-2 flex flex-col h-full overflow-y-auto no-scrollbar border-r border-zinc-900">
            
            {/* Visual Screen Container */}
            <div className="relative aspect-video w-full bg-black/80 flex flex-col items-center justify-center group overflow-hidden border-b border-zinc-900">
              
              {/* Dynamic Protective Watermark */}
              <div
                style={{
                  top: watermarkCoords.top,
                  left: watermarkCoords.left,
                }}
                className="absolute pointer-events-none text-[10px] md:text-xs font-mono select-none text-zinc-700/25 tracking-widest uppercase transition-all duration-1000 z-10 whitespace-nowrap bg-zinc-900/5 px-1.5 rounded"
              >
                達創 AI 安全授權: DACHUANG_LMS_{course.id.toUpperCase()}_MEMBER
              </div>

              {isPlaying ? (
                // Video Playback Simulation Canvas
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-zinc-950 via-zinc-900 to-[#001533]/40">
                  {/* Cyber grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  {/* Waveform / Visualiser bar */}
                  <div className="flex items-end justify-center space-x-1.5 h-16 mb-4 z-10 w-full px-12">
                    {[35, 60, 45, 80, 95, 70, 50, 85, 40, 65, 80, 55, 90, 75, 40].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: isPlaying ? [h * 0.4, h, h * 0.4] : h * 0.5 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2 + i * 0.08,
                          ease: 'easeInOut',
                        }}
                        style={{ width: '4px' }}
                        className="bg-gradient-to-t from-[#0055ff] to-[#00d2ff] rounded-t"
                      />
                    ))}
                  </div>

                  {/* Telemetry metadata overlay */}
                  <div className="absolute top-4 left-6 text-[10px] font-mono text-zinc-500 tracking-wider flex items-center space-x-3 bg-black/50 p-2 rounded border border-zinc-800">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>D_STREAM_DECODED: OK</span>
                    <span>HD 1080P PRO</span>
                  </div>

                  <span className="text-zinc-400 text-sm font-light select-none tracking-wide text-center px-6">
                    正在放映「{activeLesson?.title}」
                  </span>
                </div>
              ) : (
                // Poster / Idle screen
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-zinc-950/90 relative">
                  <img
                    src={course.cover}
                    alt="Course Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[2px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 select-none" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTogglePlay}
                    className="z-10 p-5 bg-[#0088ff] hover:bg-[#00b0ff] text-white rounded-full inset-0 shadow-[0_0_25px_rgba(0,136,255,0.4)] cursor-pointer hover:shadow-[0_0_35px_rgba(0,210,255,0.6)] transition-all"
                  >
                    <Play className="w-8 h-8 fill-current" />
                  </motion.button>
                  <p className="mt-4 text-xs font-mono tracking-widest text-[#00d2ff]/80 uppercase z-10 bg-black/40 px-3 py-1 rounded border border-[#00d2ff]/20">
                    模擬高級影片轉碼流
                  </p>
                </div>
              )}

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent flex flex-col space-y-2 select-none z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                {/* Timeline Bar */}
                <div className="relative w-full h-1 bg-zinc-800 rounded-full cursor-pointer h-1.5 hover:h-2 transition-all">
                  <div
                    style={{ width: `${(playbackTime / videoDuration) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#0055ff] to-[#00d2ff] rounded-full relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow" />
                  </div>
                </div>

                {/* Left/Right Controls Row */}
                <div className="flex items-center justify-between text-zinc-300 text-xs font-mono">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={handleTogglePlay}
                      className="hover:text-[#00d2ff] cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <div className="flex items-center space-x-1.5 text-[11px]">
                      <span>{Math.floor(playbackTime / 60)}:{String(playbackTime % 60).padStart(2, '0')}</span>
                      <span className="text-zinc-650">/</span>
                      <span>4:00</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-zinc-500">
                      <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-[10px]">自動</span>
                    </div>

                    {/* Speed selection */}
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(e.target.value)}
                      className="bg-zinc-900 border border-zinc-850 px-1 py-0.5 rounded text-[10px] text-zinc-300 focus:outline-none"
                    >
                      <option>0.8x</option>
                      <option>1.0x</option>
                      <option>1.25x</option>
                      <option>1.5x</option>
                      <option>2.0x</option>
                    </select>

                    {/* Quality selection */}
                    <span className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] text-zinc-400 border border-zinc-850 font-bold select-none cursor-pointer hover:border-[#00d2ff]">
                      {videoQuality}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note taking workspace */}
            <div className="p-6 flex-1 flex flex-col bg-zinc-950 divide-y divide-zinc-900">
              <div className="pb-5">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-sm font-medium text-zinc-300 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#00d2ff]" />
                    <span>學習筆記本與自主摘要</span>
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">本端暫存可用</span>
                </div>
                <textarea
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder={`在此單元「${activeLesson?.title || '未點選'}」記錄下您的專業想法...隨後儲存備妥。`}
                  className="w-full h-24 bg-zinc-900/40 border border-zinc-800 focus:border-[#00d2ff]/60 focus:ring-1 focus:ring-[#00d2ff]/30 text-zinc-200 text-sm p-3 rounded-xl resize-none placeholder-zinc-650 focus:outline-none transition-all"
                />
                <div className="mt-2.5 flex justify-end">
                  <button
                    onClick={handleSaveNote}
                    disabled={!studentNote.trim()}
                    className="px-4 py-1.5 bg-[#0088ff] hover:bg-[#00aaff] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-850 disabled:cursor-not-allowed border border-[#0088ff]/10 text-white rounded-lg text-xs font-medium flex items-center space-x-1.5 cursor-pointer shadow-[0_2px_8px_rgba(0,136,255,0.2)] transition-colors"
                  >
                    <span>儲存此筆記</span>
                  </button>
                </div>
              </div>

              {/* Saved notes section */}
              <div className="pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3.5">
                  已保存的主題筆記 ({savedNotes.length})
                </h4>
                {savedNotes.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic">目前尚未儲存任何隨堂手記</p>
                ) : (
                  <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
                    {savedNotes.map((note, index) => (
                      <div
                        key={index}
                        className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-850 flex items-start justify-between group"
                      >
                        <p className="text-xs text-zinc-300 select-all leading-relaxed whitespace-pre-wrap break-all pr-2">
                          {note}
                        </p>
                        <button
                          onClick={() => handleDeleteNote(index)}
                          className="p-1 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Syllabus Scroll & Lesson Select */}
          <div className="flex flex-col h-full bg-zinc-900/10 overflow-y-auto no-scrollbar">
            
            {/* Real Progress Dial */}
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400 font-medium">觀看與測驗進度</span>
                <span className="text-xs text-[#00d2ff] font-mono font-bold">
                  {completedLessonIds.length} / {totalLessons} 單元 ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-[#0055ff] to-[#00d2ff] rounded-full transition-all duration-500"
                />
              </div>

              {progressPercent === 100 && (
                <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center space-x-2 text-emerald-400 text-[11px]">
                  <Award className="w-4 h-4 flex-shrink-0 animate-bounce" />
                  <span>您已完成所有課程！可至頁尾聯絡我們申請證書</span>
                </div>
              )}
            </div>

            {/* Syllabus Sections */}
            <div className="p-4 flex-1 space-y-4">
              {course.syllabus.map((section, sIdx) => (
                <div key={section.id} className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-zinc-400 tracking-wide px-1.5 pb-1 select-none flex items-center justify-between">
                    <span>{section.title}</span>
                    <span className="text-[10px] text-zinc-550 font-normal">
                      單元 {section.lessons.length}
                    </span>
                  </h4>
                  
                  <div className="space-y-1">
                    {section.lessons.map((lesson) => {
                      const isActive = activeLesson?.id === lesson.id;
                      const isCompleted = completedLessonIds.includes(lesson.id);
                      
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleLessonSelect(lesson)}
                          className={`group w-full p-3 rounded-lg flex items-center justify-between outline-none cursor-pointer transition-all duration-150 ${
                            isActive
                              ? 'bg-[#0088ff]/10 border border-[#0088ff]/35 shadow-[0_1px_10px_rgba(0,100,255,0.05)]'
                              : 'bg-zinc-950/40 border border-zinc-900/60 hover:bg-zinc-900/60 hover:border-zinc-800'
                          }`}
                        >
                          <div className="flex items-center space-x-3.5 pr-1 text-left truncate min-w-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleComplete(lesson.id);
                              }}
                              className="focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-zinc-950 focus:ring-[#00d2ff] rounded-full"
                            >
                              <CheckCircle2
                                className={`w-4 h-4 transition-colors ${
                                  isCompleted
                                    ? 'text-emerald-400 fill-emerald-400/10'
                                    : 'text-zinc-700 hover:text-zinc-500'
                                }`}
                              />
                            </button>
                            <div className="truncate text-xs">
                              <p
                                className={`truncate transition-colors ${
                                  isActive
                                    ? 'text-[#00d2ff] font-medium'
                                    : 'text-zinc-300 group-hover:text-white'
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {lesson.duration} • 視訊單元
                              </span>
                            </div>
                          </div>

                          <ChevronRight
                            className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                              isActive ? 'text-[#00d2ff] translate-x-0.5' : 'text-zinc-650 group-hover:text-zinc-400'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Instructor Footer Card */}
            {instructor && (
              <div className="m-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-850">
                <div className="flex items-center space-x-3 mb-2.5">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-9 h-9 rounded-full object-cover border border-zinc-750"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-zinc-200">{instructor.name}</h5>
                    <p className="text-[10px] text-zinc-450 truncate">{instructor.title}</p>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed truncate-2-lines">
                  {instructor.bio}
                </p>
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
}
