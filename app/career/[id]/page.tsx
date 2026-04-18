import React from 'react'
import Career from '@/features/career/ui/pages/career'

interface PageProps {
  params: Promise<{ id: string }>;
}

const CareerPage = ({ params }: PageProps) => {
  return (
    <Career params={params} />
  )
}

export default CareerPage