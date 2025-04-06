import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component ensures that when navigating to a new page, the window scrolls to the top
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop; 