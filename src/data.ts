/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Instructor, LearningNode, PlatformModule, MembershipPlan, FAQItem } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: '林創智 博士',
    title: '達創 AI 首席科學家',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
    specialties: ['AI Agent 架構', '大語言模型 (LLM) 微調', 'RAG 知識庫工程', '神經網路設計'],
    coursesCount: 3,
    bio: '麻省理工學院 (MIT) 人工智能實驗室博士。專注於多智能體協作架構與深度學習落地，曾主持多項大型企業級 AGI 解決方案設計，協助數十家跨國企業搭建專屬的專家模型與自主決策工作流。',
    rating: 4.9,
    reviewsCount: 1240
  },
  {
    id: 'inst-2',
    name: '王建國',
    title: '達創系統總工程師',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    specialties: ['高併發系統設計', '微服務架構', 'Kubernetes', 'API 網關安全'],
    coursesCount: 2,
    bio: '20 年超大型高併發系統架構經驗。曾任美商雲端巨頭主任架構師，現任達創智能科技系統總集成專家。專精於雲端原生系統設計、跨平台 API 自動化串接及高安全性微服務部署。',
    rating: 4.8,
    reviewsCount: 932
  },
  {
    id: 'inst-3',
    name: '張心梅',
    title: '達創增長駭客技術總監',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    specialties: ['數據驅動增長', '行銷自動化', 'LTV 預測模型', '多渠道歸因分析'],
    coursesCount: 2,
    bio: '前外商數位增長副總裁，擁有 12 年跨國品牌增長與數位行銷實戰經驗。專精於將 AI 自動化工具融入行銷漏斗，實現基於數據的精準受眾定向與高效轉換率提升。',
    rating: 4.8,
    reviewsCount: 814
  },
  {
    id: 'inst-4',
    name: '陳雅婷',
    title: '達創品牌傳播策略顧問',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    specialties: ['品牌價值矩陣', '高質量內容行銷', '危機公關', '新媒介敘事學'],
    coursesCount: 2,
    bio: '知名品牌策略事務所創辦人，現任達創兼任品牌工程與知識傳播顧問。曾操盤超過 50 個知名新創與上市櫃企業的品牌升級計畫，擅長以系統化的邏輯重建企業的品牌話語權。',
    rating: 4.9,
    reviewsCount: 756
  }
];

