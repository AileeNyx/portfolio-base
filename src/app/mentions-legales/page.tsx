import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10">
              <span className="text-artist-accent">Mentions</span> légales
            </h1>

            <div className="space-y-8 text-white/80">
              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">1. Informations légales</h2>
                <p className="mb-4">
                  Le site internet <span className="text-artist-accent">Portfolio @Wonderful.Gemini</span> est édité par :
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li><strong>Prénom Nom</strong> : [Nom de l'artiste]</li>
                  <li><strong>Statut</strong> : Artiste indépendant(e)</li>
                  <li><strong>Adresse</strong> : [Adresse complète]</li>
                  <li><strong>Email</strong> : contact@example.com</li>
                  <li><strong>Téléphone</strong> : [Numéro de téléphone]</li>
                </ul>
                <p>
                  Les informations concernant la collecte et le traitement des données personnelles (politique et déclaration) sont fournies dans la page "Politique de confidentialité".
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">2. Hébergement</h2>
                <p>
                  Ce site est hébergé par :
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li><strong>Société</strong> : [Nom de l'hébergeur]</li>
                  <li><strong>Adresse</strong> : [Adresse de l'hébergeur]</li>
                  <li><strong>Site internet</strong> : www.example-hebergeur.com</li>
                </ul>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">3. Propriété intellectuelle</h2>
                <p className="mb-4">
                  L'ensemble de ce site, y compris sa structure, son design, ses textes, ses images, ses photographies, 
                  ses illustrations, ainsi que tous les éléments graphiques qui le composent, sont la propriété exclusive 
                  de [Nom de l'artiste].
                </p>
                <p className="mb-4">
                  Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, quel que soit le 
                  moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
                </p>
                <p>
                  Toute exploitation non autorisée du site ou de l'un de ses éléments sera considérée comme constitutive d'une contrefaçon 
                  et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">4. Liens hypertextes</h2>
                <p className="mb-4">
                  Les liens hypertextes mis en place sur ce site internet en direction d'autres ressources présentes sur le réseau Internet 
                  ont fait l'objet d'une autorisation préalable expresse et écrite.
                </p>
                <p>
                  [Nom de l'artiste] n'est pas responsable de l'accès à ces sites et sources externes, ni de leur contenu qui y est proposé. 
                  La consultation et l'utilisation de ces sources et sites externes sont régies par les conditions d'utilisation de ces sites.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">5. Cookies</h2>
                <p className="mb-4">
                  Le site peut utiliser des cookies techniques pour son bon fonctionnement. Les visiteurs du site sont informés que des 
                  cookies peuvent être temporairement conservés lors de la consultation sur leur disque dur afin de faciliter la navigation 
                  sur le site.
                </p>
                <p>
                  Les visiteurs sont libres d'accepter ou de refuser ces cookies en configurant leur navigateur. Aucun cookie n'est utilisé 
                  à des fins de profilage ou de suivi publicitaire.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">6. Droit applicable et juridiction compétente</h2>
                <p className="mb-4">
                  Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.
                </p>
                <p>
                  Ces mentions légales peuvent être modifiées à tout moment, sans préavis, selon l'évolution du site ou de la réglementation.
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