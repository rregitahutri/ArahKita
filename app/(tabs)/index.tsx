import React, { useState } from "react";

import DigitalAssistantScreen from "@/app/screens/DigitalAssistantScreen";
import EditProfileScreen from "@/app/screens/EditProfileScreen";
import EmergencyScreen from "@/app/screens/EmergencyScreen";
import HomeScreen from "@/app/screens/HomeScreen";
import NotificationScreen from "@/app/screens/NotificationScreen";
import ProfileScreen from "@/app/screens/ProfileScreen";
import VoiceAssistantScreen from "@/app/screens/VoiceAssistantScreen";

type Step =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17;
type PreferenceType = "visual" | "hearing";

export default function AppFlow() {
  const [step, setStep] = useState<Step>(1);
  const [preference, setPreference] = useState<PreferenceType>("visual");

  // Registration Draft Data
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");

  // Forgot Password Draft Data
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState("");

  const resetRegisterForm = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
    setRegisterFirstName("");
    setRegisterLastName("");
  };

  const resetForgotPasswordForm = () => {
    setForgotPasswordEmail("");
    setForgotPasswordOtp("");
  };

  // // Step 1: Splash Screen
  // if (step === 1) {
  //   return <SplashScreen onFinish={() => setStep(2)} />;
  // }

  // // Step 2: Disability Selection
  // if (step === 2) {
  //   return (
  //     <DisabilitySelectionScreen
  //       onSelect={(selected) => {
  //         setPreference(selected);
  //         setStep(3);
  //       }}
  //     />
  //   );
  // }

  // // Step 3: Account Choice (Daftar / Masuk)
  // if (step === 3) {
  //   return (
  //     <AccountOptionScreen
  //       preference={preference}
  //       onBack={() => setStep(2)}
  //       onRegister={() => {
  //         resetRegisterForm();
  //         setStep(5);
  //       }}
  //       onLogin={() => setStep(4)}
  //     />
  //   );
  // }

  // // Step 4: Login Screen
  // if (step === 4) {
  //   return (
  //     <LoginScreen
  //       onBack={() => setStep(3)}
  //       onRegister={() => {
  //         resetRegisterForm();
  //         setStep(5);
  //       }}
  //       onForgotPassword={() => {
  //         resetForgotPasswordForm();
  //         setStep(8);
  //       }}
  //       onLoginSuccess={() => setStep(11)}
  //     />
  //   );
  // }

  // // Step 5: Register Hal 1 (Email)
  // if (step === 5) {
  //   return (
  //     <RegisterEmailScreen
  //       initialEmail={registerEmail}
  //       onBack={() => {
  //         resetRegisterForm();
  //         setStep(3);
  //       }}
  //       onNext={(email) => {
  //         setRegisterEmail(email);
  //         setStep(6);
  //       }}
  //       onLogin={() => {
  //         resetRegisterForm();
  //         setStep(4);
  //       }}
  //     />
  //   );
  // }

  // // Step 6: Register Hal 2 (Password & Confirm Password)
  // if (step === 6) {
  //   return (
  //     <RegisterPasswordScreen
  //       initialPassword={registerPassword}
  //       initialConfirmPassword={registerConfirmPassword}
  //       onBack={() => setStep(5)}
  //       onNext={(password, confirmPassword) => {
  //         setRegisterPassword(password);
  //         setRegisterConfirmPassword(confirmPassword);
  //         setStep(7);
  //       }}
  //       onLogin={() => {
  //         resetRegisterForm();
  //         setStep(4);
  //       }}
  //     />
  //   );
  // }

  // // Step 7: Register Hal 3 (Nama Depan & Nama Belakang)
  // if (step === 7) {
  //   return (
  //     <RegisterNameScreen
  //       initialFirstName={registerFirstName}
  //       initialLastName={registerLastName}
  //       onBack={() => setStep(6)}
  //       onSubmit={(firstName, lastName) => {
  //         setRegisterFirstName(firstName);
  //         setRegisterLastName(lastName);
  //         Alert.alert(
  //           "Pendaftaran Berhasil!",
  //           `Selamat datang ${firstName} ${lastName}! Akun dengan email ${registerEmail} berhasil dibuat.`,
  //           [
  //             {
  //               text: "Lanjut ke Login",
  //               onPress: () => {
  //                 resetRegisterForm();
  //                 setStep(4);
  //               },
  //             },
  //           ],
  //         );
  //       }}
  //       onLogin={() => {
  //         resetRegisterForm();
  //         setStep(4);
  //       }}
  //     />
  //   );
  // }

  // // Step 8: Forgot Password Hal 1 (Input Email)
  // if (step === 8) {
  //   return (
  //     <ForgotPasswordEmailScreen
  //       initialEmail={forgotPasswordEmail}
  //       onBack={() => {
  //         resetForgotPasswordForm();
  //         setStep(4);
  //       }}
  //       onNext={(email) => {
  //         setForgotPasswordEmail(email);
  //         setStep(9);
  //       }}
  //     />
  //   );
  // }

  // // Step 9: Forgot Password Hal 2 (Verification Code / OTP)
  // if (step === 9) {
  //   return (
  //     <ForgotPasswordOtpScreen
  //       email={forgotPasswordEmail}
  //       onBack={() => setStep(8)}
  //       onNext={(otp) => {
  //         setForgotPasswordOtp(otp);
  //         setStep(10);
  //       }}
  //     />
  //   );
  // }

  // // Step 10: Forgot Password Hal 3 (Reset Password & Success Modal Notification)
  // if (step === 10) {
  //   return (
  //     <ForgotPasswordResetScreen
  //       onBack={() => setStep(9)}
  //       onFinish={() => {
  //         resetForgotPasswordForm();
  //         setStep(4);
  //       }}
  //     />
  //   );
  // }

  // Step 11: Homepage Screen
  if (step === 11) {
    return (
      <HomeScreen
        onOpenNotification={() => setStep(12)}
        onOpenEmergency={() => setStep(15)}
        onOpenDigitalAssistant={() => setStep(16)}
        onNavigateToTab={(tab) => {
          if (tab === "profil") {
            setStep(13);
          }
        }}
      />
    );
  }

  // Step 12: Notification Screen
  if (step === 12) {
    return <NotificationScreen onBack={() => setStep(11)} />;
  }

  // Step 13: Profile Screen
  if (step === 13) {
    return (
      <ProfileScreen
        onNavigateToTab={(tab) => {
          if (tab === "beranda") {
            setStep(11);
          }
        }}
        onOpenNotification={() => setStep(12)}
        onEditProfile={() => setStep(14)}
      />
    );
  }

  // Step 14: Edit Profile Screen
  if (step === 14) {
    return <EditProfileScreen onBack={() => setStep(13)} />;
  }

  // Step 15: Emergency Screen
  if (step === 15) {
    return <EmergencyScreen onBack={() => setStep(11)} />;
  }

  // Step 16: Digital Assistant Screen
  if (step === 16) {
    return (
      <DigitalAssistantScreen
        onBack={() => setStep(11)}
        onOpenVoiceAssistant={() => setStep(17)}
      />
    );
  }

  // Step 17: Voice Assistant Flow Screens (Auto Step 1 -> 2 -> 3)
  return <VoiceAssistantScreen onBack={() => setStep(16)} />;
}
