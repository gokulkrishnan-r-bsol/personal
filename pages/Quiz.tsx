import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Heart, Stars, Crown } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  hint?: string;
  check: (ans: string) => boolean;
  response: (ans: string) => string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What nickname do we use for each other?",
    hint: "It starts with P...",
    check: (ans) => true,
    response: (ans) => {
      const lower = ans.toLowerCase();

      if (lower.includes("papa"))
        return "YES! Correct! We are Papa foreverrrrr 🐣💗";

      if (lower.includes("baby") || lower.includes("babe") || lower.includes("love"))
        return `Aww "${ans}" is cute but our official nickname is Papa 😌❤️`;

      return `"${ans}"?? Adorable answer but nope… it's Papa! 😏`;
    }
  },
  {
    id: 2,
    text: "Who is the cutest Papa in the world?",
    hint: "Me? You? Us?",
    check: (ans) => true,
    response: (ans) => {
      const lower = ans.toLowerCase();

      if (lower.includes("me"))
        return "Woooooow confidence level = 1000 😂 but ok yes you cute 😘";

      if (lower.includes("you"))
        return "Awww really? I accept the award 😌✨";

      if (lower.includes("us"))
        return "YES! Team Papa = cutest combo ever 💕";

      return `Interesting answer "${ans}" but actually Papa is the cutest 😏💗`;
    }
  },
  {
    id: 3,
    text: "Who stole whose heart first?",
    hint: "Be VERY honest 😏",
    check: (ans) => true,
    response: (ans) => {
      const lower = ans.toLowerCase();

      if (lower.includes("me") || lower.includes("she"))
        return "Correct! You stole it first and kept it hidden for 4 months 😌💘";

      if (lower.includes("you") || lower.includes("he"))
        return "Nice try 😳 but actually YOU fell first, mister slowly slowly 😏❤️";

      if (lower.includes("both"))
        return "Almost true… but you definitely started earlier 😆💗";

      return `"${ans}" huh? Cute answer, but evidence says YOU stole first 😘`;
    }
  },
  {
    id: 4,
    text: "How much do I love Arthi?",
    hint: "A number? A lot? Infinity?",
    check: (ans) => true,
    response: (ans) => {
      const lower = ans.toLowerCase();

      if (lower.includes("infinity") || lower.includes("infinite"))
        return "Infinity isn't enough to measure it 🚀🌌💞";

      if (lower.includes("a lot") || lower.includes("so much") || lower.includes("too much"))
        return "Correct! More than a lot, more than too much, more than everything 💗";

      if (lower.includes("100") || lower.includes("1000") || lower.includes("million") || lower.includes("billion") || lower.includes("10"))
        return "Numbers can't contain this love 😤❤️ but cute answer!";

      if (lower.includes("more") || lower.includes("most"))
        return "Yes! More than more, most than most 😘";

      return `"${ans}" — I love Arthi even more than that 😏💘`;
    }
  },
  {
    id: 5,
    text: "What is the fastest way to calm me down?",
    hint: "😂",
    check: (ans) => true,
    response: (ans) => {
      const lower = ans.toLowerCase();

      if (lower.includes("hug") || lower.includes("cuddle") || lower.includes("hold"))
        return "YES! Certified emotional medicine 🫂💗 Works 10/10 every time!";

      if (lower.includes("show"))
        return "YES! but not at every time.😅!";

      if (lower.includes("food") || lower.includes("snack") || lower.includes("chocolate"))
        return "True… snacks fix 70% of problems and 100% of mood swings 😂🍫";

      if (lower.includes("kiss") || lower.includes("smooch"))
        return "Correct! And we should run more experiments to confirm 😳💋";

      if (lower.includes("talk") || lower.includes("listen"))
        return "Awwww that's so thoughtful 🥺 Words + love = calm mode activated 💞";

      if (lower.includes("sleep") || lower.includes("nap"))
        return "Also true 😂 A tiny nap and problem disappears like magic 😴💫";

      return `Oooo interesting method: "${ans}" 😌 I'll try it next time!`;
    }
  }
];


const Quiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const q = questions[currentQ];
    const correct = q.check(input);
    const res = q.response(input);
    
    setIsCorrect(correct);
    setResultText(res);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setInput("");
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    }
  };

  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto min-h-[70vh] px-6">
      <div className="w-full mb-8">
         <div className="flex justify-between text-xs font-bold text-pink-500 mb-2 uppercase tracking-widest">
            <span>Level {currentQ + 1}</span>
            <span>{questions.length} Levels</span>
         </div>
         <div className="h-2 w-full bg-pink-100 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
            />
         </div>
      </div>

      <motion.div className="w-full relative">
        <div className="absolute -top-10 -left-10 text-yellow-300 animate-pulse">
            <Stars size={40} />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8 drop-shadow-sm">
          Papa's Quiz Time 🍭
        </h2>

        <AnimatePresence mode='wait'>
            {!showResult ? (
                <motion.form
                    key="question"
                    initial={{ x: 50, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -50, opacity: 0, scale: 0.9 }}
                    onSubmit={handleAnswer}
                    className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 relative overflow-hidden"
                >
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="mb-8 relative z-10">
                        <div className="flex justify-center mb-4">
                            <span className="bg-pink-100 text-pink-600 p-3 rounded-full">
                                <Crown size={32} />
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 text-center leading-tight">
                            {questions[currentQ].text}
                        </h3>
                        {questions[currentQ].hint && (
                            <p className="text-center text-gray-400 text-sm mt-3 italic">
                                Hint: {questions[currentQ].hint}
                            </p>
                        )}
                    </div>

                    <div className="relative z-10">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your answer..."
                            className="w-full bg-pink-50/50 border-2 border-pink-200/50 rounded-2xl px-6 py-4 text-gray-700 text-lg text-center font-medium focus:outline-none focus:border-purple-400 focus:bg-white focus:shadow-lg transition-all placeholder-pink-300"
                            autoFocus
                        />
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full mt-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
                        >
                            <span>Lock in Answer</span>
                            <Send size={18} />
                        </motion.button>
                    </div>
                </motion.form>
            ) : (
                <motion.div
                    key="result"
                    initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border-4 border-purple-200 text-center relative overflow-hidden"
                >
                    {/* Confetti Background effect (simplified) */}
                    <div className="absolute inset-0 bg-purple-50 opacity-50 z-0"></div>
                    
                    <div className="relative z-10">
                        <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                        transition={{
                            scale: { type: "spring", stiffness: 200, delay: 0.2 },
                            rotate: { duration: 0.3, ease: "easeInOut" },
                        }}
                        className="flex justify-center mb-6"
                    >

                            {isCorrect || true ? (
                                <div className="bg-green-100 p-4 rounded-full text-green-500 shadow-inner">
                                    <CheckCircle2 size={48} />
                                </div>
                            ) : (
                                <div className="bg-pink-100 p-4 rounded-full text-pink-500 shadow-inner">
                                    <Heart size={48} />
                                </div>
                            )}
                        </motion.div>
                        
                        <h4 className="text-2xl font-bold text-purple-800 mb-2">
                           {isCorrect ? "Perfect!" : "So sweet!"}
                        </h4>
                        
                        <p className="text-lg font-medium text-gray-600 mb-8 leading-relaxed">
                            "{resultText}"
                        </p>
                        
                        {currentQ < questions.length - 1 ? (
                            <button 
                                onClick={nextQuestion}
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-transform hover:scale-105"
                            >
                                Next Question
                            </button>
                        ) : (
                            <div className="text-purple-500 font-bold animate-bounce bg-purple-100 py-3 rounded-xl">
                                Quiz Complete! Turn the page... 👉
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Quiz;