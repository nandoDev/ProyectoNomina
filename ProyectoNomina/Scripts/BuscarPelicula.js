
//function newEvent(elemento, evento, fn) {
//    if (elemento.addEventListener) {
//        elemento.addEventListener(evento, fn, false);
//    } else {
//        elemento.attachEvent('on' + evento, fn);
//    }
//}

//function sendTitles(newTitle) {
//    var url = (function () {
//        return '/Pelicula/AgregarPelicula?newTitle=param-name'
//             .replace('param-name', encodeURIComponent(newTitle));
//    })();
//    window.location = url;
//}

$( document ).ready(function(){
    $('#submitSearch').on('click', function (e) {
        e.preventDefault();
        var count = 0;
        var countmovie = 0;
        var omdbTitulo = $('input[name=busquedaTitulo]').val();

        var resturl = "http://omdbapi.com/?s=" + omdbTitulo + "";

        $('#omdbWait').html('<img src="/Content/img/loading.gif" alt="loading...">');
        var lista = $('#lista-titulosPeliculas');

        lista.html("");

        $.ajax({
            url: resturl,
            dataType: 'json',
            success: function (dato) {
                var titulos = dato.Search;
                $('#omdbWait').html('');
                for (var n in titulos) {
                    if (titulos[n].Type === "movie") {
                        count++;
                    }
                }
                for (var m in titulos) {
                    if (titulos[m].Type === "movie") {
                        var titulo = titulos[m].Title;
                        var resturlTitles = "http://omdbapi.com/?t=" + titulo + "";
                        
                        $.ajax({
                            url: resturlTitles,
                            dataType: 'json',
                            success: function (data) {
                                countmovie++;
                                var titleMovie = data.Title;
                                var year = data.Year;
                                var director = data.Director;
                                var posterMovie = data.Poster;
                                var imdbLink = "http://www.imdb.com/title/" + data.imdbID + "";
                                if (posterMovie === "N/A") {
                                    posterMovie = "/CONTENT/img/sample2.jpg";
                                };
                                var TituloEncode = encodeURIComponent(data.Title);
                                var ImdbIdEncode = encodeURIComponent(data.imdbID);
                                var peticionTheMovieDb = "https://api.themoviedb.org/3/find/" + data.imdbID + "?external_source=imdb_id&api_key=7cfc557af31b2a12ce58c72a134df54e";
                                
                                $.ajax({
                                    url: peticionTheMovieDb,
                                    dataType: 'json',
                                    success: function (datos) {
                                        var posterTheMovieDb = "https://image.tmdb.org/t/p/w185" + datos.movie_results[0].poster_path + "";
                                        
                                        lista.append
                                            ('<li class="item-tituloPelicula">' +
                                                '<div>' +
                                                    '<div class="area-imagen">' +
                                                        '<img src=' + posterTheMovieDb + ' class="imagen-tipo2">' +
                                                    '</div>' +
                                                    '<div id="area-texto">' +
                                                        '<h4><a href="#"><span>' + titleMovie + '</span>' + ' (' + year + ')' + '</a></h4>' +
                                                        '<h5>Director: ' + director + '</h5>' +
                                                        '<h6><a href=' + imdbLink + '>ver en IMDB</a></h6>' +
                                                        '<a href="/Pelicula/AgregarPelicula?newImdbId=' + ImdbIdEncode + '">' +
                                                            '<button type="submit" class="btn bg-blue btn-xs">Guardar</button>' +
                                                        '</a>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</li>');
                                     }
                                });
                                
                                //if (countmovie === count) {
                                //    var elements = document.getElementsByClassName("tituloPelicula");
                                //    for (var i = 0; i < elements.length; i++) {
                                //        //Añadimos el evento onclick al div
                                //        newEvent(elements[i], "click", function () {
                                //            var _titulo = this.innerHTML;
                                //            sendTitles(_titulo);
                                //            return false;
                                //        });
                                //        //$('#searchMovie').val('');
                                //    }
                                //}
                            }
                        });
                    }
                }
            }
        });
    });
 });