'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function SafetyQuiz() {
  const { language, t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const quizData: Record<string, Question[]> = {
    uz: [
      {
        id: 1,
        question: 'Aholiga mo\'ljallangan turar-joy zonalarida ruxsat etilgan maksimal tezlik qancha?',
        options: ['20 km/soat', '30 km/soat', '40 km/soat', '50 km/soat'],
        correct: 0,
        explanation: 'O\'zbekiston YHQga binoan, turar-joy zonalari va hovlilarda ruxsat etilgan maksimal tezlik 20 km/soat.',
      },
      {
        id: 2,
        question: 'Yomg\'irli yoki tumanli havoda kunduzi qanday chiroqlarni yoqish majburiy?',
        options: ['Faqat gabarit chiroqlar', 'Yaqinni yorituvchi fara yoki tumanga qarshi chiroqlar', 'Avariya chirog\'i', 'Uzoqni yorituvchi faralar'],
        correct: 1,
        explanation: 'Yetarlicha ko\'rinmaydigan sharoitda yaqinni yorituvchi faralar yoki tumanga qarshi chiroqlar yoqiladi.',
      },
      {
        id: 3,
        question: 'Piyodalar o\'tish joyi oldida qo\'shni qatordagi mashina to\'xtasa nima qilish kerak?',
        options: ['Signal chalib o\'tish', 'Siz ham to\'xtab, piyoda yo\'qligiga ishonch hosil qilishingiz shart', 'Tezlikni oshirish', 'E\'tibor bermaslik'],
        correct: 1,
        explanation: 'Qo\'shni qatorda avtomobil sekinlashsa yoki to\'xtasa, siz ham to\'xtab piyodani o\'tkazib yuborishingiz shart.',
      },
      {
        id: 4,
        question: 'Svetoforning miltillovchi sariq chirog\'i nimani anglatadi?',
        options: ['Harakatlanish taqiqlangan', 'Chorraha tartibga solinmagan, ehtiyotkorlik bilan o\'tish mumkin', 'Tezlikni oshirish kerak', 'Faqat o\'ngga burilish'],
        correct: 1,
        explanation: 'Miltillovchi sariq chiroq tartibga solinmagan chorrahani bildiradi va ehtiyotkorlik bilan harakatlanishga ruxsat beradi.',
      },
      {
        id: 5,
        question: 'Avtomobilda xavfsizlik kamarini taqish kimlar uchun majburiy?',
        options: ['Faqat haydovchi uchun', 'Haydovchi va oldingi yo\'lovchi uchun', 'Barcha yo\'lovchilar (konstruksiyada belgilangan bo\'lsa)', 'Faqat bolalar uchun'],
        correct: 2,
        explanation: 'Konstruksiyada kamarlar nazarda tutilgan bo\'lsa, haydovchi va barcha yo\'lovchilar kamar taqishi shart.',
      },
    ],
    ru: [
      {
        id: 1,
        question: 'Какова максимально разрешенная скорость в жилых зонах и дворовых территориях?',
        options: ['20 км/ч', '30 км/ч', '40 км/ч', '50 км/ч'],
        correct: 0,
        explanation: 'Согласно ПДД, максимальная скорость в жилых зонах и дворах составляет 20 км/ч.',
      },
      {
        id: 2,
        question: 'Какие световые приборы обязательны в условиях дождя или тумана?',
        options: ['Только габариты', 'Ближний свет фар или противотуманные фары', 'Аварийная сигнализация', 'Дальний свет фар'],
        correct: 1,
        explanation: 'В условиях недостаточной видимости необходимо включать ближний свет фар или противотуманные фары.',
      },
      {
        id: 3,
        question: 'Что делать, если перед пешеходным переходом притормозил автомобиль в соседней полосе?',
        options: ['Посигналить и проехать', 'Также снизить скорость или остановиться, убедившись в отсутствии пешехода', 'Увеличить скорость', 'Проехать без изменений'],
        correct: 1,
        explanation: 'Водитель обязан снизить скорость или остановиться, чтобы убедиться в отсутствии пешеходов.',
      },
      {
        id: 4,
        question: 'О чем предупреждает мигающий желтый сигнал светофора?',
        options: ['Движение запрещено', 'Перекресток нерегулируемый, движение разрешено с осторожностью', 'Нужно резко ускориться', 'Поворот только направо'],
        correct: 1,
        explanation: 'Желтый мигающий сигнал информирует о нерегулируемом перекрестке или пешеходном переходе.',
      },
      {
        id: 5,
        question: 'Для кого обязательно пристегивание ремнем безопасности?',
        options: ['Только для водителя', 'Для водителя и переднего пассажира', 'Для водителя и всех пассажиров (если предусмотрено конструкцией)', 'Только для детей'],
        correct: 2,
        explanation: 'Все находящиеся в автомобиле лица обязаны быть пристегнуты при наличии ремней безопасности.',
      },
    ],
    en: [
      {
        id: 1,
        question: 'What is the maximum legal speed in residential areas and courtyards?',
        options: ['20 km/h', '30 km/h', '40 km/h', '50 km/h'],
        correct: 0,
        explanation: 'According to traffic regulations, the maximum speed in residential zones is 20 km/h.',
      },
      {
        id: 2,
        question: 'Which lights must be turned on during rain or foggy conditions?',
        options: ['Parking lights only', 'Low-beam headlights or front fog lights', 'Hazard warning flashers', 'High-beam headlights'],
        correct: 1,
        explanation: 'Under poor visibility conditions, low-beam headlights or fog lights are mandatory.',
      },
      {
        id: 3,
        question: 'What should you do if a car in the adjacent lane slows down before a crosswalk?',
        options: ['Honk and accelerate', 'Slow down or stop and make sure no pedestrian is crossing', 'Speed up and pass', 'Ignore it'],
        correct: 1,
        explanation: 'Drivers must yield and stop to verify that no pedestrians are crossing the road.',
      },
      {
        id: 4,
        question: 'What does a flashing yellow traffic signal indicate?',
        options: ['Traffic is prohibited', 'Unregulated intersection, proceed with caution', 'Accelerate immediately', 'Right turn only'],
        correct: 1,
        explanation: 'A flashing yellow light warns that the intersection is uncontrolled, requiring extra vigilance.',
      },
      {
        id: 5,
        question: 'Who must wear seatbelts in a passenger vehicle?',
        options: ['Only the driver', 'Driver and front passenger only', 'Driver and all passengers (if equipped)', 'Only children'],
        correct: 2,
        explanation: 'Seatbelts must be worn by both the driver and all passengers in seats equipped with belts.',
      },
    ],
  };

  const questions = quizData[language] || quizData.uz;
  const q = questions[currentIdx] || questions[0];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === q.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((c) => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            {t('quiz_badge')}
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {t('quiz_title')}
          </h3>
        </div>
        {!completed && (
          <div className="text-xs font-bold text-slate-400 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
            {t('quiz_q_label')} {currentIdx + 1} / {questions.length}
          </div>
        )}
      </div>

      {!completed ? (
        <div className="space-y-6">
          <div className="text-lg md:text-xl font-bold text-white leading-relaxed">
            {q.question}
          </div>

          <div className="grid gap-3">
            {q.options.map((opt, idx) => {
              let optStyle = 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';

              if (isAnswered) {
                if (idx === q.correct) {
                  optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (idx === selectedOpt) {
                  optStyle = 'bg-red-500/20 border-red-500 text-red-300';
                } else {
                  optStyle = 'bg-white/5 border-white/5 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${optStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === q.correct && <span className="text-emerald-400 font-bold">✓</span>}
                  {isAnswered && idx === selectedOpt && idx !== q.correct && (
                    <span className="text-red-400 font-bold">✕</span>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 animate-in fade-in duration-200">
              <strong className="text-purple-300 block mb-1">
                {language === 'ru' ? 'Обоснование правила:' : language === 'en' ? 'Traffic Rule Basis:' : 'Qoidaga asos:'}
              </strong>
              {q.explanation}
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/25 transition-all"
              >
                {currentIdx < questions.length - 1 ? t('quiz_next') : t('quiz_finish')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 space-y-6">
          <div className="text-6xl animate-bounce">
            {score >= 4 ? '🏅' : score >= 3 ? '👍' : '⚠️'}
          </div>
          <div>
            <h4 className="text-3xl font-extrabold text-white mb-2">
              {score >= 4
                ? (language === 'ru' ? 'Отличный результат! Эксперт дорог' : language === 'en' ? 'Excellent! Expert Driver' : 'Ajoyib natija! Mutaxassis haydovchi')
                : (language === 'ru' ? 'Хороший результат! Ответственный гражданин' : language === 'en' ? 'Good job! Responsible Citizen' : 'Yaxshi natija! Mas\'uliyatli fuqaro')}
            </h4>
            <p className="text-slate-400 text-sm">
              {questions.length} {t('quiz_score_msg')} <span className="text-purple-400 font-bold text-lg">{score}</span>
            </p>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/25 transition-all"
            >
              {t('quiz_restart')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
