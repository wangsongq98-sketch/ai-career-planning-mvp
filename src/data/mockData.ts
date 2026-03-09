// 学校数据
export const SCHOOLS = [
  { id: 1, name: '南京大学', shortName: '南大', status: 1, adminName: '南大管理员', adminPhone: '13800138001', adminEmail: 'admin@nju.edu.cn' },
  { id: 2, name: '东南大学', shortName: '东大', status: 1, adminName: '东大管理员', adminPhone: '13800138002', adminEmail: 'admin@seu.edu.cn' }
];

// 院系数据（关联学校）
export const DEPARTMENTS = [
  { id: 1, schoolId: 1, name: '计算机科学与技术', code: 'CS' },
  { id: 2, schoolId: 1, name: '软件工程', code: 'SE' },
  { id: 3, schoolId: 2, name: '信息科学与工程', code: 'IS' }
];

// 班级数据（关联院系）
export const CLASSES = [
  { id: 1, departmentId: 1, name: '22级1班', grade: 2022 },
  { id: 2, departmentId: 1, name: '22级2班', grade: 2022 },
  { id: 3, departmentId: 2, name: '22级1班', grade: 2022 },
  { id: 4, departmentId: 3, name: '22级1班', grade: 2022 }
];

// 学生数据
export const STUDENTS = [
  { id: 1, studentId: '2024001', name: '王小明', password: '123456', schoolId: 1, departmentId: 2, classId: 3, registerTime: '2022-09-01', interviewCount: 12, averageScore: 82.5 },
  { id: 2, studentId: '2024002', name: '李小红', password: '123456', schoolId: 1, departmentId: 1, classId: 1, registerTime: '2022-09-01', interviewCount: 8, averageScore: 78.3 },
  { id: 3, studentId: '2024003', name: '张伟', password: '123456', schoolId: 2, departmentId: 3, classId: 4, registerTime: '2022-09-01', interviewCount: 6, averageScore: 85.2 }
];

