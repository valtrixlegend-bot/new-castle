# Newcastle School — demo

O'quv markazini boshqarish tizimining yig'ilgan React interfeysi va Node.js demo serveri. Arxivda frontendning dastlabki manba kodi emas, faqat yig'ilgan/minifikatsiya qilingan fayllari bor. Shu sababli interfeysni ishonchli tarzda rivojlantirish va to'liq testlash uchun asl manba kod kerak.

## Ishga tushirish

Node.js 18+ talab qilinadi, qo'shimcha paketlar kerak emas:

```sh
cd newcastle-local # repository ildizidan
npm start
# http://127.0.0.1:3000
```

Demo hisoblar: [demo-accounts.md](demo-accounts.md). Server to'xtashi: Ctrl+C. `PORT=8080 npm start` orqali portni o'zgartirish mumkin. Server standart holatda faqat lokal interfeysga ulanadi. `HOST=0.0.0.0` bilan tarmoqqa chiqarish xavfli: istalgan foydalanuvchi bazani o'qishi va o'zgartirishi mumkin.

Ma'lumot birinchi ishga tushishda `data/demo-data.json` dan `data/db.json` ga ko'chiriladi. Demo bazani tiklash uchun serverni to'xtatib, **faqat test ma'lumotlarini yo'qotishga rozi bo'lsangiz**, `data/db.json` ni o'chiring va qayta ishga tushiring. `DATA_DIR` bilan saqlash papkasini o'zgartirish mumkin.

## Mavjud imkoniyatlar

Interfeysda admin, yordamchi admin, o'qituvchi, o'quvchi va ota-ona rollari; guruhlar, davomat, vazifalar, baholar, to'lovlar, do'kon, support va chat uchun ekranlar mavjud. Bularning barchasi real ish jarayonida qo'lda yoki end-to-end testdan o'tkazilgan deb kafolatlanmaydi.

## Muhim: ishlab chiqarishga tayyor emas

- `/api/db` butun bazani, jumladan parol va shaxsiy ma'lumotlarni autentifikatsiyasiz qaytaradi va to'liq almashtirishga imkon beradi. Frontenddagi rol yoki login server himoyasi emas. Haqiqiy ma'lumotlarni kiritmang va ommaviy joylashtirmang.
- Butun bazani bitta JSON sifatida saqlash bir vaqtda ishlovchilarning o'zgarishlarini yo'qotishi mumkin. Zaxiralash va tiklash jarayoni ham yo'q.
- Xavfsiz server autentifikatsiyasi, parollarni xeshlash, har bir rol va yozuv bo'yicha serverda ruxsat tekshiruvi, ma'lumotlar migratsiyasi, zaxiralar va monitoring zarur. Fayllar va to'lovlarni xavfsiz boshqarish, audit jurnali va avtomatlashtirilgan interfeys/integratsiya testlari ham qo'shilishi kerak.
- Agar eski arxivdagi Supabase Edge Function avval joylashtirilgan bo'lsa, uni Supabase'da alohida o'chirish yoki himoyalash kerak; ushbu kod o'zgarishi mavjud deploymentni o'zgartirmaydi. Oldin oshkor bo'lgan haqiqiy ma'lumotlar yoki kalitlarni tekshiring va zarur bo'lsa almashtiring.

## Tekshirish

```sh
npm run check
npm test
```

Testlar Node serveri va mock qilingan Vercel/Supabase API xatti-harakatlarini tekshiradi; real Supabase, brauzer va barcha biznes jarayonlarini tekshirmaydi.

## Vercel va GitHub Pages

Vercel'dagi eski, himoyasiz `/api/db` standart holatda o'chirilgan. Faqat vaqtinchalik, haqiqiy ma'lumotsiz demo uchun `ENABLE_INSECURE_DEMO_API=true`, `SUPABASE_URL` va server tomonidagi `SUPABASE_SECRET_KEY` sozlanishi mumkin. Bu himoya emas: API internetdagi hammaga ochiq bo'ladi. Birinchi so'rov demo bazani Supabase'ga yuklaydi. Vercel va lokal server so'rov hajmi chegaralari turlicha (mos ravishda 4 MB va 25 MB; platformaning o'z chegaralari ham qo'llanadi).

`npm run build:pages` statik fayllarni `../docs` ga ko'chiradi. GitHub Pages backend emas; eski begona Supabase manziliga avtomatik ulanish olib tashlandi. Shuning uchun Pages nusxasi yakka holda ishlaydigan baza ta'minlamaydi. Ishlab chiqarish uchun avval xavfsiz API ishlab chiqilishi zarur.

## 12 o'quvchi bilan yopiq sinov

Yangi markaz uchun alohida bo'sh sinov bazasi va yo'riqnoma: [SINOV.md](SINOV.md). Undagi oldindan yaratilgan taxallusli hisoblar o'z-o'zidan ro'yxatdan o'tish imkoniyati emas. Faqat ishonchli yopiq tarmoq va soxta ma'lumotlar uchun.

## Matn tarjimasi

Matnli uy vazifasidagi matnni belgilang. Tarjima oynasidagi `EN → UZ ⇄` tugmasi orqali yo'nalishni o'zgartirish mumkin. Mobil qurilmalarda matnni uzoq bosib belgilang. Matn tashqi MyMemory xizmatiga yuboriladi — maxfiy yoki shaxsiy ma'lumotlarni tanlamang. Internet va xizmatning ishlashi zarur; xizmat cheklovi tufayli katta matnni bo'laklab tanlang. Tarjima boshqa ekranlardagi barcha matnlarga tatbiq etilmagan.

### Vaqtinchalik 48 soatlik internet demo

GitHub Pages uchun `config.js` izolyatsiyalangan Supabase `newcastle-48h-demo` Edge Function manziliga ulanadi. Demo API 2026-11-14 15:43 UTC da o'qish va yozishni to'xtatadi; statik sayt va demo ma'lumotlari o'z-o'zidan o'chirilmaydi. Muddatdan so'ng Supabase'dagi shu funksiya va `newcastle_48h_demo` jadvalini alohida olib tashlash kerak. Baza internetga ochiq, faqat soxta ma'lumotlardan foydalaning; haqiqiy parollarni, o'quvchi ma'lumotlari yoki to'lovlarni kiritmang. Bir vaqtdagi yozuvlar bir-birini bosib ketishi mumkin.
