import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export function DigitalAuditCTA() {
  const navigate = useNavigate();

  const handleAuditRequest = () => {
    // Track audit CTA click
    analytics.track({
      name: 'cta_click',
      properties: {
        location: 'site_audit_banner',
        button_text: 'Request Your Free Audit',
        destination: '/contact'
      }
    });

    console.log('DigitalAuditCTA: Navigating to /contact');
    navigate('/contact');
  };

  return (
    <div className="bg-gradient-to-br from-parascape-green/10 to-parascape-green/5 rounded-2xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Get Your Free Digital Presence Audit
        </h2>
        <p className="text-lg text-gray-700">
          Discover how your business appears online and get actionable insights to improve your digital presence.
        </p>
        <Button
          onClick={handleAuditRequest}
          className="bg-parascape-green hover:bg-parascape-green/90 text-white group"
        >
          Request Your Free Audit
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
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