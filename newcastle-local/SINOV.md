# Yangi o'quv markaz uchun sinov

Bu shablon toza sinov bazasi: 1 admin, 1 ustoz, 12 ta taxallusli o'quvchi va bitta guruh. Eski to'lovlar, chatlar, vazifalar va demo o'quvchilari yo'q. Bu **o'z-o'zidan ro'yxatdan o'tish emas**: hisoblar oldindan yaratilgan. O'quvchilarga pilot01–pilot12 loginlarini alohida bering.

| Rol | Login | Sinov paroli |
| --- | --- | --- |
| Admin | pilot_admin | Pilot-Admin-2026 |
| Ustoz | pilot_ustoz | Pilot-Ustoz-2026 |
| O'quvchi | pilot01 ... pilot12 | Pilot-01-2026 ... Pilot-12-2026 (login raqamiga mos) |

Bu parollar hammaga ma'lum, xavfsiz emas; boshqa joyda ishlatiladigan parollarni, haqiqiy ismlar, telefonlar, baholar, to'lovlar yoki boshqa shaxsiy ma'lumotlarni kiritmang. Testda bolalar faqat taxallus va soxta ma'lumotlardan foydalansin. API himoyasiz: tarmoqdagi har kim butun bazani ko'rishi, o'zgartirishi yoki o'chirishi mumkin. Faqat ishonchli, yopiq sinov tarmog'ida ishlating, internetga ochmang. Bir vaqtda o'zgarishlar ustma-ust yozilib yo'qolishi mumkin; muhim ma'lumot saqlamang.

## Boshlash (Linux/Mac)

Loyiha papkasida:

```sh
DATA_DIR=./data/pilot SEED_FILE=./data/pilot-data.json HOST=0.0.0.0 npm start
```

Windows PowerShell:

```powershell
$env:DATA_DIR='./data/pilot'; $env:SEED_FILE='./data/pilot-data.json'; $env:HOST='0.0.0.0'; npm start
```

Server kompyuterida `http://127.0.0.1:3000` ni oching. Bir xil ishonchli mahalliy tarmoqdagi boshqa qurilmalar server kompyuterining mahalliy IP manzili va 3000 portiga ulanadi (masalan, `http://192.168.x.x:3000`; o'z IP manzilingizni ishlating). Xavfsizlik devori ulanishni cheklashi mumkin. Kompyuter va Node server ishlab turishi kerak. Bu internetdagi umumiy server yoki doimiy havola emas.

Pilot ma'lumotlar alohida `data/pilot/db.json` da saqlanadi, asl `data/demo-data.json` o'zgarmaydi. Faylni muntazam zaxiralang. Sinovni boshlang'ich holatga qaytarish uchun serverni to'xtatib, `data/pilot/db.json` ni faqat ma'lumot yo'qolishiga rozi bo'lgach o'chiring. Supabase/Vercel API bu shablonni avtomatik ishlatmaydi.

O'qituvchi uchun to'liq eski demo alohida arxivda saqlanadi; odatdagi `npm start` demo ma'lumotlarni `data/db.json` ga ko'chiradi. Ikki bazani aralashtirmang.