export const CATEGORIES = [
  { id: 'cat-ai', name: 'AI 應用', count: 3 },
  { id: 'cat-marketing', name: '數位行銷', count: 2 },
  { id: 'cat-brand', name: '品牌策略', count: 2 },
  { id: 'cat-integration', name: '系統整合', count: 2 },
  { id: 'cat-workflow', name: '自動化工作流', count: 2 },
  { id: 'cat-growth', name: '商業成長', count: 1 }
];

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'AI Agent 系統思維與多智能體協作架構實戰',
    instructorId: 'inst-1',
    category: 'AI 應用',
    description: '從單一提示詞工程走向自主運作的 Agent 網絡。本課程深入解析 Autogen、CrewAI 以及 LangGraph 核心框架，帶您手把手設計能自主決策、執行工具、協同工作的多智能體 AI 系統，適合企業架構師及高階技術人員。',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['AI Agents', 'LangGraph', 'CrewAI', '進階技術'],
    duration: '18 小時',
    lessonsCount: 24,
    studentsCount: 1420,
    rating: 4.9,
    price: 6800,
    originalPrice: 12000,
    syllabus: [
      {
        id: 'c1-s1',
        title: '第一章：從 LLM 走向自主 Agent 原理',
        lessons: [
          { id: 'c1-l1', title: '1-1 課程導讀與 AGI 工作流新趨勢', duration: '12:35', isVideo: true, isPreview: true },
          { id: 'c1-l2', title: '1-2 自主決策迴圈：ReAct (Reason + Act) 機制深剖', duration: '22:15', isVideo: true, isPreview: true },
          { id: 'c1-l3', title: '1-3 Memory 狀態保留與 Planning 規劃器實作', duration: '18:40', isVideo: true, isPreview: false }
        ]
      },
      {
        id: 'c1-s2',
        title: '第二章：主流 Agent 框架與設計模式',
        lessons: [
          { id: 'c1-l4', title: '2-1 CrewAI 快速上手：角色與任務分派機制', duration: '28:10', isVideo: true, isPreview: false },
          { id: 'c1-l5', title: '2-2 LangGraph 核心架構：基於狀態圖 (StateGraph) 的複雜工作流', duration: '35:20', isVideo: true, isPreview: false },
          { id: 'c1-l6', title: '2-3 技術實作：打造協同撰寫研究報告的多 Agent 系統', duration: '45:00', isVideo: true, isPreview: false }
        ]
      },
      {
        id: 'c1-s3',
        title: '第三章：企業端安全調用與私有化 RAG 整合',
        lessons: [
          { id: 'c1-l7', title: '3-1 Token 成本控制技巧與速率限制防火牆', duration: '21:10', isVideo: true, isPreview: false },
          { id: 'c1-l8', title: '3-2 畢業專案：基於企業私有數據的安全決策 Agent', duration: '52:15', isVideo: true, isPreview: false }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: '企業級自動化工作流與 RAG 智慧知識庫工程',
    instructorId: 'inst-1',
    category: '自動化工作流',
    description: '專為企業量身打造。將雜亂的 PDF、Word 與內部 API 資料轉化為秒級響應的精準 QA 知識庫。結合 n8n / Make 等自動化管線工具，零程式碼到微程式碼串接，告別人工重複搬運，實現 24 小時智慧化營運。',
    cover: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['n8n', 'RAG', 'Vector Database', '辦公自動化'],
    duration: '14 小時',
    lessonsCount: 18,
    studentsCount: 980,
    rating: 4.8,
    price: 5200,
    originalPrice: 9800,
    syllabus: [
      {
        id: 'c2-s1',
        title: '第一章：RAG (檢索增強生成) 技術全貌',
        lessons: [
          { id: 'c2-l1', title: '1-1 為什麼傳統 LLM 會胡言亂語？RAG 的救贖', duration: '15:20', isVideo: true, isPreview: true },
          { id: 'c2-l2', title: '1-2 文本切分 (Chunking) 策略與向量化 Embedding 原理', duration: '25:40', isVideo: true, isPreview: false }
        ]
      },
      {
        id: 'c2-s2',
        title: '第二章：向量資料庫與混和檢索實作',
        lessons: [
          { id: 'c2-l3', title: '2-1 Pinecone 與 Weaviate 雲端庫配置引導', duration: '22:15', isVideo: true, isPreview: false },
          { id: 'c2-l4', title: '2-2 關鍵字 (BM25) 與向量語義 (Semantic) 混和檢索優化', duration: '31:40', isVideo: true, isPreview: false },
          { id: 'c2-l5', title: '2-3 重排序 (Rerank) 技術提升 30% 精準度實測', duration: '19:50', isVideo: true, isPreview: false }
        ]
      },
      {
        id: 'c2-s3',
        title: '第三章：自動化整合 - 打造 24/7 自動回覆機器人',
        lessons: [
          { id: 'c2-l6', title: '3-1 n8n 串接 Line、Slack 與 E-mail 自動收發', duration: '38:10', isVideo: true, isPreview: false },
          { id: 'c2-l7', title: '3-2 企業案例：達創智慧客服流水線架構大拆解', duration: '41:20', isVideo: true, isPreview: false }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: '數據驅動增長：自動化行銷與 LTV 預測模型',
    instructorId: 'inst-3',
    category: '數位行銷',
    description: '不再盲目投廣告。本課程利用大數據分析和機器學習技術，解構用戶生命週期（LTV）。建立精準自動化推送漏斗，在對的時間提供對的優惠。用資料解碼消費者行為，讓投報率（ROI）實現指數級跳躍。',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['增長駭客', 'Python 數據分析', 'LTV 預測', '行銷科技'],
    duration: '16 小時',
    lessonsCount: 20,
    studentsCount: 1120,
    rating: 4.8,
    price: 4800,
    originalPrice: 8800,
    syllabus: [
      {
        id: 'c3-s1',
        title: '第一章：行銷數據化升級概念',
        lessons: [
          { id: 'c3-l1', title: '1-1 資料庫行銷與傳統行銷的架構性差異', duration: '14:50', isVideo: true, isPreview: true },
          { id: 'c3-l2', title: '1-2 釐清關鍵指標：CAC、LTV、Churn Rate 與 Cohort', duration: '28:10', isVideo: true, isPreview: true }
        ]
      },
      {
        id: 'c3-s2',
        title: '第二章：LTV 用戶生命週期價值預測模型',
        lessons: [
          { id: 'c3-l3', title: '2-1 使用 RFM (Recency, Frequency, Monetary) 將會員分群', duration: '32:45', isVideo: true, isPreview: false },
          { id: 'c3-l4', title: '2-2 Python 基礎：預測未來 90 天內客戶回購概率', duration: '45:10', isVideo: true, isPreview: false }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    title: '企業級微服務架構整合與 API 安全網路關實踐',
    instructorId: 'inst-2',
    category: '系統整合',
    description: '面對龐大系統，如何安全解耦、極致擴充？達創資深架構師帶您從單體架構 (Monolithic) 平滑過渡至微服務 (Microservices)。深入講解 gRPC 通訊、OAuth2/OIDC 認證與 Redis 緩存優化，讓您的系統具備電商級的穩定承載。',
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['微服務', 'gRPC', 'API Gateway', '系統安全'],
    duration: '20 小時',
    lessonsCount: 26,
    studentsCount: 870,
    rating: 4.9,
    price: 7200,
    originalPrice: 13500,
    syllabus: [
      {
        id: 'c4-s1',
        title: '第一章：微服務架構心法與服務解耦',
        lessons: [
          { id: 'c4-l1', title: '1-1 為什麼要走微服務？評估要點與潛在代價', duration: '18:12', isVideo: true, isPreview: true },
          { id: 'c4-l2', title: '1-2 領域驅動設計 (DDD) 核心：劃分界限上下文', duration: '32:50', isVideo: true, isPreview: false }
        ]
      },
      {
        id: 'c4-s2',
        title: '第二章：高效通訊與 API 閘道器配置',
        lessons: [
          { id: 'c4-l3', title: '2-1 HTTP/REST vs gRPC vs 消息隊列 (RabbitMQ)', duration: '29:40', isVideo: true, isPreview: false },
          { id: 'c4-l4', title: '2-2 使用 Kong / APISIX 建立高可用性認證閘道器', duration: '38:15', isVideo: true, isPreview: false }
        ]
      }
    ]
  },
  {
    id: 'course-5',
    title: '頂尖品牌定位矩陣與新媒介敘事工作坊',
    instructorId: 'inst-4',
    category: '品牌策略',
    description: '高階教育品牌與科技產品的核心競爭力在於「話語權」。本課程引導如何建立具備護城河的品牌定位矩陣。學會從消費者心智出發，轉化冷硬技術為有溫度的故事，擺脫低價競爭，創造高溢價品牌資產。',
    cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['品牌思維', '高階行銷', '內容策略', '溢價思維'],
    duration: '12 小時',
    lessonsCount: 15,
    studentsCount: 540,
    rating: 4.7,
    price: 4200,
    originalPrice: 7500,
    syllabus: [
      {
        id: 'c5-s1',
        title: '第一章：解構心智 - 品牌定位護城河',
        lessons: [
          { id: 'c5-l1', title: '1-1 從產品功能思維跳脫：何謂情感與精神溢價？', duration: '20:10', isVideo: true, isPreview: true },
          { id: 'c5-l2', title: '1-2 麥肯錫品牌矩陣實作：畫出您企業的獨特象限', duration: '30:45', isVideo: true, isPreview: false }
        ]
      },
      {
        id: 'c5-s2',
        title: '第二章：敘事力 - 科技與知識的高級轉化',
        lessons: [
          { id: 'c5-l3', title: '2-1 英雄之旅敘事框架：如何讓學員/客戶產生強烈共鳴', duration: '25:30', isVideo: true, isPreview: false },
          { id: 'c5-l4', title: '2-2 商業實例：解析達創智能科技的品牌文案策略', duration: '34:20', isVideo: true, isPreview: false }
        ]
      }
    ]
  },
  {
    id: 'course-6',
    title: '智慧零售與會員忠誠度系統整合指南',
    instructorId: 'inst-3',
    category: '商業成長',
    description: '串聯線上 (LMS/EC) 與線下 (POS/CRM) 的關鍵拼圖。深入瞭解大規模會員積分、限時優惠券與回看機制的技術與商業邏輯。本套實戰指南聚焦於系統串接、資料同步與精準定向通知，實現高黏著度回購。',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['會員經營', '點數策略', 'Omnichannel', '系統串接'],
    duration: '10 小時',
    lessonsCount: 12,
    studentsCount: 620,
    rating: 4.8,
    price: 3600,
    originalPrice: 6200,
    syllabus: [
      {
        id: 'c6-s1',
        title: '第一章：全通路 (O2O) 會員體系概述',
        lessons: [
          { id: 'c6-l1', title: '1-1 線上與線下數據孤島的根本成因與解法', duration: '16:40', isVideo: true, isPreview: true },
          { id: 'c6-l2', title: '1-2 會員等級 (Tier) 與權限配給的產品邏輯設計', duration: '22:15', isVideo: true, isPreview: false }
        ]
      },
      {
        id: 'c6-s2',
        title: '第二章：點數、優惠券與動態通知實做',
        lessons: [
          { id: 'c6-l3', title: '2-1 確保不超發的高效促銷代碼技術設計', duration: '26:50', isVideo: true, isPreview: false },
          { id: 'c6-l4', title: '2-2 行動端自動化推播機制：結合地理位置與時機', duration: '31:10', isVideo: true, isPreview: false }
        ]
      }
    ]
  }
];

export const LEARNING_PATH: LearningNode[] = [
  {
    id: 'path-1',
    stage: '入門',
    title: '核心技術與體系搭建',
    subtitle: '奠定穩健的科技與品牌基石',
    description: '此階段重點在於理解現代雲端系統架構與品牌話語權的核心定義。學員將掌握系統通訊協議（gRPC/REST）以及高含金量的麥肯錫品牌定位，為後續的高階應用提供扎實底層思維。',
    skillsReached: ['領域驅動設計 (DDD)', '品牌定位矩陣', '前後端 API 交互邏輯'],
    recommendedCourses: ['course-4', 'course-5']
  },
  {
    id: 'path-2',
    stage: '進階',
    title: '智慧數據與增長飛輪',
    subtitle: '資料驅動，發掘企業增長第二曲線',
    description: '進入數據工程世界，學習行銷科技（MarTech）的心臟。掌握 RFM 用戶精準分群、Cohort 留存率分析，並利用機器學習演算法，學習預測 90 天用戶生命化價值（LTV）以驅動精細化營運。',
    skillsReached: ['Python 數據分群', 'LTV 預測模型', '會員權限與點數規則'],
    recommendedCourses: ['course-3', 'course-6']
  },
  {
    id: 'path-3',
    stage: '應用',
    title: '自動化管線與敏捷客服',
    subtitle: '搭建 24 小時智慧增效工作流',
    description: '透過自動化系統（n8n/Make）解耦重複的人工流程。學會整合多渠道（Line/Email），並串聯向量資料庫，配置高精度的重排序（Rerank）模型，將企業既有知識庫平滑升級為可全天候運作的智能問答樞紐。',
    skillsReached: ['n8n 複雜工作流編排', '向量化 Embedding 精準檢索', '多渠道即時集成'],
    recommendedCourses: ['course-2']
  },
  {
    id: 'path-4',
    stage: '實戰',
    title: '自主 AI 專家網路部署',
    subtitle: '極致 AI：打造多任務自動決策特工組',
    description: '終極實戰階段。從撰寫 prompt 正式跨入「多智能體 Collaborative Agent」的系統開發。掌握基於 LangGraph 狀態圖的閉環邏輯，整合自主規劃、外部工具呼叫與記憶體留存，為企業定制安全可靠的 AI 協作引擎。',
    skillsReached: ['LangGraph 複雜狀態圖實作', '自主 Agent 決策迴圈(ReAct)', '企業級 API 速率上限防衛'],
    recommendedCourses: ['course-1']
  }
];

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id: 'mod-1',
    name: '高級會員登入系統',
    iconName: 'UserCheck',
    shortDesc: '支援 OIDC、多因素認證與跨端狀態同步。',
    fullDesc: '達創研發的極速登入系統，不僅支持 SSO 與社群登入，更特別優化了學員在 iframe / Web 視窗中的憑證持久化，提供安全、流暢的一鍵登入體驗。',
    benefits: ['高安全性 JWT/OIDC 雙重機制', '跨裝置觀看紀錄與播放時間同步', '異常登入 IP 即時預警防護']
  },
  {
    id: 'mod-2',
    name: '智慧課程管理後台',
    iconName: 'LayoutGrid',
    shortDesc: '章節結構拖拽上傳，靈活配置講義與作業。',
    fullDesc: '為品牌主設計的極簡管理後台。提供拖曳式大綱編輯器、雲端高速影片轉碼與數位防盜浮水印，大幅降低內容上架所需的時間與維護成本。',
    benefits: ['影片動態浮水印防止錄影流失', '講義 PDF 線上安全預覽（防下載防複製）', '豐富的課後問答與練習題模組']
  },
  {
    id: 'mod-3',
    name: '多教師聯合上架架構',
    iconName: 'Users',
    shortDesc: '支持獨立教師子後台、自動化分潤與權限解耦。',
    fullDesc: '專門針對多師資平台的彈性架構。每位名師可擁有專屬控制台上傳與回覆評論，後台內置智能清結帳與自動化分潤模組，輕鬆運營大型知識市集。',
    benefits: ['講師獨立權限隔離確保安全', '自動化合約比例分潤與對帳報表', '講師專屬學員互動評論面板']
  },
  {
    id: 'mod-4',
    name: '無縫金流串接模組',
    iconName: 'CreditCard',
    shortDesc: '支援一次付清、分期付款、訂閱制與優惠折抵。',
    fullDesc: '整合主流第三方金流平台，包含藍新、綠界、LINE Pay 及 Apple Pay，支持自動發票開立、折扣碼彈性折抵及智能續約扣款，轉換率最大化。',
    benefits: ['一鍵啟用 LINE Pay / 信用卡分期', '支持購物車自動套用最優折價代碼', '電子發票、載具一站式自動化開立']
  },
  {
    id: 'mod-5',
    name: '學習流星歷史紀錄',
    iconName: 'History',
    shortDesc: '全方位捕獲學員讀音、答題與互動時間軸。',
    fullDesc: '系統自動記錄學員每一個單元的觀看比例、答題正確率與測驗進度，匯入後台數據畫布，能幫助講師客觀洞察課程痛點並持續優化內容。',
    benefits: ['觀看狀態毫秒級精確計時與持久化', '自動標記學員停頓、重複觀看之熱門章節', '自動生成個人化學習護照證書']
  },
  {
    id: 'mod-6',
    name: '沉浸式智能播放器',
    iconName: 'PlayCircle',
    shortDesc: '支持倍速播放、彈幕筆記、影片斷點即時續播。',
    fullDesc: '超流暢的自研 H5 影片播放主控。集成筆記摘要導出、斷點續播、智能倍速控制，不卡頓，給學員極佳的沉浸式學習體驗，就像置身高級講堂。',
    benefits: ['自適應高畫質動態串流（HLS/DASH）', '自帶線上個人筆記功能，一鍵導出 PDF', '畫中畫（PIP）浮動視窗，一邊聽課一邊實作']
  },
  {
    id: 'mod-7',
    name: '靈活優惠券與權限核配',
    iconName: 'Ticket',
    shortDesc: '到期限制、指定課程群組包、動態 VIP 折抵。',
    fullDesc: '行銷人員的營運利器。您可以按比例、金額為特定學員群體分發優惠券，或設置「VIP 會員免費回看專區」，讓品牌平台活動玩出更多花樣。',
    benefits: ['指定學員、指定課程、精準折抵', '結合節慶的限時限量秒殺優惠碼', '訂閱專屬：VIP 等級權限自動校驗系統']
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: '達創 專業學習帳戶',
    price: 1980,
    period: '月',
    description: '適合個人專業研習或快速充電，獲取核心人工智能與系統開發前沿知識。',
    features: [
      '所有上架視訊課程無限次觀看權限',
      '學員專屬線上程式碼 / 文件講義庫下載',
      '一般性線上問答討論區社群存取',
      '一對一 AI 助教初級語義代碼除錯服務',
      '學員個人進度、觀看紀錄持久化同步'
    ],
    badge: '熱門首選',
    isPopular: true
  },
  {
    id: 'plan-enterprise',
    name: '達創 企業專屬定制套包',
    price: 12500,
    period: '季',
    description: '專為企業研發團隊與數位化轉型量身定制。包含私有數據保障與達創高級總師導航。',
    features: [
      '不限帳號數量，支持企業全員共享學習證',
      '解鎖多智能體 (Agent) 與微服務實戰畢業專案代碼',
      '達創智能系統總監一對一 (每月兩小時) 雲端架構評估',
      '專屬企業私有群組獨立客服通道，2 小時內即時響應',
      '結業核發「達創認證 AGI 技術解決方案工程師」證書',
      '支持線下定制版 20 人班實戰 Code Review 交流會'
    ],
    badge: '企業轉型推薦',
    isPopular: false
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '這個 LMS 課程平台 Demo 支援哪些教學影音格式與防盜機制？',
    answer: '我們的平台支援標準 HLS（HTTP Live Streaming）自適應串流。能根據學員的網路頻寬自動切換畫質（1080P/720P/480P），提供不卡頓的流暢播放。此外，內建「動態網頁浮水印」會結合登入學員的 ID 與 IP 隨機淡入淡出影片，並鎖定鍵盤 F12 與右鍵複製，最大程度防止錄影與抄襲流失。'
  },
  {
    id: 'faq-2',
    question: '多教師架構對於佣金分潤與發票是自動化的嗎？',
    answer: '是的！達創系統提供強大的合約分潤引擎。您可以為不同講師設定差異化分潤比例（例如講師 70%、平台 30%）。當學員購課成功，平台會與綠界、藍新發票 API 自動對齊，依比例自動拆算講師營收，並可設定自動生成每月的電子帳單發送至教師專屬後台 dashboard。'
  },
  {
    id: 'faq-3',
    question: '如果我們的企業需要高度客製化（如串接現有 ERP/HR 系統），可以做得到嗎？',
    answer: '完全可以。我們這套系統本身即是基於「微服務與 API 網關」理念打造，具有極高的開放性。不論您需要串接 Active Directory (AD) 登入整合、既有的人資 HR 學習時數認證，或是 POS 金流明細同步，都可以透過達創智能科技客製化團隊以 API Gateway 模式無縫串聯。'
  },
  {
    id: 'faq-4',
    question: '達創智能科技 AI 本身提供哪些售後保固與二次開發支援？',
    answer: '我們提供完整的軟體授權與專屬雲端（Cloud Run/ECS）部署服務。系統交付後，享有 1 年原廠技術保固與安全升級修補；並且，我們提供一套優美的 API 說明文檔與 Swagger 界面，方便您內部 IT 團隊日後進行二次技術功能擴編。'
  }
];
