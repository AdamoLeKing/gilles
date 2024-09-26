require('dotenv').config();
const { Client, GatewayIntentBits, Partials, time } = require('discord.js');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const insults = [
	"Un petit pénis, c'est comme un handicap, alors je ne vais pas me moquer de toi.",
	"Après la fin complète du Covid, s'il te plaît continue à porter ton masque pour que je n'aie pas à te regarder !",
	"D'accord, d'accord, je vais avouer... j'avoue que tu es encore plus idiot que je ne le pensais.",
	"En tant qu'observateur extérieur, que penses-tu de la race humaine ?",
	"Au moins Hitler s'est suicidé.",
	"Il y a au moins une bonne chose à propos de ton corps : il n'est pas aussi laid que ton visage.",
	"Au moins, quand je fais le poirier, mon ventre ne me frappe pas au visage.",
	"Oh, c'est tellement mignon quand tu essaies de parler de choses que tu ne comprends pas.",
	"La beauté n'est qu'en surface, mais la laideur va jusqu'aux os.",
	"Être un connard avec tout le monde ne rendra pas le tien plus grand.",
	"Derrière chaque personne grosse, il y a une belle personne. Non, sérieusement, tu es dans le chemin.",
	"Le cerveau n'est pas tout. Dans ton cas, il n'est rien.",
	"T'appeler idiot serait une insulte à tous les gens stupides.",
	"Attention à ne pas t'étouffer avec ta stupidité.",
	"Est-ce que Dieu t'a conçu à partir des restes d'une poubelle ?",
	"As-tu oublié de te brosser les dents ? Ton haleine pue !",
	"Fais un grand service à tes gardiens : fais un triple saut périlleux et disparais dans ton propre trou du cul.",
	"N'aie pas honte de qui tu es. C'est le travail de tes parents.",
	"Ne sois pas triste, ne sois pas bleu, Frankenstein était moche aussi.",
	"Tu n'as pas un sentiment terriblement vide - dans ton crâne ?",
	"Il ne te faut pas un permis pour être aussi laid ?",
	"La Terre est pleine ! Rentre chez toi !",
	"Mange de la merde et vis !",
	"Même parmi les idiots, tu es en dessous.",
	"Même la douche ne veut pas te voir.",
	"Tout le monde a droit d'être stupide, mais toi tu abuses du privilège.",
	"Tout ce qui sort de ta bouche est un mensonge, tout ce qui y entre est de la merde.",
	"Cheveux faux, ongles faux, sourire faux. Es-tu sûr de ne pas avoir été fabriqué en Chine ?",
	"Saleté ! Ordure ! Un sous-produit de la salissure et de la vilenie !",
	"Va te faire foutre, tu es moche.",
	"Petit truc marrant, ton cerveau ! Comment tu fais pour te déplacer avec ça ?",
	"Gay ? Je suis plus droit que la barre sur laquelle ta mère danse.",
	"Va te cacher sous quelque chose de vieux !",
	"Va-t'en ! Je regardais quelque chose de mieux que toi !",
	"Va polir tes crocs.",
	"Dieu t'a fait comme un exemple de ce qu'il ne faut pas faire.",
	"Belle histoire, mais dans quel chapitre tu fermes ta gueule ?",
	"Prends une paille, parce que tu suces !",
	"Attends, j'essaie encore de décider si je m'en fous ou si je m'en tape !",
	"Hé, accident de train ! Ce n'est pas ta station !",
	"Hé, tu as quelque chose sur ton menton. Non, le 3ème plus bas.",
	"Et si tu te perdais dans l'océan ?",
	"Comment es-tu arrivé ici ? Quelqu'un a oublié de fermer ta cage ?",
	"Combien de rides a un trou du cul ? Souris ! Je vais les compter !",
	"Quel âge as-tu ? - Attends, je ne devrais pas demander, tu ne peux pas compter aussi haut.",
	"Je parie que tu portes un anneau au nez parce que personne ne veut t'en mettre un au doigt.",
	"Je parie que ton cerveau est comme neuf, vu que tu ne l'as jamais utilisé.",
	"Je parie que tu es \"cette pétasse de base\" qui applaudit quand l'avion atterrit !",
	"Je crache sur tes boutons et appelle ta demande d'ouverture de porte une chose idiote, toi, petit cerveau essuyeur de fesses d'autres personnes !",
	"Je ne peux m'empêcher d'imaginer à quel point le monde serait génial si ton père s'était juste retiré.",
	"Je pourrais manger un bol de soupe de lettres et chier une phrase plus intelligente que ce que tu viens de dire.",
	"Je pourrais descendre à ton niveau, mais je n'aime pas être à genoux autant que toi !",
	"Je souhaite que nous soyons de meilleurs étrangers.",
	"Je ne me bats pas mentalement avec les non-armés.",
	"Je ne te déteste pas exactement, mais si tu étais en feu et que j'avais de l'eau, je la boirais.",
	"Je ne sais pas quel est ton problème, mais je parie qu'il est difficile à prononcer.",
	"Je ne veux plus te parler, toi, mangeoire à animaux vide de tête ! Je pète dans ta direction générale ! Ta mère était un hamster et ton père sentait le sureau !",
	"J'ai échoué à un test d'orthographe parce qu'ils m'ont demandé comment épeler 'pétasse' et j'ai écrit ton nom.",
	"Je suppose que tu prouves que même Dieu fait parfois des erreurs.",
	"Je ne t'ai pas vu courir aussi vite depuis que les Twinkies sont en promotion !",
	"J'ai entendu dire que quand tu étais enfant, ta mère voulait engager quelqu'un pour s'occuper de toi, mais la mafia demandait trop.",
	"J'ai entendu dire que tu as reçu une greffe de cerveau, mais elle a rejeté ton corps.",
	"J'ai entendu dire que tu es allé dans une maison hantée et qu'ils t'ont offert un emploi.",
	"J'ai entendu dire que tes parents t'ont emmené à un concours canin et que tu as gagné.",
	"J'espère qu'un jour tu t'étoufferas avec la merde que tu racontes !",
	"J'espère que tu marcheras sur des Lego.",
	"J'espère que ta prochaine pipe sera donnée par un requin !",
	"J'espère que tes prochaines règles auront lieu dans un bassin de requins !",
	"Je n'encourage en aucun cas la violence... mais parfois, une gifle vaut mille mots.",
	"Je viens de marcher sur quelque chose de plus intelligent que toi et qui sentait meilleur aussi.",
	"Je sais que tu n'es pas aussi stupide que tu en as l'air. Personne ne pourrait l'être !",
	"J'adore ce que tu as fait avec tes cheveux. Comment tu fais pour les faire sortir de tes narines comme ça ?",
	"Je vois que tu étais tellement impressionné par ton premier menton que tu en as ajouté deux autres.",
	"Je mets la barre assez bas, donc je ne suis jamais déçu.",
	"Je pense que c'est la saison des amours au zoo, alors retourne auprès des orangs-outans et marie-toi !",
	"J'ai pensé à toi aujourd'hui. Ça m'a rappelé de sortir les poubelles.",
	"Je vomis quand je te regarde !",
	"J'étais pour la vie. Puis je t'ai rencontré.",
	"Je me suis rendu compte aujourd'hui que je ne t'aimais pas.",
	"Je ne suis pas né avec assez de doigts d'honneur pour te faire comprendre ce que je ressens pour toi.",
	"J'aurais aimé me brûler les yeux avant de voir ton visage !",
	"Je te demanderais bien ton âge, mais je sais que tu ne peux pas compter aussi haut.",
	"Je te brûlerais bien, mais brûler les déchets est mauvais pour l'environnement.",
	"Je ne sortirais jamais avec toi. Je suis seul, pas désespéré.",
	"Je te giflerais bien, mais la merde éclabousse !",
	"Je ne te donnerais même pas la vapeur de ma merde.",
	"Je serais d'accord avec toi, mais alors nous aurions tous les deux tort.",
	"Je te lancerais un regard méchant mais tu en as déjà un.",
	"Je te donnerais bien un coup de pied dans les dents, mais pourquoi améliorer ton apparence ?",
	"J'aimerais bien voir les choses de ton point de vue mais je n'arrive pas à mettre ma tête aussi loin dans mon cul.",
	"Je t'offrirais bien un chewing-gum mais ton sourire en a déjà beaucoup.",
	"Je préférerais un duel d'intelligence, mais tu sembles désarmé.",
	"Je dirais que tu es drôle, mais l'apparence ne fait pas tout.",
	"Je te giflerais bien, mais ce serait de la maltraitance animale.",
	"Je te dirais bien d'aller te faire foutre, mais ce serait une punition cruelle et inhabituelle.",
	"Je te dirais bien d'aller en enfer, mais j'y travaille et je ne veux pas te voir tous les jours.",
	"Si les trous du cul pouvaient voler, cet endroit serait un aéroport !",
	"Si les cerveaux étaient de l'or, tu serais un mendiant !",
	"Si les idiots pouvaient voler, tu serais une fusée !",
  "Quelque part, il y a un arbre qui travaille très dur pour remplacer l'oxygène que tu consommes. Va t'excuser auprès de lui !",
  "Quelque part, d'une manière ou d'une autre, tu voles un idiot à un village.",
  "Désolé, je n'ai pas compris, je ne parle pas idiot.",
  "Désolé, je ne t'entends pas à cause de combien tu es agaçant.",
  "La stupidité n'est pas un crime, donc tu es libre de partir.",
  "Bien sûr, j'ai déjà vu des gens comme toi - mais j'ai dû payer une entrée.",
  "Va sucer la queue du diable en enfer !",
  "Dis à ta mère de préparer des macaronis au fromage, je serai bientôt à la maison.",
  "Les années 80 ont appelé, ils veulent récupérer ta coupe de cheveux.",
  "Les vêtements que tu portes sont si laids que même un épouvantail ne les porterait pas.",
  "La dernière fois que j'ai vu un visage comme le tien, je lui ai donné une banane.",
  "La dernière fois que j'ai vu quelque chose comme toi, je l'ai tiré la chasse !",
  "Le prochain mot qui sortira de ta bouche ferait bien d'être du génie de Mark Twain parce que tout le reste a sucé plus fort que mon aspirateur !",
  "Le seul accessoire qui pourrait sauver ta tenue est une cape d'invisibilité !",
  "La seule chose positive chez toi, c'est ton statut VIH.",
  "La seule raison pour laquelle ton partenaire t'aime, c'est parce qu'il a appris à apprécier les petites choses de la vie.",
  "La seule chose qui devient érigée quand je suis près de toi, c'est mon majeur.",
  "Le zoo a appelé. Ils se demandent comment tu es sorti de ta cage.",
  "On dit que les gens obtiennent ce qu'ils méritent. Dans ton cas, c'est un trophée de participation.",
  "Tu es aussi gras que du beurre !",
  "Tête de con !",
  "Scintille, scintille petite étoile, je veux te frapper avec ma voiture, te jeter d'une falaise si haute, j'espère que tu te casses le cou et que tu meurs.",
  "Scintille, scintille petite étoile, tu es la chose la plus dégoûtante que j'ai vue !",
  "Scintille, scintille petite étoile, tu es le plus moche que j'ai vu jusqu'ici !",
  "Scintille, scintille petite pute, ferme tes jambes, ce ne sont pas des portes.",
  "Deux torts ne font pas un droit, prends tes parents comme exemple.",
  "U. G. L. Y. Tu n'as pas d'alibi, tu es moche ! Eh ! Hé ! Tu es moche !",
  "Tête de trou de nez de Voldemort...",
  "Est-ce qu'un de tes parents est un rat-taupe nu ? Tu es moche comme tout !",
  "Nous descendons tous des singes, mais toi, tu n'es pas descendu assez loin.",
  "Ce qui ne te tue pas, me déçoit...",
  "Mais qu'est-ce que tu es, espèce de grande tête de gland nouille, connard graisseux. Va te faire foutre.",
  "Quelle est la différence entre toi et un œuf ? Les œufs, eux, se font éclore !",
  "Quand je vois ton visage, il n'y a rien que je changerais... sauf la direction dans laquelle je marche.",
  "Quand l'armée de l'air a besoin de plus d'espace pour atterrir, ils devraient juste louer ton front.",
  "Quand tu te regardes dans le miroir, dis bonjour au clown que tu y vois pour moi, veux-tu ?",
  "Quand tu es né, ta mère t'a jeté par la fenêtre, et la fenêtre t'a rejeté.",
  "Quand tu es né, le médecin est sorti dans la salle d'attente et a dit à ton père : « Je suis désolé. Nous avons fait tout ce que nous pouvions. Mais il a survécu. »",
  "Quand tu es né, la police a arrêté ton père, les médecins ont giflé ta mère, le contrôle des animaux a euthanasié ton frère, et la chaîne A&E a fait un documentaire qui a sauvé ta vie.",
  "Quand tu es né, la police a dit que tu étais une merde. Ils t'ont tiré dessus.",
  "Qui a allumé la mèche de ton tampon ?",
  "Pourquoi tu ne vérifies pas sur eBay s'ils vendent une vie ?",
  "Pourquoi est-il acceptable pour toi d'être un idiot, mais pas pour moi de le signaler ?",
  "Essuie-toi la bouche, il y a encore un peu de conneries autour de tes lèvres.",
  "Avec un visage comme le tien, j'aimerais être aveugle !",
  "Ta mère a une tête chauve et collectionne des stickers de foot !",
  "Tu es une insulte à une insulte d'un ramassis d'idioties.",
  "Tu es comme un nuage. Quand tu disparais, c'est une belle journée.",
  "Tu es la preuve vivante que le fumier peut pousser des jambes et marcher.",
  "Tu es la version humaine des crampes menstruelles.",
  "Tu apportes tellement de joie à tout le monde... quand tu quittes la pièce.",
  "Tu économises du papier toilette en utilisant les deux côtés.",
  "Tu es dense, irritant, et une bête miniature de fardeau !",
  "Tu réalises que le maquillage ne va pas réparer ta stupidité ?",
  "Tu es un cafard immonde, méprisable et malfaisant !",
  "Tu as deux neurones et ils se battent pour la troisième place.",
  "Tu as la diarrhée de la bouche ; et la constipation des idées.",
  "Tu as le charisme d'une serviette humide.",
  "Tu as le charme d'une batterie déchargée.",
  "Tu as un visage qui fait que les gens parlent de ta personnalité.",
  "Tu as la mémoire d'un poisson rouge, sauf qu'elle est encore moins utile.",
  "Tu as le visage parfait pour la radio.",
  "Tu as la subtilité d'une brique et la profondeur d'un verre à shot !",
  "Tu es un exemple classique du rapport inverse entre la taille de la bouche et celle du cerveau.",
  "Tu ressembles à une photo avant traitement.",
  "On dirait qu'une pierre s'est brisée en sable, a roulé dans un joint, et a été fumée avec un inhalateur d'asthme.",
  "Tu ressembles à l'image après une campagne anti-méthamphétamines.",
  "On dirait le résultat du mode aléatoire dans un jeu de création de personnage.",
  "Tu peux ressembler à un idiot et parler comme un idiot, mais ne te trompe pas, tu es vraiment un idiot.",
  "Tu as dû naître sur une autoroute parce que c'est là que la plupart des accidents arrivent.",
  "Tu ne m'agaces que quand tu respires.",
  "Tu préfères faire trois virages à gauche plutôt qu'un à droite.",
  "Tu me fais penser à une pièce de monnaie. Tu es hypocrite et sans valeur.",
  "Tu devrais présenter ta lèvre supérieure à ta lèvre inférieure, et fermer ta gueule !",
  "Tu devrais utiliser de la colle forte à la place d'un baume à lèvres !",
  "Tu devrais porter une muselière. Sans raison.",
  "Tu ne devrais pas jouer à cache-cache, personne ne te chercherait.",
  "Tu fixes des boîtes de jus congelé parce qu'il est écrit « concentre-toi » dessus.",
  "Tu marches derrière ton patron en lui tenant les testicules.",
  "Tu étais tellement laid à la naissance que le médecin a mis des vitres teintées sur ton incubateur.",
  "Tu serais suicidaire si tu te sentais aussi mal que tu en as l'air.",
  "Tu ne seras jamais l'homme que ta mère est.",
  "Tes conseils sont aussi utiles qu'un abri anti-bombes en papier mâché.",
  "Ton certificat de naissance est une lettre d'excuse de l'usine de préservatifs.",
  "Ta graisse est aussi bien répartie que la richesse dans l'économie américaine.",
  "Ton cerveau est tellement petit que si un cannibale affamé te cassait le crâne, il n'y aurait pas assez pour tartiner un petit biscuit.",
  "Ton visage pourrait faire peur à une toilette.",
  "Ton visage ressemble à quelque chose que je dessinerais avec ma main non dominante.",
  "Ton visage fait pleurer les oignons.",
  "Ton arbre généalogique doit être un cactus car tous les membres sont des piquants.",
  "Ton crâne ressemble à un préservatif cassé.",
  "Ton intelligence est comme un trou noir, elle n'existe pas.",
  "Ton QI est plus bas que la fosse des Mariannes.",
  "Ton QI est à peu près aussi élevé que la température ambiante.",
  "Tes blagues sont comme ta personnalité, sèches et sans substance.",
  "Tes lèvres bougent mais je ne parle pas le langage des idiots.",
  "Ta mère n'a pas souri depuis l'accident de voiture. Parce que toi, tu as survécu.",
  "Ton argument est comme un crayon sans pointe, inutile.",
  "Le retard dans ta voix est à la hauteur de celui de ton cerveau."  
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on("ready", async () => {
  const channelId = '1239582352821452863';
  const guildId = '1239582352338849833';

  const channel = client.channels.cache.get(channelId);
  if (!channel) {
      console.error('Canal non trouvé !');
      return;
  }

  const guild = client.guilds.cache.get(guildId);
  const users = [];
  let res = await guild.members.fetch();
  res.forEach((member) => {
    if (!member.user.bot) {
      users.push(member.user)
    }
  });

  const sendMessageWithRandomInterval = () => {
    const randomInterval = getRandomInt(5, 10);
    const target = users[Math.floor(Math.random() * users.length)];
    const maintenant = new Date();
    const jourDeLaSemaine = maintenant.getDay();
    const heureActuelle = maintenant.getHours();

    if (jourDeLaSemaine >= 1 && jourDeLaSemaine <= 5 && heureActuelle >= 9 && heureActuelle < 17) {
      const message = insults[Math.floor(Math.random() * insults.length)];
      channel.send(`${target.toString()} ${message}`);
    }

    setTimeout(sendMessageWithRandomInterval, randomInterval*1000);
  };

  sendMessageWithRandomInterval();
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN);

