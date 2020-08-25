(function($){$.support.touch='ontouchend'in document;if(!$.support.touch){return;}
var mouseProto=$.ui.mouse.prototype,_mouseInit=mouseProto._mouseInit,_mouseDestroy=mouseProto._mouseDestroy,touchHandled;function simulateMouseEvent(event,simulatedType){if(event.originalEvent.touches.length>1){return;}
event.preventDefault();var touch=event.originalEvent.changedTouches[0],simulatedEvent=document.createEvent('MouseEvents');simulatedEvent.initMouseEvent(simulatedType,true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);event.target.dispatchEvent(simulatedEvent);}
mouseProto._touchStart=function(event){var self=this;if(touchHandled||!self._mouseCapture(event.originalEvent.changedTouches[0])){return;}
touchHandled=true;self._touchMoved=0;simulateMouseEvent(event,'mouseover');simulateMouseEvent(event,'mousemove');simulateMouseEvent(event,'mousedown');};mouseProto._touchMove=function(event){if(!touchHandled){return;}
this._touchMoved+=1;simulateMouseEvent(event,'mousemove');};mouseProto._touchEnd=function(event){if(!touchHandled){return;}
simulateMouseEvent(event,'mouseup');simulateMouseEvent(event,'mouseout');if(!this._touchMoved||this._touchMoved<=5){simulateMouseEvent(event,'click');}
touchHandled=false;};mouseProto._mouseInit=function(){var self=this;self.element.bind({touchstart:$.proxy(self,'_touchStart'),touchmove:$.proxy(self,'_touchMove'),touchend:$.proxy(self,'_touchEnd')});_mouseInit.call(self);};mouseProto._mouseDestroy=function(){var self=this;self.element.unbind({touchstart:$.proxy(self,'_touchStart'),touchmove:$.proxy(self,'_touchMove'),touchend:$.proxy(self,'_touchEnd')});_mouseDestroy.call(self);};})(jQuery);(function($){$.addFlex=function(t,p)
{if(t.grid)return false;p=$.extend({height:200,width:'auto',striped:true,novstripe:false,minwidth:30,minheight:80,resizable:true,url:false,method:'POST',dataType:'xml',errormsg:'Connection Error',usepager:false,nowrap:true,page:1,total:1,useRp:true,rp:15,rpOptions:[10,15,20,25,40],title:false,pagestat:'Displaying {from} to {to} of {total} items',procmsg:'Processing, please wait ...',query:'',qtype:'',nomsg:'No items',minColToggle:1,showToggleBtn:true,hideOnSubmit:true,autoload:true,blockOpacity:0.5,onToggleCol:false,onChangeSort:false,onSuccess:false,onSubmit:false},p);$(t).show().attr({cellPadding:0,cellSpacing:0,border:0}).removeAttr('width');var g={hset:{},rePosDrag:function(){var cdleft=0-this.hDiv.scrollLeft;if(this.hDiv.scrollLeft>0)cdleft-=Math.floor(p.cgwidth/2);$(g.cDrag).css({top:g.hDiv.offsetTop+1});var cdpad=this.cdpad;$('div',g.cDrag).hide();$('thead tr:first th:visible',this.hDiv).each
(function()
{var n=$('thead tr:first th:visible',g.hDiv).index(this);var cdpos=parseInt($('div',this).width());var ppos=cdpos;if(cdleft==0)
cdleft-=Math.floor(p.cgwidth/2);cdpos=cdpos+cdleft+cdpad+2;$('div:eq('+n+')',g.cDrag).css({'left':cdpos+'px'}).show();cdleft=cdpos;});},fixHeight:function(newH){newH=false;if(!newH)newH=$(g.bDiv).height();var hdHeight=$(this.hDiv).height();$('div',this.cDrag).each(function()
{$(this).height(newH+hdHeight);});var nd=parseInt($(g.nDiv).height());if(nd>newH)
$(g.nDiv).height(newH).width(200);else
$(g.nDiv).height('auto').width('auto');$(g.block).css({height:newH,marginBottom:(newH*-1)});var hrH=g.bDiv.offsetTop+newH;if(p.height!='auto'&&p.resizable)hrH=g.vDiv.offsetTop;$(g.rDiv).css({height:hrH});},dragStart:function(dragtype,e,obj){if(dragtype=='colresize')
{$(g.nDiv).hide();$(g.nBtn).hide();var n=$('div',this.cDrag).index(obj);var ow=$('th:visible div:eq('+n+')',this.hDiv).width();$(obj).addClass('dragging').siblings().hide();$(obj).prev().addClass('dragging').show();this.colresize={startX:e.pageX,ol:parseInt(obj.style.left),ow:ow,n:n};$('body').css('cursor','col-resize');}
else if(dragtype=='vresize')
{var hgo=false;$('body').css('cursor','row-resize');if(obj)
{hgo=true;$('body').css('cursor','col-resize');}
this.vresize={h:p.height,sy:e.pageY,w:p.width,sx:e.pageX,hgo:hgo};}
else if(dragtype=='colMove')
{$(g.nDiv).hide();$(g.nBtn).hide();this.hset=$(this.hDiv).offset();this.hset.right=this.hset.left+$('table',this.hDiv).width();this.hset.bottom=this.hset.top+$('table',this.hDiv).height();this.dcol=obj;this.dcoln=$('th',this.hDiv).index(obj);this.colCopy=document.createElement("div");this.colCopy.className="colCopy";this.colCopy.innerHTML=obj.innerHTML;if($.browser.msie)
{this.colCopy.className="colCopy ie";}
$(this.colCopy).css({position:'absolute',float:'left',display:'none',textAlign:obj.align});$('body').append(this.colCopy);$(this.cDrag).hide();}
$('body').noSelect();},dragMove:function(e){if(this.colresize)
{var n=this.colresize.n;var diff=e.pageX-this.colresize.startX;var nleft=this.colresize.ol+diff;var nw=this.colresize.ow+diff;if(nw>p.minwidth)
{$('div:eq('+n+')',this.cDrag).css('left',nleft);this.colresize.nw=nw;}}
else if(this.vresize)
{var v=this.vresize;var y=e.pageY;var diff=y-v.sy;if(!p.defwidth)p.defwidth=p.width;if(p.width!='auto'&&!p.nohresize&&v.hgo)
{var x=e.pageX;var xdiff=x-v.sx;var newW=v.w+xdiff;if(newW>p.defwidth)
{this.gDiv.style.width=newW+'px';p.width=newW;}}
var newH=v.h+diff;if((newH>p.minheight||p.height<p.minheight)&&!v.hgo)
{}
v=null;}
else if(this.colCopy){$(this.dcol).addClass('thMove').removeClass('thOver');if(e.pageX>this.hset.right||e.pageX<this.hset.left||e.pageY>this.hset.bottom||e.pageY<this.hset.top)
{$('body').css('cursor','move');}
else
$('body').css('cursor','pointer');$(this.colCopy).css({top:e.pageY+10,left:e.pageX+20,display:'block'});}},dragEnd:function(){if(this.colresize)
{var n=this.colresize.n;var nw=this.colresize.nw;$('th:visible div:eq('+n+')',this.hDiv).css('width',nw);$('tr',this.bDiv).each(function()
{$('td:visible div:eq('+n+')',this).css('width',nw);});this.hDiv.scrollLeft=this.bDiv.scrollLeft;$('div:eq('+n+')',this.cDrag).siblings().show();$('.dragging',this.cDrag).removeClass('dragging');this.rePosDrag();this.fixHeight();this.colresize=false;}
else if(this.vresize)
{this.vresize=false;}
else if(this.colCopy)
{$(this.colCopy).remove();if(this.dcolt!=null)
{if(this.dcoln>this.dcolt)
$('th:eq('+this.dcolt+')',this.hDiv).before(this.dcol);else
$('th:eq('+this.dcolt+')',this.hDiv).after(this.dcol);this.switchCol(this.dcoln,this.dcolt);$(this.cdropleft).remove();$(this.cdropright).remove();this.rePosDrag();}
this.dcol=null;this.hset=null;this.dcoln=null;this.dcolt=null;this.colCopy=null;$('.thMove',this.hDiv).removeClass('thMove');$(this.cDrag).show();}
$('body').css('cursor','default');$('body').noSelect(false);},toggleCol:function(cid,visible){var ncol=$("th[axis='col"+cid+"']",this.hDiv)[0];var n=$('thead th',g.hDiv).index(ncol);var cb=$('input[value='+cid+']',g.nDiv)[0];if(visible==null)
{visible=ncol.hide;}
if($('input:checked',g.nDiv).length<p.minColToggle&&!visible)return false;if(visible)
{ncol.hide=false;$(ncol).show();cb.checked=true;}
else
{ncol.hide=true;$(ncol).hide();cb.checked=false;}
$('tbody tr',t).each
(function()
{if(visible)
$('td:eq('+n+')',this).show();else
$('td:eq('+n+')',this).hide();});this.rePosDrag();if(p.onToggleCol)p.onToggleCol(cid,visible);return visible;},switchCol:function(cdrag,cdrop){$('tbody tr',t).each
(function()
{if(cdrag>cdrop)
$('td:eq('+cdrop+')',this).before($('td:eq('+cdrag+')',this));else
$('td:eq('+cdrop+')',this).after($('td:eq('+cdrag+')',this));});if(cdrag>cdrop)
$('tr:eq('+cdrop+')',this.nDiv).before($('tr:eq('+cdrag+')',this.nDiv));else
$('tr:eq('+cdrop+')',this.nDiv).after($('tr:eq('+cdrag+')',this.nDiv));if($.browser.msie&&$.browser.version<7.0)$('tr:eq('+cdrop+') input',this.nDiv)[0].checked=true;this.hDiv.scrollLeft=this.bDiv.scrollLeft;},scroll:function(){this.hDiv.scrollLeft=this.bDiv.scrollLeft;this.rePosDrag();},addData:function(data){if(p.preProcess)
data=p.preProcess(data);$('.pReload',this.pDiv).removeClass('loading');this.loading=false;if(!data)
{$('.pPageStat',this.pDiv).html(p.errormsg);return false;}
if(p.dataType=='xml')
p.total=+$('rows total',data).text();else
p.total=data.total;if(p.total==0)
{$('tr, a, td, div',t).unbind();$(t).empty();p.pages=1;p.page=1;this.buildpager();$('.pPageStat',this.pDiv).html(p.nomsg);$('.gBlock').html('<div style="padding-top: 2em;text-align: center;font-size: 400%; color:silver"><b>'+p.nomsg+'</b></div>');return false;}
p.pages=Math.ceil(p.total/p.rp);if(p.dataType=='xml')
p.page=+$('rows page',data).text();else
p.page=data.page;this.buildpager();var tbody=document.createElement('tbody');if(p.dataType=='json')
{$.each
(data.rows,function(i,row)
{var tr=document.createElement('tr');if(i%2&&p.striped)tr.className='erow';if(row.id)tr.id='row'+row.id;$('thead tr:first th',g.hDiv).each
(function()
{var td=document.createElement('td');var idx=$(this).attr('axis').substr(3);td.align=this.align;if(undefined!=row.cell[idx]){td.innerHTML=row.cell[idx];}else{td.innerHTML='';}
$(tr).append(td);td=null;});if($('thead',this.gDiv).length<1)
{for(idx=0;idx<cell.length;idx++)
{var td=document.createElement('td');if(undefined!=row.cell[idx]){td.innerHTML=row.cell[idx];}else{td.innerHTML='';}
$(tr).append(td);td=null;}}
$(tbody).append(tr);tr=null;});}else if(p.dataType=='xml'){i=1;$("rows row",data).each
(function()
{i++;var tr=document.createElement('tr');if(i%2&&p.striped)tr.className='erow';var nid=$(this).attr('id');if(nid)tr.id='row'+nid;nid=null;var robj=this;$('thead tr:first th',g.hDiv).each
(function()
{var td=document.createElement('td');var idx=$(this).attr('axis').substr(3);td.align=this.align;td.innerHTML=$("cell:eq("+idx+")",robj).text();$(tr).append(td);td=null;});if($('thead',this.gDiv).length<1)
{$('cell',this).each
(function()
{var td=document.createElement('td');td.innerHTML=$(this).text();$(tr).append(td);td=null;});}
$(tbody).append(tr);tr=null;robj=null;});}
$('tr',t).unbind();$(t).empty();$(t).append(tbody);this.addCellProp();this.addRowProp();this.rePosDrag();tbody=null;data=null;i=null;if(p.onSuccess)p.onSuccess();if(p.hideOnSubmit)$(g.block).remove();this.hDiv.scrollLeft=this.bDiv.scrollLeft;if($.browser.opera)$(t).css('visibility','visible');},changeSort:function(th){if(this.loading)return true;$(g.nDiv).hide();$(g.nBtn).hide();if(p.sortname==$(th).attr('abbr'))
{if(p.sortorder=='asc')p.sortorder='desc';else p.sortorder='asc';}
$(th).addClass('sorted').siblings().removeClass('sorted');$('.sdesc',this.hDiv).removeClass('sdesc');$('.sasc',this.hDiv).removeClass('sasc');$('div',th).addClass('s'+p.sortorder);p.sortname=$(th).attr('abbr');if(p.onChangeSort)
p.onChangeSort(p.sortname,p.sortorder);else
this.populate();},buildpager:function(){$('.pcontrol input',this.pDiv).val(p.page);$('.pcontrol span',this.pDiv).html(p.pages);var r1=(p.page-1)*p.rp+1;var r2=r1+p.rp-1;if(p.total<r2)r2=p.total;var stat=p.pagestat;stat=stat.replace(/{from}/,r1);stat=stat.replace(/{to}/,r2);stat=stat.replace(/{total}/,p.total);$('.pPageStat',this.pDiv).html(stat);},populate:function(){if(this.loading)return true;if(p.onSubmit)
{var gh=p.onSubmit();if(!gh)return false;}
this.loading=true;if(!p.url)return false;$('.pPageStat',this.pDiv).html(p.procmsg);$('.pReload',this.pDiv).addClass('loading');$(g.block).css({top:g.bDiv.offsetTop});if(p.hideOnSubmit)$(this.gDiv).prepend(g.block);if($.browser.opera)$(t).css('visibility','hidden');if(!p.newp)p.newp=1;if(p.page>p.pages)p.page=p.pages;var param=[{name:'page',value:p.newp},{name:'rp',value:p.rp},{name:'sortname',value:p.sortname},{name:'sortorder',value:p.sortorder},{name:'query',value:p.query},{name:'qtype',value:p.qtype}];param=[{name:'start',value:(p.newp-1)*p.rp},{name:'rows',value:p.rp},{name:'sort',value:p.sortname},{name:'desc',value:p.sortorder=='desc'},{name:p.qtype,value:p.query},{name:'flexrnd',value:new Date().valueOf().toString()}];if(p.params)
{for(var pi=0;pi<p.params.length;pi++)param[param.length]=p.params[pi];}
$.ajax({type:p.method,url:p.url,data:param,dataType:p.dataType,success:function(data){g.addData(data);},error:function(data){try{if(p.onError)p.onError(data);}catch(e){}}});},doSearch:function(){p.query=$('input[name=q]',g.sDiv).val();p.qtype=$('select[name=qtype]',g.sDiv).val();p.newp=1;this.populate();},changePage:function(ctype){if(this.loading)return true;switch(ctype)
{case'first':p.newp=1;break;case'prev':if(p.page>1)p.newp=parseInt(p.page)-1;break;case'next':if(p.page<p.pages)p.newp=parseInt(p.page)+1;break;case'last':p.newp=p.pages;break;case'input':var nv=parseInt($('.pcontrol input',this.pDiv).val());if(isNaN(nv))nv=1;if(nv<1)nv=1;else if(nv>p.pages)nv=p.pages;$('.pcontrol input',this.pDiv).val(nv);p.newp=nv;break;}
if(p.newp==p.page)return false;if(p.onChangePage)
p.onChangePage(p.newp);else
this.populate();},addCellProp:function()
{$('tbody tr td',g.bDiv).each
(function()
{var tdDiv=document.createElement('div');var n=$('td',$(this).parent()).index(this);if(n<0)n=0;var pth=$('th:eq('+n+')',g.hDiv).get(0);if(pth!=null)
{if(p.sortname==$(pth).attr('abbr')&&p.sortname)
{this.className='sorted';}
$(tdDiv).css({textAlign:pth.align,width:$('div:first',pth)[0].style.width});if(pth.hide)$(this).css('display','none');}
if(p.nowrap==false)$(tdDiv).css('white-space','normal');if(this.innerHTML=='')this.innerHTML='&nbsp;';tdDiv.innerHTML=this.innerHTML;var prnt=$(this).parent()[0];var pid=false;if(prnt.id)pid=prnt.id.substr(3);if(pth!=null)
{if(pth.process)pth.process(tdDiv,pid);}
$(this).empty().append(tdDiv).removeAttr('width');});},getCellDim:function(obj)
{var ht=parseInt($(obj).height());var pht=parseInt($(obj).parent().height());var wt=parseInt(obj.style.width);var pwt=parseInt($(obj).parent().width());var top=obj.offsetParent.offsetTop;var left=obj.offsetParent.offsetLeft;var pdl=parseInt($(obj).css('paddingLeft'));var pdt=parseInt($(obj).css('paddingTop'));return{ht:ht,wt:wt,top:top,left:left,pdl:pdl,pdt:pdt,pht:pht,pwt:pwt};},addRowProp:function()
{$('tbody tr',g.bDiv).each
(function()
{$(this).mousedown(function(e)
{if(e.shiftKey)
{$(this).toggleClass('trSelected');g.multisel=true;this.focus();$(g.gDiv).noSelect();}}).mouseup(function()
{if(g.multisel)
{g.multisel=false;$(g.gDiv).noSelect(false);}}).hover(function(e)
{if(g.multisel)
{$(this).toggleClass('trSelected');}},function(){});if($.browser.msie&&$.browser.version<7.0)
{$(this).hover(function(){$(this).addClass('trOver');},function(){$(this).removeClass('trOver');});}});},pager:0};if(p.colModel)
{thead=document.createElement('thead');tr=document.createElement('tr');for(i=0;i<p.colModel.length;i++)
{var cm=p.colModel[i];var th=document.createElement('th');th.innerHTML=cm.display;if(cm.name&&cm.sortable)
$(th).attr('abbr',cm.name);$(th).attr('axis','col'+i);if(cm.align)
th.align=cm.align;if(cm.width)
$(th).attr('width',cm.width);if(cm.hide)
{th.hide=true;}
if(cm.process)
{th.process=cm.process;}
$(tr).append(th);}
$(thead).append(tr);$(t).prepend(thead);}
g.gDiv=document.createElement('div');g.mDiv=document.createElement('div');g.hDiv=document.createElement('div');g.bDiv=document.createElement('div');g.vDiv=document.createElement('div');g.rDiv=document.createElement('div');g.cDrag=document.createElement('div');g.block=document.createElement('div');g.nDiv=document.createElement('div');g.nBtn=document.createElement('div');g.iDiv=document.createElement('div');g.tDiv=document.createElement('div');g.sDiv=document.createElement('div');if(p.usepager)g.pDiv=document.createElement('div');g.hTable=document.createElement('table');g.gDiv.className='flexigrid';if(p.width!='auto')g.gDiv.style.width=p.width;if($.browser.msie)
$(g.gDiv).addClass('ie');if(p.novstripe)
$(g.gDiv).addClass('novstripe');$(t).before(g.gDiv);$(g.gDiv).append(t);if(p.buttons)
{g.tDiv.className='tDiv';var tDiv2=document.createElement('div');tDiv2.className='tDiv2';for(i=0;i<p.buttons.length;i++)
{var btn=p.buttons[i];if(!btn.separator)
{var btnDiv=document.createElement('div');btnDiv.className='fbutton';btnDiv.innerHTML="<div><span>"+btn.name+"</span></div>";if(btn.bclass)
$('span',btnDiv).addClass(btn.bclass).css({paddingLeft:20});btnDiv.onpress=btn.onpress;btnDiv.name=btn.name;if(btn.onpress)
{$(btnDiv).click
(function()
{this.onpress(this.name,g.gDiv);});}
$(tDiv2).append(btnDiv);if($.browser.msie&&$.browser.version<7.0)
{$(btnDiv).hover(function(){$(this).addClass('fbOver');},function(){$(this).removeClass('fbOver');});}}else{$(tDiv2).append("<div class='btnseparator'></div>");}}
$(g.tDiv).append(tDiv2);$(g.tDiv).append("<div style='clear:both'></div>");$(g.gDiv).prepend(g.tDiv);}
g.hDiv.className='hDiv';$(t).before(g.hDiv);g.hTable.cellPadding=0;g.hTable.cellSpacing=0;$(g.hDiv).append('<div class="hDivBox"></div>');$('div',g.hDiv).append(g.hTable);var thead=$("thead:first",t).get(0);if(thead)$(g.hTable).append(thead);thead=null;if(!p.colmodel)var ci=0;$('thead tr:first th',g.hDiv).each
(function()
{var thdiv=document.createElement('div');if($(this).attr('abbr'))
{$(this).click(function(e)
{if(!$(this).hasClass('thOver'))return false;var obj=(e.target||e.srcElement);if(obj.href||obj.type)return true;g.changeSort(this);});if($(this).attr('abbr')==p.sortname)
{this.className='sorted';thdiv.className='s'+p.sortorder;}}
if(this.hide)$(this).hide();if(!p.colmodel)
{$(this).attr('axis','col'+ci++);}
$(thdiv).css({textAlign:this.align,width:this.width+'px'});thdiv.innerHTML=this.innerHTML;$(this).empty().append(thdiv).removeAttr('width').mousedown(function(e)
{g.dragStart('colMove',e,this);}).hover(function(){if(!g.colresize&&!$(this).hasClass('thMove')&&!g.colCopy)$(this).addClass('thOver');if($(this).attr('abbr')!=p.sortname&&!g.colCopy&&!g.colresize&&$(this).attr('abbr'))$('div',this).addClass('s'+p.sortorder);else if($(this).attr('abbr')==p.sortname&&!g.colCopy&&!g.colresize&&$(this).attr('abbr'))
{var no='';if(p.sortorder=='asc')no='desc';else no='asc';$('div',this).removeClass('s'+p.sortorder).addClass('s'+no);}
if(g.colCopy)
{var n=$('th',g.hDiv).index(this);if(n==g.dcoln)return false;if(n<g.dcoln)$(this).append(g.cdropleft);else $(this).append(g.cdropright);g.dcolt=n;}else if(!g.colresize){var nv=$('th:visible',g.hDiv).index(this);var onl=parseInt($('div:eq('+nv+')',g.cDrag).css('left'));var nw=parseInt($(g.nBtn).width())+parseInt($(g.nBtn).css('borderLeftWidth'));nl=onl-nw+Math.floor(p.cgwidth/2);$(g.nDiv).hide();$(g.nBtn).hide();$(g.nBtn).css({'left':nl,top:g.hDiv.offsetTop}).show();var ndw=parseInt($(g.nDiv).width());$(g.nDiv).css({top:g.bDiv.offsetTop});if((nl+ndw)>$(g.gDiv).width())
$(g.nDiv).css('left',onl-ndw+1);else
$(g.nDiv).css('left',nl);if($(this).hasClass('sorted'))
$(g.nBtn).addClass('srtd');else
$(g.nBtn).removeClass('srtd');}},function(){$(this).removeClass('thOver');if($(this).attr('abbr')!=p.sortname)$('div',this).removeClass('s'+p.sortorder);else if($(this).attr('abbr')==p.sortname)
{var no='';if(p.sortorder=='asc')no='desc';else no='asc';$('div',this).addClass('s'+p.sortorder).removeClass('s'+no);}
if(g.colCopy)
{$(g.cdropleft).remove();$(g.cdropright).remove();g.dcolt=null;}});});g.bDiv.className='bDiv';$(t).before(g.bDiv);$(g.bDiv).scroll(function(e){g.scroll()}).append(t);if(p.height=='auto')
{$('table',g.bDiv).addClass('autoht');}
g.addCellProp();g.addRowProp();var cdcol=$('thead tr:first th:first',g.hDiv).get(0);if(cdcol!=null)
{g.cDrag.className='cDrag';g.cdpad=0;g.cdpad+=(isNaN(parseInt($('div',cdcol).css('borderLeftWidth')))?0:parseInt($('div',cdcol).css('borderLeftWidth')));g.cdpad+=(isNaN(parseInt($('div',cdcol).css('borderRightWidth')))?0:parseInt($('div',cdcol).css('borderRightWidth')));g.cdpad+=(isNaN(parseInt($('div',cdcol).css('paddingLeft')))?0:parseInt($('div',cdcol).css('paddingLeft')));g.cdpad+=(isNaN(parseInt($('div',cdcol).css('paddingRight')))?0:parseInt($('div',cdcol).css('paddingRight')));g.cdpad+=(isNaN(parseInt($(cdcol).css('borderLeftWidth')))?0:parseInt($(cdcol).css('borderLeftWidth')));g.cdpad+=(isNaN(parseInt($(cdcol).css('borderRightWidth')))?0:parseInt($(cdcol).css('borderRightWidth')));g.cdpad+=(isNaN(parseInt($(cdcol).css('paddingLeft')))?0:parseInt($(cdcol).css('paddingLeft')));g.cdpad+=(isNaN(parseInt($(cdcol).css('paddingRight')))?0:parseInt($(cdcol).css('paddingRight')));$(g.bDiv).before(g.cDrag);var cdheight=$(g.bDiv).height();var hdheight=$(g.hDiv).height();$(g.cDrag).css({top:-hdheight+'px'});$('thead tr:first th',g.hDiv).each
(function()
{var cgDiv=document.createElement('div');$(g.cDrag).append(cgDiv);if(!p.cgwidth)p.cgwidth=$(cgDiv).width();$(cgDiv).css({height:cdheight+hdheight}).mousedown(function(e){g.dragStart('colresize',e,this);});if($.browser.msie&&$.browser.version<7.0)
{g.fixHeight($(g.gDiv).height());$(cgDiv).hover(function()
{g.fixHeight();$(this).addClass('dragging')},function(){if(!g.colresize)$(this).removeClass('dragging')});}});}
if(p.striped)
$('tbody tr:odd',g.bDiv).addClass('erow');if(p.resizable&&p.height!='auto')
{g.vDiv.className='vGrip';$(g.vDiv).mousedown(function(e){g.dragStart('vresize',e)}).html('<span></span>');$(g.bDiv).after(g.vDiv);}
if(p.resizable&&p.width!='auto'&&!p.nohresize)
{g.rDiv.className='hGrip';$(g.rDiv).mousedown(function(e){g.dragStart('vresize',e,true);}).html('<span></span>').css('height',$(g.gDiv).height());if($.browser.msie&&$.browser.version<7.0)
{$(g.rDiv).hover(function(){$(this).addClass('hgOver');},function(){$(this).removeClass('hgOver');});}
$(g.gDiv).append(g.rDiv);}
if(p.usepager)
{g.pDiv.className='pDiv';g.pDiv.innerHTML='<div class="pDiv2"></div>';$(g.bDiv).after(g.pDiv);var html=' <div class="pGroup"> <div class="pFirst pButton"><span></span></div><div class="pPrev pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pcontrol">Page <input type="text" size="4" value="1" /> of <span> 1 </span></span></div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pNext pButton"><span></span></div><div class="pLast pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pReload pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pPageStat"></span></div>';$('div',g.pDiv).html(html);$('.pReload',g.pDiv).click(function(){g.populate()});$('.pFirst',g.pDiv).click(function(){g.changePage('first')});$('.pPrev',g.pDiv).click(function(){g.changePage('prev')});$('.pNext',g.pDiv).click(function(){g.changePage('next')});$('.pLast',g.pDiv).click(function(){g.changePage('last')});$('.pcontrol input',g.pDiv).keydown(function(e){if(e.keyCode==13)g.changePage('input')});if($.browser.msie&&$.browser.version<7)$('.pButton',g.pDiv).hover(function(){$(this).addClass('pBtnOver');},function(){$(this).removeClass('pBtnOver');});if(p.useRp)
{var opt="";for(var nx=0;nx<p.rpOptions.length;nx++)
{if(p.rp==p.rpOptions[nx])sel='selected="selected"';else sel='';opt+="<option value='"+p.rpOptions[nx]+"' "+sel+" >"+p.rpOptions[nx]+"&nbsp;&nbsp;</option>";};$('.pDiv2',g.pDiv).prepend("<div class='pGroup'><select name='rp'>"+opt+"</select></div> <div class='btnseparator'></div>");$('select',g.pDiv).change(function()
{if(p.onRpChange)
p.onRpChange(+this.value);else
{p.newp=1;p.rp=+this.value;g.populate();}});}
if(p.searchitems)
{$('.pDiv2',g.pDiv).prepend("<div class='pGroup'> <div class='pSearch pButton'><span></span></div> </div>  <div class='btnseparator'></div>");$('.pSearch',g.pDiv).click(function(){$(g.sDiv).slideToggle('fast',function(){$('.sDiv:visible input:first',g.gDiv).trigger('focus');});});g.sDiv.className='sDiv';sitems=p.searchitems;var sopt="";for(var s=0;s<sitems.length;s++)
{if(p.qtype==''&&sitems[s].isdefault==true)
{p.qtype=sitems[s].name;sel='selected="selected"';}else sel='';sopt+="<option value='"+sitems[s].name+"' "+sel+" >"+sitems[s].display+"&nbsp;&nbsp;</option>";}
if(p.qtype=='')p.qtype=sitems[0].name;$(g.sDiv).append("<div class='sDiv2'>Quick Search <input type='text' size='30' name='q' class='qsbox' /> <select name='qtype'>"+sopt+"</select> <input type='button' value='Clear' /></div>");$('input[name=q],select[name=qtype]',g.sDiv).keydown(function(e){if(e.keyCode==13)g.doSearch()});$('input[value=Clear]',g.sDiv).click(function(){$('input[name=q]',g.sDiv).val('');p.query='';g.doSearch();});$(g.bDiv).after(g.sDiv);}}
$(g.pDiv,g.sDiv).append("<div style='clear:both'></div>");if(p.title)
{g.mDiv.className='mDiv';g.mDiv.innerHTML='<div class="ftitle">'+p.title+'</div>';$(g.gDiv).prepend(g.mDiv);if(p.showTableToggleBtn)
{$(g.mDiv).append('<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>');$('div.ptogtitle',g.mDiv).click
(function()
{$(g.gDiv).toggleClass('hideBody');$(this).toggleClass('vsble');});}}
g.cdropleft=document.createElement('span');g.cdropleft.className='cdropleft';g.cdropright=document.createElement('span');g.cdropright.className='cdropright';g.block.className='gBlock';var gh=$(g.bDiv).height();var gtop=g.bDiv.offsetTop;$(g.block).css({width:g.bDiv.style.width,height:gh,background:'white',position:'relative',marginBottom:(gh*-1),zIndex:1,top:gtop,left:'0px'});$(g.block).fadeTo(0,p.blockOpacity);if($('th',g.hDiv).length)
{g.nDiv.className='nDiv';g.nDiv.innerHTML="<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";$(g.nDiv).css({marginBottom:(gh*-1),display:'none',top:gtop}).noSelect();var cn=0;$('th div',g.hDiv).each
(function()
{var kcol=$("th[axis='col"+cn+"']",g.hDiv)[0];var chk='checked="checked"';if(kcol.style.display=='none')chk='';$('tbody',g.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" '+chk+' class="togCol" value="'+cn+'" /></td><td class="ndcol2">'+this.innerHTML+'</td></tr>');cn++;});if($.browser.msie&&$.browser.version<7.0)
$('tr',g.nDiv).hover
(function(){$(this).addClass('ndcolover');},function(){$(this).removeClass('ndcolover');});$('td.ndcol2',g.nDiv).click
(function()
{if($('input:checked',g.nDiv).length<=p.minColToggle&&$(this).prev().find('input')[0].checked)return false;return g.toggleCol($(this).prev().find('input').val());});$('input.togCol',g.nDiv).click
(function()
{if($('input:checked',g.nDiv).length<p.minColToggle&&this.checked==false)return false;$(this).parent().next().trigger('click');});$(g.gDiv).prepend(g.nDiv);$(g.nBtn).addClass('nBtn').html('<div></div>').attr('title','Hide/Show Columns').click
(function()
{$(g.nDiv).toggle();return true;});if(p.showToggleBtn)$(g.gDiv).prepend(g.nBtn);}
$(g.iDiv).addClass('iDiv').css({display:'none'});$(g.bDiv).append(g.iDiv);$(g.bDiv).hover(function(){$(g.nDiv).hide();$(g.nBtn).hide();},function(){if(g.multisel)g.multisel=false;});$(g.gDiv).hover(function(){},function(){$(g.nDiv).hide();$(g.nBtn).hide();});$(document).mousemove(function(e){g.dragMove(e)}).mouseup(function(e){g.dragEnd()}).hover(function(){},function(){g.dragEnd()});if($.browser.msie&&$.browser.version<7.0)
{$('.hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv',g.gDiv).css({width:'100%'});$(g.gDiv).addClass('ie6');if(p.width!='auto')$(g.gDiv).addClass('ie6fullwidthbug');}
g.rePosDrag();g.fixHeight();t.p=p;t.grid=g;if(p.url&&p.autoload)
{g.populate();}
return t;};var docloaded=false;$(document).ready(function(){docloaded=true});$.fn.flexigrid=function(p){return this.each(function(){if(!docloaded)
{$(this).hide();var t=this;$(document).ready
(function()
{$.addFlex(t,p);});}else{$.addFlex(this,p);}});};$.fn.flexReload=function(p){return this.each(function(){if(this.grid&&this.p.url){if(p&&p.url)
this.p.url=p.url;this.grid.populate();}});};$.fn.flexOptions=function(p){return this.each(function(){if(this.grid)$.extend(this.p,p);});};$.fn.flexToggleCol=function(cid,visible){return this.each(function(){if(this.grid)this.grid.toggleCol(cid,visible);});};$.fn.flexAddData=function(data){return this.each(function(){if(this.grid)this.grid.addData(data);});};$.fn.noSelect=function(p){if(p==null)
prevent=true;else
prevent=p;if(prevent){return this.each(function()
{if($.browser.msie||$.browser.safari)$(this).bind('selectstart',function(){return false;});else if($.browser.mozilla)
{$(this).css('MozUserSelect','none');$('body').trigger('focus');}
else if($.browser.opera)$(this).bind('mousedown',function(){return false;});else $(this).attr('unselectable','on');});}else{return this.each(function()
{if($.browser.msie||$.browser.safari)$(this).unbind('selectstart');else if($.browser.mozilla)$(this).css('MozUserSelect','inherit');else if($.browser.opera)$(this).unbind('mousedown');else $(this).removeAttr('unselectable','on');});}};})(jQuery);(function($){var rotateLeft=function(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));}
var addUnsigned=function(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4)return(lResult^0x80000000^lX8^lY8);if(lX4|lY4){if(lResult&0x40000000)return(lResult^0xC0000000^lX8^lY8);else return(lResult^0x40000000^lX8^lY8);}else{return(lResult^lX8^lY8);}}
var F=function(x,y,z){return(x&y)|((~x)&z);}
var G=function(x,y,z){return(x&z)|(y&(~z));}
var H=function(x,y,z){return(x^y^z);}
var I=function(x,y,z){return(y^(x|(~z)));}
var FF=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(F(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var GG=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(G(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var HH=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(H(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var II=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(I(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var convertToWordArray=function(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWordsTempOne=lMessageLength+8;var lNumberOfWordsTempTwo=(lNumberOfWordsTempOne-(lNumberOfWordsTempOne%64))/64;var lNumberOfWords=(lNumberOfWordsTempTwo+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}
lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;};var wordToHex=function(lValue){var WordToHexValue="",WordToHexValueTemp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValueTemp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValueTemp.substr(WordToHexValueTemp.length-2,2);}
return WordToHexValue;};var uTF8Encode=function(string){string=string.replace(/\x0d\x0a/g,"\x0a");var output="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){output+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){output+=String.fromCharCode((c>>6)|192);output+=String.fromCharCode((c&63)|128);}else{output+=String.fromCharCode((c>>12)|224);output+=String.fromCharCode(((c>>6)&63)|128);output+=String.fromCharCode((c&63)|128);}}
return output;};$.extend({md5:function(string){var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=uTF8Encode(string);x=convertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=addUnsigned(a,AA);b=addUnsigned(b,BB);c=addUnsigned(c,CC);d=addUnsigned(d,DD);}
var tempValue=wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);return tempValue.toLowerCase();}});})(jQuery);jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};var guiders=(function($){var guiders={version:"1.1.1",_defaultSettings:{attachTo:null,buttons:[{name:"Close"}],buttonCustomHTML:"",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",isHashable:true,onShow:null,overlay:false,position:0,offset:{top:null,left:null},title:"Sample title goes here",width:400,xButton:false},_htmlSkeleton:["<div class='guider'>","  <div class='guider_content'>","    <h1 class='guider_title'></h1>","    <div class='guider_close'></div>","    <p class='guider_description'></p>","    <div class='guider_buttons'>","    </div>","  </div>","  <div class='guider_arrow'>","  </div>","</div>"].join(""),_arrowSize:42,_guiders:{},_currentGuiderID:null,_lastCreatedGuiderID:null,_addButtons:function(myGuider){var guiderButtonsContainer=myGuider.elem.find(".guider_buttons");for(var i=myGuider.buttons.length-1;i>=0;i--){var thisButton=myGuider.buttons[i];var thisButtonElem=$("<a></a>",{"class":"guider_button","text":thisButton.name});if(typeof thisButton.classString!=="undefined"&&thisButton.classString!==null){thisButtonElem.addClass(thisButton.classString);}
guiderButtonsContainer.append(thisButtonElem);if(thisButton.onclick){thisButtonElem.bind("click",thisButton.onclick);}else if(!thisButton.onclick){thisButtonElem.bind("click",function(){guiders.next();});}}
if(myGuider.buttonCustomHTML!==""){var myCustomHTML=$(myGuider.buttonCustomHTML);myGuider.elem.find(".guider_buttons").append(myCustomHTML);}},_addXButton:function(myGuider){var xButtonContainer=myGuider.elem.find(".guider_close");var xButton=$("<div></div>",{"class":"x_button","role":"button"});xButtonContainer.append(xButton);xButton.click(function(){guiders.hideAll();});},_attach:function(myGuider){var myHeight=myGuider.elem.innerHeight();var myWidth=myGuider.elem.innerWidth();if(myGuider.position===0||(typeof myGuider.attachTo==="undefined"||myGuider===null||$(myGuider.attachTo).length==0)){myGuider.elem.css("position","absolute");myGuider.elem.css("top",($(window).height()-myHeight)/3+$(window).scrollTop()+"px");myGuider.elem.css("left",($(window).width()-myWidth)/2+$(window).scrollLeft()+"px");return;}
myGuider.attachTo=$(myGuider.attachTo);var base=myGuider.attachTo.offset();var attachToHeight=myGuider.attachTo.innerHeight();var attachToWidth=myGuider.attachTo.innerWidth();var top=base.top;var left=base.left;var bufferOffset=0.9*guiders._arrowSize;var offsetMap={1:[-bufferOffset-myHeight,attachToWidth-myWidth],2:[0,bufferOffset+attachToWidth],3:[attachToHeight/2-myHeight/2,bufferOffset+attachToWidth],4:[attachToHeight-myHeight,bufferOffset+attachToWidth],5:[bufferOffset+attachToHeight,attachToWidth-myWidth],6:[bufferOffset+attachToHeight,attachToWidth/2-myWidth/2],7:[bufferOffset+attachToHeight,0],8:[attachToHeight-myHeight,-myWidth-bufferOffset],9:[attachToHeight/2-myHeight/2,-myWidth-bufferOffset],10:[0,-myWidth-bufferOffset],11:[-bufferOffset-myHeight,0],12:[-bufferOffset-myHeight,attachToWidth/2-myWidth/2]};offset=offsetMap[myGuider.position];top+=offset[0];left+=offset[1];if(myGuider.offset.top!==null){top+=myGuider.offset.top;}
if(myGuider.offset.left!==null){left+=myGuider.offset.left;}
myGuider.elem.css({"position":"absolute","top":top,"left":left});},_guiderById:function(id){if(typeof guiders._guiders[id]==="undefined"){throw"Cannot find guider with id "+id;}
return guiders._guiders[id];},_showOverlay:function(){$("#guider_overlay").show();},_hideOverlay:function(){$("#guider_overlay").hide();},_initializeOverlay:function(){if($("#guider_overlay").length===0){$("<div id=\"guider_overlay\"></div>").hide().appendTo("body");}},_styleArrow:function(myGuider){var position=myGuider.position||0;if(!position){return;}
var myGuiderArrow=$(myGuider.elem.find(".guider_arrow"));var newClass={1:"guider_arrow_down",2:"guider_arrow_left",3:"guider_arrow_left",4:"guider_arrow_left",5:"guider_arrow_up",6:"guider_arrow_up",7:"guider_arrow_up",8:"guider_arrow_right",9:"guider_arrow_right",10:"guider_arrow_right",11:"guider_arrow_down",12:"guider_arrow_down"};myGuiderArrow.addClass(newClass[position]);var myHeight=myGuider.elem.innerHeight();var myWidth=myGuider.elem.innerWidth();var arrowOffset=guiders._arrowSize/2;var positionMap={1:["right",arrowOffset],2:["top",arrowOffset],3:["top",myHeight/2-arrowOffset],4:["bottom",arrowOffset],5:["right",arrowOffset],6:["left",myWidth/2-arrowOffset],7:["left",arrowOffset],8:["bottom",arrowOffset],9:["top",myHeight/2-arrowOffset],10:["top",arrowOffset],11:["left",arrowOffset],12:["left",myWidth/2-arrowOffset]};var position=positionMap[myGuider.position];myGuiderArrow.css(position[0],position[1]+"px");},_showIfHashed:function(myGuider){var GUIDER_HASH_TAG="guider=";var hashIndex=window.location.hash.indexOf(GUIDER_HASH_TAG);if(hashIndex!==-1){var hashGuiderId=window.location.hash.substr(hashIndex+GUIDER_HASH_TAG.length);if(myGuider.id.toLowerCase()===hashGuiderId.toLowerCase()){guiders.show(myGuider.id);}}},next:function(){var currentGuider=guiders._guiders[guiders._currentGuiderID];if(typeof currentGuider==="undefined"){return;}
var nextGuiderId=currentGuider.next||null;if(nextGuiderId!==null&&nextGuiderId!==""){var myGuider=guiders._guiderById(nextGuiderId);var omitHidingOverlay=myGuider.overlay?true:false;guiders.hideAll(omitHidingOverlay);guiders.show(nextGuiderId);}},createGuider:function(passedSettings){if(passedSettings===null||passedSettings===undefined){passedSettings={};}
myGuider=$.extend({},guiders._defaultSettings,passedSettings);myGuider.id=myGuider.id||String(Math.floor(Math.random()*1000));var guiderElement=$(guiders._htmlSkeleton);myGuider.elem=guiderElement;myGuider.elem.css("width",myGuider.width+"px");guiderElement.find("h1.guider_title").html(myGuider.title);guiderElement.find("p.guider_description").html(myGuider.description);guiders._addButtons(myGuider);if(myGuider.xButton){guiders._addXButton(myGuider);}
guiderElement.hide();guiderElement.appendTo("body");guiderElement.attr("id",myGuider.id);if(typeof myGuider.attachTo!=="undefined"&&myGuider!==null&&$(myGuider.attachTo).length!=0){guiders._attach(myGuider);guiders._styleArrow(myGuider);}
guiders._initializeOverlay();guiders._guiders[myGuider.id]=myGuider;guiders._lastCreatedGuiderID=myGuider.id;if(myGuider.isHashable){guiders._showIfHashed(myGuider);}
return guiders;},hideAll:function(omitHidingOverlay){$(".guider").fadeOut("fast");if(typeof omitHidingOverlay!=="undefined"&&omitHidingOverlay===true){}else{guiders._hideOverlay();}
return guiders;},show:function(id){if(!id&&guiders._lastCreatedGuiderID){id=guiders._lastCreatedGuiderID;}
var myGuider=guiders._guiderById(id);if(myGuider.overlay){guiders._showOverlay();}
guiders._attach(myGuider);if(myGuider.onShow){myGuider.onShow(myGuider);}
myGuider.elem.fadeIn("fast");var windowHeight=$(window).height();var scrollHeight=$(window).scrollTop();var guiderOffset=myGuider.elem.offset();var guiderElemHeight=myGuider.elem.height();if(guiderOffset.top-scrollHeight<0||guiderOffset.top+guiderElemHeight+40>scrollHeight+windowHeight){window.scrollTo(0,Math.max(guiderOffset.top+(guiderElemHeight/2)-(windowHeight/2),0));}
guiders._currentGuiderID=id;return guiders;}};return guiders;}).call(this,jQuery);;(function(){"use strict";function setup($){$.fn._fadeIn=$.fn.fadeIn;var noOp=$.noop||function(){};var msie=/MSIE/.test(navigator.userAgent);var ie6=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent);var mode=document.documentMode||0;var setExpr=$.isFunction(document.createElement('div').style.setExpression);$.blockUI=function(opts){install(window,opts);};$.unblockUI=function(opts){remove(window,opts);};$.growlUI=function(title,message,timeout,onClose){var $m=$('<div class="growlUI"></div>');if(title)$m.append('<h1>'+title+'</h1>');if(message)$m.append('<h2>'+message+'</h2>');if(timeout===undefined)timeout=3000;var callBlock=function(opts){opts=opts||{};$.blockUI({message:$m,fadeIn:typeof opts.fadeIn!=='undefined'?opts.fadeIn:700,fadeOut:typeof opts.fadeOut!=='undefined'?opts.fadeOut:1000,timeout:typeof opts.timeout!=='undefined'?opts.timeout:timeout,centerY:false,showOverlay:false,onUnblock:onClose,css:$.blockUI.defaults.growlCSS});};callBlock();var nonmousedOpacity=$m.css('opacity');$m.mouseover(function(){callBlock({fadeIn:0,timeout:30000});var displayBlock=$('.blockMsg');displayBlock.stop();displayBlock.fadeTo(300,1);}).mouseout(function(){$('.blockMsg').fadeOut(1000);});};$.fn.block=function(opts){if(this[0]===window){$.blockUI(opts);return this;}
var fullOpts=$.extend({},$.blockUI.defaults,opts||{});this.each(function(){var $el=$(this);if(fullOpts.ignoreIfBlocked&&$el.data('blockUI.isBlocked'))
return;$el.unblock({fadeOut:0});});return this.each(function(){if($.css(this,'position')=='static'){this.style.position='relative';$(this).data('blockUI.static',true);}
this.style.zoom=1;install(this,opts);});};$.fn.unblock=function(opts){if(this[0]===window){$.unblockUI(opts);return this;}
return this.each(function(){remove(this,opts);});};$.blockUI.version=2.70;$.blockUI.defaults={message:'<h1>Please wait...</h1>',title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:'30%',top:'40%',left:'35%',textAlign:'center',color:'#000',border:'3px solid #aaa',backgroundColor:'#fff',cursor:'wait'},themedCSS:{width:'30%',top:'40%',left:'35%'},overlayCSS:{backgroundColor:'#000',opacity:0.6,cursor:'wait'},cursorReset:'default',growlCSS:{width:'350px',top:'10px',left:'',right:'10px',border:'none',padding:'5px',opacity:0.6,cursor:'default',color:'#fff',backgroundColor:'#000','-webkit-border-radius':'10px','-moz-border-radius':'10px','border-radius':'10px'},iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,focusableElements:':input:enabled:visible',onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:'blockMsg',ignoreIfBlocked:false};var pageBlock=null;var pageBlockEls=[];function install(el,opts){var css,themedCSS;var full=(el==window);var msg=(opts&&opts.message!==undefined?opts.message:undefined);opts=$.extend({},$.blockUI.defaults,opts||{});if(opts.ignoreIfBlocked&&$(el).data('blockUI.isBlocked'))
return;opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});css=$.extend({},$.blockUI.defaults.css,opts.css||{});if(opts.onOverlayClick)
opts.overlayCSS.cursor='pointer';themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});msg=msg===undefined?opts.message:msg;if(full&&pageBlock)
remove(window,{fadeOut:0});if(msg&&typeof msg!='string'&&(msg.parentNode||msg.jquery)){var node=msg.jquery?msg[0]:msg;var data={};$(el).data('blockUI.history',data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;if(data.parent)
data.parent.removeChild(node);}
$(el).data('blockUI.onUnblock',opts.onUnblock);var z=opts.baseZ;var lyr1,lyr2,lyr3,s;if(msie||opts.forceIframe)
lyr1=$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>');else
lyr1=$('<div class="blockUI" style="display:none"></div>');if(opts.theme)
lyr2=$('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+(z++)+';display:none"></div>');else
lyr2=$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');if(opts.theme&&full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">';if(opts.title){s+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>';}
s+='<div class="ui-widget-content ui-dialog-content"></div>';s+='</div>';}
else if(opts.theme){s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">';if(opts.title){s+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>';}
s+='<div class="ui-widget-content ui-dialog-content"></div>';s+='</div>';}
else if(full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>';}
else{s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>';}
lyr3=$(s);if(msg){if(opts.theme){lyr3.css(themedCSS);lyr3.addClass('ui-widget-content');}
else
lyr3.css(css);}
if(!opts.theme)
lyr2.css(opts.overlayCSS);lyr2.css('position',full?'fixed':'absolute');if(msie||opts.forceIframe)
lyr1.css('opacity',0.0);var layers=[lyr1,lyr2,lyr3],$par=full?$('body'):$(el);$.each(layers,function(){this.appendTo($par);});if(opts.theme&&opts.draggable&&$.fn.draggable){lyr3.draggable({handle:'.ui-dialog-titlebar',cancel:'li'});}
var expr=setExpr&&(!$.support.boxModel||$('object,embed',full?null:el).length>0);if(ie6||expr){if(full&&opts.allowBodyStretch&&$.support.boxModel)
$('html,body').css('height','100%');if((ie6||!$.support.boxModel)&&!full){var t=sz(el,'borderTopWidth'),l=sz(el,'borderLeftWidth');var fixT=t?'(0 - '+t+')':0;var fixL=l?'(0 - '+l+')':0;}
$.each(layers,function(i,o){var s=o[0].style;s.position='absolute';if(i<2){if(full)
s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"');else
s.setExpression('height','this.parentNode.offsetHeight + "px"');if(full)
s.setExpression('width','jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');else
s.setExpression('width','this.parentNode.offsetWidth + "px"');if(fixL)s.setExpression('left',fixL);if(fixT)s.setExpression('top',fixT);}
else if(opts.centerY){if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0;}
else if(!opts.centerY&&full){var top=(opts.css&&opts.css.top)?parseInt(opts.css.top,10):0;var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';s.setExpression('top',expression);}});}
if(msg){if(opts.theme)
lyr3.find('.ui-widget-content').append(msg);else
lyr3.append(msg);if(msg.jquery||msg.nodeType)
$(msg).show();}
if((msie||opts.forceIframe)&&opts.showOverlay)
lyr1.show();if(opts.fadeIn){var cb=opts.onBlock?opts.onBlock:noOp;var cb1=(opts.showOverlay&&!msg)?cb:noOp;var cb2=msg?cb:noOp;if(opts.showOverlay)
lyr2._fadeIn(opts.fadeIn,cb1);if(msg)
lyr3._fadeIn(opts.fadeIn,cb2);}
else{if(opts.showOverlay)
lyr2.show();if(msg)
lyr3.show();if(opts.onBlock)
opts.onBlock.bind(lyr3)();}
bind(1,el,opts);if(full){pageBlock=lyr3[0];pageBlockEls=$(opts.focusableElements,pageBlock);if(opts.focusInput)
setTimeout(focus,20);}
else
center(lyr3[0],opts.centerX,opts.centerY);if(opts.timeout){var to=setTimeout(function(){if(full)
$.unblockUI(opts);else
$(el).unblock(opts);},opts.timeout);$(el).data('blockUI.timeout',to);}}
function remove(el,opts){var count;var full=(el==window);var $el=$(el);var data=$el.data('blockUI.history');var to=$el.data('blockUI.timeout');if(to){clearTimeout(to);$el.removeData('blockUI.timeout');}
opts=$.extend({},$.blockUI.defaults,opts||{});bind(0,el,opts);if(opts.onUnblock===null){opts.onUnblock=$el.data('blockUI.onUnblock');$el.removeData('blockUI.onUnblock');}
var els;if(full)
els=$('body').children().filter('.blockUI').add('body > .blockUI');else
els=$el.find('>.blockUI');if(opts.cursorReset){if(els.length>1)
els[1].style.cursor=opts.cursorReset;if(els.length>2)
els[2].style.cursor=opts.cursorReset;}
if(full)
pageBlock=pageBlockEls=null;if(opts.fadeOut){count=els.length;els.stop().fadeOut(opts.fadeOut,function(){if(--count===0)
reset(els,data,opts,el);});}
else
reset(els,data,opts,el);}
function reset(els,data,opts,el){var $el=$(el);if($el.data('blockUI.isBlocked'))
return;els.each(function(i,o){if(this.parentNode)
this.parentNode.removeChild(this);});if(data&&data.el){data.el.style.display=data.display;data.el.style.position=data.position;data.el.style.cursor='default';if(data.parent)
data.parent.appendChild(data.el);$el.removeData('blockUI.history');}
if($el.data('blockUI.static')){$el.css('position','static');}
if(typeof opts.onUnblock=='function')
opts.onUnblock(el,opts);var body=$(document.body),w=body.width(),cssW=body[0].style.width;body.width(w-1).width(w);body[0].style.width=cssW;}
function bind(b,el,opts){var full=el==window,$el=$(el);if(!b&&(full&&!pageBlock||!full&&!$el.data('blockUI.isBlocked')))
return;$el.data('blockUI.isBlocked',b);if(!full||!opts.bindEvents||(b&&!opts.showOverlay))
return;var events='mousedown mouseup keydown keypress keyup touchstart touchend touchmove';if(b)
$(document).bind(events,opts,handler);else
$(document).unbind(events,handler);}
function handler(e){if(e.type==='keydown'&&e.keyCode&&e.keyCode==9){if(pageBlock&&e.data.constrainTabKey){var els=pageBlockEls;var fwd=!e.shiftKey&&e.target===els[els.length-1];var back=e.shiftKey&&e.target===els[0];if(fwd||back){setTimeout(function(){focus(back);},10);return false;}}}
var opts=e.data;var target=$(e.target);if(target.hasClass('blockOverlay')&&opts.onOverlayClick)
opts.onOverlayClick(e);if(target.parents('div.'+opts.blockMsgClass).length>0)
return true;return target.parents().children().filter('div.blockUI').length===0;}
function focus(back){if(!pageBlockEls)
return;var e=pageBlockEls[back===true?pageBlockEls.length-1:0];if(e)
e.focus();}
function center(el,x,y){var p=el.parentNode,s=el.style;var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,'borderLeftWidth');var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,'borderTopWidth');if(x)s.left=l>0?(l+'px'):'0';if(y)s.top=t>0?(t+'px'):'0';}
function sz(el,p){return parseInt($.css(el,p),10)||0;}}
if(typeof define==='function'&&define.amd&&define.amd.jQuery){define(['jquery'],setup);}else{setup(jQuery);}})();jQuery.fn.boxy=function(options){options=options||{};return this.each(function(){var node=this.nodeName.toLowerCase(),self=this;if(node=='a'){jQuery(this).click(function(){var active=Boxy.linkedTo(this),href=this.getAttribute('href'),localOptions=jQuery.extend({actuator:this,title:this.title},options);if(active){active.show();}else if(href.indexOf('#')>=0){var content=jQuery(href.substr(href.indexOf('#'))),newContent=content.clone(true);content.remove();localOptions.unloadOnHide=false;new Boxy(newContent,localOptions);}else{if(!localOptions.cache)localOptions.unloadOnHide=true;Boxy.load(this.href,localOptions);}
return false;});}else if(node=='form'){jQuery(this).bind('submit.boxy',function(){Boxy.confirm(options.message||'Please confirm:',function(){jQuery(self).unbind('submit.boxy').submit();});return false;});}});};function Boxy(element,options){this.boxy=jQuery(Boxy.WRAPPER);jQuery.data(this.boxy[0],'boxy',this);this.visible=false;this.options=jQuery.extend({},Boxy.DEFAULTS,options||{});if(this.options.modal){this.options=jQuery.extend(this.options,{center:true,draggable:true});}
if(this.options.actuator){jQuery.data(this.options.actuator,'active.boxy',this);}
this.setContent(element||"<div></div>");this._setupTitleBar();this.boxy.css('display','none').appendTo(document.body);this.toTop();if(this.options.fixed){if(jQuery.browser.msie&&jQuery.browser.version<7){this.options.fixed=false;}else{this.boxy.addClass('fixed');}}
if(this.options.center&&Boxy._u(this.options.x,this.options.y)){this.center();}else{this.moveTo(Boxy._u(this.options.x)?this.options.x:Boxy.DEFAULT_X,Boxy._u(this.options.y)?this.options.y:Boxy.DEFAULT_Y);}
if(this.options.show)this.show();};Boxy.EF=function(){};jQuery.extend(Boxy,{WRAPPER:"<table cellspacing='0' cellpadding='0' border='0' class='boxy-wrapper'>"+"<tr><td class='top-left'></td><td class='top'></td><td class='top-right'></td></tr>"+"<tr><td class='left'></td><td class='boxy-inner'></td><td class='right'></td></tr>"+"<tr><td class='bottom-left'></td><td class='bottom'></td><td class='bottom-right'></td></tr>"+"</table>",DEFAULTS:{title:null,closeable:true,draggable:true,clone:false,actuator:null,center:true,show:true,modal:false,fixed:true,closeText:'<i class="fa fas fa-times"></i>',unloadOnHide:false,clickToFront:false,behaviours:Boxy.EF,afterDrop:Boxy.EF,afterShow:Boxy.EF,beforeHide:Boxy.EF,afterHide:Boxy.EF,beforeUnload:Boxy.EF},DEFAULT_X:50,DEFAULT_Y:50,zIndex:1337,dragConfigured:false,resizeConfigured:false,dragging:null,load:function(url,options){options=options||{};var ajax={url:url,type:'GET',dataType:'html',cache:false,success:function(html){html=jQuery(html);if(options.filter)html=jQuery(options.filter,html);new Boxy(html,options);}};jQuery.each(['type','cache'],function(){if(this in options){ajax[this]=options[this];delete options[this];}});jQuery.ajax(ajax);},get:function(ele){var p=jQuery(ele).parents('.boxy-wrapper');return p.length?jQuery.data(p[0],'boxy'):null;},linkedTo:function(ele){return jQuery.data(ele,'active.boxy');},alert:function(message,callback,options){return Boxy.ask(message,['OK'],callback,options);},confirm:function(message,after,options){return Boxy.ask(message,['OK','Cancel'],function(response){if(response=='OK')after();},options);},ask:function(question,answers,callback,options){options=jQuery.extend({modal:true,closeable:false},options||{},{show:true,unloadOnHide:true});var body=jQuery('<div></div>').append(jQuery('<div class="question"></div>').html(question));var map={},answerStrings=[];if(answers instanceof Array){for(var i=0;i<answers.length;i++){map[answers[i]]=answers[i];answerStrings.push(answers[i]);}}else{for(var k in answers){map[answers[k]]=k;answerStrings.push(answers[k]);}}
var buttons=jQuery('<form class="answers"></form>');buttons.html(jQuery.map(answerStrings,function(v){return"<input type='button' value='"+v+"' />";}).join(' '));jQuery('input[type=button]',buttons).click(function(){var clicked=this;Boxy.get(this).hide(function(){if(callback)callback(map[clicked.value]);});});body.append(buttons);new Boxy(body,options);},isModalVisible:function(){return jQuery('.boxy-modal-blackout').length>0;},_u:function(){for(var i=0;i<arguments.length;i++)
if(typeof arguments[i]!='undefined')return false;return true;},_handleResize:function(evt){var d=jQuery(document);jQuery('.boxy-modal-blackout').css('display','none').css({width:d.width(),height:d.height()}).css('display','block');},_handleDrag:function(evt){var d;if(d=Boxy.dragging){d[0].boxy.css({left:evt.pageX-d[1],top:evt.pageY-d[2]});}},_nextZ:function(){return Boxy.zIndex++;},_viewport:function(){var d=document.documentElement,b=document.body,w=window;return jQuery.extend(jQuery.browser.msie?{left:b.scrollLeft||d.scrollLeft,top:b.scrollTop||d.scrollTop}:{left:w.pageXOffset,top:w.pageYOffset},!Boxy._u(w.innerWidth)?{width:w.innerWidth,height:w.innerHeight}:(!Boxy._u(d)&&!Boxy._u(d.clientWidth)&&d.clientWidth!=0?{width:d.clientWidth,height:d.clientHeight}:{width:b.clientWidth,height:b.clientHeight}));}});Boxy.prototype={estimateSize:function(){this.boxy.css({visibility:'hidden',display:'block'});var dims=this.getSize();this.boxy.css('display','none').css('visibility','visible');return dims;},getSize:function(){return[this.boxy.width(),this.boxy.height()];},getContentSize:function(){var c=this.getContent();return[c.width(),c.height()];},getPosition:function(){var b=this.boxy[0];return[b.offsetLeft,b.offsetTop];},getCenter:function(){var p=this.getPosition();var s=this.getSize();return[Math.floor(p[0]+s[0]/2),Math.floor(p[1]+s[1]/2)];},getInner:function(){return jQuery('.boxy-inner',this.boxy);},getContent:function(){return jQuery('.boxy-content',this.boxy);},setContent:function(newContent){newContent=jQuery(newContent).css({display:'block'}).addClass('boxy-content');if(this.options.clone)newContent=newContent.clone(true);this.getContent().remove();this.getInner().append(newContent);this._setupDefaultBehaviours(newContent);this.options.behaviours.call(this,newContent);return this;},moveTo:function(x,y){this.moveToX(x).moveToY(y);return this;},moveToX:function(x){if(typeof x=='number')this.boxy.css({left:x});else this.centerX();return this;},moveToY:function(y){if(typeof y=='number')this.boxy.css({top:y});else this.centerY();return this;},centerAt:function(x,y){var s=this[this.visible?'getSize':'estimateSize']();if(typeof x=='number')this.moveToX(x-s[0]/2);if(typeof y=='number')this.moveToY(y-s[1]/2);return this;},centerAtX:function(x){return this.centerAt(x,null);},centerAtY:function(y){return this.centerAt(null,y);},center:function(axis){var v=Boxy._viewport();var o=this.options.fixed?[0,0]:[v.left,v.top];if(!axis||axis=='x')this.centerAt(o[0]+v.width/2,null);if(!axis||axis=='y')this.centerAt(null,o[1]+v.height/2);return this;},centerX:function(){return this.center('x');},centerY:function(){return this.center('y');},resize:function(width,height,after){if(!this.visible)return;var bounds=this._getBoundsForResize(width,height);this.boxy.css({left:bounds[0],top:bounds[1]});this.getContent().css({width:bounds[2],height:bounds[3]});if(after)after(this);return this;},tween:function(width,height,after){if(!this.visible)return;var bounds=this._getBoundsForResize(width,height);var self=this;this.boxy.stop().animate({left:bounds[0],top:bounds[1]});this.getContent().stop().animate({width:bounds[2],height:bounds[3]},function(){if(after)after(self);});return this;},isVisible:function(){return this.visible;},show:function(){if(this.visible)return;if(this.options.modal){var self=this;if(!Boxy.resizeConfigured){Boxy.resizeConfigured=true;jQuery(window).resize(function(){Boxy._handleResize();});}
this.modalBlackout=jQuery('<div class="boxy-modal-blackout"></div>').css({zIndex:Boxy._nextZ(),opacity:0.7,width:jQuery(document).width(),height:jQuery(document).height()}).appendTo(document.body);this.toTop();if(this.options.closeable){jQuery(document.body).bind('keypress.boxy',function(evt){var key=evt.which||evt.keyCode;if(key==27){self.hide();jQuery(document.body).unbind('keypress.boxy');}});}}
this.boxy.stop().css({opacity:1}).show();this.visible=true;this._fire('afterShow');return this;},hide:function(after){if(!this.visible)return;var self=this;self._fire('beforeHide');if(this.options.modal){jQuery(document.body).unbind('keypress.boxy');this.modalBlackout.animate({opacity:0},function(){jQuery(this).remove();});}
this.boxy.stop().animate({opacity:0},300,function(){self.boxy.css({display:'none'});self.visible=false;self._fire('afterHide');if(after)after(self);if(self.options.unloadOnHide)self.unload();});return this;},toggle:function(){this[this.visible?'hide':'show']();return this;},hideAndUnload:function(after){this.options.unloadOnHide=true;this.hide(after);return this;},unload:function(){this._fire('beforeUnload');this.boxy.remove();if(this.options.actuator){jQuery.data(this.options.actuator,'active.boxy',false);}},toTop:function(){this.boxy.css({zIndex:Boxy._nextZ()});return this;},getTitle:function(){return jQuery('> .title-bar h2',this.getInner()).html();},setTitle:function(t){jQuery('> .title-bar h2',this.getInner()).html(t);return this;},_getBoundsForResize:function(width,height){var csize=this.getContentSize();var delta=[width-csize[0],height-csize[1]];var p=this.getPosition();return[Math.max(p[0]-delta[0]/2,0),Math.max(p[1]-delta[1]/2,0),width,height];},_setupTitleBar:function(){if(this.options.title){var self=this;var tb=jQuery("<div class='title-bar'></div>").html("<h2>"+this.options.title+"</h2>");if(this.options.closeable){tb.append(jQuery("<a href='#' class='close'></a>").html(this.options.closeText));}
if(this.options.draggable){tb[0].onselectstart=function(){return false;}
tb[0].unselectable='on';tb[0].style.MozUserSelect='none';if(!Boxy.dragConfigured){jQuery(document).mousemove(Boxy._handleDrag);Boxy.dragConfigured=true;}
tb.mousedown(function(evt){self.toTop();Boxy.dragging=[self,evt.pageX-self.boxy[0].offsetLeft,evt.pageY-self.boxy[0].offsetTop];jQuery(this).addClass('dragging');}).mouseup(function(){jQuery(this).removeClass('dragging');Boxy.dragging=null;self._fire('afterDrop');});}
this.getInner().prepend(tb);this._setupDefaultBehaviours(tb);}},_setupDefaultBehaviours:function(root){var self=this;if(this.options.clickToFront){root.click(function(){self.toTop();});}
jQuery('.close',root).click(function(){self.hide();return false;}).mousedown(function(evt){evt.stopPropagation();});},_fire:function(event){this.options[event].call(this);}};