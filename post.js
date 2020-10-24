var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

//Desenvolvido : Widx & Json (animeskono.blogspot.com.br) (http://www.json.org/)
//------------------------------------------------------------------------------------------------------------------------//
// Data: 01/set/2015
//------------------------------------------------------------------------------------------------------------------------//
// Direitos : Widx & Json
//------------------------------------------------------------------------------------------------------------------------//
    var totalPostLabel = "Episódios:",
	prevText = "Anterior",
    nextText = "Próxima",
    numchars = 0;
	imgBlank = "https://web.archive.org/web/20200402121342/https://lh4.googleusercontent.com/-93WW4QW0Qg0/VL_4-ue6qPI/AAAAAAAACc4/lgHjRFPL0hY/s1/ani.png";
    var firstpage = 0; // Detectar a primeira  pagina que é executado
    var pagernum = 0; // Conter o número da página
    var postsnum = 0; // Aonde iniciar a primeira página
    var actualpage = 1; // Valor do atual página inicial (que vai mudar se você clicar a paginação).
	
    // Este é o modelo de recipiente que será utilizado para inserir busca tag post blogger, paginação e os postos de contar
    document.write('<div id="lista-js">');
document.write('<div id="main-lista"></div>');
document.write('<div id="itempager"><div id="pagination"></div>');
document.write('<div id="totalposts"></div>');
document.write('</div></div>');
     
    var _results = document.getElementById('main-lista');
    var _pagination = document.getElementById('pagination');
    var _totalposts = document.getElementById('totalposts');
     
    // Construir a tabela que ira enquadrar o conteúdo
     
    function showPagePosts(json) {
     
       var entry, posttitle, posturl, postimg, s, a, b, c, d, postsumm, replies, monthnames, timepub, output = "";
     
       if (pagernum === 0) {
           postsnum = parseInt(json.feed.openSearch$totalResults.$t);
           pagernum = parseInt(postsnum / postsperpage) + 1;
       }
     
       for (var i = 0; i < postsperpage; i++) {
     
           if ("entry" in json.feed) {
     
               if (i == json.feed.entry.length) break;
     
               entry = json.feed.entry[i];
               posttitle = entry.title.$t; // Obter o título do post
     
               // Obter rel = "alternativa" para url verdadeiramente pós
               for (var k = 0, elen = entry.link.length; k < elen; k++) {
                   if (entry.link[k].rel == 'alternate') {
                       posturl = entry.link[k].href; // Este é o seu URL post real!
                       break;
                   }
               }
     
               // Obter os comentários mais contador (opcional)
               for (var l = 0, clen = entry.link.length; l < clen; l++) {
                   if (entry.link[l].rel == "replies" && entry.link[l].type == "text/html") {
                       var commentsnum = entry.link[l].title.split(" ")[0]; // Este é contador dos seus comentários
                       break;
                   }
               }
     
               // Se o Blogger-alimentação for definido como FULL, então o conteúdo está no campo de conteúdo
               postsumm = ("content" in entry) ? entry.content.$t.replace(/<br ?\/?>/ig, " ").replace(/<(.*?)>/g, "") : ""; // Obter o conteúdo do post
     
               // Reduzir resumos de postagem a "NUMCHARS" caracteres.
               // "Numchars" é uma variável. Você determina o valor
               if (postsumm.length > numchars) {
                   postsumm = (numchars > 0 && numchars !== false) ? postsumm.substring(0, numchars) + '...' : "";
               }
     
               // Obter a data de postagem (por exemplo: 2012-02-07T12: 56: 00.000 + 07: 00)
               var _postdate = entry.published.$t,
                   _cdyear = _postdate.substring(0, 4), // Pegue 4 caracteres a partir da "posteriores" começo, isso significa que o Ano (2012)
                   _cdmonth = _postdate.substring(5, 7), // Pegue 2 personagem de 5 passos de "posteriores" começo, que significa o mês (02)
                   _cdday = _postdate.substring(8, 10); // Pegue 2 8 passo caráter de "posteriores" começo. isso significa que o dia (07)
     
               // Template matriz do mês
               monthnames = (idMode) ? ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
     
               // O produto final do post = data (07 de fevereiro de 2012) (nomes dos meses dia CDYear)
               timepub = (showPostDate) ? _cdday + ' ' + monthnames[parseInt(_cdmonth, 10) - 1] + ' ' + _cdyear + ' - ' : '';
     
               
     
               // Obter imagem busca
               s = entry.content.$t;
               a = s.indexOf("<img");
               b = s.indexOf("src=\"", a);
               c = s.indexOf("\"", b + 5);
               d = s.substr(b + 5, c - b - 5);
     
               postimg = ((a != -1) && (b != -1) && (c != -1) && (d != "")) ? d : imgBlank;
     
               // Construir o modelo busca
               output += '<div class="tll-post">';
               output += '<div class="tlps-img"><a href="' + posturl + '" target="_parent"><div class="play-img"></div><img src="' + postimg + '" width="225" height="130"/></a></div>';
               output += '<div class="tllps-title"><label><a href="' + posturl + '" target="_parent">' + posttitle + '</a></label></div>';
               output += '<span class="summary">' + postsumm + '</span></div>';
               output += '</div>';
     
           }
     
       }
     
       // Esse codigo ira colocar todo o modelo acima do <div id="main-lista"></div>
       _results.innerHTML = output;
       _create_pagination();
     
    }
     
    // Construir a paginação
    function _create_pagination() {
     
       output = "";
       var starter = 0;
     
       output += ((actualpage > 1) ? '<a title="' + prevText + '" class="prevjson" href="javascript:_init_script(' + parseInt(actualpage - 1) + ')"><span class="un-def"><i class="icon-chevron-left"></i></span></a>' : '<span class="un-def"><i class="icon-chevron-left"></i></span>') + '<em style="font:inherit;color:inherit;" class="pagernumber">';
     
       if (pagernum < (maxpage + 1)) {
           for (starter = 1; starter <= pagernum; starter++) {
               output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')"><span class="secund">' + starter + '</span></a>';
           }
       } else if (pagernum > (maxpage - 1)) {
           if (actualpage < minpage) {
               for (starter = 1; starter < (maxpage - 2); starter++) {
                   output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')"><span class="secund">' + starter + '</span></a>';
               }
               output += '<span class="secund"> ... </span>';
               output += '<a href="javascript:_init_script(' + parseInt(pagernum - 1) + ')"><a href="javascript:_init_script(' + parseInt(pagernum - 1) + ')"><span class="secund">' + parseInt(pagernum - 1) + '</span></a>';
               output += '<a href="javascript:_init_script(' + pagernum + ')"><span class="secund">' + pagernum + '</span></a>';
           } else if (pagernum - (minpage - 1) > actualpage && actualpage > (minpage - 1)) {
               output += '<a href="javascript:_init_script(1)"><span class="secund">1</span></a>';
               output += '<a href="javascript:_init_script(2)"><span class="secund">2</span></a>';
               output += '<span class="secund">...</span>';
               for (starter = actualpage - 2; starter <= actualpage + 2; starter++) {
                   output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')"><span class="secund">' + starter + '</span></a>';
               }
               output += '<span class="secund">...</span>';
               output += '<a href="javascript:_init_script(' + parseInt(pagernum - 1) + ')"><span class="secund">' + parseInt(pagernum - 1) + '</span></a>';
               output += '<a href="javascript:_init_script(' + pagernum + ')"><span class="secund">' + pagernum + '</span></a>';
           } else {
               output += '<a href="javascript:_init_script(1)"><span class="secund">1</span></a>';
               output += '<a href="javascript:_init_script(2)"><span class="secund">2</span></a>';
               output += '<span class="secund">...</span>';
               for (starter = pagernum - (minpage + 1); starter <= pagernum; starter++) {
                   output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')"><span class="secund">' + starter + '</span></a>';
               }
           }
       }
     
       output += '</em>' + ((actualpage < starter - 1) ? '<a title="' + nextText + '" class="nextjson" href="javascript:_init_script(' + parseInt(actualpage + 1) + ')"><span class="def"><i class="icon-chevron-right"></i></span></a>' : '<span class="def"><i class="icon-chevron-right"></i></span>');
     
       _pagination.innerHTML = output;
       var parameter = (actualpage * postsperpage) - (postsperpage - 1),
           _final = actualpage * postsperpage;
       _totalposts.innerHTML = totalPostLabel + ' ' + postsnum + ' -   ' + parameter + ((actualpage < starter - 1) ? + _final : "");
    }
     
    // Funções para remover e anexar o script de retorno de chamada que foi manipulada no parâmetro `start-index`
    function _init_script(n) {
     
       var parameter = (n * postsperpage) - (postsperpage - 1);
       var url = (sortByLabel) ? siteUrl + '/feeds/posts/default/-/' + labelSorter + '?start-index=' + parameter : siteUrl + '/feeds/posts/default/?start-index=' + parameter; // Opcional: Ordenação de mensagens de um rótulo específico
     
       if (firstpage == 1) {
           var old = document.getElementById("TEMPORAL");
           old.parentNode.removeChild(old);
       }
       _results.innerHTML = '<div id="loadingscript"></div>'; //Loading Script (Opcional)
       _pagination.innerHTML = ''; //Loading Script (Opcional)
       _totalposts.innerHTML = ''; //Loading Script (Opcional)
     
       var script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = url + '&max-results=' + postsperpage + '&orderby=published&alt=json-in-script&callback=showPagePosts';
       script.id = 'TEMPORAL';
       document.getElementsByTagName('head')[0].appendChild(script);
       firstpage = 1;
       actualpage = n;
    }
     
    // Executar a função _init_script () com o parâmetro `1` imediatamente
    // Então, ele irá mostrar a primeira página.
    _init_script(1);
    //]]>
	
//Desenvolvido : AnimesOnlineKono & Json (animeskono.blogspot.com.br) (http://www.json.org/)

}
/*
     FILE ARCHIVED ON 12:13:42 Apr 02, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:12:26 Oct 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 378.802 (3)
  PetaboxLoader3.datanode: 122.191 (4)
  load_resource: 52.602
  RedisCDXSource: 8.594
  CDXLines.iter: 22.625 (3)
  captures_list: 415.083
  exclusion.robots: 0.344
  exclusion.robots.policy: 0.327
  PetaboxLoader3.resolve: 30.707
  esindex: 0.016
*/