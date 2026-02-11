'use client';

import { useEffect } from 'react';

export function TrustedTypesPolyfill() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      // @ts-ignore - trustedTypes might not be in the definition
      window.trustedTypes &&
      // @ts-ignore
      window.trustedTypes.createPolicy &&
      // @ts-ignore
      !window.trustedTypes.defaultPolicy
    ) {
      try {
        // @ts-ignore
        window.trustedTypes.createPolicy('default', {
          createHTML: (string: string) => string,
          createScript: (string: string) => string,
          createScriptURL: (string: string) => string,
        });
      } catch (e) {
        // Policy might already exist or be disallowed
        console.warn('Failed to create default TrustedTypes policy', e);
      }
    }
  }, []);

  return null;
}
