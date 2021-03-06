exports.getImage = function(req, res){
  var idpage = req.params._id;
  var docPage = db_pages().filter({id_pagina: idpage}).first();

  var ids= new Array();
  db_pages().each(function (record,recordnumber) {
    ids.push(record["id_pagina"]);
  }); 
  
  if(docPage.titulo_pagina===undefined||docPage.titulo_pagina===null){
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  }else{
    var numPag=db_pages().count();
    var image={};

    if(db_pages().count()==1){
      image.prev="resumen/"+docPage.id_pagina;
      image.next="resumen/"+docPage.id_pagina;
    }else if(docPage.num ==1){
      image.prev="resumen/"+ids[numPag-1];
      image.next="resumen/"+ids[1];
    }else if(docPage.num==numPag){
      image.prev="resumen/"+ids[numPag-2];
      image.next="resumen/"+ids[0];
    }else{
      image.prev="resumen/"+ids[docPage.num-2];
      image.next="resumen/"+ids[docPage.num];
    }
    image.titulo=docPage.titulo_pagina;
    image.texto=docPage.texto_pagina;
    image.imagen_visualizador=docPage.imagen_visualizador;
    res.render('photoblog',{image:image});
  }
};