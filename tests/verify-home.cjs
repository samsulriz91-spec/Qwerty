'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(process.argv[2]||require('node:path').join(__dirname,'..','index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'unique IDs');
// Track actual static ancestor relationships: textContent destroys descendant IDs.
// This catches the Win-rate parent/child regression that an independent-ID stub missed.
const descendants=Object.fromEntries(ids.map(id=>[id,[]])),stack=[];
const voidTags=new Set(['meta','link','input','br','hr','img','source','area','base','wbr']);
for(const match of html.split('<script>')[0].matchAll(/<\/?([a-zA-Z][\w:-]*)\b([^>]*)>/g)){
 const token=match[0],tag=match[1].toLowerCase();
 if(token.startsWith('</')){const index=stack.map(item=>item.tag).lastIndexOf(tag);if(index>=0)stack.splice(index);continue}
 const id=match[2].match(/\bid="([^"]+)"/)?.[1];
 if(id)for(const parent of stack)if(parent.id)descendants[parent.id].push(id);
 if(!token.endsWith('/>')&&!voidTags.has(tag))stack.push({tag,id});
}
function element(id='',onText=()=>{}){
 const classes=new Set();
 return{id,_text:'',get textContent(){return this._text},set textContent(value){this._text=value;this.children=[];onText()},innerHTML:'',value:'',style:{},attributes:{},children:[],events:{},clientWidth:320,clientHeight:218,hidden:false,open:false,
 classList:{toggle(name,on){on?classes.add(name):classes.delete(name)},contains:name=>classes.has(name)},
 setAttribute(name,value){this.attributes[name]=String(value)},getAttribute(name){return this.attributes[name]},replaceChildren(...children){this.children=[...children]},append(...children){this.children.push(...children)},addEventListener(name,fn){this.events[name]=fn},querySelectorAll(){return this.children},querySelector(){return this._button||(this._button=element())},removeAttribute(name){delete this.attributes[name]},showModal(){this.open=true},close(){this.open=false},getBoundingClientRect(){return{left:0,top:0,width:this.clientWidth,height:this.clientHeight}},focus(){},click(){},remove(){}};
}
function create(iso){
 const removed=new Set();
 const elements=Object.fromEntries(ids.map(id=>[id,element(id,()=>descendants[id].forEach(child=>removed.add(child)))]));elements.period.value='month';elements.quota.children=[element(),element(),element()];
 const nav=element();nav.dataset={page:'Trade baru'};const home=element();
 const legend=['win','loss','be'].map(outcome=>{const el=element();el.dataset={outcome};return el});
 const chips=['week','month','all'].map(period=>{const el=element();el.dataset={period};return el});
 const RealDate=Date;class FrozenDate extends RealDate{constructor(...args){super(...(args.length?args:[iso]))}static now(){return new RealDate(iso).getTime()}}
 const context={console,Intl,Date:FrozenDate,setTimeout:()=>1,clearTimeout(){},document:{body:element(),documentElement:element(),activeElement:null,getElementById:id=>removed.has(id)?null:elements[id]||null,createElement:()=>element(),querySelectorAll:selector=>selector==='[data-page]'?[nav]:selector==='[data-home]'?[home]:selector==='[data-outcome]'||selector==='.legend [data-outcome]'?legend:selector==='[data-period]'?chips:[]},window:{matchMedia:()=>({matches:true}),scrollTo(){}}};
 vm.createContext(context);vm.runInContext(script,context);
 return{elements,context,legend,chips,nav,removed,run:code=>vm.runInContext(code,context)};
}
const p=create('2026-11-04T05:00:00Z'),e=p.elements;
assert.equal(e.balance.textContent,'2,952.70');assert.equal(e.dailyCount.textContent,3);
assert.equal(e.netPnl.textContent,'+341.70');assert.equal(e.winRate.textContent,'75.0%');assert.equal(e.ideaCount.textContent,4);assert.equal(e.targetPercent.textContent,'68.3%');
assert.equal(e.legendWin.textContent,3);assert.equal(e.legendLoss.textContent,1);assert.equal(e.legendBe.textContent,0);assert.equal(e.donutRate.textContent,'75.0%');assert.equal(e.trades.children.length,4);
assert.match(e.chartDescription.textContent,/2,611.00 USC/);
const monthPath=e.linePath.attributes.d;
e.period.value='week';e.period.events.change();assert.equal(e.netPnl.textContent,'+520.70');assert.equal(e.ideaCount.textContent,6);assert.notEqual(e.linePath.attributes.d,monthPath);
e.period.value='all';e.period.events.change();assert.equal(e.netPnl.textContent,'+478.70');assert.equal(e.winRate.textContent,'71.4%');assert.equal(e.ideaCount.textContent,7);assert.equal(e.profitFactor.textContent,'7.53');assert.equal(e.trades.children.length,7);
assert.equal(e.balance.textContent,'2,952.70');assert.equal(e.targetPercent.textContent,'68.3%');
p.legend[1].events.click();assert.equal(e.outcomeFilter.value,'loss');assert.equal(e.trades.children.length,2);assert.equal(e.netPnl.textContent,'+478.70');assert.equal(e.donutRate.textContent,'71.4%');assert.equal(p.legend[1].attributes['aria-pressed'],'true');assert(e.arcWin.classList.contains('dim'));
const lossCsv=p.run('csvContent()');assert.equal(lossCsv.split('\r\n').length,3);assert.match(lossCsv,/DEMO/);
p.legend[1].events.click();assert.equal(e.outcomeFilter.value,'all');assert.equal(e.trades.children.length,7);
e.searchTrades.events.input({target:{value:'xauusd'}});assert.equal(e.trades.children.length,5);assert.equal(e.clearSearch.hidden,false);
e.outcomeFilter.events.change({target:{value:'win'}});assert.equal(e.trades.children.length,3);
e.sortPnl.events.click();assert.equal(p.run('filteredIdeas()[0].pnl'),144);assert.equal(e.pnlHeader.attributes['aria-sort'],'descending');
e.sortPnl.events.click();assert.equal(p.run('filteredIdeas()[0].pnl'),82.5);assert.equal(e.pnlHeader.attributes['aria-sort'],'ascending');
e.mobileSort.events.change({target:{value:'date-asc'}});assert.equal(e.dateHeader.attributes['aria-sort'],'ascending');assert.equal(e.mobileSort.value,'date-asc');
e.searchTrades.events.input({target:{value:'<img onerror=alert(1)>'}});assert.equal(e.exportCsv.disabled,true);assert.equal(e.trades.children.length,1);assert.match(e.trades.children[0].innerHTML,/Tidak ada trade/);assert.doesNotMatch(e.trades.children[0].innerHTML,/<img/);
e.resetFilters.events.click();assert.equal(e.trades.children.length,7);assert.equal(e.searchTrades.value,'');assert.equal(e.resetFilters.hidden,true);assert.equal(e.exportCsv.disabled,false);
e.balanceChart.events.focus();assert.equal(e.chartHighlight.attributes.visibility,'visible');assert.equal(e.chartTooltip.hidden,false);assert.match(e.chartTooltip.children[1].textContent,/2,952.70/);
e.balanceChart.events.keydown({key:'Home',preventDefault(){}});assert.equal(e.balanceChart.attributes['aria-valuenow'],'0');assert.match(e.chartTooltip.children[0].textContent,/Saldo pembuka/);
e.balanceChart.events.keydown({key:'ArrowRight',preventDefault(){}});assert.equal(e.balanceChart.attributes['aria-valuenow'],'1');
e.balanceChart.events.keydown({key:'End',preventDefault(){}});assert.equal(e.balanceChart.attributes['aria-valuenow'],'7');
e.balanceChart.events.keydown({key:'Escape',preventDefault(){}});assert.equal(e.chartTooltip.hidden,true);assert.equal(e.chartHighlight.attributes.visibility,'hidden');
e.balanceChart.events.pointermove({clientX:-100});assert.equal(e.balanceChart.attributes['aria-valuenow'],'0');
e.balanceChart.events.pointermove({clientX:9000});assert.equal(e.balanceChart.attributes['aria-valuenow'],'7');
p.nav.events.click();assert.match(e.snackMessage.textContent,/Trade baru belum dibuat/);
assert.equal(p.run('stats([]).winRate'),null);assert.equal(p.run('stats([]).profitFactor'),'—');assert.equal(p.run('stats([{pnl:5}]).profitFactor'),'∞');assert.equal(p.run('stats([{pnl:10},{pnl:0},{pnl:-5}]).profitFactor'),'2.00');
for(const width of [220,320,360,393,768,1050]){e.balanceChart.clientWidth=width;p.run('renderPeriod(false)');assert.doesNotMatch(e.linePath.attributes.d,/NaN|Infinity/);assert.equal(e.balanceChart.attributes.viewBox,`0 0 ${width} 218`)}
p.run("demo.ideas.push({id:'BE',date:today,time:'22:00',symbol:'XAUUSD',side:'Buy',pnl:0});renderPeriod(false);selectOutcome('be')");assert.equal(e.legendBe.textContent,1);assert.equal(e.trades.children.length,1);assert.equal(e.winRate.textContent,'62.5%');assert.match(e.trades.children[0].innerHTML,/>BE</);
p.run('demo.ideas.splice(0);resetFilters();renderAccount();renderPeriod(false)');assert.equal(e.winRate.textContent,'—');assert.equal(e.ideaCount.textContent,0);assert.equal(e.dailyCount.textContent,0);assert.equal(e.balance.textContent,'2,474.00');assert.doesNotMatch(e.linePath.attributes.d,/NaN|Infinity/);assert.equal(e.donutRate.textContent,'—');assert.equal(e.arcWin.attributes['stroke-dasharray'],'0 100');assert.equal(e.exportCsv.disabled,true);
for(const iso of ['2026-11-03T18:00:00Z','2026-12-31T18:00:00Z','2028-02-28T18:00:00Z']){const q=create(iso);assert.equal(q.elements.dailyCount.textContent,3);assert.equal(q.elements.balance.textContent,'2,952.70');assert.doesNotMatch(q.elements.linePath.attributes.d,/NaN|Infinity/)}
assert.match(create('2026-11-03T18:00:00Z').elements.todayLabel.textContent,/4 November 2026/);
const controls=create('2026-11-04T05:00:00Z'),ce=controls.elements;
assert.equal(ce.topBalance.textContent,'2,952.70');assert.equal(ce.topDailyPnl.textContent,'+217.70 USC');assert.equal(ce.topTotalIdeas.textContent,'7 ide closed');
controls.chips[2].events.click();assert.equal(ce.period.value,'all');assert.equal(ce.ideaCount.textContent,7);assert.equal(controls.chips[2].attributes['aria-pressed'],'true');
ce.accountDetails.events.click();assert.equal(ce.detailsSheet.open,true);assert.equal(ce.sheetTitle.textContent,'Personal Cent');
ce.closeSheet.events.click();assert.equal(ce.detailsSheet.open,false);
controls.run('openTradeDetails(demo.ideas[0])');assert.match(ce.sheetTitle.textContent,/XAUUSD/);assert.equal(ce.detailsSheet.open,true);
ce.closeSheet.events.click();controls.run("openModal($('resetDialog'))");ce.cancelReset.events.click();assert.equal(ce.resetDialog.open,false);assert.equal(ce.period.value,'all');
controls.run("openModal($('resetDialog'))");ce.confirmReset.events.click();assert.equal(ce.resetDialog.open,false);assert.equal(ce.period.value,'month');assert.equal(ce.balance.textContent,'2,952.70');assert.match(ce.snackMessage.textContent,/Data demo tetap utuh/);
// Unsupported animation is optional and must not interrupt any data rendering.
controls.context.window.matchMedia=()=>({matches:false});const animationWarnings=[];controls.context.console={...console,warn:message=>animationWarnings.push(message)};controls.run('motionEnabled=true');
ce.arcWin.animate=()=>{throw Error('unsupported SVG animation')};ce.arcLoss.animate=()=>{throw Error('unsupported SVG animation')};ce.linePath.animate=()=>{throw Error('unsupported line animation')};ce.linePath.getTotalLength=()=>100;
controls.run('renderPeriod()');assert.equal(animationWarnings.length,3);assert.equal(ce.donutRate.textContent,'75.0%');assert.equal(ce.trades.children.length,4);assert.equal(ce.openingBalance.textContent,'2,611.00 USC');
ce.motionToggle.events.change({target:{checked:false}});assert.equal(ce.motionToggle.checked,false);assert.equal(ce.snackUndo.hidden,false);ce.snackUndo.events.click();assert.equal(ce.motionToggle.checked,true);
assert.equal(controls.removed.size,0,'updating metric values must preserve all descendant element IDs');
for(const match of html.matchAll(/<use href="#([^"]+)"/g))assert(ids.includes(match[1]));
console.log('PASS: actual inline JS in hierarchy-aware DOM stub; descendant-ID regression; account/period metrics; carried opening balance; donut segments and filters; search; sort; CSV content; pointer and keyboard chart events; empty/BE/no-loss states; finite chart sizes; Jakarta dates; IDs and icons.');
console.log('PASS: top summary, period chips, account/trade sheets, reset confirmation/cancel, motion switch and snackbar undo, unsupported-animation fallback.');
console.log('Not verified by this test: actual browser layout, CSS, screenshot, or physical device behavior.');
