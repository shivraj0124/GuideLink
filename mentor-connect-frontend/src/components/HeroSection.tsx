import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100  md:py-16 min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Decorative Shape */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

      <div className="max-w-7xl max-md:py-6 mx-auto px-6 flex flex-col-reverse md:flex-row max-md:flex-col items-center gap-12 z-10 ">
        {/* Text content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
            Connect with the <span className="text-blue-600">Right Mentors</span><br />
            to Accelerate Your Career
          </h1>
          <p className="mt-4 text-gray-700 text-lg md:text-xl">
            <strong>GuideLink</strong> empowers students and professionals to discover, connect, and grow with expert mentors in your field.
          </p>
          <div className="mt-6 space-x-4">
            <button
              onClick={() => router.push("/signup")}
              className="px-6 cursor-pointer py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/image.png"
            alt="Mentorship"
            width={550}
            height={600}
            className="rounded-xl drop-shadow-2xl border border-gray-200"
            priority
          />
        </div>
      </div>
    </section>
  );
}
