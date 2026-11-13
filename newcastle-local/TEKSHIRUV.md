# Sinov natijalari

Sinovlar mahalliy, alohida demo bazada o'tkazilgan. Internetdagi bazaga sinov ma'lumotlari yozilmagan.

## Brauzerda tekshirilgan yo'llar

- Admin, o'qituvchi, o'quvchi, ota-ona va yordamchi admin bilan kirish; asosiy bo'limlarni ochish.
- Admin: hisob yaratish, qidirish, rol filtrlari, guruh yaratish va o'qituvchi/o'quvchini bog'lash, bo'sh guruh nomi validatsiyasi.
- O'qituvchi davomat saqlashi va o'quvchi shu davomatni ko'rishi.
- O'qituvchi matnli vazifa berishi, o'quvchi yuborishi, ustoz tekshirib coin berishi.
- O'quvchi xabar yuborishi va yordamchi admin javob berishi; xabar bildirishnomalari admin va yordamchiga tushishi.
- O'quvchi coin bilan mahsulot olishi; support vaqtini ochish, so'rov yuborish va ustoz qabul qilishi.
- Ota-ona farzandlar o'rtasida o'tishi va to'lov so'rovi yuborishi; admin uni tasdiqlashi. Bu haqiqiy pul o'tkazmasi emas.
- Mobil ko'rinish, tema almashtirish va vazifa matnini tanlab tarjima oynasini ochish/yopish (tarjima javobi brauzer sinovida mock qilingan).

## Avtomatlashtirilgan testlar

`npm run check` va `npm test` — 31 ta test o'tdi. Netlify va tarjima integratsiyalarida tarmoq javoblari mock qilingan.

## Cheklovlar

- Har bir tugma, kombinatsiya va fayl yuklash holati to'liq tekshirilmagan; bu ro'yxat to'liq qamrov yoki xatosizlik kafolati emas.
- MyMemory xizmatiga real so'rov yuborildi: `good morning` uchun to'g'ri javob keldi, `salom` uchun esa noto'g'ri javob qaytdi. Xizmat sifati va mavjudligi kafolatlanmaydi.
- Butun JSON bazani har saqlashda almashtirish sababli bir vaqtdagi foydalanuvchilar o'zgarishlari yo'qolishi mumkin; server tomonidagi autentifikatsiya va huquqlar mavjud emas.
- Telegram xabarlari ulanmagan; Netlify'ga real deployment va real Netlify server funksiyalari tekshirilmagan.
- Demo bazasining amal muddati 2026-11-14 15:43 UTC gacha. Shundan so'ng o'qish/yozish ishlamaydi.

## Qo'shimcha tekshiruv

