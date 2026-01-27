# Technical Architecture & Code Reference

## File Structure
```
c:\Users\HomePC\Desktop\invoice\
├── index.html (1760+ lines, all-in-one app)
├── CODE_AUDIT_IMPROVEMENTS.md (this documentation)
├── USAGE_GUIDE.md (user guide)
└── TECHNICAL_ARCHITECTURE.md (this file)
```

## Architecture Overview

### Single-File Design
- **Approach**: Vanilla JavaScript, no build tools
- **Benefits**: Simple deployment, no dependencies
- **Trade-offs**: Large file, no code splitting

### Technology Stack
```
HTML5 (semantic markup)
├── Forms (multi-step wizard)
├── CSS3 (responsive grid, flexbox)
│   └── Mobile breakpoints (480px, 768px)
└── JavaScript ES6+ (core app logic)
    ├── DOM manipulation
    ├── localStorage API
    └── External libraries via CDN
        ├── Chart.js (analytics charts)
        ├── html2pdf.js (PDF generation)
        └── Font Awesome 6.4.0 (icons)
```

## Core Data Structures

### Menu Item Object
```javascript
{
  n: "Item Name String",        // name
  p: 5000,                       // price (in Naira)
  c: "Category Name"             // category
}
```
**Stored**: In `const m = [...]` array, ~190 items
**Constraints**: Price > 0, Category must exist
**Validation**: Type checking in renderMenuItems()

### Selected Items Object
```javascript
s = {
  "Item Name 1": { p: 5000, q: 2 },
  "Item Name 2": { p: 3000, q: 1 },
  ...
}
```
**Structure**: Global object `s`
**Price**: Stored as float, validated 0-999,999,999
**Quantity**: Integer 1-999
**Usage**: Passed through form steps, stored in localStorage

### Invoice Object
```javascript
{
  id: "INV-1234567890",          // unique invoice ID
  client: "Client Name",          // required
  email: "email@domain.com",     // optional
  date: "2024-01-15",            // event date (YYYY-MM-DD)
  locType: "lagos" | "outside",  // location type for service charge
  locArea: "Location Area",      // area/district
  addr: "Full Address",          // venue address
  transport: 5000,               // transportation fee (0+)
  discount: 0,                   // discount amount (0+)
  items: { /* selected items */ }, // copy of `s` object
  paid: 0,                       // amount paid so far
  timestamp: 1705324800000       // milliseconds since epoch
}
```
**Storage**: In localStorage as `localStorage.setItem(id, JSON.stringify(invoice))`
**Key**: Uses invoice ID (INV-*)
**Expiration**: Removed after 30 days
**Validation**: All properties type-checked on retrieval

### Calculation Object (Implicit)
```javascript
sub = 10000;                    // subtotal (sum of item prices × qty)
sc = 1500;                      // service charge (flat or percentage)
vat = 112.5;                    // VAT (7.5% of service charge)
t = 5000;                       // transport fee
discount = 500;                 // discount amount
gt = 16112.5;                   // grand total
paid = 5000;                    // amount already paid
balance = 11112.5;              // balance due
```
**Formula**: `gt = sub + sc + vat + t - discount`
**Balance**: `balance = gt - paid`
**Constraints**: balance ≥ 0, sc based on location type

## Function Categories

### Initialization & Setup
1. **init()** - Renders categories, menu, sets up event listeners
2. **updateServiceChargeRate()** - Sets SC rate based on location
3. **checkStorageQuota()** - Monitors localStorage usage
4. **debounce(func, wait)** - Creates debounced version of function

### Menu Management
1. **filterCategory(category)** - Filters menu by selected category
2. **renderMenuItems(search)** - Renders menu with search/filter
3. **toggleItem(name, price)** - Adds/removes item from selection

### Form Navigation
1. **goToStep(step)** - Navigates to form step 1-4
2. **validateAndNext(step)** - Validates current step before next
3. **renderSelectedItems()** - Shows items in step 2
4. **renderEditItems()** - Shows items in step 3
5. **renderReview()** - Shows summary in step 4

### Item Management
1. **updatePrice(name, newPrice)** - Changes item price (0-999,999,999)
2. **updateQty(name, newQty)** - Changes item quantity (1-999)
3. **removeItem(name)** - Deletes item from selection

### Invoice Operations
1. **generateInvoice()** - Creates invoice HTML, stores to localStorage
2. **retrieveInvoice(id)** - Loads invoice from localStorage
3. **applyPayment()** - Applies payment to invoice
4. **generatePDF()** - Exports invoice as PDF file
5. **printInvoice()** - Opens browser print dialog
6. **copyInvoiceId()** - Copies ID to clipboard

### Invoice Management
1. **showInvoicesList()** - Displays all invoices as cards
2. **markAsPaidModal(id)** - Marks invoice as paid
3. **deleteInvoice(id)** - Removes invoice from storage
4. **sendInvoiceEmail()** - Email sending (placeholder)

