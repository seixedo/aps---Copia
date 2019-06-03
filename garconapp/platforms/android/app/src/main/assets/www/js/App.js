$('.collection')
    .on('click', '.collection-item', function () {
        var $badge = $('.badge', this);
        if ($badge.length === 0) {
            $badge = $('<span	class="badge	brown-text">0</span>')
                .appendTo(this);
        }
        $badge.text(parseInt($badge.text()) + 1);
        var nomeProduto = this.firstChild.textContent;
        Materialize.toast(nomeProduto + ' adicionado', 1000);
    });

$('.collection')
    .on('click', '.badge', function () {
        $(this).remove();
        return false;
    });

$('.acao-limpar').on('click', function () {
    $('#numero-mesa').val('');
    $('.badge').remove();
});

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(
        
        function (position) {
            
            var LatLong = {lat:position.coords.latitude, lng:position.coords.longitude};
            console.log(LatLong)
            var map;
                    map = new google.maps.Map(document.getElementById("map"),{
                        zoom: 18,
                        center:LatLong
                        
                        
                    });
                    var marker = new google.maps.Marker({
                        position: LatLong,
                        map: map
                    });
                    
            //Materialize.toast("Latitude: " + position.coords.latitude + '\n' +'Longitude: ' + position.coords.longitude, 3000);
        }
        
    )
});

$('#map').on('shown.bs.modal', function() {
    google.maps.event.trigger(map, "resize");
    map.setCenter(myLatlng);
  });

/*$('.acao-localizar').on('click', function () {
   
    navigator.geolocation.getCurrentPosition(
        
        function (position) {
            
            var LatLong = {lat:position.coords.latitude, lng:position.coords.longitude};
            console.log(LatLong)
            var map;
                    map = new google.maps.Map(document.getElementById("map"),{
                        zoom: 18,
                        center:LatLong
                        
                        
                    });
                    var marker = new google.maps.Marker({
                        position: LatLong,
                        map: map
                    });
                    
            //Materialize.toast("Latitude: " + position.coords.latitude + '\n' +'Longitude: ' + position.coords.longitude, 3000);
        }
        
    )
  
});*/


$('.modal-trigger').leanModal();

$('#confirmar').on('click', function () {
    var texto = "";

    $('.badge').parent().each(function () {
        texto += this.firstChild.textContent + ':	';
        texto += this.lastChild.textContent + ',	';
    });
    $('#resumo').empty().text(texto);
});

$('.scan-qrcode').on('click', function () {
    cordova.plugins.barcodeScanner.scan(
        function (resultado) {
            if (resultado.text) {
                Materialize.toast('Mesa ' + resultado.text, 2000);
                $('#numero-mesa').val(resultado.text);
            }
        },
        function (error) {
            Materialize.toast('Erro: ' + error, 3000, 'red-text');
        }
    );
});

$('.acao-finalizar').on('click', function () {
    $.ajax({
        url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
        data: {
            mesa: $('#numero-mesa').val(),
            pedido: $('#resumo').text()
        },
        error: function (erro) {
            Materialize.toast(erro.responseText, 3000, 'red-text');
        },
        success: function (dados) {
            Materialize.toast(dados, 2000);
            $('#numero-mesa').val('');
            $('.badge').remove();
        }
    })
}
);

