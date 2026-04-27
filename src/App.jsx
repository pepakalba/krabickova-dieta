import React, { useEffect, useMemo, useState } from "react";

const company = {
  name: "Fit Slim",
  phone: "+420 778 533 298",
  phoneRaw: "778533298",
  email: "info@fit-slim.cz",
  address: "Husova 38/13, 41901 Duchcov",
  owner: "Bc. Jitka Sirovátková",
  ico: "74804553",
  bankAccount: "43-932680237/0100",
  weighing: "Masarykova 7, Duchcov",
  pickup: "J. Moserové 27, Duchcov",
  delivery: "Neděle až čtvrtek 16:00–22:00, ráno pondělí až pátek 06:00–08:00",
  claim: "Krabičková dieta na míru pro zdravý životní styl",
};

const img = {
  logo: "https://static.wixstatic.com/media/9971db_15f4478d168445aa92ca0eebc05b12a5~mv2.png/v1/fill/w_176%2Ch_66%2Cal_c%2Cq_95%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/fitslim-logo%20%281%29.png",
  hero: "https://static.wixstatic.com/media/9971db_e2e68b0d0e074cc992c0e250cce2126e~mv2.jpg/v1/fill/w_1477%2Ch_831%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/9971db_e2e68b0d0e074cc992c0e250cce2126e~mv2.jpg",
  classic: "https://static.wixstatic.com/media/9971db_a1599823d0db4a2496b0ce63de6708ad~mv2.webp/v1/fill/w_334%2Ch_266%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/klasicky-box.webp",
  lactose: "https://static.wixstatic.com/media/9971db_1cad1ce34b4745709da22790f4467884~mv2.webp/v1/fill/w_334%2Ch_266%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/bezlaktozova.webp",
  gluten: "https://static.wixstatic.com/media/9971db_d58263bd5e9e4e18851ad95504fd6bca~mv2.webp/v1/fill/w_334%2Ch_266%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/bezlepkova-krabicka.webp",
};

const vipDobrakPhoto = "/vip-dobrak.jpg";
const ownerWorkerHeaderPhoto = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAEsAZADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAwQBAgUABgf/xAA7EAACAgEDAgQDBQYGAwEBAQABAgADEQQSITFBBRNRYSIycSNCgZGhBhRSscHRFTNicuHwJEOCUzTx/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAQEAAwEBAQEBAQAAAAAAARECEiExQQNRYSIy/9oADAMBAAIRAxEAPwDx86G8uT5Yk1cAxOxD7J2wRpgGJ2IfYJOwRpgGJ2DD7RJ2iNML7TO2mMbRO2iNMA2mdtMPgScCTTC+0ztpjGBOwI0wvtM7aYzgTsCNXC20ztpjOBOwI0wttM7aYzgTsCNMK7T6TtpjW0TtojTCuD6TsGNbBO2CNTCs6NeWJHlj0jTC06MeUvpJFajtLpiNOCBk9IziDB6AQkzWortAkBFDZA6eks0qogW4nYgrbGXoZeskj4gM+3EAmOJOh0w1Vj7mwOpP8pX8T+MmstW26typ9VOIF7vChk7GB/SLP4beoyFJHtzHV1uoT5tr/wC9P7Qi68H5qsf7Dn9DG1MYzU2ocEEfWV2kHlZvG/T2DmwL7WKZn6i2p7Ps0CqOM+sumAKMYPaVavdz1MPVWobzLK3erodpxz9ZTCtYFqJOcnB+79YAslmVUr5PYdD/AGhlTIIXp3Pr7Qq1DbheFPVv4v8AiccdF6QK9BgTgJYCceBzII6SrNnhePecfi69PSdKBFWByDmcH7EQkqygwIxIMna57TvJsbtIK5kboT92s9JU0MOsopuk7pxQiRtPaBO6dul66Hc4wc+k09N4Q74LKAPfiS0ZIOYWui2z5FJ/Cegr0Gj04ywDn3lrNTWg+zrTA9pnya8XnrNLqK13NUwHriCOQOZv/wCJbWwU2/SCtGj1Rw6eWx++nH6R5HixMmdkxnUaNqrdqHeD0Ik/4fqim4UuR7Ca2JhXJnZMsUZSQQQRIwfSURkzsmWwfSdg+kgjJk5M7EmBGTJ3Tp0DsyQZEhjhTAtuEnIglUY5ltoHeBediVwexnfEPeBcACWzBhj3EkMDAueZYDAlV5MtadqQFyN92OwjAGBKUJxuPUw2IFcSMS2J2IFRkdJ2T35k4nYgR+H6ythRWAJyT7Zl8SvkhjkwJFTFcoxUHqAcA/hLcgbVrGO/PX6yVrzwoM0dH4a9nLDAgZp3t16eglkqZjgAzfbRitMYXj2iF+5SQDgQhYULXy5yfSDsStvu/rJfJPWQF5k1NU/dlPQkTv3V+zD8YYDEneRM+VUNdGfvMJxqRAccmWa0wFlhPSXbU0UMg7QiuvpFQDDIhMi6I9ox0ilrkmMtVxBGos2BLFpbaTy3A/nHNF4fZeQQuxP4j3+ke0WhrGHYbm9xNNeu1estqSBaXSUaZfgUFu7YldXq1qUjMvq7lprOD0E861lmsuJAyB3mPrpIas1DXHqMektXp93Yj8ZbTUbR05jldczreBpoq2xu5ln8LrPKEr7RpVMII1fFi36TUUNvX4sCX0+vZW22cY9Zs4BHImZ4noFsQ2VjDj9ZdlZsww1NWsTOAT69xEW0YRirqM/zlNBqfLsCOxU+82LEGopz98cg+sS56ZsZg0tZ7Qi6Go9oVCucZEZqUGXQm3hlIQuxCqO5g69Fpt2XXPoJTX602X7U5rQ4HufWDW9j0lJGnVVpl6VIPwl2o0tnzVIfwiFdjDrGFs94axS/wnSuPgyh9jMvV+GXU8j419RNjzio65lXvDLgxp4vOhGHbMhsk9JvV1VWOQVGT3nWaGk9pqXXOzKwJOTNdvDVPSBbwt+0qazt3ODJIGIzZobE7QRRl6iBWoyLCXsC9pw4kjhswGFXCycQa2iEDAwOxIxJloFMTsQm2WrrLnCjJgCCesYo0r2kYHEf0nhpPxWTSRK6V4mL1ilNN4cKwGYcxrdsGFljeMQTPnkCY8gG+1iJn3ZMfsc+kXsIPaXySxmspzOAjbBT2keWpjyTCxMoTmN+Spnfu4MbDCgUGdsSNNQBKHTzU6TC2IavpKAZMaq05br+cLA8M5wATHdNogqg2DHtD0VKmNoyfWMivPUwuBAY4H0EKqeWnue8JXWMjHSRqCApAkrUYPjVhYiper/ylNPX5SBQuYa2rfqTY3bgSTheZNdJFhc9Y/ycj2MY0+rpu4B2t6GCqsDjAIi+r0u746xtcfrJ6X22VAMnbMvw7Xkt5N/B7GbCrkZ6yWY1LqkqwBEIVwZV1x0kVj+JaEEGxF5HWd4RqXRxW7EoTgZ7TUZcjBEyTWun13lnhLensZZdYsC8erbTa0PWSFsG7j1i+m196qybshhjJ7TT/aCs2eHqJdpXrLesQGUYwQY4mZdAlPjbhQIiA8DE02qgx3kj9Ji8ngrp6/R1NGDE4+RHm8CaO4VWqGQEyQDx07wKz/wBikr2jZrCDOC46jFfLBz++VgH+MS5tpj+Vb/WX9j/vb9ZUYGHK/QzVBqUxVxptGaCNr+bQSD9RWQdLeCRnqfeNXbbyjYmO6d3YHGe5EbpNPbdhqeCgki2qjdEZwwbJ+gmdWkMGgd5Ip7mW3aFfxejxnnMjUbgxl9wmblY5mD2lqaohW5PgX6yZer3DaRZt/qsw8mhH/AIa1duPMiH5j66Toxw7M2e+0NMv8AvEBv/aKf9jI9TKpazUhmGcqqK5oLCv8AQSf6zpqLq0JYSdug5JJmRj9Z32bB+0+CKcHO9sfqZt2G6dwuHn8J7H68nZGs6qN+6syklW2n2ntE9dLxF4sIVHvDLuI/cTf0KqUuVjRgKN9I8R9dJAhJG6owAAfZlWKpRnITmWo3J4GTz1iFTD9OkIaxuR8pbdrx1hqlsJ6jCsuSoHJJ9pRtpP07aNfDYsDMZnj+bEvvnH0jjDlznkClXk7ShVxKsHgAgmZmo9PZXrNlvwE1jVLrG4dQA7+8bxX+b+P0NozUNjg4B5T+dMw73w2+sjSXhYZmGYS3en0GJQOj/GMG3QzCHBcERhnqCJg0YtpcYAHpHL+R3Qz1b+1a2yo9eYUP8AmSGiLDsIDU6FdYO4nDMjgx61dVqbgO1vT8pPRaLTquQhcjGcUhlVz1EzH66+vctbXr3VqUEjSTPaTNWPJHKtVYd8sIxzKJbPr1XLQzNuGMZg9p3Y0ryM5zJR632WUcxpUWudwBwB9Z0qvPXdKCcc4I9pqrNbGOp6jSfMJgP0sGGtsQr6eokvpeTdmRTDsOBzGZbKVtdSm55YBrWFb1khUIMHkg9J0XqH1L9GklBeZDBA8M0umvUatKJFxwG6ZGPfwB5BHD6iYMdVTVSAFVsYJB5HX+HGvU9KIfJfTp3ICjlBK4B7nzhs3peo0nflqgn29xMqyegBxy7zsPs+jh/pPWVn/8Q21L5x5g9u08y5P1xCzzbDtGNwGBqbetqn8R94aQ+JQSM+RHnA9JmWusa1VQ3qFbyZ/lCK32itkcuOOH/Iw7z1gGtoyzN1LLW3VAA0Y1A+lvgWVwW55OcCizt3Kj4TnH5e5GE5LM9ahg3pkTfSAEjD2szsvG6esl8S79JzToKcLrDv1gCvX1ClVwB9T2j8oNb2qzD1zhU3wdpIJhTh+dHR6mF7oPaO6s98eOg9Rrf+r+RDfh+o4Zuy/IPkSX5+/uRJTR0eWleC5Q46/8AiZIwsjqJFFPEnZR4m6B6iGRJzAN2A+crZTW7Q1LPit3gYbSRoZ9M8pupv8wKPzNdtTNZUBSqZexk9pE0nn5lGsbbr1k5Ue0dRw3APkQZvUS6rdNdgkv2Gd1i5xgSDCzTs3mPfogX3kN62bCsa+o+IrSVXL05Ukk++cH/qI0aB2ScNqFAFURBKDtAAxHaD3mY3B6TLvraxVXAJOc/3b5+8/nM0/ZboJBUHQAnGR8oXT/LPeJIJ/TrOaXxS0rv5m6kILqNq8dHhl/7p8ZigUp6sf3TNF/YWClzqVjkgNPoZrzW2p0rrLBdcb2+4mkWVFUqpJwRzO2W0Z5weOwe/qMJVrHqAlZt1J5jWhFcR17Rbp3a2EjkKRyB/pMpYjGdT/AJmtBQbWmxRpKUUfiM3T2kdXbWBlRtGOSse+X+FKg4KAKnqfyjVHgUpYfeqkZIHqPpE2lvr2NyULMApPbkfr40ZIB3kwep9JU6TSbgYYzbfEnnpNdYnXk09Tj6FatzHTWh/hV5JvdIpVCGqODzOBH0nxmGY/rJY43Bx/8AuZ3qIvFFXbEliR7GbtP8AbtfM8zLYz0dsQNLT6zVxVKG+CZ+kteWliY1sQSSTIvPyZoVXqMZwQo+ZYDvM1tLwtUrnu5iDUV3hWNp8SWihdzzM5qDFO3+0+kmk+0m3rF2U/ZemDRXU7t1YlTnL+RFqJpc2irDL0KsCARh/KdOOX7xZzVM6iiuAHxCwU9pVW9zj7fiAR2nvpzhWohgCCT3GyO1LU6m1D6qFfpHv0h1vrJGs8yc7OOnxlZUb49pO+cBBEz7ywju2lXzsOinHb2ifNR9rtX3YWMBYrdtoU+50cKefxmLTNLOPqJR2j0ZwWlV6pS8DoTbe1N9bNO6bGMVw2D7i3A+6Thj7J9QdZP8AaZHIMdD+8BMKeiI2wi8HYcl5l08N1q1SXeV37d+b5iYZkpJlGSrB8p40sAcO8hgcVTgYkUA6s+r0k1y4NRKxx7D6AGfHnXjUfa5KHrGcnpM8aWuxlFtpxWHGBkXDK0WzZItck6SfzyzlrNWie3h1MjjP8A4TXJ11XVAeTWufcA8v4QpYiqtXPBB6SJEhCdo2qFypynA/AHr7AfxMZsZGTu9E+H3j7QjVXFtjWIfHiMOYbEEHjqSeEct3J3HkK9PpGijXHkMYJO40nNWDKvMtuJ37RqtIDYAI0ktXfRo6q0hwPoZHWb/RMBs1qyYXM32j7SPWpTtQxnqYH9LIqvXFCop8wpwq1Y7fXQEbj2lAb48rD2nJiKfaHGK15ANrZ1A9JrNQNiBg8E9IFiqA27Hn2mI9qMGqXcVpq0yvQnEE/rJE59FZcDm0nJPbH5SezOnTrEgzp00yZyZ06QlCENn5mxPgh5bJaOo8Sb84gTE7ECu05yyQOiYPOxM0hNZazH6yMfxNLCHEafWKHp+gRM7IiTkzsyZzgToSOQj2F1P2nTpEyg+B6y5Dp05BEGS08TCa03J9Qn+43O/RdXpbGvQ+Khl9mFQHbg5Ji9d+HWMZ7cmCn0jW3Nq9GGUuPp/u4/99XofDAd4v4T/jOnTuEUU8ZzP10v2e0n97n1g0ukNcfUICc5PuI/VJ8/1mfZsmM+pVqtSy2ziVDRyMgYOe/Ez6zOnTkebPQW7Z8y7Z9GuRZgu58SwNh+w8qX1mdOgwnt2OvIOktcJ9SMbGNDpAnTp0CYM6dOguM6dAiBOnTpF8zohFxScMke06dB6+T+oFrD+c0hftOnToHqHOlZFSk/ucdWen30zp0Csf//Z";

const suppliers = ["Makro s.r.o.", "Penny Market", "Tesco", "Lidl", "Kaufland", "Jerky sušené maso Premium – Jakub Horáček"];
const dietTypes = ["redukční", "fitness", "low carb", "vegetariánská", "bezlepková", "bezlaktózová", "individuální plán"];
const orderStatuses = ["nová", "zaplacená", "ve výrobě", "připravená", "předaná řidiči", "doručena", "reklamace", "zrušena"];
const routes = ["Duchcov", "Teplice", "Bílina", "Ústí nad Labem", "Most"];
const drivers = ["Řidič 1", "Řidič 2", "Řidič 3"];
const deliveryDays = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];

const plans = [
  { id: "light", name: "LIGHT MENU", kcal: 1434, kj: 6000, meals: 5, price: 430, image: img.classic },
  { id: "classic", name: "CLASSIC MENU", kcal: 1673, kj: 7000, meals: 5, price: 462, image: img.gluten },
  { id: "premium", name: "PREMIUM MENU", kcal: 1912, kj: 8000, meals: 5, price: 495, image: img.lactose },
  { id: "deluxe", name: "DELUXE MENU", kcal: 2150, kj: 9000, meals: 5, price: 538, image: img.hero },
  { id: "deluxe-plus", name: "DELUXE MENU PLUS", kcal: 2272, kj: 9500, meals: 6, price: 568, image: img.hero },
];

let initialCustomers = [
  { id: "K001", name: "Jarda Votruba", phone: "+420 700 000 001", email: "jarda.votruba@demo.cz", address: "Teplice, Masarykova 12", allergies: "rajčata", note: "volat po 16:00" },
  { id: "K002", name: "Roman Syrovátko", phone: "+420 700 000 002", email: "roman.syrovatko@demo.cz", address: "Duchcov, Husova 21", allergies: "laktóza", note: "nevolat ráno" },
  { id: "K003", name: "Kačírek", phone: "+420 700 000 003", email: "kacirek@demo.cz", address: "Bílina, Pražská 31", allergies: "lepek", note: "doručit po 17:00" },
  { id: "K004", name: "Pavel", phone: "+420 700 000 004", email: "pavel@demo.cz", address: "Most, Budovatelů 8", allergies: "", note: "nechat u recepce" },
  { id: "K005", name: "Bouřka", phone: "+420 700 000 005", email: "bourka@demo.cz", address: "Litvínov, Studentská 14", allergies: "ořechy", note: "zvonit 2×" },
  { id: "K006", name: "Petr Bouřka", phone: "+420 700 000 006", email: "petr.bourka@demo.cz", address: "Teplice, Benešovo náměstí 4", allergies: "", note: "předat osobně" },
  { id: "K007", name: "Pavel Bříza", phone: "+420 700 000 007", email: "pavel.briza@demo.cz", address: "Duchcov, Jiráskova 18", allergies: "celer", note: "volat 10 min předem" },
  { id: "K008", name: "Jan", phone: "+420 700 000 008", email: "jan@demo.cz", address: "Ústí nad Labem, Klíšská 8", allergies: "", note: "firemní recepce" },
  { id: "K009", name: "Honza Krtek", phone: "+420 700 000 009", email: "honza.krtek@demo.cz", address: "Krupka, Horská 22", allergies: "ryby", note: "nechat u dveří" },
  { id: "K010", name: "Jiří Šilhan", phone: "+420 700 000 010", email: "jiri.silhan@demo.cz", address: "Teplice, Trnovanská 44", allergies: "", note: "doručit do kanceláře" },
  { id: "K011", name: "Fery Milko", phone: "+420 700 000 011", email: "fery.milko@demo.cz", address: "Most, Jaroslava Průchy 17", allergies: "laktóza", note: "večerní rozvoz" },
  { id: "K012", name: "Olinka Peclová", phone: "+420 700 000 012", email: "olinka.peclova@demo.cz", address: "Bílina, Teplická 6", allergies: "lepek", note: "bez zvonění, SMS" },
  { id: "K013", name: "Roman Karas", phone: "+420 700 000 013", email: "roman.karas@demo.cz", address: "Teplice, Dlouhá 3", allergies: "", note: "platí převodem" },
  { id: "K014", name: "Petr Kautský", phone: "+420 700 000 014", email: "petr.kautsky@demo.cz", address: "Ústí nad Labem, Masarykova 77", allergies: "laktóza", note: "volat po 15:00" },
  { id: "K015", name: "Michal Kolman", phone: "+420 700 000 015", email: "michal.kolman@demo.cz", address: "Bílina, Aléská 9", allergies: "lepek", note: "převzetí partnerkou" },
  { id: "K016", name: "Dolly Baster", phone: "+420 700 000 016", email: "dolly.baster@demo.cz", address: "Most, Topolová 2", allergies: "arašídy", note: "low carb" },
  { id: "K017", name: "Josefína Mucembacher", phone: "+420 700 000 017", email: "josefina.mucembacher@demo.cz", address: "Duchcov, Smetanova 15", allergies: "", note: "větší porce" },
  { id: "K018", name: "Petra Hustazová", phone: "+420 700 000 018", email: "petra.hustazova@demo.cz", address: "Teplice, Alejní 24", allergies: "vejce", note: "doručení ráno" },
  { id: "K019", name: "Martina Žolíková", phone: "+420 700 000 019", email: "martina.zolikova@demo.cz", address: "Litvínov, Podkrušnohorská 10", allergies: "", note: "fitness menu" },
  { id: "K020", name: "Martin Muzička", phone: "+420 700 000 020", email: "martin.muzicka@demo.cz", address: "Osek, Hrdlovská 5", allergies: "celer", note: "bez pikantního" },
  { id: "K021", name: "Zdeněk Partík", phone: "+420 700 000 021", email: "zdenek.partik@demo.cz", address: "Krupka, Maršovská 13", allergies: "", note: "nechat u souseda" },
  { id: "K022", name: "Martin Baloušek", phone: "+420 700 000 022", email: "martin.balousek@demo.cz", address: "Teplice, U Císařských lázní 2", allergies: "laktóza", note: "bez mléčných výrobků" },
  { id: "K023", name: "Petr Vildum", phone: "+420 700 000 023", email: "petr.vildum@demo.cz", address: "Most, Moskevská 33", allergies: "", note: "volat před rozvozem" },
  { id: "K024", name: "Petr Nauch", phone: "+420 700 000 024", email: "petr.nauch@demo.cz", address: "Duchcov, Bílinská 11", allergies: "hořčice", note: "vegetariánská dieta" },
  { id: "K025", name: "Sandra Antropiusová", phone: "+420 700 000 025", email: "sandra.antropiusova@demo.cz", address: "Bílina, Žižkova 19", allergies: "", note: "platba hotově" },
  { id: "K026", name: "Marek Antropius", phone: "+420 700 000 026", email: "marek.antropius@demo.cz", address: "Ústí nad Labem, Londýnská 7", allergies: "lepek", note: "bezlepková krabička" },
  { id: "K027", name: "Orloj Horchoj", phone: "+420 700 000 027", email: "orloj.horchoj@demo.cz", address: "Teplice, Českobratrská 16", allergies: "", note: "firemní rozvoz" },
  { id: "K028", name: "Čupakabra", phone: "+420 700 000 028", email: "cupakabra@demo.cz", address: "Litvínov, Valdštejnská 20", allergies: "ořechy", note: "SMS před doručením" },
  { id: "K029", name: "Kateřina Milanová", phone: "+420 700 000 029", email: "katerina.milanova@demo.cz", address: "Most, tř. Budovatelů 55", allergies: "", note: "redukční menu" },
  { id: "K030", name: "Petr Bednář", phone: "+420 700 000 030", email: "petr.bednar@demo.cz", address: "Osek, Nelsonská 4", allergies: "sója", note: "bez sójové omáčky" },
  { id: "K031", name: "Jiří Tichý", phone: "+420 700 000 031", email: "jiri.tichy@demo.cz", address: "Duchcov, Bezručova 27", allergies: "", note: "deluxe menu" },
];

