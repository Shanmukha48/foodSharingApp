"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Counter from "@/components/ui/Counter";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowRight, AlertTriangle, TrendingUp, Droplets, Trash2 } from "lucide-react";

const stats = [
  { value: 68, suffix: "M Tons", label: "Yearly household food waste in India", icon: Trash2, color: "from-red-500 to-orange-500" },
  { value: 1, prefix: "$", suffix: " Trillion", label: "Estimated global value of wasted food annually", icon: TrendingUp, color: "from-yellow-500 to-amber-500" },
  { value: 190, suffix: "M+", label: "People go hungry in India every night", icon: AlertTriangle, color: "from-primary to-emerald" },
  { value: 33, suffix: "%", label: "Of all food produced globally is wasted", icon: Droplets, color: "from-blue-400 to-cyan-500" },
];

const crisisCards = [
  {
    title: "Systemic Food Waste",
    desc: "Commercial venues and large events contribute to tons of perfectly edible food being discarded daily due to inefficient collection systems.",
    gradient: "from-red-500/10 to-orange-500/10",
    border: "border-red-500/20",
  },
  {
    title: "Rising Food Insecurity",
    desc: "Cities face a growing gap where low-income communities suffer from lack of access to nutritious meals despite being near surplus sources.",
    gradient: "from-amber-500/10 to-yellow-500/10",
    border: "border-amber-500/20",
  },
];

