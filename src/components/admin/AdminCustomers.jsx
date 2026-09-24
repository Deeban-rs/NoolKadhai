import { useState } from "react";
import { Search, Mail, Phone, Award } from "lucide-react";
export const AdminCustomers = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm),
  );
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8BFA0]/50">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
            Patron Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#5A171B] font-medium">
            Clients & Patrons
          </h1>
          <p className="text-xs text-[#765C4D] mt-1">
            Registered clientele, bridal patrons, and repeat couture patrons.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#FFF8ED] p-4 border border-[#D8BFA0] flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#765C4D]"
          />
          <input
            type="text"
            placeholder="Search patron by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F6E9D5]/50 border border-[#D8BFA0] pl-9 pr-3 py-1.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
          />
        </div>
        <span className="text-xs text-[#765C4D] font-serif italic">
          Total Patrons: {customers.length}
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#FFF8ED] border border-[#D8BFA0] overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#D8BFA0] bg-[#F6E9D5]/60 text-[#765C4D] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 font-medium">Patron Name</th>
              <th className="py-3 px-4 font-medium">Contact</th>
              <th className="py-3 px-4 font-medium">Tier</th>
              <th className="py-3 px-4 font-medium">Orders Count</th>
              <th className="py-3 px-4 font-medium">Total Spent</th>
              <th className="py-3 px-4 font-medium">Client Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8BFA0]/40">
            {filtered.map((cust) => (
              <tr
                key={cust.id}
                className="hover:bg-[#F6E9D5]/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <p className="font-serif text-sm font-medium text-[#5A171B]">
                    {cust.name}
                  </p>
                  <p className="text-[10px] text-[#765C4D] font-mono">
                    {cust.id}
                  </p>
                </td>
                <td className="py-3 px-4 text-[#4A1719]">
                  <p className="flex items-center gap-1.5">
                    <Phone size={12} className="text-[#B47A24]" />
                    <span>{cust.phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-[#765C4D] mt-0.5">
                    <Mail size={12} className="text-[#B47A24]" />
                    <span>{cust.email}</span>
                  </p>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs ${cust.status === "VIP" ? "bg-[#B47A24]/20 text-[#B47A24] border border-[#B47A24]/40" : "bg-[#123C36]/10 text-[#123C36]"}`}
                  >
                    {cust.status === "VIP" && <Award size={10} />}
                    <span>{cust.status}</span>
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-[#4A1719]">
                  {cust.ordersCount}{" "}
                  {cust.ordersCount === 1 ? "order" : "orders"}
                </td>
                <td className="py-3 px-4 font-serif text-sm font-medium text-[#5A171B]">
                  {cust.totalSpent}
                </td>
                <td className="py-3 px-4 text-[#765C4D]">{cust.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
