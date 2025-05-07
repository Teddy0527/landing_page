"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })
  
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log('送信データ:', formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // レスポンスのデバッグ
      const responseText = await response.text();
      console.log('APIレスポンス:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSONパースエラー:', parseError);
        throw new Error(`レスポンスのパースに失敗しました: ${responseText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'お問い合わせの送信中にエラーが発生しました。');
      }

      toast({
        title: "お問い合わせを受け付けました",
        description: "担当者より2営業日以内にご連絡いたします。",
      });

      // フォームをリセット
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (error) {
      console.error('送信エラー:', error);
      toast({
        title: "エラーが発生しました",
        description: error instanceof Error ? error.message : "お問い合わせの送信中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(139, 93, 59, 0.3)" },
    blur: { scale: 1, boxShadow: "none" },
  }

  return (
    <section ref={ref} className="py-20 bg-[#f5e9d9] relative overflow-hidden" id="contact">
      {/* 背景の装飾要素 */}
      <motion.div
        className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#c68f56]/10 to-transparent blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#8b5d3b]/10 to-transparent blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
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
            お問い合わせ
          </motion.h2>
          <motion.p
            className="text-[#8b5d3b] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            AIチャットボット導入についてのご相談やお見積りのご依頼はこちらからお気軽にお問い合わせください
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-[#e6c9a8] bg-white shadow-md hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-[#5e3b22]">無料相談予約</CardTitle>
              <CardDescription className="text-[#a67c52]">
                ビジネスに最適なAIソリューションについて専門家がご提案します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#5e3b22]">
                      会社名
                    </Label>
                    <motion.div whileHover="focus" variants={inputVariants}>
                      <Input
                        id="company"
                        placeholder="株式会社Teddy"
                        required
                        className="border-[#d9b38c] focus-visible:ring-[#8b5d3b]"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#5e3b22]">
                      お名前
                    </Label>
                    <motion.div whileHover="focus" variants={inputVariants}>
                      <Input
                        id="name"
                        placeholder="山田 太郎"
                        required
                        className="border-[#d9b38c] focus-visible:ring-[#8b5d3b]"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#5e3b22]">
                      メールアドレス
                    </Label>
                    <motion.div whileHover="focus" variants={inputVariants}>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@teddy.jp"
                        required
                        className="border-[#d9b38c] focus-visible:ring-[#8b5d3b]"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#5e3b22]">
                      電話番号
                    </Label>
                    <motion.div whileHover="focus" variants={inputVariants}>
                      <Input
                        id="phone"
                        placeholder="03-1234-5678"
                        className="border-[#d9b38c] focus-visible:ring-[#8b5d3b]"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest" className="text-[#5e3b22]">
                    ご興味のあるサービス
                  </Label>
                  <motion.div whileHover="focus" variants={inputVariants}>
                    <Select onValueChange={handleSelectChange} value={formData.service}>
                      <SelectTrigger className="border-[#d9b38c] focus-visible:ring-[#8b5d3b]">
                        <SelectValue placeholder="サービスを選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatbot">カスタムチャットボット開発</SelectItem>
                        <SelectItem value="knowledge">ナレッジベース構築</SelectItem>
                        <SelectItem value="integration">既存システム連携</SelectItem>
                        <SelectItem value="support">保守・運用サポート</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#5e3b22]">
                    お問い合わせ内容
                  </Label>
                  <motion.div whileHover="focus" variants={inputVariants}>
                    <Textarea
                      id="message"
                      placeholder="ご質問やご要望をお書きください"
                      rows={5}
                      required
                      className="border-[#d9b38c] focus-visible:ring-[#8b5d3b]"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-[#5e3b22] relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10">{isSubmitting ? "送信中..." : "送信する"}</span>
                    <span className="absolute inset-0 bg-[#5e3b22] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

