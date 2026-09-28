const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{},console};vm.createContext(ctx);
for(const f of ['fixtures/data.js','js/core.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx);
const C=ctx.window.AGENTOS_CORE,F=ctx.window.AGENTOS_FIXTURE;
const say=(s,text)=>C.reduce(s,{type:'say',text});
function enable(s){s=C.reduce(s,'reviewPlan');s=C.reduce(s,'approveProposal');assert.equal(s.setup,'build');s=C.reduce(s,'build');assert.equal(s.build,true);s=C.reduce(s,'test');assert.equal(s.tested,true);s=C.reduce(s,'activate');assert.equal(s.active,true);return s}
// A: inquiry-only is materially different from inventory.
let a=C.initial();a=say(a,'IG 和 LINE 訊息很多，常漏回覆，要整理訂單。');assert.equal(C.plan(a).inquiry,true);assert.equal(C.plan(a).inventory,false);a=enable(a);a=C.reduce(a,'startOperation');assert.equal(a.operation,'triage');assert.equal(C.reduce(a,'detectConflict').operation,'triage');
// B: inventory path surfaces a deterministic exception after triage.
let b=C.initial();b=say(b,'市集賣掉的商品沒有更新，線上庫存不同步。');assert.equal(C.plan(b).inquiry,false);assert.equal(C.plan(b).inventory,true);b=enable(b);b=C.reduce(b,'startOperation');b=C.reduce(b,'detectConflict');assert.equal(b.operation,'owner_pending');assert.equal(C.costs(b).simulatedOps,12);
// C: Owner control changes the plan and no automatic execution is implied.
let c=C.initial();c=say(c,'我只想整理 IG 訊息，所有對外訊息都要我確認，庫存我自己管。');let cp=C.plan(c);assert.equal(cp.inquiry,true);assert.equal(cp.inventory,false);assert.equal(cp.externalApproval,true);assert.equal(cp.manualInventory,true);
// D: unsupported free input creates no fabricated direction.
let d=C.initial();d=say(d,'請幫我預測下季廣告投資報酬率');assert.equal(C.plan(d).inquiry,false);assert.equal(C.plan(d).inventory,false);assert.equal(d.messages.at(-1).key,'unsupported');
// E: state gates.
let e=C.initial();assert.equal(C.reduce(e,'approveProposal').proposalApproved,false);e=say(e,'我想整理訂單');assert.equal(C.reduce(e,'build').build,false);e=C.reduce(e,'reviewPlan');e=C.reduce(e,'approveProposal');assert.equal(C.reduce(e,'activate').active,false);e=C.reduce(e,'build');assert.equal(C.reduce(e,'activate').active,false);
// F: owner approval is separate from execution and values stay fixture-grounded.
let f=C.initial();f=say(f,'市集與線上庫存不同步');f=enable(f);f=C.reduce(f,'startOperation');f=C.reduce(f,'detectConflict');f=C.reduce(f,'approveOperation');assert.equal(f.operation,'approved_pending');assert.equal(C.costs(f).contribution,1508);f=C.reduce(f,'executeOperation');assert.equal(f.operation,'executed');assert.equal(C.costs(f).pendingValue,1360);assert.equal(F.economics.realizedRevenue,2720);
// Localization state is data-safe; raw merchant text stays raw instead of being silently translated/deleted.
let g=C.initial('en');g=say(g,'Only IG messages please');assert.equal(g.lang,'en');assert.equal(g.messages.find(m=>m.role==='user').text,'Only IG messages please');assert.equal(C.i18n.welcome.en.includes('Hello'),true);
// Navigation is browseable before activation; only operations are gated.
let appSource=fs.readFileSync(path.join(__dirname,'..','js/app.js'),'utf8');
assert.equal(/x!=='onboard'&&!s\.active/.test(appSource),false);
assert.equal(/data-go="\$\{x\}" \$\{x!=='onboard'&&!s\.active\?'disabled':''\}/.test(appSource),false);
// Inventory-only begins at deterministic comparison, never runs inquiry triage or incurs triage cost.
let h=C.initial();h=say(h,'市集銷售與線上庫存不同步');h=enable(h);h=C.reduce(h,'startOperation');assert.equal(h.operation,'inventory_ready');assert.equal(C.costs(h).simulatedOps,0);h=C.reduce(h,'detectConflict');assert.equal(h.operation,'owner_pending');
// Revising an enabled plan invalidates prior approval, tests, activation, and operational state.
let j=C.initial();j=say(j,'IG 訂單整理和市集庫存都要處理，所有訊息需確認');j=enable(j);j=C.reduce(j,'startOperation');assert.equal(j.active,true);j=C.reduce(j,'editPlan');assert.equal(j.setup,'conversation');assert.equal(j.active,false);assert.equal(j.tested,false);assert.equal(j.operation,'idle');assert.equal(j.audit.at(-1).id,'AUD-ONB-07');
// Multi-intent input produces individual simulated acknowledgements rather than silently dropping a signal.
let k=C.initial();k=say(k,'IG 訂單很亂，市集庫存不同步，而且所有訊息要我確認');let keys=k.messages.filter(m=>m.role==='ai').map(m=>m.key);assert.equal(keys.includes('inquiry'),true);assert.equal(keys.includes('inventory'),true);assert.equal(keys.includes('control'),true);
// Static entrypoint protection: index has only local assets and app retains its render entrypoint.
let html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8'),app=fs.readFileSync(path.join(__dirname,'..','js/app.js'),'utf8');
assert.match(html,/css\/vnext\.css/);assert.match(html,/js\/app\.js/);assert.match(app,/function render\(\)/);assert.equal(/https?:\/\//.test(html),false);
// v3 presentation contract: one interactive retail desk plus future-only translation and creative designs.
assert.match(app,/GUIDED BUSINESS DISCOVERY/);assert.match(app,/Retail Order Desk/);assert.match(app,/Translation Delivery Desk/);assert.match(app,/Creative Project Desk/);assert.match(app,/My AI Team/);assert.match(app,/Owner Inbox/);assert.match(app,/Business Pulse/);
console.log('PASS: Retail Order Desk state-machine and navigation checks (paths, preview navigation, gating, reconfiguration, operational boundary, bilingual raw input, future-desk presentation).');
