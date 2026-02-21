// lib/chatbot/knowledge.ts

export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  followUp?: string;
}

export const chatbotKnowledge: KnowledgeEntry[] = [
  {
    keywords: ["merhaba", "selam", "hey", "naber", "sa"],
    response:
      "Hey! 👋 Pavlov Gaming Hub'a hoş geldin! Ben PavBot, senin dijital oyun arkadaşınım. Sana oyunlar, hesabın veya topluluk hakkında yardımcı olabilirim. Ne sormak istersin?",
  },
  {
    keywords: ["pavroyale", "pav royale", "royale", "battle royale"],
    response:
      "🎮 PavRoyale, Pavlov'un amiral gemisi battle royale oyunu! 100 oyuncu tek haritada, son kalan kazanır. Sıralama tablosunda dünya çapında rekabet edebilirsin. /games/pavroyale sayfasından detaylara bakabilirsin!",
    followUp: "Liderlik tablosundaki sıranı merak ediyor musun?",
  },
  {
    keywords: ["pavometry", "geometry", "geometri", "puzzle", "bulmaca"],
    response:
      "🔺 Pavometry, geometri tabanlı bir ritim-aksiyon oyunu! Müzikle senkronize engelleri aş, reflekslerini test et. Her level daha zorlu. /games/pavometry sayfasından oynayabilirsin!",
  },
  {
    keywords: ["kayıt", "üye", "hesap", "register", "signup", "kaydol"],
    response:
      "📝 Kayıt olmak çok kolay! Sağ üstteki 'Giriş Yap' butonuna tıkla, Google veya Discord hesabınla saniyeler içinde kaydol. Hesap oluşturduktan sonra skorlarını kaydedebilir ve liderlik tablosunda yer alabilirsin!",
  },
  {
    keywords: ["giriş", "login", "oturum"],
    response:
      "🔐 Giriş yapmak için sağ üstteki butona tıkla. Google veya Discord ile hızlı giriş yapabilirsin. Sorun yaşıyorsan tarayıcı çerezlerini kontrol et!",
  },
  {
    keywords: ["şifre", "parola", "unuttum", "forgot", "password", "sifre"],
    response:
      "🔑 Google veya Discord ile giriş yapıyorsan ayrı bir şifreye ihtiyacın yok! Eğer bu hesaplara erişemiyorsan, doğrudan Google veya Discord'un şifre sıfırlama özelliklerini kullan.",
  },
  {
    keywords: ["skor", "puan", "score", "kaydet"],
    response:
      "🏆 Skorların otomatik olarak kaydedilir — tek şart giriş yapmış olman! Her oyunda en yüksek skorun liderlik tablosunda görünür. Skorlar sunucu tarafında doğrulanır, hile mümkün değil 😉",
  },
  {
    keywords: ["liderlik", "leaderboard", "sıralama", "ranking", "tablo"],
    response:
      "📊 Liderlik tablosu gerçek zamanlı güncellenir! Her oyunun kendi tablosu var. Oyun sayfasına git ve 'Liderlik Tablosu' bölümüne bak. İlk 3'e girersen özel rozet kazanırsın!",
  },
  {
    keywords: ["youtube", "video", "kanal", "yayın", "stream"],
    response:
      "📺 @ytpavlov kanalındaki son videolara ana sayfadan ulaşabilirsin! Oyun geliştirme günlükleri, turnuva highlights ve daha fazlası. Abone olmayı unutma! 🔔",
  },
  {
    keywords: ["discord", "topluluk", "community", "sunucu"],
    response:
      "💬 Pavlov topluluğu Discord'da çok aktif! Turnuvalar, etkinlikler ve sohbet için Discord sunucumuza katıl. Giriş yaptığında profil sayfandan Discord'unu bağlayabilirsin.",
  },
  {
    keywords: ["bug", "hata", "sorun", "çalışmıyor", "problem"],
    response:
      "🐛 Bir hata mı buldun? Bu çok değerli! Lütfen hatayı Discord sunucumuzda #bug-report kanalında bildir. Ekran görüntüsü eklersen çok daha hızlı çözebiliriz!",
  },
  {
    keywords: ["teşekkür", "sağol", "eyw", "thx", "thanks"],
    response:
      "😊 Ne demek, her zaman buradayım! Başka bir sorun olursa çekinme. İyi oyunlar! GG 🎮",
  },
  {
    keywords: ["kim", "sen", "bot", "yapay zeka", "ai"],
    response:
      "🤖 Ben PavBot! Pavlov Gaming Hub'ın yapay zeka destekli asistanıyım. 7/24 buradayım. Oyunlar, hesabın veya site hakkında her şeyi sorabilesin. Ama FPS'lerde hâlâ senden iyiyim 😏",
  },
];

export const defaultResponse =
  "🤔 Hmm, bunu tam anlayamadım. Şunları sorabilirsin:\n\n• Oyunlar hakkında (PavRoyale, Pavometry)\n• Hesap ve giriş işlemleri\n• Skor ve liderlik tablosu\n• YouTube kanalı\n• Topluluk ve Discord\n\nVeya farklı kelimelerle tekrar dene!";

export const greetings = [
  "Hey oyuncu! 🎮",
  "Hoş geldin! 👋",
  "Selam, hazır mısın? 🚀",
];

export function findResponse(message: string): string {
  const normalizedMessage = message.toLowerCase().trim();

  for (const entry of chatbotKnowledge) {
    const match = entry.keywords.some((keyword) =>
      normalizedMessage.includes(keyword.toLowerCase())
    );
    if (match) {
      return entry.followUp
        ? `${entry.response}\n\n${entry.followUp}`
        : entry.response;
    }
  }

  return defaultResponse;
}