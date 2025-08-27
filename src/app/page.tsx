"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // initial fetch
    const fetchOrders = async () => {
      const { data } = await supabase.from("orders").select("*");
      setOrders(data || []);
    };
    fetchOrders();

    // realtime subscription
    const channel = supabase
      .channel("orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        setOrders((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurant POS</h1>
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="p-3 rounded-lg bg-white shadow">
            {o.item} × {o.quantity} ({o.status})
          </li>
        ))}
      </ul>
    </main>
  );
}
