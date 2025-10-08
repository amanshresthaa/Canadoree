import React from "react";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to get started?
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers and start building amazing things today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-primary-600 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Free Trial
          </button>
          <button className="inline-flex items-center px-8 py-4 border border-white text-lg font-semibold rounded-lg text-white bg-transparent hover:bg-primary-700 transition-all duration-200">
            Contact Sales
          </button>
        </div>
        <p className="text-sm text-primary-200 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
