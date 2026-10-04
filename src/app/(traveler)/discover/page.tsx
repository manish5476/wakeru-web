import React from 'react';
import { Metadata } from 'next';
import DiscoverClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Explore Destinations | Wakeru Local',
  description: 'Discover genuine local stays, dining, and experiences nearby. Trust authentic reviews and verify business details with Wakeru.',
  openGraph: {
    title: 'Explore Destinations | Wakeru Local',
    description: 'Discover genuine local stays, dining, and experiences nearby.',
    type: 'website',
  }
};

export default function DiscoverPage() {
  return <DiscoverClientPage />;
}
