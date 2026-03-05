import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_RAG_API_URL || "http://localhost:8001/chat";

const initialMessage = {
    role: "assistant",
    text: "Hi! I am MANO Assistant. Ask me anything about MANO services, projects, or company details.",
    sources: []
};

const defaultSuggestedQuestions = [
    "What services does MANO offer?",
    "Where is MANO Projects located?",
    "When was MANO established?",
    "How can I contact MANO?"
];

function getSuggestedQuestionsByPath(pathname) {
    const pagePath = (pathname || "").toLowerCase();

    if (pagePath.includes("/services")) {
        return [
            "What services does MANO offer?",
            "Tell me about Contract Management key focus areas.",
            "What is included in QA/QC services?",
            "How does MANO handle project planning?"
        ];
    }

    if (pagePath.includes("/projects")) {
        return [
            "What types of projects has MANO delivered?",
            "Which industries does MANO serve?",
            "What is MANO's project delivery model?",
            "How does MANO ensure quality in projects?"
        ];
    }

    if (pagePath.includes("/careers")) {
        return [
            "What job opportunities are available at MANO?",
            "Which locations are hiring currently?",
            "What qualifications are expected for roles?",
            "How can I apply for a position at MANO?"
        ];
    }

    if (pagePath.includes("/about-us")) {
        return [
            "When was MANO established and by whom?",
            "What are MANO's mission and vision?",
            "Who are the key leaders at MANO?",
            "Where is MANO head office located?"
        ];
    }

    return defaultSuggestedQuestions;
}

export default function ChatbotWidget() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([initialMessage]);
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, loading, isOpen]);

    const sendMessage = async (overrideQuestion) => {
        const question = (overrideQuestion ?? input).trim();
        if (!question || loading) return;

        const userMessage = { role: "user", text: question, sources: [] };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: data?.answer || "I couldn't generate an answer right now.",
                    sources: Array.isArray(data?.sources) ? data.sources : []
                }
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "I couldn't reach the assistant service right now. Please try again in a moment.",
                    sources: []
                }
            ]);
            console.error("[ChatbotWidget] Chat request failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const isGatewayPage = location.pathname === "/";
    if (isGatewayPage) {
        return null;
    }

    const suggestedQuestions = getSuggestedQuestionsByPath(location.pathname);

    return (
        <div className="fixed bottom-6 right-6 z-[120]">
            {isOpen && (
                <div className="absolute bottom-0 right-[calc(100%+12px)] w-[92vw] max-w-sm rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-white">
                            <Bot size={18} className="text-blue-400" />
                            <span className="font-semibold">MANO Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Close chatbot"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div ref={listRef} className="h-80 overflow-y-auto custom-scrollbar px-3 py-3 space-y-3">
                        {messages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[86%] rounded-xl px-3 py-2 text-sm leading-relaxed ${message.role === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white/10 text-gray-100 border border-white/10"
                                    }`}>
                                    <p className="whitespace-pre-wrap">{message.text}</p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="max-w-[86%] rounded-xl px-3 py-2 text-sm bg-white/10 text-gray-100 border border-white/10 flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin" />
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-3 pb-2">
                        <p className="text-[11px] text-gray-400 mb-2">Recommended questions</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedQuestions.map((question) => (
                                <button
                                    key={question}
                                    type="button"
                                    onClick={() => sendMessage(question)}
                                    disabled={loading}
                                    className="text-xs px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-3 border-t border-white/10 bg-black/30">
                        <div className="flex items-center gap-2">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                rows={1}
                                placeholder="Ask about MANO..."
                                className="flex-1 resize-none rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500/60"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                                aria-label="Send message"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-all"
                aria-label="Open chatbot"
            >
                <MessageCircle size={24} />
            </button>
        </div>
    );
}
