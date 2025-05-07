import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, generateContactNotificationEmail } from '@/lib/mail';

export async function POST(request: Request) {
  console.log('API: リクエスト受信');
  
  try {
    const body = await request.json();
    console.log('API: リクエストボディ', body);
    
    const { company, name, email, phone, service, message } = body;

    // バリデーション
    if (!company || !name || !email || !message) {
      console.log('API: バリデーションエラー');
      return NextResponse.json(
        { error: '必須項目が入力されていません。' },
        { status: 400 }
      );
    }

    console.log('API: Prisma接続開始');
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
    console.log('API: データベース保存成功', contact.id);

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
      console.log('API: メール送信成功');
    } catch (emailError) {
      console.error('メール送信エラー:', emailError);
      // メール送信エラーはユーザーに通知しない（データベースへの保存は成功しているため）
    }

    console.log('API: 成功レスポンス送信');
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error('問い合わせ送信エラー:', error);
    return NextResponse.json(
      { error: '問い合わせの送信中にエラーが発生しました。' },
      { status: 500 }
    );
  }
} 