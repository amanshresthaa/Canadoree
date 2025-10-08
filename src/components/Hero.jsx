import React from "react";

export default function Hero() {
  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Build Something
            <span className="text-primary-600"> Amazing</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into reality with our cutting-edge platform. Join thousands of creators who trust us to bring their vision to life.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started Free
            </button>
            <button className="inline-flex items-center px-8 py-4 border border-gray-300 text-lg font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
              Watch Demo
            </button>
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
