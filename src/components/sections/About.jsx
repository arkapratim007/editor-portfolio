import React from 'react'
import { GlareCard } from "../ui/glare-card";
import myLogo from '../../assets/mylogo.png';

function About() {
  return (
    <section id='about' className=' w-full py-12 md:py-24 bg-black bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]'>

      <div className='container mx-auto px-4 md:px-6 mb-10'>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-10 md:mb-16">
            About <span className="text-blue-500">Me</span>
        </h2>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center">

          <div className="w-full lg:w-1/2 flex justify-center">
            <GlareCard className="flex flex-col items-center justify-center h-[400px] w-full max-w-[400px]">
              <img src={myLogo} alt="" className='w-full h-full object-contain '/>
              <h3 className="text-white text-2xl font-bold tracking-wide"></h3>
            </GlareCard>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Founder <span className="text-blue-500">& </span><span className="text-blue-300 ">Lead Editor</span>
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Hi, I'm Arka AKA Soul, a passionate gaming video editor. I specialize in bringing gaming moments to life through dynamic edits,
              storytelling, & immersive visuals. Whether it's crafting adrenaline-pumping  montages, or engaging content for creators, I thrive on creating top notch content. 
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I specialize in creating high-quality edits that engage gaming communities
            </p>

            {/* Optional Call to Action button */}
            <div className="flex justify-center lg:justify-start">
              <button onClick={()=>
                    document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
               className="w-full py-3 rounded-xl bg-linear-to-r from-teal-300 to-violet-400 text-[#0b1120] font-semibold active:scale-[1.03] active:shadow-[0_0_20px_rgba(94,234,212,0.4)]">
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