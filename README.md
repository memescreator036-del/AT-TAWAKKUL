# At-Tawakkul website - setup (about 15 minutes)

Files: index.html, menu.html, checkout.html, admin.html, app.js, data.js, config.js, style.css, logo.jpg, firestore.rules, storage.rules

1. Go to https://console.firebase.google.com and create a project.
2. Build > Authentication > Sign-in method: turn ON **Google** and **Email/Password**.
3. Build > Firestore Database > Create (production mode). Open Rules, paste firestore.rules, Publish.
4. Build > Storage > Get started. Open Rules, paste storage.rules, Publish.
5. Project settings > Your apps > Web (</>) > copy the config into **config.js**.
6. (Optional) Paystack: paste your PUBLIC key in config.js to accept card payments.
7. Upload this whole folder to Netlify (drag and drop at app.netlify.com/drop).
8. Firebase > Authentication > Settings > Authorized domains > add your Netlify domain.
9. Open admin.html (or tap the logo 5 times on any page), sign in with Google using one of the 3 admin emails.
   Admin > Foods & prices > "Load default menu", then set the Congo/Bag prices and upload photos. Admin > Settings: bank details, name, fees.

Security: only the 3 admin emails (set in firestore.rules, storage.rules and config.js) can edit data. Admins must use Google sign-in (or a verified email). Customers can only read/create their own orders and cannot confirm payment.
