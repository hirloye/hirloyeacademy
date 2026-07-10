"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Irshad Ahamed",
    reviews: "1 review",
    time: "2 months ago",
    text: "“I had an excellent experience working with Hirloye Digital Marketing. From the beginning, their team understood our business goals and created a customized strategy that actually delivered results.”",
    rating: 5,
  },
  {
    name: "Nisha Nisha",
    reviews: "1 review",
    time: "3 months ago",
    text: "“Excellent digital marketing service! The team at HIRLOYE really understands business needs and delivers creative strategies that bring real results. Highly recommended for anyone looking to grow their brand online”",
    rating: 5,
  },
  {
    name: "Akash L",
    reviews: "1 review",
    time: "3 months ago",
    text: "“Great experience working with Hirloye! They helped us with Google Ads and saw results fast. Recommended.”",
    rating: 5,
  },
  {
    name: "As Vigneshwar",
    reviews: "1 review",
    time: "3 months ago",
    text: "“Honestly didn't expect such good results from our first ad campaign. Hirloye kept things simple and transparent. Happy client here 👍”",
    rating: 5,
  },
  {
    name: "Akash Kumark",
    reviews: "2 reviews",
    time: "3 months ago",
    text: "“HIRLOYE helped us improve our online presence and generate quality leads through digital marketing. Their support, creativity, and quick response make them a great team to work with. 👍”",
    rating: 5,
  },
  {
    name: "Pragadhesh",
    reviews: "",
    time: "",
    text: "“Great digital marketing service. Professional team and very supportive. Highly satisfied.”",
    rating: 5,
  },
  {
    name: "Mohammed Basith",
    reviews: "Local Guide · 7 reviews",
    time: "Edited 2 months ago",
    text: "“Hirloye is the best digital marketing agency in Chennai, and they do excellent work.”",
    rating: 5,
  },
  {
    name: "Trisk",
    reviews: "2 reviews",
    time: "7 months ago",
    text: "“Hirloye Digital Marketing has completely improved our online presence. Their team is fast, responsive, and truly understands business needs. Within weeks, we saw better engagement and more customer inquiries. Highly recommended for anyone who wants real results.”",
    rating: 5,
  },
  {
    name: "yassir ali",
    reviews: "5 reviews",
    time: "2 months ago",
    text: "“Very nice place to work and freindly environment”",
    rating: 5,
  },
  {
    name: "Dinesh Babu",
    reviews: "2 reviews",
    time: "2 months ago",
    text: "“Excellent in digital marketing service”",
    rating: 5,
  },
  {
    name: "Local",
    reviews: "3 reviews",
    time: "3 months ago",
    text: "“Very professional and result-oriented digital marketing company. HIRLOYE provided great support with social media marketing and Meta ads. We started getting good enquiries after working with them. 💯”",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="flex-shrink-0 w-[350px] md:w-[450px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mx-4">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{testimonial.name}</h4>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <span>{testimonial.reviews}</span>
            <span>•</span>
            <span>{testimonial.time}</span>
          </div>
        </div>
      </div>
      <div className="flex">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </div>
    <p className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
      {testimonial.text}
    </p>
  </div>
);

export const Testimonials = () => {
  // We repeat the testimonials to create a seamless loop
  const numSets = 15;
  const row1 = Array(numSets).fill(testimonials).flat();
  const row2 = Array(numSets).fill([...testimonials].reverse()).flat();

  return (
    <section className="w-full py-20 bg-gray-50 dark:bg-gray-900/50 overflow-hidden relative border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 md:px-6 mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Hear from the businesses we've helped grow.
        </p>
      </div>

      <div className="relative flex flex-col gap-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Row 1 - Moves Left */}
        <div className="flex w-fit animate-marquee-left hover:[animation-play-state:paused]">
          {row1.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={t} />
          ))}
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex w-fit animate-marquee-right hover:[animation-play-state:paused]">
          {row2.map((t, i) => (
            <TestimonialCard key={`row2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / ${numSets})); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(calc(-100% / ${numSets})); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}} />
    </section>
  );
};
