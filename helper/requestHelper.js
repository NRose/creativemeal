var RequestHelper = {
	request: httpRequest
  //
  //requestbyid: httpRequestById
};

function httpRequest(req_resoure, req_type, payload) {
  var request = makeHttpObject();

  request.open('"'+req_type+'"', '/'+req_resource+'/'+payload, true);
  request.send(null);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200){
      	this.success = true;
      	this.status = request.status;
      	this.payload = request.responseText;
      	} else if (failure){
      	this.success = false;
      	this.status = request.status
      	this.statusText = request.statusText;
      	}
    }
  };
}

module.exports = RequestHelper;