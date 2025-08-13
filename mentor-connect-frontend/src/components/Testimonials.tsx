export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-blue-50 py-20 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">What Users Say</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600 mb-4">“MentorConnect helped me land my dream internship. The mentor sessions were super helpful.”</p>
          <h4 className="font-semibold text-blue-700">— Anjali, Student</h4>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600 mb-4">“It’s rewarding to guide students. This platform makes the connection process seamless.”</p>
          <h4 className="font-semibold text-blue-700">— Rohan, Mentor</h4>
        </div>
      </div>
    </section>
  );
}
