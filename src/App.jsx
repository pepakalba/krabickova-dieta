import React, { useMemo, useState } from "react";

const dietVariants = [
  { id: "redukce", name: "Redukční krabička", headline: "Lehké, vyvážené a efektivní – ideální pro zdravé hubnutí", description: "Chutné jídlo, které podpoří hubnutí – bez hladu a zbytečných kalorií.", image: "redukce.webp", kcal: "1 500–1 800 kcal", meals: "5 jídel denně", dayPrice: 399 },
  { id: "bezlaktozy", name: "Bezlaktózová krabička", headline: "Skvělá chuť bez laktózy – zdravé a vyvážené jídlo pro každý den.", description: "Ideální volba pro ty, kteří hledají lehké, zdravé a chutné stravování bez kompromisů.", image: "bezlaktozova.webp", kcal: "1 700–2 100 kcal", meals: "5 jídel denně", dayPrice: 429 },
  { id: "bezlepku", name: "Bezlepková krabička", headline: "Vyvážené a chutné jídlo bez obsahu lepku.", description: "Kompletní bezlepkový program s chutnými a zdravými jídly na celý den.", image: "bezlepkova-krabicka.webp", kcal: "1 700–2 200 kcal", meals: "5 jídel denně", dayPrice: 449 },
];

const initialOrders = [
  { id: "OBJ-1001", customer: "Petr Novák", phone: "+420 777 111 222", email: "petr.novak@email.cz", program: "Redukční krabička", kcal: "1 800 kcal", meals: 5, days: 10, total: 3990, deliveryDate: "2026-04-27", address: "Teplice, Masarykova 12", payment: "Zaplaceno", paymentMethod: "Kartou online", status: "Nová", note: "Bez rajčat" },
  { id: "OBJ-1002", customer: "Lucie Dvořáková", phone: "+420 606 222 333", email: "lucie@email.cz", program: "Bezlaktózová krabička", kcal: "2 000 kcal", meals: 5, days: 20, total: 8580, deliveryDate: "2026-04-27", address: "Ústí nad Labem, Klíšská 8", payment: "Čeká na platbu", paymentMethod: "Bankovní převod", status: "Ve výrobě", note: "Bez laktózy, nevolat před 9:00" },
  { id: "OBJ-1003", customer: "Martin Černý", phone: "+420 731 333 444", email: "martin@email.cz", program: "Bezlepková krabička", kcal: "2 200 kcal", meals: 5, days: 5, total: 2245, deliveryDate: "2026-04-28", address: "Bílina, Pražská 31", payment: "Zaplaceno", paymentMethod: "Hotově při doručení", status: "Připraveno", note: "Doručit po 17:00" },
];

const menu = [
  { day: "Pondělí", meal: "Snídaně", title: "Ovesná kaše s proteinem", kcal: 420, protein: 32, carbs: 48, fat: 10, variant: "Redukční", portions: 18 },
  { day: "Pondělí", meal: "Oběd", title: "Kuřecí prsa, rýže, zelenina", kcal: 620, protein: 48, carbs: 66, fat: 14, variant: "Redukční", portions: 18 },
  { day: "Pondělí", meal: "Snídaně", title: "Rýžová kaše s ovocem bez laktózy", kcal: 450, protein: 24, carbs: 62, fat: 9, variant: "Bezlaktózová", portions: 22 },
  { day: "Pondělí", meal: "Oběd", title: "Krůtí maso s bramborem a zeleninou", kcal: 650, protein: 44, carbs: 58, fat: 18, variant: "Bezlepková", portions: 14 },
  { day: "Úterý", meal: "Svačina", title: "Proteinový dezert s ovocem", kcal: 310, protein: 26, carbs: 28, fat: 8, variant: "Redukční", portions: 18 },
  { day: "Úterý", meal: "Večeře", title: "Hovězí ragú s rýží", kcal: 590, protein: 41, carbs: 55, fat: 18, variant: "Bezlepková", portions: 14 },
];

const routeStops = [
  { order: 1, customer: "Petr Novák", city: "Teplice", address: "Masarykova 12", time: "08:15–08:45", paid: true },
  { order: 2, customer: "Lucie Dvořáková", city: "Ústí nad Labem", address: "Klíšská 8", time: "09:10–09:40", paid: false },
  { order: 3, customer: "Martin Černý", city: "Bílina", address: "Pražská 31", time: "17:00–18:00", paid: true },
];