### Analytics
1. **showAnalytics()** - Opens analytics modal
2. **calculateAnalytics()** - Computes all metrics and chart

### Storage Management
1. **backupInvoices()** - Exports all invoices to JSON file
2. **restoreInvoices(file)** - Imports invoices from JSON file
3. **cleanupOldInvoices()** - Removes invoices > 30 days

### Utility
1. **updateFloatingButton()** - Shows/hides floating next button
2. **scrollToNextButton()** - Scrolls to and pulses next button
3. **closeModal()** - Closes invoice management modal
4. **showPasswordModal(action)** - Opens password entry (not implemented)

## Global Variables

### State
```javascript
let f = 'All';                    // current filter category
let s = {};                       // selected items object
let currentStep = 1;              // current form step (1-4)
let currentlyViewingInvoiceId;   // used for viewing invoices
let passwordAction = null;        // pending password action
let serviceChargeRate = 15;       // SC % (15 or 20)
let isProcessing = false;         // prevent race conditions
```

### Constants
```javascript
const m = [/* 190 menu items */]; // menu array
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000; // millisecond constant
```

## Event Flow

### Creating New Invoice
```
User: Click "Create New Invoice"
  ↓
goToStep(1) → Show client info form
  ↓
User: Fill details, click Next
  ↓
validateAndNext(1) → Validate form
  ↓
goToStep(2) → Show menu selection
  ↓
User: Search/filter, click items
  ↓
toggleItem() → Add to `s` object, renderMenuItems()
  ↓
User: Click Next
  ↓
goToStep(3) → Show edit items
  ↓
User: Adjust prices/quantities
  ↓
updatePrice/Qty() → Modify `s` object
  ↓
User: Click Next
  ↓
goToStep(4) → Show review
  ↓
renderReview() → Display summary
  ↓
User: Click Generate
  ↓
generateInvoice() → Create HTML, save to localStorage
  ↓
User: Print/PDF/Email
```

### Loading Existing Invoice
```
User: Click "Manage Invoices"
  ↓
showInvoicesList() → Query localStorage for INV-* keys
  ↓
Render invoice cards with Load/Pay/Delete buttons
  ↓
User: Click Load
  ↓
retrieveInvoice(id) → JSON.parse from localStorage
  ↓
Validate all properties, check 30-day expiration
  ↓
Populate form with invoice data
  ↓
goToStep(1) → Reset to editing
```

## localStorage Schema

### Keys
```
Key Pattern: "INV-[9-digit-timestamp]"
Examples:
  "INV-123456789"
  "INV-987654321"
  (Not used: "current-invoice-id", stores in form)
```

### Values
```javascript
{
  "id": "INV-123456789",
  "client": "John Doe",
  "email": "john@example.com",
  "date": "2024-01-15",
  "locType": "lagos",
  "locArea": "Lekki",
  "addr": "123 Main St",
  "transport": 5000,
  "discount": 0,
  "items": {
    "Suya Sticks": { p: 3000, q: 2 },
    "Chicken Wings": { p: 5000, q: 1 }
  },
  "paid": 0,
  "timestamp": 1705324800000
}
```

### Size Estimation
- Empty invoice: ~400 bytes
- With 10 items: ~800 bytes
- With 50 items: ~2,000 bytes
- Average invoice: ~500-1,000 bytes

### Capacity
- Browser quota: ~5MB typically
- Bytes per invoice: 500-1,000
- Capacity: ~5,000-10,000 invoices
- Before cleanup recommended: ~250 invoices

## Error Handling Strategy

### Levels
1. **Input Validation** - Prevent bad data from entering system
2. **Type Checking** - Ensure properties have expected types
3. **Null Checks** - Prevent access to undefined/null
4. **Try-Catch** - Catch runtime errors and log them
5. **User Feedback** - Display friendly error messages

### Error Message Pattern
```javascript
try {
  // Operation
} catch (e) {
  console.error('Operation error:', e);
  alert('Error: [user-friendly message]');
}
```

### Graceful Degradation
- Missing DOM element? Skip operation, don't crash
- Invalid JSON? Log it, skip item, continue
- Corrupted invoice? Clean it up, continue processing
- Missing library? Alert user, suggest refresh

## Performance Considerations

### Optimizations Implemented
1. **Debounced Search** - 300ms delay before rendering
2. **Lazy Chart Creation** - 100ms setTimeout for Chart.js
3. **Event Listener Cloning** - Prevent duplicate listeners
4. **Efficient Filtering** - filter() chains with early returns
5. **Quota Monitoring** - Proactive cleanup before quota full

### Bottlenecks & Solutions
| Issue | Cause | Solution |
|-------|-------|----------|
| Slow search | 190 items rendered per keystroke | Debounce with 300ms |
| Storage errors | Quota exceeded | Monitor at 80-90%, auto-cleanup |
| Memory leak | Duplicate event listeners | Clone & replace input |
| Slow calculations | Recalculate on every modal open | Validate before iterating |
| XSS vulnerabilities | Unescaped user input | HTML escape all outputs |

