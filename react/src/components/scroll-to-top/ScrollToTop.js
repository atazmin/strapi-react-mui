import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'components/scroll-to-top/scroll-to-top.scss';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}
