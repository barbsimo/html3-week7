/*  Adds hive status to database. B Simonsen */

(function() {
'use strict';

var BASE_URL = 'https://pacific-meadow-64112.herokuapp.com/data-api/';
var collection = 'bsimonsen'; //Use your own!

var hives = [];
var saveDelId;

getHives();
$('#status').on( 'click', newStatus );
$('#delBtn').on( 'click', confirmAndDelete);

function getHives( evt ) {
  getAllHives();
}
  
function getAllHives() {
  $.ajax( BASE_URL + collection,
    {
        method: 'GET',
        success: loadHives,
        error: reportAjaxError
    } );
}
  
function loadHives( response ) {
  hives = response; 
  showHives();
}
  
function showHives () {
    var tr, td, beeHive, editBtn, deleteBtn;
    var i, len, button;
    $('#beeHives').empty();
    //getHives();
    //hives.forEach( function (beeHive) {
    for (i = 0, len = hives.length; i<len; ++i) {
        tr = $( '<tr>' );
        td = $( '<td>' );
      
        var delId = hives[i]._id;
        saveDelId = delId;
        console.log(delId);
        
        td.text( hives[i]._id );
        tr.append( td );
        td.text( hives[i].name );
        tr.append( td );
        td = $( '<td>' );

        td.text( hives[i].age );
        tr.append( td );
        td = $( '<td>' );
        td.text( hives[i].notes );
        tr.append( td );  
      
        td = $( '<td>' );
        button = $( '<button type="button">' );
        button.text( 'Edit' );
        td.append( button );
        //button.on( 'click', callEdit );
        button = $( '<button type="button" id="delBtn">' );
        button.text( 'Delete' );
        td.append( button );
        tr.append( td );
        //button.on( 'click', callDelete(delId) );
        $('#beeHives').append( tr );
    } ;

    $('#hiveList').show();
    $('#addStatus').hide();
}
  
function confirmAndDelete( evt ){
            //var delId = $('#')
            deleteHive( hive[i]._id );
            getHives();      
}

function deleteHive(delId) {
  $.ajax( BASE_URL + collection + '/' + delId,
    {
        method: 'DELETE',
        success: console.log('Deleted one'),
        error: reportAjaxError
    } );
}
  

function newStatus( ) {
    $('#hive').val( '' );
    $('#dateChecked').val( '' );
    $('#notes').val('');

    $('#submit').one( 'click', addHive );
    $('#cancel').one( 'click', showHives );

    $('#hiveList').hide();
    $('#addStatus').show();

    function addHive( evt ) {
        evt.preventDefault();
        var name = $('#hive').val();
        var age = $('#dateChecked').val();
        var notes = $('#notes').val();
        var oneHive = {
          name: name,
          age: age,
          notes: notes
        } ;
        addRow(oneHive);
        evt.preventDefault( );
        getHives();
    }
}
  
function addRow(oneHive) {
  $.ajax( BASE_URL + collection,
                {
                    method: 'POST',
                    data: oneHive,
                    success: console.log('loaded one'),
                    error: reportAjaxError
                } );
    function listHives( data ) {
      if (data.error) {
        onFailure (data.error);
      } else {
        onSuccess(data);
      }
    }
    function reportAjaxError(jqXHR, textStatus,errorThrown) {
      reportAjaxError(onFailure,jqXHR,textStatus,errorThrown) ;
    }
} 



function reportAjaxError( jqXHR, textStatus, errorThrown ) {
    var msg = 'AJAX error.\n' +
        'Status Code: ' + jqXHR.status + '\n' +
        'Status: ' + textStatus;
    if ( errorThrown ) {
        msg += '\n' + 'Error thrown: ' + errorThrown;
    }
    if ( jqXHR.responseText ) {
        msg += '\n' + 'Response text: ' + jqXHR.responseText;
    }
    console.log('error=' + msg);
}
})();

