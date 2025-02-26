import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <p className="text-sm text-gray-600">
          We use cookies to enhance your experience. By continuing to visit this site you agree to
          our use of cookies.
          <a href="/privacy" className="ml-1 text-parascape-green">
            Learn more
          </a>
        </p>
        <Button onClick={acceptCookies}>Accept</Button>
      </div>
    </div>
  );
}
