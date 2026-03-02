export default function ChapterFooter({ chapterName }: { chapterName: string }) {
    return (
        <div className="w-full mt-24 pb-8 flex flex-col items-center justify-center">
            <div className="bg-white/60 backdrop-blur-md px-10 py-4 rounded-full border-2 border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <p className="text-gray-600 font-bold text-lg md:text-xl tracking-wide">
                    Physics - Chapter <span className="text-purple-500 mx-2">→</span> {chapterName} <span className="text-gray-300 mx-2">|</span> <span className="text-blue-500">skillizee.io</span>
                </p>
            </div>

            {/* Playful Easter Egg Mascot Element */}
            <div className="mt-6 flex gap-2 overflow-hidden items-end justify-center h-12">
                <div className="w-8 h-8 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-8 h-8 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
        </div>
    );
}
