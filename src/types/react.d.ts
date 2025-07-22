/**
 * React declaration file to fix TypeScript errors
 */

import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
