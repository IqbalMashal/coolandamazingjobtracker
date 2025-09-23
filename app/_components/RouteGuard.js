"use client";
import { useRouter, usePathname, useSearchParams, notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';

const AUTHENTICATED_PATHS = ['/dashboard'];

export default function RouteGuard(props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // check path on initial load and on change
    const url = `${pathname}?${searchParams}`

    function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in
      const path = url.split('?')[0];
      if (!isAuthenticated() && AUTHENTICATED_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
      } else {
          setAuthorized(true);
      }
    }

    authCheck(url);
  }, [pathname, searchParams, router]);

  return <>{authorized && props.children}</>
}