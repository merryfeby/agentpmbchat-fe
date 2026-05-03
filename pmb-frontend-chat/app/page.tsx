"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import FormStep from "@/components/onboarding/FormStep";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); 

  useEffect(() => {

    const uuid = localStorage.getItem("user_uuid");
    if (uuid) {
      router.push("/chat");
    } else {
      setStep(1); 
    }
  }, [router]);

  if (step === 0) return <div className="min-h-screen bg-gray-50"></div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {step === 1 && <WelcomeStep onNext={() => setStep(2)} />}
      {step === 2 && <FormStep />}
    </main>
  );
}