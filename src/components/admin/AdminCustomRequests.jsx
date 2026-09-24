import { useState } from "react";
import { Search, Eye, X, Check, Save } from "lucide-react";
const ALL_REQUEST_STATUSES = [
  "Pending",
  "Reviewing",
  "Accepted",
  "In Production",
  "Ready",
  "Completed",
  "Rejected",
];
export const AdminCustomRequests = ({
  requests,
  onUpdateRequestStatus,
  onSaveInternalNotes,
  selectedRequestFromOverview,
  onClearSelectedFromOverview,
}) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalRequest, setActiveModalRequest] = useState(
    selectedRequestFromOverview || null,
  );
  const [notesDraft, setNotesDraft] = useState(
    selectedRequestFromOverview
      ? selectedRequestFromOverview.internalNotes || ""
      : "",
  );
  const [notesSavedNotice, setNotesSavedNotice] = useState(false);
  const handleOpenDetail = (req) => {
    setActiveModalRequest(req);
    setNotesDraft(req.internalNotes || "");
    setNotesSavedNotice(false);
  };
  const handleCloseDetail = () => {
    setActiveModalRequest(null);
    if (onClearSelectedFromOverview) onClearSelectedFromOverview();
  };
  const handleSaveNotes = () => {
    if (!activeModalRequest) return;
    onSaveInternalNotes(activeModalRequest.id, notesDraft);
    setNotesSavedNotice(true);
    setTimeout(() => setNotesSavedNotice(false), 2e3);
  };
  const filteredRequests = requests.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.dressType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8BFA0]/50">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
            Bespoke Couture Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#5A171B] font-medium">
            Custom Made Inquiries
          </h1>
          <p className="text-xs text-[#765C4D] mt-1">
            Review measurements, client vision, assign artisans, and track
            bespoke progress.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#FFF8ED] p-4 border border-[#D8BFA0] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#765C4D]"
          />
          <input
            type="text"
            placeholder="Search by client, phone, dress type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F6E9D5]/50 border border-[#D8BFA0] pl-9 pr-3 py-1.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border ${statusFilter === "All" ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "border-[#D8BFA0] text-[#765C4D]"}`}
          >
            All ({requests.length})
          </button>
          {ALL_REQUEST_STATUSES.map((st) => {
            const count = requests.filter((r) => r.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border whitespace-nowrap ${statusFilter === st ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "border-[#D8BFA0] text-[#765C4D]"}`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-[#FFF8ED] border border-[#D8BFA0] overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#D8BFA0] bg-[#F6E9D5]/60 text-[#765C4D] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 font-medium">Request ID</th>
              <th className="py-3 px-4 font-medium">Client Info</th>
              <th className="py-3 px-4 font-medium">Garment Type</th>
              <th className="py-3 px-4 font-medium">Occasion</th>
              <th className="py-3 px-4 font-medium">Budget</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8BFA0]/40">
            {filteredRequests.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-[#F6E9D5]/30 transition-colors"
              >
                <td className="py-3 px-4 font-mono font-medium text-[#5A171B]">
                  {req.id}
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium text-[#4A1719]">{req.name}</p>
                  <p className="text-[10px] text-[#765C4D]">{req.phone}</p>
                </td>
                <td className="py-3 px-4 text-[#5A171B] font-medium">
                  {req.dressType}
                </td>
                <td className="py-3 px-4 text-[#765C4D]">{req.occasion}</td>
                <td className="py-3 px-4 font-mono text-[#4A1719]">
                  {req.budget || "Open"}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={req.status}
                    onChange={(e) =>
                      onUpdateRequestStatus(req.id, e.target.value)
                    }
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 border rounded-xs bg-[#FFF8ED] text-[#5A171B] border-[#D8BFA0]"
                  >
                    {ALL_REQUEST_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleOpenDetail(req)}
                    className="p-1.5 text-[#5A171B] hover:text-[#B47A24] transition-colors inline-flex items-center gap-1"
                  >
                    <Eye size={14} />
                    <span className="text-[11px] underline">Review Specs</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Request Detail & Notes Modal */}
      {activeModalRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1719]/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-[#FFF8ED] border-2 border-[#D8BFA0] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <button
              onClick={handleCloseDetail}
              className="absolute top-4 right-4 p-1.5 text-[#765C4D] hover:text-[#5A171B] border border-[#D8BFA0] rounded-full"
            >
              <X size={16} />
            </button>

            <div className="border-b border-[#D8BFA0]/40 pb-4 mb-4">
              <span className="text-[10px] uppercase tracking-wider text-[#B47A24] font-semibold">
                Custom Couture Specification
              </span>
              <h3 className="font-serif text-2xl text-[#5A171B]">
                {activeModalRequest.name} — {activeModalRequest.dressType}
              </h3>
              <p className="text-xs text-[#765C4D] mt-1 font-mono">
                Request ID: {activeModalRequest.id} • Received{" "}
                {activeModalRequest.requestedDate}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F6E9D5]/40 p-4 border border-[#D8BFA0] mb-5 text-xs">
              <div>
                <p className="text-[10px] text-[#765C4D] uppercase">
                  Phone / WhatsApp:
                </p>
                <p className="font-medium text-[#4A1719]">
                  {activeModalRequest.phone}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#765C4D] uppercase">Email:</p>
                <p className="font-medium text-[#4A1719]">
                  {activeModalRequest.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#765C4D] uppercase">
                  Occasion:
                </p>
                <p className="font-medium text-[#4A1719]">
                  {activeModalRequest.occasion}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#765C4D] uppercase">
                  Estimated Budget:
                </p>
                <p className="font-medium text-[#4A1719]">
                  {activeModalRequest.budget}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#765C4D] uppercase">
                  Preferred Color:
                </p>
                <p className="font-medium text-[#4A1719]">
                  {activeModalRequest.preferredColor}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#765C4D] uppercase">
                  Fabric Preference:
                </p>
                <p className="font-medium text-[#4A1719]">
                  {activeModalRequest.fabricPreference}
                </p>
              </div>
            </div>

            {/* Sizing & Measurements */}
            <div className="mb-4 bg-[#FFF8ED] p-3 border border-[#D8BFA0]/60 text-xs">
              <p className="text-[10px] uppercase tracking-wider text-[#B47A24] font-semibold mb-1">
                Body Measurements & Sizing Notes:
              </p>
              <p className="text-[#4A1719] font-mono whitespace-pre-wrap">
                {activeModalRequest.sizeMeasurements}
              </p>
            </div>

            {/* Customer Message & Vision */}
            <div className="mb-5 bg-[#FFF8ED] p-3 border border-[#D8BFA0]/60 text-xs">
              <p className="text-[10px] uppercase tracking-wider text-[#B47A24] font-semibold mb-1">
                Client's Vision & Embroidery Preferences:
              </p>
              <p className="text-[#4A1719] italic leading-relaxed">
                "{activeModalRequest.customerMessage}"
              </p>
            </div>

            {/* Reference Image (if provided) */}
            {activeModalRequest.referenceImage && (
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-wider text-[#765C4D] font-semibold mb-2">
                  Client Reference Imagery:
                </p>
                <div className="w-32 h-40 border border-[#D8BFA0] overflow-hidden">
                  <img
                    src={activeModalRequest.referenceImage}
                    alt="Client reference"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Status & Atelier Internal Notes */}
            <div className="pt-4 border-t border-[#D8BFA0]/40 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#5A171B] font-semibold">
                  Bespoke Status:
                </label>
                <select
                  value={activeModalRequest.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    onUpdateRequestStatus(activeModalRequest.id, newStatus);
                    setActiveModalRequest({
                      ...activeModalRequest,
                      status: newStatus,
                    });
                  }}
                  className="bg-[#F6E9D5] border border-[#D8BFA0] px-3 py-1.5 text-xs text-[#4A1719] font-semibold"
                >
                  {ALL_REQUEST_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs uppercase tracking-wider text-[#5A171B] font-semibold">
                    Atelier Internal Notes (Private):
                  </label>
                  {notesSavedNotice && (
                    <span className="text-[10px] text-[#123C36] font-medium flex items-center gap-1">
                      <Check size={11} /> Saved to record
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Record artisan assignments, swatch approvals, trial dates, or WhatsApp discussion logs..."
                  className="w-full bg-[#F6E9D5]/30 border border-[#D8BFA0] p-2 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 bg-[#5A171B] hover:bg-[#4A1719] text-[#FFF8ED] px-4 py-1.5 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5"
                >
                  <Save size={12} />
                  <span>Save Internal Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
