import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, generateContactNotificationEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, name, email, phone, service, message } = body;

    // バリデーション
    if (!company || !name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません。' },
        { status: 400 }
      );
    }

    // データベースに保存
    const contact = await prisma.contact.create({
      data: {
        company,
        name,
        email,
        phone: phone || null,
        service: service || null,
        message,
      },
    });

    // 管理者にメール通知を送信
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const emailHtml = generateContactNotificationEmail({
        company,
        name,
        email,
        phone,
        service,
        message,
      });
      
      await sendEmail({
        to: adminEmail,
        subject: `【お問い合わせ】${company} ${name}様`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('メール送信エラー:', emailError);
      // メール送信エラーはユーザーに通知しない（データベースへの保存は成功しているため）
    }

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error('問い合わせ送信エラー:', error);
    return NextResponse.json(
      { error: '問い合わせの送信中にエラーが発生しました。' },
      { status: 500 }
    );
  }
} 