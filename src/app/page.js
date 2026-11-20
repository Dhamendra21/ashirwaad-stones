"use client";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const Preloader = dynamic(() => import("@/components/scenes/Preloader"), { ssr: false });
const CursorFollower = dynamic(() => import("@/components/scenes/CursorFollower"), { ssr: false });
const Navbar = dynamic(() => import("@/components/scenes/Navbar"), { ssr: false });
const HeroScene = dynamic(() => import("@/components/scenes/HeroScene"), { ssr: false });
const PhilosophyScene = dynamic(() => import("@/components/scenes/PhilosophyScene"), { ssr: false });
const MaterialsScene = dynamic(() => import("@/components/scenes/MaterialsScene"), { ssr: false });
const VisualizerScene = dynamic(() => import("@/components/scenes/VisualizerScene"), { ssr: false });
const FinishCompareScene = dynamic(() => import("@/components/scenes/FinishCompareScene"), { ssr: false });
const ShowroomScene = dynamic(() => import("@/components/scenes/ShowroomScene"), { ssr: false });

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <CursorFollower />
      <Navbar />
      <main>
        <HeroScene />
        <PhilosophyScene />
        <MaterialsScene />
        <VisualizerScene />
        <FinishCompareScene />
        <ShowroomScene />
      </main>
    </SmoothScrollProvider>
  );
}
