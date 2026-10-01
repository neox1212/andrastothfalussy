/* HK award paragraph 104. Draft ACT/365 simple-interest convention.
   Currency costs remain separate. UK: signed final judgment paragraphs 2–4;
   four-day late-entry adjustment is an explicit draft interpretation. */
(function () {
  const tranches = [[39332.34,'2022-01-31'],[51577.55,'2022-02-06'],[85562.40,'2022-02-20'],[34156.35,'2022-02-26'],[44047.34,'2022-03-13'],[46997.93,'2022-03-26']];
  const day = 86400000;
  function calculate(value) {
    const stamp = typeof value === 'number' ? value : Date.parse(value + 'T00:00:00Z');
    if (!Number.isFinite(stamp) || stamp < Date.parse('2026-08-04T00:00:00Z') || stamp >= Date.parse('2027-01-01T00:00:00Z')) return null;
    const d = new Date(stamp);
    const months = Math.max(0, (d.getUTCFullYear()-2024)*12 + d.getUTCMonth()-6 + (d.getUTCDate() >= 10 ? 1 : 0));
    const interest = tranches.reduce((sum,[principal,start]) => sum + principal*.12*((stamp-Date.parse(start+'T00:00:00Z'))/day)/365, 0);
    const hk = Math.round((301673.91+23850+interest)*100)/100;
    const ukBase = 1248420.28 + 4*264.99;
    const ukDays = (stamp-Date.parse('2026-08-04T00:00:00Z'))/day;
    const uk = Math.round((ukBase + ukBase*.0806*ukDays/365)*100)/100;
    // Accrual display: overdue instalments plus a prorated current period.
    // The period changes on the 10th; the cumulative balance never resets.
    const periodMonth = d.getUTCMonth() - (d.getUTCDate() < 10 ? 1 : 0);
    const periodStart = Date.UTC(d.getUTCFullYear(),periodMonth,10);
    const periodEnd = Date.UTC(d.getUTCFullYear(),periodMonth+1,10);
    const fraction = (stamp-periodStart)/(periodEnd-periodStart);
    const hermelindisInterest = Math.round((months+fraction)*16000*100)/100;
    const hermelindis = 800000+hermelindisInterest;
    return {hk, uk, interest, hermelindis, hermelindisInterest, hermelindisDaily:16000*day/(periodEnd-periodStart), months, combined:Math.round((hk+uk+hermelindis)*100)/100};
  }
  if (typeof module !== 'undefined') module.exports = {calculate};
  if (typeof document === 'undefined') return;
  const button = document.getElementById('counter-toggle');
  const status = document.getElementById('counter-live-status');
  const timestamp = document.getElementById('counter-time');
  const currency = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2});
  let paused = false;
  function put(id, value) {
    const element = document.getElementById(id);
    if (element.textContent !== value) element.textContent = value;
  }
  function render() {
    if (paused) return;
    const now = Date.now();
    const v = calculate(now);
    if (!v) {
      status.textContent = 'Interest rate update required';
      ['hk-balance','uk-balance','hermelindis-balance','combined-balance'].forEach(id => put(id,'—'));
      timestamp.textContent = 'Calculation available for August–December 2026.';
      return;
    }
    status.textContent = 'Live · USD';
    put('hk-balance',currency.format(v.hk));
    put('uk-balance',currency.format(v.uk));
    put('hermelindis-balance',currency.format(v.hermelindis));
    put('hermelindis-interest',currency.format(v.hermelindisInterest));
    put('hermelindis-daily',currency.format(v.hermelindisDaily));
    put('combined-balance',currency.format(v.combined));
    timestamp.textContent = new Date(now).toISOString().slice(0,19).replace('T',' ')+' UTC';
  }
  button.addEventListener('click',function () {
    paused = !paused;
    button.textContent = paused ? 'Resume live' : 'Pause';
    button.setAttribute('aria-pressed',String(paused));
    status.textContent = paused ? 'Paused · USD' : 'Live · USD';
    render();
  });
  document.addEventListener('visibilitychange',function () { if (!document.hidden) render(); });
  render();
  setInterval(render,250);
})();
