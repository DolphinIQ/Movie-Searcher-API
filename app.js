var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/results", function(req, res){
	var search = req.query.title;
	if(search == undefined){
		res.render("search");
		return;
	}
	var url = "http://www.omdbapi.com/?s=" + search + "&apikey=thewdb"
	request(url, function(err, response, body){
		if(!err && response.statusCode==200){
			var data = JSON.parse(body);
			if(data["Search"] == undefined){
				//search error
				res.render("search", {status: false});
				return;
			}
			res.render("results", {
				data: data,
				search: search
			});
		}
	});
});

app.get("/movie/:id", function(req, res){
	var movieId = req.params.id;
	if(movieId == undefined){
		res.render("search", {status: false});
		return;
	}
	var url = "http://www.omdbapi.com/?i=" + movieId + "&plot=full&apikey=thewdb"
	request(url, function(err, response, body){
		if(!err && response.statusCode==200){
			var data = JSON.parse(body);
			if(data == undefined){
				//search error
				res.render("search", {status: false});
				return;
			}
			res.render("movie", { movie: data });
		}
	});
});

app.get("/", function(req, res){
	res.render("search", {status: true});
});

app.get("*", function(req, res){
	res.render("notFound");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Server running...");
});

