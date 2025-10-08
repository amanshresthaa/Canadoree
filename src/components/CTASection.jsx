import React from "react";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-primary-600 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mb-8 mt-6 max-w-2xl text-xl text-primary-100">
          Join thousands of satisfied customers and start building amazing things today.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            className="border-transparent px-8 py-4 text-lg font-semibold text-primary-600 shadow-lg hover:bg-white/90"
          >
            Start Free Trial
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white px-8 py-4 text-lg font-semibold text-white hover:bg-primary-700"
          >
            Contact Sales
          </Button>
        </div>
        <p className="mt-6 text-sm text-primary-200">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
