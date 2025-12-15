import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
    question: string;
    answer: string;
};

const faqData: FAQItem[] = [
    {
        question: "How many tokens are allocated for the Presale?",
        answer:
            "5 Billion tokens (25% of the total supply) are allocated for the presale, distributed across 12 escalating price stages.",
    },
    {
        question: "What is Presale Vesting and why is it important?",
        answer:
            "Presale Vesting is a token locking mechanism designed to ensure price stability post-launch. Your Presale tokens will have: 0% unlock at TGE, followed by a 2-month Cliff, and then 15% released monthly thereafter. This prevents massive initial selling pressure (dumping).",
    },
    {
        question: "What is the Initial Circulating Supply at TGE?",
        answer: "The initial circulating supply is estimated to be around 6.6 Billion tokens (approx. 33%), primarily consisting of Liquidity and CEX Reserves needed for the initial launch.",
    },
];

export default function FAQAccordionPresale() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq">
            <div className="">
                {/* Header */}
                <div className="mb-8 text-left">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                        ❓ Presale & Vesting
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-6">
                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={index} className="w-full">
                                {/* Button */}
                                <button
                                    onClick={() => toggle(index)}
                                    className="
                                        w-full
                                        flex items-center justify-between
                                        bg-linear-to-r from-primary via-accent to-secondary
                                        text-white
                                        font-black
                                        text-lg md:text-xl
                                        px-8
                                        h-20
                                        rounded-full
                                        shadow-xl
                                        border-4 border-white
                                        hover:opacity-90
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    <span>
                                        Q : {item.question}
                                    </span>

                                    <ChevronDown
                                        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* Content */}
                                <div
                                    className={`
                                        overflow-hidden
                                        transition-all
                                        duration-300
                                        ease-in-out
                                        ${isOpen ? "max-h-40 mt-4" : "max-h-0"}
                                    `}
                                >
                                    <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 leading-relaxed shadow-inner">
                                        <span className="font-semibold">A:</span>{" "}
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
