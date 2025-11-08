import { Truck, Globe, Package, Clock, Shield, MapPin } from "lucide-react";

export default function Shipping() {
  const shippingZones = [
    {
      zone: "Kazakhstan (Domestic)",
      countries: ["Kazakhstan"],
      methods: [
        {
          name: "Express Delivery",
          time: "1-2 business days",
          cost: "Free on orders $30+, otherwise $4.99",
        },
        {
          name: "Standard Delivery",
          time: "2-3 business days",
          cost: "Free on orders $20+, otherwise $2.99",
        },
      ],
      icon: "🇰🇿",
    },
    {
      zone: "CIS Countries",
      countries: [
        "Russia",
        "Belarus",
        "Armenia",
        "Kyrgyzstan",
        "Tajikistan",
        "Uzbekistan",
      ],
      methods: [
        {
          name: "Express Delivery",
          time: "3-5 business days",
          cost: "Free on orders $75+, otherwise $12.99",
        },
        {
          name: "Standard Delivery",
          time: "5-8 business days",
          cost: "Free on orders $50+, otherwise $8.99",
        },
      ],
      icon: "🌍",
    },
    {
      zone: "Asia Pacific",
      countries: [
        "India",
        "China",
        "Japan",
        "South Korea",
        "Thailand",
        "Vietnam",
        "Singapore",
      ],
      methods: [
        {
          name: "Express Delivery",
          time: "4-7 business days",
          cost: "Free on orders $100+, otherwise $19.99",
        },
        {
          name: "Standard Delivery",
          time: "7-12 business days",
          cost: "Free on orders $75+, otherwise $14.99",
        },
      ],
      icon: "🌏",
    },
    {
      zone: "Europe",
      countries: [
        "Germany",
        "France",
        "UK",
        "Italy",
        "Spain",
        "Netherlands",
        "Poland",
        "Others",
      ],
      methods: [
        {
          name: "Express Delivery",
          time: "5-8 business days",
          cost: "Free on orders $125+, otherwise $24.99",
        },
        {
          name: "Standard Delivery",
          time: "8-14 business days",
          cost: "Free on orders $100+, otherwise $19.99",
        },
      ],
      icon: "🇪🇺",
    },
    {
      zone: "North America",
      countries: ["USA", "Canada", "Mexico"],
      methods: [
        {
          name: "Express Delivery",
          time: "6-10 business days",
          cost: "Free on orders $150+, otherwise $29.99",
        },
        {
          name: "Standard Delivery",
          time: "10-16 business days",
          cost: "Free on orders $125+, otherwise $24.99",
        },
      ],
      icon: "🌎",
    },
    {
      zone: "Rest of World",
      countries: [
        "Australia",
        "New Zealand",
        "South America",
        "Africa",
        "Other countries",
      ],
      methods: [
        {
          name: "Standard Delivery",
          time: "12-20 business days",
          cost: "Free on orders $200+, otherwise $34.99",
        },
      ],
      icon: "🌐",
    },
  ];

  const features = [
    {
      icon: <Package className="h-8 w-8 text-sage-600" />,
      title: "Secure Packaging",
      description:
        "Your teas are packed in airtight, light-proof containers to preserve freshness and aroma during transit.",
    },
    {
      icon: <Shield className="h-8 w-8 text-sage-600" />,
      title: "Insured Shipping",
      description:
        "All orders are fully insured. If anything happens during shipping, we'll replace or refund your order.",
    },
    {
      icon: <Clock className="h-8 w-8 text-sage-600" />,
      title: "Fast Processing",
      description:
        "Orders placed before 2 PM (Almaty time) on business days are processed and shipped the same day.",
    },
    {
      icon: <Truck className="h-8 w-8 text-sage-600" />,
      title: "Real-time Tracking",
      description:
        "Track your order from our facility to your doorstep with detailed updates via email and SMS.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-sage-50 via-off-white to-clay-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
            Shipping Information
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            We deliver premium teas from Almaty, Kazakhstan to tea lovers
            worldwide. Fast, secure, and reliable shipping to your doorstep.
          </p>
        </div>
      </section>

      {/* Shipping Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-12">
            Why Choose Our Shipping?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-heading font-semibold text-sage-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-12">
            Shipping Zones & Rates
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {shippingZones.map((zone, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{zone.icon}</span>
                  <h3 className="text-xl font-heading font-semibold text-sage-800">
                    {zone.zone}
                  </h3>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-sage-600 mb-2">
                    Countries/Regions:
                  </p>
                  <p className="text-sage-700">{zone.countries.join(", ")}</p>
                </div>

                <div className="space-y-3">
                  {zone.methods.map((method, methodIndex) => (
                    <div
                      key={methodIndex}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sage-800">
                          {method.name}
                        </h4>
                        <span className="text-sm text-sage-600">
                          {method.time}
                        </span>
                      </div>
                      <p className="text-sm text-sage-600">{method.cost}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processing & Delivery Timeline */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-12">
            Order Processing & Delivery Timeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">1</span>
              </div>
              <h3 className="font-heading font-semibold text-sage-800 mb-2">
                Order Placed
              </h3>
              <p className="text-sm text-sage-600">
                You place your order and receive instant confirmation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">2</span>
              </div>
              <h3 className="font-heading font-semibold text-sage-800 mb-2">
                Processing
              </h3>
              <p className="text-sm text-sage-600">
                We carefully pack your teas (same day if ordered before 2 PM)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">3</span>
              </div>
              <h3 className="font-heading font-semibold text-sage-800 mb-2">
                Shipped
              </h3>
              <p className="text-sm text-sage-600">
                Your order ships with tracking information sent to you
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">4</span>
              </div>
              <h3 className="font-heading font-semibold text-sage-800 mb-2">
                Delivered
              </h3>
              <p className="text-sm text-sage-600">
                Enjoy your premium teas at your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policies */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 text-center mb-12">
            Shipping Policies
          </h2>

          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                Processing Time
              </h3>
              <ul className="space-y-2 text-sage-600">
                <li>
                  • Orders placed before 2 PM (Almaty time) on business days
                  ship the same day
                </li>
                <li>
                  • Orders placed after 2 PM or on weekends ship the next
                  business day
                </li>
                <li>
                  • Custom blends may require 2-3 additional business days
                </li>
                <li>
                  • During peak seasons (holidays), processing may take 1-2
                  extra days
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                Delivery Attempts
              </h3>
              <ul className="space-y-2 text-sage-600">
                <li>
                  • We require signature confirmation for orders over $100
                </li>
                <li>
                  • If no one is available, the carrier will leave a delivery
                  notice
                </li>
                <li>
                  • You can arrange redelivery or pickup at the local facility
                </li>
                <li>
                  • Packages are held for 7-14 days before being returned to us
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                Customs & Duties
              </h3>
              <ul className="space-y-2 text-sage-600">
                <li>
                  • International orders may be subject to customs duties and
                  taxes
                </li>
                <li>
                  • These fees are determined by your country's customs office
                </li>
                <li>
                  • We declare accurate values and cannot mark packages as
                  "gifts"
                </li>
                <li>
                  • Customers are responsible for any customs fees or duties
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                Address Changes & Delivery Issues
              </h3>
              <ul className="space-y-2 text-sage-600">
                <li>
                  • Contact us immediately if you need to change your shipping
                  address
                </li>
                <li>
                  • Once shipped, address changes may incur additional fees
                </li>
                <li>
                  • We're not responsible for packages delivered to incorrect
                  addresses provided by customers
                </li>
                <li>
                  • Report any delivery issues within 48 hours of the delivery
                  date
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Shipping Questions */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-sage-800 mb-4">
            Questions About Shipping?
          </h2>
          <p className="text-lg text-sage-600 mb-8">
            Our customer service team is here to help with any shipping
            questions or concerns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </a>
            <a
              href="tel:+77022010652"
              className="border border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Call +7 702 201 0652
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sage-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              Shipping from: Раимбек 165а, Almaty, Kazakhstan
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
