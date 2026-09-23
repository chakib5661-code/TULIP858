import React, { useState } from 'react';
import {
  Video,
  Image as ImageIcon,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  Smartphone,
  FileText,
  CheckCircle2,
  X,
  Film,
  Camera,
  Layers,
  Languages,
  Clock,
  Send,
  FileSpreadsheet,
  WifiOff,
  Truck,
  ShieldCheck,
  Hash,
} from 'lucide-react';
import { StoreSettings } from '../types';
import { TulipLogo } from './TulipLogo';

interface SocialMediaStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeSettings?: StoreSettings;
}

export const SocialMediaStudioModal: React.FC<SocialMediaStudioModalProps> = ({
  isOpen,
  onClose,
  storeSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'visuals' | 'video-script' | 'captions' | 'advantages'>('visuals');
  const [scriptLang, setScriptLang] = useState<'darija' | 'fr' | 'ar'>('darija');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const marketingAssets = [
    {
      id: 'square',
      title: 'Publication Carrée (1:1) - Instagram & Facebook',
      subtitle: 'Idéal pour le fil d\'actualité Instagram, carrousels, et posts Facebook sponsorisés.',
      aspectRatio: '1:1',
      dimensions: '1080 x 1080 px',
      imageUrl: '/src/assets/images/social_promo_square_1790166855350.jpg',
      badge: 'Instagram Feed / Facebook',
      description: 'Mise en valeur élégante des flacons de luxe et matières premières d\'extraits avec smartphone affichant l\'application Tulip Fragrance.',
    },
    {
      id: 'vertical',
      title: 'Story & Reel Vertical (9:16) - TikTok & Reels',
      subtitle: 'Parfait pour TikTok, Instagram Reels, Facebook Reels et WhatsApp Status.',
      aspectRatio: '9:16',
      dimensions: '1080 x 1920 px',
      imageUrl: '/src/assets/images/social_story_reel_1790166871500.jpg',
      badge: 'Reels / TikTok / Story',
      description: 'Format plein écran smartphone mettant en avant la commande mobile rapide, le flaconnage et les matières premières.',
    },
    {
      id: 'banner',
      title: 'Bannière Paysage (16:9) - Facebook Cover & YouTube',
      subtitle: 'Conçu pour la couverture de page Facebook, bannière LinkedIn ou vignette vidéo YouTube.',
      aspectRatio: '16:9',
      dimensions: '1920 x 1080 px',
      imageUrl: '/src/assets/images/social_banner_hero_1790166885057.jpg',
      badge: 'Couverture / Web Banner',
      description: 'Vue d\'ensemble d\'atelier de parfumerie avec tablette numérique présentant l\'inventaire et les fiches commandes.',
    },
  ];

  const advantagesList = [
    {
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      title: 'Précommande 24h/24 & 7j/7',
      titleAr: 'طلبيات متاحة 24/24 و 7/7',
      desc: 'Vos clients artisans et boutiques passent commande à n\'importe quelle heure sans attendre un commercial.',
      descAr: 'زبائنك وأصحاب محلات العطور يقدروا يطلبوا في أي وقت دون انتظار الرد عبر الهاتف.',
    },
    {
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      title: 'Bon de Commande PDF Automatique',
      titleAr: 'بون كوموند PDF فوري ورسمي',
      desc: 'Dès validation, un bon PDF officiel avec code-barres, wilaya et détails complets est généré instantanément.',
      descAr: 'بمجرد تأكيد الطلب، يتم إنشاء بون طلبية رسمي PDF مع باركود وتفاصيل السلع والولاية.',
    },
    {
      icon: <Send className="w-5 h-5 text-sky-400" />,
      title: 'Notification Immédiate Bot Telegram',
      titleAr: 'تنبيه فوري إلى تيليغرام الإدارة',
      desc: 'Chaque commande est transmise en direct sur le Telegram de l\'équipe Tulip pour une préparation express.',
      descAr: 'كل طلبية جديدة تصل فوراً على تيليغرام الشركة للتجهيز السريع دون أي تأخير.',
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-teal-400" />,
      title: 'Synchronisation Stock Excel POS',
      titleAr: 'مزامنة لحظية مع إكسل المتجر',
      desc: 'Synchronisation directe avec vos stocks réels via fichier Excel : zéro rupture surprise pour vos clients.',
      descAr: 'ربط مباشر مع ملف الإكسل الداخلي لتفادي نفاذ المخزون المفاجئ وضمان دقة الكميات.',
    },
    {
      icon: <Truck className="w-5 h-5 text-amber-500" />,
      title: 'Livraison Couvrant les 58 Wilayas',
      titleAr: 'تغطية توصيل لـ 58 ولاية',
      desc: 'Calcul et sélection précise par wilaya avec coordonnées complètes pour expédition sécurisée en Algérie.',
      descAr: 'تحديد دقيق للولاية والبلدية لضمان شحن سلس وسريع إلى جميع ولايات الوطن.',
    },
    {
      icon: <WifiOff className="w-5 h-5 text-indigo-400" />,
      title: 'Fonctionne Même Hors-Ligne (PWA)',
      titleAr: 'يعمل حتى بدون اتصال إنترنت',
      desc: 'Application PWA installable sur l\'écran d\'accueil du téléphone sans passer par le Play Store / App Store.',
      descAr: 'تطبيق خفيف يتم تثبيته على شاشة الهاتف مباشرة، ويسمح بتسجيل الطلبيات حتى عند انقطاع النت.',
    },
  ];

  const videoScenes = [
    {
      sceneNum: 1,
      time: '0:00 - 0:08',
      title: "L'Accroche / Hook (المشكل الشائع)",
      visualCue: "Visuel d'un commerçant fatigué cherchant des messages vocaux WhatsApp et écrivant des prix sur un bout de papier brouillon, puis zoom sur le logo Tulip.",
      screenRecordAction: "Plan rapide sur les soucis d'approvisionnement en parfumerie : erreurs de stock, prix non clairs, messages perdus.",
      voiceover: {
        darija: "مازلت تعيي روحك وتضيع وقتك في تسجيل طلبيات العطور والزيوت بالورقة والستيلو وميساجات واتساب مخلطة؟ وتلقى السلعة ناقصة ولا السعر تبدل؟ حبس هنا، اليوم كاين الحل الاحترافي !",
        fr: "Vous perdez encore un temps précieux à gérer vos commandes d'extraits de parfum et flacons par messages WhatsApp ou notes papier ? Ruptures imprévues, prix incertains... C'est fini !",
        ar: "هل ما زلت تضيع وقتك الثمين في تدوين طلبيات المواد الأولية للعطور يدوياً عبر الرسائل والملاحظات؟ وتفاجأ بنفاذ المخزون أو عدم وضوح الأسعار؟ إليك الحل العصري والمتكامل !",
      },
      onScreenText: "❌ الطرق القديمة ضياع للوقت | ✅ منصة Tulip Fragrance الرسمية",
    },
    {
      sceneNum: 2,
      time: '0:08 - 0:20',
      title: "Découverte de l'Application (الحل المبتكر)",
      visualCue: "Plan dynamique : Une main prend un smartphone haut de gamme, l'application Tulip Fragrance s'ouvre instantanément en plein écran avec une fluidité remarquable.",
      screenRecordAction: "Enregistrer l'écran du smartphone : Défilement fluide de l'accueil Tulip, affichage de la sélection 'Extraits de Parfum', 'Flacons' et 'Accessoires'.",
      voiceover: {
        darija: "مع منصة وتطبيق Tulip Fragrance Company، ولا طلب المواد الأولية والفلاكوناج أسهل وأسرع من أي وقت فات ! كتالوج كامل بين يديك 24 ساعة على 24، مباشرة من هاتفك وبلا ما تحتاج تحمّل من بلاي ستور.",
        fr: "Découvrez la plateforme officielle Tulip Fragrance Company. Votre catalogue B2B complet d'extraits concentrés et flacons de prestige, accessible 24h/24 directement depuis votre mobile.",
        ar: "مع منصة وتطبيق شركة Tulip Fragrance، أصبحت طلبيات المواد الأولية والزجاجات الفاخرة أسهل وأسرع من أي وقت مضى. كتالوج رقمي متكامل متاح بين يديك على مدار 24 ساعة.",
      },
      onScreenText: "📲 تطبيق تولييب للعطور بين يديك 24/7 | خفيف وسريع",
    },
    {
      sceneNum: 3,
      time: '0:20 - 0:35',
      title: "Fonctionnement Simple en 3 Clics (طريقة العمل)",
      visualCue: "Capture vidéo d'écran très nette : clic sur un parfum extrait, sélection de la quantité, ajout au panier, puis vue du récapitulatif avec total en Dinars Algériens.",
      screenRecordAction: "1. Taper le nom d'un extrait dans la recherche rapide. 2. Cliquer sur 'Ajouter'. 3. Ouvrir le panier et choisir la Wilaya.",
      voiceover: {
        darija: "شوف كيفاش تخدم في 3 خطوات برك: أولاً، خير الزيوت أو الفلاكون اللي راك حابهم. ثانياً، شوف المخزون الحقيقي وأسعار الجملة بالدينار الجزائري بالشفافية التامة. وثالثاً، أكد طلبيتك في ثواني واختر ولايتك !",
        fr: "Le fonctionnement est ultra simple : 1. Choisissez vos extraits et flacons. 2. Consultez les stocks réels et les tarifs grossistes en Dinars Algériens. 3. Validez votre panier en sélectionnant votre Wilaya parmi les 58.",
        ar: "خطوات بسيطة وسلسة للغاية: أولاً، تصفح المواد والزيوت والزجاجات المطلوبة. ثانياً، اطلع على المخزون الحقيقي وأسعار الجملة بالدينار الجزائري بكل شفافية. ثالثاً، أكد طلبيتك واختر ولايتك !",
      },
      onScreenText: "1️⃣ اختر المنتجات  2️⃣ شاهد المخزون والأسعار  3️⃣ أكد طلبك",
    },
    {
      sceneNum: 4,
      time: '0:35 - 0:48',
      title: "Les Avantages Exclusifs (المزايا التقنية القوية)",
      visualCue: "Affichage du Bon de Commande PDF qui se télécharge instantanément avec son code-barres pro, puis notification Telegram montrant l'alerte reçue côté administration.",
      screenRecordAction: "Montrer le bouton 'Télécharger Bon PDF' et l'aperçu du document imprimable, puis mentionner le mode hors-ligne.",
      voiceover: {
        darija: "والأجمل من هذا؟ في نفس اللحظة يخرجلك بون كوموند PDF رسمي فيه كلش بالتفصيل، والطلبية تروح ديريكت لتيليغرام الإدارة للتجهيز الفوري ! وفوق هذا يخدم حتى وإذا تقطعت عليك الكونيكسيون !",
        fr: "Génération instantanée de votre Bon de Commande PDF officiel avec code-barres ! Notification en direct transmise à notre équipe via Telegram pour préparation immédiate, et fonctionnement même hors-ligne.",
        ar: "الميزة الأقوى: إنشاء بون طلبية رسمي PDF بضغطة زر، وإشعار فوري لفريق العمل عبر تيليغرام لتجهيز طلبيتك دون تأخير، مع إمكانية العمل حتى بدون إنترنت !",
      },
      onScreenText: "📄 بون PDF فوري | ⚡ تنبيه تيليغرام مباشر | 📶 يعمل بدون نت",
    },
    {
      sceneNum: 5,
      time: '0:48 - 0:58',
      title: "Appel à l'Action / Call To Action (الخاتمة والطلب)",
      visualCue: "Plan final élégant avec les logos Instagram, TikTok, numéro WhatsApp et bouton 'Lien en Bio' scintillant avec les flacons Tulip dorés.",
      screenRecordAction: "Gros plan sur le logo Tulip Fragrance Company et les coordonnées de contact (58 Wilayas).",
      voiceover: {
        darija: "طوّر خدمتك واكسب وقتك مع Tulip Fragrance Company ! كليكي على الرابط في البايو ولا اتصل بينا اليوم وجرب المنصة. التوصيل متوفر لـ 58 ولاية !",
        fr: "Modernisez votre activité de parfumerie dès aujourd'hui ! Cliquez sur le lien dans notre bio pour accéder à la plateforme, ou contactez notre service commercial. Expédition vers les 58 Wilayas !",
        ar: "ارتقِ بتجارتك في عالم العطور مع Tulip Fragrance Company ! اضغط على الرابط في البايو أو اتصل بنا لتجربة المنصة فوراً. التوصيل متوفر لكافة الـ 58 ولاية.",
      },
      onScreenText: "🔗 الرابط في البايو | 🚚 شحن لـ 58 ولاية | 📞 اتصل بنا الآن",
    },
  ];

  const socialCaptions = {
    reels: {
      title: "Texte pour Reel & TikTok (Format Court & Percutant)",
      caption: `🚀 أصحاب محلات وصناع العطور في الجزائر 🇩🇿 ! توديع الفوضى في طلبيات الزيوت والفلاكوناج !

مع تطبيق ومنصة Tulip Fragrance Company الرسمية:
✅ كتالوج حي 24/24 لمواد العطور الأولية (Extraits & Flacons)
✅ أسعار الجملة الرسمية ومخزون فوري دقيق
✅ بون كوموند PDF رسمي وفوري بضغطة زر 📄
✅ تنبيه مباشر عبر روبوت تيليغرام لتجهيز طلبيتك ⚡
✅ يعمل حتى بدون إنترنت ومثبت على هاتفك مباشرة 📲
🚚 توصيل سريع ومضمون لكافة الـ 58 ولاية !

🔗 جرب المنصة الآن: الرابط في البايو
📞 للطلب والاستفسار: ${storeSettings?.phone || '+213 799 93 83 99'}

#tulip_fragrance #parfum_algerie #grossiste_parfum #extrait_de_parfum #flacon_parfum #algerie #dz #parfumerie_algerie #oran #alger #constantine #setif #b2b_algerie`,
    },
    instagram: {
      title: "Texte Post Instagram / Carrousel Détaillé",
      caption: `✨ Découvrez une nouvelle ère pour vos approvisionnements en parfumerie avec TULIP FRAGRANCE COMPANY 🌸

Vous êtes artisan parfumeur, gérant de boutique ou grossiste en Algérie ? Notre plateforme de précommande digitale a été conçue sur-mesure pour votre confort :

1️⃣ 𝗖𝗮𝘁𝗮𝗹𝗼𝗴𝘂𝗲 𝗧𝗲𝗺𝗽𝘀 𝗥𝗲́𝗲𝗹 : Consultez instantanément la disponibilité de nos extraits de parfum purs et flacons premium.
2️⃣ 𝗕𝗼𝗻 𝗱𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝗲 𝗣𝗗𝗙 : Génération immédiate d'un bon officiel détaillé avec code-barres et mentions légales.
3️⃣ 𝗦𝘂𝗶𝘃𝗶 𝗲𝘁 𝗥𝗲́𝗮𝗰𝘁𝗶𝘃𝗶𝘁𝗲́ : Transmission instantanée de votre commande à notre équipe logistique via Telegram.
4️⃣ 𝗔𝗰𝗰𝗲̀𝘀 𝗛𝗼𝗿𝘀-𝗟𝗶𝗴𝗻𝗲 : Préparez vos paniers même en cas de coupure de réseau.

📍 Expédition sécurisée vers les 58 Wilayas d'Algérie.
📲 Accédez dès maintenant à la plateforme via le lien dans notre bio ou contactez-nous directement.

#tulipfragrance #algerieparfum #grossisteparfumdz #parfumeriedz #extraitsdeparfum #flaconnage #algeria #commercealgerie #dzpower #oran #algiers`,
    },
    facebook: {
      title: "Publication Professionnelle Facebook B2B",
      caption: `📢 Chers clients professionnels de la parfumerie et revendeurs à travers les 58 Wilayas d'Algérie,

La société TULIP FRAGRANCE COMPANY a le plaisir de mettre à votre disposition son application web de précommande exclusive.

Fini les listes manuscrites et les incertitudes de stock :
🔹 Visualisez l'ensemble de nos gammes d'extraits concentrés et de flacons haute qualité.
🔹 Bénéficiez de la transparence totale sur les stocks physiques et vos tarifs préférentiels en DA.
🔹 Obtenez immédiatement votre devis ou bon de précommande au format PDF pour votre comptabilité.
🔹 Traitement prioritaire de votre commande grâce à notre système connecté.

👉 Testez la plateforme dès aujourd'hui : [Lien du site]
📞 Service commercial : ${storeSettings?.phone || '+213 799 93 83 99'} / ${storeSettings?.secondaryPhone || '+213 550 00 00 00'}
🏢 Tulip Fragrance Company - Votre partenaire de confiance en matières premières de parfumerie.

#TulipFragrance #MatièresPremièresParfumerie #GrossisteAlgérie #B2BParfumerie #Algérie58Wilayas`,
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-750 text-white rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
              <Film className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Studio Média & Vidéo Réseaux Sociaux
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Kit Marketing Officiel
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Images haute résolution, scripts vidéo scène par scène (Darija/Français/Arabe) et textes prêts à publier.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Fermer le studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('visuals')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'visuals'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Affiches & Visuels Créés</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video-script')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'video-script'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Script Vidéo Scène par Scène</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('captions')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'captions'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>Textes & Hashtags Réseaux</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('advantages')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'advantages'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Fiche Avantages de l'App</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: VISUALS GALLERY */}
          {activeTab === 'visuals' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    3 Formats Visuels Haute Définition Prêts pour vos Réseaux
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Ces images promotionnelles mettent en scène l'application mobile Tulip Fragrance, les matières premières et le flaconnage de luxe. Cliquez sur une image pour l'agrandir ou téléchargez-la directement.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {marketingAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-amber-500/50 transition shadow-lg"
                  >
                    <div
                      className="relative bg-slate-900 cursor-pointer overflow-hidden flex items-center justify-center"
                      style={{
                        aspectRatio: asset.aspectRatio === '9:16' ? '9/14' : asset.aspectRatio === '1:1' ? '1/1' : '16/9',
                      }}
                      onClick={() => setSelectedImage(asset.imageUrl)}
                    >
                      <img
                        src={asset.imageUrl}
                        alt={asset.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-xs">
                        <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5" />
                          Agrandir
                        </span>
                      </div>
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-700 text-[10px] font-bold text-amber-400">
                        {asset.badge}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] text-slate-300 font-mono">
                        {asset.dimensions}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                          {asset.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                          {asset.subtitle}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <a
                          href={asset.imageUrl}
                          download={`tulip_fragrance_${asset.id}.jpg`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Télécharger l'image</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: VIDEO SCRIPT & STORYBOARD */}
          {activeTab === 'video-script' && (
            <div className="space-y-6">
              {/* Language Selector for Video Scripts */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200">
                    Langue de la Voix-Off & du Script :
                  </span>
                </div>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setScriptLang('darija')}
                    className={`px-3 py-1.5 rounded-md font-bold transition cursor-pointer ${
                      scriptLang === 'darija'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇩🇿 الدارجة الجزائرية (Reels / TikTok)
                  </button>
                  <button
                    type="button"
                    onClick={() => setScriptLang('fr')}
                    className={`px-3 py-1.5 rounded-md font-bold transition cursor-pointer ${
                      scriptLang === 'fr'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇫🇷 Français (B2B Pro)
                  </button>
                  <button
                    type="button"
                    onClick={() => setScriptLang('ar')}
                    className={`px-3 py-1.5 rounded-md font-bold transition cursor-pointer ${
                      scriptLang === 'ar'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    العربية الفصحى
                  </button>
                </div>
              </div>

              {/* Video Recording Pro Tips */}
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-200">
                <Camera className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Comment enregistrer cette vidéo en 5 minutes :</span>
                  <p className="text-amber-200/80 mt-1 leading-relaxed">
                    1. Lancez l'enregistrement de l'écran de votre téléphone avec l'application Tulip ouverte.
                    2. Parcourez le catalogue, ajoutez un extrait au panier, puis affichez le Bon de commande PDF.
                    3. Montez les clips sur CapCut, TikTok ou Instagram en lisant le texte de la voix-off ci-dessous.
                  </p>
                </div>
              </div>

              {/* Scene by Scene Timeline */}
              <div className="space-y-4">
                {videoScenes.map((scene) => (
                  <div
                    key={scene.sceneNum}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3 relative hover:border-slate-700 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                          {scene.sceneNum}
                        </span>
                        <h5 className="text-sm font-bold text-white">
                          {scene.title}
                        </h5>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-mono text-amber-400 border border-slate-700">
                        ⏱️ {scene.time}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Visual & Camera Direction */}
                      <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                        <div className="text-slate-400 font-bold flex items-center gap-1.5 text-[11px]">
                          <Camera className="w-3.5 h-3.5 text-sky-400" />
                          <span>Mise en scène visuelle :</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {scene.visualCue}
                        </p>
                        <div className="text-slate-400 font-bold flex items-center gap-1.5 text-[11px] pt-1">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Action d'écran à enregistrer :</span>
                        </div>
                        <p className="text-emerald-300/90 text-[11px] leading-relaxed">
                          {scene.screenRecordAction}
                        </p>
                      </div>

                      {/* Voiceover Script */}
                      <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="text-slate-400 font-bold flex items-center justify-between text-[11px]">
                            <span className="text-amber-400 flex items-center gap-1.5">
                              🎙️ Voix-off à enregistrer :
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(scene.voiceover[scriptLang], `scene-${scene.sceneNum}`)}
                              className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] cursor-pointer"
                            >
                              {copiedKey === `scene-${scene.sceneNum}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copié</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copier</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p
                            className="text-white text-xs sm:text-sm mt-1.5 leading-relaxed font-medium bg-slate-950/80 p-2.5 rounded-lg border border-slate-800"
                            dir={scriptLang === 'darija' || scriptLang === 'ar' ? 'rtl' : 'ltr'}
                          >
                            "{scene.voiceover[scriptLang]}"
                          </p>
                        </div>

                        <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
                          <span className="font-bold text-slate-300">Texte à l'écran :</span>
                          <span className="text-amber-300 font-semibold">{scene.onScreenText}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: READY-TO-POST CAPTIONS */}
          {activeTab === 'captions' && (
            <div className="space-y-6">
              <div className="text-xs text-slate-400">
                Copiez ces légendes pré-rédigées optimisées pour le référencement et l'engagement des professionnels du parfum en Algérie.
              </div>

              {Object.entries(socialCaptions).map(([key, item]) => (
                <div key={key} className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <Hash className="w-4 h-4 text-amber-400" />
                      {item.title}
                    </h5>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.caption, `cap-${key}`)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      {copiedKey === `cap-${key}` ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copié dans le presse-papier !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier le texte</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 leading-relaxed max-h-48 overflow-y-auto">
                    {item.caption}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: APP ADVANTAGES CHEATSHEET */}
          {activeTab === 'advantages' && (
            <div className="space-y-6">
              <div className="text-xs text-slate-400">
                Voici les 6 piliers différenciateurs de l'application Tulip Fragrance à mettre en avant dans toutes vos communications :
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advantagesList.map((adv, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start gap-3.5 hover:border-slate-700 transition"
                  >
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-750 shrink-0">
                      {adv.icon}
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs sm:text-sm font-bold text-white">
                        {adv.title}
                      </h5>
                      <p className="text-[11px] text-amber-400 font-medium" dir="rtl">
                        {adv.titleAr}
                      </p>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {adv.desc}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-relaxed" dir="rtl">
                        {adv.descAr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <TulipLogo variant="horizontal" size="sm" />
            <span className="text-slate-500">• Kit promotionnel prêt à l'emploi</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Image Fullscreen Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md cursor-pointer animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Aperçu Grand Format"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-slate-800"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
