import React from 'react';
import { Metadata } from 'next';
import BusinessDetailClientPage from './client-page';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Business Details | Wakeru Local`,
    description: `View verified details, authentic reviews, and book services for this local business on Wakeru Local.`,
    openGraph: {
      title: `Business Details | Wakeru Local`,
      description: `View verified details, authentic reviews, and book services.`,
      type: 'website',
    }
  };
}

export default function BusinessDetailPage() {
  return <BusinessDetailClientPage />;
}