## Browser APIs Used

### DOM API
- `document.getElementById()`
- `document.querySelectorAll()`
- `document.createElement()`
- `element.addEventListener()`
- `element.style.*`
- `element.classList.*`

### Storage API
- `localStorage.getItem(key)`
- `localStorage.setItem(key, value)`
- `localStorage.removeItem(key)`
- `Object.keys(localStorage)`

### File API
- `FileReader` for backup restore
- `Blob` for backup download
- `URL.createObjectURL()` for download links

### Clipboard API
- `navigator.clipboard.writeText()` for copy

### Storage Quota API
- `navigator.storage.estimate()` for usage monitoring

### Chart Library
- `Chart.js` via CDN for analytics

### PDF Library
- `html2pdf.js` via CDN for PDF export

## Security Analysis

### XSS Prevention ✅
- All user input HTML-escaped before display
- Template literals with sanitized values
- No `innerHTML` from unsanitized sources
- onclick handlers properly escaped quotes

### Injection Prevention ✅
- JSON validation with try-catch
- Type checking for all inputs
- No eval() or Function() used
- No SQL (no database)

### CSRF Protection ⚠️
- Not applicable (single-user, local storage)
- No API calls with state-changing operations
- Would need CSRF tokens if backend added

### Data Validation ✅
- All numbers range-checked
- All strings length-limited
- All dates validated
- All objects schema-validated

### Future Security Needs
- HTTPS for any cloud sync
- Authentication for multi-user
- Encryption for sensitive data
- API rate limiting
- Input sanitization on server

## Testing Strategy

### Unit Test Areas
```javascript
// Mathematical correctness
- Calculation functions (subtotal, SC, VAT, balance)
- Price and quantity constraints
- Service charge logic (15% vs 20%)

// Data integrity
- Invoice save/load cycle
- JSON serialization/deserialization
- 30-day expiration logic
- Corrupted data handling

// Input validation
- Price range validation (0-999,999,999)
- Quantity range validation (1-999)
- Email format validation
- Required field validation

// UI state
- Form step navigation
- Modal opening/closing
- Event listener attachment
- DOM element existence
```

### Integration Test Scenarios
1. Create invoice from scratch → Generate → PDF → Print
2. Load invoice → Modify → Save → Reload → Verify
3. Create 250+ invoices → Check cleanup works
4. Backup 100 invoices → Restore → Verify data
5. Fill form → Validate each step → Submit
6. Search 190 items → Filter by category → Verify results

### Regression Tests
- No unhandled exceptions on app load
- All menu items accessible
- All form fields editable
- All calculations correct
- All buttons functional
- All modals closeable

## Deployment Checklist

- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Test on mobile (iPhone, Android)
- [ ] Test offline functionality
- [ ] Test with 100+ invoices
- [ ] Test backup/restore
- [ ] Verify all error messages display
- [ ] Verify PDF export works
- [ ] Verify print dialog opens
- [ ] Check console for errors (F12)
- [ ] Verify analytics display
- [ ] Test email sending placeholder
- [ ] Verify all links work
- [ ] Check responsive design at 480px
- [ ] Verify no XSS vulnerabilities (special chars)
- [ ] Test password modal (if used)

## Maintenance Tasks

### Weekly
- Monitor browser console for errors
- Check analytics for unusual patterns
- Verify backups working

### Monthly
- Review error logs
- Optimize slow areas
- Update documentation
- Plan feature enhancements

### Quarterly
- Security audit
- Performance testing
- Backup health check
- Browser compatibility check

### Annually
- Full code review
- Dependency updates (if any)
- Security assessment
- Scalability planning

## Migration to Backend (Future)

### Step 1: API Gateway
Replace localStorage with:
```javascript
// Before
localStorage.setItem(id, JSON.stringify(data));

// After
await fetch('/api/invoices', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### Step 2: Authentication
Add user login before any operations

### Step 3: Cloud Storage
- Replace localStorage queries with API calls
- Add pagination for invoice list
- Add filters and search on backend

### Step 4: Multi-User
- Add user permissions
- Add audit logging
- Add concurrent edit handling
- Add conflict resolution

## Technology Recommendations for v2.0

### Backend
- Node.js + Express (JavaScript familiarity)
- PostgreSQL (relational data)
- JWT authentication
- REST or GraphQL API

### Frontend Enhancements
- React/Vue framework (component organization)
- State management (Redux/Pinia)
- Build tooling (Webpack/Vite)
- Testing framework (Jest/Vitest)

### Infrastructure
- Docker containerization
- Kubernetes orchestration
- CI/CD pipeline
- Cloud hosting (AWS/GCP/Azure)
- CDN for static files

### Monitoring
- Error tracking (Sentry)
- Analytics (Google Analytics/Mixpanel)
- Logging (ELK stack)
- Performance monitoring (New Relic)

---

**Architecture Built for 20-Year Evolution** • Modular • Extensible • Well-Documented
