import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-secondary pt-16 pb-8 overflow-hidden">
      {/* Animated Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-heading font-bold text-gradient">ShareByte</span>
            </Link>
            <p className="text-textGray max-w-sm text-sm leading-relaxed mb-6">
              An intelligent food redistribution platform transforming excess into impact.
              Aligning with UN Sustainable Development Goal 12.3.
            </p>
            <p className="text-xl font-medium text-white italic">&ldquo;Share Your Byte. Save a Life.&rdquo;</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/donors" className="text-textGray hover:text-primary transition-colors text-sm">For Donors</Link></li>
              <li><Link href="/ngos" className="text-textGray hover:text-primary transition-colors text-sm">For NGOs</Link></li>
              <li><Link href="/volunteers" className="text-textGray hover:text-primary transition-colors text-sm">For Volunteers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href="mailto:contact@sharebyte.org" className="text-textGray hover:text-primary transition-colors text-sm">contact@sharebyte.org</a></li>
              <li className="mt-6">
                <p className="text-sm text-textGray mb-2">Subscribe to our newsletter</p>
                <div className="flex">
                  <input type="email" placeholder="Enter email" className="bg-background border border-white/10 rounded-l-md px-3 py-2 text-sm text-white focus:outline-none focus:border-primary w-full" />
                  <button className="bg-primary text-black px-4 py-2 rounded-r-md text-sm font-medium hover:bg-emerald transition-colors">Join</button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-textGray text-xs">
            &copy; {new Date().getFullYear()} ShareByte. All rights reserved.
          </p>
          <div className="flex space-x-6 text-textGray text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
