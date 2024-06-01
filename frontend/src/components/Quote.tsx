const Testimonials = [
    {
        writer: "Jules Winnfield",
        position: "CEO, Acme Inc",
        comment: "“The customer service I received was exceptional. The support team went above and beyond to address my concerns.“"
    },
    {
        writer: "Mia Wallace",
        position: "COO, Globex Corporation",
        comment: "“I've never experienced such swift and efficient support. My issues were resolved in no time.“"
    },
    {
        writer: "Vincent Vega",
        position: "CTO, Initech",
        comment: "“Their technical team is incredibly knowledgeable and helpful. They solved my problem with ease.“"
    },
    {
        writer: "Butch Coolidge",
        position: "Founder, Coolidge Enterprises",
        comment: "“A fantastic customer experience! The team was friendly, attentive, and truly cared about my satisfaction.“"
    },
    {
        writer: "Marsellus Wallace",
        position: "Managing Director, Marcellus Corp",
        comment: "“Professional and prompt service every time. Highly recommend for any business needing reliable support.“"
    },
    {
        writer: "Honey Bunny",
        position: "Marketing Director, Bunny Holdings",
        comment: "“The support we received was nothing short of amazing. They went out of their way to help us.“"
    },
    {
        writer: "Pumpkin",
        position: "Sales Manager, Pumpkin Inc",
        comment: "“Top-notch customer service! They listened to our needs and provided effective solutions.“"
    },
    {
        writer: "Winston Wolfe",
        position: "Consultant, Problem Solvers Ltd",
        comment: "“Efficiency and professionalism define their support team. They quickly resolved our issues with great expertise.“"
    }
];

export default function Quote () {
    const rand = Math.floor(Math.random()*Testimonials.length);
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-200">
            <div className="text-center max-w-2xl p-8">
                <p className="text-2xl font-bold mb-4">
                    {Testimonials[rand].comment}
                </p>
                <p className="text-lg font-bold mt-6">
                    {Testimonials[rand].writer}
                </p>
                <p className="text-gray-500">
                    {Testimonials[rand].position}
                </p>
            </div>
        </div>
    );
} 