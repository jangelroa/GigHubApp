$(document).on("pageshow", "#wine-list", function(){
	$.ajax({
			url:"http://daretodiscover.net/wine",
			type:"GET",
			success:function(data){
					//console.log(data);   //(data[0].name);
					var source = $("#wine-list-template").html();
					var template = Handlebars.compile(source);

					var html = template({
						wines: data
					});

					$("#wine-list-items").html(html).listview("refresh");
			},
			error:function(){
					alert("Something went wrong...");
			}
	});
});

$(document).on("click", "#add-wine-button", function(){
	var wineData = {
		name: $("#new-wine-name").val(),
		country: $("#new-wine-country").val(),
		region: $("#new-wine-region").val(),
		grapes: $("#new-wine-grapes").val(),
		year: $("#new-wine-year").val(),
		price: $("#new-wine-price").val(),
		description: $("#new-wine-description").val()
	};

	// validate wine data
	for (key in wineData) {
		if(wineData[key] === "") {
			//alert("Field " + key + " is null");
			alert("Please enter all fields");
			return false;
		}
	}

	$.ajax({
			url:"http://daretodiscover.net/wine",
			type:"POST",
			data: wineData,
			success:function(){
					$.mobile.changePage("#wine-list");

			},
			error:function(){
					alert("Something went wrong...");
			}
	});
});






