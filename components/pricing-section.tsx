"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRef } from "react"

export function PricingSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  const plans = [
    {
      name: "スタンダードプラン",
      price: "要お問い合わせ",
      description: "基本的なAIチャットボット導入に最適なプラン",
      features: [
        "カスタムAIチャットボット開発",
        "基本的なナレッジベース構築",
        "管理画面の提供",
        "初期設定サポート",
        "3ヶ月間の保守サポート",
      ],
    },
    {
      name: "プレミアムプラン",
      price: "要お問い合わせ",
      description: "高度なAI機能と連携が必要な企業向け",
      features: [
        "高度なAIチャットボット開発",
        "大規模ナレッジベース構築",
        "既存システム連携",
        "カスタム管理画面開発",
        "1年間の保守サポート",
        "月次パフォーマンスレポート",
      ],
    },
    {
      name: "エンタープライズプラン",
      price: "要お問い合わせ",
      description: "大規模導入と複雑な要件に対応",
      features: [
        "複数AIチャットボット開発",
        "複雑なワークフロー自動化",
        "複数システム連携",
        "専用サポート担当者",
        "無制限の保守サポート",
        "四半期ごとの改善提案",
      ],
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
    <section ref={ref} className="py-20 bg-[#fff9f2] relative overflow-hidden" id="pricing">
      {/* 背景の装飾要素 */}
      <motion.div
        className="absolute top-20 left-0 right-0 mx-auto w-96 h-96 rounded-full bg-gradient-to-br from-[#c68f56]/10 to-transparent blur-3xl"
        style={{ rotate }}
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
            料金プラン
          </motion.h2>
          <motion.p
            className="text-[#8b5d3b] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            お客様のニーズに合わせた柔軟な料金プランをご用意しています
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full flex flex-col border-[#e6c9a8] bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#5e3b22]">{plan.name}</CardTitle>
                  <div className="mt-4 text-4xl font-bold text-[#8b5d3b]">{plan.price}</div>
                  <CardDescription className="mt-2 text-[#a67c52]">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                          <Check className="h-5 w-5 text-primary mr-2" />
                        </motion.div>
                        <span className="text-[#8b5d3b]">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-[#5e3b22] relative overflow-hidden group" asChild>
                    <Link href="/#contact">
                      <span className="relative z-10">お問い合わせ</span>
                      <span className="absolute inset-0 bg-[#5e3b22] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

