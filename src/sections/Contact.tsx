import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Mail, Phone, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(ctaRef.current,
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(formRef.current,
        { x: '30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', transformOrigin: 'top' },
        0.10
      );

      scrollTl.fromTo(decorRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.20
      );

      // EXIT (70-100%)
      scrollTl.fromTo(ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(formRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0.25, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(decorRef.current,
        { opacity: 1 },
        { opacity: 0.1, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pinned bg-background z-[70] flex items-center justify-center"
    >
      {/* Decorative Element */}
      <div
        ref={decorRef}
        className="absolute right-6 md:right-[10vw] top-[15vh] opacity-0"
      >
        <div className="w-20 md:w-32 h-20 md:h-32 border border-lime/20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary"></div>
        </div>
      </div>

      {/* Vertical Line */}
      <div
        ref={lineRef}
        className="hidden md:block absolute left-1/2 top-[15vh] w-px h-[70vh] line-secondary origin-top"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Left CTA Block */}
      <div
        ref={ctaRef}
        className="absolute left-0 md:left-[7vw] top-[12vh] md:top-[18vh] w-full md:w-[40vw] 
                   px-6 md:px-0 opacity-0 z-10"
      >
        <h2 className="text-[clamp(32px,10vw,64px)] md:text-[clamp(40px,4vw,64px)] font-bold text-foreground leading-[0.95] mb-4 md:mb-6">
          Let's build<br />something.
        </h2>
        <div className="w-[30vw] md:w-[15vw] h-px line-primary mb-6 md:mb-8"></div>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-[90vw] md:max-w-[30vw]">
          Tell me what you're building. I'll reply with next steps and a clear plan.
        </p>

        {/* Contact Info */}
        <div className="space-y-3 md:space-y-4">
          <a
            href="mailto:wilbertchandra.official@gmail.com"
            className="group flex items-center gap-3 md:gap-4 text-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
            <span className="font-mono text-xs md:text-sm break-all">
              wilbertchandra.official@gmail.com
            </span>
          </a>
          <a
            href="tel:+6285155156773"
            className="group flex items-center gap-3 md:gap-4 text-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
            <span className="font-mono text-xs md:text-sm">
              +62 851-5515-6773
            </span>
          </a>
        </div>
      </div>

      {/* Right Form Card - hidden on mobile */}
      <div
        ref={formRef}
        className="hidden md:block absolute left-[55vw] top-[16vh] w-[35vw] min-h-[60vh] opacity-0"
      >
        <div className="relative w-full h-full border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                rows={4}
                placeholder="Tell me about your project…"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex items-center gap-3 px-8 py-4 bg-primary text-background font-mono text-sm uppercase tracking-[0.14em] font-medium hover:bg-foreground hover:text-background transition-colors mt-8"
            >
              Send message
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
