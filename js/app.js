const STORAGE_KEY = "helpdesk-demo-tickets";
const form = document.getElementById("ticketForm");
const list = document.getElementById("ticketList");

function getTickets() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveTickets(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}
function renderTickets() {
  const tickets = getTickets();
  document.getElementById("totalCount").textContent = tickets.length;
  document.getElementById("openCount").textContent = tickets.filter(t => t.status === "Open").length;
  document.getElementById("resolvedCount").textContent = tickets.filter(t => t.status === "Resolved").length;
  if (!tickets.length) {
    list.innerHTML = '<div class="empty"><span>📭</span><strong>No tickets yet</strong><p>Your submitted tickets will appear here.</p></div>';
    return;
  }
  list.innerHTML = tickets.slice().reverse().map(ticket => `
    <article class="ticket">
      <div class="ticket-top"><span class="ticket-id">${escapeHtml(ticket.id)} · ${escapeHtml(ticket.category)}</span>
      <span class="pill ${ticket.status === "Resolved" ? "resolved" : ""}">${escapeHtml(ticket.status)}</span></div>
      <h3>${escapeHtml(ticket.description)}</h3>
      <div class="ticket-meta"><span>${escapeHtml(ticket.employee)}</span><span>Priority: ${escapeHtml(ticket.priority)}</span><span>${escapeHtml(ticket.date)}</span></div>
    </article>`).join("");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const ticket = {
    id: "HD-" + Date.now().toString().slice(-6),
    employee: data.get("employee").trim(),
    email: data.get("email").trim(),
    category: data.get("category"),
    priority: data.get("priority"),
    description: data.get("description").trim(),
    status: "Open",
    date: new Date().toLocaleDateString()
  };
  const tickets = getTickets();
  tickets.push(ticket);
  saveTickets(tickets);
  renderTickets();
  form.reset();
  document.getElementById("formMessage").textContent = `Ticket ${ticket.id} created successfully.`;
});
renderTickets();
