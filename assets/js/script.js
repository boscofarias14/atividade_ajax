// $('.collapse').collapse({
//     toggle:false
// });

const url="https://jsonplaceholder.typicode.com";

$(document).ready(function(e){
    // e.preventDefault();
    $.getJSON(`${url}/users`, (data)=>{
        var template;
        var templateInfo = {};
        var objInfo = {};
        $.each(data, function (i, value) { 
            template = `<div class="card">
            <div class="card-header" id="heading${i}">
              <h5 class="mb-0">
                <button class="link1 btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                #${value.id}. ${value.name}
                </button>
              </h5>
            </div>
    
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="info-tab" data-toggle="tab" href="#info${i}" role="tab" aria-controls="info" aria-selected="true">Info</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="posts-tab${i}" data-toggle="tab" href="#posts${i}" role="tab" aria-controls="posts" aria-selected="false">Posts</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="galeria-tab${i}" data-toggle="tab" href="#galeria${i}" role="tab" aria-controls="galeria" aria-selected="false">Galeria</a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade active show content-info" id="info${i}" role="tabpanel" aria-labelledby="info-tab content"></div>
                <div class="tab-pane fade content-posts" id="posts${i}" role="tabpanel" aria-labelledby="posts-tab">
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Corpo</th>
                        </tr>
                    </thead>
                    <tbody class="tbody">
                    </tbody>
                </table>
                </div>
                <div class="tab-pane fade content-galeria" id="galeria${i}" role="tabpanel" aria-labelledby="galeria-tab"
                <div class="bd-example bd-example-tabs">
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título do Álbum</th>
                        </tr>
                    </thead>
                    <tbody class="tbody-galeria">
                        
                    </tbody>
                </table>
              </div>
                    </div>
              </div>
            </div>
          </div>`;
            templateInfo = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Nome do Usuário</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Telefone</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                <tr>
                    <th scope="row">${value.id}</th>
                    <td>${value.name}</td>
                    <td>${value.username}</td>
                    <td>${value.email}</td>
                    <td>
                        <table class="table address table-sm">   
                        <tbody>
                            <tr>
                                <th scope="row">Street</th>
                                <td>${value.address.street}</td>
                            </tr>
                            <tr>
                                <th scope="row">Suite</th>
                                <td>${value.address.suite}</td>
                            </tr>
                            <tr>
                                <th scope="row">City</th>
                                <td>${value.address.city}</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>${value.phone}</td>
                </tr>
                </tbody>
            </table>
            `
            $('.templateAccordion').append(template);
            $(`#info${i}`).append(templateInfo);   

            //função para capturar os posts do usuário
            $(`#posts-tab${i}`).click(function(e){
                var templatePost = [];
                var id = i+1;
                $.getJSON(`${url}/posts?userId=${id}`, (posts) =>{ 
                    $.each(posts, function(i_post, value_post){
                        templatePost += `
                            <tr>
                                <th scope="row">${value_post.id}</th>
                                <td>${value_post.title}</td>
                                <td>${value_post.body}</td>
                            </tr>
                        `   
                    });
                    $(`#posts${i} .tbody`).html(templatePost);
                })  
            })
            //galeria
            $(`#galeria-tab${i}`).click(function(e){
                var templateGaleria = [];
                var templateInfoGaleria;
                var id = i+1;
                $.getJSON(`${url}/albums?userId=${id}`, (albums)=>{ 
                    console.log(albums)
                    console.log(id)
                    $.each(albums, function(i_albums, value_albums){
                        console.log(value_albums)
                        templateGaleria += `
                        <tr>
                            <th scope="row">${value_albums.id}</th>
                            <td>${value_albums.title}</td>
                        </tr>
                        `;
                        
                        // $(`#v-pills-albums${value_albums.id}-tab`).click(function(){
                        //     $(this).slideUp();
                        // });
                    //     $(`#v-pills-albums${value_albums.id}-tab`).click(function(e){
                    //         $.getJSON(`${url}/photos?userId=${value_albums.userId}`, (photos) =>{
                    //             console.log(photos)
                    //         })
                    //         templateInfoGaleria = `
                    //         <div class="tab-content" id="v-pills-tabContent">
                    //             <div class="tab-pane fade" id="v-pills-albums${value_albums.id}" role="tabpanel" aria-labelledby="v-pills-albums${value_albums.id}-tab">
                    //             <p>
                    //                 ${value_albums.title}
                    //             </p>
                    //             </div>
                    //         </div>`;
                    //     })
                    //   $('.info-galeria').append(templateInfoGaleria);
                    //     console.log(i, i_albums)
                    //     $(`#v-pills-albums${i} p`).html(`teste${i}`);
                    //     // $(`#v-pills-albums${value_albums.id}-tab`).click(function(e){
                    //     //     $.getJSON(`${url}/photos?albumId=${value_albums.id}`, (photos)=>{
                    //     //         console.log(photos);
                    //     //     })
                    //     // })   
                    })
                    
                    $('.tbody-galeria').html(templateGaleria);
                    
                }) 
                
                 
            })
           
            
            
            });
            
        
        
            
        })
        

        console.log('Teste');
})
