"use client";
import CareerHero from "@/components/career/hero";
import Benefits from "@/components/career/benefits";
import Openings from "@/components/career/openings";
import CTA from "@/components/career/cta";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useCareers } from "@/hooks/use-careers";
import React from "react";

const Career = () => {
  const { careers, isLoading, error } = useCareers();

  return (
    <div>
      <Navbar />
      <CareerHero />
      <Openings careers={careers} isLoading={isLoading} error={error} />
      <CTA />
      <Footer />
    </div>
  );
};

export default Career;
