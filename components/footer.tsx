import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, RabbitIcon as TeddyBear } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#2b1d13] text-[#e6c9a8]">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <TeddyBear className="h-8 w-8 text-[#c68f56]" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#c68f56] to-[#e6c9a8]">
                Teddy
              </span>
            </Link>
            <p className="text-sm text-[#d9b38c]">
              企業のニーズに合わせたカスタムAIチャットボット・LLMソリューションの開発・導入支援
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-[#f0d9bf]">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  カスタムチャットボット開発
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  ナレッジベース構築
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  既存システム連携
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  保守・運用サポート
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-[#f0d9bf]">会社情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  導入事例
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#d9b38c] hover:text-[#f0d9bf]">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-[#f0d9bf]">お問い合わせ</h3>
            <ul className="space-y-2">
              <li className="text-sm text-[#d9b38c]">
                〒123-4567
                <br />
                東京都渋谷区AI通り1-2-3
              </li>
              <li className="text-sm text-[#d9b38c]">info@teddy.jp</li>
              <li className="text-sm text-[#d9b38c]">03-1234-5678</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-[#d9b38c] hover:text-[#f0d9bf]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-[#d9b38c] hover:text-[#f0d9bf]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-[#d9b38c] hover:text-[#f0d9bf]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-[#d9b38c] hover:text-[#f0d9bf]">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#8b5d3b]/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-[#d9b38c]">&copy; {new Date().getFullYear()} Teddy Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

