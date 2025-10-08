import React from "react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Build Something
            <span className="text-primary-600"> Amazing</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Transform your ideas into reality with our cutting-edge platform. Join thousands of creators who trust us
            to bring their vision to life.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              type="button"
              className="px-8 py-4 text-lg shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Started Free
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 px-8 py-4 text-lg text-gray-700 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              Watch Demo
            </Button>
          </div>
          <div className="mt-12">
            <p className="text-sm text-gray-500">
              Trusted by <span className="font-semibold text-gray-900">10,000+</span> companies worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
