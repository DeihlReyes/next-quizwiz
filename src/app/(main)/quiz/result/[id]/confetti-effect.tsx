// components/ConfettiEffect.tsx
import { useEffect, useState } from "react";

import Confetti from "react-confetti";

interface ConfettiEffectProps {
  trigger: boolean;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger }) => {
  const [showConfetti, setShowConfetti] = useState(trigger);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return showConfetti ? <Confetti /> : null;
};
