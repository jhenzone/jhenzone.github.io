//Request - JHZ - May 10, 2015
(function() {
	
	//Array Containing All Cached Items
	var cachedItems = [];	
	
	//Cached Item Constructor
	var CachedItem = function(url, data, obj){
		this.url = url;
		this.data = data;
		this.object = obj;
	};
	
	//Set SourceUrl for Debugging
	var setSourceUrl = function (xhr, url) {
	    return [xhr.responseText, "\n//@ sourceURL=", xhr.responseURL || url].join('');
	};
	
	//Base XHR for all request
	var XHR = function(method, url, options) {
		if(!XMLHttpRequest) throw "Ajax Not Supported.";
		
		options||(options = {});
								
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);		 
		
		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4){
				if(!options.success) return;
				options.success();
				return;
			}
		}		
		
		xhr.send();	
		return xhr;
	}
	
	//Fetching of scripts
	var use = function(url, callback){
					
		var xhr = XHR("GET", url, {
			success: function() {
				var makeScript = setSourceUrl(xhr, url);
				var makeObject = eval(makeScript);
				var ci = new CachedItem(xhr.responseURL, makeScript, makeObject);								
				cachedItems.push(ci);				
				if (!callback) return;
				callback(makeObject);
			}
		});
		
	}
	
	//Function use to encapsulate the module/class/object	
	var make = function(deps, constr){
		//todo: loading of dependencies
		deps||(deps = []);
		for(var i in deps){
			
		}
		 
		return constr;
	};
				 
	window.use = use;
	window.make = make;
	
	var ds = document.querySelector("[data-start]");
	if(!ds) return;
	if(!ds.attributes['data-start']) return;
	
	var dsUrl = ds.attributes['data-start'].nodeValue;
	if(!dsUrl) return;
	
	use(dsUrl, function (App) {
	    var app = new App();
	    app.start();
	});
}());
