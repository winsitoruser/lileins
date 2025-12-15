import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
    question: string;
    answer: string;
};

const faqData: FAQItem[] = [
    {
        question: "What is the benefit of $EinzStake?",
        answer:
            "$EinzStake allows you to lock your $Einz tokens to earn passive rewards (APY). These rewards are funded by the Einstein Endowment (4 Billion tokens), designed for long-term incentives.",
    },
    {
        question: "How does $EinzExplorer ensure transparency?",
        answer:
            "$EinzExplorer serves as the community's audit tool. You can verify on-chain how token allocations (especially Marketing and Chain Reserves vesting) are unlocked according to the schedule detailed in the Whitepaper.",
    }
];

export default function FAQAccordionEcosystem() {
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
                        ❓ Ecosystem & Utility
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
