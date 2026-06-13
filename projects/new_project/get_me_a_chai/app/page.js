import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Penguin from "@/components/Penguin";

export default function Home() {
  return (
    <>
      <div className="flex px-60 gap-20 h-[60vh] border-b border-black">
        <div className="flex flex-col w-1/2 justify-center gap-5">
          <span className="border border-black rounded-xl w-fit">
            v1.0.0 — now serving 4,218 maintainers
          </span>
          <h1 class="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Support the people who build <span class="text-primary">Linux</span>
            .
          </h1>
          <p>
            Penguin is a social platform for the people who build the Linux you
            <br />
            run every day — distros, window managers, DEs, dotfiles, drivers,
            <br />
            CLIs. Showcase your project, grow your penguin, and let the
            <br />
            community keep you fed.
          </p>
          <div className="flex gap-5">
            <button className="border border-white bg-blue-600">
              create-profile.sh
            </button>
            <button className="border border-white bg-blue-600">
              view leaderboard
            </button>
          </div>
          <div className="flex gap-5">
            <span>● 12,481 projects</span>
            <span>● $284k fed this month</span>
            <span>● 87 distros · 31 WMs · 412 tools</span>
          </div>
        </div>
        <div className="flex flex-col  w-1/2 justify-center">
          <div className="relative w-full h-1/2">
            <Image
              src="/linux.jpg"
              alt="Picture of the author"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
