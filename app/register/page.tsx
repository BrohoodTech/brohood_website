'use client';

import { Suspense } from 'react';
import { AuthView } from '@/components/auth-view';

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-zinc-400 text-xs">
          Loading BroHood Registration...
        </div>
      }
    >
      <AuthView initialMode="register" />
    </Suspense>
  );
}
