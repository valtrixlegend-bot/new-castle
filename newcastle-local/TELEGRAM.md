# Telegram Mini App va davomat xabarlari: tayyorgarlik holati

`lib/attendance-alerts.js` — hali ishlaydigan bot emas, faqat xabarlarni rejalashtiruvchi testlangan qoida. Hozircha hech qanday xabar yuborilmaydi va bu modul API'ga ulanmagan.

- Yangi yoki o'zgartirilgan davomatda `absent` bo'lsa, o'quvchi va `childIds` orqali bog'langan har bir ota-ona uchun xabar rejalashtiriladi.
- Bir guruhda ketma-ket ikki davomat `late` bo'lsa, ikkinchisida ota-onalar uchun ogohlantirish rejalashtiriladi. Uchinchi ketma-ket kechikishda qayta ogohlantirmaydi. `present` yoki `absent` ketma-ketlikni uzadi; guruhlar alohida hisoblanadi.
- Sana, saqlangan vaqt va ID bo'yicha tartiblanadi. Mavjud davomat o'zgarmasa, oddiy qayta saqlash xabar rejalashtirmaydi. Shu bilan birga bu doimiy idempotent navbat emas: statusni o'zgartirib yana qaytarishda reja yana hosil bo'lishi mumkin.
- Eski davomat orqaga qarab o'zgartirilsa, faqat tahrirlangan dars qoidasi tekshiriladi; undan keyingi avval saqlangan darslar uchun ogohlantirishlar qayta hisoblanmaydi. Buni foydalanuvchilar va biznes qoidasi bilan kelishish kerak.

Ishga tushirish uchun hali kerak: haqiqiy server autentifikatsiyasi va har bir rol uchun ruxsatlar; Telegram `initData` serverda imzosini tekshirish; hisoblarni bir martalik kod bilan xavfsiz bog'lash va rozilik; botni boshlagan foydalanuvchining chat ID'sini serverda saqlash; tranzaksion xabar navbati, idempotentlik va retry; Telegram API bilan integratsiya; HTTPS hosting; ma'lumotlarni zaxiralash va kuzatuv. Hozirgi butun bazani brauzerga beradigan API ushbu ma'lumotlarni himoyalamaydi va haqiqiy bolalar ma'lumotlari bilan ishlatishga yaramaydi.
