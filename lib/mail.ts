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
  
  // サービス名を日本語に変換
  const serviceMap: Record<string, string> = {
    chatbot: 'カスタムチャットボット開発',
    knowledge: 'ナレッジベース構築',
    integration: '既存システム連携',
    support: '保守・運用サポート',
    other: 'その他'
  };
  
  const serviceName = service ? serviceMap[service] || service : '未選択';
  const currentDate = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f5e9d9; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #fff; border: 1px solid #e6c9a8; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
        h2 { color: #5e3b22; }
        .label { font-weight: bold; color: #8b5d3b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>新しいお問い合わせが届きました</h2>
          <p>受付日時: ${currentDate}</p>
        </div>
        <div class="content">
          <p><span class="label">会社名:</span> ${company}</p>
          <p><span class="label">氏名:</span> ${name}</p>
          <p><span class="label">メールアドレス:</span> <a href="mailto:${email}">${email}</a></p>
          <p><span class="label">電話番号:</span> ${phone || '未入力'}</p>
          <p><span class="label">興味のあるサービス:</span> ${serviceName}</p>
          <h3>お問い合わせ内容:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #8b5d3b;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div class="footer">
          <p>このメールは自動送信されています。返信は直接お客様のメールアドレスにお願いします。</p>
          <p>© ${new Date().getFullYear()} Teddy AI</p>
        </div>
      </div>
    </body>
    </html>
  `;
} 