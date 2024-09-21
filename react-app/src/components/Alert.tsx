import React, { useEffect, useState } from "react";

type AlertVariant = "default" | "success" | "warning" | "destructive";

interface AlertProps {
  variant: AlertVariant;
  message: string;
  duration?: number;
}

export const Alert: React.FC<AlertProps> = ({
  variant,
  message,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide the alert after `duration` milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Determine Tailwind classes based on the variant
  let alertClasses =
    "px-4 py-3 rounded shadow-lg transition-opacity duration-300 ease-in-out ";
  switch (variant) {
    case "default":
      alertClasses += "bg-blue-100 text-blue-900";
      break;
    case "success":
      alertClasses += "bg-green-100 text-green-900";
      break;
    case "warning":
      alertClasses += "bg-yellow-100 text-yellow-900";
      break;
    case "destructive":
      alertClasses += "bg-red-100 text-red-900";
      break;
    default:
      alertClasses += "bg-blue-100 text-blue-900"; // Default to blue if variant is unknown
      break;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transform ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
    >
      <div className={alertClasses}>
        <span className="block sm:inline text-xl">{message}</span>
      </div>
    </div>
  );
};
