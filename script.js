/*
 Robust script for invoice generation — matches IDs in index.html.
 - Uses #transport-fee (as in index.html)
 - Provides updateCalculations() per spec (20% service, VAT = 7.5% of service)
 - Ensures #invoice-preview gets "active" class so preview is visible
 - PDF export uses html2canvas scale:4
*/

const m = [
  // CANAPÉS - N2,000 per item
  { n: "Veggies Roll with Sweet Chilli Dip", p: 2000, c: "Canapés" },
  { n: "Crispy Yam / Potato Balls with Spicy Sauce Toppings", p: 2000, c: "Canapés" },
  { n: "Mozzarella Cheese Meatballs", p: 2000, c: "Canapés" },
  { n: "Bruschetta with Chicken Pesto & Basil", p: 2000, c: "Canapés" },
  { n: "Yamarita with Saucy Dip", p: 2000, c: "Canapés" },
  { n: "Gourmet Cheese Springroll / Samosa", p: 2000, c: "Canapés" },
  { n: "Crudites", p: 2000, c: "Canapés" },
  { n: "Mini Vegetable Sandwiches", p: 2000, c: "Canapés" },
  { n: "Thai Chicken Salad with Dressing", p: 2000, c: "Canapés" },
  { n: "Spicy Prawn Mayonnaise Springroll", p: 2000, c: "Canapés" },

  // CANAPÉS - N2,500 per item
  { n: "Chicken Croquettes", p: 2500, c: "Canapés" },
  { n: "Smoked Chicken on a Toasted Bun Bed", p: 2500, c: "Canapés" },
  { n: "Bruschetta with Mayo Shrimps", p: 2500, c: "Canapés" },
  { n: "Meatball Trio", p: 2500, c: "Canapés" },
  { n: "Mini Club Sandwiches", p: 2500, c: "Canapés" },
  { n: "Gourmet Puff Puff", p: 2500, c: "Canapés" },
  { n: "Shrimps Puff Puff with Coconut Flakes", p: 2500, c: "Canapés" },
  { n: "Spicy Beef Skewers", p: 2500, c: "Canapés" },
  { n: "Mini Chicken Wrap", p: 2500, c: "Canapés" },
  { n: "Chicken Lollipop", p: 2500, c: "Canapés" },
  { n: "Fish Balls", p: 2500, c: "Canapés" },
  { n: "Suya Sticks", p: 2500, c: "Canapés" },
  { n: "Cocktail Gizdodo", p: 2500, c: "Canapés" },
  { n: "Fish Cakes with a Sweet Cucumber Dips", p: 2500, c: "Canapés" },
  { n: "Tacos (beef/chicken)", p: 2500, c: "Canapés" },
  { n: "Spicy Honey Chicken Wings", p: 2500, c: "Canapés" },
  { n: "Sweet Chilli Chicken Wings", p: 2500, c: "Canapés" },
  { n: "Corn Floater", p: 2500, c: "Canapés" },
  { n: "Shrimps Toast", p: 2500, c: "Canapés" },
  { n: "Chicken Popcorn with Sweet Chilli Dip", p: 2500, c: "Canapés" },

  // CANAPÉS - N3,000 per item
  { n: "Prawn Tempura with Dip", p: 3000, c: "Canapés" },
  { n: "Coconut Crusted Prawn Served with Dip", p: 3000, c: "Canapés" },
  { n: "Prawn Cocktail / Shot", p: 3000, c: "Canapés" },
  { n: "Jerk Chicken Skewers", p: 3000, c: "Canapés" },
  { n: "Lobster Roll", p: 3000, c: "Canapés" },
  { n: "Crunchy Hotdog", p: 3000, c: "Canapés" },

  // CANAPÉS - N3,500 per item
  { n: "Mini Gourmet Burger", p: 3500, c: "Canapés" },
  { n: "Crispy Chicken with Slaw Sliders", p: 3500, c: "Canapés" },
  { n: "Mini Pulled Bbq Chicken Burger with Purple Slaw", p: 3500, c: "Canapés" },
  { n: "Cheese & Ham Toast with Hot Chocolate", p: 3500, c: "Canapés" },
  { n: "Lamb Cutlet Served with Yoghurt Drill Dip", p: 3500, c: "Canapés" },
  { n: "Salmon Carvier with Cream Cheese on Crostini", p: 3500, c: "Canapés" },
  { n: "Asun Crostini", p: 3500, c: "Canapés" },
  { n: "Buttered Garlic King Prawn with Spicy Dip", p: 3500, c: "Canapés" },
  { n: "Oat Cake with Crispy Chicken", p: 3500, c: "Canapés" },
  { n: "Potato Wedges with Spicy Chicken Wings", p: 3500, c: "Canapés" },
  { n: "Ewa Agoyin with Bread & Sauce", p: 3500, c: "Canapés" },

  // BREAKFAST MENU
  { n: "Breakfast - Buffet Style (per guest): Includes Tea (Green/Black/Flavored), Coffee, Juice, Mini Snacks (Meat Pie, Sausage Roll, Doughnut), Bread Roll, Cup Cakes, Sandwiches, Pancakes, Grilled Sausages, Spicy Chicken Wings, Fruit Platter, Tapioca, Boiled Yam, Plantain, Sweet Potatoes, Titus Sauce, Various Egg Preparations, Macaroni, Ewa Agoyin, Baked Beans, Sliced Bread, Irish Potato", p: 15000, c: "Breakfast" },
  { n: "Breakfast - Menu 2 (per guest): Includes Tea Station, Slice Bread, Sausage, Baked Beans, Scrambled Eggs", p: 12000, c: "Breakfast" },
  { n: "Breakfast - Menu 3 (per guest): Includes 2 Snacks, 1 Protein, Tea Station, Boiled Plantain, Boiled Yam, Fish Stew, Sauteed Potatoes, Nigerian Egg Sauce", p: 6000, c: "Breakfast" },
  { n: "Breakfast - Menu 4 (per guest): Executive Snacks (Mini Croissant, Mini Pain Au Chocolat, Muffins, Mini Sliders, Waffles, Puff Pastry Meat Pie, Puff Pastry Sausage, Sandwiches), 1 Protein, Juice Station", p: 12000, c: "Breakfast" },

  // SMALL CHOPS
  { n: "Small Chops - Option 1: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 4 Puff Puff, 3 Mosas", p: 2500, c: "Small Chops" },
  { n: "Small Chops - Option 2: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 4 Puff Puff, 3 Mosas, 1 Corndog", p: 2700, c: "Small Chops" },
  { n: "Small Chops - Option 3: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 4 Puff Puff, 3 Mosas, 1 Peppered Gizzard", p: 3000, c: "Small Chops" },
  { n: "Small Chops - Option 4: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 4 Puff Puff, 3 Mosas, 1 Fish in Batter", p: 3200, c: "Small Chops" },
  { n: "Small Chops - Option 5: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 5 Puff Puff, 4 Mosas, 1 Prawn in Batter", p: 3800, c: "Small Chops" },
  { n: "Small Chops - Option 6: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 5 Puff Puff, 4 Mosas, 1 Prawn Tempura", p: 4200, c: "Small Chops" },
  { n: "Small Chops - Option 7: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 5 Puff Puff, 4 Mosas, 1 Peppered Snail", p: 4200, c: "Small Chops" },
  { n: "Small Chops - Option 8: 1 Prawn Mayonnaise Springroll, 1 Chicken Moneybag, 1 BBQ Chicken or Chicken Wings, 5 Puff Puff, 4 Mosas, 1 Corndog", p: 4200, c: "Small Chops" },
  { n: "Small Chops - Option 9: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 1 Fish in Batter, 1 Peppered Snail, 5 Puff Puff, 4 Mosas", p: 4800, c: "Small Chops" },
  { n: "Small Chops - Option 10: 1 Prawn Mayonnaise Springroll, 1 Chicken Moneybag, 1 BBQ Chicken, 5 Puff Puff, 4 Mosas, 1 Corndog, 1 Peppered Snail, 1 Corn On Cub", p: 5600, c: "Small Chops" },
  { n: "Small Chops - Option 11: 1 Prawn Mayonnaise Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 5 Puff Puff, 4 Mosa, 1 Fish In Batter, 1 Peppered Gizzard, 1 Pancake Hotdog", p: 5600, c: "Small Chops" },
  { n: "Small Chops - Option 12: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 5 Puff Puff, 4 Mosas, 1 Peppered Snail, 1 Prawn Tempura", p: 6100, c: "Small Chops" },
  { n: "Small Chops - Option 13: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 1 Chicken Moneybag, 1 Fantail Prawn, 1 Meatball, 1 Peppered Snail, 5 Puff Puff, 4 Mosas, 1 Corn on Cub", p: 7100, c: "Small Chops" },
  { n: "Small Chops - Option 14: 1 Vegetable Springroll, 1 Beefy Samosa, 1 BBQ Chicken, 5 Puff Puff, 4 Mosas, 1 Peppered Gizzard, 1 Peppered Snail, 1 Fish In Batter, 1 Prawn in Batter", p: 7800, c: "Small Chops" },
  { n: "Small Chops - Option 15: 1 Suya Springroll, 1 Prawn Tempura, 1 Chicken Lollipop, 1 Fish Cake, 1 Chicken Moneybag, Puff Puff & Skewers", p: 8100, c: "Small Chops" },
  { n: "Small Chops - Option 16: 1 Suya Springroll, 1 Prawn Tempura, 1 Chicken Lollipop, 1 Fish Cake, 1 Chicken Moneybag, 1 Fish in Batter, Puff Puff & Skewers", p: 9000, c: "Small Chops" },

  // GRILL HOUSE
  { n: "Grilled Whole Fish with sides (yam, plantain & potatoes)", p: 9000, c: "Grill House" },
  { n: "Titus fish & Bole", p: 4500, c: "Grill House" },
  { n: "Mini Grilled Catfish with sides (yam, plantain & potatoes)", p: 4500, c: "Grill House" },
  { n: "Grilled Turkey Combo (yam, plantain, potatoes, sausage & corn on cub)", p: 6000, c: "Grill House" },
  { n: "Sweet Chilli Chicken Wings Combo (yam, plantain, potatoes, sausage & corn on cub)", p: 4500, c: "Grill House" },
  { n: "Spicy Jumbo Snail Combo (yam, plantain, potatoes, sausage & corn on cub)", p: 7000, c: "Grill House" },
  { n: "Grill Bowl", p: 15000, c: "Grill House" },
  { n: "Mini Grilled Croaker Fish with sides (yam, plantain & potatoes)", p: 4500, c: "Grill House" },
  { n: "Grilled Whole Catfish with sides (yam, plantain & potatoes)", p: 9000, c: "Grill House" },
  { n: "Grilled Chicken Combo (yam, plantain, potatoes, sausage & corn on cub)", p: 4500, c: "Grill House" },
  { n: "Chicken Skewers Combo (yam, plantain, potatoes, sausage & corn on cub)", p: 4500, c: "Grill House" },
  { n: "Spicy Gizzard Kebab Combo (yam, plantain, potatoes, sausage & corn on cub)", p: 4000, c: "Grill House" },
  { n: "Jumbo Grilled Prawn Combo (medium)", p: 7500, c: "Grill House" },
  { n: "Jumbo Grilled Prawn Combo (large)", p: 9000, c: "Grill House" },

  // MINI FOOD
  { n: "Jambalaya Rice served with chicken skewers / chicken lollipop", p: 4500, c: "Mini Food" },
  { n: "Suya Spiced Alfredo with Prawns", p: 4500, c: "Mini Food" },
  { n: "Shrimps Fried Rice served with crispy fish & veggies", p: 4500, c: "Mini Food" },
  { n: "Ofada Rice served with orisirisi meat & egg", p: 4500, c: "Mini Food" },
  { n: "Tomato Basil Pasta served with meatballs", p: 4500, c: "Mini Food" },
  { n: "Alfredo Pasta served with prawns/meatballs/chicken wings", p: 4500, c: "Mini Food" },
  { n: "Native Rice served with spicy diced goat meat", p: 4500, c: "Mini Food" },
  { n: "Crispy Potato Wedges with Bbq Chicken", p: 4500, c: "Mini Food" },
  { n: "Stir-Fried Spaghetti served with spicy chicken", p: 4500, c: "Mini Food" },

  // AFTER PARTY EATS
  { n: "Full Beef Sausage Shawarma", p: 3000, c: "After Party" },
  { n: "Mini Beef Sausage Shawarma", p: 1500, c: "After Party" },
  { n: "Full Chicken Sausage Shawarma", p: 3000, c: "After Party" },
  { n: "Mini Chicken Sausage Shawarma", p: 1500, c: "After Party" },
  { n: "Full Mixed Special (beef & Chicken) Shawarma", p: 3500, c: "After Party" },
  { n: "Mini Mixed Special (beef & Chicken) Shawarma", p: 1800, c: "After Party" },
  { n: "Regular Beef Burger", p: 4500, c: "After Party" },
  { n: "Mini Beef Burger", p: 3500, c: "After Party" },
  { n: "Regular Chicken Burger", p: 4500, c: "After Party" },
  { n: "Mini Chicken Burger", p: 4500, c: "After Party" },
  { n: "Gourmet Burger", p: 8000, c: "After Party" },
  { n: "Regular Hotdog", p: 4000, c: "After Party" },
  { n: "Mini Hotdog", p: 3500, c: "After Party" },
  { n: "Gourmet Hotdog", p: 4500, c: "After Party" },
  { n: "Fries", p: 2000, c: "After Party" },
  { n: "Mini Burgers/Hotdogs, Fries & Chicken Wings (Combo)", p: 7500, c: "After Party" },
  { n: "Mini Beef Burger/Hotdog, Fries & Chicken Kebab (Combo)", p: 8000, c: "After Party" },
  { n: "Mini Beef Burger, Fries & Fish Fillet (Combo)", p: 8000, c: "After Party" },
  { n: "Mini Burger, Fries & Chicken Bbq (Combo)", p: 8000, c: "After Party" },
  { n: "Chicken Burger (Additional)", p: 1000, c: "After Party" },
  { n: "Gizdodo", p: 2500, c: "After Party" },
  { n: "Puffy Cups & Chicken Wings", p: 2500, c: "After Party" },
  { n: "Dundun & Dodo with Pomo Sauce", p: 2500, c: "After Party" },
  { n: "Dundun & Dodo with Shawa Sauce", p: 2000, c: "After Party" },
  { n: "Asun (Whole Goat - feeds 40-45 guests)", p: 120000, c: "After Party" },
  { n: "Tapioca", p: 2500, c: "After Party" },
  { n: "Tapioca Served with Eja Yoyo & Ede", p: 5000, c: "After Party" },
  { n: "Tapioca Served with Fantail Prawn", p: 5500, c: "After Party" },
  { n: "Tapioca Served with Mini Akara Sliders", p: 5500, c: "After Party" },

  // PLATTER MENU
  { n: "Nibbles Platter", p: 30000, c: "Platter" },
  { n: "Party Platter", p: 40000, c: "Platter" },
  { n: "Treaty Platter", p: 50000, c: "Platter" },
  { n: "Delish Platter", p: 55000, c: "Platter" },
  { n: "Appetizer Platter", p: 60000, c: "Platter" },
  { n: "Aso Ebi Platter", p: 70000, c: "Platter" },
  { n: "Planners Platter", p: 75000, c: "Platter" },
  { n: "Protein Platter", p: 80000, c: "Platter" },
  { n: "Chicmeat Platter", p: 80000, c: "Platter" },
  { n: "Delight Platter", p: 90000, c: "Platter" },
  { n: "Owanbe Platter", p: 95000, c: "Platter" },
  { n: "Fantastique Platter", p: 100000, c: "Platter" },
  { n: "ORI BOX", p: 100000, c: "Platter" }
];

