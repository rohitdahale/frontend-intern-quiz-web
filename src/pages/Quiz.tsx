import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface Question {
  id: number;
  question: string;
  options: string[];
}

interface QuizData {
  questions: Question[];
}

// Quiz data
const quizData: QuizData = {
  questions: [
    {
      id: 1,
      question: "What sound does a cat make?",
      options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"]
    },
    {
      id: 2,
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Jupiter", "Saturn"]
    },
    {
      id: 3,
      question: "Which language is primarily used for web development?",
      options: ["Python", "JavaScript", "C++"]
    }
  ]
};

const QuizApp: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = useMemo(
    () => quizData.questions[currentQuestionIndex],
    [currentQuestionIndex]
  );

  const totalQuestions = quizData.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = useCallback((option: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  }, [currentQuestion.id]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  }, []);

  const answeredCount = Object.keys(selectedAnswers).length;

  if (showResults) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
        <div className="relative flex items-center justify-center" style={{ width: '1625px', height: '920px' }}>
          {/* Outer Container */}
          <div style={{ 
            width: '1625px', 
            height: '920px',
            borderRadius: '50px',
            border: '0.72px solid rgba(148, 163, 184, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            position: 'relative'
          }}>
            {/* Inner Card */}
            <div style={{
              width: '1542px',
              height: '856px',
              position: 'absolute',
              top: '32px',
              left: '41.5px',
              borderRadius: '42px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '60px',
              overflow: 'auto'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 pointer-events-none" style={{ borderRadius: '42px' }}></div>
              
              <div className="relative z-10">
                <h1 className="text-6xl font-bold text-center mb-6 text-slate-700 italic">
                  Quiz Complete!
                </h1>
                <p className="text-center text-slate-600 mb-10 text-2xl">
                  You answered {answeredCount} out of {totalQuestions} questions
                </p>

                <div className="space-y-5 mb-10">
                  {quizData.questions.map((q) => (
                    <div key={q.id} className="bg-blue-50 rounded-xl p-6">
                      <p className="font-semibold text-slate-700 mb-3 text-xl">
                        {q.id}. {q.question}
                      </p>
                      <p className="text-slate-600 text-lg">
                        Your answer: {selectedAnswers[q.id] || "Not answered"}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={resetQuiz}
                    className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
      <div className="relative flex items-center justify-center" style={{ width: '1625px', height: '920px' }}>
        {/* Outer Container */}
        <div style={{ 
          width: '1625px', 
          height: '920px',
          borderRadius: '50px',
          border: '0.72px solid rgba(148, 163, 184, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          position: 'relative'
        }}>
          {/* Inner Card */}
          <div style={{
            width: '1542px',
            height: '856px',
            position: 'absolute',
            top: '32px',
            left: '41.5px',
            borderRadius: '42px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '60px',
            overflow: 'auto'
          }}>
            {/* Decorative background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 pointer-events-none" style={{ borderRadius: '42px' }}></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-6xl font-bold mb-4 text-slate-700 italic">
                  Test Your Knowledge
                </h1>
                <p className="text-slate-600 text-xl">
                  Answer all questions to see your results
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-10">
                <div className="h-2 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3 text-base text-slate-500">
                  <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span>{answeredCount} answered</span>
                </div>
              </div>

              {/* Question Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8">
                <h2 className="text-3xl font-semibold text-slate-700 text-center">
                  {currentQuestion.id}. {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-5 mb-10">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === option;
                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full p-6 rounded-xl font-semibold text-xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-[1.02]'
                          : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-md border-2 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-lg transition-all ${
                    currentQuestionIndex === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border-2 border-slate-200'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion.id]}
                  className={`flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-lg transition-all ${
                    !selectedAnswers[currentQuestion.id]
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <span>
                    {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
                  </span>
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-80px', 
          left: '-100px'
        }}>
          <div className="relative">
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg mb-2 relative">
              <p className="text-slate-700 font-semibold text-lg">Best of luck!</p>
              <div className="absolute bottom-0 left-10 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
            </div>
            <div className="w-28 h-28 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-6xl">🐾</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;