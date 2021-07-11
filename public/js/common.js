/**
  * Funcion para dibujar los botones para la paginacion
  * @param {array} links 
  * @param {object} infoPage 
  * @returns html
  * @author AlexP
  */
 function drawLinks(links, infoPage){
     
    let allLinks = '<nav class="px-2">';
    allLinks += '<ul class="pagination pagination-sm">';         

    links.forEach(function(link){        
        
        if(link.url!=null && infoPage.currentPage != link.label){
            allLinks += '<li class="page-item">';
            allLinks += '<a class="page-link '+infoPage.classEvent+'" href="'+link.url+'">'+link.label+'</a>';
            allLinks += '</li>';
        }
        else if(infoPage.currentPage == link.label){
            allLinks += '<li class="page-item active">';
            allLinks += '<span class="page-link">'+link.label+'</span>';
            allLinks += '</li>';
        }
        else{
            allLinks += '<li class="page-item disabled">';
            allLinks += '<span class="page-link">'+link.label+'</span>';
            allLinks += '</li>';
        }        
    });

    allLinks += '</ul>';
    allLinks += '<p class="text-sm leading-5 text-gray-700 font-medium">Hasta: '+infoPage.to+' de '+infoPage.total+'</p>';
    allLinks += '</nav>';

    return allLinks;
}