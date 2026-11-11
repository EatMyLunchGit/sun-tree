# Claims and placeholders to settle before launch

## Claims shown as aims (Fred, 11 Nov 2026)
Rule: if the claim has value we make it, and the requirement goes on the to-do list. These are on the site as plain statements. Each one must be true before the site is shown to the public.

| Claim on the site | What makes it true |
|---|---|
| Nutri-Score A (every dish card, Standard Plena) | Register with Santé publique France (free), compute every dish, reformulate to A. Shown as text only: the official logo needs the registration. |
| Made in Luxembourg (seal ring, ticker) | Label needs 12 months of trading or an exception from the Chamber. Text only, no official logo. The official logo may not sit next to "Grande Région". |
| Légumes bio de la Grande Région | Organic certification (Certisys or similar) and supplier invoices. "Bio" in a dish name needs 95% organic ingredients. |
| Sans additifs / "Additifs" in the Out list | Additive-free spec for every bought-in ingredient (tofu coagulants, plant cream, stock, mustard). |
| No rapeseed or sunflower oil | House rule since 20 Oct. Check bought-in items: harissa, tahini sauces, plant cream, fried tofu. Sesame is still used, so the site names the two oils, not "seed oils". |
| Extra virgin olive oil | Buy extra virgin for cooking as well as finishing; keep invoices. |
| Pluxee accepté | Contract live, online acceptance agreed in writing. Logo only with their permission. |
| SMS or Slack message on arrival | Slack needs an app installed in each company's workspace. |
| Dinner "seul ou en famille" | Dishes are same-day: the label and FAQ still say eat it the day it is cooked. |
| "Approuvé par notre diététicien·ne" | A named, qualified dietitian signs off every recipe in writing. Quote, name and title are placeholders in the FAQ. |
| "Recettes créées avec le chef Max de Toubron" | His written agreement to be named. |
| "Environ N de vos 5 fruits et légumes par jour" (dish pop-up) | Worked out from recipe weights: 80 g fresh or 30 g dried per portion, pulses count once, potatoes don't count, rounded down. Redo when a recipe changes. The Cairo has no figure yet. |
| Ingredient lists (dish pop-up) | Taken from the recipe docs, with olive oil in place of rapeseed and no lemon in the pot. The Nonna and The Tadka have no list yet. Rewrite from the final recipes and bought-in labels, in weight order with QUID percentages. |
| Nutri-Score logo | The site shows text until the official file exists. After registration, save the official logo as `media/nutriscore-a.svg` and it replaces the text everywhere. |
| Kitchen log times | Marked as a typical morning. Update once the real routine exists. |


Checked against `admin/research-food-claims.md` and `strategy/brand-naming.md` (project docs). Dashed "à confirmer" chips on the site mark the open items.

## On the site, with a condition
| Claim | Condition |
|---|---|
| "Cuisiné ce matin au Luxembourg" | True only for same-day pre-orders. Never on next-day fridge stock. Keep a batch log. |
| "25 g de protéines · 10 g de fibres" | Every dish must really reach both. It is a nutrition claim, so each dish needs a full nutrition table (per 100 g and per portion) before purchase. The dish sheet shows a placeholder for that table. |
| Per-dish protein, fibre, kcal | Calculated estimates from the recipe docs. Moselle, Nonna and Tadka have no figures yet. Lab-check before launch. |
| "Légumes de la Grande Région" | Supplier invoices per vegetable; true for fresh seasonal veg only. |
| "Avant midi, ou remboursé" | Written refund rule still to write. |
| "100 % végétale" (FAQ only) | No honey, dairy or animal-derived additives in bought-in ingredients. |
| Allergens per dish | From the recipe docs. Tamari must be wheat-free where gluten is not listed. Re-check every label. |
| Prices as three standing prices | No strikethrough, no "was/now". |

## Shown as placeholders
- Launch code LAUNCH20: 20% off EUR 15.50 is EUR 12.40, below the two-meal price. A "-20%" banner may also trigger the prior-price rule. Decide or remove.
- Customer quotes: examples, marked as such. Replace with real quotes, with consent.
- Pick-up points: generic examples. Name real places only once agreed.
- Contact, legal pages, kitchen address, tray material, cancellation rule.
- Photo and video slots: see `media/README.md`. Dish card and hero are illustrations standing in for photos. Side pots on the Marrakech card are not final.

## Left off on purpose
- Official Made in Luxembourg and Nutri-Score logos, any health or fullness wording.
- "Gluten-free / soy-free / sesame-free" filters: free-from claims need verified recipes and labels first.
- Fonts load from Google Fonts. For EU privacy, host the four font files on the site before launch.