const initialStock = [
  { id: "S001", name: "Kuřecí prsa", category: "Maso", unit: "kg", stock: 22.5, min: 12, reserved: 8.4, price: 139, supplier: "Maso Sever", expires: "2026-04-30" },
  { id: "S002", name: "Krůtí maso", category: "Maso", unit: "kg", stock: 5.2, min: 8, reserved: 4.1, price: 159, supplier: "Maso Sever", expires: "2026-04-29" },
  { id: "S003", name: "Rýže basmati", category: "Příloha", unit: "kg", stock: 18.0, min: 10, reserved: 9.8, price: 49, supplier: "Gastro sklad", expires: "2027-02-10" },
  { id: "S004", name: "Brambory", category: "Příloha", unit: "kg", stock: 10.5, min: 15, reserved: 12.0, price: 18, supplier: "Zelenina Ústí", expires: "2026-05-05" },
  { id: "S005", name: "Brokolice", category: "Zelenina", unit: "kg", stock: 4.2, min: 6, reserved: 7.2, price: 59, supplier: "Zelenina Ústí", expires: "2026-04-28" },
  { id: "S006", name: "Bezlaktozový jogurt", category: "Bez laktózy", unit: "kg", stock: 9.0, min: 5, reserved: 6.5, price: 75, supplier: "Mlékárna", expires: "2026-05-01" },
  { id: "S007", name: "Ovesné vločky", category: "Suché potraviny", unit: "kg", stock: 12.0, min: 6, reserved: 5.4, price: 32, supplier: "Gastro sklad", expires: "2027-01-18" },
  { id: "S008", name: "Protein vanilka", category: "Doplňky", unit: "kg", stock: 2.8, min: 3, reserved: 1.6, price: 420, supplier: "Fitness food", expires: "2027-04-11" },
  { id: "S009", name: "Krabičky 1 000 ml", category: "Obaly", unit: "ks", stock: 340, min: 500, reserved: 15, price: 4, supplier: "Obaly CZ", expires: "-" },
  { id: "S010", name: "Etikety", category: "Obaly", unit: "ks", stock: 620, min: 800, reserved: 15, price: 1, supplier: "Tisk servis", expires: "-" },
];

const recipeRequirements = [
  { meal: "Kuřecí prsa, rýže, zelenina", item: "Kuřecí prsa", perPortion: 0.18, unit: "kg", portions: 18 },
  { meal: "Kuřecí prsa, rýže, zelenina", item: "Rýže basmati", perPortion: 0.12, unit: "kg", portions: 18 },
  { meal: "Kuřecí prsa, rýže, zelenina", item: "Brokolice", perPortion: 0.10, unit: "kg", portions: 18 },
  { meal: "Krůtí maso s bramborem a zeleninou", item: "Krůtí maso", perPortion: 0.20, unit: "kg", portions: 14 },
  { meal: "Krůtí maso s bramborem a zeleninou", item: "Brambory", perPortion: 0.25, unit: "kg", portions: 14 },
  { meal: "Ovesná kaše s proteinem", item: "Ovesné vločky", perPortion: 0.08, unit: "kg", portions: 18 },
  { meal: "Ovesná kaše s proteinem", item: "Protein vanilka", perPortion: 0.025, unit: "kg", portions: 18 },
  { meal: "Rýžová kaše s ovocem bez laktózy", item: "Bezlaktozový jogurt", perPortion: 0.18, unit: "kg", portions: 22 },
  { meal: "Balení dnešní výroby", item: "Krabičky 1 000 ml", perPortion: 1, unit: "ks", portions: 15 },
  { meal: "Balení dnešní výroby", item: "Etikety", perPortion: 1, unit: "ks", portions: 15 },
];

function money(value) {
  return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(value);
}

