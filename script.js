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

  // BREAKFAST MENU (per guest) — expanded descriptions
  { n: "Breakfast - Buffet Style (per guest): Includes Tea (Green/Black/Flavored), Coffee, Juice, Mini Snacks (Meat Pie, Sausage Roll, Doughnut), Bread Roll, Cup Cakes, Sandwiches, Pancakes, Grilled Sausages, Spicy Chicken Wings, Fruit Platter, Tapioca, Boiled Yam, Plantain, Sweet Potatoes, Titus Sauce, Various Egg Preparations, Macaroni, Ewa Agoyin, Baked Beans, Sliced Bread, Irish Potato", p: 15000, c: "Breakfast" },
  { n: "Breakfast - Menu 2 (per guest): Includes Tea Station, Slice Bread, Sausage, Baked Beans, Scrambled Eggs", p: 12000, c: "Breakfast" },
  { n: "Breakfast - Menu 3 (per guest): Includes 2 Snacks, 1 Protein, Tea Station, Boiled Plantain, Boiled Yam, Fish Stew, Sauteed Potatoes, Nigerian Egg Sauce", p: 6000, c: "Breakfast" },
  { n: "Breakfast - Menu 4 (per guest): Executive Snacks (Mini Croissant, Mini Pain Au Chocolat, Muffins, Mini Sliders, Waffles, Puff Pastry Meat Pie, Puff Pastry Sausage, Sandwiches), 1 Protein, Juice Station", p: 12000, c: "Breakfast" },

  // SMALL CHOPS (per guest) — expanded option contents
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

  // GRILL HOUSE (per serving/combo)
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

  // MINI FOOD (per serving)
  { n: "Jambalaya Rice served with chicken skewers / chicken lollipop", p: 4500, c: "Mini Food" },
  { n: "Suya Spiced Alfredo with Prawns", p: 4500, c: "Mini Food" },
  { n: "Shrimps Fried Rice served with crispy fish & veggies", p: 4500, c: "Mini Food" },
  { n: "Ofada Rice served with orisirisi meat & egg", p: 4500, c: "Mini Food" },
  { n: "Tomato Basil Pasta served with meatballs", p: 4500, c: "Mini Food" },
  { n: "Alfredo Pasta served with prawns/meatballs/chicken wings", p: 4500, c: "Mini Food" },
  { n: "Native Rice served with spicy diced goat meat", p: 4500, c: "Mini Food" },
  { n: "Crispy Potato Wedges with Bbq Chicken", p: 4500, c: "Mini Food" },
  { n: "Stir-Fried Spaghetti served with spicy chicken", p: 4500, c: "Mini Food" },

  // AFTER PARTY EATS - Shawarma
  { n: "Full Beef Sausage Shawarma", p: 3000, c: "After Party" },
  { n: "Mini Beef Sausage Shawarma", p: 1500, c: "After Party" },
  { n: "Full Chicken Sausage Shawarma", p: 3000, c: "After Party" },
  { n: "Mini Chicken Sausage Shawarma", p: 1500, c: "After Party" },
  { n: "Full Mixed Special (beef & Chicken) Shawarma", p: 3500, c: "After Party" },
  { n: "Mini Mixed Special (beef & Chicken) Shawarma", p: 1800, c: "After Party" },

  // AFTER PARTY EATS - Burgers / Hotdogs / Combos / Additional
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

  // PLATTER MENU (per platter)
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
let s={},f='All',serviceChargeRate=15;

function init(){
    const cs=['All',...new Set(m.map(i=>i.c))];
    document.getElementById('category-filter').innerHTML = cs.map(c=>
        `<button class="filter-btn ${c==='All'?'active':''}" data-cat="${c}" onclick="filterCategory('${c}', this)">${c}</button>`
    ).join('');
    renderMenuItems(document.getElementById('search-input').value || '');
    document.getElementById('search-input').addEventListener('input',e=>renderMenuItems(e.target.value));
}

function updateServiceChargeRate(){
    const locationType = document.getElementById('location-type').value;
    serviceChargeRate = locationType === 'outside' ? 20 : 15;
}

function filterCategory(c, btnEl){
    f = c;
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    if(btnEl && btnEl.classList) btnEl.classList.add('active');
    else {
        const found = document.querySelector(`.filter-btn[data-cat="${c}"]`);
        if(found) found.classList.add('active');
    }
    renderMenuItems(document.getElementById('search-input').value || '');
}

