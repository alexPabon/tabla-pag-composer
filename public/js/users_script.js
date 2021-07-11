/**
 * Script para la gestion de usuarios
 * @author AlexP
 */

 let order = 'ASC';
 let colName = 'id';
 let datos = [];
 
 /**
  * Evento para cuando termina de cargar la pagina
  */
 document.addEventListener("DOMContentLoaded", function(){
     let search = document.getElementById('search');
     let quantity = document.getElementById('cant');
     let selectOrder = document.getElementsByClassName('select_order');
     let orderAsc = document.getElementsByClassName('order_asc');
     let orderDesc = document.getElementsByClassName('order_des');    
 
     search.addEventListener('keyup', function(){
         let peticion = (this.value=="+")?'%2B':this.value;
         let url = window.location+`user?search=${peticion}&limit=${quantity.value}&column=${colName}&order=${order}`;
         registration(url);
     });
 
     quantity.addEventListener('change', function(){
         let peticion = (search.value=="+")?'%2B':search.value;
         let url = window.location+`user?search=${peticion}&limit=${quantity.value}&column=${colName}&order=${order}`;
         registration(url);
     });
 
     getRegisterOrder(orderAsc);
     getRegisterOrder(selectOrder);    
     getRegisterOrder(orderDesc);
     hideSortButtons();
     registration(window.location+`/user?limit=${quantity.value}`);    
 });        
 
 /**
  * Funcion para hacer una peticion get y obtener los 
  * usuarios con todos los filtros y paginacion.
  * @param {string} url 
  */
 function registration(url=''){
     let tableTbody = document.getElementById('reg');
     let contLinks = document.getElementById('contLinks');
     
     axios.get(url)
         .then(response=>{
 
            datos = response.data.data; 
             let drawTable = '';
             let tokenColor = '';
             let links = response.data.links;
             let infoPage = {
                 'currentPage':response.data.current_page,
                 'to': response.data.to,
                 'total': response.data.total,
                 'classEvent': 'registratons_links'
             };
 
             datos.forEach(function (element, index){
 
                 let tk = element.token;
                 
                 (tk.length < 11)? tokenColor='bg-warning':tokenColor='';
 
                 drawTable += '<tr class="border-top" id="fila_'+index+'">';
                 drawTable += '<td>' + element.id + ' </td>';
                 drawTable += '<td>' + element.extension + ' </td>';
                 drawTable += '<td class="text_left">' + element.username + ' </td>';
                 drawTable += '<td class="text_left">' + element.password + ' </td>';
                 drawTable += `<td class="${tokenColor} card border-0"><div class="hidden_token" style="max-width:150px;">${element.token}<span class="btn btn-info col-12 text-light text_sm my-2 btn_token" index="${index}">cambiar token</span></pre></td>`;
                 drawTable += '<td class="text_sm">' + element.updatedAt + '</td>';
                 drawTable += `<td class="text_sm">
                                 <span class='btn_sm btn-primary btn_view' index="${index}">View</span>
                                 <span class='btn_sm btn-success btn_edit' index="${index}">Edit</span>
                                 <span class='btn_sm btn-danger btn_del' index="${index}">Del</span>
                             </td>`;               
                 drawTable += '</tr>';
             });
 
             
             tableTbody.innerHTML = drawTable;
             if(!response.data.total){
                 contLinks.innerHTML = '<div class="alert alert-info" role="alert">No hay datos que mostrar!</div>';
             }else{
                 contLinks.innerHTML = drawLinks(links,infoPage);               
             }
             
             loadEvents(infoPage.classEvent);
             viewToken();
             btnToken();
 
             btnView();
             btnEdit();            
             btnDel();
         });
 }
 
 /**
  * funcion para cargar el evento cuando se haga 
  * click en los botones de paginacion.
  * @param {string} classEvent 
  * @author AlexP.
  */
 function loadEvents(classEvent){            
     let getLogs = document.getElementsByClassName(classEvent);
     
     Array.from(getLogs).forEach(
         function(element, index, array) {
             
             element.addEventListener('click',function(e){
                 e.preventDefault();
                 
                 registration(element);
             });
 
         }
     );
     
 }
 
 /**
  * Funcion para los eventos de los botones 
  * de orden ASC y DESC
  * @param {array} orderElements 
  */
 function getRegisterOrder(orderElements){
 
     let search = document.getElementById('search');
     let quantity = document.getElementById('cant');
 
     Array.from(orderElements).forEach(
         function(selOrder){
             selOrder.addEventListener('click', function(){
 
                 colName = this.getAttribute('colName');
 
                 if(this.getAttribute('order')){
                     orderBtn = this.getAttribute('order')
                     order = this.getAttribute('order');
                     if(orderBtn == 'ASC'){
                         this.previousElementSibling.classList.remove('hidden');
                     }
                     else{
                         this.nextElementSibling.classList.remove('hidden');
                     }
                 }
                 else{
                     hideSortButtons();
 
                     if(order == 'ASC'){
                         this.nextElementSibling.classList.remove('hidden');
                     }
                     else{                        
                         this.nextElementSibling.nextElementSibling.classList.remove('hidden');
                     }
                 }
                 
                 this.classList.add('hidden');
                
                 let peticion = (search.value=="+")?'%2B':search.value;
                 let url = window.location+`user?search=${peticion}&limit=${quantity.value}&column=${colName}&order=${order}`;                
                 registration(url);
                 
             });
         }
     );
 
 }
 
 
 /**
  * Funcion para ocultar los botones de order 
  * por columna
  * @class_CSS buttons
  */
 function hideSortButtons(){
     
     let allButtons = document.getElementsByClassName('buttons');    
 
     Array.from(allButtons).forEach(
         function(button){
             let btnColName = button.getAttribute('colname');
             let btnOrder = button.getAttribute('order');
 
             button.classList.add('hidden');            
 
             if(!button.getAttribute('order')){
                 button.classList.remove('hidden');                
             }            
         }
     );    
 }
 
 /**
  * Funcion para crear el evento para mostrar y ocultar el 
  * token.
  * @class_CSS hidden_token
  * @class_CSS visible_token
  */
 function viewToken(){
     let hiddenToken = document.getElementsByClassName('hidden_token');
 
     Array.from(hiddenToken).forEach(
         function(token){
             token.addEventListener('click',function(){
                 this.classList.remove('hidden_token');
                 this.classList.add('visible_token');
 
                 this.firstElementChild.addEventListener('mouseover',function(){                    
                     token.classList.remove('hidden_token');
                     token.classList.add('visible_token');                    
                 });                
 
                 this.addEventListener('mouseout', function(){                    
                     token.classList.remove('visible_token');
                     token.classList.add('hidden_token');
                 });        
                 
             });
         }
     );
 }
 
 /**
  * Funcion para crear el evento para cambiar el token 
  *
  * @class_CSS btn_token 
  */
  function btnToken(){
     let btnToken = document.getElementsByClassName('btn_token');
 
     Array.from(btnToken).forEach(
         function(btn){
             btn.addEventListener('click',function(){
                 let index = this.getAttribute('index');                
                 let url = '/user/updateToken';
 
                 let id = new FormData();
                 id.append('id',datos[index].id);
                 
                 axios.post(url, id)
                     .then(response =>{                        
                         if(response.status == 200){
                             this.parentElement.parentElement.classList.remove('bg-warning');
                             this.parentElement.innerHTML = response.data.token;                            
                         }
                     });               
             });
         }
     );
 }
 
 /**
  * Funcion para mostra detalles del usuario.
  * @class_CSS btn_view
  * @author AlexP
  */
 function btnView(){
     let viewUser = document.getElementsByClassName('btn_view');
 
     Array.from(viewUser).forEach(
         function(user){
             user.addEventListener('click', function(){
                 let index = this.getAttribute('index');                
                 let name = datos[index].username;
                 let id = datos[index].id;
                 let extesion = datos[index].extension;
                 let pass = datos[index].password;
                 let token = datos[index].token;
                 let text = `Id: ${id} \n`;
                     text += `Extension: ${extesion} \n`;
                     text += `Contraseña: ${pass} \n`;
                     text += `Token: \n ${token}`;         
                 
                 swal({
                     title:name,
                     text: text                    
                 });
             });
         }
     );
 
 }
 
 /**
  * Funcion para cargar el formulario para editar
  * el usuario
  * @class_CSS btn_edit
  */
 function btnEdit(){
     let editUser = document.getElementsByClassName('btn_edit');
     let contForm = document.getElementById('cont_form');
     let userForm = document.getElementById('user_form');
     let allUsers = document.getElementById('all_users');
     let saveUser = document.getElementById('save');
     let cancelEdit = document.getElementById('cancel');
     let index = '';
 
     Array.from(editUser).forEach(
         function(user){
             user.addEventListener('click',function(){
                 index = this.getAttribute('index');
                 
                 contForm.classList.remove('hidden');
                 allUsers.classList.add('hidden');
 
                 userForm.name.value = datos[index].username;
                 userForm.id.value = datos[index].id;
                 userForm.extension.value = datos[index].extension;
                 userForm.pass.value = datos[index].password;
             })
         }
     );
 
     saveUser.addEventListener('click',function(e){
         
         e.preventDefault();        
         let url = 'user/editUser';
         let data = new FormData();
         
         data.append('name',userForm.name.value);
         data.append('id',userForm.id.value);
         data.append('extension',userForm.extension.value);
         data.append('pass',userForm.pass.value);
        
         axios.post(url, data)
             .then(response =>{                        
                 if(response.status == 200){
                     console.log('eidt user');
                     console.log(response);
                     
                     let row = document.getElementById(`fila_${index}`);
                     row.classList.add('text-success');
 
                     row.childNodes[0].innerHTML = response.data.id;
                     row.childNodes[1].innerHTML = response.data.extension;
                     row.childNodes[2].innerHTML = response.data.username;
                     row.childNodes[3].innerHTML = response.data.password;
                     row.childNodes[5].innerHTML = response.data.updatedAt;
 
                     datos[index].id = response.data.id;
                     datos[index].extension = response.data.extension;
                     datos[index].username = response.data.username;
                     datos[index].password = response.data.password;
                     datos[index].updatedAt = response.data.updatedAt;
 
                     contForm.classList.add('hidden');
                     allUsers.classList.remove('hidden');
 
                     swal({
                         title:'Guardado!',
                         icon: 'success'                 
                     });
                 }
             }); 
     });
 
     cancelEdit.addEventListener('click',function(){
         contForm.classList.add('hidden');
         allUsers.classList.remove('hidden');
     });
 }
 
 /**
  * Funcion para borrar el usuario
  * @class_CSS btn_del
  */
 function btnDel(){
     let delUser = document.getElementsByClassName('btn_del');
 
     Array.from(delUser).forEach(
         function(user){
             user.addEventListener('click',function(){
                 let index = this.getAttribute('index');
 
                 swal({
                     title: "Estas seguro de borrar el usuario?",
                     text: "Nombre: "+datos[index].username,
                     icon: "warning",
                     buttons: true,
                     dangerMode: true,
                   })
                   .then((willDelete) => {
                     if (willDelete) {
                         let index = this.getAttribute('index');                
                         let url = '/user/deleteUser';
 
                         let id = new FormData();
                         id.append('id',datos[index].id);
                         
                         axios.post(url, id)
                             .then(response =>{                        
                                 if(response.status == 200){
                                     
                                     let row = document.getElementById(`fila_${index}`);
                                     row.classList.add('hidden'); 
                                     
                                     swal({
                                         title: "Borrado!" ,
                                         icon: "success",
                                       });
                                 }
                             });       
                       
                     }
                   });
             });
         }
     );
 }