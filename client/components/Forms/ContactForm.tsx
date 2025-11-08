import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { showToast } from "../Toast/ToastProvider";
import { useState } from "react";

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  inquiryType: z.enum([
    "general",
    "product",
    "shipping",
    "wholesale",
    "partnership",
  ]),
  newsletter: z.boolean().default(false),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "product", label: "Product Questions" },
  { value: "shipping", label: "Shipping & Returns" },
  { value: "wholesale", label: "Wholesale Orders" },
  { value: "partnership", label: "Business Partnership" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success toast
      showToast.success(
        `Thank you, ${data.firstName}! We'll get back to you within 24 hours.`,
        { duration: 6000 },
      );

      // Newsletter subscription
      if (data.newsletter) {
        showToast.newsletter(data.email);
      }

      reset();
    } catch (error) {
      showToast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-sage-600 to-chai-700 rounded-3xl p-8 text-white h-fit"
          >
            <h3 className="text-2xl font-heading font-bold mb-6">
              Get in Touch
            </h3>
            <p className="text-sage-100 mb-8 leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sage-100">+7 702 201 0652</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sage-100">support@nirvanachai.kz</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sage-100">
                    Раимбек 165а
                    <br />
                    Almaty, Kazakhstan
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm text-sage-100">
                Response time: Usually within 24 hours
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-sage-100"
          >
            <h3 className="text-2xl font-heading font-bold text-sage-800 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-sage-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <input
                      {...register("firstName")}
                      type="text"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.firstName
                          ? "border-red-300 focus:ring-red-400"
                          : "border-sage-200 focus:ring-sage-400"
                      }`}
                      placeholder="John"
                    />
                    <User className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.lastName
                        ? "border-red-300 focus:ring-red-400"
                        : "border-sage-200 focus:ring-sage-400"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-sage-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-300 focus:ring-red-400"
                          : "border-sage-200 focus:ring-sage-400"
                      }`}
                      placeholder="john@example.com"
                    />
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                    <Phone className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
                  </div>
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-sm font-semibold text-sage-700 mb-2">
                  Inquiry Type *
                </label>
                <select
                  {...register("inquiryType")}
                  className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 transition-all"
                >
                  <option value="">Select inquiry type</option>
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.inquiryType.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-sage-700 mb-2">
                  Subject *
                </label>
                <input
                  {...register("subject")}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.subject
                      ? "border-red-300 focus:ring-red-400"
                      : "border-sage-200 focus:ring-sage-400"
                  }`}
                  placeholder="What can we help you with?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-sage-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <textarea
                    {...register("message")}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? "border-red-300 focus:ring-red-400"
                        : "border-sage-200 focus:ring-sage-400"
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Newsletter Subscription */}
              <div className="flex items-center gap-3">
                <input
                  {...register("newsletter")}
                  type="checkbox"
                  id="newsletter"
                  className="h-4 w-4 text-sage-600 focus:ring-sage-500 border-sage-300 rounded"
                />
                <label htmlFor="newsletter" className="text-sm text-sage-600">
                  Subscribe to our newsletter for tea tips and exclusive offers
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!isValid || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                  isValid && !isSubmitting
                    ? "bg-gradient-to-r from-sage-600 to-chai-600 hover:from-sage-700 hover:to-chai-700 shadow-lg hover:shadow-xl"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
