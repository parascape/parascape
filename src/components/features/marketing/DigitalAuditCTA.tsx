import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analytics } from '@/lib/analytics';

export function DigitalAuditCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    analytics.track({
      name: 'audit_cta_click',
      properties: {
        location: 'site_audit_banner'
      }
    });
    navigate('/contact', { state: { auditRequest: true } });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-parascape-green/10 to-parascape-green/5 rounded-lg p-6 shadow-lg border border-parascape-green/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-900">
            Get Your Free Digital Presence Audit
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <CheckIcon /> SEO Performance Analysis
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon /> User Experience Review
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon /> Competitor Comparison
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-parascape-green hover:bg-parascape-green/90 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Your Free Audit
            <ArrowIcon className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </Button>
          <p className="text-xs text-gray-500">No commitment required</p>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-parascape-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
} 