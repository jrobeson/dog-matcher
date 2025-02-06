import { ReactNode, useRef, useState } from "react";
import logo from "/dog-matcher-logo.png";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

export default function Header({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const lastYPosition = useRef<number>(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYPosition.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastYPosition.current = y;
    }
  });

  return (
    <nav className="sticky top-0 z-50 w-full">
      <motion.header
        variants={{
          hidden: {
            y: "-100%",
          },
          visible: {
            y: "0%",
          },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
        className="w-full bg-stone-50"
      >
        <div className="container mx-2 flex items-center gap-3">
          <img src={logo} alt="DogMatcher's Logo" className="rounded-full" />
          <span className="text-2xl text-rose-600">Dog Matcher</span>
        </div>
      </motion.header>
      <motion.div
        variants={{
          hidden: {
            y: "0",
          },
          visible: {
            y: "-145%",
          },
        }}
        animate={isHidden ? "visible" : "hidden"}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </nav>
  );
}
