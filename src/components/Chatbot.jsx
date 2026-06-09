import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    
    const handleLanguageSelect = (lang) => {
        setLanguage(lang);
        if (lang === "English") {
            setMessages([{ sender: "bot", text: "Hello! I am Birdy 🐦. How can I help you today?" }]);
        } else if (lang === "Sinhala") {
            setMessages([{ sender: "bot", text: "ආයුබෝවන්! මම Birdy 🐦. මම කොහොමද උදව් කරන්නේ?" }]);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
                message: userMessage.text,
                language: language
            });
            
            const botMessage = { sender: "bot", text: response.data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: "bot", text: language === "Sinhala" ? "සමාවෙන්න, මට පොඩි ප්‍රශ්නයක් වුණා." : "Sorry, I encountered an error." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-gray-200">
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold flex items-center gap-2">
                            <span>🤖</span> Birdy Assistant
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:text-red-300 font-bold text-xl">✕</button>
                    </div>

                    {!language ? (
                        <div className="flex-1 p-4 flex flex-col items-center justify-center gap-5 bg-blue-50">
                            <div className="text-center">
                                <p className="font-bold text-gray-700 text-lg">Welcome to BirdParadise! 🌴</p>
                                <p className="text-gray-500 text-sm mt-1">Please select your language<br/>කරුණාකර භාෂාව තෝරන්න</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => handleLanguageSelect("English")} className="bg-gray-800 text-white px-5 py-2 rounded-full shadow hover:bg-black transition">
                                    English
                                </button>
                                <button onClick={() => handleLanguageSelect("Sinhala")} className="bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition">
                                    සිංහල
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 p-4 overflow-y-auto bg-blue-50 flex flex-col gap-3">
                            {messages.map((msg, index) => (
                                <div key={index} className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${
                                    msg.sender === "user" 
                                    ? "bg-blue-500 text-white self-end rounded-br-none" 
                                    : "bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none"
                                }`}>
                                    {msg.text}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="bg-white border border-gray-200 text-gray-500 self-start p-3 rounded-lg rounded-bl-none shadow-sm text-sm italic">
                                    Birdy is typing...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}

                    {language && (
                        <div className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                placeholder={language === "Sinhala" ? "ඔබේ පණිවිඩය..." : "Type a message..."}
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 text-sm"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={isLoading}
                                className="bg-blue-600 text-white w-10 h-10 rounded-full flex justify-center items-center hover:bg-blue-700 disabled:bg-blue-300 transition shadow-md"
                            >➤</button>
                        </div>
                    )}
                </div>
            )}

            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-blue-600 rounded-full flex justify-center items-center shadow-2xl hover:scale-110 transition-transform duration-300 border-4 border-white"
                >
                    <span className="text-2xl">🤖</span>
                </button>
            )}
        </div>
    );
}