function renderMenuItems(t=''){
    const g=document.getElementById('menu-grid');
    let items = f==='All' ? m : m.filter(i=>i.c===f);
    if(t) items = items.filter(i=>i.n.toLowerCase().includes(t.toLowerCase()) || i.c.toLowerCase().includes(t.toLowerCase()));
    if(items.length===0){
        g.innerHTML = '<div class="empty-state"><i class="fas fa-search" style="font-size:40px;color:#ccc;margin-bottom:8px"></i><p>No items found</p></div>';
        return;
    }
    g.innerHTML = items.map(i=>`<div class="menu-item-card ${s[i.n]?'selected':''}" onclick="toggleItem('${i.n.replace(/'/g,"\\'")}',${i.p})"><div class="item-category">${i.c}</div><div class="item-name">${i.n}</div><div class="item-price">₦${i.p.toLocaleString()}</div></div>`).join('');
}

function toggleItem(n,p){ s[n] ? delete s[n] : s[n] = {p,q:1}; renderMenuItems(document.getElementById('search-input').value || ''); renderSelectedItems(); }

function addCustomMenu(){
    const name = document.getElementById('custom-menu-name').value.trim();
    const price = parseFloat(document.getElementById('custom-menu-price').value) || 0;
    const qty = parseInt(document.getElementById('custom-menu-qty').value) || 1;
    
    if(!name){ alert('Please enter a menu name'); return; }
    if(price <= 0){ alert('Please enter a valid price'); return; }
    
    s[name] = {p: price, q: qty};
    
    document.getElementById('custom-menu-name').value = '';
    document.getElementById('custom-menu-price').value = '0';
    document.getElementById('custom-menu-qty').value = '1';
    
    renderSelectedItems();
}

function renderSelectedItems(){
    const c=document.getElementById('selected-items-container'), d=document.getElementById('selected-items'), items=Object.keys(s);
    if(items.length===0){ c.style.display='none'; return; }
    c.style.display='block';
    d.innerHTML = items.map(n=>`<div class="selected-item"><div class="selected-item-info"><strong>${n}</strong><br><small style="color:#dc2626">₦<input type="number" style="width:80px;padding:2px;border:1px solid #dc2626;border-radius:3px;font-size:11px;font-weight:600;color:#dc2626" value="${s[n].p}" onchange="updatePrice('${n.replace(/'/g,"\\'")}',this.value)" min="0"></small></div><div style="display:flex;align-items:center;gap:8px"><label style="margin:0;font-size:11px">Qty:</label><input type="number" class="qty-input" value="${s[n].q}" min="1" onchange="updateQty('${n.replace(/'/g,"\\'")}',this.value)"><button class="remove-btn" onclick="removeItem('${n.replace(/'/g,"\\'")}')"><i class="fas fa-trash"></i></button></div></div>`).join('');
}

function updatePrice(n,p){
    s[n].p = parseFloat(p) || 0;
    renderSelectedItems();
}

function updateQty(n,q){ s[n].q = parseInt(q) || 1; renderSelectedItems(); }

function removeItem(n){ delete s[n]; renderMenuItems(document.getElementById('search-input').value || ''); renderSelectedItems(); }