- O'qituvchi faylli, rasmli va besh savolli test vazifasini yaratdi; o'quvchi fayl va rasm yubordi va testni to'ldirdi. Test 100% deb saqlandi.
- Bo'sh sarlavha va 800 KB dan katta fayl validatsiyasi tekshirildi.
- Admin sinov hisobini tahrirladi va o'chirdi; band login rad qilindi.
- O'quvchi support so'rovini bekor qildi, keyingi so'rovni ustoz rad etdi; vaqt qayta ochildi.
- Inglizcha rejim alohida tekshirildi: asosiy navigatsiya tarjima qilinadi, lekin hisob yaratish oynasi o'zbekcha qolmoqda. Butun interfeys tarjimasi hali tugallanmagan.
- Ba'zi ikonka tugmalarida matnli accessibility yorliqlari yo'q. Har bir ekran, tugma va barcha kombinatsiyalar hali qamrab olinmagan.
- Sinovda ustozni o'chirish uning guruhi va vazifalarini egasiz qoldirishi aniqlandi. Bog'langan guruh yoki dars yozuvlari mavjud ustoz hisobini o'chirishga qarshi himoya qo'shildi va brauzerda tekshirildi. Bu himoya mavjud eski yetim yozuvlarni avtomatik tiklamaydi.
- Qo'shimcha: admin do'konda sinov mahsuloti nomi va narxini tahrirlab saqladi, so'ng o'chirdi; ikkala o'zgarish alohida mahalliy bazada tekshirildi. O'chirish alohida tasdiqlash oynasisiz darhol bajarildi.
- Admin alohida mahalliy bazada bo'sh sinov guruhini yaratdi, nomi va oylik summasini o'zgartirdi va o'chirdi; natijalar bazada tekshirildi. O'chirish tasdiqlash oynasisiz bajarildi. Bog'langan davomat yoki vazifalari bor guruhni o'chirish holati hali tekshirilmagan.
- Guruh va mahsulotni tahrirlash/o'chirishda, hisobni tahrirlashda va alohida xabarni o'chirishda tasdiqlash qo'shildi. Hisob va suhbatni o'chirishda tasdiqlash avval ham bor edi. Guruh hamda mahsulot uchun tasdiqlash va rad etish brauzerda bazaga ta'siri bilan tekshirildi. Boshqa barcha o'zgartirish va o'chirish amallari hali to'liq qamrab olinmagan.
- Qo'shimcha tasdiqlashlar: davomat, support yozilish/bekor qilish/holat va davomat, vazifa natijasini belgilash, coin qo'shish/olish va xarid, to'lov holati/izohi/so'rovi, hamda yangi testdagi savolni o'chirish. Avtomatik o'qildi bildirishnomalari va oddiy navigatsiyaga tasdiqlash chiqarilmaydi.
- Brauzerda davomat va to'lov holati uchun bekor qilish bazani o'zgartirmasligi, tasdiqlash esa o'zgarishni saqlashi tekshirildi. Qolgan yangi qo'shilgan tasdiqlashlarning barcha holatlari brauzerda alohida tekshirilmagan. Support brauzer sinovi tanlangan vaqt endi ko'rinmagani sabab tugamadi.
- Kod darajasidagi 10 qo'shimcha tasdiqlash guard testi bilan jami 41 avtomatik test o'tdi; bu kod mavjudligini tekshiradi, to'liq brauzer qamrovi emas.

## Bir vaqtning o'zida saqlashdan himoya

- Demo API bazaning versiyasini GET bilan beradi va PUT faqat o'sha versiya hali amaldagi bo'lsa qabul qilinadi. Eski yoki versiyasiz yozuv rad etiladi. Admin tomonidan bazaga bevosita kiritilgan o'zgarishlar ham versiyani yangilaydi.
- Bitta oynadagi yozuvlar navbat bilan yuboriladi. Ziddiyat yoki saqlash javobi noaniq bo'lsa, keyingi saqlashlar to'xtatiladi va foydalanuvchiga sahifani yangilash haqida ogohlantirish beriladi. Saqlanmagan o'zgarishlarni yangilashdan keyin qayta kiritish kerak; ular avtomatik birlashtirilmaydi.
- Mahalliy brauzerda ikki ochiq oyna bilan sinov: birinchi to'lov saqlandi, ikkinchisining eski nusxasi rad etildi va ogohlantirish ko'rsatildi. Barcha 14 pilot login nusxada tekshirildi. Jonli Netlify funksiyasi orqali yozish va ikki foydalanuvchi sinovi hali tekshirilmagan.
- Bu himoya autentifikatsiya emas: umumiy demo API hali ham hammaga ochiq; haqiqiy shaxsiy ma'lumotlar uchun xavfsiz emas. Muddati tugaganda bazalar avtomatik o'chirilmaydi.

## Frontend bo'yicha qo'shimcha ishlar

- Qisqa telefon ekranida ilova balandligi ekranga moslashtirildi; modal oynalar va guruh tanlash fokus belgisi yaxshilandi.
- Vazifa berish va yangi hisob yaratishga tasdiqlash qo'shildi. Inglizcha hisob yaratish va vazifa oynalaridagi bir qator asosiy matnlar tarjima qilindi; qolgan sahifalar hali to'liq tarjima qilinmagan.
- Alohida mahalliy bazada admin, ustoz va o'quvchi mobil ko'rinishi, tema tugmasi, ustozning vazifa berishni bekor qilishi va tasdiqlashi, inglizcha hisob yaratish oynasining asosiy yozuvlari tekshirildi. Ustozning kompyuter ko'rinishi ham tekshirildi. Bu barcha tugmalar yoki barcha tillar to'liq tekshirilganini anglatmaydi.
- Jonli ikki Netlify API orqali vaqtinchalik yozish va eskirgan yozuvni rad etish tekshirildi; sinov belgilari olib tashlangan. Jonli brauzerda barcha yo'llar tekshirilmagan.

