# Eski to'liq demo — alohida Netlify sayt

Eski soxta demo ma'lumotlari (52 hisob, guruhlar, davomat, vazifalar) alohida `newcastle_classic_demo` bazasiga yuklangan. U mavjud 12 o'quvchili demo bilan bir xil baza EMAS. Har ikkala API ochiq va ishonchsiz, ularga haqiqiy ma'lumot yoki parol kiritmang. Yozuvlar bir-birini bosishi mumkin.

1. Netlify'da **Add new site → Import an existing project** orqali shu `valtrixlegend-bot/new-castle` repositoriyini va `arena/dcbe5c6f-new-castle` branchini tanlab **yangi sayt** yarating. Mavjud saytni qayta sozlamang.
2. Base directory va build command bo'sh bo'lsin; `netlify.toml` build sozlamalari ishlaydi.
3. Yangi saytning environment variables qismiga `NEWCASTLE_DEMO` qiymatini `classic` qilib qo'shing (Functions/runtime uchun ham). So'ng **Deploy site** qiling yoki sozlangandan keyin qayta deploy qiling.
4. Yangi saytda `/api/db` orqali demo bazasini ochishini, admin kirishini va o'zgarishlar boshqa saytda ko'rinmasligini tekshiring. `NEWCASTLE_DEMO` qo'yilmasa, sayt eski pilot bazaga ulanadi.

Eski demo admin: `admin` / `vmTw427CPG`; ustoz: `ustoz1` / `Ustoz-2026-A`; o'quvchi: `talaba01` / `Talaba-2026-A`. Boshqa demo hisoblar: `newcastle-local/demo-accounts.md`.

Ushbu klassik demo API muddati 2026-11-14 17:58:42 UTC; undan keyin bazani o'qish va yozish to'xtaydi. Ma'lumotlar va sayt avtomatik o'chirilmaydi. Muddat tugaganda Netlify saytini hamda Supabase'dagi `newcastle-classic-demo` funksiyasi va `newcastle_classic_demo` jadvalini alohida o'chirish kerak.