function generateInvoice(){
    const clientName = document.getElementById('client-name').value.trim();
    const d=document.getElementById('event-date').value,g=document.getElementById('guests').value,l=document.getElementById('location').value,a=document.getElementById('address').value;
    if(!clientName){ alert('Please enter client name!'); return; }
    if(!d||!g||!l||!a){ alert('Please fill in all event details!'); return; }
    const items = Object.keys(s);
    if(items.length===0){ alert('Please select at least one menu item!'); return; }
    
    let sub=0;
    const rows = items.map(n=>{ const i=s[n], tot=i.p*i.q; sub+=tot; return `<tr class="invoice-item"><td>${n}</td><td style="text-align:right">₦${i.p.toLocaleString()}</td><td style="text-align:center">${i.q}</td><td style="text-align:right">₦${tot.toLocaleString()}</td></tr>` }).join('');
    
    const t=parseFloat(document.getElementById('transport-fee').value)||0;
    const sc = sub * (serviceChargeRate / 100);
    const vat = sc * 0.075;
    const gt = sub + sc + vat + t;
    
    const inv='INV-'+Date.now(), dt=new Date().toLocaleDateString(), dueDate=new Date(Date.now()+30*24*60*60*1000).toLocaleDateString();
    
    document.getElementById('invoice-to-print').innerHTML =
    `<div class="invoice-header">
        <div class="invoice-left">
            <div style="display:flex;flex-direction:column;align-items:flex-start;gap:8px">
                <img src="cuisine-logo.jpg" alt="Cuisine Fantastique" class="invoice-logo">
                <div class="invoice-header-details">
                    <strong>Cuisine Fantastique</strong><br>
                    Lekki Peninsula Scheme 2<br>
                    Road 10b, Femi Olugbile street, Lagos<br>
                    <strong>Phone:</strong> 08158894642<br>
                    <strong>Email:</strong> cuisinefantastique1@gmail.com
                </div>
            </div>
        </div>
        <div class="invoice-title">${new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
    
    <div class="invoice-details">
        <div class="detail-box">
            <h3>Bill To</h3>
            <p><strong>${clientName}</strong></p>
        </div>
        <div class="detail-box">
            <h3>Invoice Details</h3>
            <p><strong>Invoice #:</strong> ${inv}</p>
            <p><strong>Invoice Date:</strong> ${dt}</p>
            <p><strong>Due Date:</strong> ${dueDate}</p>
            <p><strong>Balance Due:</strong> ₦${gt.toLocaleString()}</p>
        </div>
    </div>
    
    <table class="items-table">
        <thead>
            <tr><th>Description</th><th style="text-align:right">Rate</th><th style="text-align:center">Qty</th><th style="text-align:right">Total</th></tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>
    
    <div class="invoice-summary-block">
        <div class="summary-row">
            <span class="summary-label">Subtotal:</span>
            <span class="summary-value" id="subtotal">₦${sub.toLocaleString()}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Service Charge (${serviceChargeRate}%):</span>
            <span class="summary-value" id="service-charge">₦${sc.toLocaleString()}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Transportation Fee:</span>
            <span class="summary-value" id="transport-amount">₦${t.toLocaleString()}</span>
        </div>
        <div class="summary-row" style="font-size:9px;color:#666;border-bottom:none;padding:4px 0">
            <span class="summary-label" style="color:#666"><em>VAT (7.5% on Service Charge):</em></span>
            <span class="summary-value" id="vat-amount" style="color:#666">₦${vat.toLocaleString()}</span>
        </div>
        <div class="summary-row grand-total">
            <span class="summary-label">GRAND TOTAL:</span>
            <span class="summary-value" id="grand-total">₦${gt.toLocaleString()}</span>
        </div>
    </div>
    
    <div class="payment-block">
        <h3>Payment Instructions</h3>
        <div class="bank-details">
            <strong>Bank Transfer:</strong><br>
            Account Number: 2094187584<br>
            Account Name: Cuisine Fantastique<br>
            Bank Name: UBA
        </div>
        <h3 style="margin-top:10px">Important Terms & Conditions</h3>
        <ul>
            <li>A 100% non-refundable payment is required as commitment/booking fee</li>
            <li>All payments are non-refundable</li>
            <li>Kindly check if we are still available on your chosen date before paying a deposit</li>
            <li>In the case of a cancellation, all payments made are only transferable and cannot be refunded</li>
            <li>Please NOTE that the invoice is only valid for one month and prices can change based on market price</li>
        </ul>
    </div>`;
    
    window.lastInvoiceId = inv.replace(/\s+/g,'');
    document.getElementById('invoice-preview').classList.add('active');
    document.getElementById('invoice-preview').scrollIntoView({behavior:'smooth'});
}

function updateCalculations(){
    let subtotalAmount = 0;
    document.querySelectorAll('.invoice-item').forEach(row => {
        const rate = parseFloat(row.cells[1].textContent.replace('₦','').replace(/,/g,'')) || 0;
        const qty = parseInt(row.cells[2].textContent) || 0;
        subtotalAmount += rate * qty;
    });
    
    const serviceCharge = subtotalAmount * (serviceChargeRate / 100);
    const transportationFee = parseFloat(document.getElementById('transport-fee').value) || 0;
    const vat = serviceCharge * 0.075;
    const grandTotal = subtotalAmount + serviceCharge + vat + transportationFee;
    
    document.getElementById('subtotal').textContent = '₦' + subtotalAmount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('service-charge').textContent = '₦' + serviceCharge.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('vat-amount').textContent = '₦' + vat.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('transport-amount').textContent = '₦' + transportationFee.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('grand-total').textContent = '₦' + grandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function generatePDF() {
    const element = document.getElementById('invoice-to-print');
    
    if (!element || element.innerHTML.trim() === '') {
        alert('Please generate an invoice first');
        return;
    }

    const options = {
        margin: [10, 10, 10, 10],
        filename: 'Cuisine_Invoice_' + new Date().toISOString().split('T')[0] + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 4,
            useCORS: true,
            allowTaint: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(options).from(element).save();
}

init();
