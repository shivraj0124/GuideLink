'use client'; // <-- required for client-side code


 import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}


