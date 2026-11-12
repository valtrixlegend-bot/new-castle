# Netlify — vaqtinchalik demo

Bu sozlama faqat ochiq, soxta ma'lumotli demo uchun. API bazadagi ma'lumotlarni va parollarni himoya qilmaydi; haqiqiy ism, parol, to'lov yoki o'quvchi ma'lumotlarini kiritmang. Bir vaqtdagi yozuvlar bir-birini bosishi mumkin.

1. Netlify dashboardida GitHub orqali **Add new site → Import an existing project** tanlang.
2. `valtrixlegend-bot/new-castle` repositoryni va `arena/dcbe5c6f-new-castle` branchni tanlang (kerak bo'lsa production branchni Netlify sozlamalarida shu branchga o'zgartiring). `main` boshqa, eski versiya.
3. Base directory va build commandni bo'sh qoldiring. `netlify.toml` `docs` papkasini va `netlify/functions` funksiyalarini sozlaydi. Deploy qiling.
4. Tayyor bo'lgach, Netlify'dagi sayt nomini o'zgartiring yoki o'zingizga tegishli domenni ulang. Domenning bo'sh bo'lishi kafolatlanmaydi.

GitHub ZIP'dagi `docs` papkasini Netlify'ga shunchaki drag-and-drop qilish **yetarli emas**: u holda server funksiyasi yig'ilmaydi va baza ishlamaydi. Git orqali build qiling.

Funksiya mavjud, alohida Supabase demo bazasiga ulanadi. Ushbu demo API 2026-11-14 soat 15:43 UTC da tugaydi; saytdagi ma'lumotlarni o'qish va yozish shu vaqtdan keyin to'xtaydi. Statik sayt va demo bazasi avtomatik o'chirilmaydi. Vaqtni uzaytirish yoki boshqa bazaga o'tkazish alohida sozlashni talab qiladi. Sayt Netlify'da hali joylashtirilmagan va u yerdagi real build tekshirilmagan.
