import { useEffect, useState } from "react";
import "./App.css";

function Page() {
  const [clients, setClients] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState("ALL"); // New state for filtering
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stage: "LEAD",
    budgetRange: "",
    notes: "",
  });

  // Load clients from backend
  const loadClients = () => {
    fetch("/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Add client
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()){
      alert("Name is required");
      return;
    }

    const cleanFormData = {
      ...formData, name: formData.name.trim(),email: formData.email || null,
      phone: formData.phone || null, budgetRange: formData.budgetRange || null, 
      notes: formData.notes || null,
    };

    fetch("/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanFormData),
    })
      .then((res) => { if(!res.ok) throw new Error("Failed to create client");
      return res.json();
  })
       .then(() => {
        loadClients();
        setFormData({
          name: "",
          email: "",
          phone: "",
          stage: "LEAD",
          budgetRange: "",
          notes: "",
        });
      })
      .catch(console.error);
  };

  // Delete client
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    fetch(`/clients/${id}`, { method: "DELETE" })
      .then(() => loadClients())
      .catch((err) => console.error(err));
  };

  // Update client (inline edit)
const updateClient = (id, updatedFields) => {
  fetch(`/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update client");
      }
      return res.json();
    })
    .then(() => loadClients())
    .catch((err) => console.error(err));
};


  // Filter clients based on stage
  const filteredClients =
    filter === "ALL"
      ? clients
      : clients.filter((client) => client.stage === filter);

  return (
  <div className="page">
    <header className="page-header">
      <h1>Real Estate CRM</h1>
    </header>

    <div className="layout">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <form onSubmit={handleSubmit} className="client-form">
            <h2>Add Client</h2> 

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Budget Range"
            value={formData.budgetRange}
            onChange={(e) =>
              setFormData({ ...formData, budgetRange: e.target.value })
            }
          />

          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />

          <select
            value={formData.stage}
            onChange={(e) =>
              setFormData({ ...formData, stage: e.target.value })
            }
          >
            <option value="LEAD">Lead</option>
            <option value="PRE_APPROVED">Pre-Approved</option>
            <option value="TOURING">Touring</option>
            <option value="UNDER_CONTRACT">Under Contract</option>
            <option value="OFFER">Offer</option>
            <option value="CLOSED">Closed</option>
          </select>

          <button type="submit" disabled={editMode}>
            Add Client
          </button>
        </form>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        {/* Filter Controls */}
        <div className="filter-controls">
          {["ALL","LEAD","PRE_APPROVED","TOURING","UNDER_CONTRACT","OFFER","CLOSED"].map(stage => (
            <button
              key={stage}
              onClick={() => setFilter(stage)}
              className={filter === stage ? "active" : ""}
            >
              {stage.replace("_", " ")}
            </button>
          ))}
          <button
              className={`floating-edit ${editMode ? "active" : ""}`}
              onClick={() => setEditMode(!editMode)}
             >
              {editMode ? "Done Editing" : "Edit Clients"}
         </button>
       </div>

        {/* Client Cards */}
        <div className="client-grid">
          {filteredClients.map(client => (
            <div key={client.id} className="client-card">
              <div className="card-header">
                {editMode ? (
                  <input
                    defaultValue={client.name}
                    onBlur={(e) =>
                      updateClient(client.id, { name: e.target.value })
                    }
                  />
                ) : (
                  <h3>{client.name}</h3>
                )}

                {editMode ? ( 
                  <select
               defaultValue={client.stage} onChange={(e) =>
              updateClient(client.id, { stage: e.target.value })
    }
  >
           <option value="LEAD">Lead</option>
            <option value="PRE_APPROVED">Pre-Approved</option>\
             <option value="TOURING">Touring</option>
              <option value="UNDER_CONTRACT">Under Contract</option>
               <option value="OFFER">Offer</option>
                 <option value="CLOSED">Closed</option>
         </select>
) : (
       <span
             className={`stage ${client.stage}`}
              title="Click Edit to change stage"
     >
               {client.stage.replace("_", " ")}
  </span>
)}

              </div>

              <div className="card-body">
                <div><strong>Email:</strong>{client.email || "-"}</div>
                <div><strong>Phone:</strong>{client.phone || "-"}</div>
                <div><strong>Budget:</strong> {client.budgetRange || "-"}</div>
              </div>

              {editMode && (
                <div className="card-actions">
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
)};

export default Page;