const challenges = [
  { title: "Lagging Response", desc: "Most NGOs operate on fixed schedules rather than real-time surplus availability.", icon: "⏱️" },
  { title: "Logistical Strain", desc: "Donors often lack transport means to distribution centers.", icon: "🚚" },
  { title: "Safety Assurance", desc: "No standardized digital verification exists for food quality.", icon: "🛡️" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

export default function LandingPageSections() {
  return (
    <>
      {/* Urban Crisis Section */}
      <section id="about" className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader label="The Crisis" title="The Urban" highlight="Food Crisis" subtitle="Systemic failures in food distribution create a paradox of waste and hunger happening simultaneously in the same cities." />
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {crisisCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.15}>
                <div className={`glass-panel p-8 hover-glow bg-gradient-to-br ${card.gradient} border ${card.border} h-full`}>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-white">{card.title}</h3>
                  <p className="text-textGray leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Global Scale / Stats Section */}
      <section id="impact" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeader label="Scale of the Problem" title="The Numbers" highlight="Don't Lie" subtitle="Understanding the scale of food waste and hunger is the first step toward solving it." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="glass-panel p-6 hover-glow text-center group cursor-default">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <s.icon size={22} className="text-black" />
                  </div>
                  <div className="text-3xl font-heading font-bold text-white mb-2">
                    <Counter end={s.value} suffix={s.suffix} prefix={s.prefix} />
                  </div>
                  <p className="text-textGray text-sm leading-tight">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Market Challenges */}
      <section className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader label="Market Challenges" title="What's" highlight="Broken" subtitle="Current systems fail at the very moment they're needed most — during surplus availability windows." />
          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.15}>
                <div className="glass-panel p-8 hover-glow border border-white/5 group h-full">
                  <span className="text-4xl mb-5 block">{c.icon}</span>
                  <h3 className="text-xl font-heading font-semibold mb-3 text-white group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-textGray text-sm leading-relaxed">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About ShareByte */}
      <section id="platform" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-emerald/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">About ShareByte</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">An Intelligent <span className="text-gradient">Ecosystem</span> for Food Redistribution</h2>
                <p className="text-textGray leading-relaxed mb-8">ShareByte is designed for hyper-local food redistribution — connecting surplus donors with those in need through intelligent matching algorithms, real-time geo-fencing, and transparent supply chain tracking.</p>
                <div className="grid grid-cols-2 gap-4">
                  {["Instant matching algorithm", "Transparent supply chain", "Real-time geo-fencing", "AI-powered surplus prediction"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-textGray">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Response Time", value: "< 2 min", sub: "average alert delivery" },
                { label: "Match Rate", value: "94%", sub: "successful donations matched" },
                { label: "Cities", value: "28+", sub: "active across India" },
                { label: "Food Saved", value: "850K+", sub: "meals redistributed" },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div className="glass-panel p-6 hover-glow text-center">
                    <div className="text-2xl font-heading font-bold text-gradient mb-1">{item.value}</div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-textGray text-xs mt-1">{item.sub}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operational Flow */}
      <section id="flow" className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader label="How It Works" title="Four Steps," highlight="One Mission" subtitle="A seamless flow from surplus to impact — designed for speed, safety, and scale." />
          <div className="grid md:grid-cols-4 gap-6 relative">
            {[
              { step: "01", title: "Register", desc: "Create a verified profile as a donor, NGO, or volunteer.", icon: "👤" },
              { step: "02", title: "Broadcast", desc: "Donor posts surplus food details and expiry window.", icon: "📡" },
              { step: "03", title: "Route", desc: "Smart system alerts the nearest active recipient instantly.", icon: "🗺️" },
              { step: "04", title: "Deliver", desc: "Tracked pickup and digital quality verification.", icon: "✅" },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.15}>
                <div className="glass-panel p-6 hover-glow relative group">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className="text-primary text-xs font-mono font-bold mb-2">STEP {s.step}</div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-white group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-textGray text-sm leading-relaxed">{s.desc}</p>
                  {i < 3 && <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary/50 z-10" size={20} />}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeader label="Ecosystem" title="Who's" highlight="Involved" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["🏨 Hotels", "🏥 Hospitals", "🍽️ Restaurants", "🤝 NGOs", "👐 Volunteers", "🚚 Delivery Partners"].map((s, i) => (
              <FadeIn key={s} delay={i * 0.07}>
                <div className="glass-panel p-5 hover-glow text-center group cursor-default">
                  <span className="text-3xl block mb-2">{s.split(" ")[0]}</span>
                  <span className="text-textGray text-sm group-hover:text-white transition-colors">{s.split(" ").slice(1).join(" ")}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Core Functionality */}
      <section className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader label="Core Features" title="Built for" highlight="Real Impact" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔔", title: "Real-time Alerts", desc: "Push notifications based on proximity and donation type. Sub-minute delivery windows." },
              { icon: "📍", title: "Live Tracking", desc: "End-to-end tracking of every delivery with real-time status updates." },
              { icon: "✅", title: "Digital QC", desc: "Food safety verification checklists and digital quality assurance certificates." },
              { icon: "📊", title: "ESG Metrics", desc: "Carbon footprint calculations and community impact analytics dashboards." },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <div className="glass-panel p-6 hover-glow group h-full">
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-textGray text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Byte AI */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="glass-panel p-12 border border-primary/20 hover-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">Smart Byte AI</span>
                <h2 className="text-4xl font-heading font-bold mb-6 leading-tight">Powered by a Proprietary <span className="text-gradient">Time-Sensitivity Score</span></h2>
                <p className="text-textGray leading-relaxed mb-6">Unlike simple directory apps, ShareByte uses a dynamic scoring engine that calculates viability windows, traffic conditions, and delivery optimization in real time.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Food viability windows", "Traffic-aware routing", "Delivery optimization", "Smart prioritization"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-textGray">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />{f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Food Freshness Score", value: 87, color: "bg-primary" },
                  { label: "Delivery Urgency", value: 72, color: "bg-yellow-400" },
                  { label: "Match Confidence", value: 94, color: "bg-blue-400" },
                  { label: "Route Efficiency", value: 68, color: "bg-emerald" },
                ].map(bar => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-textGray">{bar.label}</span>
                      <span className="text-white font-medium">{bar.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className={`h-full ${bar.color} rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${bar.value}%` }} transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader label="Social & Eco Impact" title="Our" highlight="Impact" subtitle='Aligning with UN Sustainable Development Goal 12.3 — "Halve per capita global food waste by 2030."' />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🍽️", value: 850432, suffix: "+", label: "Projected Meals Redistributed", sub: "across 28 cities" },
              { icon: "🌍", value: 1200, suffix: " Tons", label: "CO₂ Offset", sub: "equivalent to 260 cars off road annually" },
              { icon: "💧", value: 300000, suffix: " L", label: "Water Saved", sub: "through waste reduction" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.15}>
                <div className="glass-panel p-8 hover-glow text-center group">
                  <span className="text-5xl block mb-4">{item.icon}</span>
                  <div className="text-3xl font-heading font-bold text-gradient mb-2">
                    <Counter end={item.value} suffix={item.suffix} />
                  </div>
                  <p className="text-white font-medium mb-1">{item.label}</p>
                  <p className="text-textGray text-sm">{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeader label="Future Vision" title="Scale &" highlight="Expansion" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🤖", title: "AI Forecast", desc: "Predict surplus patterns using historical data and seasonal trends.", tag: "Q1 2025" },
              { icon: "🤝", title: "Corporate Pacts", desc: "API integration with hotel management systems for automated donations.", tag: "Q2 2025" },
              { icon: "❄️", title: "Cold Chain", desc: "Electric vehicle refrigerated transit partnerships for perishable items.", tag: "Q3 2025" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.15}>
                <div className="glass-panel p-8 hover-glow group h-full">
                  <span className="inline-block text-xs text-primary font-mono border border-primary/30 px-2 py-0.5 rounded-full mb-4">{item.tag}</span>
                  <span className="text-4xl block mb-4">{item.icon}</span>
                  <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-textGray text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