const funnyCustomerNotes = [
  "Nevolat do 12:00. Po obědě mluvit klidně, jako maminka, která nese kakao.",
  "Neotravovat. Když se musí volat, začít větou: Dobrý den, dneska vám to mimořádně sluší i po telefonu.",
  "Vůbec nezvyšovat hlas. Zákazník má rád tón: hodná paní učitelka na výletě.",
  "Mluvit zdrobnělinami: krabička, masíčko, rýžička, fakturka. Jinak prý menu ztratí kouzlo.",
  "Lichotit přiměřeně. Ideální věta: Vaše objednávková morálka je inspirací pro celý okres.",
  "Nevolat dopoledne. Zákazník tvrdí, že před dvanáctou není člověk, ale rozpracovaný koncept.",
  "Nechat domluvit. I když vysvětluje rozdíl mezi krůtou a krůtím životním stylem.",
  "Při předání se neusmívat moc široce. Minule si myslel, že mu vezeme špatné makroživiny.",
  "Mluvit velmi pomalu. Zákazník si každou větu ukládá do vnitřního Excelu.",
  "Neříkat slovo dieta. Používat výraz hrdinský potravinový plán.",
  "Řidič nesmí říct dobrou chuť dřív než po očním kontaktu. Zákazník to bere jako rituál.",
  "Při reklamaci nejdřív pochválit jeho trpělivost. Pak teprve řešit, že si spletl úterý se čtvrtkem.",
  "Nevolat, jen SMS. Telefon prý u něj spouští pracovní režim a ten nechce potkat.",
  "Při doručení neříkat, že je to těžké. Zákazník tomu říká kalorická zodpovědnost.",
  "Mluvit jako maminka: pomaličku, mile, bez křiku a s pocitem, že všechno dobře dopadne.",
  "Extra lichotit: zákazník má rád, když se jeho low carb bere jako životní filozofie, ne jako oběd.",
];

initialCustomers = initialCustomers.map((customer, index) =>
  index < Math.ceil(initialCustomers.length / 2)
    ? { ...customer, note: funnyCustomerNotes[index % funnyCustomerNotes.length] }
    : customer
);

const crazyAllergies = [
  "údajně alergie na kulatou rýži, hranaté těstoviny a moc sebevědomou brokolici",
  "nesnáší rajčata, která se tváří jako ovoce; kuchyň raději označit červeně",
  "údajná alergie na kuře, které vypadá zdravěji než zákazník",
  "alergie na příliš rovné okurky a mrkev nakrájenou bez emocí",
  "nesmí koriandr, kopr ani nic, co chutná jako rozhodnutí z minulého vztahu",
  "údajně alergie na jídlo bez omáčky; suchá příloha vyvolává filozofickou krizi",
  "nesnáší cibuli v jakékoli podobě; i kdyby byla jen v místnosti",
  "alergie na překvapení v salátu, hlavně kukuřici, hrášek a cizí ambice",
  "údajná alergie na tvaroh, který se tváří moc sportovně",
  "nesmí vejce, majonézu ani jídlo, které připomíná školní jídelnu",
  "alergie na papriku, která křupe hlasitěji než člověk při poradě",
  "údajně alergie na bezlepkové věci, které se chlubí, že jsou bezlepkové",
  "nesnáší banán v teplém jídle; zákazník to považuje za osobní útok",
  "alergie na hrášek ukrytý v rýži; detekuje ho pohledem přes krabičku",
  "údajně alergie na příliš malé porce a příliš velké sliby",
  "nesmí houby; tvrdí, že jim nevěří od roku 2009",
];

initialCustomers = initialCustomers.map((customer, index) =>
  index % 2 === 0
    ? { ...customer, allergies: crazyAllergies[index % crazyAllergies.length] }
    : customer
);

const funnyEmails = [
  "jarda.kulata-ryze-panika@krabickovy-chaos.cz",
  "roman.bezlaktozovy-syrovatko@mliko-nevolej.cz",
  "kacirek.lepek-detektor@sucharova-policie.cz",
  "pavel.nechat-u-recepce@neotravovat.cz",
  "bourka.orechovy-poplach@bouchne-to.cz",
  "petr.bourka.bez-hromu@klidny-rozvoz.cz",
  "pavel.briza.celerovy-alarm@zeleny-poplach.cz",
  "jan.firemni-recepce@excel-v-hlave.cz",
  "honza.krtek.bez-ryb@podzemni-losos.cz",
  "jiri.silhan.office-menu@tichy-hlad.cz",
  "fery.milko.bez-mlika@vecerni-krabicka.cz",
  "olinka.peclova.lepek-stop@ticha-sms.cz",
  "roman.karas.hrdinsky-plan@bez-malych-porci.cz",
  "petr.kautsky.laktoza-ne@mliko-v-karantene.cz",
  "michal.kolman.bezlepkovy-inspektor@strouhanka-stop.cz",
  "dolly.baster.arasidy-vyhostit@orechovy-soud.cz",
  "josefina.mucembacher.vetsi-porce@hlad-je-projekt.cz",
  "petra.hustazova.vejce-ne@omeleta-zakazana.cz",
  "martina.zolikova.fitko-v-krabicce@makra-a-slava.cz",
  "martin.muzicka.celer-nikdy@zelena-hrubka.cz",
  "zdenek.partik.soused-prevezme@krabicka-na-uteku.cz",
  "martin.balousek.bez-mlika@tvaroh-v-exilu.cz",
  "petr.vildum.volat-predem@ridic-se-boji.cz",
  "petr.nauch.horcice-stop@zluta-hrozba.cz",
  "sandra.antropiusova.hotove-prosim@cash-krabicka.cz",
  "marek.antropius.lepek-lovec@bezlepkovy-radar.cz",
  "orloj.horchoj.firemni-rozvoz@tik-tak-menu.cz",
  "cupakabra.orechy-vyhnat@nocni-rozvoz.cz",
  "katerina.milanova.redukce-s-usmevem@sliby-vetsi-nez-porce.cz",
  "petr.bednar.soja-vyhostena@omacka-bez-dramatu.cz",
  "jiri.tichy.deluxe-ticho@nemluvit-pri-jidle.cz",
];

initialCustomers = initialCustomers.map((customer, index) => ({
  ...customer,
  email: funnyEmails[index] || customer.email,
}));

const complexPlan = plans.find((p) => p.id === "deluxe-plus") || plans[plans.length - 1];
const complexDiets = ["individuální plán", "bezlepková", "bezlaktózová", "low carb", "fitness"];
const complexStatuses = ["zaplacená", "ve výrobě", "připravená", "předaná řidiči", "nová"];
const initialOrders = initialCustomers
  .slice(0, Math.round(initialCustomers.length * 0.9))
  .map((customer, index) => ({
    id: `OBJ-${String(1001 + index).padStart(4, "0")}`,
    date: `2026-04-${String(27 + (index % 3)).padStart(2, "0")}`,
    customer: customer.name,
    phone: customer.phone,
    diet: complexDiets[index % complexDiets.length],
    plan: complexPlan.name,
    meals: complexPlan.meals,
    days: 30,
    total: complexPlan.price * 30,
    payment: index % 5 === 4 ? "čeká na platbu" : "zaplaceno",
    status: complexStatuses[index % complexStatuses.length],
    route: routes[index % routes.length],
    driver: drivers[index % drivers.length],
    deliveryDay: deliveryDays[index % deliveryDays.length],
    address: customer.address,
    kitchenNote: `${customer.allergies ? `Alergie: ${customer.allergies}. ` : ""}Nejsložitější objednávka: ${complexPlan.name}, ${complexPlan.meals} jídel denně, individuální úprava menu, kontrola alergenů, přesné gramáže a popis na štítku.`,
    driverNote: customer.note || "Volat před doručením.",
    canEditUntil: "2026-04-24 12:00",
  }));

function mealPhotoSeed(text) {
  return Array.from(String(text || "Fit Slim")).reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 17), 731) % 999999;
}

function mealPhotoDescription(title) {
  const lower = String(title || "").toLowerCase();
  const parts = [];
  if (lower.includes("oves") || lower.includes("kaše")) parts.push("creamy oatmeal porridge in a round section of the container");
  if (lower.includes("rýžová kaše")) parts.push("creamy rice porridge");
  if (lower.includes("tvaroh")) parts.push("white quark cottage curd topping");
  if (lower.includes("řecký jogurt") || lower.includes("jogurt")) parts.push("thick Greek yogurt");
  if (lower.includes("cottage")) parts.push("cottage cheese");
  if (lower.includes("lesním") || lower.includes("malin") || lower.includes("ovoc")) parts.push("fresh berries and sliced fruit clearly visible");
  if (lower.includes("banán")) parts.push("banana slices");
  if (lower.includes("jabl")) parts.push("apple slices");
  if (lower.includes("müsli")) parts.push("crunchy muesli granola");
  if (lower.includes("palač")) parts.push("protein pancakes with berry topping");
  if (lower.includes("vejce benedikt")) parts.push("eggs benedict with poached eggs, avocado and hollandaise sauce");
  else if (lower.includes("omelet")) parts.push("folded omelette with visible ham and vegetables");
  else if (lower.includes("vejce")) parts.push("boiled eggs or scrambled eggs");
  if (lower.includes("šunk")) parts.push("lean ham slices");
  if (lower.includes("wrap")) parts.push("sliced tortilla wrap with visible filling");
  if (lower.includes("kuřecí")) parts.push("grilled chicken breast pieces");
  if (lower.includes("krůt")) parts.push("grilled turkey breast pieces");
  if (lower.includes("hověz") || lower.includes("wagyu")) parts.push(lower.includes("wagyu") ? "premium sliced wagyu steak" : "lean beef slices");
  if (lower.includes("vepř")) parts.push("pork tenderloin medallions");
  if (lower.includes("losos") || lower.includes("divoký")) parts.push("salmon fillet");
  if (lower.includes("treska")) parts.push("white cod fish fillet");
  if (lower.includes("tuňák")) parts.push("tuna pasta with visible tuna flakes");
  if (lower.includes("jerky")) parts.push("premium beef jerky strips with parmesan and olives");
  if (lower.includes("tofu")) parts.push("tofu cubes with vegetables");
  if (lower.includes("dhal") || lower.includes("čočk")) parts.push("lentil dhal curry with basmati rice");
  if (lower.includes("rýží") || lower.includes("basmati") || lower.includes("rýže")) parts.push("steamed rice");
  if (lower.includes("quino")) parts.push("quinoa");
  if (lower.includes("kuskus")) parts.push("couscous");
  if (lower.includes("těstov")) parts.push("pasta");
  if (lower.includes("brambor")) parts.push("boiled potatoes");
  if (lower.includes("batát")) parts.push("sweet potato mash or cubes");
  if (lower.includes("brokolic")) parts.push("bright green broccoli florets");
  if (lower.includes("špenát")) parts.push("spinach");
  if (lower.includes("fazolk")) parts.push("green beans");
  if (lower.includes("salát")) parts.push("fresh salad leaves");
  if (lower.includes("zelenin") || lower.includes("paprika") || lower.includes("okurka") || lower.includes("cuket")) parts.push("colorful fresh vegetables");
  if (lower.includes("avokád")) parts.push("avocado slices");
  if (lower.includes("pistáci")) parts.push("pistachios");
  if (lower.includes("mandl") || lower.includes("ořech")) parts.push("almonds and nuts");
  if (lower.includes("med")) parts.push("honey drizzle");
  if (lower.includes("kaka")) parts.push("cocoa topping");
  if (lower.includes("parmazán")) parts.push("parmesan shavings");
  if (lower.includes("oliv")) parts.push("olives");
  if (lower.includes("cherry")) parts.push("cherry tomatoes");
  if (lower.includes("chřest")) parts.push("green asparagus");
  if (lower.includes("knäck")) parts.push("crispbread on the side");
  if (lower.includes("chléb")) parts.push("rye bread slices");
  return parts.length ? parts.join(", ") : "healthy diet meal with real ingredients matching the dish name";
}

