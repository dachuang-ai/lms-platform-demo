/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Search,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  ChevronDown,
  Cpu,
  Layers,
  Award,
  HelpCircle,
  PlayCircle,
  ExternalLink,
  ShieldCheck,
  Check,
  Zap
} from 'lucide-react';

// Shared Core Components & Data
import { INSTRUCTORS, CATEGORIES, COURSES, LEARNING_PATH, PLATFORM_MODULES, MEMBERSHIP_PLANS, FAQS } from './data';
import { Course, Instructor, LearningNode, MembershipPlan } from './types';
import TargetCursor from './components/TargetCursor';
import CoursePlayerModal from './components/CoursePlayerModal';
import PurchaseModal from './components/PurchaseModal';
import InstructorDetailModal from './components/InstructorDetailModal';

export default function App() {
  // Navigation & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Flows State
  const [activePlayerCourse, setActivePlayerCourse] = useState<Course | null>(null);
  const [activeInstructor, setActiveInstructor] = useState<Instructor | null>(null);
  const [activePurchase, setActivePurchase] = useState<{ item: Course | MembershipPlan; type: 'course' | 'plan' } | null>(null);

  // Growth Orbit Timeline State
  const [selectedPathNode, setSelectedPathNode] = useState<LearningNode>(LEARNING_PATH[0]);

  // Collapsible FAQ states
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // High feedback states: track items purchased during this session (simulating database)
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>(() => {
    const cached = localStorage.getItem('session_purchased_courses');
    return cached ? JSON.parse(cached) : ['course-1']; // Let pre-own course-1 to play immediately
  });

  const [purchasedPlanIds, setPurchasedPlanIds] = useState<string[]>(() => {
    const cached = localStorage.getItem('session_purchased_plans');
    return cached ? JSON.parse(cached) : [];
  });

  // Keep track of lesson completion progress per course in real-time
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, number>>(() => {
    const progress: Record<string, number> = {};
    COURSES.forEach((c) => {
      const cached = localStorage.getItem(`completed_${c.id}`);
      if (cached) {
        progress[c.id] = JSON.parse(cached).length;
      } else {
        progress[c.id] = c.id === 'course-1' ? 2 : 0; // pre-complete some for course-1
      }
    });
    return progress;
  });

  // Simulated live platform log ticker in hero panel
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const [platformLogs, setPlatformLogs] = useState<string[]>([
    'SEC_LOG: TLS v1.3 handshake successful with dachuang-gateway',
    'LMS_ENGINE: Multi-Tenant Instructor dashboard mounted.',
    'METRIC: Connected students currently online: 1,482',
    'API_CORE: Kong router rules successfully cached in memory',
    'AUTH_SERVER: SSO JWT key rotation executed on 10.0.8.2',
  ]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setHeroActiveIndex((prev) => (prev + 1) % platformLogs.length);
    }, 4500);
    return () => clearInterval(logInterval);
  }, [platformLogs.length]);

  // Persist local custom purchases
  const handlePurchaseSuccess = (id: string, type: 'course' | 'plan') => {
    if (type === 'course') {
      const updated = [...purchasedCourseIds, id];
      setPurchasedCourseIds(updated);
      localStorage.setItem('session_purchased_courses', JSON.stringify(updated));
    } else {
      const updated = [...purchasedPlanIds, id];
      setPurchasedPlanIds(updated);
      localStorage.setItem('session_purchased_plans', JSON.stringify(updated));
    }
  };

  const handleProgressUpdate = (courseId: string, completedCount: number) => {
    setCourseProgressMap((prev) => ({
      ...prev,
      [courseId]: completedCount,
    }));
  };

  // Dynamic filter lists
  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Unified course request click coordinator (Goes to player if owned, else opens purchase)
  const handleCourseRequest = (course: Course) => {
    const isOwned = purchasedCourseIds.includes(course.id) || purchasedPlanIds.length > 0;
    if (isOwned) {
      setActivePlayerCourse(course);
    } else {
      setActivePurchase({ item: course, type: 'course' });
    }
  };

  // Styled logo based on the provided image guidelines
  const RenderDachuangLogo = ({ className = 'h-8' }: { className?: string }) => (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Upward Delta Electric Arrow SVG Inspired by the uploaded image */}
      <svg className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(0,180,255,0.4)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Layered metal gray background paths */}
        <path d="M22 65L45 42L35 32L12 55L22 65Z" fill="url(#metalGrad)" className="opacity-80" />
        <path d="M54 75L78 51L68 41L44 65L54 75Z" fill="url(#metalGrad)" className="opacity-85" />
        
        {/* Main striking upward sharp arrow */}
        <path d="M38 85L70 12L76 18L44 91L38 85Z" fill="url(#metalGrad)" />
        
        {/* Glowing electric blue lasers and circuit indicators */}
        <path d="M36 82L68 15" stroke="#00d2ff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 88L74 21" stroke="#0055ff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M48 94L78 28" stroke="#00ffff" strokeWidth="0.8" strokeLinecap="round" />
        {/* Nodes */}
        <circle cx="68" cy="15" r="2" fill="#fff" className="animate-pulse" />
        <circle cx="74" cy="21" r="1.5" fill="#00d2ff" />
        
        <defs>
          {/* Metallic gradient */}
          <linearGradient id="metalGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2e2e33" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#718096" />
            <stop offset="75%" stopColor="#cbd5e0" />
            <stop offset="100%" stopColor="#1a202c" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-sm font-bold tracking-widest text-[#f5f5f7] font-sans">達創智能科技</span>
        <span className="text-[10px] font-mono tracking-wider text-[#00d2ff] font-bold mt-0.5">AI COURSES</span>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-300 font-sans antialiased overflow-x-hidden bg-grid-cyber">
      
      {/* Precision desktop target cursor target follow */}
      <TargetCursor />

      {/* Background Ambience Globs - Soft transitions */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[550px] bg-gradient-to-br from-[#0052cc]/10 to-transparent rounded-full filter blur-[150px] pointer-events-none select-none" />
      <div className="absolute top-[1200px] right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-[#00d2ff]/5 to-transparent rounded-full filter blur-[130px] pointer-events-none select-none" />
      <div className="absolute bottom-[200px] left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#0033aa]/8 to-transparent rounded-full filter blur-[160px] pointer-events-none select-none" />

      {/* Top Header Navigation */}
      <nav id="header-nav" className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <RenderDachuangLogo />
          
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#categories-section" className="text-zinc-400 hover:text-[#00d2ff] transition-colors">精選分類</a>
            <a href="#courses-section" className="text-zinc-400 hover:text-[#00d2ff] transition-colors">課程目錄</a>
            <a href="#instructors-section" className="text-zinc-400 hover:text-[#00d2ff] transition-colors">金牌名師</a>
            <a href="#timeline-section" className="text-zinc-400 hover:text-[#00d2ff] transition-colors">學習路徑</a>
            <a href="#modules-section" className="text-zinc-400 hover:text-[#00d2ff] transition-colors">功能模組</a>
            <a href="#membership-section" className="text-zinc-400 hover:text-[#00d2ff] transition-colors">方案權限</a>
          </div>

          <div className="flex items-center space-x-3">
            {purchasedPlanIds.length > 0 || purchasedCourseIds.length > 1 ? (
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>學員帳戶：尊榮無限觀看</span>
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs font-mono text-zinc-500 bg-zinc-900/60 border border-zinc-800 px-2 py-1 rounded-md hidden sm:inline-block">
                模擬登入：學員_Guest
              </span>
            )}
            <a
              href="#membership-section"
              className="px-4 py-2 bg-[#0088ff] hover:bg-[#00b0ff] text-white text-xs font-semibold rounded-lg font-mono relative overflow-hidden group transition-all"
            >
              <span className="relative z-10 flex items-center gap-1">
                免費試購體驗 <Sparkles className="w-3.5 h-3.5" />
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Head Section */}
      <header className="relative py-16 md:py-24 border-b border-zinc-910">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero texts */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full select-none">
              <span className="flex h-2 w-2 rounded-full bg-[#00d2ff] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider font-semibold text-[#00d2ff]">
                KNOWLEDGE ORBIT PRO
              </span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Knowledge Orbit <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-zinc-200 to-[#0055ff] font-sans">
                  智慧學習平台 Demo
                </span>
              </h1>
              <p className="text-md sm:text-lg font-medium text-zinc-300 leading-relaxed max-w-xl">
                以科技重新設計學習體驗，<br className="hidden sm:inline" />
                整合課程、教師、會員與內容管理流程。
              </p>
            </div>

            <p className="text-sm md:text-base text-zinc-400 max-w-lg leading-relaxed">
              達創協助教育品牌與知識型企業，打造可上架課程、管理教師、經營會員與整合金流的智能學習平台。
            </p>

            {/* Action buttons row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#courses-section"
                className="px-5 py-3.5 bg-[#0088ff] hover:bg-[#00aaff] text-white text-sm font-semibold rounded-xl flex items-center space-x-2 group cursor-pointer relative overflow-hidden transition-all shadow-[0_4px_14px_rgba(0,136,255,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  探索課程平台 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep" />
              </a>
              <a
                href="#modules-section"
                className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-300 text-sm font-semibold rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                查看功能模組
              </a>
            </div>
          </div>

          {/* Right Hero Interface Simulator */}
          <div className="lg:col-span-5 relative w-full">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#0055ff]/20 to-[#00d2ff]/20 opacity-30 blur-lg" />
            
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl overflow-hidden">
              {/* Inner terminal window control dots */}
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/65" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/65" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/65" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  DACHUANG_CORE_TELEMETRY
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Dynamic ticker state screen */}
              <div className="py-4 space-y-3 font-mono text-[11px] text-left">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>系統狀態: 運作中</span>
                  <span>FPS: 60.00</span>
                </div>
                
                <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-850 min-h-[44px] flex items-center">
                  <motion.p
                    key={heroActiveIndex}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[#00d2ff]"
                  >
                    🚀 {platformLogs[heroActiveIndex]}
                  </motion.p>
                </div>
                
                {/* Simulated course player box with interaction */}
                <div className="p-3.5 bg-black/60 rounded-xl border border-zinc-900 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-450 uppercase font-mono">當前熱門指標課程</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">NEW</span>
                  </div>
                  <h5 className="text-zinc-200 text-[11px] font-semibold tracking-wide">
                    AI Agent 系統思維與多智能體協作架構實戰
                  </h5>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[10px] text-zinc-450">講師：林創智 博士</p>
                    <button
                      onClick={() => handleCourseRequest(COURSES[0])}
                      className="px-3 py-1 bg-[#0088ff] hover:bg-[#00adff] text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>播放Demo</span>
                    </button>
                  </div>
                </div>

                {/* Simulated interactive stats widget */}
                <div className="grid grid-cols-2 gap-2 text-center pt-1.5 select-none text-xs">
                  <div className="p-2.5 bg-zinc-900/40 rounded-xl border border-zinc-900">
                    <p className="text-[10px] text-zinc-500">平台已上架單元</p>
                    <p className="text-zinc-200 font-bold mt-0.5 font-mono">118 個高畫質章節</p>
                  </div>
                  <div className="p-2.5 bg-zinc-900/40 rounded-xl border border-zinc-900">
                    <p className="text-[10px] text-zinc-500">金流加密閘道認證</p>
                    <p className="text-emerald-400 font-bold mt-0.5 font-mono">PCI-DSS 安全防禦</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Icons Showcase Section */}
      <section id="categories-section" className="py-16 bg-zinc-950/40 border-b border-zinc-910">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="space-y-2">
            <h2 className="text-xs font-mono tracking-widest text-[#00d2ff] uppercase font-bold">
              CURRICULUM CATEGORIES
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">精選課程專業領域</p>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              專為高度專業、品牌話語、與整合思考打造之六大模組，對標達創智能技術全景。
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5 select-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? 'all' : cat.name);
                  }}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#0088ff]/10 border-[#0088ff] shadow-[0_0_15px_rgba(0,136,255,0.15)]'
                      : 'bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/80'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg transition-colors ${
                    isSelected ? 'bg-[#0088ff]/20 text-[#00d2ff]' : 'bg-zinc-950 text-zinc-400'
                  }`}>
                    {cat.name === 'AI 應用' && <Cpu className="w-5 h-5" />}
                    {cat.name === '數位行銷' && <Sparkles className="w-5 h-5" />}
                    {cat.name === '品牌策略' && <Award className="w-5 h-5" />}
                    {cat.name === '系統整合' && <Layers className="w-5 h-5" />}
                    {cat.name === '自動化工作流' && <Zap className="w-5 h-5" />}
                    {cat.name === '商業成長' && <Users className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-200 block truncate">{cat.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                      {cat.count} 門核心課
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-[#00d2ff] border-b border-[#00d2ff]/40 pb-0.5 hover:text-[#00a6ff] transition-all cursor-pointer font-medium"
            >
              清除分類過濾，顯示全部課程
            </button>
          )}
        </div>
      </section>

      {/* Main Course list Section with dynamic search */}
      <section id="courses-section" className="py-16 md:py-20 border-b border-zinc-910">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section titles */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#00d2ff] uppercase font-bold">
                HOT PORTFOLIO
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                熱門與指標課程卡片
              </h2>
              <p className="text-sm text-zinc-400 max-w-md">
                每張課程均提供高級播放器模擬、真實課堂手記等功能。試點「點選研讀」即刻啟航。
              </p>
            </div>

            {/* Combined search panel */}
            <div className="w-full md:max-w-xs relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜尋關鍵字（例如 autogen、RAG）..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-550 focus:border-[#00d2ff]/45 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/20 transition-all"
              />
            </div>
          </div>

          {/* Course card grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/10 border border-dashed border-zinc-850 rounded-2xl">
              <HelpCircle className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
              <p className="text-sm text-zinc-400 font-medium">沒有找到符合條件的精選課程</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-[#00d2ff] underline cursor-pointer"
              >
                重設篩選條件
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId);
                const isOwned = purchasedCourseIds.includes(course.id) || purchasedPlanIds.length > 0;
                
                // Get real percent completion based on state
                const totalL = course.syllabus.flatMap((s) => s.lessons).length;
                const progressUnitCount = courseProgressMap[course.id] || 0;
                const computedPercent = Math.round((progressUnitCount / totalL) * 100);

                return (
                  <motion.div
                    key={course.id}
                    whileHover={{ y: -6 }}
                    className="group relative flex flex-col bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-300 rounded-2xl border border-zinc-900 hover:border-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,136,255,0.06)] overflow-hidden"
                  >
                    {/* Cover Frame */}
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                      <img
                        src={course.cover}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 opacity-40" />
                      
                      {/* Floating Category badge */}
                      <span className="absolute top-3 left-3 bg-zinc-950/80 border border-zinc-800 text-zinc-200 text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-md">
                        {course.category}
                      </span>

                      {/* Display Progress if owned */}
                      {isOwned && (
                        <span className="absolute bottom-3 right-3 bg-zinc-950/90 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded shadow">
                          已解鎖 • {computedPercent}%
                        </span>
                      )}
                    </div>

                    {/* Meta info layout */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-left">
                        
                        {/* Instructor & rating info */}
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                          <button
                            onClick={() => instructor && setActiveInstructor(instructor)}
                            className="hover:text-[#00d2ff] hover:underline flex items-center space-x-1.5 cursor-pointer text-left"
                          >
                            <span>講師: {instructor?.name}</span>
                          </button>
                          <span className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>{course.rating.toFixed(1)}</span>
                          </span>
                        </div>

                        {/* Title & brief */}
                        <h3 className="text-sm md:text-sm font-semibold text-zinc-100 group-hover:text-white line-clamp-2 leading-relaxed min-h-[40px]">
                          {course.title}
                        </h3>
                        
                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed h-[36px]">
                          {course.description}
                        </p>

                        {/* Tags list */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {course.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-mono bg-zinc-950 text-zinc-500 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Controls at card bottom */}
                      <div className="pt-3 border-t border-zinc-900/60 flex items-center justify-between">
                        <div>
                          {isOwned ? (
                            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold bg-emerald-400/5 px-2 py-0.5 rounded">
                              已擁有
                            </span>
                          ) : (
                            <div className="flex items-baseline space-x-1.5 font-mono select-none">
                              <span className="text-[#00d2ff] text-sm font-bold">NT$ {course.price.toLocaleString()}</span>
                              <span className="text-zinc-600 text-[10px] line-through">NT$ {course.originalPrice.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleCourseRequest(course)}
                          className={`px-4 py-2 text-[11px] font-semibold rounded-lg flex items-center space-x-1.5 cursor-pointer transition-all ${
                            isOwned
                              ? 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20'
                              : 'bg-zinc-900 hover:bg-[#0088ff] text-zinc-300 hover:text-white border border-zinc-800'
                          }`}
                        >
                          {isOwned ? (
                            <>
                              <span>開始觀看學習</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>點選研讀課程</span>
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Instructors Showcase Section */}
      <section id="instructors-section" className="py-16 bg-zinc-900/10 border-b border-zinc-910">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#00d2ff] uppercase font-bold">
              GOLD MEDAL TUTORS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">精選黃金導師陣容</h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto md:mx-0">
              對開口授課者的高標準篩檢。每位名師均具備達創學術、研發或顧問資歷，手持自主研發大師檔案。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTRUCTORS.map((teacher) => {
              const teacherCourses = COURSES.filter((c) => c.instructorId === teacher.id);
              return (
                <div
                  key={teacher.id}
                  className="bg-zinc-900/30 p-5 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-all text-left flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Head image frame */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-zinc-100 flex items-center justify-between">
                        <span>{teacher.name}</span>
                        <span className="flex items-center text-xs font-mono font-bold text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                          {teacher.rating}
                        </span>
                      </h3>
                      <p className="text-[11px] font-mono text-[#00d2ff] font-medium">{teacher.title}</p>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {teacher.bio}
                    </p>

                    {/* Specialties brief tags */}
                    <div className="flex flex-wrap gap-1">
                      {teacher.specialties.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono bg-zinc-950 text-zinc-500 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveInstructor(teacher)}
                    className="w-full py-2 bg-zinc-950 hover:bg-[#0088ff] hover:text-white text-zinc-400 text-xs font-semibold rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                  >
                    查看大師背書 / 教師詳情
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Orbit Growth Path Timeline Section (Growth Timeline) */}
      <section id="timeline-section" className="py-16 md:py-24 border-b border-zinc-910 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#00d2ff] uppercase font-bold">
              LEARNING ORBIT GROWTH MAP
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              智慧學習路徑 • 成長軌道
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">
              拒絕碎片化獲取。我們設計了由淺入深、具備高度檢驗閉環的四階科技研習路徑：
            </p>
          </div>

          {/* Map layout - Interactive orbit timeline */}
          <div className="relative">
            {/* Visual background bridge */}
            <div className="absolute top-1/2 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 hidden md:block" />

            {/* Orbit step nodes (Safe column layouts for narrow screens) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-4 relative z-10">
              {LEARNING_PATH.map((node) => {
                const isActive = selectedPathNode.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedPathNode(node)}
                    className={`interactive-node flex-1 p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0088ff]/10 border-[#0088ff] shadow-[0_0_20px_rgba(0,136,255,0.15)] scale-[1.03]'
                        : 'bg-zinc-900/40 border-zinc-900 hover:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                        isActive ? 'bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/30' : 'bg-zinc-950 text-zinc-500'
                      }`}>
                        {node.stage} 階段
                      </span>
                      <span className="text-[11px] font-mono text-zinc-650 font-bold">STAGE_{node.id.toUpperCase()}</span>
                    </div>
                    
                    <h3 className={`text-xs md:text-sm font-semibold transition-colors ${
                      isActive ? 'text-[#00d2ff]' : 'text-zinc-200'
                    }`}>
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 truncate mt-1">{node.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Path Node Details Workspace Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPathNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 md:p-8 bg-zinc-900/35 border border-zinc-900 rounded-2xl text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              {/* Left explanation metrics */}
              <div className="md:col-span-8 space-y-5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-widest font-bold">探索此起點軌道</span>
                  <h3 className="text-base font-semibold text-zinc-200 mt-0.5">
                    {selectedPathNode.stage}：{selectedPathNode.title}
                  </h3>
                  <p className="text-zinc-400 mt-2 leading-relaxed text-[13px] font-sans">
                    {selectedPathNode.description}
                  </p>
                </div>

                {/* Achieved technical milestones */}
                <div className="space-y-2">
                  <h4 className="text-zinc-300 font-semibold text-xs animate-pulse">研習通過獲得之核心技能</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedPathNode.skillsReached.map((skill, i) => (
                      <div key={i} className="flex items-center space-x-2 text-zinc-400">
                        <Check className="w-3.5 h-3.5 text-[#00d2ff] flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right recommended modules */}
              <div className="md:col-span-4 bg-zinc-950/80 p-5 rounded-xl border border-zinc-910 space-y-4">
                <h4 className="text-xs font-semibold text-zinc-300 font-mono tracking-wide uppercase">
                  推薦對齊研讀之課程
                </h4>
                
                <div className="space-y-2.5">
                  {selectedPathNode.recommendedCourses.map((cId) => {
                    const course = COURSES.find((c) => c.id === cId);
                    if (!course) return null;
                    return (
                      <div
                        key={course.id}
                        className="p-2.5 bg-zinc-900/50 rounded-lg border border-zinc-900 flex items-center justify-between group select-none text-xs"
                      >
                        <div className="truncate text-left pr-1">
                          <p className="text-zinc-300 group-hover:text-white truncate font-medium">{course.title}</p>
                          <span className="text-[10px] text-zinc-500 font-mono">{course.duration}</span>
                        </div>
                        <button
                          onClick={() => handleCourseRequest(course)}
                          className="flex-shrink-0 p-1 hover:bg-[#0088ff]/10 rounded border border-transparent hover:border-[#0088ff]/30 text-zinc-500 hover:text-[#00d2ff] cursor-pointer"
                        >
                          <PlayCircle className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Platform Capabilities Modules Grid */}
      <section id="modules-section" className="py-16 md:py-20 border-b border-zinc-910">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-left space-y-2 max-w-lg">
            <span className="text-xs font-mono tracking-widest text-[#00d2ff] uppercase font-bold">
              PLATFORM FEATURING CAPABILITIES
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">達創教育平台核心功能模組</h2>
            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              展示我們協助品牌搭建的高級學習科技，不只是把課程放上網站，更是深度商業營運、分潤與安全鎖定的完美終端。
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 text-left text-xs">
            {PLATFORM_MODULES.map((module, index) => {
              return (
                <div
                  key={module.id}
                  className="p-5 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-900 hover:border-zinc-800 transition-all duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    {/* Icon container */}
                    <div className="p-2.5 w-fit rounded-lg bg-[#0088ff]/10 text-[#00d2ff]">
                      {index === 0 && <Users className="w-4.5 h-4.5" />}
                      {index === 1 && <Layers className="w-4.5 h-4.5" />}
                      {index === 2 && <GraduationCap className="w-4.5 h-4.5" />}
                      {index === 3 && <Clock className="w-4.5 h-4.5" />}
                      {index === 4 && <Award className="w-4.5 h-4.5" />}
                      {index === 5 && <PlayCircle className="w-4.5 h-4.5" />}
                      {index === 6 && <Sparkles className="w-4.5 h-4.5" />}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-zinc-100">{module.name}</h3>
                      <p className="text-[11px] text-[#00d2ff]/80 font-mono italic">{module.shortDesc}</p>
                    </div>

                    <p className="text-zinc-400 leading-relaxed font-sans text-[11.5px]">
                      {module.fullDesc}
                    </p>
                  </div>

                  {/* Highlights list as a subtle card footer */}
                  <div className="space-y-1 pt-3.5 border-t border-zinc-950 flex flex-col font-sans text-[10.5px]">
                    {module.benefits.map((b, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-zinc-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Membership Pricing Section & Gateways */}
      <section id="membership-section" className="py-16 md:py-24 bg-zinc-950/40 border-b border-zinc-910">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#00d2ff] uppercase font-bold">
              MEMBERSHIP PLAN OPTIONS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">會員方案與金流權限管理</h2>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              點選下方方案的預約紐，即可調用頂級 PCI 安全金流網關，獲取專屬憑證與無限存取。
            </p>
          </div>

          {/* Pricing Comparison Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left text-xs">
            {MEMBERSHIP_PLANS.map((plan) => {
              const isOwned = purchasedPlanIds.includes(plan.id);
              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 relative overflow-hidden transition-all shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${
                    plan.isPopular
                      ? 'bg-zinc-900/60 border-[#0088ff] shadow-[0_0_30px_rgba(0,136,255,0.1)]'
                      : 'bg-zinc-900/20 border-zinc-900'
                  }`}
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <span className="absolute top-4 right-4 bg-sky-500/10 border border-sky-500/25 text-sky-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      {plan.badge}
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-zinc-100">{plan.name}</h3>
                      <p className="text-zinc-400 text-[11px] mt-1 pr-16 line-clamp-2 h-[34px]">{plan.description}</p>
                    </div>

                    {/* Highly polished dynamic price typography */}
                    <div className="font-mono flex items-baseline space-x-1 border-b border-zinc-900 pb-4">
                      <span className="text-zinc-400 text-xs font-light">NT$</span>
                      <span className="text-3xl font-bold text-white tracking-tight">{plan.price.toLocaleString()}</span>
                      <span className="text-zinc-500 text-xs">/ {plan.period}</span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 pt-2 text-zinc-400">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePurchase({ item: plan, type: 'plan' })}
                    className={`w-full py-3 text-xs font-semibold rounded-xl tracking-wider select-none relative overflow-hidden group cursor-pointer transition-all ${
                      plan.isPopular
                        ? 'bg-[#0088ff] hover:bg-[#00a3ff] text-white'
                        : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1">
                      {isOwned ? '已擁有觀看全套資格' : plan.isPopular ? '試購此專業方案' : '預約企業定制諮詢'}
                    </span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Secure gateway trust elements */}
          <div className="p-4 rounded-xl border border-dashed border-zinc-900 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-left text-xs text-zinc-400 select-none">
            <div className="flex items-center space-x-3.5">
              <ShieldCheck className="w-10 h-10 text-[#00d2ff]/80 flex-shrink-0" />
              <div>
                <p className="text-zinc-300 font-semibold">信賴支付保障機制</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">
                  支援分期付款、LINE Pay 安全折扣核配核發、電子發票自動產檔與開立作業。
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-[9px] font-mono border border-zinc-850">LINE_PAY ✅</span>
              <span className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-[9px] font-mono border border-zinc-850">VISA_SAFE ✅</span>
            </div>
          </div>

        </div>
      </section>

      {/* Accordion FAQ Area */}
      <section id="faq-section" className="py-16 md:py-20 border-b border-zinc-910">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2 select-none">
            <span className="text-xs font-mono tracking-widest text-[#00d2ff] uppercase font-bold">
              COMMON INQUIRIES
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              常見問題與技術解答
            </h2>
            <p className="text-sm text-zinc-400">
              對達創教育平台技術架構、對答分潤與售後二次開發的詳細描述。
            </p>
          </div>

          {/* Accordion items with smooth height transitions */}
          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-zinc-900/30 rounded-xl border border-zinc-900 overflow-hidden text-left"
                >
                  <button
                    onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-zinc-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-semibold pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#00d2ff] flex-shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-zinc-900/60 text-zinc-400 text-xs leading-relaxed font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Dynamic CTA Bottom Banner */}
      <section className="relative py-20 overflow-hidden">
        {/* Subtle glowing ring overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] [aspect-ratio:1] bg-sky-500/10 rounded-full filter blur-[80px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block px-3 py-1 bg-[#0055ff]/10 border border-[#0055ff]/20 text-[#00d2ff] text-[10px] font-mono tracking-widest font-bold rounded-lg select-none">
            DACHUANG AI PLATFORM CO_DEVEL
          </span>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            打造更高級的學習平台體驗
          </h2>
          <p className="text-sm md:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed">
            不只是把課程放上網站，而是建立一套可經營、可管理、可成長的知識平台系統。
          </p>

          <div className="flex justify-center gap-3.5 pt-3">
            <button
              onClick={() => {
                const enterprisePlan = MEMBERSHIP_PLANS.find(p => p.id === 'plan-enterprise');
                if (enterprisePlan) {
                  setActivePurchase({ item: enterprisePlan, type: 'plan' });
                }
              }}
              className="px-6 py-3.5 bg-[#0088ff] hover:bg-[#00addf] text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 relative overflow-hidden group transition-all"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                預約平台規劃 <ExternalLink className="w-3.5 h-3.5" />
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep" />
            </button>
            <a
              href="#courses-section"
              className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-400 text-xs font-semibold rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              查看更多展示
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Sign-off Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-550 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Trademark details */}
          <div className="space-y-2">
            <RenderDachuangLogo className="h-6 mx-auto md:mx-0" />
            <p className="text-[11px] font-mono text-zinc-600">
              © 2026 達創智能科技 AI. All security and platform rights reserved.
            </p>
          </div>

          <div className="text-[11px] font-sans text-zinc-600 md:text-right space-y-1">
            <p className="font-semibold text-zinc-500">Presented by 達創智能科技 AI</p>
            <p>高級教育科技解決方案 • 一站式導讀、防盜與多教師分權工程系統</p>
            <p className="font-mono text-[10px] text-zinc-700">VERSION: 4.8.0-LMS_QA-STATION</p>
          </div>

        </div>
      </footer>

      {/* Renders Overlays & Modals */}
      <AnimatePresence>
        
        {/* Dynamic Course Player Modal */}
        {activePlayerCourse && (
          <CoursePlayerModal
            course={activePlayerCourse}
            onClose={() => setActivePlayerCourse(null)}
            onProgressUpdate={handleProgressUpdate}
          />
        )}

        {/* Dynamic Purchase billing Modal */}
        {activePurchase && (
          <PurchaseModal
            item={activePurchase.item}
            type={activePurchase.type}
            onClose={() => setActivePurchase(null)}
            onSuccess={handlePurchaseSuccess}
          />
        )}

        {/* Dynamic Teacher Bio detailed Modal */}
        {activeInstructor && (
          <InstructorDetailModal
            instructor={activeInstructor}
            courses={COURSES.filter((c) => c.instructorId === activeInstructor.id)}
            onClose={() => setActiveInstructor(null)}
            onSelectCourse={handleCourseRequest}
          />
        )}

      </AnimatePresence>

    </div>
  );
}
