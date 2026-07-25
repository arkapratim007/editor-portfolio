import React from 'react'
import { GlareCard } from "../ui/glare-card";
import myLogo from '../../assets/mylogo.png';

function About() {
  return (
    <section id='about' className='min-h-screen w-ful font-sans bg-[#05070d] text-white flex items-center justify-center p-4 md:p-6'>
       
      <div className='container mx-auto px-4 md:px-6 mb-10'>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-10 md:mb-16">
            About <span className="text-blue-500">Me</span>
        </h2>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center">

          <div className="w-full lg:w-1/2 flex justify-center">
            <GlareCard className="flex flex-col items-center justify-center h-[400px] w-full max-w-[400px]">
              <img src={myLogo} alt="" className='w-full h-full object-contain '/>
              <h3 className="text-white text-2xl font-bold tracking-wide"></h3>
            </GlareCard>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Founder <span className="text-blue-500">& </span><span className="text-yellow-400 ">Lead Editor</span>
            </h2>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Hi, I'm Arka (aka Soul), a passionate gaming video editor. I specialize in bringing gaming moments to life through dynamic 
              editsstorytelling. If your gaming footage doesn't give me goosebumps, I'm not done with it yet. 
            </p>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              No corporate fluff. Just <span className="text-white">velocity edits</span>, <span className="text-white">color grading that pops</span>, and sound design that hits like a truck.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
                className="w-full py-4 bg-[#facc15] text-black font-black border-2 border-black shadow-[6px_6px_0px_0px_#ff007f]
                 hover:shadow-[2px_2px_0px_0px_#ff007f] hover:translate-x-1 hover:translate-y-1 transition-all duration-75 rounded-none text-lg"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About