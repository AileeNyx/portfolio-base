import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10">
              <span className="text-artist-accent">Politique de</span> confidentialité
            </h1>

            <div className="space-y-8 text-white/80">
              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">Introduction</h2>
                <p>
                  Dans le cadre de l'utilisation du site Portfolio @Wonderful.Gemini, nous sommes amenés à collecter 
                  et traiter certaines de vos données personnelles. Cette politique de confidentialité a pour objectif 
                  de vous informer sur la manière dont nous recueillons, utilisons et protégeons ces informations, 
                  conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">1. Collecte des données personnelles</h2>
                <p className="mb-4">
                  Nous collectons les données personnelles suivantes lorsque vous utilisez notre formulaire de contact :
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Nom et prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Message et informations que vous nous communiquez</li>
                </ul>
                <p>
                  Si vous vous inscrivez à notre newsletter, nous collectons également votre adresse e-mail dans ce but précis.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">2. Utilisation des données</h2>
                <p className="mb-4">
                  Les données personnelles que nous collectons sont utilisées uniquement pour :
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Répondre à vos demandes d'information ou de contact</li>
                  <li>Vous envoyer notre newsletter (uniquement si vous y avez explicitement consenti)</li>
                  <li>Améliorer notre site et nos services</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
                <p>
                  Nous ne vendons, n'échangeons, ni ne transférons vos informations personnelles à des tiers, sauf si nous en avons l'obligation légale.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">3. Conservation des données</h2>
                <p className="mb-4">
                  Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles nous les collectons :
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Données de contact : 3 ans à compter de votre dernière interaction avec nous</li>
                  <li>Données d'inscription à la newsletter : jusqu'à votre désabonnement</li>
                </ul>
                <p>
                  À l'issue de ces périodes, vos données personnelles sont supprimées ou anonymisées.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">4. Sécurité des données</h2>
                <p>
                  Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer 
                  la sécurité de vos données personnelles, notamment contre le traitement non autorisé ou illicite et 
                  contre la perte, la destruction ou les dégâts d'origine accidentelle.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">5. Cookies et technologies similaires</h2>
                <p className="mb-4">
                  Notre site peut utiliser des cookies techniques nécessaires au bon fonctionnement du site. Ces cookies ne 
                  collectent pas d'informations personnelles identifiables.
                </p>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé. 
                  Toutefois, si vous n'acceptez pas les cookies, il est possible que certaines fonctionnalités du site ne soient pas disponibles.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">6. Vos droits</h2>
                <p className="mb-4">
                  Conformément à la réglementation applicable, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Droit d'accès et de rectification</li>
                  <li>Droit à l'effacement (« droit à l'oubli »)</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit d'opposition</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit de retirer votre consentement à tout moment</li>
                </ul>
                <p className="mb-4">
                  Pour exercer ces droits, vous pouvez nous contacter par email à : [adresse email] ou par courrier à : [adresse postale].
                </p>
                <p>
                  Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL).
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">7. Modification de la politique de confidentialité</h2>
                <p>
                  Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. 
                  Les modifications prendront effet dès leur publication sur notre site. Nous vous encourageons à consulter 
                  régulièrement cette page pour rester informé de nos pratiques en matière de protection des données personnelles.
                </p>
              </section>
            </div>

            <div className="text-center mt-12">
              <p className="text-white/60 text-sm">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 