function number(value) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 2 }).format(value);
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Badge({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-slate-100 text-slate-700", green: "bg-green-100 text-green-800", blue: "bg-blue-100 text-blue-800", amber: "bg-amber-100 text-amber-800", rose: "bg-rose-100 text-rose-800", red: "bg-red-100 text-red-800", purple: "bg-purple-100 text-purple-800"
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone] || tones.gray}`}>{children}</span>;
}

function StatCard({ title, value, subtitle }) {
  return <Card className="p-5"><p className="text-sm text-slate-500">{title}</p><p className="mt-1 text-3xl font-bold text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-400">{subtitle}</p></Card>;
}

function statusTone(status) {
  if (status === "Nová") return "blue";
  if (status === "Ve výrobě") return "amber";
  if (status === "Připraveno" || status === "Doručeno") return "green";
  if (status === "Zrušeno") return "red";
  return "gray";
}

function paymentTone(payment) {
  if (payment === "Zaplaceno") return "green";
  if (payment === "Čeká na platbu") return "amber";
  if (payment === "Nezaplaceno") return "red";
  if (payment === "Vráceno") return "purple";
  return "gray";
}

function stockTone(item) {
  if (item.stock - item.reserved < 0) return "red";
  if (item.stock <= item.min || item.stock - item.reserved < item.min * 0.5) return "amber";
  return "green";
}

function stockLabel(item) {
  if (item.stock - item.reserved < 0) return "Chybí";
  if (item.stock <= item.min || item.stock - item.reserved < item.min * 0.5) return "Nízký stav";
  return "OK";
}

function VariantCard({ variant, onOrder }) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-52 items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 p-6"><div className="text-center"><div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl shadow-sm">🥗</div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{variant.image}</p></div></div>
      <div className="p-6"><h3 className="text-2xl font-bold">{variant.name}</h3><p className="mt-3 font-semibold text-slate-700">{variant.headline}</p><p className="mt-3 text-sm leading-6 text-slate-500">{variant.description}</p><div className="mt-5 flex flex-wrap gap-2"><Badge tone="green">{variant.kcal}</Badge><Badge>{variant.meals}</Badge><Badge tone="blue">od {variant.dayPrice} Kč / den</Badge></div><button onClick={() => onOrder(variant)} className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Objednat</button></div>
    </Card>
  );
}

export default function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [stock, setStock] = useState(initialStock);
  const [search, setSearch] = useState("");
  const [stockSearch, setStockSearch] = useState("");
  const [program, setProgram] = useState("all");
  const [activeTab, setActiveTab] = useState("web");
  const [selectedVariant, setSelectedVariant] = useState(dietVariants[0]);
  const [selectedOrderId, setSelectedOrderId] = useState(initialOrders[0].id);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", days: "10", paymentMethod: "Bankovní převod", note: "" });
  const [sentMessage, setSentMessage] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState({});

  const purchaseList = useMemo(() => {
    const totals = {};
    recipeRequirements.forEach((req) => {
      const needed = req.perPortion * req.portions;
      if (!totals[req.item]) totals[req.item] = { item: req.item, unit: req.unit, needed: 0, meals: [] };
      totals[req.item].needed += needed;
      totals[req.item].meals.push(req.meal);
    });
    return Object.values(totals).map((row) => {
      const s = stock.find((x) => x.name === row.item);
      const available = s ? s.stock : 0;
      const toBuy = Math.max(0, row.needed - available);
      const estimatedCost = toBuy * (s?.price || 0);
      return { ...row, stock: available, min: s?.min || 0, supplier: s?.supplier || "Neuvedeno", price: s?.price || 0, category: s?.category || "", toBuy, estimatedCost };
    });
  }, [stock]);

  const filteredOrders = useMemo(() => orders.filter((order) => {
    const text = `${order.customer} ${order.id} ${order.address} ${order.program} ${order.payment}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (program === "all" || order.program === program);
  }), [orders, search, program]);

  const filteredStock = useMemo(() => stock.filter((item) => `${item.name} ${item.category} ${item.supplier}`.toLowerCase().includes(stockSearch.toLowerCase())), [stock, stockSearch]);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0];
  const prepaidMeals = orders.reduce((sum, order) => sum + order.meals * order.days, 0);
  const dailyMeals = orders.filter((order) => order.status !== "Zrušeno").reduce((sum, order) => sum + order.meals, 0);
  const paidOrders = orders.filter((order) => order.payment === "Zaplaceno").length;
  const revenuePaid = orders.filter((order) => order.payment === "Zaplaceno").reduce((sum, order) => sum + order.total, 0);
  const revenueWaiting = orders.filter((order) => order.payment !== "Zaplaceno").reduce((sum, order) => sum + order.total, 0);
  const missingItems = purchaseList.filter((item) => item.toBuy > 0);
  const purchaseCost = purchaseList.reduce((sum, item) => sum + item.estimatedCost, 0);
  const stockValue = stock.reduce((sum, item) => sum + item.stock * item.price, 0);

  function updateStatus(id, status) { setOrders((prev) => prev.map((order) => order.id === id ? { ...order, status } : order)); }
  function updatePayment(id, payment) { setOrders((prev) => prev.map((order) => order.id === id ? { ...order, payment } : order)); }
  function updatePaymentMethod(id, paymentMethod) { setOrders((prev) => prev.map((order) => order.id === id ? { ...order, paymentMethod } : order)); }
  function markAsPaid(id) { setOrders((prev) => prev.map((order) => order.id === id ? { ...order, payment: "Zaplaceno" } : order)); }
  function updateStock(id, field, value) { setStock((prev) => prev.map((item) => item.id === id ? { ...item, [field]: field === "stock" || field === "min" || field === "price" ? Number(value) : value } : item)); }
  function orderPurchase(item) { setPurchaseStatus((prev) => ({ ...prev, [item.item]: "Objednáno" })); }
  function receivePurchase(row) { setStock((prev) => prev.map((item) => item.name === row.item ? { ...item, stock: Number((item.stock + row.toBuy).toFixed(2)) } : item)); setPurchaseStatus((prev) => ({ ...prev, [row.item]: "Naskladněno" })); }

  function openOrderForm(variant) { setSelectedVariant(variant); setActiveTab("order"); setSentMessage(""); }

  function submitOrder(e) {
    e.preventDefault();
    const days = Number(form.days);
    const newOrder = { id: `OBJ-${1000 + orders.length + 1}`, customer: form.name || "Nový zákazník", phone: form.phone || "+420 --- --- ---", email: form.email || "", program: selectedVariant.name, kcal: selectedVariant.kcal, meals: 5, days, total: selectedVariant.dayPrice * days, deliveryDate: "2026-04-29", address: form.address || "Doplnit adresu", payment: form.paymentMethod === "Hotově při doručení" ? "Nezaplaceno" : "Čeká na platbu", paymentMethod: form.paymentMethod, status: "Nová", note: form.note || "" };
    setOrders((prev) => [newOrder, ...prev]); setSelectedOrderId(newOrder.id); setSentMessage("Objednávka byla vytvořena. Najdeš ji v administraci objednávek, kde lze potvrdit platbu."); setForm({ name: "", phone: "", email: "", address: "", days: "10", paymentMethod: "Bankovní převod", note: "" });
  }

  const tabButton = (id, label) => <button onClick={() => setActiveTab(id)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === id ? "bg-slate-950 text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`}>{label}</button>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div><p className="text-sm font-semibold text-emerald-700">Krabičková dieta</p><h1 className="mt-1 text-3xl font-bold md:text-4xl">Web + administrace objednávek</h1><p className="mt-2 max-w-2xl text-slate-500">Propracovaný návrh se zákaznickým objednáním, platbami, výrobou, nákupním seznamem a skladovými zásobami.</p></div>
          <button onClick={() => setActiveTab("order")} className="rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">+ Nová objednávka</button>
        </header>

        <nav className="mb-5 flex flex-wrap gap-2">
          {tabButton("web", "Web pro klienty")}{tabButton("order", "Objednávkový formulář")}{tabButton("orders", "Objednávky")}{tabButton("payments", "Platby")}{tabButton("production", "Výroba")}{tabButton("inventory", "Sklad")}{tabButton("shopping", "Nákup")}{tabButton("menu", "Jídelníček")}{tabButton("delivery", "Rozvoz")}{tabButton("clients", "Klienti")}
        </nav>

        {activeTab === "web" && <><section className="mb-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-slate-900 p-8 text-white md:p-12"><div className="max-w-3xl"><Badge tone="green">Zdravé stravování na celý den</Badge><h2 className="mt-5 text-4xl font-bold md:text-5xl">Vyberte si krabičku podle svých potřeb</h2><p className="mt-5 text-lg text-emerald-50">Redukční, bezlaktózová nebo bezlepková varianta. Každý program je připravený tak, aby klient jednoduše objednal stravu na více dní.</p><button onClick={() => setActiveTab("order")} className="mt-8 rounded-2xl bg-white px-6 py-3 font-bold text-emerald-700 hover:bg-emerald-50">Objednat krabičku</button></div></section><section className="grid gap-5 md:grid-cols-3">{dietVariants.map((variant) => <VariantCard key={variant.id} variant={variant} onOrder={openOrderForm} />)}</section></>}

        {activeTab === "order" && <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]"><Card className="p-6"><h2 className="text-2xl font-bold">Vybraná varianta</h2><div className="mt-4 space-y-3">{dietVariants.map((variant) => <button key={variant.id} onClick={() => setSelectedVariant(variant)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedVariant.id === variant.id ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}><div className="font-bold">{variant.name}</div><div className="mt-1 text-sm text-slate-500">od {variant.dayPrice} Kč / den · {variant.kcal}</div></button>)}</div><div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Předběžná cena</p><p className="text-3xl font-bold">{money(selectedVariant.dayPrice * Number(form.days))}</p><p className="text-sm text-slate-500">{form.days} dní × {selectedVariant.dayPrice} Kč</p></div></Card><Card className="p-6"><h2 className="text-2xl font-bold">Objednávkový formulář</h2><p className="mt-2 text-sm text-slate-500">Vybráno: <strong>{selectedVariant.name}</strong></p>{sentMessage && <div className="mt-4 rounded-2xl bg-green-100 p-4 text-sm font-semibold text-green-800">{sentMessage}</div>}<form onSubmit={submitOrder} className="mt-5 grid gap-4"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jméno a příjmení" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><div className="grid gap-4 md:grid-cols-2"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Telefon" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /></div><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Adresa doručení" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><div className="grid gap-4 md:grid-cols-2"><select value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"><option value="5">5 dní</option><option value="10">10 dní</option><option value="20">20 dní</option><option value="30">30 dní</option></select><select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"><option>Bankovní převod</option><option>Kartou online</option><option>Hotově při doručení</option></select></div><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Poznámka, alergie, čas doručení" className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /><button className="rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Odeslat objednávku</button></form></Card></div>}

        {activeTab !== "web" && activeTab !== "order" && <section className="mb-6 grid gap-4 md:grid-cols-4"><StatCard title="Objednávky" value={orders.length} subtitle="aktivní objednávky" /><StatCard title="Dnešní výroba" value={dailyMeals} subtitle="krabiček pro aktivní klienty" /><StatCard title="Předplaceno celkem" value={prepaidMeals} subtitle="jídel za všechny objednané dny" /><StatCard title="Chybí dokoupit" value={missingItems.length} subtitle="položek pod potřebou" /><StatCard title="Hodnota skladu" value={money(stockValue)} subtitle="orientační skladová hodnota" /></section>}

        {activeTab === "orders" && <Card className="p-5"><div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Hledat klienta, adresu, objednávku nebo platbu" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 md:max-w-sm" /><select value={program} onChange={(e) => setProgram(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 md:w-64"><option value="all">Všechny programy</option>{dietVariants.map((variant) => <option key={variant.id} value={variant.name}>{variant.name}</option>)}</select></div><div className="overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full min-w-[1100px] text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Objednávka</th><th className="p-3">Klient</th><th className="p-3">Program</th><th className="p-3">Doručení</th><th className="p-3">Cena</th><th className="p-3">Platba</th><th className="p-3">Stav</th><th className="p-3">Akce</th></tr></thead><tbody>{filteredOrders.map((order) => <tr key={order.id} onClick={() => setSelectedOrderId(order.id)} className="cursor-pointer border-t border-slate-200 hover:bg-slate-50"><td className="p-3 font-semibold">{order.id}</td><td className="p-3"><div className="font-semibold">{order.customer}</div><div className="text-xs text-slate-500">{order.phone}</div></td><td className="p-3">{order.program}<div className="text-xs text-slate-500">{order.kcal} · {order.days} dní</div></td><td className="p-3"><div>{order.deliveryDate}</div><div className="text-xs text-slate-500">{order.address}</div></td><td className="p-3 font-semibold">{money(order.total)}</td><td className="p-3"><Badge tone={paymentTone(order.payment)}>{order.payment}</Badge><div className="mt-1 text-xs text-slate-500">{order.paymentMethod}</div></td><td className="p-3"><Badge tone={statusTone(order.status)}>{order.status}</Badge></td><td className="p-3"><div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>{order.payment !== "Zaplaceno" && <button onClick={() => markAsPaid(order.id)} className="rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700">Potvrdit platbu</button>}<select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 outline-none"><option>Nová</option><option>Ve výrobě</option><option>Připraveno</option><option>Doručeno</option><option>Zrušeno</option></select></div></td></tr>)}</tbody></table></div></Card>}

        {activeTab === "payments" && selectedOrder && <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]"><Card className="p-5"><h2 className="text-xl font-bold">Přehled plateb</h2><div className="mt-4 space-y-3">{orders.map((order) => <button key={order.id} onClick={() => setSelectedOrderId(order.id)} className={`w-full rounded-2xl border p-4 text-left ${selectedOrderId === order.id ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}><div className="flex items-center justify-between gap-3"><div><p className="font-bold">{order.id} · {order.customer}</p><p className="text-sm text-slate-500">{order.program}</p></div><Badge tone={paymentTone(order.payment)}>{order.payment}</Badge></div><p className="mt-2 text-lg font-bold">{money(order.total)}</p></button>)}</div></Card><Card className="p-6"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><h2 className="text-2xl font-bold">Detail platby</h2><p className="mt-1 text-slate-500">{selectedOrder.id} · {selectedOrder.customer}</p></div><Badge tone={paymentTone(selectedOrder.payment)}>{selectedOrder.payment}</Badge></div><div className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Částka</p><p className="text-3xl font-bold">{money(selectedOrder.total)}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Metoda</p><p className="text-xl font-bold">{selectedOrder.paymentMethod}</p></div></div><div className="mt-6 grid gap-4 md:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Změnit stav platby<select value={selectedOrder.payment} onChange={(e) => updatePayment(selectedOrder.id, e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-500"><option>Zaplaceno</option><option>Čeká na platbu</option><option>Nezaplaceno</option><option>Vráceno</option></select></label><label className="grid gap-2 text-sm font-semibold">Změnit metodu platby<select value={selectedOrder.paymentMethod} onChange={(e) => updatePaymentMethod(selectedOrder.id, e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-500"><option>Bankovní převod</option><option>Kartou online</option><option>Hotově při doručení</option><option>Dobírka</option></select></label></div><div className="mt-6 flex flex-wrap gap-3"><button onClick={() => markAsPaid(selectedOrder.id)} className="rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Potvrdit platbu jako zaplacenou</button><button onClick={() => updatePayment(selectedOrder.id, "Čeká na platbu")} className="rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600">Vrátit do čeká na platbu</button><button onClick={() => updatePayment(selectedOrder.id, "Vráceno")} className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Označit jako vráceno</button></div></Card></div>}

        {activeTab === "production" && <div className="space-y-5"><div className="grid gap-4 md:grid-cols-4"><StatCard title="Výroba dnes" value={dailyMeals} subtitle="krabiček k zabalení" /><StatCard title="Receptury" value={menu.length} subtitle="jídel v plánu" /><StatCard title="Chybějící suroviny" value={missingItems.length} subtitle="nutno dokoupit" /><StatCard title="Náklad nákupu" value={money(purchaseCost)} subtitle="orientační dokup" /></div><div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]"><Card className="p-5"><h2 className="text-xl font-bold">Výrobní plán podle jídel</h2><p className="mt-1 text-sm text-slate-500">Přehled porcí, maker a kontrola hotovo pro kuchyň.</p><div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Jídlo</th><th className="p-3">Varianta</th><th className="p-3">Porce</th><th className="p-3">Makra</th><th className="p-3">Stav</th></tr></thead><tbody>{menu.map((meal) => <tr key={`${meal.title}-${meal.variant}`} className="border-t border-slate-200"><td className="p-3"><div className="font-semibold">{meal.title}</div><div className="text-xs text-slate-500">{meal.day} · {meal.meal}</div></td><td className="p-3"><Badge>{meal.variant}</Badge></td><td className="p-3 font-semibold">{meal.portions} porcí</td><td className="p-3 text-slate-500">{meal.kcal} kcal · B {meal.protein} g · S {meal.carbs} g · T {meal.fat} g</td><td className="p-3"><select className="rounded-xl border border-slate-200 px-3 py-2"><option>Čeká</option><option>Vaří se</option><option>Uvařeno</option><option>Zabaleno</option></select></td></tr>)}</tbody></table></div></Card><Card className="p-5"><h2 className="text-xl font-bold">Výdej ze skladu podle receptur</h2><p className="mt-1 text-sm text-slate-500">Suroviny přepočtené podle počtu porcí.</p><div className="mt-4 space-y-3">{recipeRequirements.slice(0, 8).map((req) => <div key={`${req.meal}-${req.item}`} className="rounded-2xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold">{req.item}</p><p className="text-xs text-slate-500">{req.meal}</p></div><Badge tone="blue">{number(req.perPortion * req.portions)} {req.unit}</Badge></div><p className="mt-2 text-xs text-slate-500">{req.portions} porcí × {req.perPortion} {req.unit}</p></div>)}</div></Card></div></div>}

        {activeTab === "inventory" && <div className="space-y-5"><div className="grid gap-4 md:grid-cols-4"><StatCard title="Položky skladu" value={stock.length} subtitle="suroviny a obaly" /><StatCard title="Nízký stav" value={stock.filter((i) => stockTone(i) !== "green").length} subtitle="položek k řešení" /><StatCard title="Rezervováno" value={number(stock.reduce((s, i) => s + i.reserved, 0))} subtitle="kg/ks pro výrobu" /><StatCard title="Hodnota skladu" value={money(stockValue)} subtitle="orientačně" /></div><Card className="p-5"><div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h2 className="text-xl font-bold">Skladové zásoby</h2><p className="text-sm text-slate-500">Upravitelné množství, minimální stav, cena, dodavatel a expirace.</p></div><input value={stockSearch} onChange={(e) => setStockSearch(e.target.value)} placeholder="Hledat surovinu, kategorii nebo dodavatele" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 md:w-96" /></div><div className="overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full min-w-[1100px] text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Položka</th><th className="p-3">Kategorie</th><th className="p-3">Skladem</th><th className="p-3">Rezervováno</th><th className="p-3">Volné</th><th className="p-3">Min.</th><th className="p-3">Cena</th><th className="p-3">Dodavatel</th><th className="p-3">Expirace</th><th className="p-3">Stav</th></tr></thead><tbody>{filteredStock.map((item) => <tr key={item.id} className="border-t border-slate-200"><td className="p-3 font-semibold">{item.name}</td><td className="p-3">{item.category}</td><td className="p-3"><input type="number" value={item.stock} onChange={(e) => updateStock(item.id, "stock", e.target.value)} className="w-24 rounded-xl border border-slate-200 px-3 py-2" /> {item.unit}</td><td className="p-3">{number(item.reserved)} {item.unit}</td><td className="p-3 font-semibold">{number(item.stock - item.reserved)} {item.unit}</td><td className="p-3"><input type="number" value={item.min} onChange={(e) => updateStock(item.id, "min", e.target.value)} className="w-24 rounded-xl border border-slate-200 px-3 py-2" /></td><td className="p-3"><input type="number" value={item.price} onChange={(e) => updateStock(item.id, "price", e.target.value)} className="w-24 rounded-xl border border-slate-200 px-3 py-2" /> Kč</td><td className="p-3">{item.supplier}</td><td className="p-3">{item.expires}</td><td className="p-3"><Badge tone={stockTone(item)}>{stockLabel(item)}</Badge></td></tr>)}</tbody></table></div></Card></div>}

        {activeTab === "shopping" && <div className="space-y-5"><div className="grid gap-4 md:grid-cols-4"><StatCard title="Položek k nákupu" value={missingItems.length} subtitle="chybí proti výrobě" /><StatCard title="Odhad ceny" value={money(purchaseCost)} subtitle="jen položky k dokoupení" /><StatCard title="Dodavatelé" value={new Set(missingItems.map((i) => i.supplier)).size} subtitle="podle chybějících položek" /><StatCard title="Nákupní stav" value={Object.values(purchaseStatus).filter(Boolean).length} subtitle="označené položky" /></div><Card className="p-5"><h2 className="text-xl font-bold">Automatický nákupní seznam</h2><p className="mt-1 text-sm text-slate-500">Počítá se z receptur, počtu porcí a aktuálních skladových zásob. Položky můžeš označit jako objednané nebo rovnou naskladnit.</p><div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Surovina</th><th className="p-3">Potřeba</th><th className="p-3">Skladem</th><th className="p-3">Koupit</th><th className="p-3">Dodavatel</th><th className="p-3">Cena</th><th className="p-3">Stav</th><th className="p-3">Akce</th></tr></thead><tbody>{purchaseList.map((row) => <tr key={row.item} className="border-t border-slate-200"><td className="p-3"><div className="font-semibold">{row.item}</div><div className="text-xs text-slate-500">{row.category}</div></td><td className="p-3">{number(row.needed)} {row.unit}</td><td className="p-3">{number(row.stock)} {row.unit}</td><td className="p-3 font-bold">{row.toBuy > 0 ? `${number(row.toBuy)} ${row.unit}` : "0"}</td><td className="p-3">{row.supplier}</td><td className="p-3">{money(row.estimatedCost)}</td><td className="p-3"><Badge tone={row.toBuy > 0 ? "amber" : "green"}>{purchaseStatus[row.item] || (row.toBuy > 0 ? "Nutno koupit" : "Skladem OK")}</Badge></td><td className="p-3"><div className="flex flex-wrap gap-2">{row.toBuy > 0 && <button onClick={() => orderPurchase(row)} className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600">Objednat</button>}{row.toBuy > 0 && <button onClick={() => receivePurchase(row)} className="rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700">Naskladnit</button>}</div></td></tr>)}</tbody></table></div></Card></div>}

        {activeTab === "menu" && <Card className="p-5"><h2 className="mb-4 text-xl font-bold">Jídelníček</h2><div className="grid gap-4 md:grid-cols-2">{menu.map((meal) => <div key={`${meal.day}-${meal.meal}-${meal.title}`} className="rounded-2xl border border-slate-200 p-4"><div className="mb-2 flex items-center justify-between gap-3"><Badge>{meal.day} · {meal.meal}</Badge><span className="text-sm font-semibold">{meal.kcal} kcal</span></div><h3 className="text-lg font-bold">{meal.title}</h3><p className="mt-2 text-sm text-slate-500">{meal.variant} · {meal.portions} porcí · Bílkoviny {meal.protein} g · Sacharidy {meal.carbs} g · Tuky {meal.fat} g</p></div>)}</div></Card>}

        {activeTab === "delivery" && <Card className="p-5"><h2 className="mb-4 text-xl font-bold">Rozvozová trasa</h2><div className="space-y-3">{routeStops.map((stop) => <div key={stop.order} className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold">{stop.order}</div><div className="flex-1"><div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between"><h3 className="font-bold">{stop.customer}</h3><div className="flex gap-2"><Badge>{stop.time}</Badge><Badge tone={stop.paid ? "green" : "amber"}>{stop.paid ? "Zaplaceno" : "Čeká"}</Badge></div></div><p className="text-sm text-slate-500">{stop.city}, {stop.address}</p></div></div>)}</div></Card>}

        {activeTab === "clients" && <Card className="p-5"><h2 className="mb-4 text-xl font-bold">Klienti</h2><div className="grid gap-4 md:grid-cols-3">{orders.map((order) => <div key={order.id} className="rounded-2xl border border-slate-200 p-4"><h3 className="font-bold">{order.customer}</h3><p className="text-sm text-slate-500">{order.phone}</p><p className="text-sm text-slate-500">{order.email}</p><div className="mt-3 space-y-1 text-sm"><p><span className="text-slate-500">Program:</span> {order.program}</p><p><span className="text-slate-500">Platba:</span> {order.payment}</p><p><span className="text-slate-500">Adresa:</span> {order.address}</p><p><span className="text-slate-500">Poznámka:</span> {order.note}</p></div></div>)}</div></Card>}
      </div>
    </div>
  );
}
