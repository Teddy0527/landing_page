import nodemailer from 'nodemailer';

type EmailData = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: EmailData) {
  // 環境変数が設定されていない場合はメール送信をスキップ
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('SMTP設定が不足しているため、メール送信をスキップします');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });

    console.log('メール送信成功:', info.messageId);
    return info;
  } catch (error) {
    console.error('メール送信エラー:', error);
    throw error;
  }
}

export function generateContactNotificationEmail(contactData: {
  company: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}) {
  const { company, name, email, phone, service, message } = contactData;

  return `
    <h2>新しいお問い合わせが届きました</h2>
    <p><strong>会社名:</strong> ${company}</p>
    <p><strong>氏名:</strong> ${name}</p>
    <p><strong>メールアドレス:</strong> ${email}</p>
    <p><strong>電話番号:</strong> ${phone || '未入力'}</p>
    <p><strong>興味のあるサービス:</strong> ${service || '未選択'}</p>
    <h3>お問い合わせ内容:</h3>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;
} 