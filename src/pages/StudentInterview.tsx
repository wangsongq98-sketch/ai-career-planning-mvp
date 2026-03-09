import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Mic, StopCircle, Loader2, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react';
import { INTERVIEW_QUESTIONS, INTERVIEW_REPORTS } from '../data/mockData';

const StudentInterview = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    let timer: number;
    if (isRecording) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeElapsed(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    
    // 模拟AI分析
    setTimeout(() => {
      setAnalysisResult({
        completeness: 75 + Math.floor(Math.random() * 20),
        fluency: 78 + Math.floor(Math.random() * 15),
        professional: 72 + Math.floor(Math.random() * 20),
        confidence: 70 + Math.floor(Math.random() * 20)
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setIsRecording(false);
      setTimeElapsed(0);
      setAnalysisResult(null);
      setAnswers(prev => [...prev, '我叫王小明，是软件工程学生，正在学习Java和前端开发技术...']);
    } else {
      // 完成所有题目，跳转到报告页
      navigate('/student/report');
    }
  };

  const handleFinish = () => {
    navigate('/student/report');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <Link to="/student" className="text-white hover:text-blue-200">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-semibold">第{currentQuestion + 1}题 / 共{INTERVIEW_QUESTIONS.length}题</h1>
              <div className="text-blue-200 font-mono">{formatTime(timeElapsed)}</div>
            </div>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* 面试官区域 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">AI面试官</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {INTERVIEW_QUESTIONS[currentQuestion]}
              </p>
            </div>
          </div>
        </div>

        {/* 回答区域 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <p className="text-xl font-semibold text-gray-800">AI分析中...</p>
              <p className="text-gray-600 mt-2">正在评估您的回答质量</p>
            </div>
          ) : analysisResult ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">AI评语</h3>
                <p className="text-gray-700 leading-relaxed">
                  您的回答比较完整，涵盖了主要要点。建议在描述项目经历时可以更具体一些，突出您的个人贡献。
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-600">{analysisResult.completeness}</div>
                  <div className="text-sm text-gray-600">完整度</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600">{analysisResult.fluency}</div>
                  <div className="text-sm text-gray-600">流畅度</div>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                下一题
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200"
                >
                  <Mic className="h-10 w-10 text-white" />
                </button>
              ) : (
                <div className="w-full">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-green-500 rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.random() * 40}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                  <button
                    onClick={handleStopRecording}
                    className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200"
                  >
                    <StopCircle className="h-10 w-10 text-white" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentInterview;