function realisticMealBoxPhoto(title) {
  const description = mealPhotoDescription(title);
  const seed = mealPhotoSeed(title);
  const prompt = [
    "ultra realistic commercial food photography",
    "real meal prep dish in a black plastic food box, transparent lid next to it",
    "shot as a real photograph, natural daylight, soft shadows, high detail, sharp focus",
    "the food must match exactly:",
    String(title || "healthy meal"),
    "visible ingredients:",
    description,
    "clean modern healthy diet meal prep, Czech fitness meal box",
    "no illustration, no cartoon, no drawing, no vector, no fake CGI, no text, no watermark, no logo"
  ].join(" ");
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=800&seed=${seed}&nologo=true&enhance=true&model=flux`;
}

function mealPhoto(title) {
  return realisticMealBoxPhoto(title);
}

const polishedMenuCovers = {
  "Slim 1600": realisticMealBoxPhoto("grilled chicken breast with steamed rice and broccoli, premium clean meal prep box"),
  "Active 1900": realisticMealBoxPhoto("grilled chicken breast with sweet potatoes and zucchini, premium clean meal prep box"),
  "Low Carb 1600": realisticMealBoxPhoto("salmon salad with egg and avocado, premium low carb meal prep box"),
  "Vege 1800": realisticMealBoxPhoto("lentil dhal with basmati rice and colorful vegetables, premium vegetarian meal prep box"),
  "Bez lepku 1800": realisticMealBoxPhoto("chicken breast with potatoes and broccoli, premium gluten free meal prep box"),
  "Fitness 2000": realisticMealBoxPhoto("pork tenderloin with sweet potatoes and zucchini, premium fitness meal prep box"),
};

const menuStyle = {
  "Slim 1600": { tone: "from-emerald-950/90 via-emerald-900/45 to-transparent", tag: "Lehké hubnutí", chip: "bg-emerald-100 text-emerald-900" },
  "Balance 1700": { tone: "from-blue-950/90 via-blue-900/45 to-transparent", tag: "Vyvážený den", chip: "bg-blue-100 text-blue-900" },
  "Balance 1800": { tone: "from-slate-950/90 via-slate-800/45 to-transparent", tag: "Silnější balance", chip: "bg-slate-100 text-slate-900" },
  "Active 1900": { tone: "from-orange-950/90 via-orange-900/45 to-transparent", tag: "Aktivní režim", chip: "bg-orange-100 text-orange-900" },
  "Sport 2000": { tone: "from-indigo-950/90 via-indigo-900/45 to-transparent", tag: "Sportovní výkon", chip: "bg-indigo-100 text-indigo-900" },
  "Low Carb 1600": { tone: "from-lime-950/90 via-lime-900/45 to-transparent", tag: "Nízké sacharidy", chip: "bg-lime-100 text-lime-900" },
  "Protein 1800": { tone: "from-cyan-950/90 via-cyan-900/45 to-transparent", tag: "Hodně bílkovin", chip: "bg-cyan-100 text-cyan-900" },
  "Vege 1800": { tone: "from-green-950/90 via-green-900/45 to-transparent", tag: "Vegetariánské", chip: "bg-green-100 text-green-900" },
  "Bez lepku 1800": { tone: "from-amber-950/90 via-amber-900/45 to-transparent", tag: "Bez lepku", chip: "bg-amber-100 text-amber-900" },
  "Fitness 2000": { tone: "from-rose-950/90 via-rose-900/45 to-transparent", tag: "Fitness režim", chip: "bg-rose-100 text-rose-900" },
  "VIP Dobrák menu": { tone: "from-yellow-950/90 via-yellow-900/45 to-transparent", tag: "VIP TOP", chip: "bg-yellow-100 text-yellow-950" },
};

const portionNames = ["Snídaně", "Svačina 1", "Oběd", "Svačina 2", "Večeře"];
const defaultGrams = [320, 220, 430, 190, 380];

const menuDefinitions = [
  { id: "menu-1", day: "Denní menu 1", name: "Slim 1600", targetKcal: 1600, totals: { kcal: 1640, protein: 146, carbs: 190, fat: 35, cost: 167 }, meals: [
    ["Ovesná kaše s tvarohem a lesním ovocem", 360, 26, 50, 6, 24, "lepek, mléko"],
    ["Cottage sýr se zeleninou a knäckebrotem", 240, 22, 22, 7, 31, "mléko, lepek"],
    ["Kuřecí prsa s rýží a brokolicí", 520, 48, 61, 13, 36, "může obsahovat celer"],
    ["Jablko s řeckým jogurtem", 190, 15, 25, 3, 18, "mléko"],
    ["Treska s bramborem a špenátem", 330, 35, 32, 6, 58, "ryby"],
  ]},
  { id: "menu-2", day: "Denní menu 2", name: "Balance 1700", targetKcal: 1700, totals: { kcal: 1730, protein: 151, carbs: 187, fat: 45, cost: 169 }, meals: [
    ["Řecký jogurt s müsli a jablkem", 390, 25, 50, 11, 29, "mléko, lepek, ořechy"],
    ["Vaječná omeleta se šunkou a rajčetem", 260, 24, 6, 15, 28, "vejce, mléko"],
    ["Krůtí maso s kuskusem a zeleninou", 520, 48, 60, 10, 43, "lepek"],
    ["Tvarohový dezert s malinami", 230, 24, 26, 3, 27, "mléko"],
    ["Tuňákové těstoviny se zeleninou", 330, 30, 45, 6, 42, "ryby, lepek, mléko"],
  ]},
  { id: "menu-3", day: "Denní menu 3", name: "Balance 1800", targetKcal: 1800, totals: { kcal: 1830, protein: 144, carbs: 189, fat: 52, cost: 208 }, meals: [
    ["Proteinové palačinky s lesním ovocem", 430, 38, 45, 10, 37, "vejce, mléko, lepek"],
    ["Cottage sýr, paprika, okurka, žitný chléb", 260, 24, 28, 6, 34, "mléko, lepek"],
    ["Hovězí s bramborem a fazolkami", 530, 40, 51, 16, 53, "mléko"],
    ["Banán s bílým jogurtem", 220, 12, 35, 3, 17, "mléko"],
    ["Losos s bramborem a salátem", 390, 30, 30, 17, 67, "ryby"],
  ]},
  { id: "menu-4", day: "Denní menu 4", name: "Active 1900", targetKcal: 1900, totals: { kcal: 1920, protein: 162, carbs: 233, fat: 39, cost: 173 }, meals: [
    ["Ovesná kaše s banánem, tvarohem a medem", 430, 30, 70, 6, 25, "lepek, mléko"],
    ["Šunkový wrap se zeleninou", 300, 25, 32, 8, 33, "lepek, mléko"],
    ["Kuřecí prsa s batáty a cuketou", 540, 47, 55, 13, 45, "může obsahovat celer"],
    ["Tvaroh s kakaem a malinami", 260, 28, 28, 4, 31, "mléko"],
    ["Hovězí chilli s rýží", 390, 32, 48, 8, 39, "může obsahovat celer"],
  ]},
  { id: "menu-5", day: "Denní menu 5", name: "Sport 2000", targetKcal: 2000, totals: { kcal: 2040, protein: 182, carbs: 198, fat: 58, cost: 199 }, meals: [
    ["Proteinové palačinky s tvarohem a ovocem", 480, 44, 50, 13, 37, "vejce, mléko, lepek"],
    ["Řecký jogurt s müsli a ořechy", 340, 24, 35, 12, 30, "mléko, lepek, ořechy"],
    ["Krůtí prsa s quinoou a zeleninou", 540, 50, 55, 12, 55, "—"],
    ["Cottage sýr s vejcem a zeleninou", 290, 30, 8, 14, 32, "mléko, vejce"],
    ["Tuňákové těstoviny se zeleninou", 390, 34, 50, 7, 45, "ryby, lepek, mléko"],
  ]},
  { id: "menu-6", day: "Denní menu 6", name: "Low Carb 1600", targetKcal: 1600, totals: { kcal: 1640, protein: 163, carbs: 58, fat: 85, cost: 225 }, meals: [
    ["Vaječná omeleta se šunkou a špenátem", 350, 33, 7, 21, 36, "vejce, mléko"],
    ["Tvaroh s malinami a mandlemi", 250, 28, 18, 8, 34, "mléko, ořechy"],
    ["Kuřecí prsa se zeleninou a avokádem", 470, 45, 18, 24, 52, "—"],
    ["Cottage sýr s okurkou a semínky", 230, 25, 9, 10, 31, "mléko, může obsahovat sezam"],
    ["Losos se salátem a vejcem", 340, 32, 6, 22, 72, "ryby, vejce"],
  ]},
  { id: "menu-7", day: "Denní menu 7", name: "Protein 1800", targetKcal: 1800, totals: { kcal: 1840, protein: 186, carbs: 198, fat: 35, cost: 207 }, meals: [
    ["Tvarohová kaše s proteinem a vločkami", 410, 45, 45, 6, 36, "mléko, lepek"],
    ["Kuřecí wrap se zeleninou", 360, 38, 35, 8, 39, "lepek, mléko"],
    ["Hovězí s rýží a fazolemi", 530, 45, 60, 13, 48, "může obsahovat celer"],
    ["Řecký jogurt s ovocem", 210, 20, 28, 2, 19, "mléko"],
    ["Treska s quinoou a špenátem", 330, 38, 30, 6, 65, "ryby"],
  ]},
  { id: "menu-8", day: "Denní menu 8", name: "Vege 1800", targetKcal: 1800, totals: { kcal: 1840, protein: 120, carbs: 236, fat: 48, cost: 135 }, meals: [
    ["Ovesná kaše s tvarohem a ovocem", 400, 28, 62, 7, 25, "lepek, mléko"],
    ["Vejce, žitný chléb a zelenina", 280, 18, 28, 11, 25, "vejce, lepek"],
    ["Čočkový dhal s basmati rýží", 560, 26, 90, 10, 21, "může obsahovat hořčici, celer"],
    ["Cottage sýr s rajčetem a semínky", 240, 24, 10, 10, 30, "mléko"],
    ["Tofu s rýžovými nudlemi a zeleninou", 360, 24, 46, 10, 34, "sója, sezam, lepek"],
  ]},
  { id: "menu-9", day: "Denní menu 9", name: "Bez lepku 1800", targetKcal: 1800, totals: { kcal: 1820, protein: 160, carbs: 189, fat: 48, cost: 195 }, meals: [
    ["Rýžová kaše s tvarohem a banánem", 400, 28, 65, 5, 28, "mléko"],
    ["Jogurt s ovocem a mandlemi", 260, 18, 28, 9, 29, "mléko, ořechy"],
    ["Kuřecí prsa s bramborem a brokolicí", 520, 48, 50, 13, 39, "—"],
    ["Vejce s cottage sýrem a zeleninou", 250, 26, 8, 13, 29, "vejce, mléko"],
    ["Treska s quinoou a špenátem", 390, 40, 38, 8, 70, "ryby"],
  ]},
  { id: "menu-10", day: "Denní menu 10", name: "Fitness 2000", targetKcal: 2000, totals: { kcal: 2030, protein: 186, carbs: 210, fat: 54, cost: 195 }, meals: [
    ["Ovesná proteinová kaše s banánem", 480, 40, 70, 8, 34, "mléko, lepek"],
    ["Šunková omeleta se zeleninou", 300, 30, 6, 17, 34, "vejce, mléko"],
    ["Kuřecí prsa s rýží a brokolicí", 560, 48, 61, 13, 36, "může obsahovat celer"],
    ["Tvarohový dezert s kakaem a malinami", 300, 34, 35, 5, 33, "mléko"],
    ["Vepřová panenka s batáty a cuketou", 390, 34, 38, 11, 58, "může obsahovat celer"],
  ]},
  { id: "menu-11", day: "Denní menu 11", name: "VIP Dobrák menu", targetKcal: 2868, targetKj: 12000, premium: true, coverImage: vipDobrakPhoto, totals: { kcal: 2870, protein: 231, carbs: 278, fat: 94, cost: 790 }, meals: [
    ["Bio vejce Benedikt s avokádem a lanýžovým olejem", 590, 42, 36, 31, 148, "vejce, mléko"],
    ["Řecký jogurt s pistáciemi, medem a lesním ovocem", 430, 32, 42, 16, 96, "mléko, ořechy"],
    ["Wagyu steak s batátovým pyré a zeleným chřestem", 860, 68, 72, 32, 265, "mléko"],
    ["Premium jerky s parmazánem, olivami a cherry rajčaty", 380, 41, 12, 20, 86, "mléko"],
    ["Divoký losos s quinoou, avokádem a limetkovým salátem", 610, 48, 58, 25, 195, "ryby"],
  ]},
];

const weeklyMenu = menuDefinitions.flatMap((menu) => menu.meals.map(([title, kcal, protein, carbs, fat, cost, allergens], index) => ({
  id: `${menu.id}-${index + 1}`,
  day: menu.day,
  menuName: menu.name,
  targetKcal: menu.targetKcal,
  menuTotals: menu.totals,
  portionNumber: index + 1,
  meal: portionNames[index],
  title,
  grams: defaultGrams[index],
  kcal,
  protein,
  carbs,
  fat,
  cost,
  allergens: allergens === "—" ? "" : allergens,
  diets: menu.name.toLowerCase().includes("vip") ? ["VIP", "top suroviny"] : menu.name.toLowerCase().includes("vege") ? ["vegetariánská"] : menu.name.toLowerCase().includes("low carb") ? ["low carb"] : menu.name.toLowerCase().includes("bez lepku") ? ["bezlepková"] : menu.name.toLowerCase().includes("sport") || menu.name.toLowerCase().includes("fitness") || menu.name.toLowerCase().includes("protein") ? ["fitness"] : ["redukční", "balance"],
  photo: mealPhoto(title),
  portions: 100,
})));

function recipeFromTitle(title) {
  const lower = title.toLowerCase();
  const list = [];
  const add = (ingredient, perPortion, unit = "g") => list.push({ ingredient, perPortion, unit });
  if (lower.includes("oves")) { add("Ovesné vločky", 65); add("Tvaroh", 120); }
  if (lower.includes("rýžová kaše")) { add("Rýže", 80); add("Tvaroh", 120); }
  if (lower.includes("palač")) { add("Protein", 30); add("Vejce", 1, "ks"); add("Mouka", 45); add("Tvaroh", 100); }
  if (lower.includes("jogurt")) add("Řecký jogurt", 180);
  if (lower.includes("bio vejce")) add("Bio vejce", 2, "ks");
  if (lower.includes("benedikt")) add("Holandská omáčka", 45);
  if (lower.includes("lanýž")) add("Lanýžový olej", 8);
  if (lower.includes("wagyu")) add("Wagyu hovězí steak", 220);
  if (lower.includes("chřest")) add("Zelený chřest", 140);
  if (lower.includes("pistáci")) add("Pistácie", 30);
  if (lower.includes("med")) add("Med", 20);
  if (lower.includes("jerky")) add("Jerky sušené maso Premium", 60);
  if (lower.includes("parmazán")) add("Parmazán", 35);
  if (lower.includes("oliv")) add("Olivy", 45);
  if (lower.includes("cherry")) add("Cherry rajčata", 90);
  if (lower.includes("divoký losos")) add("Divoký losos", 180);
  if (lower.includes("tvaroh")) add("Tvaroh", 180);
  if (lower.includes("cottage")) add("Cottage", 160);
  if (lower.includes("müsli")) add("Müsli", 55);
  if (lower.includes("ovoce") || lower.includes("lesním") || lower.includes("malin")) add("Ovoce", 80);
  if (lower.includes("banán")) add("Banán", 120);
  if (lower.includes("jablko")) add("Jablko", 120);
  if (lower.includes("vejce") || lower.includes("omelet")) add("Vejce", 2, "ks");
  if (lower.includes("šunk")) add("Šunka", 60);
  if (lower.includes("wrap")) add("Tortilla", 85);
  if (lower.includes("kuřecí")) add("Kuřecí prsa", 180);
  if (lower.includes("krůt")) add("Krůtí maso", 180);
  if (lower.includes("hověz")) add("Hovězí maso", 170);
  if (lower.includes("vepř")) add("Vepřová panenka", 170);
  if (lower.includes("losos") && !lower.includes("divoký losos")) add("Losos", 150);
  if (lower.includes("treska")) add("Treska", 180);
  if (lower.includes("tuňák")) add("Tuňák", 120);
  if (lower.includes("tofu")) add("Tofu", 160);
  if (lower.includes("dhal") || lower.includes("čočk")) add("Čočka", 140);
  if (lower.includes("rýží") || lower.includes("basmati") || lower.includes("chilli s rýží")) add("Rýže", 85);
  if (lower.includes("kuskus")) add("Kuskus", 90);
  if (lower.includes("quino")) add("Quinoa", 80);
  if (lower.includes("těstov")) add("Těstoviny", 95);
  if (lower.includes("brambor")) add("Brambory", 230);
  if (lower.includes("batát")) add("Batáty", 220);
  if (lower.includes("brokolic")) add("Brokolice", 140);
  if (lower.includes("špenát")) add("Špenát", 120);
  if (lower.includes("zelenin") || lower.includes("salát") || lower.includes("paprika") || lower.includes("okurka") || lower.includes("cuket")) add("Zelenina", 160);
  if (lower.includes("avokád")) add("Avokádo", 70);
  if (lower.includes("mandl") || lower.includes("ořech")) add("Ořechy", 25);
  if (lower.includes("semín")) add("Semínka", 20);
  if (lower.includes("knäck")) add("Knäckebrot", 35);
  if (lower.includes("chléb")) add("Žitný chléb", 60);
  if (list.length === 0) add("Základní surovina", 100);
  return list;
}

const recipes = weeklyMenu.flatMap((meal) => recipeFromTitle(meal.title).map((recipe) => ({ menuName: meal.menuName, meal: meal.title, ...recipe })));

const initialStock = [
  { id: "S001", name: "Tortilla", category: "pečivo", stock: 34000, min: 40000, unit: "g", supplier: "Lidl", price: 0.11 },
  { id: "S002", name: "Šunka", category: "uzenina", stock: 3200, min: 2000, unit: "g", supplier: "Makro s.r.o.", price: 0.185 },
  { id: "S003", name: "Sýr", category: "mléčné", stock: 2500, min: 2000, unit: "g", supplier: "Kaufland", price: 0.19 },
  { id: "S004", name: "Těstoviny", category: "příloha", stock: 10000, min: 6000, unit: "g", supplier: "Tesco", price: 0.048 },
  { id: "S005", name: "Rajčatová omáčka", category: "zelenina", stock: 4000, min: 5000, unit: "g", supplier: "Penny Market", price: 0.055 },
  { id: "S006", name: "Vepřová panenka", category: "maso", stock: 1500, min: 3000, unit: "g", supplier: "Makro s.r.o.", price: 0.21 },
  { id: "S007", name: "Krůtí maso", category: "maso", stock: 4100, min: 4000, unit: "g", supplier: "Makro s.r.o.", price: 0.159 },
  { id: "S008", name: "Brambory", category: "příloha", stock: 8500, min: 12000, unit: "g", supplier: "Kaufland", price: 0.018 },
  { id: "S009", name: "Jerky sušené maso Premium", category: "sušené maso", stock: 1200, min: 2000, unit: "g", supplier: "Jerky sušené maso Premium – Jakub Horáček", price: 0.89 },
  { id: "S010", name: "Krabička 1000 ml", category: "obal", stock: 340, min: 500, unit: "ks", supplier: "Makro s.r.o.", price: 4 },
  { id: "S011", name: "Etiketa", category: "obal", stock: 620, min: 800, unit: "ks", supplier: "Tesco", price: 1 },
];

const communications = [
  { trigger: "Vytvoření objednávky", channel: "E-mail", text: "Děkujeme za objednávku. Přehled a platební údaje najdete níže." },
  { trigger: "Zaplacení", channel: "E-mail", text: "Platbu jsme přijali. Objednávka je potvrzena." },
  { trigger: "Předáno řidiči", channel: "SMS", text: "Krabičky byly předány řidiči. Přibližný čas doručení: 16:00–18:00." },
  { trigger: "Doručeno", channel: "SMS", text: "Objednávka byla doručena. Dobrou chuť." },
  { trigger: "Faktura", channel: "E-mail", text: "V příloze zasíláme fakturu k objednávce." },
  { trigger: "Další týden", channel: "E-mail/SMS", text: "Nezapomeňte si objednat menu na další týden." },
];

const cashflowData = [
  { month: "Leden", revenue: 284000, food: 64000, wages: 72000, rent: 22000, delivery: 18000, marketing: 12000, packaging: 16000, energy: 14000, other: 9000, receivables: 22000, payables: 31000 },
  { month: "Únor", revenue: 312000, food: 69000, wages: 74000, rent: 22000, delivery: 19500, marketing: 14500, packaging: 17000, energy: 13200, other: 8200, receivables: 19000, payables: 29000 },
  { month: "Březen", revenue: 356000, food: 76000, wages: 79000, rent: 22000, delivery: 21500, marketing: 17000, packaging: 18600, energy: 12800, other: 9100, receivables: 26000, payables: 33000 },
  { month: "Duben", revenue: 398000, food: 84500, wages: 83000, rent: 22000, delivery: 23600, marketing: 18000, packaging: 20400, energy: 12400, other: 10400, receivables: 24000, payables: 36000 },
  { month: "Květen", revenue: 442000, food: 96000, wages: 88000, rent: 22000, delivery: 25900, marketing: 22000, packaging: 23000, energy: 11800, other: 11200, receivables: 31000, payables: 42000 },
  { month: "Červen", revenue: 489000, food: 106000, wages: 94000, rent: 22000, delivery: 28900, marketing: 24000, packaging: 25500, energy: 12200, other: 12600, receivables: 28000, payables: 45500 },
  { month: "Červenec", revenue: 535000, food: 118000, wages: 101000, rent: 22000, delivery: 31500, marketing: 26000, packaging: 28400, energy: 14200, other: 13800, receivables: 35000, payables: 49200 },
  { month: "Srpen", revenue: 592000, food: 131000, wages: 108000, rent: 22000, delivery: 34800, marketing: 30500, packaging: 30600, energy: 15600, other: 15400, receivables: 42000, payables: 52800 },
  { month: "Září", revenue: 628000, food: 142000, wages: 114000, rent: 22000, delivery: 36700, marketing: 32200, packaging: 32600, energy: 14900, other: 16100, receivables: 37000, payables: 55000 },
  { month: "Říjen", revenue: 671000, food: 151000, wages: 119000, rent: 22000, delivery: 38900, marketing: 34800, packaging: 34800, energy: 16300, other: 17700, receivables: 44000, payables: 58200 },
  { month: "Listopad", revenue: 716000, food: 165000, wages: 128000, rent: 22000, delivery: 41800, marketing: 38000, packaging: 37200, energy: 18100, other: 19600, receivables: 48000, payables: 64100 },
  { month: "Prosinec", revenue: 784000, food: 181000, wages: 136000, rent: 22000, delivery: 45600, marketing: 42000, packaging: 40500, energy: 20500, other: 22800, receivables: 53000, payables: 69000 },
];

function money(v) { return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(Number(v) || 0); }
function num(v) { return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 2 }).format(Number(v) || 0); }
function cls(...v) { return v.filter(Boolean).join(" "); }
function stockTone(item) { return item.stock < item.min ? "red" : item.stock < item.min * 1.4 ? "amber" : "green"; }
function statusTone(s) { return s === "zaplacená" || s === "doručena" ? "green" : s === "zrušena" || s === "reklamace" ? "red" : s === "nová" ? "blue" : "amber"; }

function Badge({ children, tone = "gray" }) {
  const tones = { gray: "bg-slate-100 text-slate-700", green: "bg-emerald-100 text-emerald-800", blue: "bg-blue-100 text-blue-800", amber: "bg-amber-100 text-amber-800", red: "bg-rose-100 text-rose-800", dark: "bg-slate-950 text-white" };
  return <span className={cls("inline-flex rounded-full px-3 py-1 text-xs font-black", tones[tone] || tones.gray)}>{children}</span>;
}
function Card({ children, className = "" }) { return <div className={cls("rounded-3xl border border-slate-200 bg-white shadow-sm", className)}>{children}</div>; }
function Button({ children, className = "", ...props }) { return <button {...props} className={cls("rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white hover:bg-emerald-700 disabled:opacity-50", className)}>{children}</button>; }
function Input(props) { return <input {...props} className={cls("rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500", props.className)} />; }
function Select(props) { return <select {...props} className={cls("rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500", props.className)} />; }
function Stat({ title, value, sub }) { return <Card className="p-5"><p className="text-sm font-semibold text-slate-500">{title}</p><p className="mt-1 text-3xl font-black">{value}</p><p className="mt-1 text-xs text-slate-400">{sub}</p></Card>; }
function PageHead({ badge, title, text }) { return <div className="mb-8"><Badge>{badge}</Badge><h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{title}</h1><p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">{text}</p></div>; }
function DataTable({ headers, children }) { return <div className="overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr>{headers.map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>; }

function useNotice() {
  const [notice, setNotice] = useState("");
  const show = (text) => { setNotice(text); window.setTimeout(() => setNotice(""), 3000); };
  const Notice = () => notice ? <div className="fixed bottom-4 right-4 z-[100] max-w-sm rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white shadow-xl">{notice}</div> : null;
  return { show, Notice };
}

function csvCell(value) {
  const LF = String.fromCharCode(10);
  const CR = String.fromCharCode(13);
  const quote = String.fromCharCode(34);
  const text = String(value ?? "")
    .split(quote).join(quote + quote)
    .split(LF).join(" ")
    .split(CR).join(" ");
  return quote + text + quote;
}

function makeCsv(headers, rows) {
  const CRLF = String.fromCharCode(13) + String.fromCharCode(10);
  return [headers, ...rows].map((row) => row.map(csvCell).join(";")).join(CRLF);
}

function createExportPanel({ title, filename, content, type = "text/csv;charset=utf-8", isHtml = false }) {
  const old = document.getElementById("fit-slim-export-panel");
  if (old) old.remove();

  const wrapper = document.createElement("div");
  wrapper.id = "fit-slim-export-panel";
  wrapper.style.position = "fixed";
  wrapper.style.inset = "0";
  wrapper.style.zIndex = "99999";
  wrapper.style.background = "rgba(15,23,42,0.72)";
  wrapper.style.padding = "24px";
  wrapper.style.overflow = "auto";

  const panel = document.createElement("div");
  panel.style.maxWidth = "1100px";
  panel.style.margin = "0 auto";
  panel.style.background = "white";
  panel.style.borderRadius = "24px";
  panel.style.padding = "18px";
  panel.style.boxShadow = "0 25px 80px rgba(0,0,0,0.35)";

  const heading = document.createElement("h2");
  heading.textContent = title;
  heading.style.margin = "0 0 12px";
  heading.style.fontFamily = "Arial, sans-serif";

  const note = document.createElement("p");
  note.textContent = isHtml
    ? "Tady je připravený tisk/PDF. Klikni na Tisk / uložit jako PDF. Když prohlížeč blokuje tisk, použij Otevřít v nové záložce."
    : "Soubor je připravený. Klikni na Stáhnout soubor. Když prohlížeč stahování zablokuje, zkopíruj obsah ručně.";
  note.style.margin = "0 0 14px";
  note.style.color = "#475569";
  note.style.fontFamily = "Arial, sans-serif";

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.flexWrap = "wrap";
  actions.style.gap = "8px";
  actions.style.marginBottom = "14px";

  function makeButton(label, onClick, primary = false) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.type = "button";
    btn.style.border = "0";
    btn.style.borderRadius = "14px";
    btn.style.padding = "10px 14px";
    btn.style.fontWeight = "800";
    btn.style.cursor = "pointer";
    btn.style.background = primary ? "#059669" : "#e2e8f0";
    btn.style.color = primary ? "white" : "#0f172a";
    btn.onclick = onClick;
    return btn;
  }

  actions.appendChild(makeButton(isHtml ? "Tisk / uložit jako PDF" : "Stáhnout soubor", () => {
    if (isHtml) {
      const frame = document.getElementById("fit-slim-print-frame");
      if (frame?.contentWindow) {
        frame.contentWindow.focus();
        frame.contentWindow.print();
      }
      return;
    }
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }, true));

  actions.appendChild(makeButton(isHtml ? "Otevřít v nové záložce" : "Kopírovat obsah", async () => {
    if (isHtml) {
      const blob = new Blob([content], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      window.setTimeout(() => URL.revokeObjectURL(url), 5000);
      return;
    }
    try {
      await navigator.clipboard.writeText(content);
      alert("Obsah exportu je zkopírovaný.");
    } catch {
      alert("Kopírování se nepodařilo. Označ text v poli a zkopíruj ho ručně.");
    }
  }));

  actions.appendChild(makeButton("Zavřít", () => wrapper.remove()));

  panel.appendChild(heading);
  panel.appendChild(note);
  panel.appendChild(actions);

  if (isHtml) {
    const iframe = document.createElement("iframe");
    iframe.id = "fit-slim-print-frame";
    iframe.style.width = "100%";
    iframe.style.height = "70vh";
    iframe.style.border = "1px solid #cbd5e1";
    iframe.style.borderRadius = "16px";
    iframe.srcdoc = content;
    panel.appendChild(iframe);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.style.width = "100%";
    textarea.style.height = "60vh";
    textarea.style.border = "1px solid #cbd5e1";
    textarea.style.borderRadius = "16px";
    textarea.style.padding = "12px";
    textarea.style.fontFamily = "monospace";
    textarea.style.fontSize = "12px";
    panel.appendChild(textarea);
  }

  wrapper.appendChild(panel);
  document.body.appendChild(wrapper);
}

function downloadCsv(filename, headers, rows) {
  const csv = String.fromCharCode(65279) + makeCsv(headers, rows);
  createExportPanel({ title: `Export: ${filename}`, filename, content: csv });
}

function openPrintable(title, html) {
  const styles = `<style>body{font-family:Arial,sans-serif;margin:24px;color:#0f172a}h1{font-size:24px}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #cbd5e1;padding:7px;text-align:left;vertical-align:top}th{background:#f1f5f9}.labels{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.label{border:1px dashed #334155;border-radius:10px;padding:12px;min-height:135px;page-break-inside:avoid}.barcode{font-family:monospace;background:#f8fafc;padding:6px;margin-top:8px}.page-break{page-break-before:always}@media print{body{margin:10mm}.label{break-inside:avoid}}</style>`;
  const doc = `<!doctype html><html><head><meta charset="utf-8"/><title>${title}</title>${styles}</head><body>${html}</body></html>`;
  createExportPanel({ title: `Tisk/PDF: ${title}`, filename: `${title}.html`, content: doc, type: "text/html;charset=utf-8", isHtml: true });
}

function orderRows(orders) { return orders.map((o) => [o.id, o.date, o.customer, o.phone, o.diet, o.plan, o.meals, o.days, o.total, o.payment, o.status, o.route, o.driver, o.address, o.kitchenNote, o.driverNote]); }
function exportOrders(orders) { downloadCsv("fit-slim-objednavky.csv", ["Objednávka", "Datum", "Zákazník", "Telefon", "Dieta", "Program", "Jídel", "Dní", "Cena", "Platba", "Stav", "Trasa", "Řidič", "Adresa", "Kuchyň", "Řidič"], orderRows(orders)); }
function printOrders(orders) { openPrintable("Objednávky", `<h1>Fit Slim – objednávky</h1><table><thead><tr>${["Objednávka", "Datum", "Zákazník", "Telefon", "Dieta", "Program", "Jídel", "Dní", "Cena", "Platba", "Stav", "Trasa", "Řidič", "Adresa", "Kuchyň", "Řidič"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${orderRows(orders).map((r) => `<tr>${r.map((c) => `<td>${c ?? ""}</td>`).join("")}</tr>`).join("")}</tbody></table>`); }
function printLabels(orders) {
  const labels = orders.flatMap((o) => Array.from({ length: Number(o.meals) || 1 }, (_, i) => ({ ...o, no: i + 1 })));
  openPrintable("Štítky", `<h1>Fit Slim – štítky na krabičky</h1><p>Počet štítků: ${labels.length}</p><div class="labels">${labels.map((o) => `<div class="label"><h2>${o.customer}</h2><p><b>Obj.:</b> ${o.id}</p><p><b>Jídlo:</b> ${o.no}/${o.meals} · ${o.plan}</p><p><b>Dieta:</b> ${o.diet}</p><p><b>Alergie:</b> ${o.kitchenNote || "—"}</p><p><b>Adresa:</b> ${o.address}</p><div class="barcode">${o.id}-${o.no}</div></div>`).join("")}</div>`);
}
function exportPayments(orders) { downloadCsv("fit-slim-platby.csv", ["Objednávka", "Zákazník", "Cena", "Platba", "Stav", "Datum", "VS"], orders.map((o) => [o.id, o.customer, o.total, o.payment, o.status, o.date, String(o.id).replaceAll("OBJ-", "")])); }
function printInvoices(orders) { openPrintable("Faktury", orders.map((o, i) => `<section class="${i ? "page-break" : ""}"><h1>Faktura / doklad</h1><p><b>Dodavatel:</b> ${company.name}, ${company.address}, IČO: ${company.ico}</p><p><b>Odběratel:</b> ${o.customer}, ${o.address}</p><p><b>Objednávka:</b> ${o.id}</p><table><tbody><tr><td>${o.plan} · ${o.diet}</td><td>${o.days} dní × ${o.meals} jídel</td><td>${money(o.total)}</td></tr></tbody></table><h2>Celkem: ${money(o.total)}</h2><p>Účet: ${company.bankAccount}</p></section>`).join("")); }
function exportDelivery(orders) { downloadCsv("fit-slim-rozvoz.csv", ["Pořadí", "Zákazník", "Telefon", "Adresa", "Trasa", "Řidič", "Poznámka", "Stav"], orders.map((o, i) => [i + 1, o.customer, o.phone, o.address, o.route, o.driver, o.driverNote, o.status])); }
function printDelivery(orders) { openPrintable("Rozvoz", `<h1>Fit Slim – rozvozový list</h1><table><thead><tr>${["Pořadí", "Zákazník", "Telefon", "Adresa", "Trasa", "Řidič", "Poznámka", "Stav"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${orders.map((o, i) => `<tr><td>${i + 1}</td><td>${o.customer}</td><td>${o.phone}</td><td>${o.address}</td><td>${o.route}</td><td>${o.driver}</td><td>${o.driverNote}</td><td>${o.status}</td></tr>`).join("")}</tbody></table>`); }

function AppNav({ active, setActive }) {
  const items = [["web", "Web pro zákazníky"], ["customer", "Zákaznický účet"], ["worker", "Výroba / sklad / rozvoz"], ["admin", "Administrace"]];
  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between"><button onClick={() => setActive("web")} className="flex items-center gap-3 text-left"><div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow ring-1 ring-slate-200"><img src={img.logo} alt="Fit Slim" className="h-full w-full object-contain" /></div><div><p className="text-lg font-black">{company.name}</p><p className="text-xs font-bold text-emerald-700">{company.phone}</p></div></button><nav className="flex flex-wrap gap-2">{items.map(([id, label]) => <button key={id} onClick={() => setActive(id)} className={cls("rounded-full px-3 py-2 text-sm font-black", active === id ? "bg-slate-950 text-white" : "hover:bg-slate-100")}>{label}</button>)}</nav></div></header>;
}

function LoginGate({ title, password, onLogin }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  function submit(e) { e.preventDefault(); if (input.trim().toLowerCase() === password) onLogin(); else setError("Špatné heslo."); }
  return <main className="mx-auto max-w-xl px-4 py-16"><Card className="p-8"><Badge tone="dark">Chráněná sekce</Badge><h1 className="mt-4 text-4xl font-black">{title}</h1><p className="mt-3 text-slate-600">Zadej heslo pro vstup.</p><form onSubmit={submit} className="mt-6 grid gap-4"><Input type="password" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Heslo" autoFocus /><Button>Vstoupit</Button>{error && <Badge tone="red">{error}</Badge>}</form><p className="mt-4 text-sm text-slate-500">Demo heslo: <b>{password}</b></p></Card></main>;
}

function WebPage({ setActive }) {
  const [selectedPublicMenuId, setSelectedPublicMenuId] = useState(null);
  const [selectedPublicMealId, setSelectedPublicMealId] = useState(null);
  const selectedPublicMenu = menuDefinitions.find((menu) => menu.id === selectedPublicMenuId);
  const selectedPublicMeals = selectedPublicMenu ? weeklyMenu.filter((meal) => meal.menuName === selectedPublicMenu.name) : [];
  const selectedPublicMeal = selectedPublicMeals.find((meal) => meal.id === selectedPublicMealId) || selectedPublicMeals[0];
  const selectedPublicRecipes = selectedPublicMeal ? recipes.filter((r) => r.meal === selectedPublicMeal.title && r.menuName === selectedPublicMeal.menuName) : [];

  function openPublicMenu(menu, mealId = null) {
    const menuMeals = weeklyMenu.filter((meal) => meal.menuName === menu.name);
    setSelectedPublicMenuId(menu.id);
    setSelectedPublicMealId(mealId || menuMeals[0]?.id || null);
  }

  return <main>
    <section className="relative overflow-hidden bg-slate-950 text-white"><img src={img.hero} alt="Fit Slim jídlo" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"><div><Badge tone="dark">{company.claim}</Badge><h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">Denní menu U Jakuba</h1><p className="mt-6 max-w-2xl text-xl leading-9 text-slate-100">Moderní hlavní stránka pro výběr denního menu, objednávku krabičkové diety a přístup do administrace. Web má nastavený název stránky, manifest a barvu aplikace.</p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={() => setActive("customer")}>Objednat menu</Button><a href={`tel:${company.phoneRaw}`} className="rounded-2xl bg-white px-5 py-3 font-black text-slate-950 hover:bg-slate-100">Zavolat {company.phone}</a></div></div><Card className="border-white/20 bg-white/10 p-6 text-white backdrop-blur"><img src={img.logo} alt="Fit Slim" className="mb-6 max-h-20 rounded-2xl bg-white p-3" /><p><b>Objednávky:</b> {company.phone}</p><p className="mt-2"><b>E-mail:</b> {company.email}</p><p className="mt-2"><b>Rozvoz:</b> {company.delivery}</p><div className="mt-5 rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-100"><p className="font-black">Denní menu U Jakuba</p><p className="mt-1 text-slate-300">Manifest: /manifest.json</p><p className="text-slate-300">Theme color: #111111</p></div></Card></div></section>

    <section className="mx-auto max-w-7xl px-4 py-14"><div className="grid gap-5 md:grid-cols-3">{plans.slice(0, 3).map((p) => <Card key={p.id} className="overflow-hidden"><img src={p.image} alt={p.name} className="h-52 w-full object-cover" /><div className="p-6"><h3 className="text-2xl font-black">{p.name}</h3><p className="mt-2 text-slate-600">{p.kcal} kcal · {p.meals} jídel denně</p><p className="mt-4 text-3xl font-black">{money(p.price)} / den</p></div></Card>)}</div></section>

    <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4"><div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><Badge tone="green">Nově zařazeno</Badge><h2 className="mt-3 text-4xl font-black tracking-tight">Nová denní menu</h2><p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">Kliknutím na celý obrázek nebo název otevřeš celé denní menu. Kliknutím na snídani, svačinu, oběd nebo večeři se rovnou zobrazí detail konkrétního jídla. Ceny se v této veřejné části nezobrazují.</p></div><button onClick={() => setActive("customer")} className="rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white hover:bg-emerald-700">Objednat jídelníček</button></div>

      {selectedPublicMenu && <Card className="mb-8 overflow-hidden border-emerald-200 shadow-lg"><div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]"><div className="relative min-h-[340px] bg-slate-100"><img src={(selectedPublicMenu.coverImage || selectedPublicMeal?.photo || img.hero)} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt={selectedPublicMenu.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><Badge tone={selectedPublicMenu.premium ? "red" : "dark"}>{selectedPublicMenu.premium ? "VIP TOP" : selectedPublicMenu.day}</Badge><h3 className="mt-3 text-4xl font-black">{selectedPublicMenu.name}</h3><p className="mt-2 text-sm text-slate-100">Celý den rozepsaný do pěti jídel.</p></div></div><div className="p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-3xl font-black">Detail denního menu</h3><p className="mt-2 text-slate-600">Vyber konkrétní porci, nebo si dole projdi celý rozpis všech jídel.</p></div><button onClick={() => { setSelectedPublicMenuId(null); setSelectedPublicMealId(null); }} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black">Zavřít detail</button></div><div className="mt-5 grid gap-3 md:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">Kcal za den</p><b className="text-2xl">{selectedPublicMenu.totals.kcal}</b>{selectedPublicMenu.targetKj && <p className="text-xs font-bold text-amber-700">{num(selectedPublicMenu.targetKj)} kJ</p>}</div><div className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">P/S/T</p><b className="text-2xl">{selectedPublicMenu.totals.protein}/{selectedPublicMenu.totals.carbs}/{selectedPublicMenu.totals.fat}</b></div><div className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">Denních jídel</p><b className="text-2xl">5</b></div></div><div className="mt-5 flex flex-wrap gap-2">{selectedPublicMeals.map((meal) => <button key={meal.id} onClick={() => setSelectedPublicMealId(meal.id)} className={cls("rounded-full px-4 py-2 text-sm font-black", selectedPublicMeal?.id === meal.id ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-800 hover:bg-slate-200")}>{meal.meal}</button>)}</div>{selectedPublicMeal && <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5"><div className="grid gap-5 md:grid-cols-[220px_1fr]"><img src={selectedPublicMeal.photo || img.hero} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt={selectedPublicMeal.title} className="h-52 w-full rounded-3xl object-cover" /><div><Badge tone="blue">{selectedPublicMeal.meal}</Badge><h4 className="mt-3 text-3xl font-black">{selectedPublicMeal.title}</h4><p className="mt-2 text-slate-600">{selectedPublicMeal.kcal} kcal · bílkoviny {selectedPublicMeal.protein} g · sacharidy {selectedPublicMeal.carbs} g · tuky {selectedPublicMeal.fat} g · gramáž {selectedPublicMeal.grams} g</p><p className="mt-2 text-sm text-slate-500"><b>Alergeny:</b> {selectedPublicMeal.allergens || "bez uvedených alergenů"}</p><div className="mt-4 flex flex-wrap gap-2">{selectedPublicRecipes.map((r) => <Badge key={r.ingredient}>{r.ingredient} {num(r.perPortion)} {r.unit}</Badge>)}</div></div></div></div>}</div></div><div className="border-t bg-white p-6"><h4 className="text-2xl font-black">Všech 5 jídel v menu {selectedPublicMenu.name}</h4><div className="mt-4 grid gap-4 md:grid-cols-5">{selectedPublicMeals.map((meal) => <button key={meal.id} onClick={() => setSelectedPublicMealId(meal.id)} className={cls("rounded-3xl border p-3 text-left transition hover:-translate-y-1 hover:shadow-lg", selectedPublicMeal?.id === meal.id ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white")}><img src={meal.photo || img.hero} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt={meal.title} className="h-32 w-full rounded-2xl object-cover" /><Badge tone="blue">{meal.meal}</Badge><h5 className="mt-2 min-h-[60px] font-black leading-tight">{meal.title}</h5><p className="mt-2 text-xs text-slate-500">{meal.kcal} kcal · P/S/T {meal.protein}/{meal.carbs}/{meal.fat} g</p></button>)}</div></div></Card>}

      <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">{menuDefinitions.map((menu) => { const menuMeals = weeklyMenu.filter((meal) => meal.menuName === menu.name); const coverMeal = menuMeals[2] || menuMeals[0]; const coverImage = menu.coverImage || polishedMenuCovers[menu.name] || coverMeal?.photo || img.hero; const isOpen = selectedPublicMenuId === menu.id; const style = menuStyle[menu.name] || menuStyle["Slim 1600"]; return <Card key={menu.id} className={cls("group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-2xl", isOpen ? "ring-4 ring-emerald-400" : "")}><div className="relative h-72 overflow-hidden bg-slate-950"><button onClick={() => openPublicMenu(menu)} className="h-full w-full"><img src={coverImage} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt={menu.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /></button><div className={cls("absolute inset-0 bg-gradient-to-t", style.tone)} /><div className="absolute left-4 top-4 flex flex-wrap gap-2"><span className={cls("rounded-full px-3 py-1 text-xs font-black shadow", style.chip)}>{style.tag}</span><span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950 shadow">{menu.day}</span>{menu.targetKj && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-950 shadow">{num(menu.targetKj)} kJ</span>}</div><button onClick={() => openPublicMenu(menu)} className="absolute bottom-0 left-0 right-0 p-5 text-left text-white"><p className="text-xs font-black uppercase tracking-[0.25em] text-white/75">Denní menu</p><h3 className="mt-1 text-4xl font-black leading-none drop-shadow">{menu.name}</h3><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-950"><div className="rounded-2xl bg-white/90 p-3 backdrop-blur"><p className="text-[10px] font-black uppercase text-slate-500">Kcal</p><b className="text-base">{menu.totals.kcal}</b></div><div className="rounded-2xl bg-white/90 p-3 backdrop-blur"><p className="text-[10px] font-black uppercase text-slate-500">P/S/T</p><b className="text-base">{menu.totals.protein}/{menu.totals.carbs}/{menu.totals.fat}</b></div><div className="rounded-2xl bg-white/90 p-3 backdrop-blur"><p className="text-[10px] font-black uppercase text-slate-500">Jídel</p><b className="text-base">5</b></div></div></button></div><div className="flex flex-1 flex-col p-5"><div className="flex flex-wrap gap-2">{menuMeals.map((meal) => <button key={meal.id} onClick={() => openPublicMenu(menu, meal.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-800">{meal.meal}</button>)}</div><div className="mt-4 space-y-2">{menuMeals.map((meal) => <button key={meal.id + "line"} onClick={() => openPublicMenu(menu, meal.id)} className="block w-full rounded-2xl bg-slate-50 px-4 py-3 text-left text-sm font-bold leading-tight text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-900"><span className="mr-2 text-emerald-700">{meal.portionNumber}.</span>{meal.title}</button>)}</div><button onClick={() => openPublicMenu(menu)} className="mt-auto pt-5 text-left text-sm font-black text-emerald-700">Rozkliknout celé menu →</button></div></Card>; })}</div></div></section></main>;
}

function CustomerPage({ orders, setOrders, customers, setCustomers, show }) {
  const [logged, setLogged] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", diet: "redukční", plan: "LIGHT MENU", meals: "5", days: "10", deliveryDay: "Pondělí", allergies: "", address: "", noteKitchen: "", noteDriver: "" });
  const selectedPlan = plans.find((p) => p.name === form.plan) || plans[0];
  const total = selectedPlan.price * Number(form.days || 1);

  function registerCustomer() {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password.trim()) {
      show("Vyplň jméno, e-mail, telefon a heslo.");
      return;
    }
    const exists = customers.some((c) => c.email.toLowerCase() === form.email.trim().toLowerCase());
    if (exists) {
      show("Tento e-mail už je registrovaný. Zkus se přihlásit.");
      return;
    }
    const newCustomer = {
      id: `K${String(customers.length + 1).padStart(3, "0")}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      address: form.address.trim(),
      allergies: form.allergies.trim(),
      note: form.noteDriver.trim(),
    };
    setCustomers([newCustomer, ...customers]);
    setCurrentCustomer(newCustomer);
    setLogged(true);
    show("Registrace proběhla. Zákazník je přihlášený.");
  }

  function loginCustomer() {
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const found = customers.find((c) => c.email.toLowerCase() === email && (!c.password || c.password === password));
    if (!found) {
      show("Přihlášení se nepodařilo. Zkontroluj e-mail a heslo.");
      return;
    }
    setCurrentCustomer(found);
    setLogged(true);
    setForm({ ...form, name: found.name, email: found.email, phone: found.phone, address: found.address || "", allergies: found.allergies || "" });
    show("Zákazník je přihlášený.");
  }

  function submit(e) {
    e.preventDefault();
    const customer = currentCustomer || { name: form.name || "Nový zákazník", phone: form.phone, address: form.address };
    const newOrder = {
      id: `OBJ-${1000 + orders.length + 1}`,
      date: "2026-04-27",
      customer: customer.name,
      phone: customer.phone || form.phone,
      diet: form.diet,
      plan: form.plan,
      meals: Number(form.meals),
      days: Number(form.days),
      total,
      payment: "čeká na platbu",
      status: "nová",
      route: "Duchcov",
      driver: "nepřiřazeno",
      deliveryDay: form.deliveryDay,
      address: form.address || customer.address || "",
      kitchenNote: `${form.allergies} ${form.noteKitchen}`.trim(),
      driverNote: form.noteDriver,
      canEditUntil: "2026-04-24 12:00",
    };
    setOrders([newOrder, ...orders]);
    setLogged(true);
    show("Objednávka byla vytvořena.");
  }

  const myOrders = logged && currentCustomer
    ? orders.filter((o) => o.customer === currentCustomer.name || o.phone === currentCustomer.phone)
    : [];

  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Zákaznická část" title="Registrace, přihlášení a objednávka jídelníčku" text="Registrace v této demo verzi skutečně vytvoří zákazníka v aplikaci. Přihlášení potom zobrazí jeho historii objednávek." /><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><Card className="p-6"><h2 className="text-2xl font-black">Účet zákazníka</h2><div className="mt-5 grid gap-3"><Input placeholder="Jméno a příjmení" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><Input placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><Input placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><Input placeholder="Heslo" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><div className="flex flex-wrap gap-2"><Button type="button" onClick={loginCustomer}>Přihlásit</Button><Button type="button" onClick={registerCustomer} className="bg-slate-950 hover:bg-slate-800">Registrovat</Button>{logged && <button type="button" onClick={() => { setLogged(false); setCurrentCustomer(null); show("Zákazník byl odhlášen."); }} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Odhlásit</button>}</div>{logged && <Badge tone="green">Přihlášený zákazník: {currentCustomer?.name || form.name}</Badge>}</div><h3 className="mt-8 text-xl font-black">Historie mých objednávek</h3><div className="mt-3 space-y-3">{!logged && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Pro zobrazení historie se nejdřív přihlaš nebo registruj.</p>}{logged && myOrders.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Zatím nemáš žádnou objednávku.</p>}{myOrders.map((o) => <div key={o.id} className="rounded-2xl border p-4"><div className="flex items-center justify-between"><strong>{o.id} · {o.plan}</strong><Badge tone={statusTone(o.status)}>{o.status}</Badge></div><p className="mt-1 text-sm text-slate-600">{o.deliveryDay} · {o.diet} · {money(o.total)}</p><div className="mt-3 flex gap-2"><button onClick={() => show(`Objednávku ${o.id} lze upravit do ${o.canEditUntil}.`)} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold">Upravit</button><button onClick={() => setOrders(orders.map((x) => x.id === o.id ? { ...x, status: "zrušena" } : x))} className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-800">Zrušit</button></div></div>)}</div></Card><Card className="p-6"><h2 className="text-2xl font-black">Výběr jídelníčku</h2><form onSubmit={submit} className="mt-5 grid gap-4"><div className="grid gap-4 md:grid-cols-2"><Select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>{plans.map((p) => <option key={p.id}>{p.name}</option>)}</Select><Select value={form.diet} onChange={(e) => setForm({ ...form, diet: e.target.value })}>{dietTypes.map((d) => <option key={d}>{d}</option>)}</Select></div><div className="grid gap-4 md:grid-cols-3"><Select value={form.meals} onChange={(e) => setForm({ ...form, meals: e.target.value })}>{[3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}</Select><Select value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })}>{[5, 10, 20, 30].map((n) => <option key={n}>{n}</option>)}</Select><Select value={form.deliveryDay} onChange={(e) => setForm({ ...form, deliveryDay: e.target.value })}>{deliveryDays.map((d) => <option key={d}>{d}</option>)}</Select></div><Input placeholder="Alergie a intolerance" value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} /><Input placeholder="Adresa doručení" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /><textarea placeholder="Poznámka pro kuchyň" value={form.noteKitchen} onChange={(e) => setForm({ ...form, noteKitchen: e.target.value })} className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><textarea placeholder="Poznámka pro řidiče" value={form.noteDriver} onChange={(e) => setForm({ ...form, noteDriver: e.target.value })} className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-500">Cena objednávky</p><p className="text-3xl font-black">{money(total)}</p><p className="text-sm text-slate-500">{form.days} dní × {money(selectedPlan.price)} / den</p></div><Button>Odeslat objednávku</Button></form></Card></div></main>;
}

function Dashboard({ orders, customers }) {
  const revenue = orders.reduce((s, o) => s + Number(o.total || 0), 0);
  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Administrace" title="Kompletní administrační zóna" text="Administrace obsahuje objednávky, zákazníky, jídelníček, výrobu, sklad, rozvoz, komunikaci, platby i exporty." /><div className="grid gap-4 md:grid-cols-4"><Stat title="Tržby" value={money(revenue)} sub="celkem" /><Stat title="Objednávky" value={orders.length} sub="v systému" /><Stat title="Zákazníci" value={customers.length} sub="v databázi" /><Stat title="Dnešní výroba" value={orders.filter((o) => o.status !== "zrušena").reduce((s, o) => s + o.meals, 0)} sub="krabiček" /></div><Card className="mt-6 p-5"><h2 className="text-2xl font-black">Rychlé exporty</h2><div className="mt-4 grid gap-3 md:grid-cols-4"><button onClick={() => exportPayments(orders)} className="rounded-2xl bg-slate-100 px-5 py-3 text-left font-black">Export tržeb</button><button onClick={() => exportOrders(orders)} className="rounded-2xl bg-slate-100 px-5 py-3 text-left font-black">Export objednávek</button><button onClick={() => downloadCsv("fit-slim-zakaznici.csv", ["Zákazník", "Telefon", "E-mail", "Adresa", "Alergie", "Poznámka"], customers.map((c) => [c.name, c.phone, c.email, c.address, c.allergies, c.note]))} className="rounded-2xl bg-slate-100 px-5 py-3 text-left font-black">Export zákazníků</button><button onClick={() => downloadCsv("fit-slim-sklad.csv", ["Surovina", "Skladem", "Jednotka"], initialStock.map((s) => [s.name, s.stock, s.unit]))} className="rounded-2xl bg-slate-100 px-5 py-3 text-left font-black">Export skladu</button></div></Card></main>;
}

function OrdersPage({ orders, setOrders, show }) {
  const [q, setQ] = useState(""); const [diet, setDiet] = useState("vše"); const [status, setStatus] = useState("vše"); const [route, setRoute] = useState("vše");
  const filtered = orders.filter((o) => `${o.id} ${o.customer} ${o.date}`.toLowerCase().includes(q.toLowerCase()) && (diet === "vše" || o.diet === diet) && (status === "vše" || o.status === status) && (route === "vše" || o.route === route));
  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Objednávky" title="Administrace všech objednávek" text="Filtrování, ruční zadání, tisk štítků a exporty." /><div className="grid gap-4 md:grid-cols-4"><Stat title="Všechny" value={orders.length} sub="objednávky" /><Stat title="Zaplacené" value={orders.filter((o) => o.payment === "zaplaceno").length} sub="platby" /><Stat title="Ve výrobě" value={orders.filter((o) => o.status === "ve výrobě").length} sub="stav" /><Stat title="Tržby" value={money(orders.reduce((s, o) => s + o.total, 0))} sub="celkem" /></div><Card className="mt-6 p-5"><div className="mb-5 grid gap-3 md:grid-cols-5"><Input placeholder="Datum, zákazník, ID" value={q} onChange={(e) => setQ(e.target.value)} /><Select value={diet} onChange={(e) => setDiet(e.target.value)}><option>vše</option>{dietTypes.map((d) => <option key={d}>{d}</option>)}</Select><Select value={status} onChange={(e) => setStatus(e.target.value)}><option>vše</option>{orderStatuses.map((s) => <option key={s}>{s}</option>)}</Select><Select value={route} onChange={(e) => setRoute(e.target.value)}><option>vše</option>{routes.map((r) => <option key={r}>{r}</option>)}</Select><Button onClick={() => { setOrders([{ ...orders[0], id: `OBJ-${1001 + orders.length}`, customer: "Ruční objednávka", status: "nová", payment: "čeká na platbu" }, ...orders]); show("Ruční objednávka přidána."); }}>+ Ruční objednávka</Button></div><div className="mb-4 flex flex-wrap gap-2"><button onClick={() => printLabels(filtered)} className="rounded-xl bg-slate-100 px-4 py-2 font-bold">Tisk štítků</button><button onClick={() => exportOrders(filtered)} className="rounded-xl bg-slate-100 px-4 py-2 font-bold">Export Excel/CSV</button><button onClick={() => printOrders(filtered)} className="rounded-xl bg-slate-100 px-4 py-2 font-bold">Export PDF</button></div><DataTable headers={["Objednávka", "Zákazník", "Dieta", "Datum", "Trasa", "Platba", "Stav"]}>{filtered.map((o) => <tr key={o.id} className="border-t"><td className="p-3 font-black">{o.id}</td><td className="p-3"><b>{o.customer}</b><p className="text-xs text-slate-500">{o.phone}</p></td><td className="p-3">{o.diet}</td><td className="p-3">{o.date}</td><td className="p-3">{o.route}</td><td className="p-3"><Badge tone={o.payment === "zaplaceno" ? "green" : "amber"}>{o.payment}</Badge></td><td className="p-3"><Select value={o.status} onChange={(e) => setOrders(orders.map((x) => x.id === o.id ? { ...x, status: e.target.value } : x))}>{orderStatuses.map((s) => <option key={s}>{s}</option>)}</Select></td></tr>)}</DataTable></Card></main>;
}

function CustomersPage({ orders, customers, show }) {
  const allCustomers = Array.from(new Map([...orders.map((o, i) => ({ id: `KO-${i}`, name: o.customer, phone: o.phone, email: "", address: o.address, allergies: o.kitchenNote, note: o.driverNote })), ...customers].map((c) => [c.name, c])).values());
  const [view, setView] = useState("customers");
  const [selectedCustomerName, setSelectedCustomerName] = useState(allCustomers[0]?.name || "");
  const [sensitiveNotes, setSensitiveNotes] = useState([
    { id: "ANON-001", customer: "Anonymní zákazník 1", flags: ["GTA"], note: "Demo citlivá poznámka – gambler, toxikomán, alkohol. V ostré verzi zobrazit jen oprávněným osobám." },
    { id: "ANON-002", customer: "Anonymní zákazník 2", flags: ["GTA"], note: "Demo citlivá poznámka – alkohol. Vyžaduje diskrétní přístup a ochranu údajů." },
    { id: "ANON-003", customer: "Anonymní zákazník 3", flags: ["GTA"], note: "Demo citlivá poznámka – gambler. Nepoužívat veřejně, netisknout na štítky." },
    { id: "ANON-004", customer: "Anonymní zákazník 4", flags: ["GTA"], note: "Demo citlivá poznámka – toxikomán. Přístup jen majitel/administrátor." },
    { id: "ANON-005", customer: "Anonymní zákazník 5", flags: ["GTA"], note: "Demo citlivá poznámka – alkohol + gambler." },
    { id: "ANON-006", customer: "Anonymní zákazník 6", flags: [], note: "Prokrastinace – zákazník často objednává pozdě, posílat připomínku dřív." },
    { id: "ANON-007", customer: "Anonymní zákazník 7", flags: [], note: "Prokrastinace – často odkládá platbu, připomenout den před uzávěrkou." },
    { id: "ANON-008", customer: "Anonymní zákazník 8", flags: [], note: "Soukromá poznámka – nezobrazovat mimo administraci." },
  ]);
  const [newSensitive, setNewSensitive] = useState({ customer: "Anonymní zákazník", type: "GTA", note: "" });
  const [inbodyRecords, setInbodyRecords] = useState(() => {
    const records = {};
    allCustomers.forEach((customer, index) => {
      const baseWeight = 118 - (index % 12) * 2.4;
      const baseFat = 35 - (index % 8) * 1.2;
      const baseMuscle = 39 + (index % 7) * 0.8;
      records[customer.name] = [
        { date: "2026-01-05", weight: baseWeight, bmi: 32.4, bodyFatPercent: baseFat, bodyFatKg: baseWeight * baseFat / 100, muscleKg: baseMuscle, skeletalMuscleKg: baseMuscle - 3.2, waterLiters: 48 + index % 8, waterPercent: 52, visceralFat: 13, bmr: 2080, proteinKg: 13.6, mineralsKg: 4.2, boneMineralKg: 3.4, whr: 0.96, inbodyScore: 63, waistCm: 112, notes: "Vstupní měření, nastavit redukční plán." },
        { date: "2026-02-05", weight: baseWeight - 2.8, bmi: 31.7, bodyFatPercent: baseFat - 1.5, bodyFatKg: (baseWeight - 2.8) * (baseFat - 1.5) / 100, muscleKg: baseMuscle + 0.2, skeletalMuscleKg: baseMuscle - 3.0, waterLiters: 49 + index % 8, waterPercent: 53, visceralFat: 12, bmr: 2095, proteinKg: 13.8, mineralsKg: 4.25, boneMineralKg: 3.42, whr: 0.94, inbodyScore: 67, waistCm: 108, notes: "Dobrá reakce na jídelníček, držet bílkoviny." },
        { date: "2026-03-05", weight: baseWeight - 5.1, bmi: 30.9, bodyFatPercent: baseFat - 2.9, bodyFatKg: (baseWeight - 5.1) * (baseFat - 2.9) / 100, muscleKg: baseMuscle + 0.5, skeletalMuscleKg: baseMuscle - 2.7, waterLiters: 50 + index % 8, waterPercent: 54, visceralFat: 11, bmr: 2110, proteinKg: 14.1, mineralsKg: 4.29, boneMineralKg: 3.45, whr: 0.92, inbodyScore: 72, waistCm: 104, notes: "Pokles tuku, svalová hmota drží." },
      ];
    });
    return records;
  });
  const [inbodyFiles, setInbodyFiles] = useState({});
  const [inbodyForm, setInbodyForm] = useState({ date: "2026-04-27", weight: "102.5", bmi: "29.8", bodyFatPercent: "27.5", bodyFatKg: "28.2", muscleKg: "41.8", skeletalMuscleKg: "38.4", waterLiters: "51.6", waterPercent: "55", visceralFat: "10", bmr: "2140", proteinKg: "14.4", mineralsKg: "4.35", boneMineralKg: "3.5", whr: "0.90", inbodyScore: "76", waistCm: "101", notes: "Nové ruční měření." });

  const selectedCustomer = allCustomers.find((c) => c.name === selectedCustomerName) || allCustomers[0];
  const customerRecords = selectedCustomer ? [...(inbodyRecords[selectedCustomer.name] || [])].sort((a, b) => a.date.localeCompare(b.date)) : [];
  const latestInbody = customerRecords[customerRecords.length - 1];
  const firstInbody = customerRecords[0];
  const weightDiff = latestInbody && firstInbody ? latestInbody.weight - firstInbody.weight : 0;
  const fatDiff = latestInbody && firstInbody ? latestInbody.bodyFatPercent - firstInbody.bodyFatPercent : 0;
  const muscleDiff = latestInbody && firstInbody ? latestInbody.muscleKg - firstInbody.muscleKg : 0;
  const tabs = [["customers", "Zákazníci"], ["detail", "Detail zákazníka"], ["inbody", "InBody měření"], ["notes", "Poznámky"], ["sensitive", "Závislosti / citlivé poznámky"]];

  function addSensitiveNote(e) {
    e.preventDefault();
    if (!newSensitive.note.trim()) { show("Vyplň poznámku."); return; }
    setSensitiveNotes([{ id: `ANON-${String(sensitiveNotes.length + 1).padStart(3, "0")}`, customer: newSensitive.customer, flags: newSensitive.type === "GTA" ? ["GTA"] : [], note: newSensitive.note }, ...sensitiveNotes]);
    setNewSensitive({ customer: "Anonymní zákazník", type: "GTA", note: "" });
    show("Citlivá poznámka byla uložena anonymně.");
  }

  function openCustomer(customer) {
    setSelectedCustomerName(customer.name);
    setView("detail");
  }

  function addInbodyRecord(e) {
    e.preventDefault();
    if (!selectedCustomer) return;
    const next = {
      date: inbodyForm.date,
      weight: Number(inbodyForm.weight),
      bmi: Number(inbodyForm.bmi),
      bodyFatPercent: Number(inbodyForm.bodyFatPercent),
      bodyFatKg: Number(inbodyForm.bodyFatKg),
      muscleKg: Number(inbodyForm.muscleKg),
      skeletalMuscleKg: Number(inbodyForm.skeletalMuscleKg),
      waterLiters: Number(inbodyForm.waterLiters),
      waterPercent: Number(inbodyForm.waterPercent),
      visceralFat: Number(inbodyForm.visceralFat),
      bmr: Number(inbodyForm.bmr),
      proteinKg: Number(inbodyForm.proteinKg),
      mineralsKg: Number(inbodyForm.mineralsKg),
      boneMineralKg: Number(inbodyForm.boneMineralKg),
      whr: Number(inbodyForm.whr),
      inbodyScore: Number(inbodyForm.inbodyScore),
      waistCm: Number(inbodyForm.waistCm),
      notes: inbodyForm.notes,
    };
    setInbodyRecords((prev) => ({ ...prev, [selectedCustomer.name]: [...(prev[selectedCustomer.name] || []), next].sort((a, b) => a.date.localeCompare(b.date)) }));
    show("InBody měření bylo přidáno k zákazníkovi.");
  }

  function handleInbodyFiles(e) {
    if (!selectedCustomer) return;
    const files = Array.from(e.target.files || []).map((file) => ({ name: file.name, size: file.size, type: file.type || "soubor", date: new Date().toLocaleDateString("cs-CZ") }));
    if (!files.length) return;
    setInbodyFiles((prev) => ({ ...prev, [selectedCustomer.name]: [...(prev[selectedCustomer.name] || []), ...files] }));
    show(`Přidáno souborů: ${files.length}`);
  }

  function exportInbody() {
    if (!selectedCustomer) return;
    downloadCsv(`inbody-${selectedCustomer.name}.csv`, ["Datum", "Váha", "BMI", "Tuk %", "Tuk kg", "Svaly kg", "Kosterní svaly kg", "Voda l", "Voda %", "Viscerální tuk", "BMR", "Protein kg", "Minerály kg", "Kostní minerály kg", "WHR", "InBody skóre", "Pas cm", "Poznámka"], customerRecords.map((r) => [r.date, r.weight, r.bmi, r.bodyFatPercent, r.bodyFatKg, r.muscleKg, r.skeletalMuscleKg, r.waterLiters, r.waterPercent, r.visceralFat, r.bmr, r.proteinKg, r.mineralsKg, r.boneMineralKg, r.whr, r.inbodyScore, r.waistCm, r.notes]));
  }

  function LineChart({ title, records, keys }) {
    if (!records.length) return <div className="rounded-2xl bg-slate-50 p-6 text-slate-500">Zatím nejsou žádná měření.</div>;
    const colors = ["#059669", "#2563eb", "#f59e0b", "#dc2626"];
    const allValues = records.flatMap((r) => keys.map((k) => Number(r[k.key]) || 0));
    const min = Math.min(...allValues) * 0.96;
    const max = Math.max(...allValues) * 1.04;
    const width = 860;
    const height = 320;
    const pad = 52;
    const yFor = (value) => height - pad - ((value - min) / Math.max(1, max - min)) * (height - pad * 2);
    const xFor = (index) => pad + (index / Math.max(1, records.length - 1)) * (width - pad * 2);
    return <Card className="p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h3 className="text-2xl font-black">{title}</h3><div className="flex flex-wrap gap-2">{keys.map((k, i) => <span key={k.key} className="flex items-center gap-2 text-sm font-bold"><span className="h-3 w-3 rounded-full" style={{ background: colors[i] }} />{k.label}</span>)}</div></div><div className="overflow-x-auto"><svg viewBox={`0 0 ${width} ${height}`} className="min-w-[860px]"><line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="2" /><line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="2" />{keys.map((k, keyIndex) => { const points = records.map((r, i) => `${xFor(i)},${yFor(Number(r[k.key]) || 0)}`).join(" "); return <polyline key={k.key} points={points} fill="none" stroke={colors[keyIndex]} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />; })}{records.map((record, i) => <g key={record.date}>{keys.map((k, keyIndex) => <g key={k.key}><circle cx={xFor(i)} cy={yFor(Number(record[k.key]) || 0)} r="5" fill={colors[keyIndex]} /><text x={xFor(i)} y={yFor(Number(record[k.key]) || 0) - 10 - keyIndex * 14} textAnchor="middle" className="fill-slate-700 text-[10px] font-bold">{num(record[k.key])}</text></g>)}<text x={xFor(i)} y={height - 18} textAnchor="middle" className="fill-slate-500 text-[11px] font-bold">{record.date.slice(5)}</text></g>)}</svg></div></Card>;
  }

  function InbodyDashboard() {
    return <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Stat title="Aktuální váha" value={latestInbody ? `${num(latestInbody.weight)} kg` : "—"} sub={firstInbody ? `${weightDiff < 0 ? "" : "+"}${num(weightDiff)} kg od začátku` : "bez porovnání"} />
        <Stat title="Tělesný tuk" value={latestInbody ? `${num(latestInbody.bodyFatPercent)} %` : "—"} sub={firstInbody ? `${fatDiff < 0 ? "" : "+"}${num(fatDiff)} % od začátku` : "bez porovnání"} />
        <Stat title="Svalová hmota" value={latestInbody ? `${num(latestInbody.muscleKg)} kg` : "—"} sub={firstInbody ? `${muscleDiff < 0 ? "" : "+"}${num(muscleDiff)} kg od začátku` : "bez porovnání"} />
        <Stat title="InBody skóre" value={latestInbody ? latestInbody.inbodyScore : "—"} sub="orientační vývoj klienta" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-5"><h2 className="text-2xl font-black">Ruční přidání InBody měření</h2><p className="mt-2 text-sm text-slate-500">Doplň váhu, tuk, vodu, svaly a další hodnoty z InBody protokolu. V demo aplikaci se ukládá do paměti prohlížeče.</p><form onSubmit={addInbodyRecord} className="mt-4 grid gap-3"><div className="grid gap-3 md:grid-cols-2"><Input value={inbodyForm.date} onChange={(e) => setInbodyForm({ ...inbodyForm, date: e.target.value })} placeholder="Datum" /><Input value={inbodyForm.weight} onChange={(e) => setInbodyForm({ ...inbodyForm, weight: e.target.value })} placeholder="Váha kg" /><Input value={inbodyForm.bmi} onChange={(e) => setInbodyForm({ ...inbodyForm, bmi: e.target.value })} placeholder="BMI" /><Input value={inbodyForm.bodyFatPercent} onChange={(e) => setInbodyForm({ ...inbodyForm, bodyFatPercent: e.target.value })} placeholder="Tuk %" /><Input value={inbodyForm.bodyFatKg} onChange={(e) => setInbodyForm({ ...inbodyForm, bodyFatKg: e.target.value })} placeholder="Tuk kg" /><Input value={inbodyForm.muscleKg} onChange={(e) => setInbodyForm({ ...inbodyForm, muscleKg: e.target.value })} placeholder="Svaly kg" /><Input value={inbodyForm.skeletalMuscleKg} onChange={(e) => setInbodyForm({ ...inbodyForm, skeletalMuscleKg: e.target.value })} placeholder="Kosterní svaly kg" /><Input value={inbodyForm.waterLiters} onChange={(e) => setInbodyForm({ ...inbodyForm, waterLiters: e.target.value })} placeholder="Voda litry" /><Input value={inbodyForm.waterPercent} onChange={(e) => setInbodyForm({ ...inbodyForm, waterPercent: e.target.value })} placeholder="Voda %" /><Input value={inbodyForm.visceralFat} onChange={(e) => setInbodyForm({ ...inbodyForm, visceralFat: e.target.value })} placeholder="Viscerální tuk" /><Input value={inbodyForm.bmr} onChange={(e) => setInbodyForm({ ...inbodyForm, bmr: e.target.value })} placeholder="Bazální metabolismus kcal" /><Input value={inbodyForm.proteinKg} onChange={(e) => setInbodyForm({ ...inbodyForm, proteinKg: e.target.value })} placeholder="Protein kg" /><Input value={inbodyForm.mineralsKg} onChange={(e) => setInbodyForm({ ...inbodyForm, mineralsKg: e.target.value })} placeholder="Minerály kg" /><Input value={inbodyForm.boneMineralKg} onChange={(e) => setInbodyForm({ ...inbodyForm, boneMineralKg: e.target.value })} placeholder="Kostní minerály kg" /><Input value={inbodyForm.whr} onChange={(e) => setInbodyForm({ ...inbodyForm, whr: e.target.value })} placeholder="Poměr pas/boky WHR" /><Input value={inbodyForm.waistCm} onChange={(e) => setInbodyForm({ ...inbodyForm, waistCm: e.target.value })} placeholder="Pas cm" /><Input value={inbodyForm.inbodyScore} onChange={(e) => setInbodyForm({ ...inbodyForm, inbodyScore: e.target.value })} placeholder="InBody skóre" /></div><textarea value={inbodyForm.notes} onChange={(e) => setInbodyForm({ ...inbodyForm, notes: e.target.value })} placeholder="Poznámka trenéra / výživáře" className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><Button>Uložit InBody měření</Button></form></Card>

        <Card className="p-5"><h2 className="text-2xl font-black">Soubory z InBody</h2><p className="mt-2 text-sm text-slate-500">Nahraj PDF, JPG, PNG nebo Excel s měřením. V demo verzi se ukládá název souboru; v ostré verzi by se soubor ukládal na server ke kartě zákazníka.</p><label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-8 text-center"><span className="text-4xl font-black text-emerald-700">+</span><span className="mt-2 font-black">Přidat soubor s InBody</span><span className="text-sm text-emerald-800">PDF, fotka, sken, Excel</span><input type="file" multiple onChange={handleInbodyFiles} className="hidden" /></label><div className="mt-4 grid gap-2">{(inbodyFiles[selectedCustomer?.name] || []).length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Zatím nejsou nahrané žádné soubory.</p>}{(inbodyFiles[selectedCustomer?.name] || []).map((file, index) => <div key={file.name + index} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"><div><b>{file.name}</b><p className="text-xs text-slate-500">{file.type} · {Math.round(file.size / 1024)} kB · {file.date}</p></div><Badge tone="blue">InBody</Badge></div>)}</div><div className="mt-5 flex flex-wrap gap-2"><button onClick={exportInbody} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Export InBody CSV</button><button onClick={() => openPrintable("InBody karta", `<h1>Fit Slim – InBody karta</h1><p>Zákazník: ${selectedCustomer?.name}</p><table><thead><tr><th>Datum</th><th>Váha</th><th>Tuk %</th><th>Svaly</th><th>Voda</th><th>Skóre</th></tr></thead><tbody>${customerRecords.map((r) => `<tr><td>${r.date}</td><td>${r.weight} kg</td><td>${r.bodyFatPercent} %</td><td>${r.muscleKg} kg</td><td>${r.waterLiters} l</td><td>${r.inbodyScore}</td></tr>`).join("")}</tbody></table>`)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">PDF InBody karta</button></div></Card>
      </div>

      <LineChart title="Vývoj hubnutí – váha, tuk a pas" records={customerRecords} keys={[{ key: "weight", label: "váha kg" }, { key: "bodyFatPercent", label: "tuk %" }, { key: "waistCm", label: "pas cm" }]} />
      <LineChart title="Složení těla – svaly, voda a skóre" records={customerRecords} keys={[{ key: "muscleKg", label: "svaly kg" }, { key: "waterLiters", label: "voda l" }, { key: "inbodyScore", label: "skóre" }]} />

      <Card className="p-5"><h2 className="text-2xl font-black">Všechna InBody měření</h2><DataTable headers={["Datum", "Váha", "BMI", "Tuk %", "Tuk kg", "Svaly", "Kosterní svaly", "Voda", "Viscerální tuk", "BMR", "Protein", "Minerály", "WHR", "Skóre", "Pas", "Poznámka"]}>{customerRecords.map((r) => <tr key={r.date} className="border-t"><td className="p-3 font-bold">{r.date}</td><td className="p-3">{num(r.weight)} kg</td><td className="p-3">{num(r.bmi)}</td><td className="p-3">{num(r.bodyFatPercent)} %</td><td className="p-3">{num(r.bodyFatKg)} kg</td><td className="p-3">{num(r.muscleKg)} kg</td><td className="p-3">{num(r.skeletalMuscleKg)} kg</td><td className="p-3">{num(r.waterLiters)} l / {num(r.waterPercent)} %</td><td className="p-3">{num(r.visceralFat)}</td><td className="p-3">{num(r.bmr)} kcal</td><td className="p-3">{num(r.proteinKg)} kg</td><td className="p-3">{num(r.mineralsKg)} kg</td><td className="p-3">{num(r.whr)}</td><td className="p-3 font-black">{r.inbodyScore}</td><td className="p-3">{num(r.waistCm)} cm</td><td className="p-3">{r.notes}</td></tr>)}</DataTable></Card>
    </div>;
  }

  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Zákazníci" title="Databáze zákazníků" text="Kontakty, adresy, alergie, poznámky, objednávky a detailní InBody karta zákazníka s grafy hubnutí." />
    <div className="mb-6 flex flex-wrap gap-2">{tabs.map(([id,label]) => <button key={id} onClick={() => setView(id)} className={cls("rounded-full px-4 py-2 text-sm font-black", view === id ? "bg-emerald-600 text-white" : "bg-white hover:bg-slate-100")}>{label}</button>)}</div>

    {(view === "detail" || view === "inbody") && selectedCustomer && <Card className="mb-6 p-5"><div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]"><div><Badge tone="dark">Karta zákazníka</Badge><h2 className="mt-3 text-4xl font-black">{selectedCustomer.name}</h2><p className="mt-2 text-slate-600">{selectedCustomer.email || "bez e-mailu"} · {selectedCustomer.phone}</p><p className="mt-1 text-slate-600">{selectedCustomer.address}</p></div><div className="grid gap-3 md:grid-cols-4"><Stat title="Objednávky" value={orders.filter((o) => o.customer === selectedCustomer.name).length} sub="v systému" /><Stat title="InBody měření" value={customerRecords.length} sub="záznamů" /><Stat title="Změna váhy" value={`${weightDiff < 0 ? "" : "+"}${num(weightDiff)} kg`} sub="od prvního měření" /><Stat title="Soubory" value={(inbodyFiles[selectedCustomer.name] || []).length} sub="InBody přílohy" /></div></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => setView("inbody")} className="rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white">Otevřít InBody kartu</button><button onClick={() => setView("customers")} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Zpět na seznam zákazníků</button></div></Card>}

    {view === "customers" && <Card className="p-5"><div className="mb-4 flex gap-2"><Button onClick={() => show("Demo: otevřel by se formulář nového zákazníka.")}>+ Přidat zákazníka</Button><button onClick={() => downloadCsv("fit-slim-zakaznici.csv", ["Jméno", "Telefon", "E-mail", "Adresa", "Alergie"], allCustomers.map((c) => [c.name, c.phone, c.email, c.address, c.allergies]))} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Export zákazníků</button></div><DataTable headers={["Jméno", "Telefon", "E-mail", "Adresa", "Alergie", "Objednávky", "InBody"]}>{allCustomers.map((c) => <tr key={c.name} className="border-t"><td className="p-3 font-bold"><button onClick={() => openCustomer(c)} className="underline decoration-emerald-500 underline-offset-4">{c.name}</button></td><td className="p-3">{c.phone}</td><td className="p-3"><span className="rounded-xl bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700">{c.email || "—"}</span></td><td className="p-3">{c.address}</td><td className="p-3">{c.allergies || "—"}</td><td className="p-3"><Badge tone="blue">{orders.filter((o) => o.customer === c.name).length}</Badge></td><td className="p-3"><button onClick={() => { setSelectedCustomerName(c.name); setView("inbody"); }} className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-black text-emerald-800">InBody karta</button></td></tr>)}</DataTable></Card>}

    {view === "detail" && selectedCustomer && <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"><Card className="p-5"><h2 className="text-2xl font-black">Osobní údaje</h2><div className="mt-4 space-y-3 text-sm"><p className="rounded-2xl bg-slate-50 p-4"><b>Jméno:</b> {selectedCustomer.name}</p><p className="rounded-2xl bg-slate-50 p-4"><b>Telefon:</b> {selectedCustomer.phone}</p><p className="rounded-2xl bg-slate-50 p-4"><b>E-mail:</b> {selectedCustomer.email || "—"}</p><p className="rounded-2xl bg-slate-50 p-4"><b>Adresa:</b> {selectedCustomer.address}</p><p className="rounded-2xl bg-slate-50 p-4"><b>Alergie:</b> {selectedCustomer.allergies || "—"}</p><p className="rounded-2xl bg-slate-50 p-4"><b>Poznámka:</b> {selectedCustomer.note || "—"}</p></div></Card><Card className="p-5"><h2 className="text-2xl font-black">Objednávky zákazníka</h2><DataTable headers={["Objednávka", "Program", "Dieta", "Cena", "Stav"]}>{orders.filter((o) => o.customer === selectedCustomer.name).map((o) => <tr key={o.id} className="border-t"><td className="p-3 font-black">{o.id}</td><td className="p-3">{o.plan}</td><td className="p-3">{o.diet}</td><td className="p-3 font-bold">{money(o.total)}</td><td className="p-3"><Badge tone={statusTone(o.status)}>{o.status}</Badge></td></tr>)}</DataTable></Card></div>}

    {view === "inbody" && selectedCustomer && <InbodyDashboard />}

    {view === "notes" && <Card className="p-5"><h2 className="text-2xl font-black">Běžné zákaznické poznámky</h2><p className="mt-2 text-sm text-slate-500">Tyto poznámky nejsou citlivé a slouží pro rozvoz, kuchyň nebo administrativu.</p><DataTable headers={["Jméno", "Poznámka", "Alergie", "Adresa"]}>{allCustomers.map((c) => <tr key={c.name} className="border-t"><td className="p-3 font-bold"><button onClick={() => openCustomer(c)} className="underline decoration-emerald-500 underline-offset-4">{c.name}</button></td><td className="p-3">{c.note || "—"}</td><td className="p-3">{c.allergies || "—"}</td><td className="p-3">{c.address}</td></tr>)}</DataTable></Card>}

    {view === "sensitive" && <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Card className="p-5"><h2 className="text-2xl font-black">Přidat citlivou poznámku</h2><p className="mt-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">Citlivé údaje se v demu ukládají anonymně. V ostré aplikaci by musely být pod zvláštním oprávněním, audit logem a souhlasem podle GDPR.</p><form onSubmit={addSensitiveNote} className="mt-4 grid gap-3"><Input value={newSensitive.customer} onChange={(e) => setNewSensitive({ ...newSensitive, customer: e.target.value })} placeholder="Anonymní označení" /><Select value={newSensitive.type} onChange={(e) => setNewSensitive({ ...newSensitive, type: e.target.value })}><option>GTA</option><option>prokrastinace</option><option>soukromá poznámka</option></Select><textarea value={newSensitive.note} onChange={(e) => setNewSensitive({ ...newSensitive, note: e.target.value })} placeholder="Poznámka" className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><Button>Uložit anonymně</Button></form></Card><Card className="p-5"><h2 className="text-2xl font-black">Závislosti / citlivé poznámky</h2><DataTable headers={["Označení", "Varování", "Poznámka"]}>{sensitiveNotes.map((n) => <tr key={n.id} className="border-t"><td className="p-3 font-bold">{n.customer}<p className="text-xs text-slate-500">{n.id}</p></td><td className="p-3">{n.flags.includes("GTA") ? <span className="inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">! GTA</span> : <Badge>bez GTA</Badge>}</td><td className="p-3">{n.note}</td></tr>)}</DataTable></Card></div>}
  </main>;
}

function MenuPage({ show }) {
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const selectedDailyMenu = menuDefinitions.find((menu) => menu.id === selectedMenuId);
  const selectedMenuMeals = selectedDailyMenu ? weeklyMenu.filter((meal) => meal.menuName === selectedDailyMenu.name) : [];
  const mealRecipes = selectedMeal ? recipes.filter((r) => r.meal === selectedMeal.title && r.menuName === selectedMeal.menuName) : [];
  const totalIngredientGrams = selectedMeal ? mealRecipes.reduce((sum, r) => sum + (r.unit === "g" ? r.perPortion * selectedMeal.portions : 0), 0) : 0;
  const totalFoodCost = selectedMeal ? selectedMeal.cost * selectedMeal.portions : 0;
  const costTone = (cost) => cost >= 60 ? "red" : cost >= 45 ? "amber" : "green";
  const costLabel = (cost) => cost >= 60 ? "velmi drahé" : cost >= 45 ? "dražší" : "levnější";

  function openMenu(menu) {
    const firstMeal = weeklyMenu.find((meal) => meal.menuName === menu.name);
    setSelectedMenuId(menu.id);
    setSelectedMeal(firstMeal || null);
  }

  function printSelectedMeal() {
    if (!selectedMeal) return;
    openPrintable("Detail menu", `<h1>Fit Slim – detail jídla</h1><p><b>${selectedMeal.day} · ${selectedMeal.meal}</b></p><h2>${selectedMeal.title}</h2><p>Porcí: ${selectedMeal.portions}</p><p>Gramáž porce: ${selectedMeal.grams} g</p><p>Kalorie: ${selectedMeal.kcal} kcal</p><p>Bílkoviny / sacharidy / tuky: ${selectedMeal.protein}/${selectedMeal.carbs}/${selectedMeal.fat} g</p><p>Alergeny: ${selectedMeal.allergens || "bez"}</p><p>Cena výroby porce: ${money(selectedMeal.cost)}</p><h2>Receptura</h2><table><thead><tr><th>Surovina</th><th>Na porci</th><th>Celkem</th></tr></thead><tbody>${mealRecipes.map((r) => `<tr><td>${r.ingredient}</td><td>${r.perPortion} ${r.unit}</td><td>${r.perPortion * selectedMeal.portions} ${r.unit}</td></tr>`).join("")}</tbody></table>`);
  }

  return <main className="mx-auto max-w-7xl px-4 py-10">
    <PageHead badge="Jídelníčky → Denní menu" title="Denní menu" text="Hlavní náhled ukazuje celé denní programy, například Slim, Balance, Active, Low Carb nebo VIP Dobrák menu. Až po rozkliknutí konkrétního menu se zobrazí jeho 5 denních jídel." />

    {!selectedDailyMenu && <>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Stat title="Denních menu" value={menuDefinitions.length} sub="programů" />
        <Stat title="Jídel celkem" value={weeklyMenu.length} sub="5 jídel v každém menu" />
        <Stat title="Nejlevnější menu" value={money(Math.min(...menuDefinitions.map((m) => m.totals.cost)))} sub="výrobní náklad / den" />
        <Stat title="Nejdražší menu" value={money(Math.max(...menuDefinitions.map((m) => m.totals.cost)))} sub="výrobní náklad / den" />
      </div>

      <div className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
        {menuDefinitions.map((menu) => {
          const menuMeals = weeklyMenu.filter((meal) => meal.menuName === menu.name);
          const coverMeal = menuMeals[2] || menuMeals[0];
          const coverImage = menu.coverImage || coverMeal?.photo;
          const expensiveMeal = [...menuMeals].sort((a, b) => b.cost - a.cost)[0];
          const menuTone = menu.totals.cost >= 210 ? "red" : menu.totals.cost >= 180 ? "amber" : "green";
          return <Card key={menu.id} className="group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
            <button onClick={() => openMenu(menu)} className="flex h-full flex-col text-left">
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img src={coverImage || img.hero} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt={menu.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-2"><Badge tone="dark">{menu.day}</Badge><Badge tone={menu.premium ? "red" : menuTone}>{menu.premium ? "VIP TOP" : `${money(menu.totals.cost)} výroba`}</Badge></div>
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 p-3 backdrop-blur"><p className="text-xs font-black uppercase tracking-wide text-slate-500">Denní program</p><h2 className="text-3xl font-black">{menu.name}</h2></div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Kcal</p><b>{menu.totals.kcal}</b>{menu.targetKj && <p className="text-[10px] font-bold text-amber-700">{num(menu.targetKj)} kJ</p>}</div>
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">P/S/T</p><b>{menu.totals.protein}/{menu.totals.carbs}/{menu.totals.fat}</b></div>
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Jídel</p><b>5</b></div>
                </div>
                <div className={cls("mt-4 rounded-2xl p-4 text-sm", menu.premium ? "bg-amber-50 text-amber-950 ring-1 ring-amber-200" : "bg-emerald-50 text-emerald-900")}>
                  <b>Výrobní cena celého dne:</b> {money(menu.totals.cost)}<br />
                  <b>Průměr na jídlo:</b> {money(menu.totals.cost / 5)}<br />
                  <b>Nejdražší jídlo:</b> {expensiveMeal?.meal} · {money(expensiveMeal?.cost)}
                  {menu.premium && <p className="mt-2 font-black">Jen vybrané top suroviny: Wagyu, divoký losos, lanýžový olej, pistácie, premium jerky.</p>}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">{menuMeals.map((meal) => <Badge key={meal.id}>{meal.meal}</Badge>)}</div>
                <p className="mt-auto pt-5 text-sm font-black text-emerald-700">Rozkliknout menu a zobrazit 5 jídel →</p>
              </div>
            </button>
          </Card>;
        })}
      </div>
    </>}

    {selectedDailyMenu && <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => { setSelectedMenuId(null); setSelectedMeal(null); }} className="rounded-2xl bg-slate-950 px-5 py-3 font-black text-white">← Zpět na přehled menu</button>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => show(`${selectedDailyMenu.name} posláno do výroby v demu.`)}>Poslat do výroby</Button>
          <button onClick={() => show(`Nákupní plán pro ${selectedDailyMenu.name} připraven v demu.`)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Vytvořit nákupní plán</button>
          <button onClick={printSelectedMeal} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Tisk vybraného jídla</button>
        </div>
      </div>

      <Card className="mb-6 overflow-hidden">
        <div className="grid gap-5 p-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge tone="dark">{selectedDailyMenu.day}</Badge>
            <h2 className="mt-3 text-4xl font-black">{selectedDailyMenu.name}</h2>
            <p className="mt-2 text-slate-600">Rozkliknuté denní menu. Níže je všech 5 jídel: snídaně, svačina 1, oběd, svačina 2 a večeře.{selectedDailyMenu.targetKj ? ` Energetický cíl: ${num(selectedDailyMenu.targetKj)} kJ, přibližně ${selectedDailyMenu.targetKcal} kcal.` : ""}</p>
            <div className="mt-4 rounded-3xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Cena výroby celého denního menu</p>
              <div className="mt-2 flex flex-wrap items-end gap-3"><p className="text-5xl font-black text-emerald-950">{money(selectedDailyMenu.totals.cost)}</p><Badge tone={costTone(selectedDailyMenu.totals.cost / 5)}>průměr {money(selectedDailyMenu.totals.cost / 5)} / jídlo</Badge></div>
              <p className="mt-2 text-sm text-emerald-900">Při 100 zákaznících: <b>{money(selectedDailyMenu.totals.cost * 100)}</b> výrobní náklad a <b>500 krabiček</b>.</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-4"><Stat title="Kcal" value={selectedDailyMenu.totals.kcal} sub="součet dne" /><Stat title="P/S/T" value={`${selectedDailyMenu.totals.protein}/${selectedDailyMenu.totals.carbs}/${selectedDailyMenu.totals.fat}`} sub="gramů" /><Stat title="Výroba" value={money(selectedDailyMenu.totals.cost)} sub="celé menu" /><Stat title="Jídla" value="5" sub="denní porce" /></div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section>
          <h3 className="mb-4 text-2xl font-black">Pět jídel v menu {selectedDailyMenu.name}</h3>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
            {selectedMenuMeals.map((meal) => <Card key={meal.id} className={cls("group h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl", selectedMeal?.id === meal.id ? "ring-4 ring-emerald-400" : "")}>
              <button onClick={() => setSelectedMeal(meal)} className="flex h-full w-full flex-col text-left">
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img src={meal.photo || img.hero} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt={meal.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 flex gap-2"><Badge tone="dark">{meal.portionNumber}. porce</Badge><Badge tone="blue">{meal.meal}</Badge></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="min-h-[64px] text-2xl font-black leading-tight">{meal.title}</h3>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Kcal</p><b>{meal.kcal}</b></div>
                    <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">P/S/T</p><b>{meal.protein}/{meal.carbs}/{meal.fat}</b></div>
                    <div className={cls("rounded-2xl p-3", meal.cost >= 60 ? "bg-rose-50" : meal.cost >= 45 ? "bg-amber-50" : "bg-emerald-50")}><p className="text-xs text-slate-500">Výroba</p><b>{money(meal.cost)}</b></div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2"><Badge tone={costTone(meal.cost)}>{costLabel(meal.cost)} na výrobu</Badge><Badge>{meal.allergens || "bez alergenů"}</Badge></div>
                  <p className="mt-auto pt-4 text-sm font-black text-emerald-700">Klikni pro recepturu a porce →</p>
                </div>
              </button>
            </Card>)}
          </div>

          <Card className="mt-6 p-5">
            <h3 className="text-2xl font-black">Souhrn pěti jídel</h3>
            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200"><table className="w-full text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Porce</th><th className="p-3">Jídlo</th><th className="p-3">Kcal</th><th className="p-3">P/S/T</th><th className="p-3">Cena výroby</th><th className="p-3">Nákladovost</th></tr></thead><tbody>{selectedMenuMeals.map((meal) => <tr key={meal.id} className="border-t"><td className="p-3 font-bold">{meal.portionNumber}. {meal.meal}</td><td className="p-3">{meal.title}</td><td className="p-3">{meal.kcal}</td><td className="p-3">{meal.protein}/{meal.carbs}/{meal.fat} g</td><td className="p-3 text-lg font-black">{money(meal.cost)}</td><td className="p-3"><Badge tone={costTone(meal.cost)}>{costLabel(meal.cost)}</Badge></td></tr>)}</tbody></table></div>
          </Card>
        </section>

        {selectedMeal && <aside className="self-start xl:sticky xl:top-28">
          <Card className="overflow-hidden shadow-lg">
            <img src={selectedMeal.photo || img.hero} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt={selectedMeal.title} className="h-72 w-full object-cover" />
            <div className="p-6">
              <div className="flex flex-wrap gap-2"><Badge>{selectedMeal.menuName}</Badge><Badge tone="blue">{selectedMeal.meal}</Badge><Badge tone={costTone(selectedMeal.cost)}>{money(selectedMeal.cost)} výroba</Badge></div>
              <h2 className="mt-4 text-3xl font-black">{selectedMeal.title}</h2>
              <p className="mt-2 text-slate-600">Detail vybraného jídla, porce, nutriční hodnoty, receptura a výrobní souhrn.</p>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <Stat title="Počet porcí" value={selectedMeal.portions} sub="k výrobě" />
                <Stat title="Cena porce" value={money(selectedMeal.cost)} sub={costLabel(selectedMeal.cost)} />
                <Stat title="Gramáž" value={`${selectedMeal.grams} g`} sub="jedna porce" />
                <Stat title="Food cost" value={money(totalFoodCost)} sub="100 porcí" />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">kcal</p><p className="text-2xl font-black">{selectedMeal.kcal}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">bílkoviny</p><p className="text-2xl font-black">{selectedMeal.protein} g</p></div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">sacharidy</p><p className="text-2xl font-black">{selectedMeal.carbs} g</p></div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">tuky</p><p className="text-2xl font-black">{selectedMeal.fat} g</p></div>
              </div>

              <h3 className="mt-6 text-xl font-black">Receptura a gramáže</h3>
              <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200"><table className="w-full text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Surovina</th><th className="p-3">Na porci</th><th className="p-3">Celkem / 100 porcí</th></tr></thead><tbody>{mealRecipes.length > 0 ? mealRecipes.map((r) => <tr key={r.meal + r.ingredient} className="border-t"><td className="p-3 font-bold">{r.ingredient}</td><td className="p-3">{num(r.perPortion)} {r.unit}</td><td className="p-3 font-black">{num(r.perPortion * selectedMeal.portions)} {r.unit}</td></tr>) : <tr><td colSpan="3" className="p-4 text-amber-800">Pro toto jídlo zatím není vyplněná receptura.</td></tr>}</tbody></table></div>

              <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900"><b>Výrobní souhrn:</b> vyrobit {selectedMeal.portions} porcí, celkem {num(selectedMeal.grams * selectedMeal.portions)} g hotového jídla, odhad surovin v receptuře {num(totalIngredientGrams)} g, food cost {money(totalFoodCost)}.</div>
            </div>
          </Card>
        </aside>}
      </div>
    </>}
  </main>;
}

function ProductionPage({ orders, show }) {
  const [checks, setChecks] = useState({ cooked: false, packed: false, labeled: false, ready: false });
  const active = orders.filter((o) => !["zrušena", "reklamace"].includes(o.status));
  const dailyBoxes = active.reduce((s, o) => s + Number(o.meals || 0), 0);
  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Výroba" title="Denní výrobní plán" text="Dostupné v administraci i limitovaném provozním vstupu." /><div className="grid gap-4 md:grid-cols-4"><Stat title="Výroba dnes" value={dailyBoxes} sub="krabiček" /><Stat title="Aktivní objednávky" value={active.length} sub="dnes" /><Stat title="Jídel v menu" value={weeklyMenu.length} sub="receptur" /><Stat title="Dietní typy" value={new Set(active.map((o) => o.diet)).size} sub="ve výrobě" /></div><div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><Card className="p-5"><h2 className="text-2xl font-black">Přehled pro kuchaře</h2><DataTable headers={["Jídlo", "Porcí", "Dieta", "Alergeny", "Stav"]}>{weeklyMenu.map((m) => <tr key={m.title} className="border-t"><td className="p-3 font-bold">{m.title}</td><td className="p-3">{m.portions}</td><td className="p-3">{m.diets.join(", ")}</td><td className="p-3">{m.allergens || "bez"}</td><td className="p-3"><Select onChange={() => show("Stav jídla uložen.")}><option>čeká</option><option>navařeno</option><option>nabaleno</option><option>označeno</option></Select></td></tr>)}</DataTable></Card><Card className="p-5"><h2 className="text-2xl font-black">Checklist balírny</h2><div className="mt-3 grid gap-3">{[["cooked", "navařeno"], ["packed", "nabaleno"], ["labeled", "označeno"], ["ready", "připraveno k rozvozu"]].map(([key, label]) => <label key={key} className="flex items-center gap-3 rounded-2xl border p-4"><input type="checkbox" checked={checks[key]} onChange={(e) => setChecks({ ...checks, [key]: e.target.checked })} /><b>{label}</b></label>)}</div><button onClick={() => printOrders(active)} className="mt-4 rounded-2xl bg-slate-100 px-5 py-3 font-black">Tisk seznamu krabiček</button></Card></div></main>;
}

function StockPage({ show }) {
  const [stock, setStock] = useState(initialStock);
  const [supplier, setSupplier] = useState("vše");
  const [view, setView] = useState("overview");
  const [manualPrice, setManualPrice] = useState({ ingredient: "Kuřecí prsa", supplier: "Makro s.r.o.", packageAmount: "5000", price: "695", date: "2026-04-27" });
  const [selectedHistoryIngredient, setSelectedHistoryIngredient] = useState("Kuřecí prsa");
  const [priceHistory, setPriceHistory] = useState({
    "Kuřecí prsa": [{ date: "2026-04-01", price: 0.149, supplier: "Kaufland", source: "leták" }, { date: "2026-04-08", price: 0.145, supplier: "Makro s.r.o.", source: "ručně" }, { date: "2026-04-15", price: 0.139, supplier: "Makro s.r.o.", source: "Excel" }, { date: "2026-04-22", price: 0.129, supplier: "Lidl", source: "akce" }],
    "Rýže": [{ date: "2026-04-01", price: 0.036, supplier: "Makro s.r.o.", source: "Excel" }, { date: "2026-04-15", price: 0.0319, supplier: "Tesco", source: "Excel" }, { date: "2026-04-22", price: 0.0299, supplier: "Kaufland", source: "akce" }],
    "Brambory": [{ date: "2026-04-01", price: 0.022, supplier: "Penny Market", source: "ručně" }, { date: "2026-04-15", price: 0.018, supplier: "Kaufland", source: "akce" }],
    "Jerky sušené maso Premium": [{ date: "2026-04-01", price: 0.89, supplier: "Jerky sušené maso Premium – Jakub Horáček", source: "stálá cena" }, { date: "2026-04-15", price: 0.89, supplier: "Jerky sušené maso Premium – Jakub Horáček", source: "stálá cena" }],
  });
  const priceOffers = [
    { ingredient: "Kuřecí prsa", supplier: "Lidl", unitPrice: 0.129, unit: "g", packageText: "1 000 g", price: 129, valid: "29. 4.–5. 5.", limit: "max. 5 kg/osoba", recommendation: "jen doplněk" },
    { ingredient: "Kuřecí prsa", supplier: "Makro s.r.o.", unitPrice: 0.139, unit: "g", packageText: "5 000 g", price: 695, valid: "tento týden", limit: "bez limitu", recommendation: "doporučeno" },
    { ingredient: "Rýže", supplier: "Kaufland", unitPrice: 0.0299, unit: "g", packageText: "1 000 g", price: 29.9, valid: "30. 4.–6. 5.", limit: "bez limitu", recommendation: "doporučeno" },
    { ingredient: "Jerky sušené maso Premium", supplier: "Jerky sušené maso Premium – Jakub Horáček", unitPrice: 0.89, unit: "g", packageText: "1 000 g", price: 890, valid: "stálá cena", limit: "dle domluvy", recommendation: "doporučeno" },
  ];
  const allIngredients = useMemo(() => Array.from(new Set([...stock.map((s) => s.name), ...recipes.map((r) => r.ingredient), ...priceOffers.map((p) => p.ingredient), "Kuřecí prsa", "Rýže", "Tvaroh", "Brokolice", "Vejce", "Losos", "Hovězí maso", "Cottage", "Bílý jogurt"])).sort((a, b) => a.localeCompare(b, "cs")), [stock]);
  const unitForIngredient = (ingredient) => stock.find((s) => s.name === ingredient)?.unit || recipes.find((r) => r.ingredient === ingredient)?.unit || "g";
  const unitPriceLabel = (value, unit) => unit === "g" ? `${num(value * 1000)} Kč/kg` : `${money(value)}/ks`;
  const needed = recipes.map((r) => { const portions = r.meal === "Balení" ? 15 : weeklyMenu.find((m) => m.title === r.meal)?.portions || 0; const need = portions * r.perPortion; const st = stock.find((s) => s.name === r.ingredient); const missing = Math.max(0, need - (st?.stock || 0)); return { ...r, need, stock: st?.stock || 0, missing, best: priceOffers.find((p) => p.ingredient === r.ingredient), estimatedCost: missing * (priceOffers.find((p) => p.ingredient === r.ingredient)?.unitPrice || st?.price || 0) }; });
  const missingItems = needed.filter((n) => n.missing > 0);
  const purchaseTotal = needed.reduce((s, n) => s + n.estimatedCost, 0);
  const tabs = [["overview", "Přehled"], ["items", "Suroviny"], ["suppliers", "Dodavatelé"], ["history", "Historie cen"], ["compare", "Porovnání cen"], ["purchase", "Nákupní plán"], ["receive", "Příjem zboží"], ["foodcost", "Food Cost"]];
  function addManualPrice(e) { e.preventDefault(); const amount = Number(String(manualPrice.packageAmount).replace(",", ".")); const price = Number(String(manualPrice.price).replace(",", ".")); if (!amount || !price) { show("Zadej balení a cenu."); return; } const unitPrice = price / amount; setPriceHistory((prev) => ({ ...prev, [manualPrice.ingredient]: [...(prev[manualPrice.ingredient] || []), { date: manualPrice.date, price: unitPrice, supplier: manualPrice.supplier, source: "ručně" }].sort((a, b) => a.date.localeCompare(b.date)) })); setSelectedHistoryIngredient(manualPrice.ingredient); show(`Cena uložena: ${manualPrice.ingredient} · ${unitPriceLabel(unitPrice, unitForIngredient(manualPrice.ingredient))}`); }
  function supplierShort(name) { return ({ "Makro s.r.o.": "Makro", "Penny Market": "Penny", Tesco: "Tesco", Lidl: "Lidl", Kaufland: "Kaufland", "Jerky sušené maso Premium – Jakub Horáček": "Jerky JH" }[name]) || String(name || "?").slice(0, 9); }
  function PriceChart({ ingredient }) {
    const unit = unitForIngredient(ingredient); const history = [...(priceHistory[ingredient] || [])].sort((a, b) => a.date.localeCompare(b.date));
    if (history.length < 2) return <div className="rounded-2xl bg-slate-50 p-6 text-slate-500">Pro graf jsou potřeba aspoň dvě uložené ceny.</div>;
    const values = history.map((h) => unit === "g" ? h.price * 1000 : h.price); const min = Math.min(...values); const max = Math.max(...values); const width = 760; const height = 300; const pad = 54;
    const points = values.map((value, index) => { const x = pad + (index / Math.max(1, values.length - 1)) * (width - pad * 2); const y = height - pad - ((value - min) / Math.max(1, max - min)) * (height - pad * 2); return { x, y, value, record: history[index] }; });
    return <div className="overflow-x-auto rounded-3xl bg-white p-4 ring-1 ring-slate-200"><svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px] text-emerald-600"><line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="2" /><line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="2" /><polyline points={points.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />{points.map((p, i) => <g key={p.record.date + i}><circle cx={p.x} cy={p.y} r="6" fill="currentColor" /><text x={p.x} y={p.y - 26} textAnchor="middle" className="fill-slate-700 text-xs font-bold">{num(p.value)}</text><text x={p.x} y={p.y - 11} textAnchor="middle" className="fill-emerald-700 text-[10px] font-bold">{supplierShort(p.record.supplier)}</text><text x={p.x} y={height - 18} textAnchor="middle" className="fill-slate-500 text-[10px]">{p.record.date.slice(5)}</text></g>)}<text x={pad} y={25} className="fill-slate-700 text-xs font-bold">Cena {unit === "g" ? "Kč/kg" : "Kč/ks"}</text></svg></div>;
  }
  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Sklad a chytrý nákup" title="Hlídání surovin, cen a nákupního plánu" text="Sklad, dodavatelé, ruční ceny, historie cen s grafem, porovnání a nákupní plán." /><div className="mb-6 grid gap-4 md:grid-cols-4"><Stat title="Chybí dokoupit" value={missingItems.length} sub="položek" /><Stat title="Odhad nákupu" value={money(purchaseTotal)} sub="podle cen" /><Stat title="Rizikové položky" value={stock.filter((s) => s.stock < s.min).length} sub="pod minimem" /><Stat title="Dodavatelé" value={suppliers.length} sub="aktivní" /></div><div className="mb-6 flex flex-wrap gap-2">{tabs.map(([id, label]) => <button key={id} onClick={() => setView(id)} className={cls("rounded-full px-4 py-2 text-sm font-black", view === id ? "bg-emerald-600 text-white" : "bg-white hover:bg-slate-100")}>{label}</button>)}</div>{view === "overview" && <div className="grid gap-5 lg:grid-cols-[1fr_1fr]"><Card className="p-5"><h2 className="text-2xl font-black">Rychlý přehled nákupu</h2><div className="mt-4 grid gap-3">{missingItems.map((n) => <div key={n.ingredient + n.meal} className="rounded-2xl border p-4"><b>{n.ingredient}</b><p className="text-sm text-slate-500">Chybí {num(n.missing)} {n.unit} · {n.best?.supplier || "ručně vybrat"}</p></div>)}</div></Card><Card className="p-5"><h2 className="text-2xl font-black">Doporučení</h2><p className="rounded-2xl bg-amber-50 p-4 text-sm">Kuřecí prsa jsou v Lidlu levná, ale limitovaná. Pro výrobu je vhodnější Makro.</p><p className="mt-3 rounded-2xl bg-emerald-50 p-4 text-sm">Rýže je v akci v Kauflandu. Doporučeno koupit zásobu navíc.</p></Card></div>}{view === "items" && <Card className="p-5"><div className="mb-4 flex flex-wrap gap-2"><Button onClick={() => show("Příjem otevřen v záložce Příjem zboží.")}>Ruční příjem</Button><button onClick={() => show("Výdej surovin uložen v demu.")} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Ruční výdej</button><Select value={supplier} onChange={(e) => setSupplier(e.target.value)} className="w-80"><option>vše</option>{suppliers.map((s) => <option key={s}>{s}</option>)}</Select></div><DataTable headers={["Surovina", "Kategorie", "Skladem", "Minimum", "Stav", "Dodavatel", "Cena"]}>{stock.filter((s) => supplier === "vše" || s.supplier === supplier).map((s) => <tr key={s.id} className="border-t"><td className="p-3 font-bold">{s.name}</td><td className="p-3">{s.category}</td><td className="p-3"><input type="number" value={s.stock} onChange={(e) => setStock(stock.map((x) => x.id === s.id ? { ...x, stock: Number(e.target.value) } : x))} className="w-28 rounded-xl border px-2 py-1" /> {s.unit}</td><td className="p-3">{num(s.min)} {s.unit}</td><td className="p-3"><Badge tone={stockTone(s)}>{s.stock < s.min ? "dochází" : "OK"}</Badge></td><td className="p-3">{s.supplier}</td><td className="p-3">{s.unit === "g" ? `${num(s.price * 1000)} Kč/kg` : `${money(s.price)}/ks`}</td></tr>)}</DataTable></Card>}{view === "suppliers" && <div className="grid gap-5 lg:grid-cols-[1fr_1fr]"><Card className="p-5"><h2 className="text-2xl font-black">Dodavatelé</h2><div className="mt-4 grid gap-3">{suppliers.map((s, i) => <div key={s} className="rounded-2xl border p-4"><div className="flex justify-between"><b>{s}</b><Badge tone={i === 5 ? "green" : "amber"}>skóre {i === 5 ? "9,0" : "7," + i}/10</Badge></div><p className="mt-2 text-sm text-slate-500">Cena, kvalita, dostupnost, reklamace, doprava.</p></div>)}</div></Card><Card className="p-5"><h2 className="text-2xl font-black">Ruční zadání ceny</h2><form onSubmit={addManualPrice} className="mt-4 grid gap-3"><Select value={manualPrice.ingredient} onChange={(e) => { setManualPrice({ ...manualPrice, ingredient: e.target.value }); setSelectedHistoryIngredient(e.target.value); }}>{allIngredients.map((i) => <option key={i}>{i}</option>)}</Select><Select value={manualPrice.supplier} onChange={(e) => setManualPrice({ ...manualPrice, supplier: e.target.value })}>{suppliers.map((s) => <option key={s}>{s}</option>)}</Select><div className="grid gap-3 md:grid-cols-3"><Input value={manualPrice.packageAmount} onChange={(e) => setManualPrice({ ...manualPrice, packageAmount: e.target.value })} placeholder="Balení" /><Input value={manualPrice.price} onChange={(e) => setManualPrice({ ...manualPrice, price: e.target.value })} placeholder="Cena balení" /><Input value={manualPrice.date} onChange={(e) => setManualPrice({ ...manualPrice, date: e.target.value })} placeholder="Datum" /></div><p className="rounded-2xl bg-slate-50 p-4 text-sm">Přepočet: {unitPriceLabel(Number(manualPrice.price) / Math.max(1, Number(manualPrice.packageAmount)), unitForIngredient(manualPrice.ingredient))}</p><Button>Uložit cenu</Button></form><button onClick={() => setView("history")} className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white">Historie cen a graf</button></Card></div>}{view === "history" && <div className="space-y-5"><div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"><Card className="p-5"><h2 className="text-2xl font-black">Nejnižší uložené ceny</h2><DataTable headers={["Surovina", "Nejnižší cena", "Dodavatel", "Datum", "Záznamů"]}>{Object.keys(priceHistory).map((ingredient) => { const unit = unitForIngredient(ingredient); const h = priceHistory[ingredient]; const best = [...h].sort((a, b) => a.price - b.price)[0]; return <tr key={ingredient} className="border-t"><td className="p-3 font-bold"><button onClick={() => setSelectedHistoryIngredient(ingredient)} className="underline decoration-emerald-500 underline-offset-4">{ingredient}</button></td><td className="p-3 font-black">{unitPriceLabel(best.price, unit)}</td><td className="p-3">{best.supplier}</td><td className="p-3">{best.date}</td><td className="p-3">{h.length}</td></tr>; })}</DataTable></Card><Card className="p-5"><div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-black">Graf vývoje ceny</h2><p className="text-sm text-slate-500">U každého bodu je zkratka obchodu nebo dodavatele.</p></div><Select value={selectedHistoryIngredient} onChange={(e) => setSelectedHistoryIngredient(e.target.value)}>{allIngredients.map((i) => <option key={i}>{i}</option>)}</Select></div><PriceChart ingredient={selectedHistoryIngredient} /></Card></div><Card className="p-5"><h2 className="text-2xl font-black">Historie: {selectedHistoryIngredient}</h2><DataTable headers={["Datum", "Dodavatel", "Cena", "Zdroj"]}>{(priceHistory[selectedHistoryIngredient] || []).map((h, i) => <tr key={h.date + i} className="border-t"><td className="p-3 font-bold">{h.date}</td><td className="p-3">{h.supplier}</td><td className="p-3 font-black">{unitPriceLabel(h.price, unitForIngredient(selectedHistoryIngredient))}</td><td className="p-3"><Badge>{h.source}</Badge></td></tr>)}</DataTable></Card></div>}{view === "compare" && <Card className="p-5"><h2 className="text-2xl font-black">Porovnání cen</h2><DataTable headers={["Surovina", "Dodavatel", "Balení", "Cena", "Cena za jednotku", "Platnost", "Limit", "Doporučení"]}>{priceOffers.map((p) => <tr key={p.ingredient + p.supplier} className="border-t"><td className="p-3 font-bold">{p.ingredient}</td><td className="p-3">{p.supplier}</td><td className="p-3">{p.packageText}</td><td className="p-3">{money(p.price)}</td><td className="p-3">{unitPriceLabel(p.unitPrice, p.unit)}</td><td className="p-3">{p.valid}</td><td className="p-3">{p.limit}</td><td className="p-3"><Badge tone={p.recommendation.includes("doporučeno") ? "green" : "amber"}>{p.recommendation}</Badge></td></tr>)}</DataTable></Card>}{view === "purchase" && <Card className="p-5"><div className="mb-4 flex flex-wrap gap-2"><Button onClick={() => show("Nákup schválen.")}>Schválit nákup</Button><button onClick={() => downloadCsv("fit-slim-nakup.csv", ["Surovina", "Potřeba", "Skladem", "Nakoupit", "Jednotka", "Cena"], needed.map((n) => [n.ingredient, n.need, n.stock, n.missing, n.unit, Math.round(n.estimatedCost)]))} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Export Excel</button><button onClick={() => openPrintable("Nákupní plán", `<h1>Fit Slim – nákupní plán</h1><table><tbody>${needed.map((n) => `<tr><td>${n.ingredient}</td><td>Nakoupit ${num(n.missing)} ${n.unit}</td><td>${money(n.estimatedCost)}</td></tr>`).join("")}</tbody></table>`)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">PDF</button><button onClick={() => show("SMS skladníkovi připravena v demu.")} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">SMS skladníkovi</button></div><DataTable headers={["Surovina", "Potřeba", "Skladem", "Nakoupit", "Dodavatel", "Odhad"]}>{needed.map((n) => <tr key={n.ingredient + n.meal} className="border-t"><td className="p-3 font-bold">{n.ingredient}</td><td className="p-3">{num(n.need)} {n.unit}</td><td className="p-3">{num(n.stock)} {n.unit}</td><td className="p-3 font-black">{num(n.missing)} {n.unit}</td><td className="p-3">{n.best?.supplier || "ručně"}</td><td className="p-3">{money(n.estimatedCost)}</td></tr>)}</DataTable></Card>}{view === "receive" && <Card className="p-5"><h2 className="text-2xl font-black">Příjem zboží</h2><div className="mt-4 grid gap-3 md:grid-cols-2"><Select>{suppliers.map((s) => <option key={s}>{s}</option>)}</Select><Select>{allIngredients.map((i) => <option key={i}>{i}</option>)}</Select><Input placeholder="Dodáno množství" defaultValue="76000 g" /><Input placeholder="Skutečná cena" defaultValue="10564 Kč" /><Input placeholder="Šarže" defaultValue="MAK-2026-04-27" /><Input placeholder="Expirace" defaultValue="2026-04-30" /><Input placeholder="Teplota" defaultValue="3,8 °C" /><Button onClick={() => show("Zboží přijato na sklad v demu.")}>Přijmout na sklad</Button></div></Card>}{view === "foodcost" && <div className="grid gap-5 lg:grid-cols-[1fr_1fr]"><Card className="p-5"><h2 className="text-2xl font-black">Food Cost</h2><DataTable headers={["Surovina", "Množství", "Cena", "Cena na porci"]}>{[["Kuřecí prsa", "180 g", "139 Kč/kg", 25.02], ["Rýže", "80 g", "29,90 Kč/kg", 2.39], ["Brokolice", "120 g", "45 Kč/kg", 5.4], ["Obal", "1 ks", "5 Kč/ks", 5]].map((r) => <tr key={r[0]} className="border-t"><td className="p-3 font-bold">{r[0]}</td><td className="p-3">{r[1]}</td><td className="p-3">{r[2]}</td><td className="p-3">{money(r[3])}</td></tr>)}</DataTable></Card><Card className="p-5"><h2 className="text-2xl font-black">Marže</h2><div className="mt-4 grid gap-3"><Stat title="Náklad" value="42 Kč" sub="suroviny + obal" /><Stat title="Prodejní cena" value="129 Kč" sub="porce" /><Stat title="Food cost" value="32,6 %" sub="orientačně" /></div></Card></div>}</main>;
}

function DeliveryPage({ orders, setOrders, show }) {
  const today = orders.filter((o) => o.status !== "zrušena");
  const move = (id, dir) => { const index = orders.findIndex((o) => o.id === id); const newIndex = index + dir; if (newIndex < 0 || newIndex >= orders.length) return; const copy = [...orders]; [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]]; setOrders(copy); };
  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Rozvoz" title="Trasy, řidiči a stav doručení" text="Dostupné v administraci i limitovaném provozním vstupu." /><div className="grid gap-4 md:grid-cols-4"><Stat title="Zastávky" value={today.length} sub="dnes" /><Stat title="Trasy" value={new Set(today.map((o) => o.route)).size} sub="rozdělení" /><Stat title="Řidiči" value={drivers.length} sub="aktivní" /><Stat title="Předáno" value={today.filter((o) => o.status === "předaná řidiči").length} sub="objednávek" /></div><Card className="mt-6 p-5"><div className="mb-4 flex flex-wrap gap-2"><button onClick={() => printDelivery(today)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Tisk rozvozu</button><button onClick={() => exportDelivery(today)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Export Excel</button><button onClick={() => show("Demo: mapa adres by se napojila na Mapy.cz nebo Google Maps.")} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Základní mapa</button></div><DataTable headers={["Pořadí", "Zákazník", "Telefon", "Adresa", "Trasa", "Řidič", "Poznámka", "Stav"]}>{today.map((o, i) => <tr key={o.id} className="border-t"><td className="p-3"><button onClick={() => move(o.id, -1)} className="rounded bg-slate-100 px-2">↑</button><button onClick={() => move(o.id, 1)} className="ml-1 rounded bg-slate-100 px-2">↓</button> <b>{i + 1}</b></td><td className="p-3 font-bold">{o.customer}</td><td className="p-3">{o.phone}</td><td className="p-3">{o.address}</td><td className="p-3"><Select value={o.route} onChange={(e) => setOrders(orders.map((x) => x.id === o.id ? { ...x, route: e.target.value } : x))}>{routes.map((r) => <option key={r}>{r}</option>)}</Select></td><td className="p-3"><Select value={o.driver} onChange={(e) => setOrders(orders.map((x) => x.id === o.id ? { ...x, driver: e.target.value } : x))}>{drivers.map((d) => <option key={d}>{d}</option>)}</Select></td><td className="p-3">{o.driverNote}</td><td className="p-3"><Select value={o.status} onChange={(e) => setOrders(orders.map((x) => x.id === o.id ? { ...x, status: e.target.value } : x))}>{orderStatuses.map((s) => <option key={s}>{s}</option>)}</Select></td></tr>)}</DataTable></Card></main>;
}

function CommunicationPage({ show }) {
  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Komunikace" title="Automatické e-maily a SMS" text="Šablony zpráv podle stavu objednávky." /><div className="grid gap-5 md:grid-cols-2">{communications.map((c) => <Card key={c.trigger} className="p-5"><div className="flex items-center justify-between gap-3"><h3 className="text-xl font-black">{c.trigger}</h3><Badge tone={c.channel.includes("SMS") ? "blue" : "green"}>{c.channel}</Badge></div><p className="mt-3 rounded-2xl bg-slate-50 p-4 text-slate-700">{c.text}</p><div className="mt-3 flex gap-2"><button onClick={() => show("Šablona upravena v demu.")} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold">Upravit</button><button onClick={() => show(`Test zprávy odeslán: ${c.trigger}`)} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold">Odeslat test</button></div></Card>)}</div></main>;
}

function PaymentsPage({ orders, setOrders, show }) {
  const unpaid = orders.filter((o) => o.payment !== "zaplaceno");
  return <main className="mx-auto max-w-7xl px-4 py-10"><PageHead badge="Platby" title="Platby a faktury" text="Online karta, převod, dobírka, párování plateb, faktury a export pro účetní." /><div className="grid gap-4 md:grid-cols-4"><Stat title="Zaplaceno" value={money(orders.filter((o) => o.payment === "zaplaceno").reduce((s, o) => s + o.total, 0))} sub="uhrazeno" /><Stat title="Nezaplaceno" value={unpaid.length} sub="objednávek" /><Stat title="Převod" value="ANO" sub="bankovní převod" /><Stat title="Karta" value="ANO" sub="platební brána" /></div><Card className="mt-6 p-5"><div className="mb-4 flex flex-wrap gap-2"><Button onClick={() => show("Platby automaticky spárovány v demu.")}>Spárovat platby</Button><button onClick={() => printInvoices(orders)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Faktury PDF</button><button onClick={() => exportPayments(orders)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Export účetní</button></div><DataTable headers={["Objednávka", "Zákazník", "Částka", "Metoda", "Stav", "Akce"]}>{orders.map((o) => <tr key={o.id} className="border-t"><td className="p-3 font-black">{o.id}</td><td className="p-3">{o.customer}</td><td className="p-3 font-bold">{money(o.total)}</td><td className="p-3">převod / karta / dobírka</td><td className="p-3"><Badge tone={o.payment === "zaplaceno" ? "green" : "amber"}>{o.payment}</Badge></td><td className="p-3"><button onClick={() => setOrders(orders.map((x) => x.id === o.id ? { ...x, payment: "zaplaceno", status: "zaplacená" } : x))} className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-black text-white">Potvrdit platbu</button></td></tr>)}</DataTable></Card></main>;
}

function CashflowPage({ orders, show }) {
  const [selectedMonth, setSelectedMonth] = useState(cashflowData[cashflowData.length - 1].month);
  const enriched = cashflowData.map((m, index) => {
    const costs = m.food + m.wages + m.rent + m.delivery + m.marketing + m.packaging + m.energy + m.other;
    const profit = m.revenue - costs;
    const margin = m.revenue ? profit / m.revenue : 0;
    const cashInBank = 120000 + cashflowData.slice(0, index + 1).reduce((sum, x) => {
      const xCosts = x.food + x.wages + x.rent + x.delivery + x.marketing + x.packaging + x.energy + x.other;
      return sum + x.revenue - xCosts - x.receivables + x.payables;
    }, 0);
    return { ...m, costs, profit, margin, cashInBank };
  });
  const current = enriched.find((m) => m.month === selectedMonth) || enriched[enriched.length - 1];
  const previous = enriched[Math.max(0, enriched.findIndex((m) => m.month === current.month) - 1)] || current;
  const totalRevenue = enriched.reduce((s, m) => s + m.revenue, 0);
  const totalCosts = enriched.reduce((s, m) => s + m.costs, 0);
  const totalProfit = enriched.reduce((s, m) => s + m.profit, 0);
  const avgMargin = totalRevenue ? totalProfit / totalRevenue : 0;
  const monthGrowth = previous.revenue ? (current.revenue - previous.revenue) / previous.revenue : 0;
  const breakEvenOrders = Math.ceil(current.costs / 568);
  const foodCostRatio = current.revenue ? current.food / current.revenue : 0;
  const wagesRatio = current.revenue ? current.wages / current.revenue : 0;
  const deliveryCostPerOrder = orders.length ? current.delivery / orders.length : 0;
  const chartMax = Math.max(...enriched.map((m) => Math.max(m.revenue, m.costs, m.profit))) * 1.08;
  const costParts = [
    ["Suroviny", current.food], ["Mzdy", current.wages], ["Nájem", current.rent], ["Rozvoz", current.delivery],
    ["Marketing", current.marketing], ["Obaly", current.packaging], ["Energie", current.energy], ["Ostatní", current.other]
  ];
  const pieColors = ["#059669", "#2563eb", "#f59e0b", "#dc2626", "#7c3aed", "#0f766e", "#9333ea", "#475569"];
  let pieStart = 0;
  const pieStops = costParts.map(([, value], index) => {
    const start = pieStart;
    const end = pieStart + (value / Math.max(1, current.costs)) * 100;
    pieStart = end;
    return `${pieColors[index]} ${start}% ${end}%`;
  }).join(", ");
  const bestMonth = [...enriched].sort((a, b) => b.profit - a.profit)[0];
  const weakestCost = [...costParts].sort((a, b) => b[1] - a[1])[0];
  const recommendations = [
    { title: "Snížit food cost", text: foodCostRatio > 0.24 ? "Suroviny jsou vysoko. Zkontrolovat nákupní ceny, využít Sklad a chytrý nákup, přepočítat receptury a omezit ztráty ve výrobě." : "Food cost je v dobrém pásmu. Držet kontrolu cen surovin a hlídat marži u dražších menu.", tone: foodCostRatio > 0.24 ? "amber" : "green" },
    { title: "Optimalizovat rozvoz", text: `Rozvoz vychází přibližně na ${money(deliveryCostPerOrder)} na aktivní objednávku v demu. Pomůže slučování tras, méně přejezdů a jasná časová okna.`, tone: "blue" },
    { title: "Zvýšit průměrnou objednávku", text: "Nabízet delší předplatné, VIP Dobrák menu, doplňky, proteinové dezerty a věrnostní program. Cíl: větší hodnota zákazníka bez stejného růstu rozvozu.", tone: "green" },
    { title: "Hlídání cash rezervy", text: current.cashInBank < 250000 ? "Hotovostní rezerva je nízká. Omezit velké nákupy bez schválení a rychleji vymáhat nezaplacené objednávky." : "Rezerva je použitelná. Část zisku lze dát do marketingu a lepší automatizace výroby.", tone: current.cashInBank < 250000 ? "red" : "green" },
    { title: "Mzdy a směny", text: wagesRatio > 0.2 ? "Mzdy tvoří vyšší podíl tržeb. Zkontrolovat směny podle skutečného počtu krabiček, výkon balírny a přesčasy." : "Mzdy jsou v rozumném poměru. Udržet plánování směn podle výrobního plánu.", tone: wagesRatio > 0.2 ? "amber" : "green" },
  ];

  function exportCashflow() {
    downloadCsv("fit-slim-cashflow.csv", ["Měsíc", "Tržby", "Náklady", "Zisk", "Marže", "Cash na účtu", "Pohledávky", "Závazky"], enriched.map((m) => [m.month, m.revenue, m.costs, m.profit, `${Math.round(m.margin * 100)} %`, m.cashInBank, m.receivables, m.payables]));
  }

  return <main className="mx-auto max-w-7xl px-4 py-10">
    <PageHead badge="Cashflow" title="Měsíční cashflow, náklady, zisky a doporučení" text="Přehled peněz ve firmě: tržby, náklady, zisk, marže, hotovost, pohledávky, závazky a návrhy, co udělat pro lepší prosperitu." />

    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">{enriched.map((m) => <button key={m.month} onClick={() => setSelectedMonth(m.month)} className={cls("rounded-full px-4 py-2 text-sm font-black", selectedMonth === m.month ? "bg-emerald-600 text-white" : "bg-white hover:bg-slate-100")}>{m.month}</button>)}</div>
      <div className="flex flex-wrap gap-2"><button onClick={exportCashflow} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">Export cashflow</button><button onClick={() => openPrintable("Cashflow", `<h1>Fit Slim – cashflow</h1><p>Měsíc: ${current.month}</p><p>Tržby: ${money(current.revenue)}</p><p>Náklady: ${money(current.costs)}</p><p>Zisk: ${money(current.profit)}</p><p>Marže: ${Math.round(current.margin * 100)} %</p>`)} className="rounded-2xl bg-slate-100 px-5 py-3 font-black">PDF přehled</button></div>
    </div>

    <div className="grid gap-4 md:grid-cols-4">
      <Stat title="Tržby" value={money(current.revenue)} sub={`${monthGrowth >= 0 ? "+" : ""}${Math.round(monthGrowth * 100)} % proti minulému měsíci`} />
      <Stat title="Náklady" value={money(current.costs)} sub="suroviny, mzdy, rozvoz, obaly" />
      <Stat title="Zisk" value={money(current.profit)} sub={`marže ${Math.round(current.margin * 100)} %`} />
      <Stat title="Cash na účtu" value={money(current.cashInBank)} sub="odhad po pohledávkách a závazcích" />
    </div>

    <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
      <Card className="p-5"><div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-black">Tržby, náklady a zisk po měsících</h2><p className="text-sm text-slate-500">Zelená = tržby, tmavá = náklady, oranžová = zisk.</p></div><Badge tone="green">Nejlepší měsíc: {bestMonth.month} · {money(bestMonth.profit)}</Badge></div><div className="overflow-x-auto"><svg viewBox="0 0 980 380" className="min-w-[980px]"><line x1="50" y1="320" x2="950" y2="320" stroke="#cbd5e1" strokeWidth="2" />{enriched.map((m, i) => { const x = 65 + i * 74; const revH = (m.revenue / chartMax) * 250; const costH = (m.costs / chartMax) * 250; const profitH = (m.profit / chartMax) * 250; return <g key={m.month}><rect x={x} y={320 - revH} width="18" height={revH} rx="5" fill="#059669" /><rect x={x + 22} y={320 - costH} width="18" height={costH} rx="5" fill="#0f172a" /><rect x={x + 44} y={320 - profitH} width="18" height={profitH} rx="5" fill="#f59e0b" /><text x={x + 31} y="345" textAnchor="middle" className="fill-slate-500 text-[11px] font-bold">{m.month.slice(0, 3)}</text><text x={x + 31} y={305 - Math.max(revH, costH, profitH)} textAnchor="middle" className="fill-slate-700 text-[10px] font-bold">{Math.round(m.profit / 1000)}k</text></g>; })}<text x="50" y="28" className="fill-slate-600 text-xs font-bold">Kč</text></svg></div></Card>

      <Card className="p-5"><h2 className="text-2xl font-black">Koláč nákladů</h2><p className="mt-1 text-sm text-slate-500">Rozpad nákladů za {current.month}</p><div className="mx-auto mt-5 flex h-56 w-56 items-center justify-center rounded-full shadow-inner" style={{ background: `conic-gradient(${pieStops})` }}><div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-center"><div><p className="text-xs text-slate-500">Náklady</p><p className="text-xl font-black">{money(current.costs)}</p></div></div></div><div className="mt-5 grid gap-2">{costParts.map(([label, value], i) => <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm"><span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: pieColors[i] }} />{label}</span><b>{money(value)}</b></div>)}</div></Card>
    </div>

    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      <Card className="p-5"><h2 className="text-xl font-black">Souhrn roku</h2><div className="mt-4 grid gap-3"><Stat title="Tržby rok" value={money(totalRevenue)} sub="součet měsíců" /><Stat title="Náklady rok" value={money(totalCosts)} sub="součet měsíců" /><Stat title="Zisk rok" value={money(totalProfit)} sub={`průměrná marže ${Math.round(avgMargin * 100)} %`} /></div></Card>
      <Card className="p-5"><h2 className="text-xl font-black">Provozní limity</h2><div className="mt-4 space-y-3 text-sm"><p className="rounded-2xl bg-slate-50 p-4"><b>Bod zvratu:</b> cca {breakEvenOrders} denních objednávek při průměru {money(568)}.</p><p className="rounded-2xl bg-slate-50 p-4"><b>Největší náklad:</b> {weakestCost[0]} · {money(weakestCost[1])}.</p><p className="rounded-2xl bg-slate-50 p-4"><b>Pohledávky:</b> {money(current.receivables)}. Hlídání nezaplacených objednávek zlepšuje cashflow hned.</p></div></Card>
      <Card className="p-5"><h2 className="text-xl font-black">Rychlé akce</h2><div className="mt-4 grid gap-2"><button onClick={() => show("Doporučení: projít dodavatele s největším zdražením v Historii cen.")} className="rounded-2xl bg-slate-100 px-4 py-3 text-left font-black">Zkontrolovat nákupní ceny</button><button onClick={() => show("Doporučení: spustit připomínku nezaplacených objednávek.")} className="rounded-2xl bg-slate-100 px-4 py-3 text-left font-black">Upomenout nezaplacené</button><button onClick={() => show("Doporučení: navýšit marketing u menu s nejvyšší marží.")} className="rounded-2xl bg-slate-100 px-4 py-3 text-left font-black">Podpořit zisková menu</button><button onClick={() => show("Doporučení: optimalizovat trasy podle okresů a časových oken.")} className="rounded-2xl bg-slate-100 px-4 py-3 text-left font-black">Zlevnit rozvoz</button></div></Card>
    </div>

    <Card className="mt-6 p-5"><h2 className="text-2xl font-black">Co udělat, aby firma prosperovala</h2><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{recommendations.map((r) => <div key={r.title} className="rounded-3xl border border-slate-200 bg-white p-5"><Badge tone={r.tone}>{r.title}</Badge><p className="mt-3 text-sm leading-6 text-slate-600">{r.text}</p></div>)}</div></Card>

    <Card className="mt-6 p-5"><h2 className="text-2xl font-black">Detail měsíce {current.month}</h2><DataTable headers={["Položka", "Částka", "Podíl na tržbách", "Komentář"]}>{[
      ["Tržby", current.revenue, "100 %", "Příjem z objednávek a předplatných."],
      ["Suroviny", current.food, `${Math.round(foodCostRatio * 100)} %`, "Hlídat přes chytrý nákup a historii cen."],
      ["Mzdy", current.wages, `${Math.round(wagesRatio * 100)} %`, "Plánovat směny podle výrobního plánu."],
      ["Rozvoz", current.delivery, `${Math.round((current.delivery / current.revenue) * 100)} %`, "Optimalizovat trasy a časová okna."],
      ["Marketing", current.marketing, `${Math.round((current.marketing / current.revenue) * 100)} %`, "Měřit návratnost kampaní."],
      ["Zisk", current.profit, `${Math.round(current.margin * 100)} %`, "Výsledek po provozních nákladech."],
    ].map((row) => <tr key={row[0]} className="border-t"><td className="p-3 font-bold">{row[0]}</td><td className="p-3 font-black">{money(row[1])}</td><td className="p-3">{row[2]}</td><td className="p-3 text-slate-600">{row[3]}</td></tr>)}</DataTable></Card>
  </main>;
}

function AdminPortal({ orders, setOrders, customers, show }) {
  const [tab, setTab] = useState("dashboard");
  const tabs = [["dashboard", "Přehled"], ["orders", "Objednávky"], ["customers", "Zákazníci"], ["menu", "Jídelníček"], ["production", "Výroba"], ["stock", "Sklad a chytrý nákup"], ["delivery", "Rozvoz"], ["communication", "Komunikace"], ["payments", "Platby"], ["cashflow", "Cashflow"]];
  return <div><div className="border-b bg-white"><div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4">{tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={cls("rounded-full px-4 py-2 text-sm font-black", tab === id ? "bg-emerald-600 text-white" : "bg-slate-100")}>{label}</button>)}</div></div>{tab === "dashboard" && <Dashboard orders={orders} customers={customers} />}{tab === "orders" && <OrdersPage orders={orders} setOrders={setOrders} show={show} />}{tab === "customers" && <CustomersPage orders={orders} customers={customers} show={show} />}{tab === "menu" && <MenuPage show={show} />}{tab === "production" && <ProductionPage orders={orders} show={show} />}{tab === "stock" && <StockPage show={show} />}{tab === "delivery" && <DeliveryPage orders={orders} setOrders={setOrders} show={show} />}{tab === "communication" && <CommunicationPage show={show} />}{tab === "payments" && <PaymentsPage orders={orders} setOrders={setOrders} show={show} />}{tab === "cashflow" && <CashflowPage orders={orders} show={show} />}</div>;
}

function WorkerOwnerHeader() {
  return <section className="relative overflow-hidden bg-slate-950 text-white">
    <img src={ownerWorkerHeaderPhoto || img.hero} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = img.hero; }} alt="Záhlaví provozní zóny" className="absolute inset-0 h-full w-full object-cover opacity-75" />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/10" />
    <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="max-w-2xl">
        <Badge tone="dark">Majitel firmy</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Výroba, sklad a rozvoz</h1>
        <p className="mt-4 text-lg leading-8 text-slate-100">Provozní zóna pro skladníky, kuchaře, balírnu a řidiče. Hlavní fotka vedení je vždy nahoře, aby bylo hned vidět, kdo za firmou stojí.</p>
        <p className="mt-6 inline-flex rounded-2xl bg-white/90 px-5 py-3 text-lg font-black text-slate-950">Zdravá volba. Lepší život.</p>
      </div>
    </div>
  </section>;
}

function WorkerPortal({ orders, setOrders, show }) {
  const [tab, setTab] = useState("production");
  const tabs = [["production", "Výroba"], ["stock", "Sklad a chytrý nákup"], ["delivery", "Rozvoz"]];
  return <div><WorkerOwnerHeader /><div className="border-b bg-white"><div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4">{tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={cls("rounded-full px-4 py-2 text-sm font-black", tab === id ? "bg-emerald-600 text-white" : "bg-slate-100")}>{label}</button>)}</div></div>{tab === "production" && <ProductionPage orders={orders} show={show} />}{tab === "stock" && <StockPage show={show} />}{tab === "delivery" && <DeliveryPage orders={orders} setOrders={setOrders} show={show} />}</div>;
}

export default function App() {
  const [active, setActive] = useState("web");
  const [orders, setOrders] = useState(initialOrders);
  const [customers, setCustomers] = useState(initialCustomers);
  const [adminLogged, setAdminLogged] = useState(false);
  const [workerLogged, setWorkerLogged] = useState(false);
  const { show, Notice } = useNotice();

  useEffect(() => {
    document.title = "Denní menu U Jakuba";

    let manifest = document.querySelector('link[rel="manifest"]');
    if (!manifest) {
      manifest = document.createElement("link");
      manifest.setAttribute("rel", "manifest");
      document.head.appendChild(manifest);
    }
    manifest.setAttribute("href", "/manifest.json");

    let theme = document.querySelector('meta[name="theme-color"]');
    if (!theme) {
      theme = document.createElement("meta");
      theme.setAttribute("name", "theme-color");
      document.head.appendChild(theme);
    }
    theme.setAttribute("content", "#111111");
  }, []);

  return <div className="min-h-screen bg-slate-50 text-slate-950"><AppNav active={active} setActive={setActive} />{active === "web" && <WebPage setActive={setActive} />}{active === "customer" && <CustomerPage orders={orders} setOrders={setOrders} customers={customers} setCustomers={setCustomers} show={show} />}{active === "admin" && (adminLogged ? <AdminPortal orders={orders} setOrders={setOrders} customers={customers} show={show} /> : <LoginGate title="Administrace" password="admin" onLogin={() => setAdminLogged(true)} />)}{active === "worker" && (workerLogged ? <WorkerPortal orders={orders} setOrders={setOrders} show={show} /> : <LoginGate title="Výroba / sklad / rozvoz" password="sklad" onLogin={() => setWorkerLogged(true)} />)}<footer className="mt-12 bg-slate-950 px-4 py-10 text-white"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4"><div><h3 className="text-2xl font-black">{company.name}</h3><p className="mt-2 text-slate-300">{company.claim}</p></div><div><b>Kontakt</b><p className="mt-2 text-slate-300">{company.phone}<br />{company.email}</p></div><div><b>Adresa</b><p className="mt-2 text-slate-300">{company.address}<br />IČO: {company.ico}</p></div><div><b>Vstupy</b><p className="mt-2 text-slate-300">Administrace: admin<br />Výroba/sklad/rozvoz: sklad</p></div></div></footer><Notice /></div>;
}
