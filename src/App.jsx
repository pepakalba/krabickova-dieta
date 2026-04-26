import React, { useMemo, useState } from "react";

const initialOrders = [
  {
    id: "OBJ-1001",
    customer: "Petr Novák",
    phone: "+420 777 111 222",
    program: "Redukční",
    kcal: 1800,
    meals: 5,
    days: 10,
    deliveryDate: "2026-04-27",
    address: "Teplice, Masarykova 12",
    payment: "Zaplaceno",
    status: "Nová",
    note: "Bez rajčat",
  },
  {
    id: "OBJ-1002",
    customer: "Lucie Dvořáková",
    phone: "+420 606 222 333",
    program: "Fitness",
    kcal: 2400,
    meals: 6,
    days: 20,
    deliveryDate: "2026-04-27",
    address: "Ústí nad Labem, Klíšská 8",
    payment: "Čeká na platbu",
    status: "Ve výrobě",
    note: "Bez lepku",
  },
  {
    id: "OBJ-1003",
    customer: "Martin Černý",
    phone: "+420 731 333 444",
    program: "Low carb",
    kcal: 2000,
    meals: 4,
    days: 5,
    deliveryDate: "2026-04-28",
    address: "Bílina, Pražská 31",
    payment: "Zaplaceno",
    status: "Připraveno",
    note: "Doručit po 17:00",
  },
];

const menu = [
  { day: "Pondělí", meal: "Snídaně", title: "Ovesná kaše s proteinem", kcal: 420, protein: 32, carbs: 48, fat: 10 },
  { day: "Pondělí", meal: "Oběd", title: "Kuřecí prsa, rýže, zelenina", kcal: 620, protein: 48, carbs: 66, fat: 14 },
  { day: "Pondělí", meal: "Večeře", title: "Losos, batáty, salát", kcal: 560, protein: 38, carbs: 42, fat: 24 },
  { day: "Úterý", meal: "Snídaně", title: "Vaječná omeleta se špenátem", kcal: 390, protein: 30, carbs: 12, fat: 24 },
];

const routeStops = [
  { order: 1, customer: "Petr Novák", city: "Teplice", address: "Masarykova 12", time: "08:15–08:45" },
  { order: 2, customer: "Lucie Dvořáková", city: "Ústí nad Labem", address: "Klíšská 8", time: "09:10–09:40" },
  { order: 3, customer: "Martin Černý", city: "Bílina", address: "Pražská 31", time: "17:00–18:00" },
];

const ingredients = [
  { name: "Kuřecí prsa", amount: "14,4 kg", category: "Maso" },
  { name: "Rýže basmati", amount: "9,8 kg", category: "Příloha" },
  { name: "Brokolice", amount: "7,2 kg", category: "Zelenina" },
  { name: "Losos", amount: "6,1 kg", category: "Ryby" },
  { name: "Ovesné vločky", amount: "5,4 kg", category: "Snídaně" },
];

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Badge({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-slate-100 text-slate-700",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    amber: "bg-amber-100 text-amber-800",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function StatCard({ title, value, subtitle }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
    </Card>
  );
}

function statusTone(status) {
  if (status === "Nová") return "blue";
  if (status === "Ve výrobě") return "amber";
  if (status === "Připraveno" || status === "Doručeno") return "green";
  return "gray";
}

