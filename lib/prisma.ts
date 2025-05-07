import { PrismaClient } from '@prisma/client';

// グローバル変数の宣言
declare global {
  var prisma: PrismaClient | undefined;
}

// PrismaClientのグローバルインスタンスを宣言
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// 開発環境では、ホットリロード時に複数のインスタンスが作成されるのを防ぐ
if (process.env.NODE_ENV !== 'production') global.prisma = prisma; 