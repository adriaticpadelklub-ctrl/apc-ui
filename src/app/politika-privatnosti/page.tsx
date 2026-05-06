import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politika privatnosti',
  description:
    'Politika privatnosti Adriatic Padel Kluba - saznajte kako prikupljamo, koristimo i štitimo vaše osobne podatke.',
  openGraph: {
    title: 'Politika privatnosti | Adriatic Padel Club',
    description: 'Saznajte kako prikupljamo, koristimo i štitimo vaše osobne podatke.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-beige">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-4">
              Politika privatnosti
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
          <div className="max-w-3xl mx-auto prose prose-teal prose-lg">

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              1. Uvod
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              ADRIATIC PADEL KLUB d.o.o. (u daljnjem tekstu: &quot;mi&quot;, &quot;nas&quot; ili &quot;Klub&quot;)
              posvećen je zaštiti vaše privatnosti. Ova Politika privatnosti objašnjava kako
              prikupljamo, koristimo, pohranjujemo i štitimo vaše osobne podatke u skladu s
              Općom uredbom o zaštiti podataka (GDPR) i hrvatskim Zakonom o provedbi Opće
              uredbe o zaštiti podataka.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              2. Voditelj obrade podataka
            </h2>
            <div className="bg-beige rounded-xl p-6 mb-6">
              <p className="text-teal/80 mb-2"><strong>ADRIATIC PADEL KLUB d.o.o.</strong></p>
              <p className="text-teal/80 mb-2">Pazdigradska 44A, 21000 Split, Hrvatska</p>
              <p className="text-teal/80 mb-2">OIB: 70690014090</p>
              <p className="text-teal/80 mb-2">MB: 06257020</p>
              <p className="text-teal/80 mb-2">E-mail: <a href="mailto:info@adriaticpadelklub.hr" className="text-lime hover:underline">info@adriaticpadelklub.hr</a></p>
              <p className="text-teal/80">Telefon: <a href="tel:+38598222063" className="text-lime hover:underline">+385 98 222 063</a></p>
            </div>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              3. Koje osobne podatke prikupljamo
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Prikupljamo sljedeće vrste osobnih podataka:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li><strong>Kontaktni podaci:</strong> ime i prezime, e-mail adresa, broj telefona</li>
              <li><strong>Podaci o rezervacijama:</strong> datum i vrijeme rezervacije terena, preferirani termini</li>
              <li><strong>Podaci o članstvu:</strong> vrsta članstva, datum učlanjenja, povijest članstva</li>
              <li><strong>Komunikacijski podaci:</strong> upiti, povratne informacije, korespondencija</li>
              <li><strong>Tehnički podaci:</strong> IP adresa, vrsta preglednika, podaci o uređaju (putem kolačića, uz vašu suglasnost)</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              4. Kako prikupljamo vaše podatke
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Vaše osobne podatke prikupljamo na sljedeće načine:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li>Kada ispunite kontaktni obrazac na našoj web stranici</li>
              <li>Kada se registrirate za članstvo u klubu</li>
              <li>Kada rezervirate teren putem Playtomic platforme ili direktno</li>
              <li>Kada se prijavite na naš newsletter</li>
              <li>Kada komunicirate s nama putem e-maila ili telefona</li>
              <li>Automatski putem kolačića kada posjetite našu web stranicu (uz vašu suglasnost)</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              5. Pravna osnova za obradu podataka
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Vaše podatke obrađujemo na temelju:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li><strong>Izvršenje ugovora:</strong> obrada potrebna za pružanje naših usluga (rezervacije, članstvo)</li>
              <li><strong>Privola:</strong> za marketing komunikaciju i analitičke kolačiće</li>
              <li><strong>Legitimni interes:</strong> za poboljšanje naših usluga i korisničkog iskustva</li>
              <li><strong>Zakonska obveza:</strong> za ispunjavanje poreznih i računovodstvenih obveza</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              6. Kako koristimo vaše podatke
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Vaše osobne podatke koristimo za:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li>Obradu i upravljanje rezervacijama terena</li>
              <li>Administraciju članstva u klubu</li>
              <li>Odgovaranje na vaše upite i pružanje korisničke podrške</li>
              <li>Slanje obavijesti o vašim rezervacijama</li>
              <li>Slanje promotivnih materijala (uz vašu privolu)</li>
              <li>Poboljšanje naše web stranice i usluga</li>
              <li>Analizu korištenja web stranice (uz vašu privolu)</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              7. Dijeljenje podataka s trećim stranama
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Vaše podatke možemo dijeliti sa:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li><strong>Playtomic:</strong> platforma za rezervaciju terena</li>
              <li><strong>Google Analytics:</strong> za analizu prometa na web stranici (uz vašu privolu)</li>
              <li><strong>Davatelji usluga:</strong> koji nam pomažu u poslovanju (hosting, e-mail servisi)</li>
              <li><strong>Državna tijela:</strong> kada je to zakonski propisano</li>
            </ul>
            <p className="text-teal/80 leading-relaxed mb-4">
              Svi naši partneri obvezani su čuvati povjerljivost vaših podataka i koristiti
              ih samo u svrhe za koje su im dostavljeni.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              8. Koliko dugo čuvamo vaše podatke
            </h2>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li><strong>Podaci o članstvu:</strong> tijekom trajanja članstva i 5 godina nakon isteka</li>
              <li><strong>Podaci o rezervacijama:</strong> 2 godine od datuma rezervacije</li>
              <li><strong>Kontaktni upiti:</strong> 2 godine od zadnje komunikacije</li>
              <li><strong>Računovodstveni dokumenti:</strong> 11 godina sukladno zakonskim propisima</li>
              <li><strong>Marketing privola:</strong> do povlačenja privole</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              9. Vaša prava
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Prema GDPR-u imate sljedeća prava:
            </p>
            <ul className="list-disc pl-6 text-teal/80 space-y-2 mb-6">
              <li><strong>Pravo na pristup:</strong> možete zatražiti kopiju svojih osobnih podataka</li>
              <li><strong>Pravo na ispravak:</strong> možete zatražiti ispravak netočnih podataka</li>
              <li><strong>Pravo na brisanje:</strong> možete zatražiti brisanje svojih podataka (&quot;pravo na zaborav&quot;)</li>
              <li><strong>Pravo na ograničenje obrade:</strong> možete zatražiti ograničenje obrade vaših podataka</li>
              <li><strong>Pravo na prenosivost:</strong> možete zatražiti prijenos podataka drugom voditelju obrade</li>
              <li><strong>Pravo na prigovor:</strong> možete prigovoriti obradi podataka za marketing</li>
              <li><strong>Pravo na povlačenje privole:</strong> u bilo kojem trenutku možete povući danu privolu</li>
            </ul>
            <p className="text-teal/80 leading-relaxed mb-4">
              Za ostvarivanje svojih prava, kontaktirajte nas na{' '}
              <a href="mailto:info@adriaticpadelklub.hr" className="text-lime hover:underline">
                info@adriaticpadelklub.hr
              </a>.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              10. Sigurnost podataka
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Implementirali smo odgovarajuće tehničke i organizacijske mjere za zaštitu
              vaših osobnih podataka od neovlaštenog pristupa, gubitka ili oštećenja.
              Naša web stranica koristi SSL enkripciju za siguran prijenos podataka.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              11. Kolačići
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Naša web stranica koristi kolačiće za poboljšanje korisničkog iskustva.
              Za detaljne informacije o kolačićima koje koristimo i kako njima upravljati,
              pogledajte našu{' '}
              <Link href="/politika-kolacica" className="text-lime hover:underline">
                Politiku kolačića
              </Link>.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              12. Pravo na pritužbu
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Ako smatrate da smo povrijedili vaša prava u vezi s obradom osobnih podataka,
              imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP):
            </p>
            <div className="bg-beige rounded-xl p-6 mb-6">
              <p className="text-teal/80 mb-2"><strong>Agencija za zaštitu osobnih podataka</strong></p>
              <p className="text-teal/80 mb-2">Selska cesta 136, 10000 Zagreb</p>
              <p className="text-teal/80 mb-2">E-mail: azop@azop.hr</p>
              <p className="text-teal/80">Web: <a href="https://azop.hr" target="_blank" rel="noopener noreferrer" className="text-lime hover:underline">www.azop.hr</a></p>
            </div>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              13. Izmjene politike privatnosti
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Ovu Politiku privatnosti možemo povremeno ažurirati. O značajnim promjenama
              obavijestit ćemo vas putem naše web stranice ili e-mailom. Preporučujemo
              povremeno pregledavanje ove stranice.
            </p>

            <h2 className="font-heading text-2xl font-bold text-teal mt-12 mb-4">
              14. Kontakt
            </h2>
            <p className="text-teal/80 leading-relaxed mb-4">
              Za sva pitanja u vezi s ovom Politikom privatnosti ili obradom vaših osobnih
              podataka, kontaktirajte nas:
            </p>
            <div className="bg-beige rounded-xl p-6 mb-6">
              <p className="text-teal/80 mb-2">E-mail: <a href="mailto:info@adriaticpadelklub.hr" className="text-lime hover:underline">info@adriaticpadelklub.hr</a></p>
              <p className="text-teal/80 mb-2">Telefon: <a href="tel:+38598222063" className="text-lime hover:underline">+385 98 222 063</a></p>
              <p className="text-teal/80">Adresa: Pazdigradska 44A, 21000 Split, Hrvatska</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
