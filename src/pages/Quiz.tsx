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
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
        <div className="w-full max-w-4xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-700 italic">
                Quiz Complete!
              </h1>
              <p className="text-center text-slate-600 mb-8 text-lg">
                You answered {answeredCount} out of {totalQuestions} questions
              </p>

              <div className="space-y-4 mb-8">
                {quizData.questions.map((q) => (
                  <div key={q.id} className="bg-blue-50 rounded-xl p-4">
                    <p className="font-semibold text-slate-700 mb-2">
                      {q.id}. {q.question}
                    </p>
                    <p className="text-slate-600">
                      Your answer: {selectedAnswers[q.id] || "Not answered"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-700 italic">
                Test Your Knowledge
              </h1>
              <p className="text-slate-600 text-lg">
                Answer all questions to see your results
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-1.5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-slate-500">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span>{answeredCount} answered</span>
              </div>
            </div>

            {/* Question Section */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-700 text-center">
                {currentQuestion.id}. {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full p-5 rounded-xl font-semibold text-lg transition-all duration-200 ${
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
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all ${
                  currentQuestionIndex === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border-2 border-slate-200'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion.id]}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all ${
                  !selectedAnswers[currentQuestion.id]
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                <span className="hidden sm:inline">
                  {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="absolute bottom-8 left-8 hidden lg:block">
          <div className="relative">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg mb-2 relative">
              <p className="text-slate-700 font-semibold">Best of luck!</p>
              <div className="absolute bottom-0 left-8 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
            </div>
            <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-5xl">🐾</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;