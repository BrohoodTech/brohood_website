'use client';

import { Suspense } from 'react';
import { AuthView } from '@/components/auth-view';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-zinc-400 text-xs">
          Loading BroHood Vault Auth...
        </div>
      }
    >
      <AuthView initialMode="login" />
    </Suspense>
  );
}
