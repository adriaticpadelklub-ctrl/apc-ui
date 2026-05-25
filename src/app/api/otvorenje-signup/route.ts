import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const experienceLevelLabels: Record<string, string> = {
  beginner: 'Početnik',
  intermediate: 'Srednji',
  advanced: 'Napredni',
};

const padelExperienceLabels: Record<string, string> = {
  'less-6-months': 'Manje od 6 mjeseci',
  '6-12-months': '6-12 mjeseci',
  '1-2-years': '1-2 godine',
  '2-plus-years': '2+ godine',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      experienceLevel,
      age,
      padelExperience,
      shirtSize,
      dietaryRestrictions,
    } = body;

    const { error } = await resend.emails.send({
      from: 'Adriatic Padel Klub <noreply@adriaticpadelklub.hr>',
      to: 'info@adriaticpadelklub.hr',
      replyTo: email,
      subject: `Nova prijava za Mini Turnir - ${name}`,
      html: `
        <h2>Nova prijava za Mini Turnir - Otvorenje</h2>
        <p>Primljena je nova prijava za Mini Turnir na otvorenju kluba.</p>

        <h3>Podaci o sudioniku:</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Ime i prezime</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefon</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Razina iskustva</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${experienceLevelLabels[experienceLevel] || experienceLevel}</td>
          </tr>
          ${age ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Dob</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${age}</td>
          </tr>
          ` : ''}
          ${padelExperience ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Padel iskustvo</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${padelExperienceLabels[padelExperience] || padelExperience}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Veličina majice</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${shirtSize}</td>
          </tr>
          ${dietaryRestrictions ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Prehrambena ograničenja</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${dietaryRestrictions}</td>
          </tr>
          ` : ''}
        </table>

        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          Ova poruka je automatski generirana putem web stranice adriaticpadelklub.hr
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
