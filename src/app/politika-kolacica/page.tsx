'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function CookiePolicyPage() {
  const { resetConsent } = useCookieConsent();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-beige">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-4">
              Politika kolačića
            </h1>
            <p className="text-lg text-teal/70">
              Posljednja izmjena: {new Date().toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              1. Što su kolačići?
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Kolačići su male tekstualne datoteke koje se pohranjuju na vaš uređaj
              (računalo, tablet ili mobitel) kada posjetite web stranicu. Kolačići
              omogućuju web stranici da zapamti vaše radnje i postavke tijekom vremena,
              tako da ih ne morate unositi svaki put kada posjetite stranicu.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              2. Kako koristimo kolačiće
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Na web stranici Adriatic Padel Cluba koristimo kolačiće za:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li>Omogućavanje pravilnog funkcioniranja web stranice</li>
              <li>Pamćenje vaših postavki privatnosti</li>
              <li>Analizu prometa i poboljšanje korisničkog iskustva (uz vašu privolu)</li>
              <li>Prikazivanje relevantnog sadržaja (uz vašu privolu)</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              3. Vrste kolačića koje koristimo
            </h2>

            {/* Necessary Cookies */}
            <div className="bg-beige rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg font-bold text-teal">
                  Neophodni kolačići
                </h3>
                <span className="text-sm bg-lime/20 text-teal px-3 py-1 rounded-full">
                  Uvijek aktivni
                </span>
              </div>
              <p className="text-teal/80 text-sm mb-4">
                Ovi kolačići su neophodni za pravilno funkcioniranje web stranice i ne
                mogu se isključiti. Postavljaju se samo kao odgovor na vaše radnje koje
                predstavljaju zahtjev za uslugama.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-teal/10">
                      <th className="text-left py-2 pr-4 text-teal font-semibold">Kolačić</th>
                      <th className="text-left py-2 pr-4 text-teal font-semibold">Svrha</th>
                      <th className="text-left py-2 text-teal font-semibold">Trajanje</th>
                    </tr>
                  </thead>
                  <tbody className="text-teal/70">
                    <tr className="border-b border-teal/5">
                      <td className="py-2 pr-4 font-mono text-xs">apc_cookie_consent</td>
                      <td className="py-2 pr-4">Pamti vaše postavke kolačića</td>
                      <td className="py-2">1 godina</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-beige rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg font-bold text-teal">
                  Analitički kolačići
                </h3>
                <span className="text-sm bg-teal/10 text-teal px-3 py-1 rounded-full">
                  Zahtijeva privolu
                </span>
              </div>
              <p className="text-teal/80 text-sm mb-4">
                Ovi kolačići nam pomažu razumjeti kako posjetitelji koriste našu web
                stranicu prikupljanjem anonimnih informacija. To nam omogućuje
                poboljšanje korisničkog iskustva.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-teal/10">
                      <th className="text-left py-2 pr-4 text-teal font-semibold">Kolačić</th>
                      <th className="text-left py-2 pr-4 text-teal font-semibold">Pružatelj</th>
                      <th className="text-left py-2 pr-4 text-teal font-semibold">Svrha</th>
                      <th className="text-left py-2 text-teal font-semibold">Trajanje</th>
                    </tr>
                  </thead>
                  <tbody className="text-teal/70">
                    <tr className="border-b border-teal/5">
                      <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                      <td className="py-2 pr-4">Google</td>
                      <td className="py-2 pr-4">Razlikuje korisnike</td>
                      <td className="py-2">2 godine</td>
                    </tr>
                    <tr className="border-b border-teal/5">
                      <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                      <td className="py-2 pr-4">Google</td>
                      <td className="py-2 pr-4">Održava stanje sesije</td>
                      <td className="py-2">2 godine</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-teal/60 text-xs mt-4">
                Više informacija:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  Google Privacy Policy
                </a>
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-beige rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg font-bold text-teal">
                  Marketinški kolačići
                </h3>
                <span className="text-sm bg-teal/10 text-teal px-3 py-1 rounded-full">
                  Zahtijeva privolu
                </span>
              </div>
              <p className="text-teal/80 text-sm mb-4">
                Ovi kolačići se koriste za praćenje posjetitelja na web stranicama kako
                bi se prikazali relevantni oglasi. Trenutno ne koristimo marketinške
                kolačiće, ali ova kategorija je pripremljena za buduću upotrebu.
              </p>
              <p className="text-teal/60 text-sm italic">
                Trenutno nema aktivnih marketinških kolačića.
              </p>
            </div>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              4. Upravljanje kolačićima
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Možete kontrolirati i upravljati kolačićima na nekoliko načina:
            </p>

            <h3 className="font-heading text-lg font-bold text-teal mt-6 mb-3">
              Putem naše web stranice
            </h3>
            <p className="text-teal/80 leading-relaxed mb-4">
              Možete promijeniti svoje postavke kolačića u bilo kojem trenutku klikom
              na gumb ispod:
            </p>
            <button
              onClick={resetConsent}
              className="
                px-6 py-3 rounded-full font-medium
                bg-lime text-teal hover:bg-lime-dark
                transition-colors duration-200
                shadow-lg shadow-lime/20
                mb-6
              "
            >
              Promijeni postavke kolačića
            </button>

            <h3 className="font-heading text-lg font-bold text-teal mt-6 mb-3">
              Putem preglednika
            </h3>
            <p className="text-teal/80 leading-relaxed mb-4">
              Većina web preglednika omogućuje kontrolu kolačića putem postavki.
              Evo kako pristupiti postavkama kolačića u najpopularnijim preglednicima:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p className="text-teal/80 leading-relaxed mb-4">
              <strong>Napomena:</strong> Onemogućavanje svih kolačića može utjecati na
              funkcionalnost web stranice.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              5. Kolačići trećih strana
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Neki kolačići na našoj stranici postavljaju treće strane. To uključuje:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li>
                <strong>Google Analytics</strong> - za analizu prometa na web stranici.
                Više informacija na{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  Google Privacy Policy
                </a>
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              6. Izmjene politike kolačića
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Ovu Politiku kolačića možemo povremeno ažurirati kako bismo odrazili
              promjene u kolačićima koje koristimo ili iz drugih operativnih, pravnih
              ili regulatornih razloga. Preporučujemo povremeno pregledavanje ove stranice.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              7. Kontakt
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Za sva pitanja o našoj upotrebi kolačića, kontaktirajte nas:
            </p>
            <div className="bg-beige rounded-xl p-6 mb-6">
              <p className="text-teal/80 mb-2">
                E-mail:{' '}
                <a href="mailto:info@adriaticpadelklub.hr" className="text-lime hover:underline">
                  info@adriaticpadelklub.hr
                </a>
              </p>
              <p className="text-teal/80 mb-2">
                Telefon:{' '}
                <a href="tel:+38598222063" className="text-lime hover:underline">
                  +385 98 222 063
                </a>
              </p>
              <p className="text-teal/80">
                Adresa: Pazdigradska 44A, 21000 Split, Hrvatska
              </p>
            </div>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              8. Više informacija
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Za više informacija o tome kako obrađujemo vaše osobne podatke, pogledajte
              našu{' '}
              <Link href="/politika-privatnosti" className="text-lime hover:underline">
                Politiku privatnosti
              </Link>.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
