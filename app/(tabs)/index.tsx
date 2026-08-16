import React, { useState } from "react";

import SplashScreen from "@/app/screens/SplashScreen";
import DisabilitySelectionScreen from "@/app/screens/DisabilitySelectionScreen";
import AccountOptionScreen from "@/app/screens/AccountOptionScreen";
import LoginScreen from "@/app/screens/LoginScreen";

type Step = 1 | 2 | 3 | 4;
type PreferenceType = "visual" | "hearing";

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [preference, setPreference] = useState<PreferenceType>("visual");

  if (step === 1) {
    return <SplashScreen onFinish={() => setStep(2)} />;
  }

  if (step === 2) {
    return (
      <DisabilitySelectionScreen
        onSelect={(selected) => {
          setPreference(selected);
          setStep(3);
        }}
      />
    );
  }

  if (step === 3) {
    return (
      <AccountOptionScreen
        preference={preference}
        onBack={() => setStep(2)}
        onRegister={() => {}}
        onLogin={() => setStep(4)}
      />
    );
  }

  return (
    <LoginScreen
      onBack={() => setStep(3)}
      onRegister={() => {}}
      onForgotPassword={() => {}}
    />
  );
}
