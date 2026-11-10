/* Plena storefront logic: language, week board, price ladder, basket, demo checkout. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };

  let lang = store.get('plena.lang', null) || ((navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'fr');
  let tab = 0;
  let repFilter = 'all';
  let picked = store.get('plena.cart', []);

  const t = (k, vars) => {
    let s = I18N[lang][k];
    if (typeof s !== 'string') return s;
    if (vars) for (const v in vars) s = s.replace('{' + v + '}', vars[v]);
    return s;
  };
  const money = n => lang === 'fr' ? n.toFixed(2).replace('.', ',') + ' €' : '€' + n.toFixed(2);
  const dish = id => DISHES.find(d => d.id === id);

  /* ---- Dates, in Luxembourg time ---- */
  const luNow = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Luxembourg' }));
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const monday = d => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); const wd = (x.getDay() + 6) % 7; return addDays(x, -wd); };
  const weekNo = m => Math.round((Date.UTC(m.getFullYear(), m.getMonth(), m.getDate()) - Date.UTC(2026, 0, 5)) / 6048e5);
  const dishFor = date => { const m = monday(date); const wd = (date.getDay() + 6) % 7; return dish(ROTATION[((weekNo(m) % 2) + 2) % 2][wd]); };
  const fmtDay = d => t('days')[(d.getDay() + 6) % 7] + ' ' + d.getDate() + ' ' + t('months')[d.getMonth()];

  function calendar() {
    const now = luNow();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekend = now.getDay() === 0 || now.getDay() === 6;
    const first = weekend ? addDays(monday(today), 7) : monday(today);
    const weeks = [0, 1].map(w => [0, 1, 2, 3, 4].map(i => {
      const date = addDays(first, w * 7 + i);
      const isToday = iso(date) === iso(today);
      let state = 'ahead';
      if (date < today) state = 'past';
      else if (isToday) state = now.getHours() < CUTOFF_HOUR ? 'today' : 'closed';
      return { date, key: iso(date), state, dish: dishFor(date) };
    }));
    return { now, today, weekend, weeks };
  }
  let cal = calendar();
  const dayByKey = k => cal.weeks.flat().find(d => d.key === k);
  const prune = () => { picked = picked.filter(k => { const d = dayByKey(k); return d && (d.state === 'ahead' || d.state === 'today'); }).sort(); store.set('plena.cart', picked); };

  /* ---- Prices ---- */
  const single = day => day.state === 'today' ? PRICES.day : PRICES.ahead;
  function totals() {
    const days = picked.map(dayByKey);
    const n = days.length;
    const each = d => n >= 2 ? PRICES.multi : single(d);
    const total = days.reduce((s, d) => s + each(d), 0);
    const full = days.reduce((s, d) => s + single(d), 0);
    return { days, n, each, total, save: full - total };
  }

  /* ---- Static copy ---- */
  function applyCopy() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $$('[data-price]').forEach(el => { el.textContent = money(+el.dataset.price); });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('#heroArt').innerHTML = heroSVG(t('hero.alt'));
    const tk = t('ticker').map(x => `<span>${x}</span>`).join('<i>✺</i>') + '<i>✺</i>';
    $('#ticker').innerHTML = tk + tk;
    $('#howList').innerHTML = t('how').map((h, i) => `<li>${HOW_ICONS[i]}<div><b>${h[0]}</b> <span>${h[1]}</span></div></li>`).join('');
    const m = dish('marrakech');
    $('#dishArt').innerHTML = dishCardSVG(t('labels'), t('dish.alt'));
    $('#dishStats').innerHTML = `<li><b>${m.p} g</b>${t('prot')}</li><li><b>${m.f} g</b>${t('fib')}</li><li><b>${m.kcal}</b>kcal</li>`;
    $('#ioIn').innerHTML = t('ioIn').map(x => `<li>${x}</li>`).join('');
    $('#ioOut').innerHTML = t('ioOut').map(x => `<li>${x}</li>`).join('');
    $('#quotes').innerHTML = t('quotes').map((q, i) => `<figure class="q q${i}"><span class="ph">${t('example')}</span><blockquote>${lang === 'fr' ? '« ' + q[0] + ' »' : '“' + q[0] + '”'}</blockquote><figcaption>${q[1]}</figcaption></figure>`).join('');
    $('#faqList').innerHTML = t('faq').map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
  }

  /* ---- Week board ---- */
  const allergenText = d => d.allergens.length ? d.allergens.map(a => ALLERGENS[a][lang]).join(', ') : t('none14');
  const nums = d => d.p ? `<b>${d.p} g</b> ${t('prot')} · <b>${d.f} g</b> ${t('fib')} · ${d.kcal} kcal` : `${t('prot')}, ${t('fib')} : <span class="ph">${t('tbc')}</span>`;

  function renderWeek() {
    const labels = cal.weekend ? [t('tab.next'), t('tab.after')] : [t('tab.this'), t('tab.next')];
    $('#weekTabs').innerHTML = cal.weeks.map((w, i) => `<button role="tab" type="button" aria-selected="${i === tab}" data-tab="${i}">${labels[i]}<small>${w[0].date.getDate()} – ${w[4].date.getDate()} ${t('months')[w[4].date.getMonth()]}</small></button>`).join('');
    $('#weekBoard').innerHTML = cal.weeks[tab].map(day => {
      const d = day.dish, on = picked.includes(day.key), can = day.state === 'ahead' || day.state === 'today';
      const badge = day.state === 'today' ? `<em class="tag tag-today">${t('today')}</em>` : day.state === 'past' ? `<em class="tag">${t('past')}</em>` : day.state === 'closed' ? `<em class="tag">${t('closed')}</em>` : '';
      return `<article class="day ${can ? '' : 'is-off'} ${on ? 'is-on' : ''}">
        <button class="day-art" type="button" data-dish="${d.id}" aria-label="${t('details')} : The ${d.name}">${posterSVG(d)}</button>
        <div class="day-body">
          <p class="day-date">${fmtDay(day.date)} ${badge}</p>
          <h3>The ${d.name}</h3>
          <p class="day-desc">${d[lang]}</p>
          <p class="day-meta"><span class="pill">${t(d.type)}</span> ${nums(d)}</p>
          <p class="day-all">${t('allergens')} : ${allergenText(d)}</p>
          <div class="day-buy">
            ${can ? `<p class="day-price"><b>${money(single(day))}</b><small>${t('from2', { p: money(PRICES.multi) })}</small></p>
            <button type="button" class="btn ${on ? 'btn-teal' : 'btn-ink'} add" data-add="${day.key}" aria-pressed="${on}">${on ? t('added') : t('add')}</button>` : `<button type="button" class="btn btn-ghost" data-dish="${d.id}">${t('details')}</button>`}
          </div>
        </div>
      </article>`;
    }).join('');
  }

  function renderCountdown() {
    const el = $('#countdown');
    const now = luNow();
    const todayDay = dayByKey(iso(now));
    const next = cal.weeks.flat().find(d => d.state === 'ahead');
    if (cal.weekend || !todayDay) { el.innerHTML = t('cd.weekend', { d: next.dish.name }); return; }
    if (todayDay.state === 'today') {
      const mins = CUTOFF_HOUR * 60 - (now.getHours() * 60 + now.getMinutes());
      const h = Math.floor(mins / 60), m = mins % 60;
      el.innerHTML = t('cd.open', { t: (h ? h + ' h ' : '') + String(m).padStart(h ? 2 : 1, '0') + (h ? '' : ' min') });
    } else {
      const isFri = now.getDay() === 5;
      el.innerHTML = isFri ? t('cd.weekend', { d: next.dish.name }) : t('cd.closed', { d: next.dish.name });
    }
  }

  /* ---- Repertoire ---- */
  function renderRep() {
    const f = [['all', t('all')], ['fork', t('fork')], ['spoon', t('spoon')], ...Object.keys(REGIONS).map(r => [r, REGIONS[r][lang]])];
    $('#repFilters').innerHTML = f.map(([k, l]) => `<button type="button" class="chip" aria-pressed="${repFilter === k}" data-filter="${k}">${l}</button>`).join('');
    const list = DISHES.filter(d => repFilter === 'all' || d.type === repFilter || d.region === repFilter);
    $('#repGrid').innerHTML = list.map(d => `<button type="button" class="rep-card" data-dish="${d.id}">${posterSVG(d)}<span>${d[lang]}</span></button>`).join('');
  }

  /* ---- Basket bar ---- */
  function renderBar() {
    const { n, total, save } = totals();
    $('#cartCount').textContent = n;
    $('#bar').hidden = n === 0;
    document.body.classList.toggle('has-bar', n > 0);
    if (!n) return;
    $('#barTotal').textContent = n === 1 ? t('bar.one', { t: money(total) }) : t('bar.n', { n, t: money(total) });
    $('#barNudge').textContent = n === 1 ? t('bar.nudge', { p: money(PRICES.multi) }) : t('bar.save', { s: money(save) });
  }

  /* ---- Dish sheet ---- */
  function openDish(id) {
    const d = dish(id);
    const box = (v, l) => `<li><b>${v}</b><span>${l}</span></li>`;
    $('#dishDlgBody').innerHTML = `<button class="x" type="button" data-close aria-label="${t('cart.close')}">×</button>
      <div class="dish-sheet">
        <div class="dish-sheet-art">${posterSVG(d)}</div>
        <div>
          <h2 id="dishDlgT">The ${d.name}</h2>
          <p>${d[lang]}</p>
          <ul class="boxes">
            ${box(d.p ? d.p + ' g' : '<span class="ph">' + t('tbc') + '</span>', t('prot.l'))}
            ${box(d.f ? d.f + ' g' : '<span class="ph">' + t('tbc') + '</span>', t('fib.l'))}
            ${box(d.kcal ? d.kcal + ' kcal' : '<span class="ph">' + t('tbc') + '</span>', t('kcal.l'))}
            ${box(t(d.type), t('type.l'))}
          </ul>
          <p><b>${t('allergens')} :</b> ${allergenText(d)}</p>
          <p>${t('dlg.pots')}</p>
          <p class="fine">${t('dlg.calc')}${PH[lang]}</p>
          <p class="fine">${REGIONS[d.region][lang]}</p>
        </div>
      </div>`;
    $('#dishDlg').showModal();
  }

  /* ---- Checkout (demo) ---- */
  function openCart(done) {
    const { days, n, each, total, save } = totals();
    const body = $('#cartDlgBody');
    const head = `<button class="x" type="button" data-close aria-label="${t('cart.close')}">×</button><h2 id="cartDlgT">${t('cart.h')}</h2>`;
    if (done) {
      body.innerHTML = `${head}<div class="done"><p class="script big">${t('cart.done.h', { n: done })}</p><p>${t('cart.done.p')}</p><button type="button" class="btn btn-ink" data-close>${t('cart.close')}</button></div>`;
    } else if (!n) {
      body.innerHTML = `${head}<p>${t('cart.empty')}</p>`;
    } else {
      const slots = cal.weeks.map(w => `<div class="slots">${w.map(d => `<span class="slot ${picked.includes(d.key) ? 'full' : ''} ${d.state === 'past' || d.state === 'closed' ? 'off' : ''}">${t('days')[(d.date.getDay() + 6) % 7]}<small>${d.date.getDate()}</small></span>`).join('')}</div>`).join('');
      body.innerHTML = `${head}
        <p class="lbl">${t('cart.slots')}</p>${slots}
        <ul class="lines">${days.map(d => `<li><div><b>The ${d.dish.name}</b><small>${fmtDay(d.date)}</small></div><span>${money(each(d))}</span><button type="button" class="rm" data-add="${d.key}" aria-label="${t('cart.remove')} The ${d.dish.name}">×</button></li>`).join('')}</ul>
        <p class="nudge">${n === 1 ? t('bar.nudge', { p: money(PRICES.multi) }) : t('bar.save', { s: money(save) })}</p>
        <form id="payForm" novalidate>
          <label><span>${t('cart.pick')} <span class="ph">${t('cart.pickph')}</span></span>
            <select name="pick" required><option value="">…</option>${PICKUPS.map(g => `<optgroup label="${g.g[lang]}">${g.items.map(i => `<option>${i}</option>`).join('')}</optgroup>`).join('')}</select></label>
          <label><span>${t('cart.name')}</span><input name="first" autocomplete="given-name" required maxlength="30"></label>
          <fieldset><legend>${t('cart.pay')}</legend>
            <label class="radio"><input type="radio" name="pay" value="card" checked> ${t('cart.card')}</label>
            <label class="radio"><input type="radio" name="pay" value="pluxee"> ${t('cart.pluxee')} ${PH[lang]}</label>
          </fieldset>
          <p class="total"><span>${t('cart.total')}</span><b>${money(total)}</b></p>
          <p class="form-msg" id="payMsg" role="alert"></p>
          <button class="btn btn-ink wide" type="submit">${t('cart.go', { t: money(total) })}</button>
          <p class="fine">${t('foot.demo')}</p>
        </form>`;
    }
    if (!$('#cartDlg').open) $('#cartDlg').showModal();
  }

  function toggle(key) {
    picked = picked.includes(key) ? picked.filter(k => k !== key) : [...picked, key];
    prune(); renderWeek(); renderBar();
    if ($('#cartDlg').open) openCart();
  }

  function renderAll() { applyCopy(); renderWeek(); renderCountdown(); renderRep(); renderBar(); }

  /* ---- Events ---- */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-lang],[data-tab],[data-add],[data-dish],[data-filter],[data-close],#cartBtn,#barBtn');
    if (!el) { if (e.target.tagName === 'DIALOG') e.target.close(); return; }
    if (el.dataset.lang) { lang = el.dataset.lang; store.set('plena.lang', lang); renderAll(); if ($('#cartDlg').open) openCart(); }
    else if (el.dataset.tab) { tab = +el.dataset.tab; renderWeek(); }
    else if (el.dataset.add) toggle(el.dataset.add);
    else if (el.dataset.dish) openDish(el.dataset.dish);
    else if (el.dataset.filter) { repFilter = el.dataset.filter; renderRep(); }
    else if ('close' in el.dataset) el.closest('dialog').close();
    else openCart();
  });

  document.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (f.id === 'payForm') {
      const name = f.first.value.trim();
      if (!f.pick.value || !name) { $('#payMsg').textContent = t('cart.err'); return; }
      picked = []; prune(); renderWeek(); renderBar(); openCart(name.replace(/[<>&"]/g, ''));
    } else if (f.id === 'officeForm') {
      const ok = f.company.value.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim());
      $('#officeMsg').textContent = t(ok ? 'off.ok' : 'off.err');
      if (ok) f.reset();
    }
  });

  prune();
  renderAll();
  setInterval(() => {
    const before = JSON.stringify(cal.weeks.flat().map(d => d.state));
    cal = calendar();
    if (JSON.stringify(cal.weeks.flat().map(d => d.state)) !== before) { prune(); renderWeek(); renderBar(); }
    renderCountdown();
  }, 30000);
})();
