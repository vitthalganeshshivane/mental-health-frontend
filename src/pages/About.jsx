import React from 'react'

const About = () => {
  return (
    <div>
        <h3 className="mx-auto max-w-[60%] text-center text-4xl font-bold text-slate-700 mt-15">Why Our Mental Health Assistant are the Best Choice</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 my-20 ">
      <div className="py-15 px-6 border-1 border-gray-600/30 rounded-xl shadow-lg  hover:scale-120 hover:bg-gradient-to-r from-green-400 to-teal-500 transition duration-300">
        <div className="text-6xl mb-4 text-center">🤖</div>
        <h3 className="text-xl font-semibold mb-2 text-center">AI-Powered Support</h3>
        <p className="text-gray-600 text-center">Our AI assistant provides personalized guidance 24/7, helping users manage stress, anxiety, and emotional well-being in real time.</p>
      </div>

      <div className="py-15 px-6 border-1 border-gray-600/30 rounded-xl shadow-lg  hover:scale-120 hover:bg-gradient-to-r from-green-400 to-teal-500 transition duration-300">
        <div className="text-6xl mb-4 text-center">👩‍⚕️</div>
        <h3 className="text-xl font-semibold mb-2 text-center">Expertise & Human Touch</h3>
        <p className="text-gray-600 text-center">Backed by psychology experts, our platform blends AI-driven insights with 
      professional advice, ensuring reliable and empathetic support.</p>
      </div>

      <div className="py-15 px-6 border-1 border-gray-600/30 rounded-xl shadow-lg hover:scale-120 hover:bg-gradient-to-r from-green-400 to-teal-500 transition duration-300">
        <div className="text-6xl mb-4 text-center">🔒</div>
        <h3 className="text-xl font-semibold mb-2 text-center">Accessibility & Confidentiality</h3>
        <p className="text-gray-600 text-center">Easily accessible via web or mobile, with complete anonymity and privacy, making mental health support available anytime, anywhere.</p>
      </div>
    </div>
    </div>
    
  )
}

export default About
