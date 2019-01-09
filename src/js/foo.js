// toggle visibility //-->
function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}

$(document).ready(function(){

    $("select").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".box").hide();
            }
        });
    }).change();


    $(".searchinput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".datatable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf('state') > -1)
      $(this).toggle($(this).text().toLowerCase().indexOf('alcohol') > -1)
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
