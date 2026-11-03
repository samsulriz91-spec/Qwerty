const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'..','index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'unique element IDs');
const all=[];
function element(id='') {const classes=new Set();const el={id,textContent:'',innerHTML:'',value:'',style:{},attributes:{},children:[],events:{},clientWidth:320,clientHeight:200,classList:{toggle(n,on){on?classes.add(n):classes.delete(n)},contains:n=>classes.has(n)},setAttribute(n,v){this.attributes[n]=String(v)},getAttribute(n){return this.attributes[n]},replaceChildren(){this.children=[]},append(el){this.children.push(el)},addEventListener(n,fn){this.events[n]=fn},querySelectorAll(){return this.children}};all.push(el);return el;}
function create(iso){
 const elements=Object.fromEntries(ids.map(id=>[id,element(id)]));elements.period.value='month';elements.quota.children=[element(),element(),element()];
 const nav=element();nav.dataset={page:'Trade baru'};const home=element();let message;
 const RealDate=Date;class FrozenDate extends RealDate{constructor(...args){super(...(args.length?args:[iso]))}static now(){return new RealDate(iso).getTime()}}
 const context={console,Intl,Date:FrozenDate,setTimeout:()=>1,clearTimeout:()=>{},document:{getElementById:id=>{assert(elements[id],id);return elements[id]},createElement:()=>element(),querySelectorAll:selector=>selector==='[data-page]'?[nav]:selector==='[data-home]'?[home]:[]},window:{matchMedia:()=>({matches:true}),scrollTo:value=>{message=value}}};
 vm.createContext(context);vm.runInContext(script,context);
 return{elements,context,nav,home,run:code=>vm.runInContext(code,context)};
}
const p=create('2026-11-04T05:00:00Z'),e=p.elements;
assert.equal(e.balance.textContent,'2,952.70');assert.equal(e.dailyCount.textContent,3);
assert.equal(e.netPnl.textContent,'+341.70');assert.equal(e.winRate.textContent,'75.0%');assert.equal(e.ideaCount.textContent,4);assert.equal(e.targetPercent.textContent,'68.3%');
assert.match(e.chartDescription.textContent,/2,611.00 USC/);
const monthPath=e.linePath.attributes.d;
e.period.value='week';e.period.events.change();assert.equal(e.netPnl.textContent,'+520.70');assert.equal(e.ideaCount.textContent,6);assert.notEqual(e.linePath.attributes.d,monthPath);
e.period.value='all';e.period.events.change();assert.equal(e.netPnl.textContent,'+478.70');assert.equal(e.winRate.textContent,'71.4%');assert.equal(e.ideaCount.textContent,7);assert.equal(e.profitFactor.textContent,'7.53');
assert.equal(e.balance.textContent,'2,952.70');assert.equal(e.targetPercent.textContent,'68.3%');assert.equal(e.trades.children.length,3);
p.nav.events.click();assert.match(e.toast.textContent,/Trade baru belum dibuat/);
assert.equal(p.run('stats([]).winRate'),null);assert.equal(p.run('stats([]).profitFactor'),'—');assert.equal(p.run('stats([{pnl:5}]).profitFactor'),'∞');assert.equal(p.run('stats([{pnl:10},{pnl:0},{pnl:-5}]).profitFactor'),'2.00');assert.equal(p.run('stats([{pnl:10},{pnl:0},{pnl:-5}]).breakeven'),1);
for(const width of [240,320,360,393,768,1050]){e.balanceChart.clientWidth=width;p.run('renderPeriod()');assert.doesNotMatch(e.linePath.attributes.d,/NaN|Infinity/);assert.equal(e.balanceChart.attributes.viewBox,`0 0 ${width} 200`)}
p.run('renderChart({opening:100,ideas:[],start:today})');assert.doesNotMatch(e.linePath.attributes.d,/NaN|Infinity/);
p.run('demo.ideas.splice(0);renderAccount();renderPeriod()');assert.equal(e.winRate.textContent,'—');assert.equal(e.ideaCount.textContent,0);assert.equal(e.dailyCount.textContent,0);assert.equal(e.balance.textContent,'2,474.00');assert.doesNotMatch(e.linePath.attributes.d,/NaN|Infinity/);assert.equal(e.trades.children[0].textContent,'Belum ada trade closed pada periode ini.');
for(const iso of ['2026-11-03T18:00:00Z','2026-12-31T18:00:00Z','2028-02-28T18:00:00Z']){const q=create(iso);assert.equal(q.elements.dailyCount.textContent,3);assert.equal(q.elements.balance.textContent,'2,952.70');assert.doesNotMatch(q.elements.linePath.attributes.d,/NaN|Infinity/);}
assert.match(create('2026-11-03T18:00:00Z').elements.todayLabel.textContent,/4 November 2026/);
const refs=[...html.matchAll(/<use href="#([^"]+)"/g)].map(m=>m[1]);for(const id of refs)assert(ids.includes(id));
console.log('PASS: actual inline JavaScript executed in a DOM stub; account and period totals; carried opening balance; filter events; empty, BE and no-loss cases; finite chart coordinates at six sizes; navigation feedback; Jakarta midnight/year/leap-day dates; unique IDs and icon references.');
console.log('Not tested: actual browser rendering, CSS layout, screenshots, touch/keyboard behavior.');
