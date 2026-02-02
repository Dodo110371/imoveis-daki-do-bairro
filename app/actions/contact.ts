'use server';

import { createClient } from '@/lib/supabase/server';
import nodemailer from 'nodemailer';
import { siteConfig } from '@/lib/site-config';

export type ContactState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
};

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // 1. Basic Validation
  if (!name || !email || !message) {
    return {
      success: false,
      message: 'Por favor, preencha todos os campos obrigatórios.',
    };
  }

  try {
    // 2. Insert into Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from('messages')
      .insert([
        {
          name,
          email,
          phone,
          subject,
          message,
        },
      ]);

    if (dbError) {
      console.error('Database Error:', dbError);
      return {
        success: false,
        message: 'Erro ao salvar sua mensagem. Tente novamente.',
      };
    }

    // 3. Send Email (only if SMTP vars are present)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${siteConfig.name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL_TO || siteConfig.contact.email,
        replyTo: email,
        subject: `Novo contato pelo site: ${subject}`,
        html: `
          <h2>Nova mensagem recebida</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <br/>
          <p><strong>Mensagem:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn('SMTP settings not found. Skipping email sending.');
    }

    return {
      success: true,
      message: 'Mensagem enviada com sucesso!',
    };
  } catch (error) {
    console.error('Server Action Error:', error);
    return {
      success: false,
      message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    };
  }
}
