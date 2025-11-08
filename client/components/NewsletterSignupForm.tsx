import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormState {
  email: string;
  isSubmitting: boolean;
  message: string;
  messageType: "success" | "error" | null;
}

export const NewsletterSignupForm = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState<FormState>({
    email: "",
    isSubmitting: false,
    message: "",
    messageType: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.email.trim()) {
      setFormState((prev) => ({
        ...prev,
        message: "Please enter your email address",
        messageType: "error",
      }));
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState((prev) => ({
        ...prev,
        message: "Please enter a valid email address",
        messageType: "error",
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      message: "",
      messageType: null,
    }));

    try {
      const response = await fetch("/api/forms/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormState({
          email: "",
          isSubmitting: false,
          message:
            data.message ||
            "Successfully subscribed! Check your email for confirmation.",
          messageType: "success",
        });
      } else {
        throw new Error(data.error || "Failed to subscribe");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
        messageType: "error",
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      email: e.target.value,
      message: "",
      messageType: null,
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={formState.email}
            onChange={handleEmailChange}
            placeholder={t(
              "newsletter.email_placeholder",
              "Enter your email address",
            )}
            className="flex-1 px-6 py-4 rounded-full text-sage-800 focus:outline-none focus:ring-2 focus:ring-forest-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={formState.isSubmitting}
            required
          />
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="bg-forest-500 hover:bg-forest-600 disabled:bg-forest-400 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center min-w-[160px]"
          >
            {formState.isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Subscribing...
              </>
            ) : (
              t("newsletter.subscribe", "Get Exclusive Access")
            )}
          </button>
        </div>

        {/* Status message */}
        {formState.message && (
          <div
            className={`flex items-center justify-center space-x-2 p-4 rounded-lg ${
              formState.messageType === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {formState.messageType === "success" ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{formState.message}</span>
          </div>
        )}

        <p className="text-sm text-sage-300">
          {t(
            "newsletter.no_spam",
            "Premium content only. Unsubscribe anytime.",
          )}
        </p>
      </form>
    </div>
  );
};
