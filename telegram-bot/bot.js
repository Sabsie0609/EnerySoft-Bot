const { Telegraf } = require("telegraf");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./firebase-service.json");

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const bot = new Telegraf("YOUR_TELEGRAM_BOT_TOKEN");

bot.start(async (ctx) => {
  const id = ctx.from.id;
  const ref = ctx.startPayload; // for referral tracking
  await db.collection("users").doc(`${id}`).set({
    id,
    username: ctx.from.username,
    points: 0,
    referrer: ref || null,
  });
  ctx.reply("👋 Welcome to EnerySoft Bot! Earn points and rewards by watching, sharing and referring.");
});

bot.command("balance", async (ctx) => {
  const doc = await db.collection("users").doc(`${ctx.from.id}`).get();
  ctx.reply(`💰 Your balance: ${doc.data().points || 0} points`);
});

bot.launch();

