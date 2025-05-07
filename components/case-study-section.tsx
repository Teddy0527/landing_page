"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRef } from "react"

export function CaseStudySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [-50, 50])

  const caseStudies = [
    {
      title: "製造業向け技術サポートチャットボット",
      category: "顧客サポート",
      description:
        "24時間365日、技術的な質問に回答するAIチャットボットを開発。問い合わせ対応時間を80%削減し、顧客満足度が25%向上しました。",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "金融機関向け社内ナレッジベース",
      category: "社内ナレッジ",
      description:
        "複雑な金融商品や規制情報を瞬時に検索・回答できるAIシステムを構築。新人研修期間を30%短縮し、業務効率が40%向上しました。",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "小売業向け接客支援AIアシスタント",
      category: "業務効率化",
      description:
        "店舗スタッフの接客をサポートするAIアシスタントを開発。商品知識の均一化と接客品質の向上により、売上が15%増加しました。",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-[#f5e9d9] relative overflow-hidden" id="case-studies">
      {/* 背景の装飾要素 */}
      <motion.div
        className="absolute -left-40 top-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#c68f56]/10 to-transparent blur-3xl"
        style={{ x }}
      />
      <motion.div
        className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-gradient-to-tl from-[#8b5d3b]/10 to-transparent blur-3xl"
        style={{ x: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold tracking-tight mb-4 text-[#5e3b22]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            導入事例
          </motion.h2>
          <motion.p
            className="text-[#8b5d3b] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            様々な業界のお客様にTeddyのAIソリューションを導入いただいています
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full overflow-hidden border-[#e6c9a8] bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <motion.div
                  className="relative h-48 w-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-[#c68f56] hover:bg-[#8b5d3b]">{study.category}</Badge>
                  <CardTitle className="text-[#5e3b22]">{study.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-[#8b5d3b]">{study.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