export default function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("all");
  const [activeTab, setActiveTab] = useState("orders");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const text = `${order.customer} ${order.id} ${order.address} ${order.program}`.toLowerCase();
      const matchText = text.includes(search.toLowerCase());
      const matchProgram = program === "all" || order.program === program;
      return matchText && matchProgram;
    });
  }, [orders, search, program]);

  const totalMeals = orders.reduce((sum, order) => sum + order.meals, 0);
  const paidOrders = orders.filter((order) => order.payment === "Zaplaceno").length;

  function updateStatus(id, status) {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  }

  const tabButton = (id, label) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === id ? "bg-slate-950 text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Administrace krabičkové diety</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">Správa objednávek, výroby a rozvozu</h1>
          </div>
          <button className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800">+ Nová objednávka</button>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Objednávky" value={orders.length} subtitle="aktivní objednávky" />
          <StatCard title="Jídla na zítra" value={totalMeals} subtitle="porcí k výrobě" />
          <StatCard title="Zaplaceno" value={paidOrders} subtitle="uhrazené objednávky" />
          <StatCard title="Rozvoz" value={routeStops.length} subtitle="zastávky v trase" />
        </section>

        <nav className="mb-5 flex flex-wrap gap-2">
          {tabButton("orders", "Objednávky")}
          {tabButton("production", "Výroba")}
          {tabButton("menu", "Jídelníček")}
          {tabButton("delivery", "Rozvoz")}
          {tabButton("clients", "Klienti")}
        </nav>

        {activeTab === "orders" && (
          <Card className="p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Hledat klienta, adresu nebo objednávku"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 md:max-w-sm"
              />
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 md:w-56"
              >
                <option value="all">Všechny programy</option>
                <option value="Redukční">Redukční</option>
                <option value="Fitness">Fitness</option>
                <option value="Low carb">Low carb</option>
              </select>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-3">Objednávka</th>
                    <th className="p-3">Klient</th>
                    <th className="p-3">Program</th>
                    <th className="p-3">Doručení</th>
                    <th className="p-3">Platba</th>
                    <th className="p-3">Stav</th>
                    <th className="p-3">Změnit stav</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t border-slate-200">
                      <td className="p-3 font-semibold">{order.id}</td>
                      <td className="p-3">
                        <div className="font-semibold">{order.customer}</div>
                        <div className="text-xs text-slate-500">{order.phone}</div>
                      </td>
                      <td className="p-3">{order.program} · {order.kcal} kcal · {order.meals} jídel</td>
                      <td className="p-3">
                        <div>{order.deliveryDate}</div>
                        <div className="text-xs text-slate-500">{order.address}</div>
                      </td>
                      <td className="p-3">{order.payment}</td>
                      <td className="p-3"><Badge tone={statusTone(order.status)}>{order.status}</Badge></td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="rounded-xl border border-slate-200 px-3 py-2 outline-none"
                        >
                          <option>Nová</option>
                          <option>Ve výrobě</option>
                          <option>Připraveno</option>
                          <option>Doručeno</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "production" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <h2 className="mb-4 text-xl font-bold">Výrobní plán na zítra</h2>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold">{order.program} · {order.kcal} kcal</div>
                      <Badge>{order.meals} jídel</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{order.customer} · {order.note}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="mb-4 text-xl font-bold">Nákupní seznam</h2>
              <div className="space-y-3">
                {ingredients.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </div>
                    <Badge>{item.amount}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "menu" && (
          <Card className="p-5">
            <h2 className="mb-4 text-xl font-bold">Jídelníček</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {menu.map((meal) => (
                <div key={`${meal.day}-${meal.meal}`} className="rounded-2xl border border-slate-200 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Badge>{meal.day} · {meal.meal}</Badge>
                    <span className="text-sm font-semibold">{meal.kcal} kcal</span>
                  </div>
                  <h3 className="text-lg font-bold">{meal.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">Bílkoviny {meal.protein} g · Sacharidy {meal.carbs} g · Tuky {meal.fat} g</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "delivery" && (
          <Card className="p-5">
            <h2 className="mb-4 text-xl font-bold">Rozvozová trasa</h2>
            <div className="space-y-3">
              {routeStops.map((stop) => (
                <div key={stop.order} className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold">{stop.order}</div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <h3 className="font-bold">{stop.customer}</h3>
                      <Badge>{stop.time}</Badge>
                    </div>
                    <p className="text-sm text-slate-500">{stop.city}, {stop.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "clients" && (
          <Card className="p-5">
            <h2 className="mb-4 text-xl font-bold">Klienti</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="font-bold">{order.customer}</h3>
                  <p className="text-sm text-slate-500">{order.phone}</p>
                  <div className="mt-3 space-y-1 text-sm">
                    <p><span className="text-slate-500">Program:</span> {order.program}</p>
                    <p><span className="text-slate-500">Adresa:</span> {order.address}</p>
                    <p><span className="text-slate-500">Poznámka:</span> {order.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
