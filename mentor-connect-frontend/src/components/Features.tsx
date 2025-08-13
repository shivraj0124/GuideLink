import { Brain, Video, BarChart3 } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-14">Platform Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
          <div className="flex justify-center mb-4">
            <Brain size={48} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Verified Mentors</h3>
          <p className="text-gray-600">
            Connect with experienced mentors from top companies and universities across various domains.
          </p>
        </div>

        <div className=" p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center bg-blue-600">
          <div className="flex justify-center mb-4">
            <Video size={48} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Live Sessions</h3>
          <p className="text-gray-200">
            Book, schedule, and join real-time mentoring sessions with in-built calendar and video support.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
          <div className="flex justify-center mb-4">
            <BarChart3 size={48} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Stay organized with task tracking, goal monitoring, and consistent mentor feedback.
          </p>
        </div>
      </div>
    </section>
  );
}
