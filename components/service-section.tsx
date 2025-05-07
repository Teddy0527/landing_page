"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Bot, Database, Zap, Wrench } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef } from "react"

export function ServiceSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const services = [
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: "カスタムチャットボット開発",
      description:
        "企業のニーズに合わせたAIチャットボットを開発。顧客サポート、社内Q&A、営業支援など様々な用途に対応します。",
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "ナレッジベース構築",
      description:
        "社内ドキュメントやFAQをAIが理解できる形に変換。膨大な情報を効率的に活用できるシステムを構築します。",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "既存システム連携",
      description: "CRMやERPなど既存のシステムとAIを連携。データを活用した高度な自動化と意思決定支援を実現します。",
    },
    {
      icon: <Wrench className="h-10 w-10 text-primary" />,
      title: "保守・運用サポート",
      description:
        "導入後の継続的な改善と保守。AIの精度向上、新機能追加、セキュリティ対策などを包括的にサポートします。",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section ref={ref} className="py-20 bg-[#fff9f2] relative overflow-hidden" id="services">
      {/* 背景の装飾要素 */}
      <motion.div
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#c68f56]/10 to-transparent blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#8b5d3b]/10 to-transparent blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
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
            サービス内容
          </motion.h2>
          <motion.p
            className="text-[#8b5d3b] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            企業のニーズに合わせたカスタムAIチャットボット・LLMソリューションの開発・導入支援を提供します
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-[#e6c9a8] bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <motion.div
                    className="mb-4"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  <CardTitle className="text-[#5e3b22]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-[#8b5d3b]">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

