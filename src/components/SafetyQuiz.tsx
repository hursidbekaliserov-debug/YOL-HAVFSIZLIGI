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
        question: 'Какова максимально разрешенная скорость в жилых зонах?',
        options: ['20 км/ч', '30 км/ч', '40 км/ч', '50 км/ч'],
        correct: 0,
        explanation: 'Согласно ПДД Узбекистана, в жилых зонах и дворовых территориях скорость ограничена до 20 км/ч.',
      },
      {
        id: 2,
        question: 'Какие световые приборы обязательны в условиях дождя или тумана днем?',
        options: ['Только габариты', 'Ближний свет фар или противотуманные фары', 'Аварийная сигнализация', 'Дальний свет фар'],
        correct: 1,
        explanation: 'В условиях недостаточной видимости необходимо включать ближний свет фар или противотуманки.',
      },
      {
        id: 3,
        question: 'Если перед пешеходным переходом остановился автомобиль в соседнем ряду, что вы должны сделать?',
        options: ['Подать сигнал и продолжить', 'Также остановиться и убедиться в отсутствии пешехода', 'Увеличить скорость', 'Продолжать движение без остановки'],
        correct: 1,
        explanation: 'Если автомобиль снизил скорость или остановился, водители соседних рядов обязаны также остановиться.',
      },
      {
        id: 4,
        question: 'Что означает желтый мигающий сигнал светофора?',
        options: ['Движение запрещено', 'Перекресток нерегулируемый, разрешено движение с осторожностью', 'Требуется ускорение', 'Поворот только направо'],
        correct: 1,
        explanation: 'Желтый мигающий сигнал информирует о нерегулируемом перекрестке или пешеходном переходе.',
      },
      {
        id: 5,
        question: 'Для кого обязательно пристегиваться ремнем безопасности?',
        options: ['Только водитель', 'Водитель и передний пассажир', 'Все находящиеся в авто (при наличии ремней)', 'Только дети'],
        correct: 2,
        explanation: 'Все пассажиры и водитель обязаны быть пристегнуты, если ремни предусмотрены конструкцией.',
      },
    ],
    en: [
      {
        id: 1,
        question: 'What is the maximum speed limit in residential zones?',
        options: ['20 km/h', '30 km/h', '40 km/h', '50 km/h'],
        correct: 0,
        explanation: 'According to traffic regulations, speed in residential zones is restricted to 20 km/h.',
      },
      {
        id: 2,
        question: 'Which lights must be on in rainy or foggy daytime conditions?',
        options: ['Parking lights only', 'Low beam headlights or fog lights', 'Hazard lights', 'High beam headlights'],
        correct: 1,
        explanation: 'In poor visibility conditions, low beams or fog lights are mandatory.',
      },
      {
        id: 3,
        question: 'If a car in an adjacent lane stops before a crosswalk, what must you do?',
        options: ['Honk and proceed', 'Also stop and ensure no pedestrian is crossing', 'Accelerate', 'Ignore and continue'],
        correct: 1,
        explanation: 'You must also come to a stop and make sure the pedestrian crossing is clear.',
      },
      {
        id: 4,
        question: 'What does a flashing yellow traffic light indicate?',
        options: ['Traffic prohibited', 'Unregulated junction, proceed with caution', 'Accelerate fast', 'Turn right only'],
        correct: 1,
        explanation: 'A flashing yellow light warns of an uncontrolled intersection or pedestrian crossing.',
      },
      {
        id: 5,
        question: 'Who must wear seatbelts in a passenger vehicle?',
        options: ['Driver only', 'Driver and front passenger', 'All passengers if belts are equipped', 'Children only'],
        correct: 2,
        explanation: 'All occupants in vehicles equipped with seatbelts must buckle up.',
      },
    ],
  };

  const list = quizData[language] || quizData.uz;
  const q = list[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === q.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < list.length) {
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
    <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xl shadow-gray-100/80">
      <div className="flex items-center justify-between pb-5 border-b border-gray-200 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-2">
            ● {t('quiz_badge')}
          </div>
          <h3 className="text-2xl font-black text-[#111827] tracking-tight">
            {t('quiz_title')}
          </h3>
          <p className="text-gray-500 text-xs mt-1">
            {t('quiz_subtitle')}
          </p>
        </div>
        {!completed && (
          <span className="text-xs font-bold text-[#0E9F79] bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full">
            {currentIdx + 1} / {list.length} {t('quiz_counter')}
          </span>
        )}
      </div>

      {completed ? (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-[#16C79A] text-4xl flex items-center justify-center mx-auto shadow-md">
            🏆
          </div>
          <h4 className="text-2xl font-black text-[#111827]">
            {score === list.length ? 'A\'lo natija! Mukammal bilim!' : 'Test yakunlandi!'}
          </h4>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Siz {list.length} ta savoldan <span className="font-bold text-[#16C79A] text-lg">{score}</span> tasiga to&apos;g&apos;ri javob berdingiz.
          </p>
          <button
            onClick={handleRestart}
            className="bg-[#16C79A] hover:bg-[#12a37d] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95"
          >
            Qaytadan topshirish
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-[#111827]">
            {q.id}. {q.question}
          </h4>

          <div className="grid sm:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let optStyle = 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100';
              if (isAnswered) {
                if (idx === q.correct) {
                  optStyle = 'bg-teal-50 border-[#16C79A] text-[#0E9F79] font-bold';
                } else if (idx === selectedOpt) {
                  optStyle = 'bg-rose-50 border-rose-400 text-rose-600 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 ${optStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold shrink-0 text-gray-700 shadow-sm">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="mt-0.5 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-gray-700 leading-relaxed animate-in fade-in">
              <span className="font-bold text-[#0E9F79] block mb-1">Izoh va Qoida:</span>
              {q.explanation}
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="bg-[#16C79A] hover:bg-[#12a37d] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95"
              >
                Keyingi savol →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
