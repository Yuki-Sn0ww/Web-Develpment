import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Penguin from "@/components/Penguin";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <div className="flex px-60 gap-20 h-[60vh] border border-t-[#303030] bg-[#1f1f1f]">
        <div className="flex flex-col w-1/2 justify-center gap-5">
          <span className="border border-[#58a6ff] rounded-xl w-fit text-[#58a6ff] px-2 text-[12px]">
            v1.0 · 4,218 maintainers
          </span>
          <h1 className="mt-4 text-4xl text-[#e6e6e6] font-semibold leading-tight tracking-tight sm:text-5xl">
            Support the people who build{" "}
            <span className="text-primary text-[#58a6ff]">Linux</span>.
          </h1>
          <p className="text-[#8b949e] text-[16px]">
            Penguin is a social platform for the people who build the Linux you
            <br />
            run every day — distros, window managers, DEs, dotfiles, drivers,
            <br />
            CLIs. Showcase your project, grow your penguin, and let the
            <br />
            community keep you fed.
          </p>
          <div className="flex gap-5 text-[14px]">
            <button className="border border-white bg-[#3daee9] py-2 px-3 rounded-[5px]">
              create your profile
            </button>
            <button className="border border-[#303030] text-[#e6e6e6] py-2 px-3 rounded-[5px] ">
              see top maintainers
            </button>
          </div>
          <div className="flex gap-5 text-[#8b949e]">
            <span>● 12,481 projects</span>
            <span>● $284k fed this month</span>
            <span>● 87 distros · 31 WMs · 412 tools</span>
          </div>
        </div>
        <div className="flex flex-col  w-1/2 justify-center text-white">
          <Penguin/>
        </div>
      </div>

      <div className="bg-[#0a0a0a] w-full h-auto border border-t-[#303030] px-60 grid grid-cols-3 justify-items-center gap-5 py-10">
<Card/><Card/><Card/>
<Card/><Card/><Card/>
      </div>
       <div className="bg-[#111111] px-16 py-16 px-60">
      <h2 className="text-white text-2xl font-semibold mb-1">How it works</h2>
      <p className="text-neutral-400 text-sm mb-8">Three steps. No setup.</p>
 
      <div className="flex gap-4">
        {/* Card 1 */}
        <div className="border border-neutral-700 rounded-xl p-5 flex-1">
          <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
            <span className="text-neutral-300 text-xs">1</span>
          </div>
          <h3 className="text-white text-sm font-semibold mb-1">Sign in with GitHub</h3>
          <p className="text-neutral-400 text-sm leading-snug">Claim your handle and import your repos in one click.</p>
        </div>
 
        {/* Card 2 */}
        <div className="border border-neutral-700 rounded-xl p-5 flex-1">
          <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
            <span className="text-neutral-300 text-xs">2</span>
          </div>
          <h3 className="text-white text-sm font-semibold mb-1">Showcase your projects</h3>
          <p className="text-neutral-400 text-sm leading-snug">Add the Linux work you maintain — distros, tools, dotfiles, anything.</p>
        </div>
 
        {/* Card 3 */}
        <div className="border border-neutral-700 rounded-xl p-5 flex-1">
          <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
            <span className="text-neutral-300 text-xs">3</span>
          </div>
          <h3 className="text-white text-sm font-semibold mb-1">Get supported</h3>
          <p className="text-neutral-400 text-sm leading-snug">Followers feed your penguin. One-off or recurring, your choice.</p>
        </div>
      </div>
    </div>
    </>
  );
}