let s = {}; // selected items { name: {p, q} }
const SERVICE_RATE_PERCENT = 20; // per spec

function init() {
  initializeInvoiceCode();
  renderCategoryFilter();  // Add this line
  renderMenuItems();
  const search = document.getElementById('search-input');
  if (search) search.addEventListener('input', e => renderMenuItems(e.target.value));
  renderSelectedItems();
}
function generateInvoiceCode(){
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2,7).toUpperCase();
  return `INV-${t}${r}`;
}
function initializeInvoiceCode(){
  const el = document.getElementById('invoice-code');
  if (el && !el.value) el.value = generateInvoiceCode();
}

/* Menu rendering & selection */
function renderMenuItems(filter = '') {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const items = m.filter(i => !filter || i.n.toLowerCase().includes(filter.toLowerCase()) || i.c.toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = items.map(it => {
    const sel = s[it.n] ? 'selected' : '';
    return `<div class="menu-item-card ${sel}" onclick="toggleItem('${escapeJS(it.n)}', ${it.p})">
      <div class="item-name">${it.n}</div>
      <div class="item-price">₦${it.p.toLocaleString()}</div>
    </div>`;
  }).join('') || '<div style="padding:12px;color:#999">No items found</div>';
}
function toggleItem(name, price) {
  if (s[name]) delete s[name];
  else s[name] = { p: price, q: 1 };
  renderMenuItems(document.getElementById('search-input')?.value || '');
  renderSelectedItems();
}
function escapeJS(str){ return String(str).replace(/'/g,"\\'").replace(/"/g,'\\"'); }

function renderSelectedItems(){
  const container = document.getElementById('selected-items-container');
  const target = document.getElementById('selected-items');
  if (!container || !target) return;
  const keys = Object.keys(s);
  if (keys.length === 0) { container.style.display = 'none'; target.innerHTML = ''; return; }
  container.style.display = 'block';
  target.innerHTML = keys.map(k => {
    const it = s[k];
    return `<div class="selected-item" style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f1f1">
      <div>
        <strong>${k}</strong><br>
        <small style="color:#666">₦<input type="number" value="${it.p}" min="0" style="width:90px;padding:4px;border:1px solid #ddd;border-radius:4px" onchange="updatePrice('${escapeJS(k)}', this.value)"></small>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <label style="font-size:13px">Qty</label>
        <input type="number" class="qty-input" value="${it.q}" min="1" onchange="updateQty('${escapeJS(k)}', this.value)">
        <button class="remove-btn" onclick="removeItem('${escapeJS(k)}')"><i class="fas fa-trash"></i></button>
      </div>
      <div style="font-weight:700;color:#dc2626">₦${(it.p * it.q).toLocaleString()}</div>
    </div>`;
  }).join('');
}

/* Selected item actions */
function addCustomMenu(){
  const name = (document.getElementById('custom-menu-name')?.value || '').trim();
  const price = parseFloat(document.getElementById('custom-menu-price')?.value) || 0;
  const qty = parseInt(document.getElementById('custom-menu-qty')?.value) || 1;
  if (!name) return showMessage('Enter menu name','error');
  if (price <= 0) return showMessage('Enter valid price','error');
  s[name] = { p: price, q: qty };
  document.getElementById('custom-menu-name').value = '';
  document.getElementById('custom-menu-price').value = '0';
  document.getElementById('custom-menu-qty').value = '1';
  renderSelectedItems();
  showMessage(`Custom item added`,'success');
}
function updatePrice(name, p){ if (!s[name]) return; s[name].p = parseFloat(p) || 0; renderSelectedItems(); }
function updateQty(name, q){ if (!s[name]) return; s[name].q = Math.max(1, parseInt(q) || 1); renderSelectedItems(); }
function removeItem(name){ delete s[name]; renderSelectedItems(); renderMenuItems(document.getElementById('search-input')?.value || ''); }

/* Messages */
function showMessage(msg, type='success'){
  const d = document.createElement('div');
  d.className = type === 'success' ? 'success-message' : 'error-message';
  d.textContent = msg;
  const container = document.querySelector('.container') || document.body;
  container.parentNode.insertBefore(d, container);
  setTimeout(()=> d.remove(), 5000);
}

/* Calculations per spec */
function updateCalculations(subtotal){
  const serviceCharge = subtotal * (SERVICE_RATE_PERCENT / 100);
  const vat = serviceCharge * 0.075;
  const total = subtotal + serviceCharge + vat;
  return { serviceCharge, vat, total };
}

/* Invoice generation (main) */
function generateInvoice(){
  try {
    // Gather and validate
    const clientName = (document.getElementById('client-name')?.value || '').trim();
    const eventDateRaw = document.getElementById('event-date')?.value;
    const eventDateFormatted = eventDateRaw ? new Date(eventDateRaw).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase() : '';
    const guests = document.getElementById('guests')?.value;
    const locationType = document.getElementById('location-type')?.value || '';
    const location = (document.getElementById('location')?.value || '').trim();
    const address = (document.getElementById('address')?.value || '').trim();
    const transportFee = parseFloat(document.getElementById('transport-fee')?.value) || 0;
    const invoiceCode = (document.getElementById('invoice-code')?.value) || generateInvoiceCode();

    if (!clientName) return showMessage('Please enter client name','error');
    if (!eventDateRaw) return showMessage('Please select event date','error');

    const items = Object.keys(s || {});
    if (!items.length) return showMessage('Select at least one menu item','error');

    // build items rows and subtotal
    let subtotal = 0;
    let rows = '';
    items.forEach(name => {
      const it = s[name];
      const line = (parseFloat(it.p) || 0) * (parseInt(it.q) || 1);
      subtotal += line;
      rows += `<tr style="border-bottom:1px solid #ddd">
        <td style="padding:12px 0;font-size:14px">${name}</td>
        <td style="padding:12px 0;font-size:14px;text-align:right">₦${(it.p).toLocaleString()}</td>
        <td style="padding:12px 0;font-size:14px;text-align:center">${it.q}</td>
        <td style="padding:12px 0;font-size:14px;text-align:right;font-weight:700">₦${line.toLocaleString()}</td>
      </tr>`;
    });

    const calc = updateCalculations(subtotal);
    const balanceDue = calc.total + transportFee;

    // Build invoice HTML matching design image
    const invoiceDate = new Date().toLocaleDateString();
    const dueDate = new Date(); dueDate.setDate(new Date().getDate() + 7);
    const dueDateFormatted = dueDate.toLocaleDateString();

    const invoiceHtml = `
      <div style="max-width:900px;margin:0 auto;font-family:Arial,sans-serif;background:#fff;color:#222;padding:40px">
        
        <!-- Header with Logo (Left) and Date (Right) -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;gap:20px">
          <!-- Logo & Company Details (Left) -->
          <div style="flex:1">
            <div style="display:flex;align-items:flex-start;gap:15px">
             
              <div style="flex:1;font-size:12px;line-height:1.5;color:#333">
               <div style="flex-shrink:0">
                <img src="cuisine-logo.jpg" style="width:70px;height:auto" alt="logo" />
              </div>
                <div style="font-weight:900;font-size:13px;margin-bottom:3px">Cuisine Fantastique</div>
                <div>Lekki Peninsula Scheme 2</div>
                <div>Road 10b, Femi Olugbile street, Lagos</div>
                <div>Phone: 08158894642</div>
                <div>Email: cuisinefantastique1@gmail.com</div>
              </div>
            </div>
          </div>

          <!-- Event Date (Right) -->
          <div style="text-align:right;font-size:14px;font-weight:900;color:#dc2626;letter-spacing:1px">
            ${eventDateFormatted}
          </div>
        </div>

        <!-- Horizontal Line -->
        <div style="border-top:3px solid #dc2626;margin-bottom:30px"></div>

        <!-- Bill To & Invoice Details (Two Columns) -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:30px">
          <!-- Bill To -->
          <div>
            <div style="font-size:13px;font-weight:900;color:#dc2626;margin-bottom:8px;border-left:4px solid #dc2626;padding-left:10px">BILL TO</div>
            <div style="font-size:14px;font-weight:700">${clientName}</div>
          </div>

          <!-- Invoice Details -->
          <div>
            <div style="font-size:13px;font-weight:900;color:#dc2626;margin-bottom:8px;border-left:4px solid #dc2626;padding-left:10px">INVOICE DETAILS</div>
            <div style="font-size:13px;line-height:1.6;color:#333">
              <div><strong>Invoice #:</strong> ${invoiceCode}</div>
              <div><strong>Invoice Date:</strong> ${invoiceDate}</div>
              <div><strong>Due Date:</strong> ${dueDateFormatted}</div>
              <div><strong>Balance Due:</strong> <span style="font-weight:900;color:#dc2626">₦${balanceDue.toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div style="margin-bottom:30px">
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="background:#dc2626;color:#fff">
                <th style="padding:12px;text-align:left;font-size:13px;font-weight:900">Description</th>
                <th style="padding:12px;text-align:right;font-size:13px;font-weight:900">Rate</th>
                <th style="padding:12px;text-align:center;font-size:13px;font-weight:900">Qty</th>
                <th style="padding:12px;text-align:right;font-size:13px;font-weight:900">Total</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>

        <!-- Horizontal Line -->
        <div style="border-top:3px solid #dc2626;margin-bottom:30px"></div>

        <!-- Summary & Payment (Two Columns) -->
        <div style="display:grid;grid-template-columns:1fr 350px;gap:30px;margin-bottom:30px">
          
          <!-- Payment Instructions (Left) -->
          <div>
            <div style="font-size:14px;font-weight:900;color:#dc2626;margin-bottom:15px;border-left:4px solid #dc2626;padding-left:10px">PAYMENT INSTRUCTIONS</div>
            
            <div style="font-size:13px;margin-bottom:15px">
              <div style="font-weight:900;margin-bottom:6px">Bank Transfer:</div>
              <div style="margin-left:0;font-size:12px;line-height:1.5;color:#555">
                <div><strong>Account Number:</strong> 2094187584</div>
                <div><strong>Account Name:</strong> Cuisine Fantastique</div>
                <div><strong>Bank Name:</strong> UBA</div>
              </div>
            </div>

            <div style="font-size:13px;font-weight:900;color:#dc2626;margin-bottom:10px;margin-top:15px">IMPORTANT TERMS & CONDITIONS</div>
            <div style="font-size:12px;line-height:1.6;color:#333;border-left:4px solid #dc2626;padding-left:10px">
              <div style="margin-bottom:6px">• A 100% non-refundable payment is required as commitment/booking fee</div>
              <div style="margin-bottom:6px">• All payments are non-refundable</div>
              <div style="margin-bottom:6px">• Kindly check if we are still available on your chosen date before paying a deposit</div>
              <div style="margin-bottom:6px">• In the case of a cancellation, all payments made are only transferable and cannot be refunded</div>
              <div>• Please NOTE that the invoice is only valid for one month and prices can change based on market price</div>
            </div>
          </div>

          <!-- Summary Box (Right) -->
          <div style="border-left:4px solid #dc2626;padding-left:15px">
            <div style="font-size:13px;margin-bottom:12px;line-height:1.8">
              <div style="display:flex;justify-content:space-between">
                <span>Subtotal:</span>
                <span style="font-weight:700;color:#dc2626">₦${subtotal.toLocaleString()}</span>
              </div>
              <div style="display:flex;justify-content:space-between">
                <span>Service Charge (${SERVICE_RATE_PERCENT}%):</span>
                <span style="font-weight:700;color:#dc2626">₦${calc.serviceCharge.toLocaleString()}</span>
              </div>
              <div style="display:flex;justify-content:space-between">
                <span>Transportation Fee:</span>
                <span style="font-weight:700;color:#dc2626">₦${transportFee.toLocaleString()}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:12px;color:#666;margin-top:8px">
                <span>VAT (7.5% on Service Charge):</span>
                <span style="font-weight:700">₦${calc.vat.toLocaleString()}</span>
              </div>
            </div>

            <div style="background:#dc2626;color:#fff;padding:12px;border-radius:4px;text-align:center;margin-top:12px;font-weight:900;font-size:16px">
              GRAND TOTAL:<br>₦${balanceDue.toLocaleString()}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align:center;font-size:11px;color:#999;margin-top:30px;line-height:1.5">
          <div>Thank you for choosing Cuisine Fantastique</div>
          <div>Generated: ${new Date().toLocaleDateString()}</div>
        </div>

      </div>
    `;

    const preview = document.getElementById('invoice-to-print');
    const previewWrap = document.getElementById('invoice-preview');
    if (preview && previewWrap) {
      preview.innerHTML = invoiceHtml;
      previewWrap.classList.add('active');
      previewWrap.style.display = 'block';
      document.getElementById('invoice-code').value = invoiceCode;
      window.lastInvoiceId = invoiceCode;
      previewWrap.scrollIntoView({ behavior: 'smooth' });
    } else {
      showMessage('Preview container not found','error');
    }
  } catch (err) {
    console.error('generateInvoice error', err);
    showMessage('Error generating invoice: ' + (err.message || 'unknown'), 'error');
  }
}

/* PDF generation */
function generatePDF(){
  const el = document.getElementById('invoice-to-print');
  if (!el || !el.innerHTML.trim()) return showMessage('No invoice to export. Generate invoice first.','error');

  const filename = 'Invoice-' + (window.lastInvoiceId || Date.now()) + '.pdf';
  const opt = {
    margin: 10,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  html2pdf().set(opt).from(el).save()
    .then(() => showMessage('PDF generated','success'))
    .catch(e => { console.error(e); showMessage('PDF generation failed','error'); });
}

/* Save/load basics */
function saveCurrentInvoice(){
  const code = document.getElementById('invoice-code')?.value || generateInvoiceCode();
  const snapshot = {
    code,
    clientName: document.getElementById('client-name')?.value || '',
    eventDate: document.getElementById('event-date')?.value || '',
    guests: document.getElementById('guests')?.value || '',
    locationType: document.getElementById('location-type')?.value || '',
    location: document.getElementById('location')?.value || '',
    address: document.getElementById('address')?.value || '',
    transportFee: document.getElementById('transport-fee')?.value || 0,
    items: s,
    savedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem('invoice_' + code, JSON.stringify(snapshot));
    showMessage('Invoice saved','success');
    document.getElementById('invoice-code').value = code;
  } catch (e) {
    console.error(e);
    showMessage('Save failed','error');
  }
}
function loadInvoiceData(){
  const code = (document.getElementById('invoiceCodeInput')?.value || '').trim();
  if (!code) return showMessage('Enter invoice code','error');
  const saved = localStorage.getItem('invoice_' + code);
  if (!saved) return showMessage('Invoice not found','error');
  try {
    const obj = JSON.parse(saved);
    document.getElementById('invoice-code').value = obj.code || '';
    document.getElementById('client-name').value = obj.clientName || '';
    document.getElementById('event-date').value = obj.eventDate || '';
    document.getElementById('guests').value = obj.guests || '';
    document.getElementById('location-type').value = obj.locationType || '';
    document.getElementById('location').value = obj.location || '';
    document.getElementById('address').value = obj.address || '';
    document.getElementById('transport-fee').value = obj.transportFee || 0;
    s = obj.items || {};
    renderSelectedItems();
    renderMenuItems(document.getElementById('search-input')?.value || '');
    toggleLoadPrompt();
    showMessage('Invoice loaded','success');
  } catch (e) {
    console.error(e);
    showMessage('Load failed','error');
  }
}

/* UI helpers */
function toggleLoadPrompt(){
  const p = document.getElementById('loadInvoicePrompt');
  if (!p) return;
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

/* Category filter */
function renderCategoryFilter() {
  const filterContainer = document.getElementById('category-filter');
  if (!filterContainer) return;
  
  // Get unique categories from menu items
  const categories = [...new Set(m.map(item => item.c))].sort();
  
  // Add "All" button first
  filterContainer.innerHTML = `<button class="category-btn active" onclick="filterByCategory('')">All</button>`;
  filterContainer.innerHTML += categories.map(cat => 
    `<button class="category-btn" onclick="filterByCategory('${escapeJS(cat)}')">${cat}</button>`
  ).join('');
}

function filterByCategory(category) {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = category;
    renderMenuItems(category);
  }
  // Update active button state
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// Boot
document.addEventListener('DOMContentLoaded', init);
