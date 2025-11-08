import {
  RotateCcw,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Mail,
} from "lucide-react";

export default function Returns() {
  const returnReasons = [
    "Product quality issue",
    "Wrong item received",
    "Damaged during shipping",
    "Not as described",
    "Changed my mind",
    "Allergic reaction",
    "Other (please specify)",
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Contact Us",
      description:
        "Email us at support@nirvanachai.kz or call +7 702 201 0652 within 30 days",
      icon: <Mail className="h-6 w-6 text-sage-600" />,
    },
    {
      step: 2,
      title: "Return Authorization",
      description:
        "We'll provide a return authorization number and prepaid shipping label",
      icon: <CheckCircle className="h-6 w-6 text-sage-600" />,
    },
    {
      step: 3,
      title: "Pack & Ship",
      description: "Pack the item securely and ship using our prepaid label",
      icon: <RotateCcw className="h-6 w-6 text-sage-600" />,
    },
    {
      step: 4,
      title: "Refund Processed",
      description:
        "Once received, we'll process your refund within 5-7 business days",
      icon: <Shield className="h-6 w-6 text-sage-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-sage-50 via-off-white to-clay-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
            Returns & Refunds
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Your satisfaction is our priority. We offer a 30-day satisfaction
            guarantee on all tea purchases with easy returns and full refunds.
          </p>
        </div>
      </section>

      {/* 30-Day Guarantee */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-sage-100 to-clay-100 rounded-2xl p-8 text-center mb-16">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-3xl font-heading font-bold text-sage-800 mb-4">
              30-Day Satisfaction Guarantee
            </h2>
            <p className="text-lg text-sage-700 max-w-3xl mx-auto">
              We stand behind the quality of our teas. If you're not completely
              satisfied with your purchase, you can return it within 30 days for
              a full refund or exchange. No questions asked.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 text-sage-600 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                30 Days to Return
              </h3>
              <p className="text-sage-600">
                Full 30 days from delivery date to initiate a return if you're
                not satisfied
              </p>
            </div>

            <div className="text-center">
              <Shield className="h-12 w-12 text-sage-600 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                Full Refund
              </h3>
              <p className="text-sage-600">
                Get 100% of your money back, including original shipping costs
              </p>
            </div>

            <div className="text-center">
              <RotateCcw className="h-12 w-12 text-sage-600 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                Easy Exchange
              </h3>
              <p className="text-sage-600">
                Prefer a different tea? We'll help you find the perfect
                replacement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-12">
            How to Return Your Order
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-heading font-semibold text-sage-800 mb-2">
                  Step {step.step}: {step.title}
                </h3>
                <p className="text-sm text-sage-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Start Your Return
            </a>
          </div>
        </div>
      </section>

      {/* Return Policies */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-12">
            Return Policy Details
          </h2>

          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                What Can Be Returned
              </h3>
              <ul className="space-y-2 text-sage-600">
                <li>• All tea products in original, unopened packaging</li>
                <li>
                  • Tea accessories and brewing equipment in original condition
                </li>
                <li>• Gift sets and tea samplers (if unopened)</li>
                <li>
                  • Products with quality issues (even if opened for testing)
                </li>
                <li>• Wrong items sent due to our error</li>
                <li>• Damaged items received during shipping</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
                Return Conditions
              </h3>
              <ul className="space-y-2 text-sage-600">
                <li>• Items must be returned within 30 days of delivery</li>
                <li>
                  • Products must be in original packaging (unopened for hygiene
                  reasons)
                </li>
                <li>
                  • Custom blends or personalized items cannot be returned
                  unless defective
                </li>
                <li>
                  • Return authorization required before shipping back to us
                </li>
                <li>• Items must be in resalable condition</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                Quality Issues Exception
              </h3>
              <p className="text-sage-600 mb-4">
                If you receive tea with quality issues, we understand you may
                need to open and taste it to identify the problem. In these
                cases:
              </p>
              <ul className="space-y-2 text-sage-600">
                <li>
                  • Contact us immediately with details about the quality issue
                </li>
                <li>• We may ask for photos or a small sample for analysis</li>
                <li>• Full refund or replacement will be provided</li>
                <li>
                  • No need to return the defective product unless requested
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Information */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-12">
            Refund Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                Refund Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sage-600">Processing Time:</span>
                  <span className="font-medium text-sage-800">
                    1-2 business days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sage-600">Credit Card:</span>
                  <span className="font-medium text-sage-800">
                    3-5 business days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sage-600">PayPal:</span>
                  <span className="font-medium text-sage-800">
                    1-2 business days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sage-600">Bank Transfer:</span>
                  <span className="font-medium text-sage-800">
                    5-7 business days
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                What's Refunded
              </h3>
              <ul className="space-y-2 text-sage-600">
                <li>• Full product cost</li>
                <li>• Original shipping fees (if return is our fault)</li>
                <li>• Taxes and duties paid (where applicable)</li>
                <li>• Return shipping is FREE with our prepaid labels</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exchanges */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-8">
            Exchanges
          </h2>

          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <RotateCcw className="h-12 w-12 text-sage-600 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
              Prefer an Exchange?
            </h3>
            <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
              If you'd like to try a different tea instead of getting a refund,
              we're happy to help! Contact our tea experts for personalized
              recommendations based on your taste preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Request Exchange
              </a>
              <a
                href="tel:+77022010652"
                className="border border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Call for Advice
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-sage-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Need Help with a Return?
          </h2>
          <p className="text-sage-200 mb-8 text-lg">
            Our customer service team is here to make your return process as
            smooth as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <a
                href="mailto:support@nirvanachai.kz"
                className="text-sage-200 hover:text-white"
              >
                support@nirvanachai.kz
              </a>
            </div>

            <div>
              <div className="text-2xl mb-3">📞</div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <a
                href="tel:+77022010652"
                className="text-sage-200 hover:text-white"
              >
                +7 702 201 0652
              </a>
            </div>

            <div>
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <p className="text-sage-200">
                Mon-Fri: 9AM-6PM
                <br />
                Almaty Time
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
