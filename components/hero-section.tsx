"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ElegantShape } from "@/components/ui/elegant-shape"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRef } from "react"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  return (
    <div
      ref={ref}
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#2b1d13]"
      id="hero"
    >
      {/* 背景アニメーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5e3b22]/30 via-transparent to-[#c68f56]/20 blur-3xl">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(198, 143, 86, 0.15), rgba(46, 29, 19, 0) 70%)",
            backgroundSize: "120% 120%",
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-[#c68f56]/30"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-[#8b5d3b]/30"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-[#d9b38c]/30"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-[#e6c9a8]/30"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-[#f0d9bf]/30"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <motion.div className="relative z-10 container mx-auto px-4 md:px-6" style={{ opacity, scale, y }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5d3b]/20 border border-[#d9b38c]/30 mb-8 md:mb-12 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Circle className="h-2 w-2 fill-[#c68f56]" />
            <span className="text-sm text-[#e6c9a8] tracking-wide">LLM受託開発サービス</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-b from-[#f0d9bf] to-[#d9b38c] inline-block"
                animate={floatingAnimation}
              >
                あなたに寄り添う
              </motion.span>
              <br />
              <motion.span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#c68f56] via-[#e6c9a8] to-[#8b5d3b] inline-block",
                )}
                animate={{
                  ...floatingAnimation,
                  transition: {
                    ...floatingAnimation.transition,
                    delay: 0.5,
                  },
                }}
              >
                AIソリューション
              </motion.span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-[#e6c9a8]/80 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              ビジネスに最適化されたAIチャットボットで業務効率化・顧客満足度向上を実現します
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              asChild
              className="bg-[#8b5d3b] hover:bg-[#5e3b22] text-white relative overflow-hidden group"
            >
              <Link href="/#contact">
                <span className="relative z-10">無料相談を予約する</span>
                <span className="absolute inset-0 bg-[#5e3b22] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-[#c68f56] text-[#c68f56] hover:bg-[#c68f56]/10 relative overflow-hidden group"
            >
              <Link href="/#services">
                <span className="relative z-10">サービスを見る</span>
                <span className="absolute inset-0 bg-[#c68f56]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d13] via-transparent to-[#2b1d13]/80 pointer-events-none" />
    </div>
  )
}