// 岗位数据
export const JOBS = [
  { id: 1, name: 'Java后端开发', description: '负责Java后端系统开发与维护', requiredSkills: ['Java', 'Spring Boot', 'MySQL'] },
  { id: 2, name: '前端开发', description: '负责Web前端页面开发', requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { id: 3, name: '产品经理', description: '负责产品规划与需求分析', requiredSkills: ['产品设计', '需求分析', 'Axure'] },
  { id: 4, name: '数据分析师', description: '负责数据分析与可视化', requiredSkills: ['Python', 'SQL', 'Tableau'] }
];

// 面试题库
export const INTERVIEW_QUESTIONS = [
  "请做一下自我介绍，包括你的教育背景和专业技能。",
  "描述一个你最成功的项目经历，你在其中扮演了什么角色？",
  "你在团队合作中遇到过哪些挑战？是如何解决的？",
  "你对未来3-5年的职业发展有什么规划？",
  "你认为自己最大的优点和缺点是什么？"
];

// 面试记录
export const INTERVIEW_RECORDS = [
  { id: 1, studentId: 1, studentName: '王小明', studentClass: '22级1班', jobName: '前端开发', time: '2026-02-20 14:30', score: 85, dimensionScores: { completeness: 80, fluency: 85, professional: 82, confidence: 88 } },
  { id: 2, studentId: 1, studentName: '王小明', studentClass: '22级1班', jobName: 'Java后端开发', time: '2026-02-18 10:15', score: 82, dimensionScores: { completeness: 78, fluency: 82, professional: 85, confidence: 80 } },
  { id: 3, studentId: 2, studentName: '李小红', studentClass: '22级2班', jobName: 'Java后端开发', time: '2026-02-19 16:45', score: 78, dimensionScores: { completeness: 75, fluency: 78, professional: 80, confidence: 72 } },
  { id: 4, studentId: 3, studentName: '张伟', studentClass: '22级1班', jobName: '数据分析师', time: '2026-02-17 09:20', score: 88, dimensionScores: { completeness: 85, fluency: 88, professional: 90, confidence: 82 } },
  { id: 5, studentId: 1, studentName: '王小明', studentClass: '22级1班', jobName: '产品经理', time: '2026-02-15 11:30', score: 76, dimensionScores: { completeness: 72, fluency: 76, professional: 78, confidence: 74 } }
];

// 面试报告数据
export const INTERVIEW_REPORTS = {
  1: {
    totalScore: 85,
    dimensions: {
      completeness: 80,
      fluency: 85,
      professional: 82,
      confidence: 88
    },
    suggestions: [
      "你的自我介绍比较完整，涵盖了教育背景和专业技能",
      "在描述项目经历时可以更具体一些，突出你的个人贡献",
      "可以多准备一些关于你所应聘岗位的专业技术问题回答"
    ],
    qnaList: [
      { question: "请做一下自我介绍，包括你的教育背景和专业技能。", answer: "大家好，我是王小明，是南京大学软件工程22级的学生。在校期间我主要学习了Java、Python等编程语言，参与过多个项目开发。", score: 80 },
      { question: "描述一个你最成功的项目经历，你在其中扮演了什么角色？", answer: "在我们的毕业设计项目中，我担任了项目负责人，负责项目规划和核心模块开发。通过这个项目，我提升了自己的技术能力和团队协作能力。", score: 85 },
      { question: "你在团队合作中遇到过哪些挑战？是如何解决的？", answer: "我们团队在项目中期出现了意见分歧，我组织了一次团队会议，让大家充分表达自己的观点，最后达成了一致意见。", score: 82 },
      { question: "你对未来3-5年的职业发展有什么规划？", answer: "我希望在3年内成为高级开发工程师，5年内能够独立负责大型项目。我会不断学习新技术，提升自己的专业能力。", score: 88 },
      { question: "你认为自己最大的优点和缺点是什么？", answer: "我的优点是学习能力强，能够快速掌握新知识。缺点是有时过于追求完美，可能会导致效率降低，但我正在努力改进。", score: 85 }
    ]
  },
  2: {
    totalScore: 82,
    dimensions: {
      completeness: 78,
      fluency: 82,
      professional: 85,
      confidence: 80
    },
    suggestions: [
      "你的自我介绍比较完整",
      "在描述项目时可以更突出你的个人贡献",
      "回答问题时可以更加自信一些"
    ],
    qnaList: [
      { question: "请做一下自我介绍，包括你的教育背景和专业技能。", answer: "大家好，我是王小明...", score: 78 },
      { question: "描述一个你最成功的项目经历，你在其中扮演了什么角色？", answer: "在我们的毕业设计项目中...", score: 82 },
      { question: "你在团队合作中遇到过哪些挑战？是如何解决的？", answer: "我们团队在项目中期出现了意见分歧...", score: 85 },
      { question: "你对未来3-5年的职业发展有什么规划？", answer: "我希望在3年内成为高级开发工程师...", score: 80 },
      { question: "你认为自己最大的优点和缺点是什么？", answer: "我的优点是学习能力强...", score: 80 }
    ]
  },
  3: {
    totalScore: 78,
    dimensions: {
      completeness: 75,
      fluency: 78,
      professional: 80,
      confidence: 72
    },
    suggestions: [
      "你的自我介绍可以更加简洁明了",
      "在描述项目时可以更突出你的个人贡献",
      "回答问题时可以更加自信一些"
    ],
    qnaList: [
      { question: "请做一下自我介绍，包括你的教育背景和专业技能。", answer: "大家好，我是李小红...", score: 75 },
      { question: "描述一个你最成功的项目经历，你在其中扮演了什么角色？", answer: "在我们的毕业设计项目中...", score: 78 },
      { question: "你在团队合作中遇到过哪些挑战？是如何解决的？", answer: "我们团队在项目中期出现了意见分歧...", score: 80 },
      { question: "你对未来3-5年的职业发展有什么规划？", answer: "我希望在3年内成为高级开发工程师...", score: 72 },
      { question: "你认为自己最大的优点和缺点是什么？", answer: "我的优点是学习能力强...", score: 72 }
    ]
  },
  4: {
    totalScore: 88,
    dimensions: {
      completeness: 85,
      fluency: 88,
      professional: 90,
      confidence: 82
    },
    suggestions: [
      "你的自我介绍非常精彩，给面试官留下了深刻印象",
      "项目经历描述得非常详细，展示了你的技术实力",
      "继续保持这种自信和专业的态度"
    ],
    qnaList: [
      { question: "请做一下自我介绍，包括你的教育背景和专业技能。", answer: "大家好，我是张伟...", score: 85 },
      { question: "描述一个你最成功的项目经历，你在其中扮演了什么角色？", answer: "在我们的毕业设计项目中...", score: 88 },
      { question: "你在团队合作中遇到过哪些挑战？是如何解决的？", answer: "我们团队在项目中期出现了意见分歧...", score: 90 },
      { question: "你对未来3-5年的职业发展有什么规划？", answer: "我希望在3年内成为高级开发工程师...", score: 82 },
      { question: "你认为自己最大的优点和缺点是什么？", answer: "我的优点是学习能力强...", score: 82 }
    ]
  },
  5: {
    totalScore: 76,
    dimensions: {
      completeness: 72,
      fluency: 76,
      professional: 78,
      confidence: 74
    },
    suggestions: [
      "你的自我介绍可以更加简洁明了",
      "在描述项目时可以更突出你的个人贡献",
      "回答问题时可以更加自信一些"
    ],
    qnaList: [
      { question: "请做一下自我介绍，包括你的教育背景和专业技能。", answer: "大家好，我是王小明...", score: 72 },
      { question: "描述一个你最成功的项目经历，你在其中扮演了什么角色？", answer: "在我们的毕业设计项目中...", score: 76 },
      { question: "你在团队合作中遇到过哪些挑战？是如何解决的？", answer: "我们团队在项目中期出现了意见分歧...", score: 78 },
      { question: "你对未来3-5年的职业发展有什么规划？", answer: "我希望在3年内成为高级开发工程师...", score: 74 },
      { question: "你认为自己最大的优点和缺点是什么？", answer: "我的优点是学习能力强...", score: 74 }
    ]
  }
};

// 近7天面试次数数据
export const WEEKLY_INTERVIEW_DATA = [
  { day: "周一", count: 38 },
  { day: "周二", count: 42 },
  { day: "周三", count: 45 },
  { day: "周四", count: 40 },
  { day: "周五", count: 52 },
  { day: "周六", count: 35 },
  { day: "周日", count: 28 }
];

// 各班级平均分数据
export const CLASS_SCORES = [
  { class: "22级1班", average: 82 },
  { class: "22级2班", average: 78 }
];

// 得分分布数据
export const SCORE_DISTRIBUTION = [
  { range: "<60", count: 12, percentage: 8 },
  { range: "60-70", count: 35, percentage: 23 },
  { range: "70-80", count: 58, percentage: 38 },
  { range: "80-90", count: 32, percentage: 21 },
  { range: "90+", count: 13, percentage: 10 }
];

// 管理员数据
export const ADMIN_USERS = {
  'admin_nju': { username: 'admin_nju', password: '123456', schoolId: 1, role: 'admin' },
  'admin_seu': { username: 'admin_seu', password: '123456', schoolId: 2, role: 'admin' },
  'super': { username: 'super', password: '123456', schoolId: null, role: 'super' }
};

// 示例学生数据（用于"立即体验"）
export const DEMO_STUDENT = {
  id: 1,
  name: '王小明',
  studentId: '2024001',
  schoolName: '南京大学',
  department: '软件工程',
  class: '22级1班',
  registerTime: '2022-09-01',
  interviewCount: 12,
  averageScore: 82.5
};
