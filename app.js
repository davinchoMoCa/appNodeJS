var https = require('https');

function printError(error){
	console.error(error.message);
}

function printInfo(username, badges, points){
	console.log("el usuario " + username + "\ntiene "+ badges + " medallas y \ntiene "+ points + " puntos en el curso de JS \n");
}

function getInfo(userName){
	var url = 'https://teamtreehouse.com/'+ userName +'.json';
	var req = https.get(url, function(res){
		var body ='';


		res.on('data', function(data){
			body += data;
		});


		res.on('end', function(){
			if(res.statusCode === 200){
				try{
					var perfil = JSON.parse(body);
					printInfo(perfil.name, perfil.badges.length, perfil.points.JavaScript);
				}catch(error){
					printError(error);
				}
			}else{
				printError({message:"hubo un problema:["+ res.statusCode +"] ("+ res.statusMessage + ") \nel usuario "+ userName +" no existe \n"});
			}
		});

	});

	req.on('error', printError);
};

module.exports.getInfo = getInfo;