## Tarjima va navigatsiyani qo'shimcha tekshirish

- O'quvchi support, to'lov, coin; ustoz vazifa, davomat, support; admin hisob, guruh va xabar oynalaridagi 126 ta qo'shimcha matn ingliz tiliga o'tkazildi. Ayrim dinamik xabarlar, tugmalar, tasdiqlar va boshqa matnlar hali o'zbekcha bo'lishi mumkin: to'liq tarjima deb hisoblanmaydi.
- Mahalliy izolyatsiyalangan demo bazada o'zbekcha admin, ustoz va o'quvchining asosiy navigatsiyasi, inglizchada esa admin, ustoz, o'quvchi, ota-ona va yordamchi admin navigatsiyasi ochildi; brauzerda JavaScript xatolari kuzatilmadi. Bu barcha tugmalar, barcha holatlar yoki jonli sayt testi emas.
- Jonli saytning statik fayllari tekshirildi, lekin ushbu o'zgarishlar jonli brauzerda hali sinovdan o'tmagan. Sinovlar foydalanuvchilarning jonli bazasiga yozmadi.

## So'nggi qo'shimcha tekshiruv

- Ikkala Netlify saytidan yangi tarjima kodi kelayotgani statik JavaScript orqali ko'rildi. Jonli saytlarni bu muhitdagi Chromium bilan ochish `ERR_CONNECTION_CLOSED` berdi, shuning uchun jonli brauzerda kirish yoki tugmalar tekshirilmagan.
- Alohida mahalliy bazada ustoz faylli, rasmli va besh savolli test vazifasini guruhga berdi; har biri bazada saqlangani ko'rildi. O'quvchi testni topshirdi va 100% natija qayd etildi.
- Mahalliy bazada to'lov holati va guruh tahriri/o'chirilishi uchun tasdiqlashni bekor qilish hamda qabul qilish natijalari tekshirildi.
- Inglizcha navigatsiya besh rolda qayta ochildi, brauzer JavaScript xatosi kuzatilmadi. Kamida guruh tafsilotidagi qidiruv va ayrim saqlash tugmalari inglizcha rejimda ham o'zbekcha qoladi; barcha tugmalar, ekranlar va tarjimalar hali to'liq tekshirilmagan.
- `npm run check` va 49 avtomatik test o'tdi.

## Guruh oynasi va saqlash tarjimasi

- Guruh tafsilotlari qidiruvi va natijasi, guruh tahriri/yaratish tugmalari, hamda hisob, to'lov izohi va mahsulot oynalaridagi saqlash/qo'shish tugmalari inglizchaga tarjima qilindi.
- Alohida mahalliy bazada inglizcha guruh qidiruvi, tahrirlashda bekor qilish va tasdiqlab saqlash hamda boshqa oynalardagi inglizcha tugmalar brauzerda tekshirildi. `npm run check` va 50 ta avtomatik test o'tdi. Qolgan barcha tarjimalar va jonli brauzer tekshiruvi hali to'liq emas.

## Inglizcha matnlar va jonli brauzer holati

- Menyu, davomat, support, vazifa, to'lov, hisob va bildirishnomalardagi qo'shimcha yozuvlar, tasdiqlashlar, xatoliklar va hafta kunlari ingliz tiliga o'tkazildi. Foydalanuvchilar kiritgan ismlar, xabarlar va vazifa mazmuni avtomatik o'zgartirilmaydi.
- Mahalliy alohida bazada besh rolda inglizcha asosiy navigatsiya, guruh qidirish/tahrirlash, tasdiqlashni bekor qilish va saqlash, fayl/rasm/test vazifalari va to'lov tasdiqlashi tekshirildi. `npm run check` va 51 ta avtomatik test o'tdi. Bu barcha mumkin bo'lgan ma'lumot va holatlar to'liq qamrab olinganini anglatmaydi.
- Ikkala Netlify domenini shu muhitdagi Chromium orqali ochish yana `ERR_CONNECTION_CLOSED` bilan muvaffaqiyatsiz tugadi. Jonli brauzer testi shu sabab bajarilmadi; foydalanuvchi brauzerida alohida tekshirish zarur. Sinov jonli bazaga yozmadi.
